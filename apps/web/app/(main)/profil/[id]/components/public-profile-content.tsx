"use client";

import { useState } from "react";
import type { PublicUserProfile } from "shared";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
	usePublicProfileSummary,
	usePublicUserProfile,
} from "@/hooks/use-public-profile";
import { usePublicUserDocuments } from "@/hooks/use-public-user-documents";
import { ApiError } from "@/lib/api/client";
import { PROFILE_PAGE_SIZE } from "@/lib/profile";
import { routes } from "@/lib/routes";
import { ProfileBadges } from "../../components/profile-badges";
import { ProfileHeader } from "../../components/profile-header";
import { ProfileSkeleton } from "../../components/profile-skeleton";
import { ProfileStats } from "../../components/profile-stats";
import { PublicProfileDocuments } from "./public-profile-documents";

/** Profil public en lecture seule : identité, statistiques, badges et documents. */
export function PublicProfileContent({ userId }: { userId: number }) {
	const { data, isPending, isError, error, refetch } =
		usePublicUserProfile(userId);

	if (isPending) {
		return <ProfileSkeleton />;
	}

	if (isError) {
		const notFound = error instanceof ApiError && error.status === 404;

		return (
			<PublicProfileError
				notFound={notFound}
				onRetry={notFound ? undefined : () => void refetch()}
			/>
		);
	}

	if (!data) {
		return <PublicProfileError notFound={false} />;
	}

	return <PublicProfileView profile={data} />;
}

function PublicProfileView({ profile }: { profile: PublicUserProfile }) {
	const [documentsPage, setDocumentsPage] = useState(1);
	const summary = usePublicProfileSummary(profile);
	const documents = usePublicUserDocuments(
		profile.id,
		documentsPage,
		PROFILE_PAGE_SIZE,
	);

	return (
		<Container className="py-8 sm:py-12">
			<ProfileHeader
				user={profile}
				academicLabel={summary.academicLabel}
				isAcademicLoading={summary.isAcademicLoading}
				rank={summary.rank}
				editable={false}
			/>

			<div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
				<ProfileStats
					documents={summary.documentsCount}
					points={summary.points}
					views={summary.views}
				/>
				<ProfileBadges badges={summary.badges} />
			</div>

			<PublicProfileDocuments
				query={documents}
				page={documentsPage}
				onPageChange={setDocumentsPage}
			/>
		</Container>
	);
}

function PublicProfileError({
	notFound,
	onRetry,
}: {
	notFound: boolean;
	onRetry?: () => void;
}) {
	return (
		<Container className="max-w-2xl py-8 lg:py-12">
			<div className="rounded-md border border-black-10 bg-surface p-8 text-center sm:p-10">
				<h1 className="text-xl font-semibold text-black">
					{notFound ? "Profil introuvable" : "Profil indisponible"}
				</h1>
				<p className="mt-2 text-sm text-black-60">
					{notFound
						? "Cet utilisateur n'existe pas ou son profil n'est plus disponible."
						: "Impossible de charger ce profil pour le moment."}
				</p>
				<div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
					{onRetry ? (
						<Button variant="secondary" onClick={onRetry}>
							Réessayer
						</Button>
					) : null}
					<ButtonLink href={routes.documents}>
						Explorer les documents
					</ButtonLink>
				</div>
			</div>
		</Container>
	);
}
