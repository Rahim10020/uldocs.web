import { FileText } from "lucide-react";
import type { Metadata } from "next";
import { AdminPlaceholder } from "../../components/admin-placeholder";

export const metadata: Metadata = {
	title: "Documents — Administration ulDocs",
};

export default function AdminDocumentsPage() {
	return (
		<AdminPlaceholder
			title="Gestion des documents"
			description="Validation, retrait et suivi des documents arriveront avec la prochaine maquette."
			icon={FileText}
		/>
	);
}
