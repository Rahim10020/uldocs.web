import type { SignalementListItem } from "shared";
import { ButtonLink } from "@/components/ui/button";
import { FormatBadge } from "@/components/ui/format-badge";
import { formatRelativeTime } from "@/lib/format";
import { moderationReportHref } from "@/lib/moderation";
import { MOTIF_SIGNALEMENT_LABELS } from "@/lib/reports";
import { ReportStatus } from "./report-status";

/** Carte d'un signalement dans la file de modération. */
export function ModerationReportCard({
	report,
}: {
	report: SignalementListItem;
}) {
	return (
		<article className="rounded-md border border-black-20 bg-white p-5 lg:p-6">
			<div className="flex items-start gap-3">
				<FormatBadge format={report.document.format} className="mt-0.5" />
				<h2 className="text-lg font-semibold leading-snug text-black">
					{report.document.titre}
				</h2>
			</div>

			<dl className="mt-4 space-y-1.5 text-sm text-black-70">
				<div>
					<dt className="inline">Motif : </dt>
					<dd className="inline">{MOTIF_SIGNALEMENT_LABELS[report.motif]}</dd>
				</div>
				<div>
					<dt className="inline">Signalé par : </dt>
					<dd className="inline">
						{report.signaleur.nom} ·{" "}
						{formatRelativeTime(report.dateSignalement)}
					</dd>
				</div>
				<div>
					<dt className="inline">Statut : </dt>
					<dd className="inline">
						<ReportStatus statut={report.statut} />
					</dd>
				</div>
			</dl>

			<div className="mt-4 flex justify-end lg:justify-start">
				<ButtonLink
					href={moderationReportHref(report.id)}
					variant="secondary"
					size="sm"
					className="min-w-24"
				>
					Examiner
				</ButtonLink>
			</div>
		</article>
	);
}
