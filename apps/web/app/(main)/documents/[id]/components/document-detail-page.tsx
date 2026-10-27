"use client";

import { FileQuestion, RefreshCw } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useDocument } from "@/hooks/use-document";
import { useShareDocument } from "@/hooks/use-share-document";
import { useSimilarDocuments } from "@/hooks/use-similar-documents";
import { ApiError } from "@/lib/api/client";
import { documentPageCount } from "@/lib/document-detail";
import { routes } from "@/lib/routes";
import { DocumentActionBar } from "./document-action-bar";
import { DocumentDetailSkeleton } from "./document-detail-skeleton";
import { DocumentMobileBar } from "./document-mobile-bar";
import { DocumentOptionsSheet } from "./document-options-sheet";
import { DocumentPreview } from "./document-preview";
import { DocumentTop } from "./document-top";
import { SimilarDocuments } from "./similar-documents";

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
      <Container fluid className="pb-24 pt-5 sm:pt-6 lg:pb-8 lg:pt-4">
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
