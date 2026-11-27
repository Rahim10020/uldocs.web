import { beforeEach, describe, expect, it } from "vitest";
import {
	getMockAdminStats,
	listMockAudit,
	searchMockAdminDocuments,
	searchMockUsers,
} from "@/lib/mocks/admin";
import { MOCK_DOCUMENTS, resetMockDocuments } from "@/lib/mocks/documents";
import { resetMockReports } from "@/lib/mocks/reports";
import {
	MOCK_USERS,
	resetMockAuth,
	setMockUserStatus,
} from "@/lib/mocks/users";

describe("mocks admin", () => {
	beforeEach(() => {
		resetMockAuth();
		resetMockDocuments();
		resetMockReports();
	});

	it("dérive les totaux des données mockées", () => {
		const stats = getMockAdminStats("7d");
		const downloads = MOCK_DOCUMENTS.reduce(
			(total, document) => total + document.nbTelechargements,
			0,
		);

		expect(stats.utilisateurs.total).toBe(MOCK_USERS.length);
		expect(stats.documents.total).toBe(MOCK_DOCUMENTS.length);
		expect(stats.telechargements.total).toBe(downloads);
		expect(stats.signalements.enAttente).toBe(3);
		expect(stats.evolution).toHaveLength(7);
		expect(stats.evolution.at(-1)).toMatchObject({
			utilisateurs: stats.utilisateurs.total,
			documents: stats.documents.total,
			telechargements: stats.telechargements.total,
		});
	});

	it("produit des séries cumulées croissantes pour chaque période", () => {
		const lengths = { "7d": 7, "30d": 30, "12m": 12 } as const;

		for (const [period, length] of Object.entries(lengths)) {
			const points = getMockAdminStats(
				period as keyof typeof lengths,
			).evolution;

			expect(points).toHaveLength(length);

			for (let index = 1; index < points.length; index += 1) {
				const previous = points[index - 1];
				const current = points[index];

				expect(current?.documents ?? 0).toBeGreaterThanOrEqual(
					previous?.documents ?? 0,
				);
				expect(current?.telechargements ?? 0).toBeGreaterThanOrEqual(
					previous?.telechargements ?? 0,
				);
			}
		}
	});

	it("fait progresser la courbe jusqu'au total sans pic final", () => {
		const points = getMockAdminStats("30d").evolution;
		const first = points[0]?.telechargements ?? 0;
		const penultimate = points.at(-2)?.telechargements ?? 0;
		const last = points.at(-1)?.telechargements ?? 0;

		expect(penultimate - first).toBeGreaterThan((last - first) * 0.5);
		expect(penultimate).toBeLessThanOrEqual(last);
	});

	it("trie le journal du plus récent au plus ancien et pagine", () => {
		const page = listMockAudit({ page: 1, pageSize: 5 });

		expect(page.data).toHaveLength(5);
		expect(page.total).toBeGreaterThan(5);

		for (let index = 1; index < page.data.length; index += 1) {
			expect(
				(page.data[index - 1]?.dateAction ?? "").localeCompare(
					page.data[index]?.dateAction ?? "",
				),
			).toBeGreaterThanOrEqual(0);
		}
	});

	it("filtre le journal par action", () => {
		const page = listMockAudit({ action: "role_modifie", pageSize: 50 });

		expect(page.total).toBe(1);
		expect(page.data[0]?.action).toBe("role_modifie");
	});

	it("recherche les utilisateurs par nom et email", () => {
		const byName = searchMockUsers({ q: "sandrine" });
		const byEmail = searchMockUsers({ q: "ADMIN@ULDOCS" });

		expect(byName.total).toBe(1);
		expect(byName.data[0]?.nom).toBe("Sandrine Houngbo");
		expect(byEmail.total).toBe(1);
		expect(byEmail.data[0]?.role).toBe("admin");
	});

	it("recherche les documents sur le titre et l'UE", () => {
		const page = searchMockAdminDocuments({ q: "algorithmique" });

		expect(page.total).toBeGreaterThan(0);

		for (const document of page.data) {
			expect(`${document.titre} ${document.ue.nom}`.toLowerCase()).toContain(
				"algorithmique",
			);
		}
	});

	it("pagine les recherches admin", () => {
		const page = searchMockUsers({ page: 1, pageSize: 3 });

		expect(page.data).toHaveLength(3);
		expect(page.pageSize).toBe(3);
		expect(page.total).toBe(MOCK_USERS.length);
	});

	it("renvoie 8 utilisateurs par défaut avec leur nombre d'uploads", () => {
		const page = searchMockUsers();
		const user = page.data.find((item) => item.id === 3);
		const expectedUploads = MOCK_DOCUMENTS.filter(
			(document) => document.uploader.id === 3,
		).length;

		expect(page.data).toHaveLength(8);
		expect(page.pageSize).toBe(8);
		expect(user?.nbDocumentsUploades).toBe(expectedUploads);
	});

	it("filtre les utilisateurs par rôle et contribution", () => {
		const admins = searchMockUsers({ role: "admin", pageSize: 50 });
		const contributors = searchMockUsers({
			contribution: "contributeur",
			pageSize: 50,
		});
		const simpleUsers = searchMockUsers({
			contribution: "utilisateur",
			pageSize: 50,
		});

		expect(admins.total).toBe(1);
		expect(admins.data[0]?.id).toBe(8);
		expect(contributors.total).toBeGreaterThan(0);
		expect(
			contributors.data.every((user) => user.nbDocumentsUploades > 0),
		).toBe(true);
		expect(
			simpleUsers.data.every((user) => user.nbDocumentsUploades === 0),
		).toBe(true);
	});

	it("combine le filtre de statut avec la recherche", () => {
		setMockUserStatus(6, "suspendu");

		const result = searchMockUsers({
			q: "komlan",
			statut: "suspendu",
			pageSize: 50,
		});

		expect(result.total).toBe(1);
		expect(result.data[0]?.id).toBe(6);
	});
});
