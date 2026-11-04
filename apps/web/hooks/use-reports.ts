"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ReportSearchParams } from "shared";
import { listReports } from "@/lib/api/reports";
import { queryKeys } from "@/lib/query-keys";

/** File de signalements paginée et filtrée. */
export function useReports(params: ReportSearchParams, enabled = true) {
	return useQuery({
		queryKey: queryKeys.reports.list(params),
		queryFn: () => listReports(params),
		placeholderData: keepPreviousData,
		enabled,
	});
}
