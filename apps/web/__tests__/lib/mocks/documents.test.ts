import { describe, expect, it } from "vitest";
import { getUeContextByName } from "@/lib/mocks/academic";
import {
	listMockDocumentsByUploader,
	MOCK_DOCUMENTS,
	searchMockDocuments,
} from "@/lib/mocks/documents";

const pendingIds = new Set(
	MOCK_DOCUMENTS.filter((doc) => doc.statut !== "valide").map((doc) => doc.id),
);

describe("documents mockés", () => {
	it("résout chaque document vers une UE officielle", () => {
		for (const doc of MOCK_DOCUMENTS) {
			const context = getUeContextByName(doc.ue.nom);

			expect(context).toBeDefined();
			expect(doc.ue.id).toBe(context?.ue.id);
			expect(doc.niveau).toBe(context?.niveau.nom);
			expect(doc.semestre).toBe(context?.semestre.nom);
			expect(doc.faculte.id).toBe(context?.faculte.id);
		}
	});

	it("n'expose pas les documents en attente dans la recherche publique", () => {
		const result = searchMockDocuments({ pageSize: 50 });

		expect(result.data.some((doc) => pendingIds.has(doc.id))).toBe(false);
	});

	it("pagine les résultats", () => {
		const first = searchMockDocuments({ page: 1, pageSize: 10 });
		const second = searchMockDocuments({ page: 2, pageSize: 10 });

		expect(first.data).toHaveLength(10);
		expect(first.total).toBeGreaterThan(10);
		expect(second.data[0]?.id).not.toBe(first.data[0]?.id);
	});

	it("filtre par faculté, niveau et type", () => {
		const fdd = getUeContextByName("Droit Civil")?.faculte;

		expect(fdd).toBeDefined();

		const parFaculte = searchMockDocuments({
			faculteId: fdd?.id,
			pageSize: 50,
		});
		const parNiveau = searchMockDocuments({ niveau: "L1", pageSize: 50 });
		const parType = searchMockDocuments({ type: "annale", pageSize: 50 });

		expect(parFaculte.data.length).toBeGreaterThan(0);
		expect(parFaculte.data.every((doc) => doc.faculte.id === fdd?.id)).toBe(
			true,
		);
		expect(parNiveau.data.every((doc) => doc.niveau === "L1")).toBe(true);
		expect(parType.data.every((doc) => doc.type === "annale")).toBe(true);
	});

	it("recherche par mot-clé", () => {
		const result = searchMockDocuments({ q: "droit civil", pageSize: 50 });

		expect(result.data.length).toBeGreaterThan(0);
		expect(
			result.data.every(
				(doc) =>
					doc.titre.toLowerCase().includes("droit civil") ||
					doc.ue.nom.toLowerCase().includes("droit civil"),
			),
		).toBe(true);
	});

	it("trie par popularité décroissante", () => {
		const result = searchMockDocuments({ tri: "populaire", pageSize: 50 });
		const telechargements = result.data.map((doc) => doc.nbTelechargements);

		expect(telechargements).toEqual([...telechargements].sort((a, b) => b - a));
	});

	it("liste les documents de l'utilisateur courant, en attente compris", () => {
		const mine = listMockDocumentsByUploader(1);

		expect(mine.total).toBeGreaterThan(0);
		expect(mine.data.every((doc) => doc.uploader.id === 1)).toBe(true);
		expect(mine.data.some((doc) => pendingIds.has(doc.id))).toBe(true);
	});

	it("couvre plusieurs niveaux et semestres pour la démo", () => {
		const result = searchMockDocuments({ pageSize: 50 });
		const niveaux = new Set(result.data.map((doc) => doc.niveau));
		const semestres = new Set(result.data.map((doc) => doc.semestre));

		expect(niveaux.size).toBeGreaterThanOrEqual(4);
		expect(semestres.size).toBeGreaterThanOrEqual(4);
	});
});
