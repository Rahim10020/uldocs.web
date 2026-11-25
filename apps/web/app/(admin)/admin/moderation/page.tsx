import type { Metadata } from "next";
import { Suspense } from "react";
import { ModerationContent } from "@/app/(main)/moderation/components/moderation-content";
import { ModerationPageSkeleton } from "@/app/(main)/moderation/components/moderation-skeleton";

export const metadata: Metadata = {
	title: "Modération — Administration ulDocs",
	description:
		"Traite les signalements des documents partagés sur ulDocs depuis l'espace d'administration.",
};

export default function AdminModerationPage() {
	return (
		<Suspense fallback={<ModerationPageSkeleton />}>
			<ModerationContent />
		</Suspense>
	);
}
