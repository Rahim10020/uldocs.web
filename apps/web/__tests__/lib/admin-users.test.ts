import { CATEGORIES_CONTRIBUTION, ROLES, STATUTS_UTILISATEUR } from "shared";
import { describe, expect, it } from "vitest";
import {
	adminUserReasonSchema,
	getContributionCategory,
} from "@/lib/admin-users";
import {
	CATEGORIE_CONTRIBUTION_OPTIONS,
	ROLE_OPTIONS,
	STATUT_UTILISATEUR_LABELS,
	STATUT_UTILISATEUR_OPTIONS,
} from "@/lib/user";

describe("données de gestion admin des utilisateurs", () => {
	it("dérive la contribution du nombre de documents uploadés", () => {
		expect(getContributionCategory(0)).toBe("utilisateur");
		expect(getContributionCategory(1)).toBe("contributeur");
		expect(getContributionCategory(12)).toBe("contributeur");
	});

	it("affiche le statut supprimé comme un bannissement dans l'admin", () => {
		expect(STATUT_UTILISATEUR_LABELS.supprime).toBe("Banni");
	});

	it("dérive les options de filtre des énumérations partagées", () => {
		expect(ROLE_OPTIONS.map((option) => option.value)).toEqual([...ROLES]);
		expect(STATUT_UTILISATEUR_OPTIONS.map((option) => option.value)).toEqual([
			...STATUTS_UTILISATEUR,
		]);
		expect(
			CATEGORIE_CONTRIBUTION_OPTIONS.map((option) => option.value),
		).toEqual([...CATEGORIES_CONTRIBUTION]);
	});

	it("valide une raison d'action entre 10 et 1000 caractères", () => {
		expect(
			adminUserReasonSchema.safeParse({
				raison: "Motif suffisamment détaillé.",
			}).success,
		).toBe(true);
		expect(adminUserReasonSchema.safeParse({ raison: "court" }).success).toBe(
			false,
		);
		expect(
			adminUserReasonSchema.safeParse({
				raison: "a".repeat(1001),
			}).success,
		).toBe(false);
	});
});
