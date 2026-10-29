import { randomUUID } from "node:crypto";
import type { Utilisateur } from "shared";
import { beforeEach, describe, expect, it } from "vitest";
import { mockRequest } from "@/lib/mocks/handlers";
import { MOCK_PASSWORD, resetMockAuth } from "@/lib/mocks/users";

describe("mocks d’authentification", () => {
	beforeEach(() => {
		resetMockAuth();
	});

	it("expose Akouvi comme session par défaut", async () => {
		const user = (await mockRequest("/auth/me")) as Utilisateur;

		expect(user.nom).toBe("Akouvi Mensah");
		expect(user.role).toBe("etudiant");
	});

	it("refuse la session après déconnexion", async () => {
		await mockRequest("/auth/logout", { method: "POST" });

		await expect(mockRequest("/auth/me")).rejects.toMatchObject({
			status: 401,
			code: "UNAUTHORIZED",
		});
	});

	it("refuse des identifiants incorrects", async () => {
		await expect(
			mockRequest("/auth/login", {
				method: "POST",
				body: JSON.stringify({
					email: "akouvi.mensah@etu.univ-lome.tg",
					motDePasse: "mauvais-mot-de-passe",
				}),
			}),
		).rejects.toMatchObject({ status: 401, code: "INVALID_CREDENTIALS" });
	});

	it("connecte un utilisateur existant", async () => {
		const user = (await mockRequest("/auth/login", {
			method: "POST",
			body: JSON.stringify({
				email: "akouvi.mensah@etu.univ-lome.tg",
				motDePasse: MOCK_PASSWORD,
			}),
		})) as Utilisateur;

		expect(user.id).toBe(1);
		expect((await mockRequest("/auth/me")) as Utilisateur).toMatchObject({
			id: 1,
			nom: "Akouvi Mensah",
		});
	});

	it("refuse un email déjà inscrit", async () => {
		await expect(
			mockRequest("/auth/register", {
				method: "POST",
				body: JSON.stringify({
					nom: "Akouvi Bis",
					email: "akouvi.mensah@etu.univ-lome.tg",
					motDePasse: MOCK_PASSWORD,
				}),
			}),
		).rejects.toMatchObject({ status: 409, code: "EMAIL_ALREADY_USED" });
	});

	it("crée un compte, complète le profil puis permet de se reconnecter", async () => {
		const email = `test.${randomUUID()}@etu.univ-lome.tg`;
		const registered = (await mockRequest("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				nom: "Test Étudiant",
				email,
				motDePasse: MOCK_PASSWORD,
			}),
		})) as Utilisateur;

		expect(registered.email).toBe(email);
		expect(registered.role).toBe("etudiant");
		expect(registered.faculteId).toBeNull();

		const updated = (await mockRequest("/auth/me", {
			method: "PATCH",
			body: JSON.stringify({
				faculteId: 1,
				filiereId: 2,
				niveauId: 3,
			}),
		})) as Utilisateur;

		expect(updated).toMatchObject({
			id: registered.id,
			faculteId: 1,
			filiereId: 2,
			niveauId: 3,
		});

		await mockRequest("/auth/logout", { method: "POST" });

		const loggedIn = (await mockRequest("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, motDePasse: MOCK_PASSWORD }),
		})) as Utilisateur;

		expect(loggedIn.id).toBe(registered.id);
	});

	it("protège la mise à jour du profil sans session", async () => {
		resetMockAuth(null);

		await expect(
			mockRequest("/auth/me", {
				method: "PATCH",
				body: JSON.stringify({ faculteId: 1 }),
			}),
		).rejects.toMatchObject({ status: 401 });
	});
});
