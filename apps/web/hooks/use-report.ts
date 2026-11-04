"use client";

import { useQuery } from "@tanstack/react-query";
import { getReport } from "@/lib/api/reports";
import { queryKeys } from "@/lib/query-keys";

/** Détail d'un signalement. */
export function useReport(id: number, enabled = true) {
	return useQuery({
		queryKey: queryKeys.reports.detail(id),
		queryFn: () => getReport(id),
		enabled,
	});
}
