import type { LoginPayload, RegisterPayload, Utilisateur } from "shared";
import { apiFetch } from "./client";

/** POST /auth/login */
export function login(payload: LoginPayload): Promise<Utilisateur> {
  return apiFetch<Utilisateur>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** POST /auth/register */
export function register(payload: RegisterPayload): Promise<Utilisateur> {
  return apiFetch<Utilisateur>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** POST /auth/logout */
export function logout(): Promise<void> {
  return apiFetch<void>("/auth/logout", { method: "POST" });
}

/** GET /auth/me */
export function getMe(): Promise<Utilisateur> {
  return apiFetch<Utilisateur>("/auth/me");
}
