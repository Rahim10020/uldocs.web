import type {
	AdminSearchParams,
	AdminStats,
	AdminStatsPeriod,
	AuditEntry,
	AuditSearchParams,
	DocumentListItem,
	Paginated,
	Utilisateur,
} from "shared";
import { apiFetch, apiFetchPaginated } from "./client";
import { endpoints } from "./endpoints";

function toQuery(params: Record<string, string | number | undefined>): string {
	const query = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== "") {
			query.set(key, String(value));
		}
	}

	return query.toString();
}

/** GET /admin/stats */
export function getAdminStats(period: AdminStatsPeriod): Promise<AdminStats> {
	const query = toQuery({ period });

	return apiFetch<AdminStats>(`${endpoints.admin.stats}?${query}`);
}

/** GET /admin/audit */
export function listAudit(
	params: AuditSearchParams = {},
): Promise<Paginated<AuditEntry>> {
	const query = toQuery({
		action: params.action,
		page: params.page,
		pageSize: params.pageSize,
	});
	const search = query ? `?${query}` : "";

	return apiFetchPaginated<AuditEntry>(`${endpoints.admin.audit}${search}`);
}

/** GET /admin/users */
export function listAdminUsers(
	params: AdminSearchParams = {},
): Promise<Paginated<Utilisateur>> {
	const query = toQuery({
		q: params.q,
		page: params.page,
		pageSize: params.pageSize,
	});
	const search = query ? `?${query}` : "";

	return apiFetchPaginated<Utilisateur>(`${endpoints.admin.users}${search}`);
}

/** GET /admin/documents */
export function listAdminDocuments(
	params: AdminSearchParams = {},
): Promise<Paginated<DocumentListItem>> {
	const query = toQuery({
		q: params.q,
		page: params.page,
		pageSize: params.pageSize,
	});
	const search = query ? `?${query}` : "";

	return apiFetchPaginated<DocumentListItem>(
		`${endpoints.admin.documents}${search}`,
	);
}
