import { beforeEach, describe, expect, it } from "vitest";
import { getMockDocument, resetMockDocuments } from "@/lib/mocks/documents";
import {
	applyMockModerationAction,
	getMockReport,
	listMockReports,
	rejectMockReport,
	resetMockReports,
} from "@/lib/mocks/reports";
import { MOCK_USERS, resetMockUserStatuses } from "@/lib/mocks/users";

describe("signalements mockés", () => {
	beforeEach(() => {
		resetMockDocuments();
		resetMockReports();
		resetMockUserStatuses();
	});

	it("expose 18 signalements dont 3 ouverts", () => {
		const all = listMockReports({ page: 1, pageSize: 50 });
		const open = listMockReports({ statut: "ouvert" });

		expect(all.total).toBe(18);
		expect(all.data).toHaveLength(18);
		expect(open.total).toBe(3);
		expect(open.data.every((report) => report.statut === "ouvert")).toBe(true);
	});

	it("pagine et trie du plus récent au plus ancien", () => {
		const firstPage = listMockReports({ page: 1, pageSize: 6 });
		const secondPage = listMockReports({ page: 2, pageSize: 6 });

		expect(firstPage.data).toHaveLength(6);
		expect(secondPage.data).toHaveLength(6);
		expect(firstPage.data[0]?.id).toBe(1);
		expect(firstPage.data[1]?.id).toBe(2);
		expect(secondPage.data[0]?.id).not.toBe(firstPage.data[0]?.id);
	});

	it("filtre par motif", () => {
		const reports = listMockReports({ motif: "droit_auteur", pageSize: 50 });

		expect(reports.total).toBeGreaterThan(0);
		expect(
			reports.data.every((report) => report.motif === "droit_auteur"),
		).toBe(true);
	});

	it("enrichit le détail avec le document, l'historique et l'action", () => {
		const detail = getMockReport(8);

		expect(detail.document.titre).toBeTruthy();
		expect(detail.document.uploader.nom).toBeTruthy();
		expect(detail.previousReportsCount).toBe(2);
		expect(detail.action).toMatchObject({
			action: "avertir",
		});
		expect(detail.traitePar?.nom).toBeTruthy();
	});

	it("compte les autres signalements du même document", () => {
		const detail = getMockReport(5);

		expect(detail.document.id).toBe(5);
		expect(detail.previousReportsCount).toBe(1);
	});

	it("rejette un signalement et enregistre une action valider", () => {
		const report = rejectMockReport({
			moderatorId: 7,
			reportId: 1,
			raison: "Le signalement n'est pas fondé après vérification.",
		});

		expect(report.statut).toBe("rejete");
		expect(report.traitePar).toEqual({ id: 7, nom: "Sandrine Houngbo" });
		expect(report.action).toMatchObject({
			action: "valider",
			raison: "Le signalement n'est pas fondé après vérification.",
		});
		expect(listMockReports({ statut: "ouvert" }).total).toBe(2);
	});

	it("retire le document et suspend l'uploader", () => {
		const before = getMockReport(2);
		const uploaderId = before.document.uploader.id;

		const report = applyMockModerationAction({
			moderatorId: 7,
			reportId: 2,
			action: "suspendre",
			raison: "Le contenu est illégal et l'uploader est suspendu.",
		});

		expect(report.statut).toBe("traite");
		expect(report.action?.action).toBe("suspendre");
		expect(getMockDocument(before.document.id)?.statut).toBe("retire");
		expect(MOCK_USERS.find((user) => user.id === uploaderId)?.statut).toBe(
			"suspendu",
		);
	});

	it("bannit l'uploader", () => {
		const before = getMockReport(3);
		const uploaderId = before.document.uploader.id;

		applyMockModerationAction({
			moderatorId: 7,
			reportId: 3,
			action: "bannir",
			raison: "Récidive de publication non autorisée.",
		});

		expect(getMockDocument(before.document.id)?.statut).toBe("retire");
		expect(MOCK_USERS.find((user) => user.id === uploaderId)?.statut).toBe(
			"supprime",
		);
	});

	it("laisse le document en ligne avec un avertissement", () => {
		const before = getMockReport(1);
		const statutAvant = getMockDocument(before.document.id)?.statut;

		applyMockModerationAction({
			moderatorId: 7,
			reportId: 1,
			action: "avertir",
			raison: "L'uploader est averti pour la prochaine publication.",
		});

		expect(getMockDocument(before.document.id)?.statut).toBe(statutAvant);
	});

	it("refuse une raison trop courte et un signalement déjà traité", () => {
		expect(() =>
			rejectMockReport({
				moderatorId: 7,
				reportId: 1,
				raison: "court",
			}),
		).toThrowError();

		expect(() =>
			applyMockModerationAction({
				moderatorId: 7,
				reportId: 8,
				action: "avertir",
				raison: "Tentative de traitement d'un signalement déjà traité.",
			}),
		).toThrowError();
	});
});
