"use client";

import { Bookmark } from "lucide-react";
import { useFavoriteDocument } from "@/hooks/use-favorite-document";
import { cn } from "@/lib/utils";

/** Bouton favori autonome : gère l'appel API et l'état optimiste. */
export function FavoriteButton({
  documentId,
  estFavori,
  className,
}: {
  documentId: number;
  estFavori: boolean;
  className?: string;
}) {
  const mutation = useFavoriteDocument();
  const label = estFavori ? "Retirer des favoris" : "Ajouter aux favoris";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={estFavori}
      title={label}
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id: documentId, estFavori: !estFavori })}
      className={cn(
        "flex size-8 cursor-pointer items-center justify-center rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-wait disabled:opacity-60",
        estFavori ? "text-primary" : "text-black-60 hover:text-black-90",
        className,
      )}
    >
      <Bookmark
        aria-hidden
        className={cn("size-5", estFavori && "fill-current")}
      />
    </button>
  );
}
