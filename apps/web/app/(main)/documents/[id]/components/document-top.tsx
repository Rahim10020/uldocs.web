import { ChevronRight, Download, FileText, Flag, Star } from "lucide-react";
import Link from "next/link";
import type { DocumentDetail } from "shared";
import { buildDocumentBreadcrumb } from "@/lib/document-detail";
import {
  formatCount,
  formatDate,
  formatFileSize,
  formatRating,
} from "@/lib/format";
import { DocumentReaction } from "./document-reaction";

export function DocumentTop({
  document,
  pageCount,
}: {
  document: DocumentDetail;
  pageCount: number | null;
}) {
  const breadcrumb = buildDocumentBreadcrumb(document);

  return (
    <section aria-labelledby="document-title">
      <div className="flex items-start justify-between gap-4">
        <nav aria-label="Fil d'Ariane" className="hidden min-w-0 lg:block">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-black-60">
            {breadcrumb.map((item, index) => (
              <li
                key={`${item.label}-${item.href ?? "current"}`}
                className="flex min-w-0 items-center gap-1.5"
              >
                {index > 0 ? (
                  <ChevronRight
                    aria-hidden
                    className="size-4 shrink-0 text-black-30"
                  />
                ) : null}
                <Link
                  href={item.href ?? "#"}
                  className="max-w-52 truncate rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="hidden shrink-0 items-center gap-1 lg:flex">
          <DocumentReaction document={document} />
          <button
            type="button"
            disabled
            aria-label="Signaler ce document (bientôt disponible)"
            title="Signalement bientôt disponible"
            className="flex size-9 cursor-not-allowed items-center justify-center rounded text-black-30"
          >
            <Flag aria-hidden className="size-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-4">
          <h1
            id="document-title"
            className="order-2 mt-2 text-2xl font-bold leading-tight tracking-tight text-black sm:text-3xl lg:order-1 lg:mt-0"
          >
            {document.titre}
          </h1>

          <div className="order-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-black-60 lg:order-2 lg:mt-3">
            <span className="inline-flex items-center gap-1">
              <Star aria-hidden className="size-3 fill-current text-black" />
              <span className="font-medium text-black">
                {formatRating(document.noteMoyenne)}
              </span>
              <span className="sr-only">note moyenne</span>
            </span>
            <span aria-hidden className="text-black-30">
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <Download aria-hidden className="size-4" />
              {formatCount(document.nbTelechargements)}
              <span className="sr-only">téléchargements</span>
            </span>
            {pageCount ? (
              <>
                <span aria-hidden className="text-black-30">
                  ·
                </span>
                <span className="inline-flex items-center gap-1">
                  <FileText aria-hidden className="size-4" />
                  {pageCount} pages
                </span>
              </>
            ) : null}
            <span aria-hidden className="text-black-30">
              ·
            </span>
            <span>{formatFileSize(document.tailleKo)}</span>
          </div>
        </div>

        <p className="order-3 mt-2 text-sm text-black-60 lg:mt-1.5">
          Téléversé par{" "}
          <span className="font-medium text-black-80">
            {document.uploader.nom}
          </span>{" "}
          le {formatDate(document.dateUpload)}
        </p>
      </div>
    </section>
  );
}
