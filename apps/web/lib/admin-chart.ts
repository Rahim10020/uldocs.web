import type { AdminStatsPeriod, AdminStatsPoint } from "shared";
import { PERIODES_STATS_ADMIN } from "shared";

/** Métriques proposées par le graphique d'évolution. */
export const ADMIN_CHART_METRICS = [
	"telechargements",
	"documents",
	"utilisateurs",
	"signalements",
] as const;
export type AdminChartMetric = (typeof ADMIN_CHART_METRICS)[number];

export const ADMIN_CHART_METRIC_LABELS: Record<AdminChartMetric, string> = {
	telechargements: "Téléchargements",
	documents: "Documents",
	utilisateurs: "Utilisateurs",
	signalements: "Signalements",
};

export const ADMIN_CHART_PERIOD_LABELS: Record<AdminStatsPeriod, string> = {
	"7d": "7 jours",
	"30d": "30 jours",
	"12m": "12 mois",
};

export { PERIODES_STATS_ADMIN as ADMIN_CHART_PERIODS };

export type ChartPadding = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export const ADMIN_CHART_PADDING: ChartPadding = {
	top: 18,
	right: 16,
	bottom: 30,
	left: 46,
};

export type AdminChartPoint = {
	x: number;
	y: number;
	value: number;
};

export type AdminChartTick = {
	value: number;
	y: number;
};

export type AdminChartGeometry = {
	points: AdminChartPoint[];
	linePath: string;
	areaPath: string;
	baseline: number;
	top: number;
	ticks: AdminChartTick[];
};

/** Valeur d'un point pour la métrique sélectionnée. */
export function getAdminMetricValue(
	point: AdminStatsPoint,
	metric: AdminChartMetric,
): number {
	return point[metric];
}

/**
 * Projette une série de valeurs dans le repère du SVG.
 * La ligne démarre légèrement sous le minimum pour éviter une courbe plate.
 */
export function buildAdminChartGeometry(
	values: number[],
	width: number,
	height: number,
	padding: ChartPadding = ADMIN_CHART_PADDING,
): AdminChartGeometry {
	const innerWidth = Math.max(1, width - padding.left - padding.right);
	const innerHeight = Math.max(1, height - padding.top - padding.bottom);
	const min = values.length > 0 ? Math.min(...values) : 0;
	const max = values.length > 0 ? Math.max(...values) : 1;
	const baseline =
		min === max
			? Math.max(0, min - 1)
			: Math.max(0, Math.floor(min - (max - min) * 0.12));
	const top = max === baseline ? baseline + 1 : max;
	const step = values.length > 1 ? innerWidth / (values.length - 1) : 0;

	const toY = (value: number) =>
		padding.top + ((top - value) / Math.max(1, top - baseline)) * innerHeight;

	const points = values.map((value, index) => ({
		x: padding.left + index * step,
		y: toY(value),
		value,
	}));

	const linePath = points
		.map(
			(point, index) =>
				`${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
		)
		.join(" ");

	const first = points[0];
	const last = points[points.length - 1];
	const areaPath =
		first && last
			? `${linePath} L ${last.x.toFixed(2)} ${(padding.top + innerHeight).toFixed(2)} L ${first.x.toFixed(2)} ${(padding.top + innerHeight).toFixed(2)} Z`
			: "";

	const ticks = Array.from({ length: 5 }, (_, index) => {
		const ratio = index / 4;
		const value = baseline + (top - baseline) * ratio;

		return {
			value: Math.round(value),
			y: padding.top + innerHeight - ratio * innerHeight,
		};
	});

	return { points, linePath, areaPath, baseline, top, ticks };
}

/** Indices des libellés de l'axe horizontal, pour ne pas surcharger le mobile. */
export function getAdminChartTickIndexes(
	length: number,
	maxTicks = 5,
): number[] {
	if (length <= maxTicks) {
		return Array.from({ length }, (_, index) => index);
	}

	const indexes = new Set<number>();

	for (let index = 0; index < maxTicks; index += 1) {
		indexes.add(Math.round((index * (length - 1)) / (maxTicks - 1)));
	}

	return [...indexes].sort((a, b) => a - b);
}

/** Libellé court de l'axe horizontal. */
export function formatAdminChartDate(
	value: string,
	period: AdminStatsPeriod,
): string {
	return new Intl.DateTimeFormat("fr-FR", {
		day: period === "12m" ? undefined : "numeric",
		month: "short",
	}).format(new Date(value));
}

/** Date complète affichée dans l'infobulle. */
export function formatAdminChartTooltipDate(
	value: string,
	period: AdminStatsPeriod,
): string {
	return new Intl.DateTimeFormat("fr-FR", {
		day: period === "12m" ? undefined : "numeric",
		month: "long",
		year: period === "12m" ? "numeric" : undefined,
	}).format(new Date(value));
}
