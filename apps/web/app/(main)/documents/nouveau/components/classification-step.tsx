"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AuthSelect } from "@/components/ui/auth-select";
import { Button } from "@/components/ui/button";
import { LoadingDots } from "@/components/ui/loading-dots";
import type { NewDocumentFlowController } from "@/hooks/use-new-document-flow";
import { academicYearOptions } from "@/lib/document-upload";
import { routes } from "@/lib/routes";

/** Étape 3 : niveau, semestre, matière, année et certification. */
export function ClassificationStep({
	flow,
}: {
	flow: NewDocumentFlowController;
}) {
	const errors = flow.form.formState.errors;
	const filiereId = flow.form.watch("filiereId");
	const niveauId = flow.form.watch("niveauId");
	const semestreId = flow.form.watch("semestreId");
	const ueId = flow.form.watch("ueId");
	const anneeAcademique = flow.form.watch("anneeAcademique");
	const treeUnavailable = flow.treeQuery.isPending || flow.treeQuery.isError;
	const yearOptions = academicYearOptions().map((year) => ({
		value: year,
		label: year,
	}));

	return (
		<section
			className="mt-8"
			aria-label="Classement du document"
			aria-busy={flow.isSubmitting}
		>
			<div className="mx-auto w-full max-w-sm">
				<button
					type="button"
					onClick={flow.handleBack}
					disabled={flow.isSubmitting}
					className="mb-8 inline-flex items-center gap-2 rounded text-sm font-semibold text-black-70 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50"
				>
					<ChevronLeft aria-hidden className="size-5" />
					Retour
				</button>

				<div className="space-y-4">
					<AuthSelect
						label="Niveau"
						value={niveauId}
						options={flow.niveauOptions}
						placeholder={
							filiereId ? "Choisir un niveau" : "Choisis d’abord une filière"
						}
						onChange={flow.handleNiveauChange}
						disabled={treeUnavailable || !filiereId}
						error={errors.niveauId?.message}
						required
					/>
					<AuthSelect
						label="Semestre"
						value={semestreId}
						options={flow.semestreOptions}
						placeholder={
							niveauId ? "Choisir un semestre" : "Choisis d’abord un niveau"
						}
						onChange={flow.handleSemestreChange}
						disabled={treeUnavailable || !niveauId}
						error={errors.semestreId?.message}
						required
					/>
					<AuthSelect
						label="Matière (UE)"
						value={ueId}
						options={flow.ueOptions}
						placeholder={
							semestreId ? "Choisir une matière" : "Choisis d’abord un semestre"
						}
						onChange={(value) =>
							flow.form.setValue("ueId", value, { shouldValidate: true })
						}
						disabled={treeUnavailable || !semestreId}
						error={errors.ueId?.message}
						required
					/>
					<AuthSelect
						label="Année académique"
						value={anneeAcademique}
						options={yearOptions}
						placeholder="Choisir une année"
						onChange={(value) =>
							flow.form.setValue("anneeAcademique", value, {
								shouldValidate: true,
							})
						}
						error={errors.anneeAcademique?.message}
						required
					/>
				</div>

				<label className="mt-6 flex cursor-pointer items-start gap-3">
					<input
						type="checkbox"
						{...flow.form.register("certification")}
						className="mt-0.5 size-4 shrink-0 accent-primary"
					/>
					<span className="text-sm leading-relaxed text-black-70">
						Je certifie avoir le droit de partager ce document et qu’il ne
						contient rien d’illégal ou de contraire à la{" "}
						<Link
							href={routes.charter}
							className="font-semibold text-primary underline-offset-2 hover:underline"
						>
							charte
						</Link>
						.<span aria-hidden> *</span>
					</span>
				</label>
				{errors.certification?.message ? (
					<p className="mt-2 text-sm text-error">
						{errors.certification.message}
					</p>
				) : null}

				{flow.isSubmitting ? (
					<div
						role="status"
						aria-live="polite"
						className="mt-6 rounded-md border border-black-10 bg-surface p-4"
					>
						<p className="text-sm font-semibold text-black">
							Envoi {flow.progress.completed} sur {flow.progress.total}…
						</p>
						<p className="mt-1 text-xs text-black-60">
							Ne ferme pas cette page pendant l’envoi.
						</p>
					</div>
				) : null}

				{flow.submitError ? (
					<div
						role="alert"
						className="mt-6 rounded-md border border-error px-4 py-3 text-sm text-error"
					>
						{flow.submitError}
					</div>
				) : null}

				<div className="mt-8 flex gap-3">
					<Button
						variant="secondary"
						className="h-12 flex-1 text-sm"
						onClick={flow.handleCancelRequest}
						disabled={flow.isSubmitting}
					>
						Annuler
					</Button>
					<Button
						className="h-12 flex-1 text-sm"
						onClick={() => void flow.handleClassificationContinue()}
						disabled={flow.isSubmitting}
					>
						{flow.isSubmitting ? (
							<>
								Envoi en cours
								<LoadingDots />
							</>
						) : (
							"Envoyer les documents"
						)}
					</Button>
				</div>
			</div>
		</section>
	);
}
