import type { StatutDocument } from "shared";
import { STATUT_DOCUMENT_LABELS } from "@/lib/document-labels";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<StatutDocument, string> = {
	en_attente: "border-warning text-warning",
	valide: "border-success text-success",
	signale: "border-error text-error",
	retire: "border-black-20 text-black-60",
};

/** Badge de statut éditorial d'un document. */
export function DocumentStatusBadge({
	statut,
	className,
}: {
	statut: StatutDocument;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center rounded border bg-white px-2 py-0.5 text-[10px] font-semibold tracking-wide",
				STATUS_STYLES[statut],
				className,
			)}
		>
			{STATUT_DOCUMENT_LABELS[statut]}
		</span>
	);
}
