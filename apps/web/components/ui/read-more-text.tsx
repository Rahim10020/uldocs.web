"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/** Texte de description tronqué, avec un bouton « Lire plus ». */
export function ReadMoreText({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	const id = useId();
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={className}>
			<p
				id={id}
				className={cn(
					"text-sm leading-relaxed text-black-70 sm:text-base",
					!expanded && "line-clamp-2",
				)}
			>
				{text}
			</p>

			<button
				type="button"
				aria-expanded={expanded}
				aria-controls={id}
				onClick={() => setExpanded((current) => !current)}
				className="mt-1 cursor-pointer text-sm font-medium text-black-60 underline decoration-black-20 underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
			>
				{expanded ? "Lire moins" : "Lire plus…"}
			</button>
		</div>
	);
}
