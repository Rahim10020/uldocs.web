"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { routes } from "@/lib/routes";
import { CategoryCard, CategoryCardSkeleton } from "./category-card";

/** Les 6 facultés mises en avant sur l'accueil (données officielles). */
const FEATURED_FACULTY_CODES = [
  "FLLA",
  "FDS",
  "FSS",
  "FDD",
  "FASEG",
  "FSHS",
] as const;

export function CategorySection() {
  const { data, isPending, isError } = useAcademicTree();

  const faculties = data
    ? FEATURED_FACULTY_CODES.flatMap((code) => {
        const faculty = data.find((item) => item.code === code);

        return faculty ? [faculty] : [];
      })
    : [];

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <SectionHeading
          title="Catégories populaires"
          subtitle="Explorez par facultés, écoles, instituts…"
        />

        {isPending ? (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from(
              { length: 5 },
              (_, index) => `category-skeleton-${index}`,
            ).map((key) => (
              <CategoryCardSkeleton key={key} />
            ))}
          </div>
        ) : isError ? (
          <p className="mt-8 text-sm text-black-60">
            Impossible de charger les catégories pour le moment.
          </p>
        ) : faculties.length === 0 ? (
          <p className="mt-8 text-sm text-black-60">
            Aucune catégorie disponible pour le moment.
          </p>
        ) : (
          <Carousel ariaLabel="Catégories populaires" className="mt-8">
            {faculties.map((faculty) => (
              <CategoryCard key={faculty.id} faculty={faculty} />
            ))}
          </Carousel>
        )}

        <Link
          href={routes.documents}
          className="mt-6 inline-flex items-center gap-1 text-md font-semibold text-black underline decoration-black-20 underline-offset-4 transition-colors hover:text-primary"
        >
          Voir toutes les facultés, écoles, instituts…
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </Container>
    </section>
  );
}
