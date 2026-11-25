"use client";

import { useQuery } from "@tanstack/react-query";
import type { AdminStatsPeriod } from "shared";
import { getAdminStats } from "@/lib/api/admin";
import { queryKeys } from "@/lib/query-keys";

/** Statistiques du tableau de bord admin pour une période donnée. */
export function useAdminStats(period: AdminStatsPeriod) {
	return useQuery({
		queryKey: queryKeys.admin.stats(period),
		queryFn: () => getAdminStats(period),
		staleTime: 60_000,
	});
}
