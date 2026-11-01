import { MOTIFS_SIGNALEMENT, type MotifSignalement } from "shared";
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
