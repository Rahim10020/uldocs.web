import type {
  DocumentDetail,
  DocumentListItem,
  DocumentReaction,
  DocumentReactionPayload,
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

/** GET /documents/favorites — favoris de l'utilisateur connecté. */
export function listFavoriteDocuments(
  page = 1,
  pageSize = 20,
): Promise<Paginated<DocumentListItem>> {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return apiFetchPaginated<DocumentListItem>(
    `${endpoints.documents.favorites}?${query.toString()}`,
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

/** POST /documents/:id/favorite */
export function addFavorite(id: number): Promise<void> {
  return apiFetch<void>(endpoints.documents.favorite(id), { method: "POST" });
}

/** DELETE /documents/:id/favorite */
export function removeFavorite(id: number): Promise<void> {
  return apiFetch<void>(endpoints.documents.favorite(id), {
    method: "DELETE",
  });
}

/** POST /documents/:id/download */
export function downloadDocument(id: number): Promise<{ url: string }> {
  return apiFetch<{ url: string }>(endpoints.documents.download(id), {
    method: "POST",
  });
}

/** PUT /documents/:id/reaction */
export function setDocumentReaction(
  id: number,
  payload: DocumentReactionPayload,
): Promise<DocumentReaction> {
  return apiFetch<DocumentReaction>(endpoints.documents.reaction(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
