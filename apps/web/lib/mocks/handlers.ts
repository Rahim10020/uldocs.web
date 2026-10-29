import {
	type DocumentSearchParams,
	FORMATS_DOCUMENT,
	type FormatDocument,
	type LoginPayload,
	type RegisterPayload,
	TRIS_DOCUMENTS,
	type TriDocuments,
	TYPES_DOCUMENT,
	type TypeDocument,
	type UpdateProfilePayload,
	VOTES_DOCUMENT,
	type VoteDocument,
} from "shared";
import { ApiError } from "../api/errors";
import { mockAcademic } from "./academic";
import {
	getMockDocument,
	listMockDocumentsByUploader,
	listMockFavoriteDocuments,
	recordMockDownload,
	searchMockDocuments,
	setMockFavorite,
	setMockReaction,
} from "./documents";
import {
	loginMock,
	logoutMock,
	registerMock,
	requireMockSession,
	updateMockProfile,
} from "./users";

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

function readJsonBody<T>(init?: RequestInit): T {
	if (!init?.body) {
		throw new ApiError("Corps de requête manquant", 400, "VALIDATION_ERROR");
	}

	try {
		return JSON.parse(String(init.body)) as T;
	} catch {
		throw new ApiError("Corps de requête invalide", 400, "VALIDATION_ERROR");
	}
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
		return requireMockSession();
	}

	if (method === "POST" && pathname === "/auth/login") {
		return loginMock(readJsonBody<LoginPayload>(init));
	}

	if (method === "POST" && pathname === "/auth/register") {
		return registerMock(readJsonBody<RegisterPayload>(init));
	}

	if (method === "PATCH" && pathname === "/auth/me") {
		return updateMockProfile(readJsonBody<UpdateProfilePayload>(init));
	}

	if (method === "POST" && pathname === "/auth/logout") {
		logoutMock();
		return undefined;
	}

	if (method === "POST" && pathname === "/auth/forgot-password") {
		return undefined;
	}

	if (method === "GET" && pathname === "/documents") {
		return searchMockDocuments(parseSearchParams(searchParams));
	}

	if (method === "GET" && pathname === "/documents/mine") {
		return listMockDocumentsByUploader(
			requireMockSession().id,
			readNumber(searchParams.get("page")) ?? 1,
			readNumber(searchParams.get("pageSize")) ?? 20,
		);
	}

	if (method === "GET" && pathname === "/documents/favorites") {
		requireMockSession();
		return listMockFavoriteDocuments(
			readNumber(searchParams.get("page")) ?? 1,
			readNumber(searchParams.get("pageSize")) ?? 20,
		);
	}

	const favoriteMatch = /^\/documents\/(\d+)\/favorite$/.exec(pathname);

	if ((method === "POST" || method === "DELETE") && favoriteMatch) {
		requireMockSession();
		const updated = setMockFavorite(
			Number(favoriteMatch[1]),
			method === "POST",
		);

		if (!updated) {
			throw new ApiError("Document introuvable", 404, "NOT_FOUND");
		}

		return undefined;
	}

	const reactionMatch = /^\/documents\/(\d+)\/reaction$/.exec(pathname);

	if (method === "PUT" && reactionMatch) {
		requireMockSession();
		let body: { valeur?: unknown } = {};

		try {
			body = init?.body ? JSON.parse(String(init.body)) : {};
		} catch {
			throw new ApiError("Corps de requête invalide", 400, "VALIDATION_ERROR");
		}

		const valeur = body.valeur;

		if (
			valeur !== null &&
			(typeof valeur !== "string" ||
				!VOTES_DOCUMENT.includes(valeur as VoteDocument))
		) {
			throw new ApiError("Réaction invalide", 400, "VALIDATION_ERROR");
		}

		const reaction = setMockReaction(
			Number(reactionMatch[1]),
			valeur as VoteDocument | null,
		);

		if (!reaction) {
			throw new ApiError("Document introuvable", 404, "NOT_FOUND");
		}

		return reaction;
	}

	const downloadMatch = /^\/documents\/(\d+)\/download$/.exec(pathname);

	if (method === "POST" && downloadMatch) {
		requireMockSession();
		const url = recordMockDownload(Number(downloadMatch[1]));

		if (!url) {
			throw new ApiError("Document introuvable", 404, "NOT_FOUND");
		}

		return { url };
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
