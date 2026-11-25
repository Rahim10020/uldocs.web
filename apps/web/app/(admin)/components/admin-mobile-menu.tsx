"use client";

import { Home, LogOut, Menu, Settings, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useLogout } from "@/hooks/use-logout";
import { useSession } from "@/hooks/use-session";
import { ADMIN_NAV_ITEMS, isAdminNavItemActive } from "@/lib/admin-navigation";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** Bouton hamburger et tiroir de navigation mobile de l'administration. */
export function AdminMobileMenu() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const panelId = useId();
	const { user } = useSession();
	const logoutMutation = useLogout();

	useBodyScrollLock(open);

	useEffect(() => {
		if (pathname) {
			setOpen(false);
		}
	}, [pathname]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
			}
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open]);

	const closeMenu = () => setOpen(false);

	const handleLogout = () => {
		closeMenu();
		logoutMutation.mutate();
	};

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
				aria-expanded={open}
				aria-controls={panelId}
				className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 lg:hidden"
			>
				{open ? (
					<X aria-hidden className="size-5" />
				) : (
					<Menu aria-hidden className="size-5" />
				)}
			</button>

			{open ? (
				<>
					<button
						type="button"
						aria-label="Fermer le menu"
						onClick={closeMenu}
						className="fixed inset-0 z-40 cursor-pointer bg-black-60 lg:hidden"
					/>
					<aside
						id={panelId}
						aria-label="Navigation mobile de l'administration"
						className="fixed bottom-0 left-0 top-0 z-50 flex w-[min(20rem,85vw)] flex-col overflow-y-auto bg-white shadow-lg lg:hidden"
					>
						<div className="flex h-14 shrink-0 items-center justify-between border-b border-black-10 bg-white px-4">
							<Link
								href={routes.admin}
								onClick={closeMenu}
								aria-label="ulDocs — Administration"
								className="shrink-0"
							>
								<Image
									src="/logo.svg"
									alt="ulDocs"
									width={92}
									height={25}
									unoptimized
									className="h-4 w-auto"
								/>
							</Link>
							<button
								type="button"
								aria-label="Fermer le menu"
								onClick={closeMenu}
								className="flex size-9 cursor-pointer items-center justify-center rounded-md text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
							>
								<X aria-hidden className="size-5" />
							</button>
						</div>

						<div className="border-b border-black-10 px-4 py-5">
							{user ? (
								<>
									<div className="flex items-center gap-3">
										<UserAvatar nom={user.nom} className="size-10 text-base" />
										<div className="min-w-0">
											<p className="truncate font-semibold text-black">
												{user.nom}
											</p>
											<p className="truncate text-sm text-black-60">
												{user.email}
											</p>
										</div>
									</div>
									<span className="mt-3 inline-flex w-fit rounded-full bg-primary-10 px-2.5 py-1 text-xs font-semibold text-primary">
										Administrateur
									</span>
								</>
							) : (
								<div
									role="status"
									aria-label="Chargement du compte"
									className="h-14 animate-pulse rounded-md bg-black-5"
								/>
							)}
						</div>

						<nav
							aria-label="Navigation de l'administration"
							className="flex flex-col gap-1 p-3"
						>
							{ADMIN_NAV_ITEMS.map((item) => {
								const active = isAdminNavItemActive(item, pathname);
								const Icon = item.icon;

								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={closeMenu}
										aria-current={active ? "page" : undefined}
										className={cn(
											"flex h-11 items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
											active
												? "bg-primary text-white"
												: "text-black-70 hover:bg-black-5 hover:text-black",
										)}
									>
										<Icon aria-hidden className="size-5 shrink-0" />
										{item.label}
									</Link>
								);
							})}
						</nav>

						<div className="mt-auto border-t border-black-10 p-3">
							<Link
								href={routes.profile}
								onClick={closeMenu}
								className="flex h-11 items-center gap-3 rounded-lg px-3 text-base font-medium text-black-70 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
							>
								<UserRound aria-hidden className="size-5" />
								Mon profil
							</Link>
							<Link
								href={routes.profileSettings}
								onClick={closeMenu}
								className="flex h-11 items-center gap-3 rounded-lg px-3 text-base font-medium text-black-70 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
							>
								<Settings aria-hidden className="size-5" />
								Paramètres
							</Link>
							<Link
								href={routes.home}
								onClick={closeMenu}
								className="flex h-11 items-center gap-3 rounded-lg px-3 text-base font-medium text-black-70 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
							>
								<Home aria-hidden className="size-5" />
								Voir le site
							</Link>
							<Link
								href={routes.charter}
								onClick={closeMenu}
								className="flex h-11 items-center gap-3 rounded-lg px-3 text-base font-medium text-black-70 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
							>
								Charte de contribution
							</Link>
							<button
								type="button"
								onClick={handleLogout}
								disabled={logoutMutation.isPending}
								className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-base font-medium text-error transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50"
							>
								<LogOut aria-hidden className="size-5" />
								Déconnexion
							</button>
						</div>
					</aside>
				</>
			) : null}
		</>
	);
}
