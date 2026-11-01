"use client";

import { FileUp, LockKeyhole } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { withNextPath } from "@/lib/next-path";
import { routes } from "@/lib/routes";
import { NewDocumentForm } from "./new-document-form";

/** Point d'entrée du parcours d'import, avec contrôle de session. */
export function NewDocumentFlow() {
  const { user, isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return <NewDocumentFlowSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return <NewDocumentAuthGate />;
  }

  return <NewDocumentForm user={user} />;
}

function NewDocumentAuthGate() {
  const next = routes.newDocument;

  return (
    <Container className="py-10 sm:py-16">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary-10 text-primary">
          <LockKeyhole aria-hidden className="size-7" />
        </span>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Connecte-toi pour importer
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-black-60 sm:text-base">
          Ton compte permet d&apos;associer les documents à ton profil et de
          suivre leur validation par un modérateur.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink
            href={withNextPath(routes.login, next)}
            className="h-12 sm:h-10"
          >
            Se connecter
          </ButtonLink>
          <ButtonLink
            href={withNextPath(routes.register, next)}
            variant="secondary"
            className="h-12 sm:h-10"
          >
            Créer un compte
          </ButtonLink>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 text-xs text-black-50">
          <FileUp aria-hidden className="size-4" />
          PDF, DOCX, PPTX, JPG ou PNG · 20 Mo max
        </p>
      </div>
    </Container>
  );
}

function NewDocumentFlowSkeleton() {
  return (
    <Container className="py-8 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-10 w-2/3" />
        <Skeleton className="mt-3 h-4 w-full max-w-xl" />
        <Skeleton className="mt-8 h-2 w-full" />
        <Skeleton className="mt-8 h-72 w-full" />
      </div>
    </Container>
  );
}
