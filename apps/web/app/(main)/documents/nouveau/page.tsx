import type { Metadata } from "next";
import { NewDocumentFlow } from "./components/new-document-flow";

export const metadata: Metadata = {
	title: "Importer un document — ulDocs",
	description:
		"Partage un cours, un examen ou un corrigé avec les étudiants de l’Université de Lomé.",
};

export default function NewDocumentPage() {
	return <NewDocumentFlow />;
}
