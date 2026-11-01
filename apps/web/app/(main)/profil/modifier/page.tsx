import type { Metadata } from "next";
import { EditProfileContent } from "./components/edit-profile-content";

export const metadata: Metadata = {
	title: "Modifier mon profil — ulDocs",
	description:
		"Mets à jour ton nom et tes informations académiques sur ulDocs.",
};

export default function EditProfilePage() {
	return <EditProfileContent />;
}
