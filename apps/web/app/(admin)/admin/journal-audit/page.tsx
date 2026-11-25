import { ScrollText } from "lucide-react";
import type { Metadata } from "next";
import { AdminPlaceholder } from "../../components/admin-placeholder";

export const metadata: Metadata = {
	title: "Journal d'audit — Administration ulDocs",
};

export default function AdminAuditPage() {
	return (
		<AdminPlaceholder
			title="Journal d'audit"
			description="Le journal complet, ses filtres et son export seront disponibles avec une maquette dédiée."
			icon={ScrollText}
		/>
	);
}
