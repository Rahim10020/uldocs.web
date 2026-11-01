"use client";

import { Bookmark } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useSession } from "@/hooks/use-session";
import { routes } from "@/lib/routes";
import { FavoritesList } from "./favorites-list";

export function FavoritesContent() {
  const { isAuthenticated, isLoading } = useSession();

  return (
    <Container className="py-8 sm:py-12">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
          Enregistrés
        </h1>
        <p className="mt-2 text-sm text-black-60 sm:text-base">
          Retrouve les documents que tu as enregistrés.
        </p>
      </div>

      {isLoading ? (
        <FavoritesLoading />
      ) : isAuthenticated ? (
        <FavoritesList />
      ) : (
        <FavoritesLocked />
      )}
    </Container>
  );
}

function FavoritesLoading() {
  return (
    <div
      role="status"
      aria-label="Chargement des documents enregistrés"
      className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array.from({ length: 5 }, (_, index) => `favorite-loading-${index}`).map(
        (key) => (
          <div key={key} className="h-56 animate-pulse rounded-md bg-black-5" />
        ),
      )}
    </div>
  );
}

function FavoritesLocked() {
  return (
    <div className="mx-auto mt-10 max-w-lg rounded-md border border-black-10 bg-surface p-8 text-center sm:p-12">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-black-40">
        <Bookmark aria-hidden className="size-7" />
      </span>

      <h2 className="mt-5 text-xl font-semibold text-black">
        Connecte-toi pour retrouver tes documents enregistrés
      </h2>
      <p className="mt-2 text-sm text-black-60">
        Les documents que tu enregistres sont liés à ton compte. Connecte-toi
        pour les retrouver sur tous tes appareils.
      </p>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href={routes.login} className="w-full sm:w-auto">
          Se connecter
        </ButtonLink>
        <ButtonLink
          href={routes.documents}
          variant="secondary"
          className="w-full sm:w-auto"
        >
          Explorer les documents
        </ButtonLink>
      </div>
    </div>
  );
}
