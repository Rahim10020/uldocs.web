"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type {
  DocumentDetail,
  DocumentListItem,
  DocumentSearchParams,
} from "shared";
import { listDocuments } from "@/lib/api/documents";
import { queryKeys } from "@/lib/query-keys";

/** Documents populaires de la même faculté, même UE en priorité. */
export function useSimilarDocuments(document: DocumentDetail | undefined) {
  const params: DocumentSearchParams = {
    faculteId: document?.faculte.id ?? -1,
    pageSize: 12,
    tri: "populaire",
  };

  const query = useQuery({
    queryKey: queryKeys.documents.list(params),
    queryFn: () => listDocuments(params),
    enabled: Boolean(document),
  });

  const documents = useMemo<DocumentListItem[]>(() => {
    if (!document) {
      return [];
    }

    return [...(query.data?.data ?? [])]
      .filter((item) => item.id !== document.id)
      .sort((a, b) => {
        const sameUeA = a.ue.id === document.ue.id ? 1 : 0;
        const sameUeB = b.ue.id === document.ue.id ? 1 : 0;

        return (
          sameUeB - sameUeA ||
          b.nbTelechargements - a.nbTelechargements ||
          b.noteMoyenne - a.noteMoyenne
        );
      })
      .slice(0, 6);
  }, [document, query.data]);

  return { ...query, documents };
}
