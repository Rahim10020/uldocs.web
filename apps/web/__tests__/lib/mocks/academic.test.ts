import { ACADEMIC_DATA } from "shared";
import { describe, expect, it } from "vitest";
import { getUeContext, mockAcademic } from "@/lib/mocks/academic";

const filieres = mockAcademic.facultes.flatMap((faculte) => faculte.filieres);
const niveaux = filieres.flatMap((filiere) => filiere.niveaux);
const semestres = niveaux.flatMap((niveau) => niveau.semestres);
const ues = semestres.flatMap((semestre) => semestre.ues);

function expectUniqueIds(items: { id: number }[]) {
	const ids = items.map((item) => item.id);

	expect(new Set(ids).size).toBe(ids.length);
}

describe("seed académique", () => {
	it("insère les 15 structures officielles", () => {
		expect(mockAcademic.facultes).toHaveLength(15);
		expect([...mockAcademic.facultes.map((item) => item.code)].sort()).toEqual(
			[...ACADEMIC_DATA.map((item) => item.code)].sort(),
		);
	});

	it("compte 14 filières et 52 UE", () => {
		expect(filieres).toHaveLength(14);
		expect(ues).toHaveLength(52);
	});

	it("laisse 7 structures sans filière documentée", () => {
		const vides = mockAcademic.facultes.filter(
			(faculte) => faculte.filieres.length === 0,
		);

		expect(vides).toHaveLength(7);
	});

	it("attribue un semestre valide à chaque UE", () => {
		for (const ue of ues) {
			const context = getUeContext(ue.id);

			expect(context).toBeDefined();
			expect(context?.semestre.id).toBe(ue.semestreId);
			expect(context?.semestre.ues).toContainEqual(ue);
		}
	});

	it("garantit des ids uniques dans chaque table", () => {
		expectUniqueIds(mockAcademic.facultes);
		expectUniqueIds(filieres);
		expectUniqueIds(niveaux);
		expectUniqueIds(semestres);
		expectUniqueIds(ues);
	});

	it("dérive deux semestres par niveau", () => {
		for (const niveau of niveaux) {
			expect(niveau.semestres).toHaveLength(2);
		}
	});
});
