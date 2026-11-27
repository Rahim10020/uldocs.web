import {
	CATEGORIES_CONTRIBUTION,
	type CategorieContribution,
	ROLES,
	type Role,
	STATUTS_UTILISATEUR,
	type StatutUtilisateur,
} from "shared";

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

/** Libellé complet du rôle, y compris pour les étudiants. */
export function getFullRoleLabel(role: Role): string {
	return getRoleLabel(role) ?? "Étudiant";
}

/** Libellés français des statuts de compte. */
export const STATUT_UTILISATEUR_LABELS: Record<StatutUtilisateur, string> = {
	actif: "Actif",
	suspendu: "Suspendu",
	supprime: "Banni",
};

/** Options de rôle, dérivées de `ROLES` pour rester exhaustives. */
export const ROLE_OPTIONS = ROLES.map((role) => ({
	value: role,
	label: getFullRoleLabel(role),
}));

/** Options de statut de compte, dans l'ordre de `STATUTS_UTILISATEUR`. */
export const STATUT_UTILISATEUR_OPTIONS = STATUTS_UTILISATEUR.map((statut) => ({
	value: statut,
	label: STATUT_UTILISATEUR_LABELS[statut],
}));

/** Tons des badges de statut (fond plein). */
export const STATUT_UTILISATEUR_TONES: Record<StatutUtilisateur, string> = {
	actif: "bg-success text-white",
	suspendu: "bg-warning text-black",
	supprime: "bg-error text-white",
};

/** Tons des statuts affichés en texte simple. */
export const STATUT_UTILISATEUR_TEXT_TONES: Record<StatutUtilisateur, string> =
	{
		actif: "text-success",
		suspendu: "text-warning",
		supprime: "text-error",
	};

/** Libellés français de la contribution d'un compte. */
export const CATEGORIE_CONTRIBUTION_LABELS: Record<
	CategorieContribution,
	string
> = {
	utilisateur: "Utilisateur",
	contributeur: "Contributeur",
};

/** Options de contribution, dérivées de `CATEGORIES_CONTRIBUTION`. */
export const CATEGORIE_CONTRIBUTION_OPTIONS = CATEGORIES_CONTRIBUTION.map(
	(contribution) => ({
		value: contribution,
		label: CATEGORIE_CONTRIBUTION_LABELS[contribution],
	}),
);
