"use client";

import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/lib/api/auth";
import { queryKeys } from "@/lib/query-keys";

/** Session courante, avec `null` quand l'utilisateur est anonyme. */
export function useSession() {
	const query = useQuery({
		queryKey: queryKeys.auth.me,
		queryFn: getSession,
		retry: false,
		staleTime: 60_000,
	});

	const user = query.data ?? null;

	return {
		...query,
		user,
		isAuthenticated: user !== null,
		isLoading: query.isPending,
		isModerator: user?.role === "moderateur" || user?.role === "admin",
	};
}
