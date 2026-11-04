import type { StatutSignalement } from "shared";
import { STATUT_SIGNALEMENT_LABELS } from "@/lib/reports";
import { cn } from "@/lib/utils";

const STATUS_TONES: Record<StatutSignalement, string> = {
	ouvert: "text-warning",
	en_cours: "text-black-70",
	traite: "text-success",
	rejete: "text-error",
};

/** Statut d'un signalement, coloré selon son avancement. */
export function ReportStatus({
	statut,
	className,
}: {
	statut: StatutSignalement;
	className?: string;
}) {
	return (
		<span className={cn("font-semibold", STATUS_TONES[statut], className)}>
			{STATUT_SIGNALEMENT_LABELS[statut]}
		</span>
	);
}
