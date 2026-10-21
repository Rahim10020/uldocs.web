/** Standard API response wrapper */
export type ApiResponse<T> =
	| { ok: true; data: T }
	| { ok: false; error: string };

/** GET /health */
export type HealthResponse = {
	ok: boolean;
};

/** Error response with optional error code */
export type ErrorResponse = {
	ok: false;
	error: string;
	code?: string;
};

/** Paginated list response */
export type PaginatedResponse<T> = {
	ok: true;
	data: T[];
	total: number;
	page: number;
	pageSize: number;
};

/** Paginated result, `ok` déjà retiré par le client API */
export type Paginated<T> = {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
};

/** Rôles utilisateur (table UTILISATEUR) */
export type Role = "etudiant" | "moderateur" | "admin";

/** Statut d'un compte utilisateur */
export type StatutUtilisateur = "actif" | "suspendu" | "supprime";

/** Statut d'un document */
export type StatutDocument = "en_attente" | "valide" | "signale" | "retire";

/** Utilisateur exposé par l'API (colonnes de UTILISATEUR en camelCase) */
export type Utilisateur = {
	id: number;
	nom: string;
	email: string;
	avatarUrl: string | null;
	role: Role;
	statut: StatutUtilisateur;
	faculteId: number | null;
	filiereId: number | null;
	niveauId: number | null;
	emailVerifie: boolean;
	points: number;
	dateInscription: string;
	derniereConnexion: string | null;
};

/** Document exposé par l'API (colonnes de DOCUMENT en camelCase) */
export type Document = {
	id: number;
	titre: string;
	description: string | null;
	type: string;
	matiereId: number;
	enseignantId: number | null;
	anneeAcademique: string;
	fichierUrl: string;
	format: string;
	tailleKo: number;
	nbPages: number | null;
	langue: string;
	uploaderId: number;
	statut: StatutDocument;
	nbVues: number;
	nbTelechargements: number;
	noteMoyenne: number;
	dateUpload: string;
	dateMiseAJour: string;
};

/** POST /auth/login */
export type LoginPayload = {
	email: string;
	motDePasse: string;
};

/** POST /auth/register */
export type RegisterPayload = {
	nom: string;
	email: string;
	motDePasse: string;
	faculteId?: number;
	filiereId?: number;
	niveauId?: number;
};

/** Tri des résultats de recherche */
export type TriDocuments = "pertinence" | "recent" | "populaire" | "mieux_note";

/** GET /documents */
export type DocumentListParams = {
	q?: string;
	faculteId?: number;
	filiereId?: number;
	niveauId?: number;
	matiereId?: number;
	type?: string;
	anneeAcademique?: string;
	tri?: TriDocuments;
	page?: number;
	pageSize?: number;
};
