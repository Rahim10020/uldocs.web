import type { Faculte, Filiere, Niveau, Semestre, UE } from "./entities.js";
import type {
	ActionModeration,
	CategorieFaculte,
	FormatDocument,
	MotifSignalement,
	StatutDocument,
	StatutSignalement,
	TriDocuments,
	TypeDocument,
	VoteDocument,
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
 * PATCH /auth/me
 * Permet de compléter ou modifier le nom et les informations académiques du
 * profil. `null` efface explicitement la valeur.
 */
export type UpdateProfilePayload = {
	nom?: string;
	faculteId?: number | null;
	filiereId?: number | null;
	niveauId?: number | null;
};

/**
 * Profil public d'un utilisateur (GET /users/:id).
 * Ne contient aucune donnée privée : pas d'email, de statut de compte ni de
 * dernière connexion.
 */
export type PublicUserProfile = {
	id: number;
	nom: string;
	avatarUrl: string | null;
	faculteId: number | null;
	filiereId: number | null;
	niveauId: number | null;
	points: number;
	stats: {
		documents: number;
		views: number;
		downloads: number;
	};
	rank: {
		position: number;
		totalContributors: number;
	};
};

/** Corps de POST /documents/:id/report. */
export type ReportDocumentPayload = {
	motif: MotifSignalement;
	commentaire?: string;
};

/** Paramètres de GET /reports. */
export type ReportSearchParams = {
	statut?: StatutSignalement;
	motif?: MotifSignalement;
	page?: number;
	pageSize?: number;
};

/** Document résumé joint à un signalement dans la file de modération. */
export type SignalementDocumentSummary = {
	id: number;
	titre: string;
	format: FormatDocument;
	statut: StatutDocument;
};

/** Élément de la file de signalements (GET /reports). */
export type SignalementListItem = {
	id: number;
	document: SignalementDocumentSummary;
	signaleur: { id: number; nom: string };
	motif: MotifSignalement;
	commentaire: string | null;
	statut: StatutSignalement;
	dateSignalement: string;
};

/** Détail complet d'un signalement (GET /reports/:id). */
export type SignalementDetail = Omit<SignalementListItem, "document"> & {
	document: SignalementDocumentSummary & {
		dateUpload: string;
		nbVues: number;
		nbTelechargements: number;
		uploader: { id: number; nom: string };
	};
	traitePar: { id: number; nom: string } | null;
	dateTraitement: string | null;
	action: {
		action: ActionModeration;
		raison: string | null;
		dateAction: string;
	} | null;
	previousReportsCount: number;
};

/** Corps de POST /moderation/actions. */
export type ModerationActionPayload = {
	reportId: number;
	action: Exclude<ActionModeration, "valider">;
	raison: string;
};

/** Corps de PATCH /reports/:id pour rejeter un signalement. */
export type RejectReportPayload = {
	statut: "rejete";
	raison: string;
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
	nbPages: number | null;
	anneeAcademique: string;
	fichierUrl: string;
	nbVues: number;
	nbTelechargements: number;
	noteMoyenne: number;
	statut: StatutDocument;
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

/** Compteurs et vote de l'utilisateur courant sur un document. */
export type DocumentReaction = {
	votesUtiles: number;
	votesInutiles: number;
	voteUtilisateur: VoteDocument | null;
};

/** Corps de PUT /documents/:id/reaction. */
export type DocumentReactionPayload = {
	valeur: VoteDocument | null;
};

/** Document complet (GET /documents/:id). */
export type DocumentDetail = DocumentListItem & {
	tailleKo: number;
	langue: string;
	dateMiseAJour: string;
	enseignant: { id: number; nom: string } | null;
	tags: { id: number; nom: string }[];
	reaction: DocumentReaction;
};

/** Corps multipart de POST /documents. */
export type DocumentCreatePayload = {
	titre: string;
	description?: string;
	type: TypeDocument;
	ueId: number;
	enseignantId?: number;
	anneeAcademique: string;
	langue?: string;
	nbPages?: number;
	certification: true;
	fichier: File;
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
