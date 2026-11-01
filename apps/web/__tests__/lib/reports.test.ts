import { MOTIFS_SIGNALEMENT } from "shared";
import { describe, expect, it } from "vitest";
import {
	MOTIF_SIGNALEMENT_LABELS,
	MOTIF_SIGNALEMENT_OPTIONS,
	reportDocumentSchema,
} from "@/lib/reports";

describe("signalement d’un document", () => {
	it("couvre tous les motifs du contrat", () => {
		expect(Object.keys(MOTIF_SIGNALEMENT_LABELS).sort()).toEqual(
			[...MOTIFS_SIGNALEMENT].sort(),
		);
		expect(MOTIF_SIGNALEMENT_OPTIONS).toHaveLength(MOTIFS_SIGNALEMENT.length);
	});

	it("accepte un motif valide et nettoie le détail", () => {
		const result = reportDocumentSchema.safeParse({
			motif: "mal_classe",
			commentaire: "  Ce document n'est pas dans la bonne UE.  ",
		});

		expect(result.success).toBe(true);

		if (result.success) {
			expect(result.data.motif).toBe("mal_classe");
			expect(result.data.commentaire).toBe(
				"Ce document n'est pas dans la bonne UE.",
			);
		}
	});

	it("refuse un motif vide", () => {
		const result = reportDocumentSchema.safeParse({
			motif: "",
			commentaire: "",
		});

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.error.flatten().fieldErrors.motif).toBeDefined();
		}
	});

	it("refuse un détail de plus de 1000 caractères", () => {
		const result = reportDocumentSchema.safeParse({
			motif: "autre",
			commentaire: "a".repeat(1001),
		});

		expect(result.success).toBe(false);
	});
});
