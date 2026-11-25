/**
 * URL publiques du frontend.
 * Les route groups (`(auth)`, `(main)`) n'apparaissent pas ici.
 */
export const routes = {
	home: "/",
	about: "/a-propos",
	charter: "/charte-de-contribution",
	report: "/signaler-un-probleme",

	documents: "/documents",
	newDocument: "/documents/nouveau",
	document: (id: string | number) =>
		`/documents/${id}` as `/documents/${string}`,
	categories: "/categories",
	categorie: (id: string | number) =>
		`/categories/${id}` as `/categories/${string}`,
	filiere: (id: string | number) => `/filieres/${id}` as `/filieres/${string}`,
	favorites: "/favoris",

	matiere: (id: string | number) => `/matieres/${id}` as `/matieres/${string}`,

	profile: "/profil",
	profileById: (id: string | number) => `/profil/${id}` as `/profil/${string}`,
	profileEdit: "/profil/modifier",
	profileSettings: "/profil/parametres",
	myDocuments: "/profil/documents",
	moderation: "/moderation",
	moderationReport: (id: string | number) =>
		`/moderation/${id}` as `/moderation/${string}`,

	admin: "/admin",
	adminModeration: "/admin/moderation",
	adminUsers: "/admin/utilisateurs",
	adminDocuments: "/admin/documents",
	adminTree: "/admin/arborescence",
	adminAudit: "/admin/journal-audit",
	adminSearch: "/admin/recherche",

	login: "/connexion",
	register: "/inscription",
	forgotPassword: "/mot-de-passe-oublie",
} as const;
