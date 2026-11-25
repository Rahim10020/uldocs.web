"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AuditSearchParams } from "shared";
import { listAudit } from "@/lib/api/admin";
import { queryKeys } from "@/lib/query-keys";

/** Journal d'audit paginé et filtrable. */
export function useAdminAudit(params: AuditSearchParams = {}) {
	return useQuery({
		queryKey: queryKeys.admin.audit(params),
		queryFn: () => listAudit(params),
		placeholderData: keepPreviousData,
	});
}
