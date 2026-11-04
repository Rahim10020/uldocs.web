"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ActionModeration, ModerationActionPayload } from "shared";
import { applyModerationAction, rejectReport } from "@/lib/api/reports";
import { queryKeys } from "@/lib/query-keys";

type ModerationDecisionInput = {
	reportId: number;
	action: ActionModeration;
	raison: string;
};

/** Applique une décision de modération et rafraîchit les caches concernés. */
export function useModerationDecision() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			reportId,
			action,
			raison,
		}: ModerationDecisionInput) => {
			if (action === "valider") {
				return rejectReport(reportId, { statut: "rejete", raison });
			}

			const payload: ModerationActionPayload = {
				reportId,
				action,
				raison,
			};

			return applyModerationAction(payload);
		},
		onSuccess: async (report) => {
			queryClient.setQueryData(queryKeys.reports.detail(report.id), report);

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: queryKeys.reports.all }),
				queryClient.invalidateQueries({ queryKey: queryKeys.documents.all }),
			]);
		},
	});
}
