"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	ADMIN_USER_ACTION_LABELS,
	ADMIN_USER_REASON_MAX_LENGTH,
	type AdminUserActionKind,
	type AdminUserReasonValues,
	adminUserReasonSchema,
} from "@/lib/admin-users";

const ACTION_CONFIRM_LABELS: Record<AdminUserActionKind, string> = {
	promote: "Promouvoir",
	suspend: "Suspendre le compte",
	reactivate: "Réactiver le compte",
	ban: "Bannir définitivement",
};

export function AdminUserActionDialog({
	userName,
	action,
	errorMessage,
	isPending,
	onConfirm,
	onClose,
}: {
	userName: string;
	action: AdminUserActionKind;
	errorMessage: string | null;
	isPending: boolean;
	onConfirm: (reason: string) => Promise<void>;
	onClose: () => void;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AdminUserReasonValues>({
		resolver: zodResolver(adminUserReasonSchema),
		defaultValues: { raison: "" },
	});

	useEffect(() => {
		const dialog = dialogRef.current;

		if (!dialog) {
			return;
		}

		dialog.showModal();

		return () => {
			if (dialog.open) {
				dialog.close();
			}
		};
	}, []);

	const submit = handleSubmit(async ({ raison }) => {
		try {
			await onConfirm(raison);
			onClose();
		} catch {
			// L'erreur est affichée à l'intérieur de la boîte de dialogue.
		}
	});

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby="admin-user-action-title"
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			className="m-auto w-[90vw] max-w-xl rounded-xl border border-black-10 bg-white p-0 text-black shadow-xl backdrop:bg-black-60"
		>
			<form onSubmit={submit} className="p-6 sm:p-8">
				<h2
					id="admin-user-action-title"
					className="text-xl font-semibold text-black"
				>
					{ADMIN_USER_ACTION_LABELS[action]}
				</h2>
				<p className="mt-2 text-sm text-black-70">
					Compte concerné : <span className="font-semibold">{userName}</span>.
					La raison sera conservée dans le journal d&apos;audit.
				</p>

				<div className="mt-6">
					<label
						htmlFor="admin-user-action-reason"
						className="text-sm font-semibold text-black"
					>
						Raison (obligatoire)
					</label>
					<textarea
						id="admin-user-action-reason"
						rows={4}
						maxLength={ADMIN_USER_REASON_MAX_LENGTH}
						placeholder="Explique la raison de cette action…"
						{...register("raison")}
						aria-invalid={errors.raison ? true : undefined}
						aria-describedby={
							errors.raison
								? "admin-user-action-reason-error"
								: "admin-user-action-reason-hint"
						}
						className="mt-2 w-full resize-y rounded-lg border border-black-20 bg-white px-4 py-3 text-sm text-black placeholder:text-black-50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-20"
					/>
					<div className="mt-2 flex min-h-5 justify-between gap-4 text-xs text-black-60">
						{errors.raison ? (
							<p
								id="admin-user-action-reason-error"
								role="alert"
								className="text-error"
							>
								{errors.raison.message}
							</p>
						) : (
							<p id="admin-user-action-reason-hint">
								Entre 10 et {ADMIN_USER_REASON_MAX_LENGTH} caractères.
							</p>
						)}
					</div>
				</div>

				{errorMessage ? (
					<p
						role="alert"
						className="mt-4 rounded-lg border border-error bg-white p-3 text-sm text-error"
					>
						{errorMessage}
					</p>
				) : null}

				<div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
					<Button
						type="button"
						variant="secondary"
						onClick={onClose}
						disabled={isPending}
					>
						Annuler
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending ? "Enregistrement…" : ACTION_CONFIRM_LABELS[action]}
					</Button>
				</div>
			</form>
		</dialog>
	);
}
