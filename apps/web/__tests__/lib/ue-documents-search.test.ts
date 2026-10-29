import { describe, expect, it } from "vitest";
import {
	parseUeDocumentsSearchState,
	toUeDocumentsParams,
} from "@/lib/ue-documents-search";

describe("état de recherche des documents d'une UE", () => {
	it("lit les paramètres par défaut", () => {
		const state = parseUeDocumentsSearchState(new URLSearchParams());

		expect(state).toEqual({
			type: undefined,
			anneeAcademique: undefined,
			tri: undefined,
			page: 1,
			view: "grid",
		});
	});

	it("lit les filtres valides", () => {
		const state = parseUeDocumentsSearchState(
			new URLSearchParams({
				type: "annale",
				anneeAcademique: "2024-2025",
				tri: "populaire",
				page: "3",
				view: "list",
			}),
		);

		expect(state).toEqual({
			type: "annale",
			anneeAcademique: "2024-2025",
			tri: "populaire",
			page: 3,
			view: "list",
		});
	});

	it("ignore les valeurs invalides", () => {
		const state = parseUeDocumentsSearchState(
			new URLSearchParams({
				type: "inconnu",
				tri: "inconnu",
				page: "0",
				view: "autre",
			}),
		);

		expect(state.type).toBeUndefined();
		expect(state.tri).toBeUndefined();
		expect(state.page).toBe(1);
		expect(state.view).toBe("grid");
	});

	it("verrouille l'ueId dans les paramètres API", () => {
		const params = toUeDocumentsParams(42, {
			type: "cours",
			anneeAcademique: "2025-2026",
			tri: "recent",
			page: 2,
			view: "grid",
		});

		expect(params).toMatchObject({
			ueId: 42,
			type: "cours",
			anneeAcademique: "2025-2026",
			tri: "recent",
			page: 2,
			pageSize: 20,
		});
	});
});
