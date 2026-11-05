import type { DocumentListItem, Paginated, PublicUserProfile } from "shared";
import { apiFetch, apiFetchPaginated } from "./client";
import { endpoints } from "./endpoints";

/** GET /users/:id — profil public d'un utilisateur. */
export function getPublicUserProfile(id: number): Promise<PublicUserProfile> {
	return apiFetch<PublicUserProfile>(endpoints.users.publicProfile(id));
}

/** GET /users/:id/documents — documents validés publiés par un utilisateur. */
export function listPublicUserDocuments(
	id: number,
	page = 1,
	pageSize = 20,
): Promise<Paginated<DocumentListItem>> {
	const query = new URLSearchParams({
		page: String(page),
		pageSize: String(pageSize),
	});

	return apiFetchPaginated<DocumentListItem>(
		`${endpoints.users.publicDocuments(id)}?${query.toString()}`,
	);
}
