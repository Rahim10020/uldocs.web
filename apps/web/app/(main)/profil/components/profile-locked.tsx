import { LockKeyhole } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { withNextPath } from "@/lib/next-path";
import { routes } from "@/lib/routes";

/** Invitation à se connecter pour accéder à l'espace profil. */
export function ProfileLocked({
  nextPath = routes.profile,
}: {
  nextPath?: string;
}) {
  return (
    <div className="mx-auto mt-10 max-w-lg p-8 text-center sm:p-12">
      <span className="mx-auto flex size-14 items-center justify-center text-black">
        <LockKeyhole aria-hidden className="size-7" />
      </span>
      <h2 className="mt-5 text-xl font-semibold text-black">
        Connecte-toi pour accéder à ton profil
      </h2>
      <p className="mt-2 text-sm text-black-60">
        Retrouve tes documents, tes enregistrés et tes informations académiques.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink
          href={withNextPath(routes.login, nextPath)}
          className="w-full sm:w-auto"
        >
          Se connecter
        </ButtonLink>
        <ButtonLink
          href={withNextPath(routes.register, nextPath)}
          variant="secondary"
          className="w-full sm:w-auto"
        >
          Créer un compte
        </ButtonLink>
      </div>
    </div>
  );
}
