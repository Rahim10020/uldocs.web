"use client";

import { useMutation } from "@tanstack/react-query";
import type { ReportDocumentPayload } from "shared";
import { reportDocument } from "@/lib/api/documents";

/** Envoie un signalement sur un document. */
export function useReportDocument() {
	return useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: number;
			payload: ReportDocumentPayload;
		}) => reportDocument(id, payload),
	});
}
