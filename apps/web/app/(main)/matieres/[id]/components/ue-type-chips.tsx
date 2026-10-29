"use client";

import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TYPES_DOCUMENT, type TypeDocument } from "shared";
import { TYPE_DOCUMENT_LABELS } from "@/lib/document-labels";
import { cn } from "@/lib/utils";

/** Chips de type + bouton d'ouverture des filtres, sur mobile. */
export function UeTypeChips({
	value,
	onChange,
	onOpenFilters,
	activeFilterCount,
}: {
	value?: TypeDocument;
	onChange: (value: string) => void;
	onOpenFilters: () => void;
	activeFilterCount: number;
}) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const update = useCallback(() => {
		const element = scrollRef.current;

		if (!element) {
			return;
		}

		const maxScroll = element.scrollWidth - element.clientWidth;
		setCanScrollNext(element.scrollLeft < maxScroll - 4);
	}, []);

	useEffect(() => {
		const element = scrollRef.current;

		if (!element) {
			return;
		}

		update();

		const observer = new ResizeObserver(update);
		observer.observe(element);
		element.addEventListener("scroll", update);

		return () => {
			observer.disconnect();
			element.removeEventListener("scroll", update);
		};
	}, [update]);

	const scrollNext = () => {
		scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
	};

	return (
		<div className="relative lg:hidden">
			<div
				ref={scrollRef}
				className="flex items-center gap-2 overflow-x-auto pb-1 pr-12 scrollbar-none [&::-webkit-scrollbar]:hidden"
			>
				<button
					type="button"
					onClick={onOpenFilters}
					aria-label={
						activeFilterCount > 0
							? `Filtres (${activeFilterCount} actifs)`
							: "Ouvrir les filtres"
					}
					className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded border border-black-40 bg-white text-black transition-colors hover:border-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
				>
					<SlidersHorizontal aria-hidden className="size-5" />
					{activeFilterCount > 0 ? (
						<span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
							{activeFilterCount}
						</span>
					) : null}
				</button>

				<TypeChip active={!value} onClick={() => onChange("")}>
					Tous
				</TypeChip>

				{TYPES_DOCUMENT.map((type) => (
					<TypeChip
						key={type}
						active={value === type}
						onClick={() => onChange(value === type ? "" : type)}
					>
						{TYPE_DOCUMENT_LABELS[type]}
					</TypeChip>
				))}

				{canScrollNext ? (
					<button
						type="button"
						onClick={scrollNext}
						aria-label="Afficher plus de types"
						className="absolute right-0 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black-40 bg-white text-black shadow-sm transition-colors hover:text-primary"
					>
						<ChevronRight aria-hidden className="size-5" />
					</button>
				) : null}
			</div>
		</div>
	);
}

function TypeChip({
	active,
	onClick,
	children,
}: {
	active: boolean;
	onClick: () => void;
	children: string;
}) {
	return (
		<button
			type="button"
			aria-pressed={active}
			onClick={onClick}
			className={cn(
				"h-10 shrink-0 cursor-pointer rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
				active
					? "border-primary bg-primary text-white"
					: "border-black-40 bg-white text-black-70 hover:border-black-90 hover:text-black",
			)}
		>
			{children}
		</button>
	);
}
