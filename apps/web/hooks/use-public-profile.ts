"use client";

import { useQuery } from "@tanstack/react-query";
import type { PublicUserProfile } from "shared";
import { getPublicUserProfile } from "@/lib/api/users";
import { buildPublicProfileBadges, formatProfileAcademic } from "@/lib/profile";
import { queryKeys } from "@/lib/query-keys";
import { useAcademicTree } from "./use-academic-tree";

/** GET /users/:id — profil public. */
export function usePublicUserProfile(userId: number) {
	return useQuery({
		queryKey: queryKeys.users.publicProfile(userId),
		queryFn: () => getPublicUserProfile(userId),
		enabled: Number.isInteger(userId) && userId > 0,
		retry: false,
	});
}

/** Données visuelles du profil public, dérivées du profil et de l'arbre académique. */
export function usePublicProfileSummary(profile: PublicUserProfile) {
	const academicTree = useAcademicTree();

	return {
		isAcademicLoading: academicTree.isPending,
		academicLabel: formatProfileAcademic(academicTree.data ?? [], {
			faculteId: profile.faculteId,
			filiereId: profile.filiereId,
			niveauId: profile.niveauId,
		}),
		documentsCount: profile.stats.documents,
		points: profile.points,
		views: profile.stats.views,
		rank: profile.rank,
		badges: buildPublicProfileBadges({
			documents: profile.stats.documents,
			downloads: profile.stats.downloads,
			rankPosition: profile.rank.position,
		}),
	};
}
