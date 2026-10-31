import type { Metadata } from "next";
import { MyDocumentsContent } from "./components/my-documents-content";

export const metadata: Metadata = {
	title: "Mes documents — ulDocs",
	description:
		"Retrouve tous les documents que tu as importés sur ulDocs et suis leur statut.",
};

export default function MyDocumentsPage() {
	return <MyDocumentsContent />;
}
