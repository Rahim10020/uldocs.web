/** Mode d'affichage d'un écran d'authentification. */
export type AuthMode = "modal" | "page";

/** Étape du parcours d'inscription. */
export type RegisterStage = "form" | "onboarding" | "success";

/** Sélection académique courante, avant sauvegarde du profil. */
export type AcademicDraft = {
	faculteId: number | null;
	filiereId: number | null;
	niveauId: number | null;
};
