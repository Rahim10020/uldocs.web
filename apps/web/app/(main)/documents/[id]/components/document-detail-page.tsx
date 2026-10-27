"use client";

import { FileQuestion, RefreshCw } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocument } from "@/hooks/use-document";
import { useShareDocument } from "@/hooks/use-share-document";
import { useSimilarDocuments } from "@/hooks/use-similar-documents";
import { ApiError } from "@/lib/api/client";
import { documentPageCount } from "@/lib/document-detail";
import { routes } from "@/lib/routes";
import { DocumentActionBar } from "./document-action-bar";
import { DocumentMobileBar } from "./document-mobile-bar";
import { DocumentOptionsSheet } from "./document-options-sheet";
import { DocumentPreview } from "./document-preview";
import { DocumentTop } from "./document-top";
import { SimilarDocuments } from "./similar-documents";

const SIMILAR_SKELETON_KEYS = [
  "similar-1",
  "similar-2",
  "similar-3",
  "similar-4",
] as const;

export function DocumentDetailPage({ documentId }: { documentId: number }) {
  const query = useDocument(documentId);
  const similar = useSimilarDocuments(query.data);
  const share = useShareDocument(query.data?.titre ?? "Document ulDocs");
  const [pdfPageCount, setPdfPageCount] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const closeOptions = useCallback(() => setOptionsOpen(false), []);

  if (query.isPending) {
    return <DocumentDetailSkeleton />;
  }

  if (query.isError || !query.data) {
    return (
      <DocumentDetailError
        error={query.error}
        onRetry={() => void query.refetch()}
      />
    );
  }

  const doc = query.data;
  const pageCount = documentPageCount(doc, pdfPageCount);

  return (
    <>
      <Container fluid className="pb-24 pt-5 sm:pt-6 lg:pb-8 lg:pt-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <DocumentTop document={doc} pageCount={pageCount} />

            <DocumentActionBar
              document={doc}
              onShare={share.share}
              onFullscreen={() => setFullscreen(true)}
              isCopied={share.isCopied}
              className="mt-4"
            />

            <div ref={sentinelRef} aria-hidden className="h-px w-full" />

            <div className="mt-4">
              <DocumentPreview
                document={doc}
                fullscreen={fullscreen}
                onFullscreenChange={setFullscreen}
                onPageCountChange={setPdfPageCount}
              />
            </div>
          </div>

          <SimilarDocuments
            documents={similar.documents}
            isPending={similar.isPending}
            isError={similar.isError}
          />
        </div>
      </Container>

      <DocumentMobileBar
        document={doc}
        sentinelRef={sentinelRef}
        onShare={share.share}
        onMore={() => setOptionsOpen(true)}
        isCopied={share.isCopied}
        alwaysVisible={fullscreen}
      />

      <DocumentOptionsSheet
        open={optionsOpen}
        onClose={closeOptions}
        document={doc}
        onShare={share.share}
        isCopied={share.isCopied}
      />
    </>
  );
}

function DocumentDetailSkeleton() {
  return (
    <Container fluid className="pb-24 pt-5 sm:pt-6 lg:pb-8 lg:pt-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <Skeleton className="hidden h-3 w-2/3 lg:block" />

          <div className="mt-3 flex flex-col lg:mt-4">
            <Skeleton className="order-1 h-4 w-52 lg:order-2 lg:mt-3" />
            <Skeleton className="order-2 mt-3 h-8 w-4/5 lg:order-1 lg:mt-0" />
            <Skeleton className="order-3 mt-2 h-3 w-60" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="h-10 w-36" />
            <div className="ml-auto flex gap-1">
              <Skeleton className="size-10" />
              <Skeleton className="size-10" />
              <Skeleton className="size-10" />
            </div>
          </div>

          <div className="mt-4 rounded-md border border-black-10 bg-surface p-3 sm:p-4 lg:p-6">
            <div className="flex items-start gap-3">
              <Skeleton className="hidden h-80 w-12 shrink-0 lg:block" />
              <Skeleton className="mx-auto aspect-[612/792] w-full max-w-[900px] rounded-sm" />
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Skeleton className="h-5 w-40" />
          <div className="mt-4 flex flex-col gap-4">
            {SIMILAR_SKELETON_KEYS.map((key) => (
              <div key={key} className="flex gap-3">
                <Skeleton className="h-24 w-[78px] shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

function DocumentDetailError({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry: () => void;
}) {
  const notFound = error instanceof ApiError && error.status === 404;

  return (
    <Container className="py-20">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <FileQuestion aria-hidden className="size-10 text-black-30" />
        <h1 className="mt-4 text-2xl font-bold text-black">
          {notFound
            ? "Document introuvable"
            : "Impossible de charger le document"}
        </h1>
        <p className="mt-2 text-sm text-black-60">
          {notFound
            ? "Ce document n'existe pas ou a été retiré de la plateforme."
            : "Une erreur est survenue pendant le chargement. Réessaie dans un instant."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <ButtonLink href={routes.documents}>
            Parcourir les documents
          </ButtonLink>
          {notFound ? null : (
            <Button type="button" variant="secondary" onClick={onRetry}>
              <RefreshCw aria-hidden className="size-4" />
              Réessayer
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
