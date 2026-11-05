import type { DocumentListItem, Paginated, PublicUserProfile } from "shared";
import { beforeEach, describe, expect, it } from "vitest";
import {
	listMockDocumentsByUploader,
	listMockPublicDocumentsByUploader,
	resetMockDocuments,
} from "@/lib/mocks/documents";
import { mockRequest } from "@/lib/mocks/handlers";
import { getMockPublicUserProfile } from "@/lib/mocks/public-users";
import { resetMockAuth } from "@/lib/mocks/users";

describe("profils publics mockés", () => {
	beforeEach(() => {
		resetMockAuth();
		resetMockDocuments();
	});

	it("construit un profil public sans donnée privée", () => {
		const profile = getMockPublicUserProfile(1);

		expect(profile).toBeDefined();
		expect(profile?.nom).toBe("Akouvi Mensah");
		expect(profile).not.toHaveProperty("email");
		expect(profile).not.toHaveProperty("statut");
		expect(profile).not.toHaveProperty("derniereConnexion");
	});

	it("dérive les statistiques des documents validés", () => {
		const profile = getMockPublicUserProfile(1);
		const documents = listMockPublicDocumentsByUploader(1, 1, 50);

		expect(profile?.stats.documents).toBe(documents.total);
		expect(
			documents.data.every((document) => document.statut === "valide"),
		).toBe(true);
	});

	it("ne liste que les documents validés d'un utilisateur", () => {
		const allDocuments = listMockDocumentsByUploader(1, 1, 50);
		const publicDocuments = listMockPublicDocumentsByUploader(1, 1, 50);

		expect(publicDocuments.total).toBeLessThan(allDocuments.total);
		expect(
			publicDocuments.data.every((document) => document.statut === "valide"),
		).toBe(true);
	});

	it("sert le profil public via le routeur mock, même sans session", async () => {
		resetMockAuth(null);

		const profile = (await mockRequest("/users/1")) as PublicUserProfile;

		expect(profile.id).toBe(1);
		expect(profile.nom).toBe("Akouvi Mensah");
	});

	it("renvoie les documents publics via le routeur mock", async () => {
		const page = (await mockRequest(
			"/users/1/documents?page=1&pageSize=50",
		)) as Paginated<DocumentListItem>;

		expect(page.data.length).toBeGreaterThan(0);
		expect(page.data.every((document) => document.statut === "valide")).toBe(
			true,
		);
	});

	it("renvoie 404 pour un utilisateur inconnu", async () => {
		await expect(mockRequest("/users/9999")).rejects.toMatchObject({
			status: 404,
			code: "NOT_FOUND",
		});

		await expect(mockRequest("/users/9999/documents")).rejects.toMatchObject({
			status: 404,
			code: "NOT_FOUND",
		});
	});
});
