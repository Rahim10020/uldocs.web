"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/ui/search-bar";
import { routes } from "@/lib/routes";

/** Paramètres d'URL conservés quand on lance une nouvelle recherche. */
const PRESERVED_KEYS = [
  "faculteId",
  "filiereId",
  "niveau",
  "semestre",
  "ueId",
  "type",
  "format",
  "anneeAcademique",
  "tri",
  "view",
] as const;

/** Barre de recherche du header, préremplie avec `q` sur la page résultats. */
export function HeaderSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDocumentsPage = pathname === routes.documents;

  const defaultValue = isDocumentsPage ? (searchParams.get("q") ?? "") : "";

  const hiddenParams = isDocumentsPage
    ? Object.fromEntries(
        PRESERVED_KEYS.flatMap((key) => {
          const value = searchParams.get(key);

          return value ? [[key, value]] : [];
        }),
      )
    : undefined;

  return (
    <SearchBar
      placeholder="Recherche"
      defaultValue={defaultValue}
      hiddenParams={hiddenParams}
    />
  );
}
