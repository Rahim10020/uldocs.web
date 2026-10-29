import { z } from "zod";

const emailSchema = z
	.string()
	.trim()
	.min(1, "L’adresse email est requise.")
	.email("Adresse email invalide.");

const passwordSchema = z
	.string()
	.min(1, "Le mot de passe est requis.")
	.min(8, "Le mot de passe doit contenir au moins 8 caractères.");

export const loginSchema = z.object({
	email: emailSchema,
	motDePasse: passwordSchema,
});

export const registerSchema = z
	.object({
		nom: z
			.string()
			.trim()
			.min(1, "Le nom complet est requis.")
			.min(2, "Le nom complet doit contenir au moins 2 caractères."),
		email: emailSchema,
		motDePasse: passwordSchema,
		confirmation: z.string().min(1, "Confirme ton mot de passe."),
		charte: z
			.boolean()
			.refine((value) => value, "Tu dois accepter la charte de contribution."),
	})
	.refine((values) => values.motDePasse === values.confirmation, {
		message: "Les mots de passe ne correspondent pas.",
		path: ["confirmation"],
	});

export const forgotPasswordSchema = z.object({
	email: emailSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
