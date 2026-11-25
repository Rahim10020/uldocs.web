import type { LucideIcon } from "lucide-react";
import {
	FileText,
	FolderTree,
	LayoutDashboard,
	ScrollText,
	ShieldCheck,
	Users,
} from "lucide-react";
import type { Route } from "next";
import { routes } from "./routes";

export type AdminNavItem = {
	href: Route;
	label: string;
	icon: LucideIcon;
	/** Correspondance exacte pour ne pas activer le dashboard sur ses enfants. */
	exact?: boolean;
};

/** Navigation principale de l'espace d'administration. */
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
	{
		href: routes.admin,
		label: "Tableau de bord",
		icon: LayoutDashboard,
		exact: true,
	},
	{
		href: routes.adminModeration,
		label: "Modération",
		icon: ShieldCheck,
	},
	{
		href: routes.adminUsers,
		label: "Utilisateurs",
		icon: Users,
	},
	{
		href: routes.adminDocuments,
		label: "Documents",
		icon: FileText,
	},
	{
		href: routes.adminTree,
		label: "Arborescence",
		icon: FolderTree,
	},
	{
		href: routes.adminAudit,
		label: "Journal d'audit",
		icon: ScrollText,
	},
];

/** `true` si l'item correspond à la route courante. */
export function isAdminNavItemActive(
	item: AdminNavItem,
	pathname: string,
): boolean {
	if (item.exact) {
		return pathname === item.href;
	}

	return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
