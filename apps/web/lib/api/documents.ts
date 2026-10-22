import type {
	DocumentDetail,
	DocumentListItem,
	DocumentSearchParams,
	Paginated,
} from "shared";
import { apiFetch, apiFetchPaginated } from "./client";
import { endpoints } from "./endpoints";

/** GET /documents */
export function listDocuments(
	params: DocumentSearchParams = {},
): Promise<Paginated<DocumentListItem>> {
	const query = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== "") {
			query.set(key, String(value));
		}
	}

	const search = query.toString();

	return apiFetchPaginated<DocumentListItem>(
		search ? `${endpoints.documents.list}?${search}` : endpoints.documents.list,
	);
}

/** GET /documents/:id */
export function getDocument(id: number): Promise<DocumentDetail> {
	return apiFetch<DocumentDetail>(endpoints.documents.byId(id));
}

/** POST /documents (multipart/form-data) */
export function createDocument(formData: FormData): Promise<DocumentDetail> {
	return apiFetch<DocumentDetail>(endpoints.documents.create, {
		method: "POST",
		body: formData,
	});
}

/** DELETE /documents/:id */
export function deleteDocument(id: number): Promise<void> {
	return apiFetch<void>(endpoints.documents.byId(id), { method: "DELETE" });
}
