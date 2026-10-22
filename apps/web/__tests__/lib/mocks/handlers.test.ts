import type {
	DocumentDetail,
	DocumentListItem,
	FaculteTree,
	Paginated,
} from "shared";
import { describe, expect, it } from "vitest";
import { mockRequest } from "@/lib/mocks/handlers";

describe("routeur mock", () => {
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
});
