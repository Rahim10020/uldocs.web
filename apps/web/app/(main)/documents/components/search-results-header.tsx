"use client";

import { LayoutGrid, List } from "lucide-react";
import type { ReactNode } from "react";
import type { SearchView } from "@/hooks/use-documents-search";
import { cn } from "@/lib/utils";

/** Nombre de résultats + bascule grille/liste. */
export function SearchResultsHeader({
  total,
  query,
  view,
  onViewChange,
}: {
  total: number;
  query: string;
  view: SearchView;
  onViewChange: (view: SearchView) => void;
}) {
  const count = new Intl.NumberFormat("fr-FR").format(total);
  const trimmedQuery = query.trim();

  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <p className="text-sm text-black-70" aria-live="polite">
        {count} {total > 1 ? "résultats" : "résultat"}
        {trimmedQuery ? ` pour « ${trimmedQuery} »` : null}
      </p>

      <div className="flex items-center rounded border border-black-40 bg-white p-0.5">
        <ViewButton
          label="Affichage en liste"
          active={view === "list"}
          onClick={() => onViewChange("list")}
        >
          <List aria-hidden className="size-5" />
        </ViewButton>
        <ViewButton
          label="Affichage en grille"
          active={view === "grid"}
          onClick={() => onViewChange("grid")}
        >
          <LayoutGrid aria-hidden className="size-5" />
        </ViewButton>
      </div>
    </div>
  );
}

function ViewButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex size-7 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
        active ? "bg-black text-white" : "text-black-60 hover:text-black-90",
      )}
    >
      {children}
    </button>
  );
}
