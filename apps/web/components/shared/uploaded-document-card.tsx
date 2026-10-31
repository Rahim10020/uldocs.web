import { FileText } from "lucide-react";
import Link from "next/link";
import type { DocumentListItem } from "shared";
import { FormatBadge } from "@/components/ui/format-badge";
import { TYPE_DOCUMENT_LABELS } from "@/lib/document-labels";
import { formatDate } from "@/lib/format";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { DocumentStatusBadge } from "./document-status-badge";

/** Carte d'un document uploadé, utilisée après import et dans « Mes documents ». */
export function UploadedDocumentCard({
	document,
	className,
}: {
	document: DocumentListItem;
	className?: string;
}) {
	return (
		<article
			className={cn(
				"group relative flex gap-4 rounded-md border border-black-10 bg-white p-4 transition-colors hover:border-black-20 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-inset has-[a:focus-visible]:ring-primary-40",
				className,
			)}
		>
			<Link
				href={routes.document(document.id)}
				aria-label={`Voir ${document.titre}`}
				className="absolute inset-0 z-0 rounded-md focus-visible:outline-none"
			/>

			<div className="pointer-events-none relative z-10 flex h-20 w-16 shrink-0 flex-col items-center justify-center gap-2 border border-black-10 bg-surface">
				<FormatBadge format={document.format} />
				<FileText
					aria-hidden
					className="size-7 text-black-20"
					strokeWidth={1.25}
				/>
			</div>

			<div className="pointer-events-none relative z-10 min-w-0 flex-1">
				<div className="flex flex-wrap items-start justify-between gap-2">
					<h3 className="line-clamp-2 text-md font-semibold leading-snug text-black group-hover:text-primary">
						{document.titre}
					</h3>
					<DocumentStatusBadge statut={document.statut} />
				</div>

				<p className="mt-1 truncate text-sm text-black-60">
					{document.ue.nom} · {document.niveau} · {document.semestre}
				</p>

				<p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-black-60">
					<span>{TYPE_DOCUMENT_LABELS[document.type]}</span>
					<span aria-hidden>·</span>
					<span>{document.anneeAcademique}</span>
					<span aria-hidden>·</span>
					<span>Ajouté le {formatDate(document.dateUpload)}</span>
				</p>
			</div>
		</article>
	);
}
