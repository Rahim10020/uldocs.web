"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AdminSearchParams, AdminUserSearchParams } from "shared";
import { listAdminDocuments, listAdminUsers } from "@/lib/api/admin";
import { queryKeys } from "@/lib/query-keys";

/** Recherche admin dans les comptes utilisateurs. */
export function useAdminUsers(params: AdminUserSearchParams = {}) {
	return useQuery({
		queryKey: queryKeys.admin.users(params),
		queryFn: () => listAdminUsers(params),
		placeholderData: keepPreviousData,
	});
}

/** Recherche admin dans tous les documents, quel que soit leur statut. */
export function useAdminDocuments(params: AdminSearchParams = {}) {
	return useQuery({
		queryKey: queryKeys.admin.documents(params),
		queryFn: () => listAdminDocuments(params),
		placeholderData: keepPreviousData,
		enabled: Boolean(params.q?.trim()),
	});
}
