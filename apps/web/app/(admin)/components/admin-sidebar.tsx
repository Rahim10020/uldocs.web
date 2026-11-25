"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ADMIN_NAV_ITEMS, isAdminNavItemActive } from "@/lib/admin-navigation";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "uldocs-admin-sidebar-collapsed";

/** Navigation latérale desktop, repliable et persistée. */
export function AdminSidebar() {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	useEffect(() => {
		try {
			setCollapsed(window.localStorage.getItem(STORAGE_KEY) === "true");
		} catch {
			// Stockage indisponible : on garde l'état par défaut.
		}
	}, []);

	const toggle = () => {
		setCollapsed((value) => {
			const next = !value;

			try {
				window.localStorage.setItem(STORAGE_KEY, String(next));
			} catch {
				// Stockage indisponible : le repli reste valable pour la session.
			}

			return next;
		});
	};

	return (
		<aside
			className={cn(
				"sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 flex-col border-r border-black-10 bg-white lg:flex",
				collapsed ? "w-16" : "w-56",
			)}
		>
			<nav
				aria-label="Navigation de l'administration"
				className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
			>
				{ADMIN_NAV_ITEMS.map((item) => {
					const active = isAdminNavItemActive(item, pathname);
					const Icon = item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							title={collapsed ? item.label : undefined}
							aria-current={active ? "page" : undefined}
							className={cn(
								"flex h-10 items-center gap-3 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
								collapsed ? "justify-center px-0" : "px-3",
								active
									? "bg-primary text-white"
									: "text-black-70 hover:bg-black-5 hover:text-black",
							)}
						>
							<Icon aria-hidden className="size-5 shrink-0" />
							<span className={collapsed ? "sr-only" : "truncate"}>
								{item.label}
							</span>
						</Link>
					);
				})}
			</nav>

			<div className="border-t border-black-10 p-3">
				<button
					type="button"
					onClick={toggle}
					aria-label={
						collapsed ? "Déplier la navigation" : "Replier la navigation"
					}
					aria-expanded={!collapsed}
					title={collapsed ? "Déplier la navigation" : "Replier la navigation"}
					className={cn(
						"flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg text-sm font-medium text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
						collapsed ? "justify-center px-0" : "px-3",
					)}
				>
					{collapsed ? (
						<ChevronsRight aria-hidden className="size-5 shrink-0" />
					) : (
						<ChevronsLeft aria-hidden className="size-5 shrink-0" />
					)}
					<span className={collapsed ? "sr-only" : "truncate"}>Replier</span>
				</button>
			</div>
		</aside>
	);
}
