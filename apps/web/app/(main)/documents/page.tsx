import type { Metadata } from "next";
import { Suspense } from "react";
import { DocumentCardSkeleton } from "@/components/shared/document-card";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentsContent } from "./components/documents-content";

export const metadata: Metadata = {
  title: "Recherche — ulDocs",
  description:
    "Recherchez les cours, examens et devoirs partagés par les étudiants de l'Université de Lomé.",
};

export default function DocumentsPage() {
  return (
    <Suspense fallback={<DocumentsPageSkeleton />}>
      <DocumentsContent />
    </Suspense>
  );
}

function DocumentsPageSkeleton() {
  return (
    <Container className="py-6 lg:py-8">
      <div className="hidden gap-3 lg:flex">
        {Array.from(
          { length: 6 },
          (_, index) => `filter-skeleton-${index}`,
        ).map((key) => (
          <Skeleton key={key} className="h-10 w-36" />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-16" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }, (_, index) => `page-skeleton-${index}`).map(
          (key) => (
            <DocumentCardSkeleton key={key} variant="search-grid" />
          ),
        )}
      </div>
    </Container>
  );
}
