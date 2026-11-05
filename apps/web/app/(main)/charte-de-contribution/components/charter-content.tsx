import { AlertTriangle, ArrowRight, Flag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

const COMMITMENTS = [
  "Ne pas publier de contenu illégal, haineux ou à caractère sexuel explicite.",
  "Ne pas publier de documents dont tu ne détiens pas les droits.",
  "Ne pas publier de données personnelles appartenant à d'autres personnes.",
  "Respecter les droits de propriété intellectuelle des enseignants, des étudiants et des institutions.",
  "Signaler tout contenu problématique à l'équipe de modération.",
  "Ne pas utiliser la plateforme à des fins commerciales sans autorisation.",
] as const;

const SANCTIONS = [
  "Avertissement",
  "Suspension temporaire",
  "Exclusion définitive",
] as const;

/** Contenu statique de la charte de contribution. */
export function CharterContent() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <header>
        <h1 className="text-4xl font-bold text-black sm:text-5xl">
          Charte de contribution
        </h1>
        <p className="mt-4 text-base leading-relaxed text-black-70 sm:text-lg">
          En utilisant ulDocs, tu t&apos;engages à respecter les règles
          suivantes pour garder une plateforme utile, sûre et respectueuse.
        </p>
      </header>

      <section aria-labelledby="charter-commitments-title" className="mt-10">
        <h2
          id="charter-commitments-title"
          className="text-xl font-semibold text-black"
        >
          Tes engagements
        </h2>

        <ol className="mt-5 list-none space-y-2">
          {COMMITMENTS.map((commitment, index) => (
            <li key={commitment} className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black-5 text-lg font-semibold text-black">
                {index + 1}
              </span>
              <p className="pt-1 text-lg leading-relaxed text-black-70">
                {commitment}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="charter-sanctions-title"
        className="mt-10 rounded-md bg-black-5 p-5 sm:p-6"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle aria-hidden className="size-5 text-error" />
          <h2
            id="charter-sanctions-title"
            className="text-xl font-semibold text-black"
          >
            En cas de manquement
          </h2>
        </div>
        <p className="mt-2 text-lg text-black-60">
          La sanction dépend de la gravité du manquement :
        </p>
        <ul className="mt-3 list-none space-y-2">
          {SANCTIONS.map((sanction) => (
            <li
              key={sanction}
              className="flex items-center gap-2 text-lg text-black-70"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-error" />
              {sanction}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-col gap-5 border-t border-black-10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-black-50">
          Dernière mise à jour : novembre 2026
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={routes.newDocument} className="w-full sm:w-auto">
            Commencer à contribuer
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <ButtonLink
            href={routes.report}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            <Flag aria-hidden className="size-4" />
            Signaler un problème
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
