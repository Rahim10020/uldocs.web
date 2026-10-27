import type { Route } from "next";
import type { DocumentDetail, DocumentReaction, VoteDocument } from "shared";
import { TYPE_DOCUMENT_LABELS } from "./document-labels";
import { routes } from "./routes";

export type BreadcrumbItem = {
  label: string;
  href?: Route;
};

function documentsHref(
  params: Record<string, string | number | undefined>,
): Route {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  }

  const search = query.toString();

  return (search ? `${routes.documents}?${search}` : routes.documents) as Route;
}

/** Construit le fil d'Ariane à partir des métadonnées du document. */
export function buildDocumentBreadcrumb(
  document: DocumentDetail,
): BreadcrumbItem[] {
  const faculte = { faculteId: document.faculte.id };
  const filiere = { ...faculte, filiereId: document.filiere.id };
  const niveau = { ...filiere, niveau: document.niveau };
  const semestre = { ...niveau, semestre: document.semestre };
  const ue = { ...semestre, ueId: document.ue.id };

  return [
    { label: "Accueil", href: routes.home },
    { label: document.faculte.nom, href: documentsHref(faculte) },
    {
      label: `${document.niveau} ${document.filiere.nom}`,
      href: documentsHref(filiere),
    },
    { label: document.semestre, href: documentsHref(niveau) },
    { label: document.ue.nom, href: documentsHref(semestre) },
    {
      label: `${TYPE_DOCUMENT_LABELS[document.type]} ${document.anneeAcademique}`,
      href: documentsHref(ue),
    },
  ];
}

/** Borne une page entre 1 et le nombre total de pages. */
export function clampPage(page: number, numPages: number): number {
  if (!Number.isFinite(page) || numPages < 1) {
    return 1;
  }

  return Math.min(Math.max(1, Math.trunc(page)), numPages);
}

/** Nettoie un titre pour servir de nom de fichier téléchargé. */
export function toDownloadFileName(title: string): string {
  const sanitized = title
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/-+/g, "-")
    .replace(/^[-\s]+|[-\s]+$/g, "")
    .trim();

  return sanitized || "document";
}

/** Vote suivant lorsqu'on clique sur un pouce : re-cliquer retire le vote. */
export function nextReactionVote(
  current: VoteDocument | null,
  clicked: VoteDocument,
): VoteDocument | null {
  return current === clicked ? null : clicked;
}

/** Applique un vote à un résumé de réactions. */
export function applyReaction(
  current: DocumentReaction,
  nextVote: VoteDocument | null,
): DocumentReaction {
  let votesUtiles = current.votesUtiles;
  let votesInutiles = current.votesInutiles;

  if (current.voteUtilisateur === "utile") {
    votesUtiles -= 1;
  }

  if (current.voteUtilisateur === "inutile") {
    votesInutiles -= 1;
  }

  if (nextVote === "utile") {
    votesUtiles += 1;
  }

  if (nextVote === "inutile") {
    votesInutiles += 1;
  }

  return {
    votesUtiles: Math.max(0, votesUtiles),
    votesInutiles: Math.max(0, votesInutiles),
    voteUtilisateur: nextVote,
  };
}

/** Pourcentage « utile » arrondi, 0 si personne n'a voté. */
export function usefulPercentage(reaction: DocumentReaction): number {
  const total = reaction.votesUtiles + reaction.votesInutiles;

  if (total === 0) {
    return 0;
  }

  return Math.round((reaction.votesUtiles / total) * 100);
}

/** Seuls les PDF sont rendus dans l'aperçu intégré. */
export function canPreviewDocument(
  document: Pick<DocumentDetail, "format" | "fichierUrl">,
): boolean {
  return document.format === "pdf" && Boolean(document.fichierUrl);
}

/** Nombre de pages affiché : PDF chargé prioritaire, sinon métadonnée. */
export function documentPageCount(
  document: Pick<DocumentDetail, "nbPages">,
  numPages: number | null,
): number | null {
  return numPages ?? document.nbPages;
}
