"use client";

import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/** Bouton d'ouverture de la feuille de filtres mobile. */
export function FilterButton({
	activeCount = 0,
	onClick,
	label,
	className,
}: {
	activeCount?: number;
	onClick: () => void;
	/** Affiche le libellé à côté de l'icône. */
	label?: string;
	className?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={
				activeCount > 0
					? `Filtres (${activeCount} actifs)`
					: "Ouvrir les filtres"
			}
			className={cn(
				"relative flex h-10 cursor-pointer items-center justify-center gap-2 rounded border border-black-40 bg-white text-black transition-colors hover:border-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
				className,
			)}
		>
			<SlidersHorizontal aria-hidden className="size-5" />
			{label ? <span className="text-sm font-medium">{label}</span> : null}
			{activeCount > 0 ? (
				<span
					className={cn(
						"flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white",
						label ? "" : "absolute -right-1 -top-1",
					)}
				>
					{activeCount}
				</span>
			) : null}
		</button>
	);
}
