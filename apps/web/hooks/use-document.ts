"use client";

import { useQuery } from "@tanstack/react-query";
import { getDocument } from "@/lib/api/documents";
import { queryKeys } from "@/lib/query-keys";

/** Détail d'un document. Désactivé tant que l'id est invalide. */
export function useDocument(id: number) {
  return useQuery({
    queryKey: queryKeys.documents.detail(id),
    queryFn: () => getDocument(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
