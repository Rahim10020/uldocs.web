"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "Droit civil",
  "Algorithmique",
  "Comptabilité",
  "Réseaux",
] as const;

/** État zéro résultat : suggestions, demande V2 et recommandations. */
export function EmptyResults({
  query,
  hasFilters,
  onSuggestion,
  onResetFilters,
}: {
  query: string;
  hasFilters: boolean;
  onSuggestion: (query: string) => void;
  onResetFilters: () => void;
}) {
  const trimmedQuery = query.trim();

  return (
    <div className="mx-auto mt-12 max-w-xl text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-surface text-black-40">
        <SearchX aria-hidden className="size-8" />
      </span>

      <h2 className="mt-5 text-xl font-semibold text-black sm:text-2xl">
        {trimmedQuery
          ? `Aucun résultat pour « ${trimmedQuery} »`
          : "Aucun document trouvé"}
      </h2>

      <p className="mt-2 text-sm text-black-60">
        Essayez des mots-clés plus généraux, vérifiez l'orthographe ou ajustez
        vos filtres.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-black-60">Suggestions :</span>
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestion(suggestion)}
            className="cursor-pointer rounded-full border border-black-20 px-3 py-1 text-sm text-black-80 transition-colors hover:border-black-60 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {hasFilters ? (
          <Button variant="secondary" onClick={onResetFilters}>
            Réinitialiser les filtres
          </Button>
        ) : null}
        <Button disabled>Demander ce document</Button>
      </div>
    </div>
  );
}
