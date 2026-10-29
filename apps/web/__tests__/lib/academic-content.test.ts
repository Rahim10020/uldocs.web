import { ACADEMIC_DATA } from "shared";
import { describe, expect, it } from "vitest";
import {
	FACULTE_DESCRIPTIONS,
	FALLBACK_DESCRIPTION,
	FILIERE_DESCRIPTIONS,
	getFaculteDescription,
	getFiliereDescription,
	getUeDescription,
	UE_DESCRIPTIONS,
} from "@/lib/academic-content";

const filieres = ACADEMIC_DATA.flatMap((structure) => structure.filieres);
const ues = filieres.flatMap((filiere) => filiere.ues);

describe("descriptions académiques de démonstration", () => {
	it("couvre les 15 structures officielles", () => {
		expect(Object.keys(FACULTE_DESCRIPTIONS)).toHaveLength(15);

		for (const structure of ACADEMIC_DATA) {
			expect(getFaculteDescription(structure.code)).not.toBe(
				FALLBACK_DESCRIPTION,
			);
			expect(getFaculteDescription(structure.code).length).toBeGreaterThan(40);
		}
	});

	it("couvre les 14 filières", () => {
		expect(Object.keys(FILIERE_DESCRIPTIONS)).toHaveLength(14);

		for (const filiere of filieres) {
			expect(getFiliereDescription(filiere.nom)).not.toBe(FALLBACK_DESCRIPTION);
			expect(getFiliereDescription(filiere.nom).length).toBeGreaterThan(40);
		}
	});

	it("couvre les 52 UE", () => {
		expect(Object.keys(UE_DESCRIPTIONS)).toHaveLength(52);

		for (const ue of ues) {
			expect(getUeDescription(ue)).not.toBe(FALLBACK_DESCRIPTION);
			expect(getUeDescription(ue).length).toBeGreaterThan(30);
		}
	});

	it("ne contient aucune clé orpheline", () => {
		const facultyCodes = new Set(ACADEMIC_DATA.map((item) => item.code));
		const filiereNames = new Set(filieres.map((item) => item.nom));
		const ueNames = new Set(ues);

		expect(
			Object.keys(FACULTE_DESCRIPTIONS).every((code) => facultyCodes.has(code)),
		).toBe(true);
		expect(
			Object.keys(FILIERE_DESCRIPTIONS).every((nom) => filiereNames.has(nom)),
		).toBe(true);
		expect(Object.keys(UE_DESCRIPTIONS).every((nom) => ueNames.has(nom))).toBe(
			true,
		);
	});

	it("renvoie une description de secours pour une entité inconnue", () => {
		expect(getFaculteDescription("INCONNU")).toBe(FALLBACK_DESCRIPTION);
		expect(getFiliereDescription("Inconnue")).toBe(FALLBACK_DESCRIPTION);
		expect(getUeDescription("Inconnue")).toBe(FALLBACK_DESCRIPTION);
	});
});
