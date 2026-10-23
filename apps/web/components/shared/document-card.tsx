import { Download, FileText, Star } from "lucide-react";
import Link from "next/link";
import type { DocumentListItem } from "shared";
import { FormatBadge } from "@/components/ui/format-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCount, formatRating } from "@/lib/format";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** Carte document réutilisable (accueil, listes, profil). */
export function DocumentCard({
  document,
  className,
}: {
  document: DocumentListItem;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "h-90 overflow-hidden rounded-md border border-black-10 bg-white transition-colors hover:border-black-20",
        className,
      )}
    >
      <Link
        href={routes.document(document.id)}
        className="group flex h-full flex-col rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-40"
      >
        <div className="relative flex h-55 items-center justify-center border-b border-black-10 bg-surface p-6">
          <FormatBadge
            format={document.format}
            className="absolute left-3 top-3"
          />
          <FileText
            aria-hidden
            className="size-14 text-black-10"
            strokeWidth={1.25}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-4">
          <h3 className="line-clamp-2 text-md font-semibold leading-snug text-black group-hover:text-primary">
            {document.titre}
          </h3>
          <p className="truncate text-xs text-black-60">
            {document.ue.nom} · {document.niveau}
          </p>

          <div className="mt-auto flex items-center justify-between text-xs text-black-60">
            <span className="inline-flex items-center gap-1">
              <Star aria-hidden className="size-3.5 fill-current text-black" />
              <span>{formatRating(document.noteMoyenne)}</span>
              <span className="sr-only">note moyenne</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Download aria-hidden className="size-3.5" />
              <span>{formatCount(document.nbTelechargements)}</span>
              <span className="sr-only">téléchargements</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function DocumentCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-90 overflow-hidden rounded-md border border-black-10 bg-white",
        className,
      )}
    >
      <Skeleton className="h-55 rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="mt-6 h-3 w-1/2" />
      </div>
    </div>
  );
}
