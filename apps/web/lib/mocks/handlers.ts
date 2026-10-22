import {
  type DocumentSearchParams,
  FORMATS_DOCUMENT,
  type FormatDocument,
  TRIS_DOCUMENTS,
  type TriDocuments,
  TYPES_DOCUMENT,
  type TypeDocument,
} from "shared";
import { ApiError } from "../api/errors";
import { mockAcademic } from "./academic";
import {
  getMockDocument,
  listMockDocumentsByUploader,
  searchMockDocuments,
} from "./documents";
import { CURRENT_USER } from "./users";

/**
 * Routeur mock : imite les endpoints du contrat d'API.
 * Aucun composant ne l'appelle directement — tout passe par lib/api/client.
 */

const MOCK_DELAY_MS = 60;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readNumber(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}

function readString(value: string | null): string | undefined {
  return value === null || value === "" ? undefined : value;
}

function parseSearchParams(
  searchParams: URLSearchParams,
): DocumentSearchParams {
  const params: DocumentSearchParams = {};

  const q = readString(searchParams.get("q"));
  if (q !== undefined) params.q = q;

  const faculteId = readNumber(searchParams.get("faculteId"));
  if (faculteId !== undefined) params.faculteId = faculteId;

  const filiereId = readNumber(searchParams.get("filiereId"));
  if (filiereId !== undefined) params.filiereId = filiereId;

  const niveau = readString(searchParams.get("niveau"));
  if (niveau !== undefined) params.niveau = niveau;

  const semestre = readString(searchParams.get("semestre"));
  if (semestre !== undefined) params.semestre = semestre;

  const ueId = readNumber(searchParams.get("ueId"));
  if (ueId !== undefined) params.ueId = ueId;

  const type = searchParams.get("type");
  if (type && TYPES_DOCUMENT.includes(type as TypeDocument)) {
    params.type = type as TypeDocument;
  }

  const format = searchParams.get("format");
  if (format && FORMATS_DOCUMENT.includes(format as FormatDocument)) {
    params.format = format as FormatDocument;
  }

  const anneeAcademique = readString(searchParams.get("anneeAcademique"));
  if (anneeAcademique !== undefined) {
    params.anneeAcademique = anneeAcademique;
  }

  const tri = searchParams.get("tri");
  if (tri && TRIS_DOCUMENTS.includes(tri as TriDocuments)) {
    params.tri = tri as TriDocuments;
  }

  const page = readNumber(searchParams.get("page"));
  if (page !== undefined) params.page = page;

  const pageSize = readNumber(searchParams.get("pageSize"));
  if (pageSize !== undefined) params.pageSize = pageSize;

  return params;
}

export async function mockRequest(
  path: string,
  init?: RequestInit,
): Promise<unknown> {
  await delay(MOCK_DELAY_MS);

  const method = (init?.method ?? "GET").toUpperCase();
  const url = new URL(path, "http://mock.local");
  const { pathname, searchParams } = url;

  if (method === "GET" && pathname === "/academic/tree") {
    return mockAcademic.facultes;
  }

  if (method === "GET" && pathname === "/auth/me") {
    return CURRENT_USER;
  }

  if (
    method === "POST" &&
    (pathname === "/auth/login" || pathname === "/auth/register")
  ) {
    return CURRENT_USER;
  }

  if (method === "POST" && pathname === "/auth/logout") {
    return undefined;
  }

  if (method === "GET" && pathname === "/documents") {
    return searchMockDocuments(parseSearchParams(searchParams));
  }

  if (method === "GET" && pathname === "/documents/mine") {
    return listMockDocumentsByUploader(
      CURRENT_USER.id,
      readNumber(searchParams.get("page")) ?? 1,
      readNumber(searchParams.get("pageSize")) ?? 20,
    );
  }

  const detailMatch = /^\/documents\/(\d+)$/.exec(pathname);

  if (method === "GET" && detailMatch) {
    const document = getMockDocument(Number(detailMatch[1]));

    if (!document) {
      throw new ApiError("Document introuvable", 404, "NOT_FOUND");
    }

    return document;
  }

  throw new ApiError(
    `Endpoint mock non implémenté : ${method} ${pathname}`,
    501,
    "NOT_IMPLEMENTED",
  );
}
