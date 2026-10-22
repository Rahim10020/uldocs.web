"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { DocumentSearchParams } from "shared";
import { listDocuments } from "@/lib/api/documents";
import { queryKeys } from "@/lib/query-keys";

/** Liste paginée de documents (recherche + filtres + tri). */
export function useDocuments(params: DocumentSearchParams = {}) {
  return useQuery({
    queryKey: queryKeys.documents.list(params),
    queryFn: () => listDocuments(params),
    placeholderData: keepPreviousData,
  });
}
