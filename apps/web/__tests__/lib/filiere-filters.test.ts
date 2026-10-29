import { describe, expect, it } from "vitest";
import {
	parseFiliereFilters,
	resolveFiliereFilters,
} from "@/lib/filiere-filters";
import { mockAcademic } from "@/lib/mocks/academic";

const filiereCandidate = mockAcademic.facultes
	.flatMap((faculte) => faculte.filieres)
	.find((item) => item.niveaux.length > 0);

if (!filiereCandidate) {
	throw new Error("Aucune filière mockée avec des niveaux.");
}

const filiere = filiereCandidate;

describe("filtres de filière", () => {
	it("lit le niveau et le semestre depuis l'URL", () => {
		const state = parseFiliereFilters(
			new URLSearchParams({ niveau: "L1", semestre: "S1" }),
		);

		expect(state).toEqual({ niveau: "L1", semestre: "S1" });
	});

	it("ignore les filtres absents de la filière", () => {
		const state = resolveFiliereFilters(filiere, {
			niveau: "Doctorat",
			semestre: "S99",
		});

		expect(state).toEqual({ niveau: undefined, semestre: undefined });
	});

	it("conserve un niveau valide et rejette un semestre hors niveau", () => {
		const niveau = filiere.niveaux[0];
		const state = resolveFiliereFilters(filiere, {
			niveau: niveau.nom,
			semestre: "S99",
		});

		expect(state.niveau).toBe(niveau.nom);
		expect(state.semestre).toBeUndefined();
	});

	it("conserve un semestre valide", () => {
		const niveau = filiere.niveaux[0];
		const semestre = niveau.semestres[0];
		const state = resolveFiliereFilters(filiere, {
			niveau: niveau.nom,
			semestre: semestre.nom,
		});

		expect(state).toEqual({
			niveau: niveau.nom,
			semestre: semestre.nom,
		});
	});
});
