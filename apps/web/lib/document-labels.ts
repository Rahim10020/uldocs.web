import {
	type StatutDocument,
	TRIS_DOCUMENTS,
	type TriDocuments,
	TYPES_DOCUMENT,
	type TypeDocument,
} from "shared";

/** Libellés français des natures de document (UI uniquement). */
export const TYPE_DOCUMENT_LABELS: Record<TypeDocument, string> = {
	cours: "Cours",
	annale: "Examen",
	corrige: "Corrigé",
	resume: "Résumé",
	td: "TD",
	autre: "Autre",
};

/** Libellés français des statuts de document (UI uniquement). */
export const STATUT_DOCUMENT_LABELS: Record<StatutDocument, string> = {
	en_attente: "En attente",
	valide: "En ligne",
	signale: "Signalé",
	retire: "Retiré",
};

/** Libellés français des tris de recherche. */
export const TRI_DOCUMENT_LABELS: Record<TriDocuments, string> = {
	pertinence: "Pertinence",
	recent: "Plus récent",
	populaire: "Plus téléchargés",
	mieux_note: "Mieux notés",
};

/** Options de type prêtes à l'emploi, dans l'ordre de `TYPES_DOCUMENT`. */
export const TYPE_DOCUMENT_OPTIONS = TYPES_DOCUMENT.map((value) => ({
	value,
	label: TYPE_DOCUMENT_LABELS[value],
}));

/** Options de tri prêtes à l'emploi, dans l'ordre de `TRIS_DOCUMENTS`. */
export const TRI_DOCUMENT_OPTIONS = TRIS_DOCUMENTS.map((value) => ({
	value,
	label: TRI_DOCUMENT_LABELS[value],
}));
