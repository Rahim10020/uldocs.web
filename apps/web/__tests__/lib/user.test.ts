import { describe, expect, it } from "vitest";
import { getFirstName, getInitial, getRoleLabel } from "@/lib/user";

describe("utilitaires utilisateur", () => {
	it("extrait le premier prénom en ignorant les espaces superflus", () => {
		expect(getFirstName("  Akouvi   Mensah ")).toBe("Akouvi");
	});

	it("renvoie le nom complet quand il n’y a pas d’espace", () => {
		expect(getFirstName("Akouvi")).toBe("Akouvi");
	});

	it("renvoie l’initiale en majuscule", () => {
		expect(getInitial("akouvi")).toBe("A");
		expect(getInitial("émeline")).toBe("É");
	});

	it("renvoie un libellé pour les rôles privilégiés", () => {
		expect(getRoleLabel("moderateur")).toBe("Modérateur");
		expect(getRoleLabel("admin")).toBe("Admin");
		expect(getRoleLabel("etudiant")).toBeNull();
	});
});
