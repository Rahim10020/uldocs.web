import { describe, expect, it } from "vitest";
import { mockAcademic } from "@/lib/mocks/academic";
import {
	buildPublicProfileBadges,
	formatProfileAcademic,
	parseProfileTab,
	profileTabHref,
} from "@/lib/profile";
import { editProfileSchema } from "@/lib/profile-schema";
import { routes } from "@/lib/routes";

describe("profil", () => {
	it("lit l’onglet depuis l’URL", () => {
		expect(parseProfileTab(undefined)).toBe("documents");
		expect(parseProfileTab("enregistres")).toBe("enregistres");
		expect(parseProfileTab(["enregistres", "documents"])).toBe("enregistres");
		expect(parseProfileTab("inconnu")).toBe("documents");
	});

	it("construit les URLs des onglets", () => {
		expect(profileTabHref("documents")).toBe("/profil?tab=documents");
		expect(profileTabHref("enregistres")).toBe("/profil?tab=enregistres");
	});

	it("formate le cursus académique", () => {
		const faculte = mockAcademic.facultes[0];
		const filiere = faculte?.filieres[0];
		const niveau = filiere?.niveaux[0];

		if (!faculte || !filiere || !niveau) {
			throw new Error("Le seed académique est incomplet");
		}

		expect(
			formatProfileAcademic(mockAcademic.facultes, {
				faculteId: faculte.id,
				filiereId: filiere.id,
				niveauId: niveau.id,
			}),
		).toBe(`${niveau.nom} · ${filiere.nom} · ${faculte.code}`);
	});

	it("retourne null sans sélection académique connue", () => {
		expect(
			formatProfileAcademic(mockAcademic.facultes, {
				faculteId: null,
				filiereId: null,
				niveauId: null,
			}),
		).toBeNull();
	});

	it("construit l'URL d'un profil public", () => {
		expect(routes.profileById(42)).toBe("/profil/42");
	});

	it("dérive les badges publics des statistiques", () => {
		const badges = buildPublicProfileBadges({
			documents: 3,
			downloads: 150,
			rankPosition: 2,
		});

		expect(badges.map((badge) => badge.id)).toEqual([
			"premier-upload",
			"top-du-mois",
			"cent-telechargements",
		]);
	});

	it("n'affiche aucun badge sans contribution", () => {
		expect(
			buildPublicProfileBadges({
				documents: 0,
				downloads: 0,
				rankPosition: 8,
			}),
		).toEqual([]);
	});
});

describe("schéma de modification du profil", () => {
	const validValues = {
		nom: "Akouvi Mensah",
		faculteId: "1",
		filiereId: "2",
		niveauId: "3",
	};

	it("accepte un nom et une sélection académique", () => {
		expect(editProfileSchema.safeParse(validValues).success).toBe(true);
	});

	it("refuse un nom trop court", () => {
		const result = editProfileSchema.safeParse({ ...validValues, nom: " A " });

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.error.flatten().fieldErrors.nom).toBeDefined();
		}
	});

	it("refuse une filière vide", () => {
		const result = editProfileSchema.safeParse({
			...validValues,
			filiereId: "",
		});

		expect(result.success).toBe(false);

		if (!result.success) {
			expect(result.error.flatten().fieldErrors.filiereId).toBeDefined();
		}
	});
});
