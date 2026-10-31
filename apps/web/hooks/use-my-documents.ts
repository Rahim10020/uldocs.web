"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listMyDocuments } from "@/lib/api/documents";
import { queryKeys } from "@/lib/query-keys";

/** Liste paginée des documents uploadés par l'utilisateur connecté. */
export function useMyDocuments(page = 1, pageSize = 20) {
	return useQuery({
		queryKey: queryKeys.documents.mine(page, pageSize),
		queryFn: () => listMyDocuments(page, pageSize),
		placeholderData: keepPreviousData,
	});
}
