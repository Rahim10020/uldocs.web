import type { Metadata } from "next";
import { AdminUsersContent } from "./components/admin-users-content";

export const metadata: Metadata = {
	title: "Utilisateurs — Administration ulDocs",
};

export default function AdminUsersPage() {
	return <AdminUsersContent />;
}
