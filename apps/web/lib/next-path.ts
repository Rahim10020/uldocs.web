import type { Route } from "next";

const AUTH_PATHS = new Set([
	"/connexion",
	"/inscription",
	"/mot-de-passe-oublie",
]);

const SAFE_ORIGIN = "http://uldocs.local";

/**
 * Valide un paramètre `next` pour n'autoriser que des chemins internes.
 * Protège contre les redirections ouvertes (`//evil.tld`, `https://…`).
 */
export function getSafeNextPath(
	value: string | null | undefined,
): string | null {
	if (!value) {
		return null;
	}

	if (!value.startsWith("/") || value.startsWith("//")) {
		return null;
	}

	if (value.includes("://") || value.includes("\\")) {
		return null;
	}

	for (const char of value) {
		const code = char.charCodeAt(0);

		if (code < 0x20 || code === 0x7f) {
			return null;
		}
	}

	let url: URL;

	try {
		url = new URL(value, SAFE_ORIGIN);
	} catch {
		return null;
	}

	if (url.origin !== SAFE_ORIGIN) {
		return null;
	}

	if (AUTH_PATHS.has(url.pathname)) {
		return null;
	}

	return `${url.pathname}${url.search}${url.hash}`;
}

/** Construit un lien d'authentification en conservant la destination. */
export function withNextPath(path: string, nextPath: string | null): Route {
	if (!nextPath) {
		return path as Route;
	}

	const separator = path.includes("?") ? "&" : "?";
	return `${path}${separator}next=${encodeURIComponent(nextPath)}` as Route;
}
