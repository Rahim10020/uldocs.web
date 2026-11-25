import type { Metadata } from "next";
import { AdminDashboard } from "./components/admin-dashboard";

export const metadata: Metadata = {
	title: "Tableau de bord — Administration ulDocs",
	description:
		"Suis l'activité de la plateforme ulDocs : utilisateurs, documents, téléchargements et signalements.",
};

export default function AdminDashboardPage() {
	return <AdminDashboard />;
}
