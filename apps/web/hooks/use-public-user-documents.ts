"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listPublicUserDocuments } from "@/lib/api/users";
import { queryKeys } from "@/lib/query-keys";

/** Documents validés publiés par un utilisateur, avec pagination. */
export function usePublicUserDocuments(
	userId: number,
	page = 1,
	pageSize = 20,
) {
	return useQuery({
		queryKey: queryKeys.documents.publicByUser(userId, page, pageSize),
		queryFn: () => listPublicUserDocuments(userId, page, pageSize),
		placeholderData: keepPreviousData,
		enabled: Number.isInteger(userId) && userId > 0,
		retry: false,
	});
}
