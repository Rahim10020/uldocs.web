"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DocumentDetail, TypeDocument } from "shared";
import { createDocument } from "@/lib/api/documents";
import { ApiError } from "@/lib/api/errors";
import { buildDocumentFormData } from "@/lib/document-upload";
import { queryKeys } from "@/lib/query-keys";
import type {
	UploadDocumentsResult,
	UploadFailure,
	UploadFileItem,
} from "@/types/document-upload";

type UploadMetadata = {
	type: TypeDocument;
	ueId: number;
	anneeAcademique: string;
};

type UploadDocumentsVariables = {
	files: UploadFileItem[];
	titles: Record<string, string>;
	metadata: UploadMetadata;
	onProgress?: (completed: number, total: number) => void;
};

function getUploadErrorMessage(error: unknown): string {
	if (error instanceof ApiError) {
		if (error.status === 413) {
			return "Le fichier dépasse 20 Mo.";
		}

		if (error.status === 401) {
			return "Ta session a expiré. Reconnecte-toi.";
		}

		if (error.status === 400) {
			return "Les informations du document sont invalides.";
		}
	}

	return "L'envoi a échoué. Réessaie.";
}

/** Envoie plusieurs fichiers en séquentiel et renvoie les succès partiels. */
export function useCreateDocuments() {
	const queryClient = useQueryClient();

	return useMutation<UploadDocumentsResult, Error, UploadDocumentsVariables>({
		mutationFn: async ({ files, titles, metadata, onProgress }) => {
			const created: DocumentDetail[] = [];
			const failed: UploadFailure[] = [];

			for (const [index, item] of files.entries()) {
				const titre = titles[item.id]?.trim() ?? "";

				try {
					const document = await createDocument(
						buildDocumentFormData({
							titre,
							type: metadata.type,
							ueId: metadata.ueId,
							anneeAcademique: metadata.anneeAcademique,
							nbPages: item.nbPages,
							fichier: item.file,
						}),
					);

					created.push(document);
				} catch (error) {
					failed.push({
						file: item,
						titre,
						message: getUploadErrorMessage(error),
					});
				} finally {
					onProgress?.(index + 1, files.length);
				}
			}

			return { created, failed };
		},
		onSuccess: ({ created }) => {
			if (created.length > 0) {
				void queryClient.invalidateQueries({
					queryKey: queryKeys.documents.all,
				});
			}
		},
	});
}
