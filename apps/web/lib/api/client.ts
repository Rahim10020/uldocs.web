import type { ApiResponse, Paginated, PaginatedResponse } from "shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Erreur renvoyée par l'API. */
export class ApiError extends Error {
	readonly status: number;
	readonly code?: string;

	constructor(message: string, status: number, code?: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.code = code;
	}
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const isFormData = init?.body instanceof FormData;

	const response = await fetch(`${API_URL}${path}`, {
		...init,
		headers: {
			...(isFormData ? {} : { "Content-Type": "application/json" }),
			...init?.headers,
		},
	});

	if (response.status === 204) {
		return undefined as T;
	}

	const payload = (await response
		.json()
		.catch(() => null)) as ApiResponse<T> | null;

	if (!response.ok || !payload?.ok) {
		throw new ApiError(
			payload && !payload.ok ? payload.error : `Erreur ${response.status}`,
			response.status,
		);
	}

	return payload.data;
}

/** Appel API typé : renvoie directement `data` et lève une `ApiError` en cas d'échec. */
export function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
	return request<T>(path, init);
}

/** Appel API paginé : renvoie `data`, `total`, `page` et `pageSize`. */
export async function apiFetchPaginated<T>(
	path: string,
	init?: RequestInit,
): Promise<Paginated<T>> {
	const payload = await request<PaginatedResponse<T>>(path, init);

	return {
		data: payload.data,
		total: payload.total,
		page: payload.page,
		pageSize: payload.pageSize,
	};
}
