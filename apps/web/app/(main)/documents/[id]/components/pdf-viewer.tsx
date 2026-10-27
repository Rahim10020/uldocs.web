"use client";

import {
  ChevronLeft,
  ChevronRight,
  FileWarning,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { DocumentDetail } from "shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { canPreviewDocument, clampPage } from "@/lib/document-detail";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { DocumentDownloadButton } from "./document-download-button";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const ZOOM_LEVELS = [0.75, 1, 1.25, 1.5, 2] as const;

type ZoomLevel = (typeof ZOOM_LEVELS)[number];

const PAGE_WIDTH_CLASS: Record<ZoomLevel, string> = {
  0.75: "w-full max-w-[675px]",
  1: "w-full max-w-[900px]",
  1.25: "w-[1125px] max-w-none",
  1.5: "w-[1350px] max-w-none",
  2: "w-[1800px] max-w-none",
};

const PAGE_ASPECT_CLASS = "aspect-[612/792]";

function pageElementId(documentId: number, pageNumber: number): string {
  return `document-${documentId}-page-${pageNumber}`;
}

export function PdfViewer({
  document: doc,
  fullscreen,
  onFullscreenChange,
  onPageCountChange,
}: {
  document: DocumentDetail;
  fullscreen: boolean;
  onFullscreenChange: (fullscreen: boolean) => void;
  onPageCountChange?: (numPages: number | null) => void;
}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState<ZoomLevel>(1);
  const [pageWidth, setPageWidth] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [scrollRoot, setScrollRoot] = useState<Element | null>(null);
  const [pageColumnElement, setPageColumnElement] =
    useState<HTMLDivElement | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const canPreview = canPreviewDocument(doc);

  useBodyScrollLock(fullscreen);

  useEffect(() => {
    setScrollRoot(fullscreen ? scrollRef.current : null);
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen) {
      return;
    }

    const previousFocus = globalThis.document
      .activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onFullscreenChange(false);
      }
    }

    globalThis.document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      globalThis.document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [fullscreen, onFullscreenChange]);

  // Mesure la largeur réelle de la colonne pour dimensionner les pages.
  useEffect(() => {
    if (!pageColumnElement) {
      return;
    }

    function updateWidth() {
      if (pageColumnElement) {
        setPageWidth(
          Math.round(pageColumnElement.getBoundingClientRect().width),
        );
      }
    }

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(pageColumnElement);

    return () => observer.disconnect();
  }, [pageColumnElement]);

  const handleLoadSuccess = useCallback(
    ({ numPages: total }: { numPages: number }) => {
      setNumPages(total);
      setPage((current) => clampPage(current, total));
      setLoadError(false);
      onPageCountChange?.(total);
    },
    [onPageCountChange],
  );

  const scrollToPage = useCallback(
    (nextPage: number) => {
      if (!numPages) {
        return;
      }

      const target = clampPage(nextPage, numPages);
      setPage(target);

      const element = globalThis.document.getElementById(
        pageElementId(doc.id, target),
      );

      if (!element) {
        return;
      }

      if (fullscreen && scrollRef.current) {
        const scroller = scrollRef.current;
        const top =
          element.getBoundingClientRect().top -
          scroller.getBoundingClientRect().top +
          scroller.scrollTop -
          72;

        scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        return;
      }

      const top = window.scrollY + element.getBoundingClientRect().top - 128;

      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    },
    [doc.id, fullscreen, numPages],
  );

  function changeZoom(direction: 1 | -1) {
    setZoom((current) => {
      const index = ZOOM_LEVELS.indexOf(current);
      const nextIndex = Math.min(
        ZOOM_LEVELS.length - 1,
        Math.max(0, index + direction),
      );

      return ZOOM_LEVELS[nextIndex] ?? current;
    });
  }

  function retry() {
    setLoadError(false);
    setNumPages(null);
    setPage(1);
    setPageWidth(0);
    setRetryKey((current) => current + 1);
    onPageCountChange?.(null);
  }

  if (!canPreview || loadError) {
    return (
      <div
        className={cn(
          fullscreen
            ? "fixed inset-0 z-60 flex h-dvh flex-col overflow-hidden bg-white"
            : "rounded-md border border-black-10 bg-surface",
        )}
      >
        {fullscreen ? (
          <FullscreenHeader
            document={doc}
            page={page}
            numPages={numPages}
            onPageChange={scrollToPage}
            onClose={() => onFullscreenChange(false)}
            closeRef={closeRef}
          />
        ) : null}

        <PreviewFallback
          document={doc}
          fullscreen={fullscreen}
          onRetry={loadError ? retry : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        fullscreen
          ? "fixed inset-0 z-60 flex h-dvh flex-col overflow-hidden bg-white"
          : "rounded-md border border-black-10 bg-surface p-3 sm:p-4 lg:p-6",
      )}
    >
      {fullscreen ? (
        <FullscreenHeader
          document={doc}
          page={page}
          numPages={numPages}
          onPageChange={scrollToPage}
          onClose={() => onFullscreenChange(false)}
          closeRef={closeRef}
        />
      ) : null}

      <div key="viewer-body" className="flex min-h-0 flex-1 items-stretch">
        <PageRail
          numPages={numPages}
          currentPage={page}
          onPageChange={scrollToPage}
          zoom={zoom}
          onZoomIn={() => changeZoom(1)}
          onZoomOut={() => changeZoom(-1)}
          className={cn(
            "hidden shrink-0 lg:flex",
            fullscreen
              ? "ml-3 h-full max-h-full w-14 rounded-none border-0 border-r border-black-10 p-2"
              : "sticky top-30 max-h-[calc(100dvh-8rem)] w-12 self-start",
          )}
        />

        <div
          ref={scrollRef}
          className={cn(
            "min-w-0 flex-1",
            fullscreen
              ? "min-h-0 overflow-auto bg-surface p-3 pb-24 sm:p-4 lg:pb-6"
              : "overflow-x-auto",
          )}
        >
          <div
            ref={setPageColumnElement}
            className={cn(
              "mx-auto flex w-full flex-col gap-3 sm:gap-4",
              PAGE_WIDTH_CLASS[zoom],
            )}
          >
            <Document
              key={`${doc.id}-${retryKey}`}
              file={doc.fichierUrl}
              onLoadSuccess={handleLoadSuccess}
              onLoadError={() => setLoadError(true)}
              loading={<PdfPageSkeleton />}
              className="flex w-full flex-col gap-3 sm:gap-4"
            >
              {numPages && pageWidth > 0 ? (
                Array.from({ length: numPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <PdfPage
                      key={pageNumber}
                      documentId={doc.id}
                      pageNumber={pageNumber}
                      width={pageWidth}
                      scrollRoot={scrollRoot}
                      onActive={setPage}
                    />
                  ),
                )
              ) : (
                <PdfPageSkeleton />
              )}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}

function PdfPage({
  documentId,
  pageNumber,
  width,
  scrollRoot,
  onActive,
}: {
  documentId: number;
  pageNumber: number;
  width: number;
  scrollRoot: Element | null;
  onActive: (page: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  // Ne monte le canvas que pour les pages proches du viewport.
  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShouldRender(entry.isIntersecting),
      {
        root: scrollRoot,
        rootMargin: "1800px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [scrollRoot]);

  // Détecte la page au centre de l'écran pour la navigation.
  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActive(pageNumber);
        }
      },
      {
        root: scrollRoot,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [scrollRoot, pageNumber, onActive]);

  return (
    <div
      ref={containerRef}
      id={pageElementId(documentId, pageNumber)}
      className="w-full scroll-mt-32"
      data-page={pageNumber}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden border border-black-10 bg-white shadow-sm",
          PAGE_ASPECT_CLASS,
        )}
      >
        {shouldRender ? (
          <Page
            pageNumber={pageNumber}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={<PdfPageSkeleton inner />}
            className="!w-full"
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-black-5" />
        )}
      </div>
    </div>
  );
}

function PageRail({
  numPages,
  currentPage,
  onPageChange,
  zoom,
  onZoomIn,
  onZoomOut,
  className,
}: {
  numPages: number | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  zoom: ZoomLevel;
  onZoomIn: () => void;
  onZoomOut: () => void;
  className?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const firstZoom = ZOOM_LEVELS[0];
  const lastZoom = ZOOM_LEVELS[ZOOM_LEVELS.length - 1];

  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>(
      `[data-page="${currentPage}"]`,
    );

    if (!list || !active) {
      return;
    }

    const top = active.offsetTop;
    const bottom = top + active.offsetHeight;

    if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) {
      list.scrollTo({
        top: top - list.clientHeight / 2 + active.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  return (
    <nav
      aria-label="Navigation dans l'aperçu"
      className={cn(
        "flex flex-col rounded-md border border-black-10 bg-white p-1.5",
        className,
      )}
    >
      <div className="flex shrink-0 flex-col gap-1 border-b border-black-10 pb-1.5">
        <button
          type="button"
          onClick={onZoomIn}
          disabled={zoom === lastZoom}
          aria-label="Agrandir la page"
          title="Agrandir"
          className="flex size-8 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ZoomIn aria-hidden className="size-4" />
        </button>
        <button
          type="button"
          onClick={onZoomOut}
          disabled={zoom === firstZoom}
          aria-label="Réduire la page"
          title="Réduire"
          className="flex size-8 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ZoomOut aria-hidden className="size-4" />
        </button>
      </div>

      <div
        ref={listRef}
        className="relative mt-1.5 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-0.5"
      >
        {numPages ? (
          Array.from({ length: numPages }, (_, index) => index + 1).map(
            (pageNumber) => {
              const active = pageNumber === currentPage;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  data-page={pageNumber}
                  aria-label={`Aller à la page ${pageNumber}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => onPageChange(pageNumber)}
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
                    active
                      ? "bg-primary text-white"
                      : "text-black-60 hover:bg-black-5 hover:text-black",
                  )}
                >
                  {pageNumber}
                </button>
              );
            },
          )
        ) : (
          <PageRailSkeleton />
        )}
      </div>
    </nav>
  );
}

const RAIL_SKELETON_KEYS = [
  "rail-1",
  "rail-2",
  "rail-3",
  "rail-4",
  "rail-5",
  "rail-6",
  "rail-7",
  "rail-8",
] as const;

function PageRailSkeleton() {
  return (
    <div aria-hidden className="flex flex-col items-center gap-1">
      {RAIL_SKELETON_KEYS.map((key) => (
        <Skeleton key={key} className="size-8 rounded" />
      ))}
    </div>
  );
}

function FullscreenHeader({
  document: doc,
  page,
  numPages,
  onPageChange,
  onClose,
  closeRef,
}: {
  document: DocumentDetail;
  page: number;
  numPages: number | null;
  onPageChange: (page: number) => void;
  onClose: () => void;
  closeRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-black-10 bg-white px-3 sm:px-5">
      <Link
        href={routes.home}
        aria-label="ulDocs — Accueil"
        className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
      >
        <Image
          src="/logo.svg"
          alt="ulDocs"
          width={92}
          height={25}
          unoptimized
          className="h-4 w-auto"
        />
      </Link>

      <span className="hidden min-w-0 truncate text-sm text-black-60 sm:block">
        {doc.titre}
      </span>

      <div className="ml-auto flex items-center gap-2">
        <PagePicker
          page={page}
          numPages={numPages}
          onPageChange={onPageChange}
        />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer l'aperçu plein écran"
          title="Fermer"
          className="flex size-9 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
    </header>
  );
}

function PagePicker({
  page,
  numPages,
  onPageChange,
}: {
  page: number;
  numPages: number | null;
  onPageChange: (page: number) => void;
}) {
  const [value, setValue] = useState(String(page));

  useEffect(() => {
    setValue(String(page));
  }, [page]);

  if (!numPages) {
    return (
      <span className="text-sm text-black-60" aria-live="polite">
        Chargement…
      </span>
    );
  }

  const total = numPages;

  function commit() {
    const parsed = Number.parseInt(value, 10);

    if (Number.isFinite(parsed)) {
      onPageChange(clampPage(parsed, total));
      return;
    }

    setValue(String(page));
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Page précédente"
        className="flex size-8 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft aria-hidden className="size-4" />
      </button>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          commit();
        }}
        className="flex items-center gap-1 text-black-60"
      >
        <input
          value={value}
          onChange={(event) => setValue(event.target.value.replace(/\D/g, ""))}
          onBlur={commit}
          inputMode="numeric"
          aria-label="Numéro de page"
          className="h-8 w-10 rounded border border-black-20 bg-white px-1 text-center text-sm text-black focus:border-primary focus:outline-none"
        />
        <span aria-hidden>/</span>
        <span>{numPages}</span>
      </form>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= numPages}
        aria-label="Page suivante"
        className="flex size-8 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight aria-hidden className="size-4" />
      </button>
    </div>
  );
}

function PreviewFallback({
  document: doc,
  fullscreen,
  onRetry,
}: {
  document: DocumentDetail;
  fullscreen: boolean;
  onRetry?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center px-6 py-16 text-center",
        !fullscreen && "min-h-[420px]",
      )}
    >
      <FileWarning aria-hidden className="size-10 text-black-30" />
      <h2 className="mt-4 text-lg font-semibold text-black">
        Aperçu indisponible
      </h2>
      <p className="mt-2 max-w-sm text-sm text-black-60">
        {onRetry
          ? "L'aperçu n'a pas pu être chargé."
          : "Ce document n'est pas un PDF, ou son aperçu n'est pas disponible."}{" "}
        Tu peux toujours le télécharger.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <DocumentDownloadButton documentId={doc.id} fileName={doc.titre} />
        {onRetry ? (
          <Button type="button" variant="secondary" onClick={onRetry}>
            <RotateCcw aria-hidden className="size-4" />
            Réessayer
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function PdfPageSkeleton({ inner = false }: { inner?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "w-full border border-black-10 bg-white p-2",
        PAGE_ASPECT_CLASS,
        inner && "h-full border-0 p-0",
      )}
    >
      <Skeleton className={cn("h-full w-full", !inner && "rounded-sm")} />
    </div>
  );
}
