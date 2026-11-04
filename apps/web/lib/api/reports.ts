import type {
	ModerationActionPayload,
	Paginated,
	RejectReportPayload,
	ReportSearchParams,
	SignalementDetail,
	SignalementListItem,
} from "shared";
import { apiFetch, apiFetchPaginated } from "./client";
import { endpoints } from "./endpoints";

/** GET /reports */
export function listReports(
	params: ReportSearchParams = {},
): Promise<Paginated<SignalementListItem>> {
	const query = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null) {
			query.set(key, String(value));
		}
	}

	const search = query.toString();

	return apiFetchPaginated<SignalementListItem>(
		search ? `${endpoints.reports.list}?${search}` : endpoints.reports.list,
	);
}

/** GET /reports/:id */
export function getReport(id: number): Promise<SignalementDetail> {
	return apiFetch<SignalementDetail>(endpoints.reports.byId(id));
}

/** PATCH /reports/:id — rejette un signalement. */
export function rejectReport(
	id: number,
	payload: RejectReportPayload,
): Promise<SignalementDetail> {
	return apiFetch<SignalementDetail>(endpoints.reports.byId(id), {
		method: "PATCH",
		body: JSON.stringify(payload),
	});
}

/** POST /moderation/actions — applique une décision à un signalement. */
export function applyModerationAction(
	payload: ModerationActionPayload,
): Promise<SignalementDetail> {
	return apiFetch<SignalementDetail>(endpoints.moderation.actions, {
		method: "POST",
		body: JSON.stringify(payload),
	});
}
