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

	matiere: (id: string | number) => `/matieres/${id}` as `/matieres/${string}`,

	profile: "/profil",
	myDocuments: "/profil/documents",

	login: "/connexion",
	register: "/inscription",
	forgotPassword: "/mot-de-passe-oublie",
} as const;
