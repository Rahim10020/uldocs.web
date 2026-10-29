import { describe, expect, it } from "vitest";
import {
	forgotPasswordSchema,
	loginSchema,
	registerSchema,
} from "@/lib/auth-schemas";

describe("schémas d’authentification", () => {
	it("accepte des identifiants valides", () => {
		const result = loginSchema.safeParse({
			email: "akouvi.mensah@etu.univ-lome.tg",
			motDePasse: "uldocs2026",
		});

		expect(result.success).toBe(true);
	});

	it("refuse un email invalide et un mot de passe trop court", () => {
		const result = loginSchema.safeParse({
			email: "pas-un-email",
			motDePasse: "court",
		});

		expect(result.success).toBe(false);

		if (!result.success) {
			const fields = result.error.flatten().fieldErrors;
			expect(fields.email).toBeDefined();
			expect(fields.motDePasse).toBeDefined();
		}
	});

	it("refuse une confirmation différente du mot de passe", () => {
		const result = registerSchema.safeParse({
			nom: "Akouvi Mensah",
			email: "akouvi@etu.univ-lome.tg",
			motDePasse: "uldocs2026",
			confirmation: "uldocs2027",
			charte: true,
		});

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.error.flatten().fieldErrors.confirmation?.[0]).toBe(
				"Les mots de passe ne correspondent pas.",
			);
		}
	});

	it("exige l’acceptation de la charte", () => {
		const result = registerSchema.safeParse({
			nom: "Akouvi Mensah",
			email: "akouvi@etu.univ-lome.tg",
			motDePasse: "uldocs2026",
			confirmation: "uldocs2026",
			charte: false,
		});

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.error.flatten().fieldErrors.charte).toBeDefined();
		}
	});

	it("valide une demande de mot de passe oublié", () => {
		expect(
			forgotPasswordSchema.safeParse({
				email: "akouvi@etu.univ-lome.tg",
			}).success,
		).toBe(true);
	});
});
