import type { Role } from "shared";

/** Prénom affiché dans les menus et messages de bienvenue. */
export function getFirstName(nom: string): string {
	return nom.trim().split(/\s+/)[0] ?? nom;
}

/** Initiale affichée dans l'avatar quand aucune image n'est disponible. */
export function getInitial(nom: string): string {
	return nom.trim().charAt(0).toLocaleUpperCase("fr-FR") || "?";
}

/** Libellé du rôle pour le badge du menu compte. */
export function getRoleLabel(role: Role) {
	switch (role) {
		case "moderateur":
			return "Modérateur";
		case "admin":
			return "Admin";
		default:
			return null;
	}
}
