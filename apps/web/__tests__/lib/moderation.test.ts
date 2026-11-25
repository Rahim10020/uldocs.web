import { describe, expect, it } from "vitest";
import {
	moderationDashboardHref,
	moderationReportHref,
	parseModerationSearchState,
} from "@/lib/moderation";

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

describe("routes de modération", () => {
	it("garde les détails dans le contexte admin quand il est sélectionné", () => {
		expect(moderationReportHref(42, "admin")).toBe("/admin/moderation/42");
		expect(moderationDashboardHref("admin")).toBe("/admin/moderation");
	});

	it("conserve les routes générales pour la modération classique", () => {
		expect(moderationReportHref(42, "general")).toBe("/moderation/42");
		expect(moderationDashboardHref("general")).toBe("/moderation");
	});
});
