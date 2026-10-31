"use client";

import type { Utilisateur } from "shared";
import { Container } from "@/components/ui/container";
import { useNewDocumentFlow } from "@/hooks/use-new-document-flow";
import { ClassificationStep } from "./classification-step";
import { ConfirmCancelDialog } from "./confirm-cancel-dialog";
import { DetailsStep } from "./details-step";
import { SuccessStep } from "./success-step";
import { UploadStep } from "./upload-step";

/** Formulaire principal du parcours d'import. */
export function NewDocumentForm({ user }: { user: Utilisateur }) {
	const flow = useNewDocumentFlow({ user });

	return (
		<Container className="py-8 sm:py-12">
			<div className="mx-auto w-full max-w-3xl">
				{flow.step === 1 ? (
					<header className="text-center">
						<h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
							Importer un document
						</h1>
						<p className="mt-3 text-sm leading-relaxed text-black-60 sm:text-base">
							Partage un document et aide des centaines d’étudiants.
						</p>
					</header>
				) : null}

				{flow.step === 1 ? <UploadStep flow={flow} /> : null}
				{flow.step === 2 ? <DetailsStep flow={flow} /> : null}
				{flow.step === 3 ? <ClassificationStep flow={flow} /> : null}
				{flow.step === 4 ? <SuccessStep flow={flow} /> : null}
			</div>

			<ConfirmCancelDialog
				open={flow.cancelOpen}
				onClose={() => flow.setCancelOpen(false)}
				onConfirm={flow.handleCancelConfirm}
			/>
		</Container>
	);
}
