"use client";

import Link from "next/link";
import type { SignalementDetail } from "shared";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FormatBadge } from "@/components/ui/format-badge";
import { useReport } from "@/hooks/use-report";
import { useSession } from "@/hooks/use-session";
import { ApiError } from "@/lib/api/client";
import { formatCount, formatDate, formatRelativeTime } from "@/lib/format";
import { MOTIF_SIGNALEMENT_LABELS } from "@/lib/reports";
import { routes } from "@/lib/routes";
import { ModerationAccess } from "../../components/moderation-access";
import { ReportStatus } from "../../components/report-status";
import { ModerationDecisionForm } from "./moderation-decision-form";
import { ReportDecisionSummary } from "./report-decision-summary";
import { ReportDetailSkeleton } from "./report-detail-skeleton";

/** Point d'entrée du détail : session, rôle et chargement. */
export function ReportDetailContent({ reportId }: { reportId: number }) {
	const { user, isLoading, isModerator } = useSession();

	if (isLoading) {
		return <ReportDetailSkeleton />;
	}

	if (!isModerator) {
		return (
			<Container className="max-w-2xl py-8 lg:py-12">
				<ModerationAccess authenticated={Boolean(user)} />
			</Container>
		);
	}

	return <ReportDetail reportId={reportId} />;
}

function ReportDetail({ reportId }: { reportId: number }) {
	const { data, isPending, isError, error, refetch } = useReport(reportId);

	if (isPending) {
		return <ReportDetailSkeleton />;
	}

	if (isError) {
		const notFound = error instanceof ApiError && error.status === 404;

		return (
			<ReportDetailError notFound={notFound} onRetry={() => void refetch()} />
		);
	}

	if (!data) {
		return <ReportDetailError notFound={false} />;
	}

	return <ReportDetailView report={data} />;
}

function ReportDetailView({ report }: { report: SignalementDetail }) {
	const actionable = report.statut === "ouvert" || report.statut === "en_cours";
	const previousReports = report.previousReportsCount;

	return (
		<Container className="max-w-2xl py-8 lg:py-12">
			<article>
				<h1 className="text-2xl font-semibold text-black lg:text-3xl">
					Signalement #{report.id}
				</h1>

				<p className="mt-4 text-sm text-black-70">
					Statut : <ReportStatus statut={report.statut} />
				</p>

				<section className="mt-8">
					<h2 className="text-base font-semibold text-black">
						Document concerné
					</h2>
					<div className="mt-2 flex items-start gap-3">
						<FormatBadge format={report.document.format} className="mt-0.5" />
						<p className="text-base font-medium leading-snug text-black">
							{report.document.titre}
						</p>
					</div>
					<Link
						href={routes.document(report.document.id)}
						className="mt-2 inline-block text-sm font-medium text-black underline decoration-black-20 underline-offset-4 transition-colors hover:text-primary"
					>
						Voir le document
					</Link>
				</section>

				<section className="mt-8 space-y-2 text-sm text-black-70">
					<p>
						Motif :{" "}
						<span className="text-black">
							{MOTIF_SIGNALEMENT_LABELS[report.motif]}
						</span>
					</p>
					<p>
						Signalé par :{" "}
						<Link
							href={routes.profileById(report.signaleur.id)}
							className="font-medium text-black underline decoration-black-20 underline-offset-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						>
							{report.signaleur.nom}
						</Link>{" "}
						· {formatRelativeTime(report.dateSignalement)}
					</p>
					<p>
						Commentaire :{" "}
						<span className="text-black">
							{report.commentaire
								? `“${report.commentaire}”`
								: "Aucun commentaire fourni."}
						</span>
					</p>
				</section>

				<section className="mt-8">
					<h2 className="text-base font-semibold text-black">
						Historique du document
					</h2>
					<ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-black-70">
						<li>
							Ajouté par{" "}
							<span className="text-black">{report.document.uploader.nom}</span>{" "}
							le {formatDate(report.document.dateUpload)}
						</li>
						<li>
							{formatCount(report.document.nbVues)} vues,{" "}
							{formatCount(report.document.nbTelechargements)} téléchargements
						</li>
						<li>
							{previousReports === 0
								? "Aucun signalement précédent"
								: `${previousReports} autre${previousReports > 1 ? "s" : ""} signalement${previousReports > 1 ? "s" : ""} sur ce document`}
						</li>
					</ul>
				</section>

				{actionable ? (
					<ModerationDecisionForm reportId={report.id} />
				) : (
					<ReportDecisionSummary report={report} />
				)}
			</article>
		</Container>
	);
}

function ReportDetailError({
	notFound,
	onRetry,
}: {
	notFound: boolean;
	onRetry?: () => void;
}) {
	return (
		<Container className="max-w-2xl py-8 lg:py-12">
			<div className="rounded-md border border-black-10 bg-surface p-8 text-center sm:p-10">
				<h1 className="text-xl font-semibold text-black">
					{notFound ? "Signalement introuvable" : "Signalement indisponible"}
				</h1>
				<p className="mt-2 text-sm text-black-60">
					{notFound
						? "Ce signalement n'existe pas ou a été supprimé."
						: "Impossible de charger ce signalement pour le moment."}
				</p>
				<div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
					{notFound || !onRetry ? null : (
						<Button variant="secondary" onClick={onRetry}>
							Réessayer
						</Button>
					)}
					<ButtonLink href={routes.moderation}>Retour au dashboard</ButtonLink>
				</div>
			</div>
		</Container>
	);
}
