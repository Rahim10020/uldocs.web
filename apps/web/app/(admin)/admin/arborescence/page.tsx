import { FolderTree } from "lucide-react";
import type { Metadata } from "next";
import { AdminPlaceholder } from "../../components/admin-placeholder";

export const metadata: Metadata = {
	title: "Arborescence — Administration ulDocs",
};

export default function AdminTreePage() {
	return (
		<AdminPlaceholder
			title="Arborescence académique"
			description="La gestion des facultés, filières, niveaux et UE sera ajoutée dans une prochaine tranche."
			icon={FolderTree}
		/>
	);
}
