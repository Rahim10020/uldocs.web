"use client";

import { Download, FileText, Flag, Users } from "lucide-react";
import { useState } from "react";
import type { AdminStatsPeriod } from "shared";
import { Button } from "@/components/ui/button";
import { useAdminStats } from "@/hooks/use-admin-stats";
import { formatNumber, formatSignedNumber } from "@/lib/format";
import { AdminDashboardSkeleton } from "./admin-dashboard-skeleton";
import { AdminEvolutionChart } from "./admin-evolution-chart";
import { AdminRecentActivity } from "./admin-recent-activity";
import { AdminStatCard } from "./admin-stat-card";

/** Tableau de bord de l'administration. */
export function AdminDashboard() {
	const [period, setPeriod] = useState<AdminStatsPeriod>("30d");
	const statsQuery = useAdminStats(period);

	return (
		<div>
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-semibold text-black lg:text-3xl">
					Tableau de bord
				</h1>
				<p className="text-sm text-black-60">
					Vue d&apos;ensemble de l&apos;activité de la plateforme.
				</p>
			</div>

			{statsQuery.isError ? (
				<div className="mt-10 rounded-xl border border-black-10 bg-white p-8 text-center">
					<p className="text-sm text-black-70">
						Impossible de charger les statistiques pour le moment.
					</p>
					<Button
						variant="secondary"
						className="mt-4"
						onClick={() => void statsQuery.refetch()}
					>
						Réessayer
					</Button>
				</div>
			) : statsQuery.isPending ? (
				<AdminDashboardSkeleton />
			) : (
				<>
					<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						<AdminStatCard
							label="Utilisateurs"
							value={statsQuery.data.utilisateurs.total}
							detail={`${formatNumber(statsQuery.data.utilisateurs.actifs)} comptes actifs`}
							icon={Users}
						/>
						<AdminStatCard
							label="Documents"
							value={statsQuery.data.documents.total}
							detail={
								statsQuery.data.documents.nouveauxCetteSemaine > 0
									? `${formatSignedNumber(statsQuery.data.documents.nouveauxCetteSemaine)} cette semaine`
									: "Aucun ajout cette semaine"
							}
							tone={
								statsQuery.data.documents.nouveauxCetteSemaine > 0
									? "success"
									: "neutral"
							}
							icon={FileText}
						/>
						<AdminStatCard
							label="Téléchargements"
							value={statsQuery.data.telechargements.total}
							detail={`${formatSignedNumber(statsQuery.data.telechargements.cetteSemaine)} cette semaine`}
							tone="success"
							icon={Download}
						/>
						<AdminStatCard
							label="Signalements en attente"
							value={statsQuery.data.signalements.enAttente}
							detail={
								statsQuery.data.signalements.enAttente > 0
									? "Action requise"
									: "Aucun signalement ouvert"
							}
							tone={
								statsQuery.data.signalements.enAttente > 0
									? "warning"
									: "success"
							}
							icon={Flag}
						/>
					</div>

					<div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
						<AdminEvolutionChart
							points={statsQuery.data.evolution}
							period={period}
							onPeriodChange={setPeriod}
						/>
						<AdminRecentActivity />
					</div>
				</>
			)}
		</div>
	);
}
