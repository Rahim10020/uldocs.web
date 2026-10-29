import {
	type AcademicFiliere,
	listFiliereSemestres,
} from "./academic-navigation";
import { readString } from "./document-search";

export type FiliereFiltersState = {
	niveau?: string;
	semestre?: string;
};

export function parseFiliereFilters(
	searchParams: URLSearchParams,
): FiliereFiltersState {
	return {
		niveau: readString(searchParams.get("niveau")),
		semestre: readString(searchParams.get("semestre")),
	};
}

/**
 * Ne conserve que les filtres réellement présents dans la filière.
 * Évite qu'un ancien paramètre d'URL bloque silencieusement les résultats.
 */
export function resolveFiliereFilters(
	filiere: AcademicFiliere | undefined,
	state: FiliereFiltersState,
): FiliereFiltersState {
	if (!filiere) {
		return {};
	}

	const niveau = filiere.niveaux.some((item) => item.nom === state.niveau)
		? state.niveau
		: undefined;

	const semestres = listFiliereSemestres(filiere, niveau);
	const semestre = semestres.some((item) => item.nom === state.semestre)
		? state.semestre
		: undefined;

	return { niveau, semestre };
}
