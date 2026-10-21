import type { Document, DocumentListParams, Paginated } from "shared";
import { apiFetch, apiFetchPaginated } from "./client";

/** GET /documents */
export function listDocuments(
  params: DocumentListParams = {},
): Promise<Paginated<Document>> {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  }

  const search = query.toString();

  return apiFetchPaginated<Document>(
    search ? `/documents?${search}` : "/documents",
  );
}

/** GET /documents/:id */
export function getDocument(id: number): Promise<Document> {
  return apiFetch<Document>(`/documents/${id}`);
}

/** POST /documents (multipart/form-data) */
export function createDocument(formData: FormData): Promise<Document> {
  return apiFetch<Document>("/documents", {
    method: "POST",
    body: formData,
  });
}

/** DELETE /documents/:id */
export function deleteDocument(id: number): Promise<void> {
  return apiFetch<void>(`/documents/${id}`, { method: "DELETE" });
}
