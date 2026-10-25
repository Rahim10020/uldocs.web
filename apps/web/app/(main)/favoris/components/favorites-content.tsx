"use client";

import { Bookmark } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";
import { FavoritesList } from "./favorites-list";

/**
 * TODO(auth): remplacer par l'état de session réel.
 * Tant que l'authentification n'est pas branchée, la page reste verrouillée.
 */
const IS_AUTHENTICATED = false;

export function FavoritesContent() {
  return (
    <Container className="py-8 sm:py-12">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
          Mes favoris
        </h1>
        <p className="mt-2 text-sm text-black-60 sm:text-base">
          Retrouvez les documents que vous avez sauvegardés.
        </p>
      </div>

      {IS_AUTHENTICATED ? <FavoritesList /> : <FavoritesLocked />}
    </Container>
  );
}

function FavoritesLocked() {
  return (
    <div className="mx-auto mt-10 max-w-lg rounded-md border border-black-10 bg-surface p-8 text-center sm:p-12">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-black-40">
        <Bookmark aria-hidden className="size-7" />
      </span>

      <h2 className="mt-5 text-xl font-semibold text-black">
        Connectez-vous pour retrouver vos favoris
      </h2>
      <p className="mt-2 text-sm text-black-60">
        Les documents que vous sauvegardez sont liés à votre compte.
        Connectez-vous pour les retrouver sur tous vos appareils.
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
