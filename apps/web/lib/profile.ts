import type { Route } from "next";
import type { FaculteTree, Utilisateur } from "shared";
import { resolveAcademicSelection } from "./academic-selection";
import { routes } from "./routes";

export const PROFILE_PAGE_SIZE = 12;

export const PROFILE_TABS = ["documents", "enregistres"] as const;
export type ProfileTab = (typeof PROFILE_TABS)[number];

/** Lit l'onglet du profil depuis l'URL, `documents` par défaut. */
export function parseProfileTab(
  value: string | string[] | undefined,
): ProfileTab {
  const tab = Array.isArray(value) ? value[0] : value;

  return tab === "enregistres" ? "enregistres" : "documents";
}

/** URL d'un onglet du profil, pour les liens et la redirection. */
export function profileTabHref(tab: ProfileTab): Route {
  return `${routes.profile}?tab=${tab}` as Route;
}

/** Résumé académique affiché dans l'en-tête du profil. */
export function formatProfileAcademic(
  facultes: FaculteTree[],
  user: Pick<Utilisateur, "faculteId" | "filiereId" | "niveauId">,
): string | null {
  const selection = resolveAcademicSelection(facultes, user);

  if (!selection) {
    return null;
  }

  const faculte = facultes.find(
    (item) => String(item.id) === selection.faculteId,
  );
  const filiere = faculte?.filieres.find(
    (item) => String(item.id) === selection.filiereId,
  );
  const niveau = filiere?.niveaux.find(
    (item) => String(item.id) === selection.niveauId,
  );

  const parts = [niveau?.nom, filiere?.nom, faculte?.code].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : (faculte?.nom ?? null);
}
