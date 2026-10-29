import { describe, expect, it } from "vitest";
import {
	findFaculte,
	findFiliere,
	findUe,
	listFiliereSemestres,
	listFiliereUes,
} from "@/lib/academic-navigation";
import { mockAcademic } from "@/lib/mocks/academic";

const facultes = mockAcademic.facultes;
const filieres = facultes.flatMap((faculte) => faculte.filieres);
const ues = filieres.flatMap((filiere) =>
	filiere.niveaux.flatMap((niveau) =>
		niveau.semestres.flatMap((semestre) => semestre.ues),
	),
);

const firstFiliere = filieres[0];
const firstUe = ues[0];

if (!firstFiliere || !firstUe) {
	throw new Error("Les données académiques mockées sont incomplètes.");
}

describe("navigation académique", () => {
	it("retrouve une structure par son id", () => {
		const fdd = facultes.find((faculte) => faculte.code === "FDD");

		expect(fdd).toBeDefined();
		expect(findFaculte(facultes, fdd?.id ?? -1)?.code).toBe("FDD");
	});

	it("retrouve une filière avec sa structure parente", () => {
		const context = findFiliere(facultes, firstFiliere.id);

		expect(context?.filiere.id).toBe(firstFiliere.id);
		expect(context?.faculte.filieres).toContainEqual(firstFiliere);
	});

	it("retrouve une UE avec toute sa hiérarchie", () => {
		const context = findUe(facultes, firstUe.id);

		expect(context?.ue.id).toBe(firstUe.id);
		expect(context?.semestre.ues).toContainEqual(firstUe);
		expect(context?.niveau.semestres).toContainEqual(context?.semestre);
		expect(context?.filiere.niveaux).toContainEqual(context?.niveau);
	});

	it("filtre les UE par niveau et semestre", () => {
		const context = findUe(facultes, firstUe.id);

		if (!context) {
			throw new Error("Contexte de l'UE introuvable.");
		}

		const parNiveau = listFiliereUes(context.filiere, {
			niveau: context.niveau.nom,
		});
		const parSemestre = listFiliereUes(context.filiere, {
			niveau: context.niveau.nom,
			semestre: context.semestre.nom,
		});

		expect(parNiveau).toContainEqual(context.ue);
		expect(parSemestre).toContainEqual(context.ue);
		expect(
			parNiveau.every((item) =>
				context.filiere.niveaux
					.find((niveau) => niveau.nom === context.niveau.nom)
					?.semestres.some((semestre) => semestre.ues.includes(item)),
			),
		).toBe(true);
	});

	it("liste les semestres d'un niveau", () => {
		const niveau = firstFiliere.niveaux[0];

		expect(niveau).toBeDefined();

		const semestres = listFiliereSemestres(firstFiliere, niveau?.nom);

		expect(semestres).toHaveLength(2);
		expect(
			semestres.every((semestre) => semestre.niveauId === niveau?.id),
		).toBe(true);
	});

	it("renvoie undefined pour un id inconnu", () => {
		expect(findFaculte(facultes, 999_999)).toBeUndefined();
		expect(findFiliere(facultes, 999_999)).toBeUndefined();
		expect(findUe(facultes, 999_999)).toBeUndefined();
	});
});
