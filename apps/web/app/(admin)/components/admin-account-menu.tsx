"use client";

import { LogOut, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useLogout } from "@/hooks/use-logout";
import { useSession } from "@/hooks/use-session";
import { routes } from "@/lib/routes";
import { getFirstName } from "@/lib/user";

/** Menu du compte dans le header de l'administration. */
export function AdminAccountMenu() {
	const { user, isLoading } = useSession();
	const logoutMutation = useLogout();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const menuId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (pathname) {
			setOpen(false);
		}
	}, [pathname]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const onPointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
				triggerRef.current?.focus();
			}
		};

		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	const closeMenu = () => setOpen(false);

	const handleLogout = () => {
		closeMenu();
		logoutMutation.mutate();
	};

	if (isLoading || !user) {
		return (
			<span
				role="status"
				aria-label="Chargement du compte"
				className="block size-8 animate-pulse rounded-full bg-black-10"
			/>
		);
	}

	return (
		<div ref={containerRef} className="relative">
			<button
				ref={triggerRef}
				type="button"
				aria-expanded={open}
				aria-controls={menuId}
				aria-haspopup="true"
				aria-label={`Menu de ${user.nom}`}
				onClick={() => setOpen((value) => !value)}
				className="inline-flex cursor-pointer items-center gap-1 rounded-full p-0.5 transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
			>
				<UserAvatar nom={user.nom} />
			</button>

			{open ? (
				<div
					id={menuId}
					className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-black-10 bg-white shadow-lg"
				>
					<div className="border-b border-black-10 px-5 py-4">
						<p className="text-sm text-black-60">
							Bonjour {getFirstName(user.nom)} !
						</p>
						<div className="mt-1 flex items-center gap-2">
							<p className="truncate font-semibold text-black">{user.email}</p>
							<span className="shrink-0 rounded-full bg-primary-10 px-2 py-0.5 text-xs font-semibold text-primary">
								Admin
							</span>
						</div>
					</div>

					<nav aria-label="Compte" className="flex flex-col p-2">
						<Link
							href={routes.profile}
							onClick={closeMenu}
							className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						>
							<UserRound aria-hidden className="size-4" />
							Mon profil
						</Link>
						<Link
							href={routes.profileSettings}
							onClick={closeMenu}
							className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						>
							<Settings aria-hidden className="size-4" />
							Paramètres
						</Link>
					</nav>

					<div className="border-t border-black-10 p-2">
						<button
							type="button"
							onClick={handleLogout}
							disabled={logoutMutation.isPending}
							className="inline-flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2.5 text-left text-base text-error transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50"
						>
							<LogOut aria-hidden className="size-4" />
							Déconnexion
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}
