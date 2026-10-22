import type { FaculteTree } from "shared";
import { apiFetch } from "./client";
import { endpoints } from "./endpoints";

/** GET /academic/tree — arbre complet pour la cascade et les filtres. */
export function getAcademicTree(): Promise<FaculteTree[]> {
  return apiFetch<FaculteTree[]>(endpoints.academic.tree);
}
