import type {
	CategorieFaculte,
	FormatDocument,
	Role,
	StatutDocument,
	StatutSignalement,
	StatutUtilisateur,
	TypeDocument,
} from "./enums.js";

/** Table FACULTE : faculté, école ou institut. */
export type Faculte = {
	id: number;
	nom: string;
	code: string;
	categorie: CategorieFaculte;
	description: string | null;
	createdAt: string;
};

/** Table FILIERE. `code` n'est pas unique (ex. "GC" existe deux fois). */
export type Filiere = {
	id: number;
	nom: string;
	code: string | null;
	faculteId: number;
	createdAt: string;
};

/** Table NIVEAU. `ordre` : L1=1 … M2=5, Doctorat=6. */
export type Niveau = {
	id: number;
	nom: string;
	ordre: number;
	filiereId: number;
};

/** Table SEMESTRE. `ordre` : S1=1 … S10=10. */
export type Semestre = {
	id: number;
	nom: string;
	ordre: number;
	niveauId: number;
};

/** Table UE (ex-MATIERE). */
export type UE = {
	id: number;
	nom: string;
	code: string | null;
	aliases: string | null;
	semestreId: number;
	createdAt: string;
};

/** Table ENSEIGNANT. */
export type Enseignant = {
	id: number;
	nom: string;
	faculteId: number | null;
	email: string | null;
	createdAt: string;
};

/** Table TAG. */
export type Tag = {
	id: number;
	nom: string;
	createdAt: string;
};

/** Table UTILISATEUR, sans les colonnes sensibles. */
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

/** Table DOCUMENT (colonnes brutes, sans jointures). */
export type Document = {
	id: number;
	titre: string;
	description: string | null;
	type: TypeDocument;
	ueId: number;
	enseignantId: number | null;
	anneeAcademique: string;
	fichierUrl: string;
	format: FormatDocument;
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

/** Table SIGNALEMENT. */
export type Signalement = {
	id: number;
	documentId: number;
	signaleurId: number;
	motif: string;
	commentaire: string | null;
	statut: StatutSignalement;
	traitePar: number | null;
	dateSignalement: string;
	dateTraitement: string | null;
};

/** Table MODERATION_ACTION. */
export type ModerationAction = {
	id: number;
	moderateurId: number;
	documentId: number | null;
	utilisateurCibleId: number | null;
	action: string;
	raison: string | null;
	dateAction: string;
};
