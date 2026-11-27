import type { AdminStats, AuditEntry, Paginated, Utilisateur } from "shared";
import { beforeEach, describe, expect, it } from "vitest";
import { resetMockAdminState } from "@/lib/mocks/admin";
import { resetMockDocuments } from "@/lib/mocks/documents";
import { mockRequest } from "@/lib/mocks/handlers";
import { resetMockReports } from "@/lib/mocks/reports";
import {
	MOCK_USERS,
	resetMockAuth,
	resetMockUserStatuses,
	setMockUserStatus,
} from "@/lib/mocks/users";

describe("endpoints admin", () => {
	beforeEach(() => {
		resetMockAdminState();
		resetMockAuth(8);
		resetMockDocuments();
		resetMockReports();
		resetMockUserStatuses();
	});

	it("renvoie les statistiques à un administrateur", async () => {
		const stats = (await mockRequest("/admin/stats?period=12m")) as AdminStats;

		expect(stats.evolution).toHaveLength(12);
		expect(stats.utilisateurs.total).toBeGreaterThan(0);
	});

	it("renvoie le journal paginé", async () => {
		const page = (await mockRequest(
			"/admin/audit?page=2&pageSize=4",
		)) as Paginated<AuditEntry>;

		expect(page.page).toBe(2);
		expect(page.pageSize).toBe(4);
		expect(page.data).toHaveLength(4);
	});

	it("recherche utilisateurs et documents", async () => {
		const users = (await mockRequest(
			"/admin/users?q=sandrine",
		)) as Paginated<Utilisateur>;
		const documents = (await mockRequest(
			"/admin/documents?q=droit&pageSize=5",
		)) as Paginated<unknown>;

		expect(users.total).toBe(1);
		expect(documents.data).toHaveLength(5);
	});

	it("liste les utilisateurs sans recherche avec la taille de page prévue", async () => {
		const users = (await mockRequest("/admin/users")) as Paginated<{
			nbDocumentsUploades: number;
		}>;

		expect(users.page).toBe(1);
		expect(users.pageSize).toBe(8);
		expect(users.data).toHaveLength(8);
		expect(users.data.every((item) => item.nbDocumentsUploades >= 0)).toBe(
			true,
		);
	});

	it("applique les filtres rôle et statut à la liste admin", async () => {
		setMockUserStatus(6, "suspendu");

		const users = (await mockRequest(
			"/admin/users?role=etudiant&statut=suspendu&pageSize=8",
		)) as Paginated<{ id: number; statut: string }>;
		const contributors = (await mockRequest(
			"/admin/users?contribution=contributeur&pageSize=50",
		)) as Paginated<{ nbDocumentsUploades: number }>;

		expect(users.total).toBe(1);
		expect(users.data[0]).toMatchObject({ id: 6, statut: "suspendu" });
		expect(contributors.total).toBeGreaterThan(0);
		expect(
			contributors.data.every((user) => user.nbDocumentsUploades > 0),
		).toBe(true);
	});

	it("promeut un utilisateur et inscrit l'action au journal d'audit", async () => {
		const updated = (await mockRequest("/admin/users/3", {
			method: "PATCH",
			body: JSON.stringify({
				role: "moderateur",
				raison: "Participation régulière à la modération.",
			}),
		})) as { id: number; role: string };
		const audit = (await mockRequest(
			"/admin/audit?action=role_modifie&pageSize=50",
		)) as Paginated<AuditEntry>;

		expect(updated).toMatchObject({ id: 3, role: "moderateur" });
		expect(
			audit.data.some(
				(entry) => entry.action === "role_modifie" && entry.cible.id === 3,
			),
		).toBe(true);
	});

	it("suspend, réactive et bannit un compte en auditant les transitions", async () => {
		const suspended = (await mockRequest("/admin/users/6", {
			method: "PATCH",
			body: JSON.stringify({
				statut: "suspendu",
				raison: "Suspension après vérification d'un signalement.",
			}),
		})) as { id: number; statut: string };
		const reactivated = (await mockRequest("/admin/users/6", {
			method: "PATCH",
			body: JSON.stringify({
				statut: "actif",
				raison: "La situation a été régularisée.",
			}),
		})) as { id: number; statut: string };
		const banned = (await mockRequest("/admin/users/6", {
			method: "PATCH",
			body: JSON.stringify({
				statut: "supprime",
				raison: "Récidive confirmée après plusieurs avertissements.",
			}),
		})) as { id: number; statut: string };
		const audit = (await mockRequest(
			"/admin/audit?action=utilisateur_banni&pageSize=50",
		)) as Paginated<AuditEntry>;
		const reactivationAudit = (await mockRequest(
			"/admin/audit?action=utilisateur_reactive&pageSize=50",
		)) as Paginated<AuditEntry>;

		expect(suspended).toMatchObject({ id: 6, statut: "suspendu" });
		expect(reactivated).toMatchObject({ id: 6, statut: "actif" });
		expect(banned).toMatchObject({ id: 6, statut: "supprime" });
		expect(audit.data[0]?.cible.id).toBe(6);
		expect(reactivationAudit.data[0]?.cible.id).toBe(6);
		await expect(
			mockRequest("/admin/users/6", {
				method: "PATCH",
				body: JSON.stringify({
					statut: "actif",
					raison: "Tentative de réactivation après bannissement.",
				}),
			}),
		).rejects.toMatchObject({ status: 409 });
	});

	it("interdit à un administrateur d'agir sur son propre compte", async () => {
		await expect(
			mockRequest("/admin/users/8", {
				method: "PATCH",
				body: JSON.stringify({
					statut: "suspendu",
					raison: "Test d'une action interdite sur soi-même.",
				}),
			}),
		).rejects.toMatchObject({ status: 403 });
	});

	it("interdit également les actions sur les autres comptes admin", async () => {
		const target = MOCK_USERS.find((user) => user.id === 7);

		if (!target) {
			throw new Error("Utilisateur mock introuvable");
		}
		target.role = "admin";

		await expect(
			mockRequest("/admin/users/7", {
				method: "PATCH",
				body: JSON.stringify({
					statut: "suspendu",
					raison: "Test d'une action interdite sur un autre admin.",
				}),
			}),
		).rejects.toMatchObject({ status: 403 });
	});

	it("refuse un modérateur et un visiteur anonyme", async () => {
		resetMockAuth(7);
		await expect(mockRequest("/admin/stats")).rejects.toMatchObject({
			status: 403,
		});

		resetMockAuth(null);
		await expect(mockRequest("/admin/stats")).rejects.toMatchObject({
			status: 401,
		});
	});

	it("retombe sur 30 jours pour une période inconnue", async () => {
		const stats = (await mockRequest(
			"/admin/stats?period=inconnue",
		)) as AdminStats;

		expect(stats.evolution).toHaveLength(30);
	});
});
