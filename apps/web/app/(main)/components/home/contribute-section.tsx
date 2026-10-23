import { UploadCloud } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/lib/routes";

export function ContributeSection() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <SectionHeading
          title="Contribuer"
          subtitle="Quelqu'un est à la recherche de votre document. Partagez-le et aidez les autres."
        />

        <div className="mt-8 flex flex-col items-center rounded-2xl bg-surface px-6 py-12 lg:py-24 text-center">
          <span className="flex size-14 items-center justify-center text-primary">
            <UploadCloud aria-hidden className="size-8" />
          </span>
          <ButtonLink href={routes.newDocument} className="mt-5">
            Téléverser un document
          </ButtonLink>
        </div>

        <p className="mt-4 text-xs text-black-50">
          PDF, DOCX, PPTX, images — 20 Mo max.
        </p>
      </Container>
    </section>
  );
}
