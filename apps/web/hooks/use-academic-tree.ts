"use client";

import { useQuery } from "@tanstack/react-query";
import { getAcademicTree } from "@/lib/api/academic";
import { queryKeys } from "@/lib/query-keys";

/**
 * Arbre académique complet (facultés → filières → niveaux → semestres → UE).
 * Donnée quasi statique : pas de refetch automatique.
 */
export function useAcademicTree() {
  return useQuery({
    queryKey: queryKeys.academic.tree,
    queryFn: getAcademicTree,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
