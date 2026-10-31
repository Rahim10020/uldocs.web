import type {
	DocumentDetail,
	DocumentListItem,
	FaculteTree,
	Paginated,
} from "shared";
import { beforeEach, describe, expect, it } from "vitest";
import { getUeContextByName } from "@/lib/mocks/academic";
import { resetMockDocuments, resetMockReactions } from "@/lib/mocks/documents";
import { mockRequest } from "@/lib/mocks/handlers";

describe("routeur mock", () => {
	beforeEach(() => {
		resetMockReactions();
		resetMockDocuments();
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

	it("crée un document en attente à partir d'un FormData", async () => {
		const context = getUeContextByName("Droit Civil");

		expect(context).toBeDefined();

		const formData = new FormData();
		formData.set("titre", "  Résumé de droit civil  ");
		formData.set("type", "resume");
		formData.set("ueId", String(context?.ue.id));
		formData.set("anneeAcademique", "2026-2027");
		formData.set("nbPages", "4");
		formData.set("certification", "true");
		formData.set(
			"fichier",
			new File(["contenu"], "droit_civil.pdf", {
				type: "application/pdf",
			}),
		);

		const created = (await mockRequest("/documents", {
			method: "POST",
			body: formData,
		})) as DocumentDetail;

		expect(created.titre).toBe("Résumé de droit civil");
		expect(created.type).toBe("resume");
		expect(created.statut).toBe("en_attente");
		expect(created.format).toBe("pdf");
		expect(created.nbPages).toBe(4);
		expect(created.uploader.id).toBe(1);

		const mine = (await mockRequest(
			"/documents/mine?page=1&pageSize=50",
		)) as Paginated<DocumentListItem>;
		const publicList = (await mockRequest(
			"/documents?page=1&pageSize=50",
		)) as Paginated<DocumentListItem>;

		expect(
			mine.data.find((document) => document.id === created.id)?.statut,
		).toBe("en_attente");
		expect(publicList.data.some((document) => document.id === created.id)).toBe(
			false,
		);
	});

	it("refuse un upload sans certification ou avec un type obsolète", async () => {
		const context = getUeContextByName("Droit Civil");
		const createFormData = (overrides: Record<string, string> = {}) => {
			const formData = new FormData();
			formData.set("titre", "Cours");
			formData.set("type", "cours");
			formData.set("ueId", String(context?.ue.id));
			formData.set("anneeAcademique", "2026-2027");
			formData.set("certification", "true");

			for (const [key, value] of Object.entries(overrides)) {
				formData.set(key, value);
			}

			formData.set(
				"fichier",
				new File(["contenu"], "cours.pdf", { type: "application/pdf" }),
			);

			return formData;
		};

		await expect(
			mockRequest("/documents", {
				method: "POST",
				body: createFormData({ certification: "false" }),
			}),
		).rejects.toMatchObject({ status: 400 });

		await expect(
			mockRequest("/documents", {
				method: "POST",
				body: createFormData({ type: "memoire" }),
			}),
		).rejects.toMatchObject({ status: 400 });
	});
});
