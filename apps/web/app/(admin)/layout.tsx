import type { ReactNode } from "react";
import { AdminShell } from "./components/admin-shell";

// Les pages admin dépendent d'une session vérifiée côté client avant affichage.
export const instant = false;

export default function AdminLayout({ children }: { children: ReactNode }) {
	return <AdminShell>{children}</AdminShell>;
}
