"use client";

import { Search, X } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type SearchInputProps = {
	value: string;
	onChange: (value: string) => void;
	/** Libellé accessible du champ. */
	ariaLabel: string;
	placeholder?: string;
	variant?: "header" | "hero";
	/** Réserve la place du bouton submit affiché par le parent (`SearchBar`). */
	withTrailingAction?: boolean;
	/** Affiche une icône de recherche à gauche du champ. */
	withLeadingIcon?: boolean;
	className?: string;
};

/**
 * Champ de recherche contrôlé, sans logique de navigation.
 * `SearchBar` ajoute le formulaire, les paramètres cachés et le bouton submit.
 */
export function SearchInput({
	value,
	onChange,
	ariaLabel,
	placeholder = "Recherche",
	variant = "header",
	withTrailingAction = false,
	withLeadingIcon = false,
	className,
}: SearchInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const isHero = variant === "hero";
	const hasValue = value.length > 0;

	const clear = () => {
		onChange("");
		inputRef.current?.focus();
	};

	return (
		<div className={cn("relative w-full", className)}>
			{withLeadingIcon ? (
				<Search
					aria-hidden
					className={cn(
						"pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black-50",
						isHero ? "size-6" : "size-5",
					)}
				/>
			) : null}

			<input
				ref={inputRef}
				type="search"
				name="q"
				aria-label={ariaLabel}
				placeholder={placeholder}
				autoComplete="off"
				enterKeyHint="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className={cn(
					"w-full rounded-md bg-white text-left text-black placeholder:text-black-50 focus:border-black-90 focus:outline-none focus:ring focus:ring-black-90 [&::-webkit-search-cancel-button]:appearance-none",
					isHero
						? "h-18 border border-transparent text-lg shadow-lg"
						: "h-10 border border-black-60 text-sm",
					withLeadingIcon
						? isHero
							? "pl-12"
							: "pl-10"
						: isHero
							? "pl-5"
							: "pl-4",
					withTrailingAction
						? isHero
							? "pr-24"
							: "pr-16"
						: isHero
							? "pr-14"
							: "pr-10",
				)}
			/>

			{hasValue ? (
				<button
					type="button"
					onClick={clear}
					aria-label="Effacer la recherche"
					className={cn(
						"absolute top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded text-black-50 transition-colors hover:text-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-90",
						withTrailingAction
							? isHero
								? "right-14 size-10"
								: "right-9 size-8"
							: "right-2 size-8",
					)}
				>
					<X aria-hidden className={isHero ? "size-5" : "size-4"} />
				</button>
			) : null}
		</div>
	);
}
