import { LockKeyhole, ShieldAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { withNextPath } from "@/lib/next-path";
import { routes } from "@/lib/routes";

/** Écran d'accès réservé aux administrateurs. */
export function AdminAccess({ authenticated }: { authenticated: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-xl lg:max-w-2xl p-8 text-center sm:p-12">
        <span className="mx-auto flex size-14 items-center justify-center text-black">
          {authenticated ? (
            <ShieldAlert aria-hidden className="size-10" />
          ) : (
            <LockKeyhole aria-hidden className="size-10" />
          )}
        </span>
        <h1 className="mt-5 text-2xl lg:text-4xl font-semibold text-black">
          {authenticated
            ? "Accès réservé aux administrateurs"
            : "Connecte-toi pour accéder à l'administration"}
        </h1>
        <p className="mt-2 text-lg lg:text-xl text-black-60">
          {authenticated
            ? "Cet espace est réservé à l'équipe d'administration d'ulDocs."
            : "Le tableau de bord, la modération et les outils de gestion sont réservés aux administrateurs."}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {authenticated ? null : (
            <ButtonLink
              href={withNextPath(routes.login, routes.admin)}
              className="w-full sm:w-auto"
            >
              Se connecter
            </ButtonLink>
          )}
          <ButtonLink
            href={routes.home}
            variant={authenticated ? "primary" : "secondary"}
            className="w-full sm:w-auto"
          >
            Retour à l'accueil
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
