import { TYPES_DOCUMENT, type TypeDocument } from "shared";
import { z } from "zod";

const requiredSelect = (message: string) => z.string().min(1, message);

export const documentMetadataSchema = z.object({
	type: z
		.string()
		.min(1, "Choisis un type de document.")
		.refine(
			(value) => TYPES_DOCUMENT.includes(value as TypeDocument),
			"Choisis un type de document.",
		),
	faculteId: requiredSelect("Choisis une faculté."),
	filiereId: requiredSelect("Choisis une filière."),
	niveauId: requiredSelect("Choisis un niveau."),
	semestreId: requiredSelect("Choisis un semestre."),
	ueId: requiredSelect("Choisis une matière."),
	anneeAcademique: requiredSelect("Choisis une année académique."),
	certification: z
		.boolean()
		.refine(
			(value) => value,
			"Tu dois certifier avoir le droit de partager ce document.",
		),
});

export type DocumentMetadataValues = z.infer<typeof documentMetadataSchema>;
