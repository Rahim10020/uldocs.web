"use client";

import { useCallback, useMemo, useState } from "react";
import type {
	AdminUserSearchParams,
	CategorieContribution,
	Role,
	StatutUtilisateur,
} from "shared";
import { ADMIN_USERS_PAGE_SIZE } from "@/lib/admin-users";

/** État local des filtres de la liste admin des utilisateurs. */
export function useAdminUsersSearch() {
	const [query, setQueryState] = useState("");
	const [role, setRoleState] = useState<Role | "">("");
	const [contribution, setContributionState] = useState<
		CategorieContribution | ""
	>("");
	const [statut, setStatutState] = useState<StatutUtilisateur | "">("");
	const [page, setPage] = useState(1);

	const setQuery = useCallback((value: string) => {
		setQueryState(value);
		setPage(1);
	}, []);

	const setRole = useCallback((value: string) => {
		setRoleState(value as Role | "");
		setPage(1);
	}, []);

	const setContribution = useCallback((value: string) => {
		setContributionState(value as CategorieContribution | "");
		setPage(1);
	}, []);

	const setStatut = useCallback((value: string) => {
		setStatutState(value as StatutUtilisateur | "");
		setPage(1);
	}, []);

	const resetFilters = useCallback(() => {
		setQueryState("");
		setRoleState("");
		setContributionState("");
		setStatutState("");
		setPage(1);
	}, []);

	const hasFilters = Boolean(query.trim() || role || contribution || statut);
	const activeFilterCount = [role, contribution, statut].filter(Boolean).length;

	const params = useMemo<AdminUserSearchParams>(
		() => ({
			q: query.trim() || undefined,
			role: role || undefined,
			contribution: contribution || undefined,
			statut: statut || undefined,
			page,
			pageSize: ADMIN_USERS_PAGE_SIZE,
		}),
		[contribution, page, query, role, statut],
	);

	return {
		query,
		role,
		contribution,
		statut,
		page,
		params,
		hasFilters,
		activeFilterCount,
		setQuery,
		setRole,
		setContribution,
		setStatut,
		setPage,
		resetFilters,
	};
}
