import type { FormatDocument } from "shared";
import { cn } from "@/lib/utils";

const LABELS: Record<FormatDocument, string> = {
	pdf: "PDF",
	docx: "DOCX",
	pptx: "PPTX",
	image: "IMG",
};

export function FormatBadge({
	format,
	className,
}: {
	format: FormatDocument;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white",
				className,
			)}
		>
			{LABELS[format]}
		</span>
	);
}
