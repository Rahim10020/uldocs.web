"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useReportDocument } from "@/hooks/use-report-document";
import { useSession } from "@/hooks/use-session";
import {
	MOTIF_SIGNALEMENT_OPTIONS,
	type ReportDocumentFormOutput,
	type ReportDocumentFormValues,
	reportDocumentSchema,
} from "@/lib/reports";
import { getFirstName } from "@/lib/user";
import { cn } from "@/lib/utils";

/** Signalement d'un document : formulaire, puis confirmation. */
export function DocumentReportDialog({
	open,
	documentId,
	onClose,
}: {
	open: boolean;
	documentId: number;
	onClose: () => void;
}) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const successCloseRef = useRef<HTMLButtonElement>(null);
	const titleId = useId();
	const commentId = useId();
	const [step, setStep] = useState<"form" | "success">("form");
	const { user } = useSession();
	const mutation = useReportDocument();
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<ReportDocumentFormValues, unknown, ReportDocumentFormOutput>({
		resolver: zodResolver(reportDocumentSchema),
		defaultValues: {
			motif: "",
			commentaire: "",
		},
	});

	const selectedMotif = useWatch({ control, name: "motif" });
	const firstName = user ? getFirstName(user.nom) : "";

	const close = useCallback(() => {
		mutation.reset();
		onClose();
	}, [mutation, onClose]);
	const closeRefCallback = useRef(close);
	closeRefCallback.current = close;

	useBodyScrollLock(open);

	useEffect(() => {
		if (!open) {
			setStep("form");
			reset();
		}
	}, [open, reset]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const previousFocus = document.activeElement as HTMLElement | null;
		const dialog = dialogRef.current;
		const focusTimer = window.setTimeout(() => {
			closeRef.current?.focus();
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
				closeRefCallback.current();
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

	useEffect(() => {
		if (open && step === "success") {
			successCloseRef.current?.focus();
		}
	}, [open, step]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			await mutation.mutateAsync({
				id: documentId,
				payload: {
					motif: values.motif,
					commentaire: values.commentaire.trim() || undefined,
				},
			});
			setStep("success");
		} catch {
			// L'erreur est exposée par `mutation.isError`.
		}
	});

	if (!open) {
		return null;
	}

	return (
		<div
			ref={dialogRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			className="fixed inset-0 z-[90] flex cursor-pointer items-end justify-center bg-black-40 sm:items-center sm:p-4"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) {
					close();
				}
			}}
		>
			<div className="max-h-[92dvh] w-full max-w-lg cursor-default overflow-y-auto rounded-t-2xl bg-white p-5 shadow-lg sm:rounded-lg sm:p-6">
				{step === "form" ? (
					<>
						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 id={titleId} className="text-xl font-bold text-black">
									Signaler un document
								</h2>
								<p className="mt-1 text-sm text-black-60">
									Aide-nous à garder ulDocs fiable.
								</p>
							</div>
							<button
								ref={closeRef}
								type="button"
								onClick={close}
								aria-label="Fermer"
								className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
							>
								<X aria-hidden className="size-5" />
							</button>
						</div>

						<form onSubmit={onSubmit} className="mt-5 space-y-5" noValidate>
							<fieldset>
								<legend className="text-sm font-semibold text-black">
									Motif du signalement
								</legend>
								<div className="mt-3 space-y-2">
									{MOTIF_SIGNALEMENT_OPTIONS.map((option) => (
										<label
											key={option.value}
											className={cn(
												"flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors",
												selectedMotif === option.value
													? "border-primary bg-primary-5 text-black"
													: "border-black-10 text-black-80 hover:border-black-20",
											)}
										>
											<input
												type="radio"
												value={option.value}
												{...register("motif")}
												className="sr-only"
											/>
											<span
												aria-hidden
												className={cn(
													"flex size-4 shrink-0 items-center justify-center rounded-full border",
													selectedMotif === option.value
														? "border-primary"
														: "border-black-30",
												)}
											>
												{selectedMotif === option.value ? (
													<span className="size-2 rounded-full bg-primary" />
												) : null}
											</span>
											{option.label}
										</label>
									))}
								</div>
								{errors.motif ? (
									<p role="alert" className="mt-2 text-sm text-error">
										{errors.motif.message}
									</p>
								) : null}
							</fieldset>

							<div>
								<label
									htmlFor={commentId}
									className="text-sm font-semibold text-black"
								>
									Détails (optionnel)
								</label>
								<textarea
									id={commentId}
									rows={4}
									maxLength={1000}
									placeholder="Explique brièvement le problème…"
									className="mt-2 w-full resize-none rounded-md border border-black-20 bg-white px-3 py-2 text-sm text-black placeholder:text-black-40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-20"
									{...register("commentaire")}
								/>
								{errors.commentaire ? (
									<p role="alert" className="mt-1 text-xs text-error">
										{errors.commentaire.message}
									</p>
								) : (
									<p className="mt-1 text-xs text-black-50">
										1000 caractères maximum.
									</p>
								)}
							</div>

							{mutation.isError ? (
								<p role="alert" className="text-sm text-error">
									{mutation.error instanceof Error
										? mutation.error.message
										: "Impossible d'envoyer le signalement pour le moment."}
								</p>
							) : null}

							<div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
								<Button
									type="button"
									variant="secondary"
									onClick={close}
									className="w-full sm:w-auto"
								>
									Annuler
								</Button>
								<Button
									type="submit"
									disabled={mutation.isPending}
									className="w-full sm:w-auto"
								>
									{mutation.isPending
										? "Envoi du signalement…"
										: "Envoyer le signalement"}
								</Button>
							</div>
						</form>
					</>
				) : (
					<div className="relative py-2 text-center sm:py-4">
						<button
							type="button"
							ref={successCloseRef}
							onClick={close}
							aria-label="Fermer"
							className="absolute -top-1 right-0 flex size-9 cursor-pointer items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						>
							<X aria-hidden className="size-5" />
						</button>

						<span
							aria-hidden
							className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-10 text-2xl"
						>
							🙂
						</span>
						<h2 id={titleId} className="mt-4 text-xl font-bold text-black">
							{firstName ? `Merci ${firstName} ! 🙂` : "Merci ! 🙂"}
						</h2>
						<p className="mt-2 text-sm leading-relaxed text-black-60">
							Ton signalement a bien été envoyé. Notre équipe va l'examiner.
						</p>
						<Button
							type="button"
							onClick={close}
							className="mt-6 w-full sm:w-auto"
						>
							Fermer
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
