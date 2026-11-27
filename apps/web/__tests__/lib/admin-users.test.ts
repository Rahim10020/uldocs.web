import { describe, expect, it } from "vitest";
import {
	ADMIN_USER_STATUS_LABELS,
	adminUserReasonSchema,
	getContributionCategory,
} from "@/lib/admin-users";

describe("données de gestion admin des utilisateurs", () => {
	it("dérive la contribution du nombre de documents uploadés", () => {
		expect(getContributionCategory(0)).toBe("utilisateur");
		expect(getContributionCategory(1)).toBe("contributeur");
		expect(getContributionCategory(12)).toBe("contributeur");
	});

	it("affiche le statut supprimé comme un bannissement dans l'admin", () => {
		expect(ADMIN_USER_STATUS_LABELS.supprime).toBe("Banni");
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
