import { describe, expect, it } from "vitest";
import { getSafeNextPath, withNextPath } from "@/lib/next-path";

describe("paramètre next", () => {
	it("accepte les chemins internes", () => {
		expect(getSafeNextPath("/documents/nouveau")).toBe("/documents/nouveau");
		expect(getSafeNextPath("/documents/nouveau?from=profil#top")).toBe(
			"/documents/nouveau?from=profil#top",
		);
		expect(getSafeNextPath("/profil/documents")).toBe("/profil/documents");
	});

	it("refuse les redirections externes ou dangereuses", () => {
		expect(getSafeNextPath(null)).toBeNull();
		expect(getSafeNextPath("")).toBeNull();
		expect(getSafeNextPath("https://evil.example")).toBeNull();
		expect(getSafeNextPath("//evil.example")).toBeNull();
		expect(getSafeNextPath("javascript:alert(1)")).toBeNull();
		expect(getSafeNextPath("/\\evil.example")).toBeNull();
		expect(getSafeNextPath("/documents\nSet-Cookie: x")).toBeNull();
	});

	it("refuse de revenir vers un écran d'authentification", () => {
		expect(getSafeNextPath("/connexion")).toBeNull();
		expect(getSafeNextPath("/inscription?next=/documents")).toBeNull();
	});

	it("construit un lien d'authentification avec la destination", () => {
		expect(withNextPath("/connexion", "/documents/nouveau")).toBe(
			"/connexion?next=%2Fdocuments%2Fnouveau",
		);
		expect(withNextPath("/connexion", null)).toBe("/connexion");
		expect(withNextPath("/connexion?mode=page", "/profil")).toBe(
			"/connexion?mode=page&next=%2Fprofil",
		);
	});
});
