"use client";

import {
  AcademicNotFound,
  ErrorPanel,
} from "@/components/shared/academic-feedback";
import {
  AcademicPageHeader,
  AcademicPageHeaderSkeleton,
} from "@/components/shared/academic-page-header";
import {
  DocumentResults,
  DocumentResultsSkeleton,
} from "@/components/shared/document-results";
import { SearchPagination } from "@/components/shared/search-pagination";
import { SearchResultsHeader } from "@/components/shared/search-results-header";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { useUeDocuments } from "@/hooks/use-ue-documents";
import { getUeDescription } from "@/lib/academic-content";
import { findUe } from "@/lib/academic-navigation";
import { DOCUMENTS_PAGE_SIZE } from "@/lib/document-search";
import { routes } from "@/lib/routes";
import { UeDocumentsEmpty } from "./ue-documents-empty";
import { UeFilters } from "./ue-filters";

export function UeDocumentsContent({ ueId }: { ueId: number }) {
  const tree = useAcademicTree();
  const context = tree.data ? findUe(tree.data, ueId) : undefined;
  const search = useUeDocuments(ueId);

  if (tree.isPending) {
    return <UeDocumentsSkeleton />;
  }

  if (tree.isError) {
    return (
      <Container className="max-w-5xl py-8 sm:py-10">
        <ErrorPanel
          message="Impossible de charger les informations de cette UE."
          onRetry={() => void tree.refetch()}
        />
      </Container>
    );
  }

  if (!context) {
    return (
      <Container className="max-w-5xl py-8 sm:py-10">
        <AcademicNotFound
          title="UE introuvable"
          message="Cette unité d'enseignement n'existe pas ou n'est plus disponible."
          href={routes.categories}
          linkLabel="Voir toutes les catégories"
        />
      </Container>
    );
  }

  const { faculte, filiere, ue } = context;
  const { data, isPending, isError, refetch } = search.query;
  const documents = data?.data ?? [];
  const total = data?.total ?? 0;
  const isEmpty = !isPending && !isError && total === 0;
  const showFilters = !isEmpty || search.hasFilters;

  return (
    <Container className="max-w-5xl py-8 sm:py-10">
      <AcademicPageHeader
        breadcrumb={[
          { label: faculte.nom, href: routes.categorie(faculte.id) },
          { label: filiere.nom, href: routes.filiere(filiere.id) },
          { label: ue.nom },
        ]}
        title={ue.nom}
        description={getUeDescription(ue.nom)}
      />

      {showFilters ? (
        <div className="mt-10">
          <UeFilters search={search} />
        </div>
      ) : null}

      {isError ? (
        <ErrorPanel
          message="Impossible de charger les documents de cette UE."
          onRetry={() => void refetch()}
        />
      ) : isPending ? (
        <DocumentResultsSkeleton view={search.state.view} />
      ) : isEmpty ? (
        <UeDocumentsEmpty
          hasFilters={search.hasFilters}
          onReset={search.resetFilters}
        />
      ) : (
        <>
          <SearchResultsHeader
            total={total}
            query=""
            view={search.state.view}
            onViewChange={search.setView}
            itemLabel="document"
          />

          <DocumentResults
            documents={documents}
            view={search.state.view}
            showAcademicContext={false}
          />

          <SearchPagination
            page={search.state.page}
            total={total}
            pageSize={DOCUMENTS_PAGE_SIZE}
            onPageChange={search.setPage}
          />
        </>
      )}
    </Container>
  );
}

export function UeDocumentsSkeleton() {
  return (
    <Container className="max-w-5xl py-8 sm:py-10">
      <AcademicPageHeaderSkeleton />

      <div className="mt-10 hidden flex-wrap items-center gap-3 lg:flex">
        <Skeleton className="h-10 w-44" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="mt-10 flex gap-2 lg:hidden">
        <Skeleton className="size-10 shrink-0 rounded" />
        <Skeleton className="h-10 w-16 shrink-0 rounded-full" />
        <Skeleton className="h-10 w-24 shrink-0 rounded-full" />
        <Skeleton className="h-10 w-20 shrink-0 rounded-full" />
      </div>

      <DocumentResultsSkeleton view="grid" />
    </Container>
  );
}
