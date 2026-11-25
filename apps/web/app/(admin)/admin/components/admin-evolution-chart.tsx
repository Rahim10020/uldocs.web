"use client";

import { useState } from "react";
import type { AdminStatsPeriod, AdminStatsPoint } from "shared";
import {
  ADMIN_CHART_METRIC_LABELS,
  ADMIN_CHART_METRICS,
  ADMIN_CHART_PADDING,
  ADMIN_CHART_PERIOD_LABELS,
  ADMIN_CHART_PERIODS,
  type AdminChartMetric,
  buildAdminChartGeometry,
  formatAdminChartDate,
  formatAdminChartTooltipDate,
  getAdminChartTickIndexes,
  getAdminMetricValue,
} from "@/lib/admin-chart";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const CHART_WIDTH = 640;
const CHART_HEIGHT = 280;

/** Graphique d'évolution : une métrique à la fois, en SVG natif. */
export function AdminEvolutionChart({
  points,
  period,
  onPeriodChange,
}: {
  points: AdminStatsPoint[];
  period: AdminStatsPeriod;
  onPeriodChange: (period: AdminStatsPeriod) => void;
}) {
  const [metric, setMetric] = useState<AdminChartMetric>("telechargements");
  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(0, points.length - 1),
  );

  const values = points.map((point) => getAdminMetricValue(point, metric));
  const geometry = buildAdminChartGeometry(
    values,
    CHART_WIDTH,
    CHART_HEIGHT,
    ADMIN_CHART_PADDING,
  );
  const lastIndex = Math.max(0, points.length - 1);
  const safeIndex = Math.min(selectedIndex, lastIndex);
  const selectedPoint = points[safeIndex];
  const selectedGeometry = geometry.points[safeIndex];
  const selectedValue = values[safeIndex] ?? 0;
  const tickIndexes = getAdminChartTickIndexes(points.length, 5);
  const metricLabel = ADMIN_CHART_METRIC_LABELS[metric];
  const periodLabel = ADMIN_CHART_PERIOD_LABELS[period];
  const innerBottom =
    ADMIN_CHART_PADDING.top +
    (CHART_HEIGHT - ADMIN_CHART_PADDING.top - ADMIN_CHART_PADDING.bottom);
  const tooltipWidth = 156;
  const tooltipHeight = 48;
  const tooltipX = selectedGeometry
    ? Math.min(
        Math.max(selectedGeometry.x - tooltipWidth / 2, 4),
        CHART_WIDTH - tooltipWidth - 4,
      )
    : 0;
  const tooltipY = selectedGeometry
    ? Math.max(4, selectedGeometry.y - tooltipHeight - 10)
    : 0;

  return (
    <section className="rounded-xl border border-black-10 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-black">
            Évolution de l&apos;activité
          </h2>
          <p className="mt-1 text-sm text-black-60">
            {formatNumber(selectedValue)} {metricLabel.toLowerCase()} ·{" "}
            {periodLabel}
          </p>
        </div>

        <fieldset className="inline-flex w-fit shrink-0 rounded-full border-0 bg-black-5 p-1">
          <legend className="sr-only">Période du graphique</legend>
          {ADMIN_CHART_PERIODS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onPeriodChange(value)}
              aria-pressed={value === period}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
                value === period
                  ? "bg-white text-black shadow-sm"
                  : "text-black-60 hover:text-black",
              )}
            >
              {ADMIN_CHART_PERIOD_LABELS[value]}
            </button>
          ))}
        </fieldset>
      </div>

      <fieldset className="mt-4 flex min-w-0 gap-1 overflow-x-auto border-0 p-0 pb-1">
        <legend className="sr-only">Métrique du graphique</legend>
        {ADMIN_CHART_METRICS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setMetric(value)}
            aria-pressed={value === metric}
            className={cn(
              "shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
              value === metric
                ? "bg-primary text-white"
                : "bg-black-5 text-black-60 hover:bg-black-10 hover:text-black",
            )}
          >
            {ADMIN_CHART_METRIC_LABELS[value]}
          </button>
        ))}
      </fieldset>

      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Évolution des ${metricLabel.toLowerCase()} sur ${periodLabel}. Dernière valeur : ${formatNumber(selectedValue)}.`}
        className="mt-4 h-64 w-full rounded-md sm:h-72"
      >
        {geometry.ticks.map((tick) => (
          <g key={tick.y}>
            <line
              x1={ADMIN_CHART_PADDING.left}
              x2={CHART_WIDTH - ADMIN_CHART_PADDING.right}
              y1={tick.y}
              y2={tick.y}
              className="stroke-black-10"
              strokeWidth={1}
            />
            <text
              x={ADMIN_CHART_PADDING.left - 8}
              y={tick.y + 4}
              textAnchor="end"
              className="fill-black-50"
              fontSize={11}
            >
              {formatNumber(tick.value)}
            </text>
          </g>
        ))}

        <path d={geometry.areaPath} className="fill-primary-10" />
        <path
          d={geometry.linePath}
          fill="none"
          className="stroke-primary"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {tickIndexes.map((index) => {
          const point = geometry.points[index];
          const date = points[index]?.date;

          if (!point || !date) {
            return null;
          }

          return (
            <text
              key={date}
              x={point.x}
              y={innerBottom + 20}
              textAnchor={
                index === 0 ? "start" : index === lastIndex ? "end" : "middle"
              }
              className="fill-black-50"
              fontSize={11}
            >
              {formatAdminChartDate(date, period)}
            </text>
          );
        })}

        {selectedGeometry ? (
          <>
            <line
              x1={selectedGeometry.x}
              x2={selectedGeometry.x}
              y1={ADMIN_CHART_PADDING.top}
              y2={innerBottom}
              className="stroke-primary-30"
              strokeWidth={1}
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={selectedGeometry.x}
              cy={selectedGeometry.y}
              r={5}
              className="fill-primary stroke-white"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <g aria-hidden>
              <rect
                x={tooltipX}
                y={tooltipY}
                width={tooltipWidth}
                height={tooltipHeight}
                rx={8}
                className="fill-white stroke-black-10"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={tooltipX + 10}
                y={tooltipY + 19}
                className="fill-black-50"
                fontSize={11}
              >
                {selectedPoint
                  ? formatAdminChartTooltipDate(selectedPoint.date, period)
                  : ""}
              </text>
              <text
                x={tooltipX + 10}
                y={tooltipY + 37}
                className="fill-black font-semibold"
                fontSize={12}
              >
                {formatNumber(selectedValue)} {metricLabel.toLowerCase()}
              </text>
            </g>
          </>
        ) : null}

        {geometry.points.map((point, index) => {
          const step =
            geometry.points.length > 1
              ? (CHART_WIDTH -
                  ADMIN_CHART_PADDING.left -
                  ADMIN_CHART_PADDING.right) /
                (geometry.points.length - 1)
              : CHART_WIDTH;

          return (
            <rect
              key={points[index]?.date ?? index}
              x={point.x - step / 2}
              y={ADMIN_CHART_PADDING.top}
              width={step}
              height={innerBottom - ADMIN_CHART_PADDING.top}
              fill="transparent"
              onPointerEnter={() => setSelectedIndex(index)}
            />
          );
        })}
      </svg>

      <table className="sr-only">
        <caption>
          Données du graphique des {metricLabel.toLowerCase()} sur {periodLabel}
        </caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Valeur</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => (
            <tr key={point.date}>
              <th scope="row">
                {formatAdminChartTooltipDate(point.date, period)}
              </th>
              <td>{formatNumber(getAdminMetricValue(point, metric))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
