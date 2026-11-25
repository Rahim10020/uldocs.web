import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AccountSettingsPlaceholder } from "./components/account-settings-placeholder";

export const metadata: Metadata = {
	title: "Paramètres — ulDocs",
	description: "Gère les informations et les préférences de ton compte ulDocs.",
};

export default function ProfileSettingsPage() {
	return (
		<Container className="max-w-3xl py-8 lg:py-12">
			<AccountSettingsPlaceholder />
		</Container>
	);
}
