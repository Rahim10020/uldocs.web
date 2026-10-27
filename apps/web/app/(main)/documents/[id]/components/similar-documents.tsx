import { FileText, Star } from "lucide-react";
import Link from "next/link";
import type { DocumentListItem } from "shared";
import { FormatBadge } from "@/components/ui/format-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRating } from "@/lib/format";
import { routes } from "@/lib/routes";

const SIMILAR_SKELETON_KEYS = [
  "similar-1",
  "similar-2",
  "similar-3",
  "similar-4",
] as const;

export function SimilarDocuments({
  documents,
  isPending,
  isError,
}: {
  documents: DocumentListItem[];
  isPending: boolean;
  isError: boolean;
}) {
  return (
    <aside
      aria-labelledby="similar-documents-title"
      className="hidden lg:block"
    >
      <h2
        id="similar-documents-title"
        className="text-md font-semibold text-black"
      >
        Documents similaires
      </h2>

      {isPending ? (
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
      ) : isError ? (
        <p className="mt-4 text-sm text-black-60">
          Impossible de charger les documents similaires.
        </p>
      ) : documents.length === 0 ? (
        <p className="mt-4 text-sm text-black-60">
          Aucun document similaire pour le moment.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {documents.map((item) => (
            <SimilarDocumentCard key={item.id} document={item} />
          ))}
        </div>
      )}
    </aside>
  );
}

function SimilarDocumentCard({ document }: { document: DocumentListItem }) {
  return (
    <Link
      href={routes.document(document.id)}
      className="group flex gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
    >
      <div className="relative flex h-24 w-[78px] shrink-0 items-center justify-center overflow-hidden border border-black-10 bg-surface">
        <FormatBadge
          format={document.format}
          className="absolute left-1.5 top-1.5 px-1.5 py-0.5 text-[8px]"
        />
        <FileText
          aria-hidden
          className="size-8 text-black-20"
          strokeWidth={1.25}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-xs text-black-60">
          <span className="inline-flex items-center gap-1">
            <Star aria-hidden className="size-3.5 fill-current text-black" />
            {formatRating(document.noteMoyenne)}
          </span>
          <span aria-hidden className="text-black-30">
            ·
          </span>
          <span>
            {document.nbPages ? `${document.nbPages} pages` : document.niveau}
          </span>
        </div>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-black transition-colors group-hover:text-primary">
          {document.titre}
        </h3>
      </div>
    </Link>
  );
}
