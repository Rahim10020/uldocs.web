"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DocumentDetail, VoteDocument } from "shared";
import { setDocumentReaction } from "@/lib/api/documents";
import { applyReaction } from "@/lib/document-detail";
import { queryKeys } from "@/lib/query-keys";

type ReactionVariables = {
  documentId: number;
  /** Vote visé ; `null` retire le vote. */
  valeur: VoteDocument | null;
};

/** Enregistre un vote utile/inutile avec mise à jour optimiste de la fiche. */
export function useDocumentReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, valeur }: ReactionVariables) =>
      setDocumentReaction(documentId, { valeur }),
    onMutate: async ({ documentId, valeur }) => {
      const key = queryKeys.documents.detail(documentId);

      await queryClient.cancelQueries({ queryKey: key });

      const previous = queryClient.getQueryData<DocumentDetail>(key);

      if (previous) {
        queryClient.setQueryData<DocumentDetail>(key, {
          ...previous,
          reaction: applyReaction(previous.reaction, valeur),
        });
      }

      return { key, previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(context.key, context.previous);
      }
    },
    onSuccess: (reaction, { documentId }) => {
      const key = queryKeys.documents.detail(documentId);
      const current = queryClient.getQueryData<DocumentDetail>(key);

      if (current) {
        queryClient.setQueryData<DocumentDetail>(key, {
          ...current,
          reaction,
        });
      }
    },
    onSettled: (_data, _error, { documentId }) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.documents.detail(documentId),
      });
    },
  });
}
