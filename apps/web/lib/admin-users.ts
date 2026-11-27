import type { CategorieContribution } from "shared";
import { z } from "zod";

export const ADMIN_USERS_PAGE_SIZE = 8;
export const ADMIN_USER_REASON_MIN_LENGTH = 10;
export const ADMIN_USER_REASON_MAX_LENGTH = 1000;

export type AdminUserActionKind = "promote" | "suspend" | "reactivate" | "ban";

export const ADMIN_USER_ACTION_LABELS: Record<AdminUserActionKind, string> = {
	promote: "Promouvoir modérateur",
	suspend: "Suspendre",
	reactivate: "Réactiver",
	ban: "Bannir",
};

export function getContributionCategory(
	nbDocumentsUploades: number,
): CategorieContribution {
	return nbDocumentsUploades > 0 ? "contributeur" : "utilisateur";
}

export const adminUserReasonSchema = z.object({
	raison: z
		.string()
		.trim()
		.min(
			ADMIN_USER_REASON_MIN_LENGTH,
			"La raison doit contenir au moins 10 caractères.",
		)
		.max(
			ADMIN_USER_REASON_MAX_LENGTH,
			"La raison ne peut pas dépasser 1000 caractères.",
		),
});

export type AdminUserReasonValues = z.infer<typeof adminUserReasonSchema>;
