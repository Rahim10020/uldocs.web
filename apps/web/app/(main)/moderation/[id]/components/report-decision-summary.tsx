import type { SignalementDetail } from "shared";
import { MODERATION_DECISION_LABELS } from "@/lib/reports";

/** Résumé en lecture seule d'un signalement déjà traité. */
export function ReportDecisionSummary({
	report,
}: {
	report: SignalementDetail;
}) {
	const action = report.action;
	const decisionLabel = action
		? MODERATION_DECISION_LABELS[action.action]
		: "Aucune action enregistrée";

	return (
		<section className="mt-10">
			<h2 className="text-base font-semibold text-black">Action prise</h2>
			<div className="mt-3 flex items-center gap-3 text-sm text-black">
				{action ? (
					<span
						aria-hidden
						className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white"
					>
						<span className="size-2 rounded-full bg-primary" />
					</span>
				) : (
					<span
						aria-hidden
						className="size-5 shrink-0 rounded-full border-2 border-black-30"
					/>
				)}
				<span>{decisionLabel}</span>
			</div>

			<div className="mt-8">
				<h2 className="text-base font-semibold text-black">Modérateur</h2>
				<p className="mt-2 text-sm text-black underline decoration-black-20 underline-offset-4">
					{report.traitePar?.nom ?? "—"}
				</p>
			</div>

			<div className="mt-8">
				<h2 className="text-base font-semibold text-black">
					Raison (obligatoire)
				</h2>
				<p className="mt-2 whitespace-pre-line text-sm text-black-70">
					{action?.raison ?? "Aucune raison enregistrée."}
				</p>
			</div>
		</section>
	);
}
