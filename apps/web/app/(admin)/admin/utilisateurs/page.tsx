import { Users } from "lucide-react";
import type { Metadata } from "next";
import { AdminPlaceholder } from "../../components/admin-placeholder";

export const metadata: Metadata = {
	title: "Utilisateurs — Administration ulDocs",
};

export default function AdminUsersPage() {
	return (
		<AdminPlaceholder
			title="Gestion des utilisateurs"
			description="Recherche, rôle et statut des comptes seront disponibles avec la prochaine maquette."
			icon={Users}
		/>
	);
}
