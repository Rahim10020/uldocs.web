import type { AdminStatsPoint } from "shared";
import { describe, expect, it } from "vitest";
import {
	ADMIN_CHART_METRICS,
	buildAdminChartGeometry,
	formatAdminChartDate,
	getAdminChartTickIndexes,
	getAdminMetricValue,
} from "@/lib/admin-chart";

const POINTS: AdminStatsPoint[] = [
	{
		date: "2026-11-18T00:00:00.000Z",
		utilisateurs: 7,
		documents: 40,
		telechargements: 10_000,
		signalements: 18,
	},
	{
		date: "2026-11-25T00:00:00.000Z",
		utilisateurs: 8,
		documents: 44,
		telechargements: 12_400,
		signalements: 21,
	},
];

describe("buildAdminChartGeometry", () => {
	it("projette les valeurs dans le repère et ferme l'aire", () => {
		const geometry = buildAdminChartGeometry([10, 20, 30], 640, 280);

		expect(geometry.points).toHaveLength(3);
		expect(geometry.points[0]?.x).toBe(46);
		expect(geometry.points[2]?.x).toBe(640 - 16);
		expect(geometry.points[0]?.y).toBeGreaterThan(geometry.points[2]?.y ?? 0);
		expect(geometry.linePath.startsWith("M ")).toBe(true);
		expect(geometry.areaPath.endsWith("Z")).toBe(true);
		expect(geometry.ticks).toHaveLength(5);
	});

	it("gère une série constante sans division par zéro", () => {
		const geometry = buildAdminChartGeometry([5, 5, 5], 640, 280);

		expect(geometry.top).toBeGreaterThan(geometry.baseline);
		expect(Number.isFinite(geometry.points[0]?.y)).toBe(true);
	});

	it("gère une série vide", () => {
		const geometry = buildAdminChartGeometry([], 640, 280);

		expect(geometry.points).toEqual([]);
		expect(geometry.linePath).toBe("");
		expect(geometry.areaPath).toBe("");
	});
});

describe("getAdminChartTickIndexes", () => {
	it("garde tous les points quand ils sont peu nombreux", () => {
		expect(getAdminChartTickIndexes(4)).toEqual([0, 1, 2, 3]);
	});

	it("répartit au plus cinq libellés sur une longue série", () => {
		const indexes = getAdminChartTickIndexes(30, 5);

		expect(indexes).toHaveLength(5);
		expect(indexes[0]).toBe(0);
		expect(indexes.at(-1)).toBe(29);
	});
});

describe("métriques et dates du graphique", () => {
	it("lit la valeur de la métrique sélectionnée", () => {
		expect(getAdminMetricValue(POINTS[1] as AdminStatsPoint, "documents")).toBe(
			44,
		);
		expect(
			getAdminMetricValue(POINTS[1] as AdminStatsPoint, "telechargements"),
		).toBe(12_400);
		expect(ADMIN_CHART_METRICS).toContain("utilisateurs");
	});

	it("formate les dates courtes", () => {
		expect(formatAdminChartDate(POINTS[1]?.date ?? "", "30d")).toContain("nov");
	});
});
