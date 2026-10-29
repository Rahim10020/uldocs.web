"use client";

import {
	ChevronDown,
	FolderDown,
	LogOut,
	ShieldCheck,
	UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useLogout } from "@/hooks/use-logout";
import { useSession } from "@/hooks/use-session";
import { routes } from "@/lib/routes";
import { getRoleLabel } from "@/lib/user";

/** Menu du compte dans le header desktop, selon l'état de la session. */
export function DesktopAccountMenu() {
	const { user, isLoading, isModerator } = useSession();
	const logoutMutation = useLogout();
	const [open, setOpen] = useState(false);
	const menuId = useId();
	const containerRef = useRef<HTMLFieldSetElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

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
	const roleLabel = user ? getRoleLabel(user.role) : null;

	const handleLogout = () => {
		closeMenu();
		logoutMutation.mutate();
	};

	return (
		<fieldset
			ref={containerRef}
			className="relative"
			aria-label="Menu du compte"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			{isLoading ? (
				<span
					role="status"
					aria-label="Chargement du compte"
					className="block size-8 animate-pulse rounded-full bg-black-10"
				/>
			) : user ? (
				<button
					ref={triggerRef}
					type="button"
					aria-expanded={open}
					aria-controls={menuId}
					aria-haspopup="true"
					aria-label={`Menu de ${user.nom}`}
					onClick={() => setOpen(true)}
					className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-md px-1.5 text-md font-semibold text-black-80 transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
				>
					<UserAvatar nom={user.nom} />
					<ChevronDown aria-hidden className="size-3.5 text-black-50" />
				</button>
			) : (
				<button
					ref={triggerRef}
					type="button"
					aria-expanded={open}
					aria-controls={menuId}
					aria-haspopup="true"
					onClick={() => setOpen(true)}
					className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md px-3 text-md font-semibold text-black-80 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
				>
					<UserRound aria-hidden className="size-4" />
					Se connecter
				</button>
			)}

			{open && !isLoading ? (
				<div
					id={menuId}
					className="absolute right-0 top-full z-50 w-72 overflow-hidden rounded-md border border-black-10 bg-white shadow-lg"
				>
					{user ? (
						<>
							<div className="border-b border-black-10 px-5 py-4">
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
								{roleLabel ? (
									<span className="mt-3 inline-flex rounded-full bg-primary-10 px-2.5 py-1 text-xs font-semibold text-primary">
										{roleLabel}
									</span>
								) : null}
							</div>
							<nav aria-label="Compte" className="flex flex-col p-2">
								<Link
									href={routes.profile}
									onClick={closeMenu}
									className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
								>
									<UserRound aria-hidden className="size-4" />
									Votre compte
								</Link>
								<Link
									href={routes.myDocuments}
									onClick={closeMenu}
									className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
								>
									<FolderDown aria-hidden className="size-4" />
									Imports &amp; Téléchargements
								</Link>
								{isModerator ? (
									<Link
										href={routes.moderation}
										onClick={closeMenu}
										className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
									>
										<ShieldCheck aria-hidden className="size-4" />
										Dashboard de modération
									</Link>
								) : null}
							</nav>
							<div className="border-t border-black-10 p-2">
								<button
									type="button"
									onClick={handleLogout}
									disabled={logoutMutation.isPending}
									className="inline-flex w-full items-center gap-2 rounded-sm px-3 py-2.5 text-left text-base text-error transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50"
								>
									<LogOut aria-hidden className="size-4" />
									Déconnexion
								</button>
							</div>
						</>
					) : (
						<>
							<p className="border-b border-black-10 px-5 py-4 text-lg font-semibold text-black">
								Bienvenue sur ulDocs !
							</p>
							<nav aria-label="Authentification" className="flex flex-col p-2">
								<Link
									href={routes.login}
									onClick={closeMenu}
									className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
								>
									<UserRound aria-hidden className="size-4" />
									Se connecter
								</Link>
								<Link
									href={routes.register}
									onClick={closeMenu}
									className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
								>
									<UserRound aria-hidden className="size-4" />
									Créer un compte
								</Link>
							</nav>
						</>
					)}
				</div>
			) : null}
		</fieldset>
	);
}
