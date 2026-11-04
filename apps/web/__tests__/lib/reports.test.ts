import {
	ACTIONS_MODERATION,
	MOTIFS_SIGNALEMENT,
	STATUTS_SIGNALEMENT,
} from "shared";
import { describe, expect, it } from "vitest";
import {
	MODERATION_DECISION_LABELS,
	MODERATION_DECISION_OPTIONS,
	MOTIF_SIGNALEMENT_LABELS,
	MOTIF_SIGNALEMENT_OPTIONS,
	moderationDecisionSchema,
	reportDocumentSchema,
	STATUT_SIGNALEMENT_LABELS,
	STATUT_SIGNALEMENT_OPTIONS,
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

describe("libellés de modération", () => {
	it("couvre tous les statuts et décisions du contrat", () => {
		expect(Object.keys(STATUT_SIGNALEMENT_LABELS).sort()).toEqual(
			[...STATUTS_SIGNALEMENT].sort(),
		);
		expect(Object.keys(MODERATION_DECISION_LABELS).sort()).toEqual(
			[...ACTIONS_MODERATION].sort(),
		);
		expect(STATUT_SIGNALEMENT_OPTIONS).toHaveLength(STATUTS_SIGNALEMENT.length);
		expect(MODERATION_DECISION_OPTIONS).toHaveLength(ACTIONS_MODERATION.length);
	});

	it("affiche le rejet en dernier et avec le libellé du signalement", () => {
		expect(MODERATION_DECISION_OPTIONS.at(-1)).toEqual({
			value: "valider",
			label: "Rejeter le signalement",
		});
	});

	it("accepte une décision valide et nettoie la raison", () => {
		const result = moderationDecisionSchema.safeParse({
			action: "suspendre",
			raison: "  Contenu illégal confirmé par l'équipe.  ",
		});

		expect(result.success).toBe(true);

		if (result.success) {
			expect(result.data).toEqual({
				action: "suspendre",
				raison: "Contenu illégal confirmé par l'équipe.",
			});
		}
	});

	it("refuse une action vide ou une raison trop courte", () => {
		const emptyAction = moderationDecisionSchema.safeParse({
			action: "",
			raison: "Raison suffisamment longue",
		});
		const shortReason = moderationDecisionSchema.safeParse({
			action: "avertir",
			raison: "Court",
		});

		expect(emptyAction.success).toBe(false);
		expect(shortReason.success).toBe(false);
	});

	it("refuse une raison de plus de 1000 caractères", () => {
		const result = moderationDecisionSchema.safeParse({
			action: "retirer",
			raison: "a".repeat(1001),
		});

		expect(result.success).toBe(false);
	});
});
