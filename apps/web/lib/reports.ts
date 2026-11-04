import {
	ACTIONS_MODERATION,
	type ActionModeration,
	MOTIFS_SIGNALEMENT,
	type MotifSignalement,
	STATUTS_SIGNALEMENT,
	type StatutSignalement,
} from "shared";
import { z } from "zod";

/** Libellés français des motifs de signalement (UI uniquement). */
export const MOTIF_SIGNALEMENT_LABELS: Record<MotifSignalement, string> = {
	contenu_illegal: "Contenu illégal",
	erreur: "Erreur dans le document",
	doublon: "Doublon",
	mal_classe: "Mal classé",
	qualite: "Qualité médiocre (illisible)",
	droit_auteur: "Droit d'auteur",
	autre: "Autre",
};

export const MOTIF_SIGNALEMENT_OPTIONS = MOTIFS_SIGNALEMENT.map((motif) => ({
	value: motif,
	label: MOTIF_SIGNALEMENT_LABELS[motif],
}));

/** Libellés français des statuts de signalement (UI uniquement). */
export const STATUT_SIGNALEMENT_LABELS: Record<StatutSignalement, string> = {
	ouvert: "Ouvert",
	en_cours: "En attente",
	traite: "Validé",
	rejete: "Rejeté",
};

/** Options de statut prêtes à l'emploi, dans l'ordre de `STATUTS_SIGNALEMENT`. */
export const STATUT_SIGNALEMENT_OPTIONS = STATUTS_SIGNALEMENT.map((statut) => ({
	value: statut,
	label: STATUT_SIGNALEMENT_LABELS[statut],
}));

export function readMotifSignalement(
	value: string | null,
): MotifSignalement | undefined {
	return value && MOTIFS_SIGNALEMENT.includes(value as MotifSignalement)
		? (value as MotifSignalement)
		: undefined;
}

export function readStatutSignalement(
	value: string | null,
): StatutSignalement | undefined {
	return value && STATUTS_SIGNALEMENT.includes(value as StatutSignalement)
		? (value as StatutSignalement)
		: undefined;
}

/** Libellés des décisions de modération, dans le contexte d'un signalement. */
export const MODERATION_DECISION_LABELS: Record<ActionModeration, string> = {
	valider: "Rejeter le signalement",
	retirer: "Retirer le document",
	avertir: "Avertir l'uploader",
	suspendre: "Suspendre l'uploader",
	bannir: "Bannir l'uploader",
};

/**
 * Décisions proposées au modérateur : actions punitives dans l'ordre de
 * `ACTIONS_MODERATION`, puis `valider` (rejet) en dernier.
 */
export const MODERATION_DECISION_OPTIONS = [
	...ACTIONS_MODERATION.filter((action) => action !== "valider"),
	...ACTIONS_MODERATION.filter((action) => action === "valider"),
].map((action) => ({
	value: action,
	label: MODERATION_DECISION_LABELS[action],
}));

export const MODERATION_REASON_MIN_LENGTH = 10;
export const MODERATION_REASON_MAX_LENGTH = 1000;

/** Schéma du formulaire de décision de modération. */
export const moderationDecisionSchema = z.object({
	action: z
		.enum(ACTIONS_MODERATION)
		.or(z.literal(""))
		.refine((value) => value !== "", {
			message: "Choisis une action à appliquer.",
		}),
	raison: z
		.string()
		.trim()
		.min(
			MODERATION_REASON_MIN_LENGTH,
			`La raison doit contenir au moins ${MODERATION_REASON_MIN_LENGTH} caractères.`,
		)
		.max(
			MODERATION_REASON_MAX_LENGTH,
			`La raison ne peut pas dépasser ${MODERATION_REASON_MAX_LENGTH} caractères.`,
		),
});

export type ModerationDecisionFormValues = z.input<
	typeof moderationDecisionSchema
>;
export type ModerationDecisionFormOutput = z.output<
	typeof moderationDecisionSchema
>;

/** Schéma du formulaire de signalement d'un document. */
export const reportDocumentSchema = z.object({
	motif: z
		.enum(MOTIFS_SIGNALEMENT)
		.or(z.literal(""))
		.refine((value) => value !== "", {
			message: "Choisis un motif pour signaler ce document.",
		}),
	commentaire: z
		.string()
		.trim()
		.max(1000, "Les détails ne peuvent pas dépasser 1000 caractères."),
});

export type ReportDocumentFormValues = z.input<typeof reportDocumentSchema>;
export type ReportDocumentFormOutput = z.output<typeof reportDocumentSchema>;
