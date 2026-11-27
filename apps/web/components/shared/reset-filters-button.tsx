"use client";

import { cn } from "@/lib/utils";

/** Lien de réinitialisation des filtres, aligné sur les barres de recherche. */
export function ResetFiltersButton({
	onClick,
	disabled,
	label = "Réinitialiser",
	className,
}: {
	onClick: () => void;
	disabled?: boolean;
	label?: string;
	className?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={cn(
				"cursor-pointer text-sm font-medium text-black underline decoration-black-20 underline-offset-4 transition-colors hover:text-primary disabled:cursor-default disabled:text-black-40",
				className,
			)}
		>
			{label}
		</button>
	);
}
