"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { MOBILE_NAV_LINKS } from "@/lib/navigation";
import { routes } from "@/lib/routes";

/** Bouton hamburger + panneau de navigation mobile. */
export function MobileMenu() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const panelId = useId();

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

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
				aria-expanded={open}
				aria-controls={panelId}
				className="flex size-10 shrink-0 items-center justify-center rounded-md text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 lg:hidden"
			>
				{open ? (
					<X aria-hidden className="size-6" />
				) : (
					<Menu aria-hidden className="size-6" />
				)}
			</button>

			{open ? (
				<div
					id={panelId}
					className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-60px)] overflow-y-auto border-b border-black-10 bg-white px-4 py-4 shadow-lg sm:px-6 lg:hidden"
				>
					<nav aria-label="Navigation mobile" className="flex flex-col">
						{MOBILE_NAV_LINKS.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className="rounded-md px-3 py-3 text-base font-medium text-black transition-colors hover:bg-black-5 hover:text-primary"
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="mt-3 flex flex-col gap-2 border-t border-black-10 pt-3">
						<Link
							href={routes.login}
							onClick={() => setOpen(false)}
							className="rounded-md px-3 py-3 text-base font-medium text-black transition-colors hover:bg-black-5 hover:text-primary"
						>
							Se connecter
						</Link>
						<ButtonLink
							href={routes.newDocument}
							onClick={() => setOpen(false)}
							className="w-full"
						>
							Contribuer
						</ButtonLink>
						<ButtonLink
							href={routes.newDocument}
							onClick={() => setOpen(false)}
							variant="secondary"
							className="w-full"
						>
							Importer
						</ButtonLink>
					</div>
				</div>
			) : null}
		</>
	);
}
