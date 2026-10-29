import type {
	LoginPayload,
	RegisterPayload,
	UpdateProfilePayload,
	Utilisateur,
} from "shared";
import { ApiError, apiFetch } from "./client";
import { endpoints } from "./endpoints";

/** POST /auth/login */
export function login(payload: LoginPayload): Promise<Utilisateur> {
	return apiFetch<Utilisateur>(endpoints.auth.login, {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

/** POST /auth/register */
export function register(payload: RegisterPayload): Promise<Utilisateur> {
	return apiFetch<Utilisateur>(endpoints.auth.register, {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

/** POST /auth/logout */
export function logout(): Promise<void> {
	return apiFetch<void>(endpoints.auth.logout, { method: "POST" });
}

/** GET /auth/me */
export function getMe(): Promise<Utilisateur> {
	return apiFetch<Utilisateur>(endpoints.auth.me);
}

/** GET /auth/me, avec `null` quand la session est absente. */
export async function getSession(): Promise<Utilisateur | null> {
	try {
		return await getMe();
	} catch (error) {
		if (error instanceof ApiError && error.status === 401) {
			return null;
		}

		throw error;
	}
}

/** PATCH /auth/me */
export function updateProfile(
	payload: UpdateProfilePayload,
): Promise<Utilisateur> {
	return apiFetch<Utilisateur>(endpoints.auth.me, {
		method: "PATCH",
		body: JSON.stringify(payload),
	});
}

/** POST /auth/forgot-password */
export function forgotPassword(email: string): Promise<void> {
	return apiFetch<void>(endpoints.auth.forgotPassword, {
		method: "POST",
		body: JSON.stringify({ email }),
	});
}
