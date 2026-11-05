import type { PublicUserProfile } from "shared";
import { MOCK_DOCUMENTS } from "./documents";
import { MOCK_USERS } from "./users";

/**
 * GET /users/:id — profil public mocké.
 * Les statistiques sont dérivées des documents validés de l'utilisateur.
 */
export function getMockPublicUserProfile(
	id: number,
): PublicUserProfile | undefined {
	const user = MOCK_USERS.find((item) => item.id === id);

	if (!user) {
		return undefined;
	}

	const documents = MOCK_DOCUMENTS.filter(
		(document) => document.uploader.id === id && document.statut === "valide",
	);

	const rankedUsers = [...MOCK_USERS].sort(
		(a, b) => b.points - a.points || a.id - b.id,
	);

	return {
		id: user.id,
		nom: user.nom,
		avatarUrl: user.avatarUrl,
		faculteId: user.faculteId,
		filiereId: user.filiereId,
		niveauId: user.niveauId,
		points: user.points,
		stats: {
			documents: documents.length,
			views: documents.reduce((total, document) => total + document.nbVues, 0),
			downloads: documents.reduce(
				(total, document) => total + document.nbTelechargements,
				0,
			),
		},
		rank: {
			position: rankedUsers.findIndex((item) => item.id === id) + 1,
			totalContributors: MOCK_USERS.length,
		},
	};
}
