import type {
	DocumentDetail,
	DocumentListItem,
	FaculteTree,
	Paginated,
} from "shared";
import { beforeEach, describe, expect, it } from "vitest";
import { resetMockReactions } from "@/lib/mocks/documents";
import { mockRequest } from "@/lib/mocks/handlers";

describe("routeur mock", () => {
	beforeEach(() => {
		resetMockReactions();
	});

	it("renvoie l'arbre académique", async () => {
		const tree = (await mockRequest("/academic/tree")) as FaculteTree[];

		expect(tree).toHaveLength(15);
	});

	it("renvoie une liste paginée", async () => {
		const page = (await mockRequest(
			"/documents?page=1&pageSize=5",
		)) as Paginated<DocumentListItem>;

		expect(page.data).toHaveLength(5);
		expect(page.page).toBe(1);
		expect(page.pageSize).toBe(5);
	});

	it("renvoie le détail d'un document", async () => {
		const document = (await mockRequest("/documents/1")) as DocumentDetail;

		expect(document.id).toBe(1);
		expect(document.ue.nom).toBe("Droit Civil");
	});

	it("lève une ApiError 404 pour un document inconnu", async () => {
		await expect(mockRequest("/documents/9999")).rejects.toMatchObject({
			status: 404,
			code: "NOT_FOUND",
		});
	});

	it("enregistre une réaction et la renvoie dans le détail", async () => {
		const reaction = await mockRequest("/documents/1/reaction", {
			method: "PUT",
			body: JSON.stringify({ valeur: "utile" }),
		});

		expect(reaction).toEqual({
			votesUtiles: 1,
			votesInutiles: 0,
			voteUtilisateur: "utile",
		});

		const document = (await mockRequest("/documents/1")) as DocumentDetail;

		expect(document.reaction).toEqual(reaction);
	});

	it("retire une réaction avec valeur null", async () => {
		await mockRequest("/documents/1/reaction", {
			method: "PUT",
			body: JSON.stringify({ valeur: "inutile" }),
		});

		const reaction = await mockRequest("/documents/1/reaction", {
			method: "PUT",
			body: JSON.stringify({ valeur: null }),
		});

		expect(reaction).toEqual({
			votesUtiles: 0,
			votesInutiles: 0,
			voteUtilisateur: null,
		});
	});

	it("refuse une réaction inconnue", async () => {
		await expect(
			mockRequest("/documents/1/reaction", {
				method: "PUT",
				body: JSON.stringify({ valeur: "peut-etre" }),
			}),
		).rejects.toMatchObject({ status: 400 });
	});
});
