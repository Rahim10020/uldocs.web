"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect, useId, useRef } from "react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { cn } from "@/lib/utils";

/** Feuille plein écran utilisée par les filtres sur mobile. */
export function FilterSheet({
	open,
	onClose,
	title = "Filtres",
	children,
	footer,
	className,
}: {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	footer?: ReactNode;
	className?: string;
}) {
	const titleId = useId();
	const closeRef = useRef<HTMLButtonElement>(null);

	useBodyScrollLock(open);

	useEffect(() => {
		if (!open) {
			return;
		}

		const previousFocus = globalThis.document
			.activeElement as HTMLElement | null;
		const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose();
			}
		}

		globalThis.document.addEventListener("keydown", handleKeyDown);

		return () => {
			window.clearTimeout(focusTimer);
			globalThis.document.removeEventListener("keydown", handleKeyDown);
			previousFocus?.focus();
		};
	}, [open, onClose]);

	if (!open) {
		return null;
	}

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			className="fixed inset-0 z-60 lg:hidden"
		>
			<button
				type="button"
				aria-label="Fermer les filtres"
				onClick={onClose}
				className="absolute inset-0 cursor-default bg-black-50"
			/>

			<div
				className={cn(
					"absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-white shadow-xl",
					className,
				)}
			>
				<div className="flex items-center justify-between border-b border-black-10 px-5 py-4">
					<h2 id={titleId} className="text-lg font-semibold text-black">
						{title}
					</h2>
					<button
						ref={closeRef}
						type="button"
						onClick={onClose}
						aria-label="Fermer"
						className="flex size-9 cursor-pointer items-center justify-center rounded text-black-60 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
					>
						<X aria-hidden className="size-6" />
					</button>
				</div>

				<div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
					{children}
				</div>

				{footer ? (
					<div className="flex gap-3 border-t border-black-10 px-5 py-4">
						{footer}
					</div>
				) : null}
			</div>
		</div>
	);
}
