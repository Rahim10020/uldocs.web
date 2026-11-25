import type { AdminStats, AuditEntry, Paginated, Utilisateur } from "shared";
import { beforeEach, describe, expect, it } from "vitest";
import { resetMockDocuments } from "@/lib/mocks/documents";
import { mockRequest } from "@/lib/mocks/handlers";
import { resetMockReports } from "@/lib/mocks/reports";
import { resetMockAuth } from "@/lib/mocks/users";

describe("endpoints admin", () => {
	beforeEach(() => {
		resetMockAuth(8);
		resetMockDocuments();
		resetMockReports();
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
