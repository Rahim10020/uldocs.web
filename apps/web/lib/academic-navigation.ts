import type { FaculteTree, UE } from "shared";

/**
 * Helpers de lecture de l'arbre académique.
 * L'arbre est déjà ordonné (niveaux, semestres, UE) par le seed.
 */

export type AcademicFiliere = FaculteTree["filieres"][number];
export type AcademicNiveau = AcademicFiliere["niveaux"][number];
export type AcademicSemestre = AcademicNiveau["semestres"][number];

export type FiliereContext = {
	faculte: FaculteTree;
	filiere: AcademicFiliere;
};

export type UeContext = {
	faculte: FaculteTree;
	filiere: AcademicFiliere;
	niveau: AcademicNiveau;
	semestre: AcademicSemestre;
	ue: UE;
};

export function findFaculte(
	facultes: FaculteTree[],
	faculteId: number,
): FaculteTree | undefined {
	return facultes.find((faculte) => faculte.id === faculteId);
}

export function findFiliere(
	facultes: FaculteTree[],
	filiereId: number,
): FiliereContext | undefined {
	for (const faculte of facultes) {
		const filiere = faculte.filieres.find((item) => item.id === filiereId);

		if (filiere) {
			return { faculte, filiere };
		}
	}

	return undefined;
}

export function findUe(
	facultes: FaculteTree[],
	ueId: number,
): UeContext | undefined {
	for (const faculte of facultes) {
		for (const filiere of faculte.filieres) {
			for (const niveau of filiere.niveaux) {
				for (const semestre of niveau.semestres) {
					const ue = semestre.ues.find((item) => item.id === ueId);

					if (ue) {
						return { faculte, filiere, niveau, semestre, ue };
					}
				}
			}
		}
	}

	return undefined;
}

/** Semestres d'une filière, éventuellement limités à un niveau. */
export function listFiliereSemestres(
	filiere: AcademicFiliere,
	niveauNom?: string,
): AcademicSemestre[] {
	return filiere.niveaux
		.filter((niveau) => !niveauNom || niveau.nom === niveauNom)
		.flatMap((niveau) => niveau.semestres);
}

/**
 * UE d'une filière, filtrées par niveau et/ou semestre.
 * L'ordre de l'arbre est conservé pour rester stable dans l'UI.
 */
export function listFiliereUes(
	filiere: AcademicFiliere,
	filters: { niveau?: string; semestre?: string } = {},
): UE[] {
	return listFiliereSemestres(filiere, filters.niveau)
		.filter(
			(semestre) => !filters.semestre || semestre.nom === filters.semestre,
		)
		.flatMap((semestre) => semestre.ues);
}
