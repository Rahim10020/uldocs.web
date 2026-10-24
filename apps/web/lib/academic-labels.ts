import type { NiveauScolarite } from "shared";

const NIVEAU_LABELS: Record<NiveauScolarite, string> = {
  L1: "Licence 1, L1",
  L2: "Licence 2, L2",
  L3: "Licence 3, L3",
  M1: "Master 1, M1",
  M2: "Master 2, M2",
  Doctorat: "Doctorat",
};

/** Libellé lisible d'un niveau, ex. « Licence 1, L1 ». */
export function formatNiveau(nom: string): string {
  return NIVEAU_LABELS[nom as NiveauScolarite] ?? nom;
}

/** Libellé lisible d'un semestre, ex. « Semestre 1, S1 ». */
export function formatSemestre(nom: string): string {
  const ordre = Number(nom.slice(1));

  return Number.isFinite(ordre) ? `Semestre ${ordre}, ${nom}` : nom;
}
