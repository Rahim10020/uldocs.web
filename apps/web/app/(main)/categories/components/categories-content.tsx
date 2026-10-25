"use client";

import {
  CategoryCard,
  CategoryCardSkeleton,
} from "@/components/shared/category-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAcademicTree } from "@/hooks/use-academic-tree";

const SKELETON_KEYS = Array.from(
  { length: 8 },
  (_, index) => `category-skeleton-${index}`,
);

export function CategoriesContent() {
  const { data, isPending, isError, refetch } = useAcademicTree();
  const categories = data ?? [];

  return (
    <Container className="py-8 sm:py-12">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
          Toutes les catégories
        </h1>
        <p className="mt-2 text-sm text-black-60 sm:text-base">
          Explorez par facultés, écoles et instituts de l'Université de Lomé.
        </p>
      </div>

      {isError ? (
        <div className="mt-10 rounded-md border border-black-10 bg-surface p-8 text-center">
          <p className="text-sm text-black-70">
            Impossible de charger les catégories pour le moment.
          </p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => void refetch()}
          >
            Réessayer
          </Button>
        </div>
      ) : isPending ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {SKELETON_KEYS.map((key) => (
            <CategoryCardSkeleton key={key} />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p className="mt-8 text-sm text-black-60">
          Aucune catégorie disponible pour le moment.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} faculty={category} />
          ))}
        </div>
      )}
    </Container>
  );
}
