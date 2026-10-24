import type { Faculte, Filiere, Niveau, Semestre, UE } from "./entities.js";
import type {
	CategorieFaculte,
	FormatDocument,
	StatutDocument,
	TriDocuments,
	TypeDocument,
} from "./enums.js";

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

/**
 * Document dénormalisé pour les cartes (GET /documents).
 * Un seul appel suffit : pas de jointure côté client.
 */
export type DocumentListItem = {
	id: number;
	titre: string;
	description: string | null;
	type: TypeDocument;
	format: FormatDocument;
	anneeAcademique: string;
	fichierUrl: string;
	nbVues: number;
	nbTelechargements: number;
	noteMoyenne: number;
	/** `true` si l'utilisateur connecté a mis le document en favori. */
	estFavori: boolean;
	dateUpload: string;
	ue: { id: number; nom: string };
	niveau: string;
	semestre: string;
	filiere: { id: number; nom: string };
	faculte: {
		id: number;
		nom: string;
		categorie: CategorieFaculte;
		code: string;
	};
	uploader: { id: number; nom: string };
};

/** Document complet (GET /documents/:id). */
export type DocumentDetail = DocumentListItem & {
	tailleKo: number;
	nbPages: number | null;
	langue: string;
	statut: StatutDocument;
	dateMiseAJour: string;
	enseignant: { id: number; nom: string } | null;
	tags: { id: number; nom: string }[];
};

/** Paramètres de GET /documents. */
export type DocumentSearchParams = {
	q?: string;
	faculteId?: number;
	filiereId?: number;
	/** Libellé du niveau, ex. "L1" (les ids diffèrent d'une filière à l'autre). */
	niveau?: string;
	/** Libellé du semestre, ex. "S1". */
	semestre?: string;
	ueId?: number;
	type?: TypeDocument;
	format?: FormatDocument;
	anneeAcademique?: string;
	tri?: TriDocuments;
	page?: number;
	pageSize?: number;
};

/** Réponse de GET /academic/tree. */
export type FaculteTree = Faculte & {
	filieres: (Filiere & {
		niveaux: (Niveau & {
			semestres: (Semestre & {
				ues: UE[];
			})[];
		})[];
	})[];
};
