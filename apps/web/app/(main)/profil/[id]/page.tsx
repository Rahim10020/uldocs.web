import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfileSkeleton } from "../components/profile-skeleton";
import { PublicProfileRoute } from "./components/public-profile-route";

export const metadata: Metadata = {
	title: "Profil public — ulDocs",
	description:
		"Découvre le profil public d'un contributeur et les documents qu'il a publiés sur ulDocs.",
};

type PublicProfilePageProps = {
	params: Promise<{ id: string }>;
};

export default function PublicProfilePage({ params }: PublicProfilePageProps) {
	return (
		<Suspense fallback={<ProfileSkeleton />}>
			<PublicProfileRoute params={params} />
		</Suspense>
	);
}
