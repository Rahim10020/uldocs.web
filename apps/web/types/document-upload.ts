import type { DocumentDetail, FormatDocument } from "shared";

/** Étape du parcours d'import. */
export type NewDocumentStep = 1 | 2 | 3 | 4;

/** Fichier sélectionné, enrichi des métadonnées lues côté navigateur. */
export type UploadFileItem = {
	id: string;
	file: File;
	format: FormatDocument;
	nbPages: number | null;
};

/** Fichier qui n'a pas pu être créé côté API. */
export type UploadFailure = {
	file: UploadFileItem;
	titre: string;
	message: string;
};

/** Résultat d'un import multi-fichiers. */
export type UploadDocumentsResult = {
	created: DocumentDetail[];
	failed: UploadFailure[];
};
