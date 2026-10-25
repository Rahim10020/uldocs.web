"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listFavoriteDocuments } from "@/lib/api/documents";
import { queryKeys } from "@/lib/query-keys";

/** Liste paginée des documents favoris de l'utilisateur connecté. */
export function useFavoriteDocuments(page = 1, pageSize = 20) {
	return useQuery({
		queryKey: queryKeys.documents.favorites(page, pageSize),
		queryFn: () => listFavoriteDocuments(page, pageSize),
		placeholderData: keepPreviousData,
	});
}
