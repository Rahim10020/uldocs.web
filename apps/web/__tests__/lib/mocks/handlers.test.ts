import type {
	DocumentDetail,
	DocumentListItem,
	FaculteTree,
	Paginated,
	Signalement,
	SignalementDetail,
	SignalementListItem,
} from "shared";
import { beforeEach, describe, expect, it } from "vitest";
import { getUeContextByName } from "@/lib/mocks/academic";
import { resetMockDocuments, resetMockReactions } from "@/lib/mocks/documents";
import { mockRequest } from "@/lib/mocks/handlers";
import { resetMockReports } from "@/lib/mocks/reports";
import { resetMockAuth, resetMockUserStatuses } from "@/lib/mocks/users";

describe("routeur mock", () => {
	beforeEach(() => {
		resetMockAuth();
		resetMockReactions();
		resetMockDocuments();
		resetMockReports();
		resetMockUserStatuses();
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

	it("crée un signalement ouvert pour le document", async () => {
		const report = (await mockRequest("/documents/1/report", {
			method: "POST",
			body: JSON.stringify({
				motif: "mal_classe",
				commentaire: "  Ce document n'est pas dans la bonne UE.  ",
			}),
		})) as Signalement;

		expect(report).toMatchObject({
			documentId: 1,
			signaleurId: 1,
			motif: "mal_classe",
			commentaire: "Ce document n'est pas dans la bonne UE.",
			statut: "ouvert",
			traitePar: null,
			dateTraitement: null,
		});
	});

	it("refuse un motif de signalement inconnu", async () => {
		await expect(
			mockRequest("/documents/1/report", {
				method: "POST",
				body: JSON.stringify({ motif: "spam" }),
			}),
		).rejects.toMatchObject({ status: 400, code: "VALIDATION_ERROR" });
	});

	it("refuse un signalement sans session", async () => {
		resetMockAuth(null);

		await expect(
			mockRequest("/documents/1/report", {
				method: "POST",
				body: JSON.stringify({ motif: "erreur" }),
			}),
		).rejects.toMatchObject({ status: 401, code: "UNAUTHORIZED" });
	});

	it("renvoie 404 pour un signalement sur un document inconnu", async () => {
		await expect(
			mockRequest("/documents/9999/report", {
				method: "POST",
				body: JSON.stringify({ motif: "erreur" }),
			}),
		).rejects.toMatchObject({ status: 404, code: "NOT_FOUND" });
	});

	it("refuse un détail de signalement trop long", async () => {
		await expect(
			mockRequest("/documents/1/report", {
				method: "POST",
				body: JSON.stringify({
					motif: "autre",
					commentaire: "a".repeat(1001),
				}),
			}),
		).rejects.toMatchObject({ status: 400, code: "VALIDATION_ERROR" });
	});
});

describe("routeur mock — modération", () => {
	beforeEach(() => {
		resetMockAuth(7);
		resetMockDocuments();
		resetMockReports();
		resetMockUserStatuses();
	});

	it("refuse la file sans session ou pour un étudiant", async () => {
		resetMockAuth(null);

		await expect(mockRequest("/reports")).rejects.toMatchObject({
			status: 401,
			code: "UNAUTHORIZED",
		});

		resetMockAuth(1);

		await expect(mockRequest("/reports")).rejects.toMatchObject({
			status: 403,
			code: "FORBIDDEN",
		});
	});

	it("renvoie la file filtrée et paginée", async () => {
		const page = (await mockRequest(
			"/reports?statut=ouvert&page=1&pageSize=2",
		)) as Paginated<SignalementListItem>;

		expect(page.total).toBe(3);
		expect(page.data).toHaveLength(2);
		expect(page.data.every((report) => report.statut === "ouvert")).toBe(true);
	});

	it("renvoie le détail d'un signalement", async () => {
		const detail = (await mockRequest("/reports/8")) as SignalementDetail;

		expect(detail.id).toBe(8);
		expect(detail.action?.action).toBe("avertir");
		expect(detail.previousReportsCount).toBe(2);
	});

	it("rejette un signalement via PATCH", async () => {
		const detail = (await mockRequest("/reports/1", {
			method: "PATCH",
			body: JSON.stringify({
				statut: "rejete",
				raison: "Le signalement n'est pas fondé après vérification.",
			}),
		})) as SignalementDetail;

		expect(detail.statut).toBe("rejete");
		expect(detail.action?.action).toBe("valider");
		expect(detail.traitePar?.id).toBe(7);
	});

	it("applique une action punitive", async () => {
		const detail = (await mockRequest("/moderation/actions", {
			method: "POST",
			body: JSON.stringify({
				reportId: 2,
				action: "suspendre",
				raison: "Le contenu est illégal et l'uploader est suspendu.",
			}),
		})) as SignalementDetail;

		expect(detail.statut).toBe("traite");
		expect(detail.action?.action).toBe("suspendre");
	});

	it("refuse une action valider via POST", async () => {
		await expect(
			mockRequest("/moderation/actions", {
				method: "POST",
				body: JSON.stringify({
					reportId: 2,
					action: "valider",
					raison: "Action de rejet mal routée.",
				}),
			}),
		).rejects.toMatchObject({ status: 400, code: "VALIDATION_ERROR" });
	});

	it("refuse une raison trop courte", async () => {
		await expect(
			mockRequest("/reports/1", {
				method: "PATCH",
				body: JSON.stringify({ statut: "rejete", raison: "court" }),
			}),
		).rejects.toMatchObject({ status: 400, code: "VALIDATION_ERROR" });
	});

	it("refuse un signalement déjà traité", async () => {
		await expect(
			mockRequest("/reports/8", {
				method: "PATCH",
				body: JSON.stringify({
					statut: "rejete",
					raison: "Tentative de rejet d'un signalement déjà traité.",
				}),
			}),
		).rejects.toMatchObject({ status: 409, code: "ALREADY_PROCESSED" });
	});

	it("renvoie 404 pour un signalement inconnu", async () => {
		await expect(mockRequest("/reports/9999")).rejects.toMatchObject({
			status: 404,
			code: "NOT_FOUND",
		});
	});
});
