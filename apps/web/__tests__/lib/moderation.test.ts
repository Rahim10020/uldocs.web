import { describe, expect, it } from "vitest";
import { parseModerationSearchState } from "@/lib/moderation";

describe("filtres de modération", () => {
	it("lit les filtres valides et la page", () => {
		const state = parseModerationSearchState(
			new URLSearchParams("statut=ouvert&motif=droit_auteur&page=2"),
		);

		expect(state).toEqual({
			statut: "ouvert",
			motif: "droit_auteur",
			page: 2,
		});
	});

	it("ignore les valeurs inconnues et retombe sur la première page", () => {
		const state = parseModerationSearchState(
			new URLSearchParams("statut=spam&motif=inconnu&page=0"),
		);

		expect(state).toEqual({
			statut: undefined,
			motif: undefined,
			page: 1,
		});
	});
});
