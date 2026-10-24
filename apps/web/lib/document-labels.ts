import type { TriDocuments, TypeDocument } from "shared";

/** Libellés français des natures de document (UI uniquement). */
export const TYPE_DOCUMENT_LABELS: Record<TypeDocument, string> = {
  cours: "Cours",
  annale: "Examen",
  td: "Devoir / TD",
  corrige: "Corrigé",
  memoire: "Mémoire",
  autre: "Autre",
};

/** Libellés français des tris de recherche. */
export const TRI_DOCUMENT_LABELS: Record<TriDocuments, string> = {
  pertinence: "Pertinence",
  recent: "Plus récent",
  populaire: "Plus téléchargés",
  mieux_note: "Mieux notés",
};
