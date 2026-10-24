"use client";

import { useMemo } from "react";
import type { DocumentListItem, DocumentSearchParams } from "shared";
import { CategorySection } from "@/components/shared/category-section";
import {
  DocumentCard,
  DocumentCardSkeleton,
} from "@/components/shared/document-card";
import { DocumentSection } from "@/components/shared/document-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocuments } from "@/hooks/use-documents";
import {
  DOCUMENTS_PAGE_SIZE,
  type SearchView,
  useDocumentsSearch,
} from "@/hooks/use-documents-search";
import { EmptyResults } from "./empty-results";
import { SearchFilters } from "./search-filters";
import { SearchPagination } from "./search-pagination";
import { SearchResultsHeader } from "./search-results-header";

export function DocumentsContent() {
  const search = useDocumentsSearch();
  const { state } = search;

  const params = useMemo<DocumentSearchParams>(
    () => ({
      q: state.q.trim() || undefined,
      faculteId: state.faculteId,
      filiereId: state.filiereId,
      niveau: state.niveau,
      semestre: state.semestre,
      ueId: state.ueId,
      type: state.type,
      anneeAcademique: state.anneeAcademique,
      tri: search.effectiveTri,
      page: state.page,
      pageSize: DOCUMENTS_PAGE_SIZE,
    }),
    [search.effectiveTri, state],
  );

  const { data, isPending, isError, refetch } = useDocuments(params);

  const documents = data?.data ?? [];
  const total = data?.total ?? 0;
  const isEmpty = !isPending && !isError && total === 0;

  return (
    <div>
      <Container className="py-6 lg:py-8">
        <h1 className="sr-only">Recherche de documents</h1>

        <SearchFilters search={search} />

        {isError ? (
          <ErrorState onRetry={() => void refetch()} />
        ) : isPending ? (
          <ResultsSkeleton view={state.view} />
        ) : isEmpty ? (
          <EmptyResults
            query={state.q}
            hasFilters={search.hasFilters}
            onSuggestion={search.setQuery}
            onResetFilters={search.resetFilters}
          />
        ) : (
          <>
            <SearchResultsHeader
              total={total}
              query={state.q}
              view={state.view}
              onViewChange={search.setView}
            />

            <Results documents={documents} view={state.view} />

            <SearchPagination
              page={state.page}
              total={total}
              pageSize={DOCUMENTS_PAGE_SIZE}
              onPageChange={search.setPage}
            />
          </>
        )}
      </Container>

      {isEmpty ? (
        <>
          <CategorySection />
          <DocumentSection
            title="Les plus téléchargés"
            subtitle="Les documents que les étudiants consultent le plus"
            tri="populaire"
          />
        </>
      ) : null}
    </div>
  );
}

function Results({
  documents,
  view,
}: {
  documents: DocumentListItem[];
  view: SearchView;
}) {
  if (view === "list") {
    return (
      <div className="mt-6 space-y-4">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            variant="search-list"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          variant="search-grid"
        />
      ))}
    </div>
  );
}

function ResultsSkeleton({ view }: { view: SearchView }) {
  return (
    <div>
      <div className="mt-8 flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-16" />
      </div>

      {view === "list" ? (
        <div className="mt-6 space-y-4">
          {Array.from(
            { length: 5 },
            (_, index) => `list-skeleton-${index}`,
          ).map((key) => (
            <DocumentCardSkeleton key={key} variant="search-list" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from(
            { length: 10 },
            (_, index) => `grid-skeleton-${index}`,
          ).map((key) => (
            <DocumentCardSkeleton key={key} variant="search-grid" />
          ))}
        </div>
      )}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mt-12 rounded-md border border-black-10 bg-surface p-8 text-center">
      <p className="text-sm text-black-70">
        Impossible de charger les résultats pour le moment.
      </p>
      <Button variant="secondary" className="mt-4" onClick={onRetry}>
        Réessayer
      </Button>
    </div>
  );
}
