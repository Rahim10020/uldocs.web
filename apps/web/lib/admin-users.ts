import {
	CATEGORIES_CONTRIBUTION,
	type CategorieContribution,
	ROLES,
	type Role,
	STATUTS_UTILISATEUR,
} from "shared";
import { z } from "zod";
import { STATUT_UTILISATEUR_LABELS } from "./user";

export const ADMIN_USERS_PAGE_SIZE = 8;
export const ADMIN_USER_REASON_MIN_LENGTH = 10;
export const ADMIN_USER_REASON_MAX_LENGTH = 1000;

export type AdminUserActionKind = "promote" | "suspend" | "reactivate" | "ban";

export const ADMIN_USER_ROLE_LABELS: Record<Role, string> = {
	etudiant: "Étudiant",
	moderateur: "Modérateur",
	admin: "Admin",
};

export const ADMIN_USER_ACTION_LABELS: Record<AdminUserActionKind, string> = {
	promote: "Promouvoir modérateur",
	suspend: "Suspendre",
	reactivate: "Réactiver",
	ban: "Bannir",
};

export const ADMIN_USER_CONTRIBUTION_LABELS: Record<
	CategorieContribution,
	string
> = {
	utilisateur: "Utilisateur",
	contributeur: "Contributeur",
};

export const ADMIN_USER_STATUS_LABELS = STATUT_UTILISATEUR_LABELS;

export const ADMIN_USER_STATUS_TONES: Record<
	(typeof STATUTS_UTILISATEUR)[number],
	string
> = {
	actif: "bg-success text-white",
	suspendu: "bg-warning text-black",
	supprime: "bg-error text-white",
};

export function getContributionCategory(
	nbDocumentsUploades: number,
): CategorieContribution {
	return nbDocumentsUploades > 0 ? "contributeur" : "utilisateur";
}

export const ADMIN_USER_ROLE_FILTER_OPTIONS = [
	{ value: "tous", label: "Tous" },
	...ROLES.map((role) => ({
		value: role,
		label: ADMIN_USER_ROLE_LABELS[role],
	})),
] as const;

export const ADMIN_USER_CONTRIBUTION_FILTER_OPTIONS = [
	{ value: "tous", label: "Tous" },
	...CATEGORIES_CONTRIBUTION.map((contribution) => ({
		value: contribution,
		label: ADMIN_USER_CONTRIBUTION_LABELS[contribution],
	})),
] as const;

export const ADMIN_USER_STATUS_FILTER_OPTIONS = [
	{ value: "tous", label: "Tous" },
	...STATUTS_UTILISATEUR.map((statut) => ({
		value: statut,
		label: ADMIN_USER_STATUS_LABELS[statut],
	})),
] as const;

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
