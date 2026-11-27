"use client";

import { Search } from "lucide-react";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type SearchBarProps = {
	className?: string;
	placeholder?: string;
	variant?: "header" | "hero";
	defaultValue?: string;
	/** Page cible du formulaire (documents par défaut). */
	action?: Route;
	/** Libellé accessible du champ de recherche. */
	ariaLabel?: string;
	/** Filtres conservés lors d'une nouvelle recherche (page exclue). */
	hiddenParams?: Record<string, string>;
};

/** Recherche globale : redirige vers /documents?q=... (aucun JS requis). */
export function SearchBar({
	className,
	placeholder = "Recherche",
	variant = "header",
	defaultValue = "",
	action = routes.documents,
	ariaLabel = "Rechercher un document",
	hiddenParams,
}: SearchBarProps) {
	const [value, setValue] = useState(defaultValue);
	const isHero = variant === "hero";

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<search className={cn("block w-full", className)}>
			<form action={action} method="get" className="relative w-full">
				{Object.entries(hiddenParams ?? {}).map(([name, hiddenValue]) => (
					<input key={name} type="hidden" name={name} value={hiddenValue} />
				))}

				<SearchInput
					value={value}
					onChange={setValue}
					ariaLabel={ariaLabel}
					placeholder={placeholder}
					variant={variant}
					withTrailingAction
				/>

				<button
					type="submit"
					aria-label="Rechercher"
					className={cn(
						"absolute right-1 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded text-black-50 transition-colors hover:text-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-90",
						isHero ? "size-12" : "size-8",
					)}
				>
					<Search aria-hidden className={isHero ? "size-6" : "size-5"} />
				</button>
			</form>
		</search>
	);
}
