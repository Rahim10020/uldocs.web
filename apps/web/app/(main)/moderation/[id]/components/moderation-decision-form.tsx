"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import { useModerationForm } from "@/hooks/use-moderation-form";
import {
	MODERATION_DECISION_OPTIONS,
	MODERATION_REASON_MAX_LENGTH,
} from "@/lib/reports";
import { routes } from "@/lib/routes";

/** Formulaire de décision d'un signalement encore ouvert. */
export function ModerationDecisionForm({ reportId }: { reportId: number }) {
	const { form, mutation, onSubmit } = useModerationForm(reportId);
	const {
		register,
		watch,
		formState: { errors },
	} = form;
	const raison = watch("raison") ?? "";

	return (
		<form onSubmit={onSubmit} className="mt-10">
			<fieldset>
				<legend className="text-base font-semibold text-black">
					Action à prendre
				</legend>

				<div className="mt-4 space-y-3">
					{MODERATION_DECISION_OPTIONS.map((option) => (
						<label
							key={option.value}
							className="flex cursor-pointer items-start gap-3 text-sm text-black"
						>
							<input
								type="radio"
								value={option.value}
								{...register("action")}
								className="peer sr-only"
							/>
							<span
								aria-hidden
								className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-black-40 bg-white transition-colors peer-checked:border-primary peer-checked:[&>span]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-40 peer-focus-visible:ring-offset-2"
							>
								<span className="size-2 rounded-full bg-primary opacity-0 transition-opacity" />
							</span>
							<span className="leading-6">{option.label}</span>
						</label>
					))}
				</div>

				{errors.action ? (
					<p role="alert" className="mt-2 text-sm text-error">
						{errors.action.message}
					</p>
				) : null}
			</fieldset>

			<div className="mt-8">
				<label
					htmlFor="moderation-raison"
					className="text-base font-semibold text-black"
				>
					Raison (obligatoire)
				</label>
				<textarea
					id="moderation-raison"
					rows={5}
					placeholder="Explique ta décision…"
					{...register("raison")}
					aria-invalid={errors.raison ? true : undefined}
					className="mt-3 w-full resize-y rounded border border-black-40 bg-white px-4 py-3 text-sm text-black placeholder:text-black-50 focus:border-black-90 focus:outline-none focus:ring focus:ring-black-90"
				/>
				<div className="mt-2 flex items-start justify-between gap-4">
					<div>
						{errors.raison ? (
							<p role="alert" className="text-sm text-error">
								{errors.raison.message}
							</p>
						) : null}
					</div>
					<p className="shrink-0 text-xs text-black-50">
						{raison.length}/{MODERATION_REASON_MAX_LENGTH}
					</p>
				</div>
			</div>

			{mutation.isError ? (
				<p
					role="alert"
					className="mt-4 rounded border border-error bg-white p-3 text-sm text-error"
				>
					{mutation.error instanceof Error
						? mutation.error.message
						: "La décision n'a pas pu être appliquée."}
				</p>
			) : null}

			<div className="mt-6 flex gap-3 sm:justify-center">
				<Button
					type="submit"
					disabled={mutation.isPending}
					className="flex-1 sm:flex-none"
				>
					{mutation.isPending ? "Envoi…" : "Confirmer l'action"}
				</Button>
				<ButtonLink href={routes.moderation} variant="secondary">
					Annuler
				</ButtonLink>
			</div>
		</form>
	);
}
