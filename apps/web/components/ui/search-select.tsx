"use client";

import { Check, ChevronDown } from "lucide-react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SearchSelectOption = {
	value: string;
	label: string;
};

/** Select personnalisé, utilisé par la barre de filtres et la feuille mobile. */
export function SearchSelect({
	label,
	value,
	options,
	onChange,
	className,
	allLabel,
	disabled,
	showAllOption = true,
	inline = false,
}: {
	label: string;
	value: string;
	options: SearchSelectOption[];
	onChange: (value: string) => void;
	className?: string;
	/** Libellé de l'option vide. Par défaut, le nom du filtre. */
	allLabel?: string;
	disabled?: boolean;
	/** Affiche l'option vide en tête de liste. Désactiver pour un tri sans « tous ». */
	showAllOption?: boolean;
	/** Affiche la liste dans le flux, utile dans une feuille scrollable. */
	inline?: boolean;
}) {
	const id = useId();
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const listboxRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const allOptions = showAllOption
		? [{ value: "", label: allLabel ?? label }, ...options]
		: options;
	const selectedIndex = Math.max(
		0,
		allOptions.findIndex((option) => option.value === value),
	);
	const selectedOption = allOptions[selectedIndex] ?? {
		value: "",
		label: allLabel ?? label,
	};
	const listboxId = `${id}-listbox`;

	useEffect(() => {
		if (!open) return;

		function handlePointerDown(event: PointerEvent) {
			if (!rootRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [open]);

	useEffect(() => {
		if (open) {
			document
				.getElementById(`${id}-option-${activeIndex}`)
				?.scrollIntoView({ block: "nearest" });
		}
	}, [activeIndex, id, open]);

	useEffect(() => {
		if (open && inline) {
			listboxRef.current?.scrollIntoView({ block: "nearest" });
		}
	}, [inline, open]);

	function selectOption(option: SearchSelectOption) {
		onChange(option.value);
		setOpen(false);
		triggerRef.current?.focus();
	}

	function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
		if (disabled) return;

		if (!open) {
			if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
				event.preventDefault();
				setActiveIndex(selectedIndex);
				setOpen(true);
			}
			return;
		}

		if (event.key === "Escape" || event.key === "Tab") {
			setOpen(false);
			return;
		}

		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			const direction = event.key === "ArrowDown" ? 1 : -1;
			setActiveIndex(
				(current) =>
					(current + direction + allOptions.length) % allOptions.length,
			);
			return;
		}

		if (event.key === "Home" || event.key === "End") {
			event.preventDefault();
			setActiveIndex(event.key === "Home" ? 0 : allOptions.length - 1);
			return;
		}

		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			selectOption(allOptions[activeIndex]);
		}
	}

	return (
		<div ref={rootRef} className={cn("relative", className)}>
			<button
				ref={triggerRef}
				type="button"
				role="combobox"
				aria-label={label}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={open ? listboxId : undefined}
				aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
				disabled={disabled}
				onClick={() => {
					if (!open) setActiveIndex(selectedIndex);
					setOpen((current) => !current);
				}}
				onKeyDown={handleKeyDown}
				className={cn(
					"flex h-10 w-full cursor-pointer items-center justify-between gap-2 truncate rounded border border-black-40 bg-white pl-3 pr-2 text-left text-sm transition-colors focus:border-black-90 focus:outline-none focus:ring focus:ring-black-90 disabled:cursor-not-allowed disabled:opacity-50",
					value ? "font-medium text-black" : "text-black-80",
				)}
			>
				<span className="truncate">{selectedOption.label}</span>
				<ChevronDown
					aria-hidden
					className={cn(
						"size-4 shrink-0 text-black-60 transition-transform",
						open && "rotate-180",
					)}
				/>
			</button>

			{open && (
				<div
					ref={listboxRef}
					id={listboxId}
					role="listbox"
					aria-label={label}
					className={cn(
						"z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-black-10 bg-white p-1 shadow-lg [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black-20",
						inline ? "relative" : "absolute left-0 top-full",
					)}
				>
					{allOptions.map((option, index) => {
						const selected = option.value === value;
						const active = index === activeIndex;

						return (
							<div
								key={option.value || "all"}
								id={`${id}-option-${index}`}
								role="option"
								tabIndex={-1}
								aria-selected={selected}
								onMouseEnter={() => setActiveIndex(index)}
								onMouseDown={(event) => event.preventDefault()}
								onClick={() => selectOption(option)}
								onKeyDown={(event) => {
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										selectOption(option);
									}
								}}
								className={cn(
									"flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded px-3 py-2 text-sm text-black transition-colors",
									active && "bg-primary-5",
									selected && "font-medium text-primary",
								)}
							>
								<span className="truncate">{option.label}</span>
								{selected && <Check aria-hidden className="size-4 shrink-0" />}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
