"use client";

import { Bookmark } from "lucide-react";
import { useFavoriteDocument } from "@/hooks/use-favorite-document";
import { cn } from "@/lib/utils";

export function DocumentFavoriteRow({
  documentId,
  estFavori,
}: {
  documentId: number;
  estFavori: boolean;
}) {
  const mutation = useFavoriteDocument();
  const label = estFavori ? "Retirer des favoris" : "Enregistrer";

  return (
    <button
      type="button"
      aria-pressed={estFavori}
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id: documentId, estFavori: !estFavori })}
      className="flex w-full items-center gap-3 px-4 py-3 text-left text-md font-medium text-black transition-colors hover:bg-black-5 focus-visible:bg-black-5 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
    >
      <Bookmark
        aria-hidden
        className={cn("size-5", estFavori && "fill-current text-primary")}
      />
      <span>{label}</span>
      {estFavori ? (
        <span className="ml-auto text-xs font-medium text-primary">
          Enregistré
        </span>
      ) : null}
    </button>
  );
}
