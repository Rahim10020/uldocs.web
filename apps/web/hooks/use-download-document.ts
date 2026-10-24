"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { downloadDocument } from "@/lib/api/documents";
import { queryKeys } from "@/lib/query-keys";

type DownloadVariables = {
	id: number;
	/** Nom du fichier proposé au téléchargement, sans extension. */
	fileName: string;
};

function saveFile(url: string, fileName: string): void {
	const link = document.createElement("a");
	const extension = url.split(".").pop();

	link.href = url;
	link.download = extension ? `${fileName}.${extension}` : fileName;
	link.rel = "noopener";
	document.body.append(link);
	link.click();
	link.remove();
}

/** Enregistre le téléchargement côté API puis lance le téléchargement du fichier. */
export function useDownloadDocument() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id }: DownloadVariables) => downloadDocument(id),
		onSuccess: ({ url }, { fileName }) => {
			saveFile(url, fileName);
			void queryClient.invalidateQueries({
				queryKey: queryKeys.documents.all,
			});
		},
	});
}
