"use client";

import type { Utilisateur } from "shared";
import { PROFILE_BADGES, PROFILE_MOCK } from "@/lib/mocks/profile";
import { formatProfileAcademic } from "@/lib/profile";
import { useAcademicTree } from "./use-academic-tree";
import { useMyDocuments } from "./use-my-documents";

/** Données de l'en-tête du profil, réutilisées par les composants visuels. */
export function useProfileSummary(user: Utilisateur) {
	const academicTree = useAcademicTree();
	const documents = useMyDocuments(1, 1);

	return {
		isAcademicLoading: academicTree.isPending,
		academicLabel: formatProfileAcademic(academicTree.data ?? [], user),
		documentsCount: documents.data?.total ?? 0,
		points: user.points,
		views: PROFILE_MOCK.views,
		rank: {
			position: PROFILE_MOCK.rank,
			totalContributors: PROFILE_MOCK.totalContributors,
		},
		badges: PROFILE_BADGES,
	};
}
