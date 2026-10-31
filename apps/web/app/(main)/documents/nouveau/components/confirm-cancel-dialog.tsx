"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { buttonStyles } from "@/components/ui/button";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

/** Confirmation avant d'abandonner un import en cours. */
export function ConfirmCancelDialog({
	open,
	onClose,
	onConfirm,
}: {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}) {
	const titleId = useId();
	const descriptionId = useId();
	const dialogRef = useRef<HTMLDivElement>(null);
	const keepGoingRef = useRef<HTMLButtonElement>(null);
	const onCloseRef = useRef(onClose);

	onCloseRef.current = onClose;
	useBodyScrollLock(open);

	useEffect(() => {
		if (!open) {
			return;
		}

		const previousFocus = document.activeElement as HTMLElement | null;
		const dialog = dialogRef.current;
		const focusTimer = window.setTimeout(() => {
			keepGoingRef.current?.focus();
		}, 0);

		function getFocusableElements() {
			if (!dialog) {
				return [];
			}

			return Array.from(
				dialog.querySelectorAll<HTMLElement>(
					"button:not([disabled]), [href], input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
				),
			).filter((element) => element.offsetParent !== null);
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				event.preventDefault();
				onCloseRef.current();
				return;
			}

			if (event.key !== "Tab") {
				return;
			}

			const focusable = getFocusableElements();

			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			window.clearTimeout(focusTimer);
			document.removeEventListener("keydown", handleKeyDown);
			previousFocus?.focus();
		};
	}, [open]);

	if (!open) {
		return null;
	}

	return (
		<div
			ref={dialogRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
			className="fixed inset-0 z-70 flex items-end justify-center bg-black-40 p-0 sm:items-center sm:p-4"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="w-full max-w-md rounded-t-lg bg-white p-6 shadow-lg sm:rounded-lg">
				<span className="flex size-11 items-center justify-center rounded-full bg-white text-warning ring-1 ring-warning">
					<AlertTriangle aria-hidden className="size-5" />
				</span>

				<h2 id={titleId} className="mt-4 text-xl font-bold text-black">
					Annuler l’import ?
				</h2>
				<p
					id={descriptionId}
					className="mt-2 text-sm leading-relaxed text-black-60"
				>
					Les fichiers sélectionnés et les informations saisies seront perdus.
				</p>

				<div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
					<button
						ref={keepGoingRef}
						type="button"
						className={buttonStyles({
							variant: "secondary",
							className: "w-full sm:w-auto",
						})}
						onClick={onClose}
					>
						Continuer l’import
					</button>
					<button
						type="button"
						className={buttonStyles({
							className:
								"w-full bg-error text-white hover:opacity-90 sm:w-auto",
						})}
						onClick={onConfirm}
					>
						Annuler l’import
					</button>
				</div>
			</div>
		</div>
	);
}
