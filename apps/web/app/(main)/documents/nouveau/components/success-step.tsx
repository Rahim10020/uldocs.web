"use client";

import { CheckCircle2, RefreshCw } from "lucide-react";
import { DocumentCard } from "@/components/shared/document-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { LoadingDots } from "@/components/ui/loading-dots";
import type { NewDocumentFlowController } from "@/hooks/use-new-document-flow";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** Étape 4 : confirmation d'envoi et suivi des échecs partiels. */
export function SuccessStep({ flow }: { flow: NewDocumentFlowController }) {
	const count = flow.createdDocs.length;
	const hasFailures = flow.failed.length > 0;

	return (
		<section className="mt-8" aria-labelledby="success-step-title">
			<div className="rounded-lg border border-black-10 bg-surface p-5 sm:p-6">
				<span className="flex size-12 items-center justify-center rounded-full bg-white text-success ring-1 ring-success">
					<CheckCircle2 aria-hidden className="size-6" />
				</span>
				<h2
					id="success-step-title"
					className="mt-4 text-2xl font-bold text-black"
				>
					{count > 1
						? `${count} documents envoyés`
						: "Ton document a bien été envoyé"}
				</h2>
				<p className="mt-2 text-sm leading-relaxed text-black-60 sm:text-base">
					Les documents sont maintenant{" "}
					<span className="font-semibold text-black">« En attente »</span>. Un
					modérateur les vérifiera avant leur publication.
				</p>
			</div>

			{hasFailures ? (
				<div
					role="alert"
					className="mt-5 rounded-md border border-warning p-4 text-warning"
				>
					<div className="flex items-start gap-3">
						<RefreshCw aria-hidden className="mt-0.5 size-5 shrink-0" />
						<div className="min-w-0 flex-1">
							<p className="font-semibold">
								{flow.failed.length > 1
									? `${flow.failed.length} fichiers n’ont pas pu être envoyés`
									: "Un fichier n’a pas pu être envoyé"}
							</p>
							<ul className="mt-2 space-y-2 text-sm text-black-70">
								{flow.failed.map((item) => (
									<li key={item.file.id}>
										<span className="font-medium text-black">
											{item.file.file.name}
										</span>
										<span className="mt-0.5 block text-xs text-black-60">
											{item.message}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<Button
						variant="secondary"
						className="mt-4"
						onClick={() => void flow.handleRetryFailed()}
						disabled={flow.isSubmitting}
					>
						{flow.isSubmitting ? (
							<>
								Nouvel essai
								<LoadingDots />
							</>
						) : (
							<>
								<RefreshCw aria-hidden className="size-4" />
								Réessayer les fichiers en échec
							</>
						)}
					</Button>

					{flow.isSubmitting ? (
						<p className="mt-3 text-xs text-black-60" role="status">
							Envoi {flow.progress.completed} sur {flow.progress.total}…
						</p>
					) : null}
				</div>
			) : null}

			{flow.submitError ? (
				<div
					role="alert"
					className="mt-5 rounded-md border border-error px-4 py-3 text-sm text-error"
				>
					{flow.submitError}
				</div>
			) : null}

			<div className="mt-8">
				<h3 className="text-md font-semibold text-black">
					Documents de cet import
				</h3>
				<div
					className={cn(
						"mt-3 grid gap-4",
						count === 1
							? "mx-auto max-w-xs grid-cols-1"
							: "sm:grid-cols-2 lg:grid-cols-3",
					)}
				>
					{flow.createdDocs.map((document) => (
						<DocumentCard
							key={document.id}
							document={document}
							variant="search-grid"
							status={document.statut}
						/>
					))}
				</div>
			</div>

			<div className="mt-8 flex flex-col gap-3 border-t border-black-10 pt-6 sm:flex-row sm:flex-wrap">
				<ButtonLink href={routes.myDocuments} className="h-12 sm:h-9">
					Voir mes documents
				</ButtonLink>
				<Button
					variant="secondary"
					className="h-12 sm:h-9"
					onClick={flow.handleStartOver}
					disabled={flow.isSubmitting}
				>
					Importer un autre document
				</Button>
				<ButtonLink href={routes.home} variant="ghost" className="h-12 sm:h-9">
					Retour à l’accueil
				</ButtonLink>
			</div>
		</section>
	);
}
