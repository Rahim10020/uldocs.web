import type { FaculteTree, Utilisateur } from "shared";

export type AcademicSelection = {
	faculteId: string;
	filiereId: string;
	niveauId: string;
};

type ProfileAcademicInfo = Pick<
	Utilisateur,
	"faculteId" | "filiereId" | "niveauId"
>;

/**
 * Retrouve la sélection académique du profil dans l'arbre officiel.
 * Les identifiants inconnus sont ignorés au lieu de casser la cascade.
 */
export function resolveAcademicSelection(
	facultes: FaculteTree[],
	user: ProfileAcademicInfo,
): AcademicSelection | null {
	const faculte =
		facultes.find((item) => item.id === user.faculteId) ??
		facultes.find((item) =>
			item.filieres.some((filiere) => filiere.id === user.filiereId),
		) ??
		facultes.find((item) =>
			item.filieres.some((filiere) =>
				filiere.niveaux.some((niveau) => niveau.id === user.niveauId),
			),
		);

	if (!faculte) {
		return null;
	}

	const filiere =
		faculte.filieres.find((item) => item.id === user.filiereId) ??
		faculte.filieres.find((item) =>
			item.niveaux.some((niveau) => niveau.id === user.niveauId),
		);

	if (!filiere) {
		return {
			faculteId: String(faculte.id),
			filiereId: "",
			niveauId: "",
		};
	}

	const niveau = filiere.niveaux.find((item) => item.id === user.niveauId);

	return {
		faculteId: String(faculte.id),
		filiereId: String(filiere.id),
		niveauId: niveau ? String(niveau.id) : "",
	};
}
