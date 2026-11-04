"use client";

import { useQuery } from "@tanstack/react-query";
import { listReports } from "@/lib/api/reports";
import { queryKeys } from "@/lib/query-keys";

/** Nombre de signalements encore ouverts, indépendamment des filtres. */
export function useOpenReportsCount(enabled = true) {
	return useQuery({
		queryKey: queryKeys.reports.openCount,
		queryFn: async () => {
			const page = await listReports({
				statut: "ouvert",
				page: 1,
				pageSize: 1,
			});

			return page.total;
		},
		enabled,
		staleTime: 30_000,
	});
}
