import { z } from "zod";

/** Schéma du formulaire de modification du profil. */
export const editProfileSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(1, "Le nom complet est requis.")
    .min(2, "Le nom complet doit contenir au moins 2 caractères."),
  faculteId: z.string().min(1, "Choisis ta faculté."),
  filiereId: z.string().min(1, "Choisis ta filière."),
  niveauId: z.string().min(1, "Choisis ton niveau."),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
