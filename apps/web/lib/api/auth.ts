import type { LoginPayload, RegisterPayload, Utilisateur } from "shared";
import { apiFetch } from "./client";
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
