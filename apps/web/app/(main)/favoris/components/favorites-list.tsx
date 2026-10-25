"use client";

import { Bookmark } from "lucide-react";
import {
  DocumentCard,
  DocumentCardSkeleton,
} from "@/components/shared/document-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { useFavoriteDocuments } from "@/hooks/use-favorite-documents";
import { routes } from "@/lib/routes";

const FAVORITES_PAGE_SIZE = 50;
const SKELETON_KEYS = Array.from(
  { length: 5 },
  (_, index) => `favorite-skeleton-${index}`,
);

/** Grille des favoris, prête pour le branchement de l'authentification. */
export function FavoritesList() {
  const { data, isPending, isError, refetch } = useFavoriteDocuments(
    1,
    FAVORITES_PAGE_SIZE,
  );

  // Le filtre masque immédiatement une carte retirée des favoris.
  const documents = (data?.data ?? []).filter((document) => document.estFavori);

  if (isError) {
    return (
      <div className="mt-10 rounded-md border border-black-10 bg-surface p-8 text-center">
        <p className="text-sm text-black-70">
          Impossible de charger vos favoris pour le moment.
        </p>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => void refetch()}
        >
          Réessayer
        </Button>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {SKELETON_KEYS.map((key) => (
          <DocumentCardSkeleton key={key} variant="search-grid" />
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-lg text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-surface text-black-40">
          <Bookmark aria-hidden className="size-7" />
        </span>

        <h2 className="mt-5 text-xl font-semibold text-black">
          Aucun favori pour le moment
        </h2>
        <p className="mt-2 text-sm text-black-60">
          Ajoutez des documents à vos favoris depuis la recherche ou une fiche
          document.
        </p>

        <ButtonLink href={routes.documents} className="mt-6">
          Explorer les documents
        </ButtonLink>
      </div>
    );
  }

  const count = documents.length;

  return (
    <div className="mt-8">
      <p className="text-sm text-black-70" aria-live="polite">
        {count} {count > 1 ? "documents sauvegardés" : "document sauvegardé"}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            variant="search-grid"
          />
        ))}
      </div>
    </div>
  );
}
