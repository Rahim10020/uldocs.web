import { Download, FileText, Star } from "lucide-react";
import Link from "next/link";
import type { DocumentListItem } from "shared";
import { FormatBadge } from "@/components/ui/format-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TYPE_DOCUMENT_LABELS } from "@/lib/document-labels";
import { formatCount, formatDate, formatRating } from "@/lib/format";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { DownloadButton } from "./download-button";
import { FavoriteButton } from "./favorite-button";

type CardVariant = "home" | "search-grid" | "search-list";

type DocumentCardProps = {
  document: DocumentListItem;
  variant?: CardVariant;
  /** Métrique affichée sous le titre (grille). */
  meta?: "rating" | "downloads";
  className?: string;
};

function RatingMeta({ document }: { document: DocumentListItem }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Star aria-hidden className="size-3.5 fill-current text-black" />
      <span>{formatRating(document.noteMoyenne)}</span>
      <span className="sr-only">note moyenne</span>
    </span>
  );
}

function DownloadsMeta({ document }: { document: DocumentListItem }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Download aria-hidden className="size-3.5" />
      <span>{formatCount(document.nbTelechargements)}</span>
      <span className="sr-only">téléchargements</span>
    </span>
  );
}

function DocumentMeta({
  document,
  meta,
}: {
  document: DocumentListItem;
  meta: "rating" | "downloads";
}) {
  return meta === "downloads" ? (
    <DownloadsMeta document={document} />
  ) : (
    <RatingMeta document={document} />
  );
}

/** Carte document réutilisable (accueil, recherche, profil). */
export function DocumentCard({
  document,
  variant = "home",
  meta = "rating",
  className,
}: DocumentCardProps) {
  const isList = variant === "search-list";
  const isHome = variant === "home";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-md border border-black-10 bg-white transition-colors hover:border-black-20 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-inset has-[a:focus-visible]:ring-primary-40",
        isList ? "flex min-h-44" : isHome ? "h-90" : "h-72",
        className,
      )}
    >
      <LinkOverlay id={document.id} titre={document.titre} />

      {isList ? (
        <SearchListContent document={document} />
      ) : (
        <GridContent document={document} meta={meta} home={isHome} />
      )}
    </article>
  );
}

function LinkOverlay({ id, titre }: { id: number; titre: string }) {
  return (
    <Link
      href={routes.document(id)}
      aria-label={`Voir ${titre}`}
      className="absolute inset-0 z-0 rounded-md focus-visible:outline-none"
    />
  );
}

function GridContent({
  document,
  meta,
  home,
}: {
  document: DocumentListItem;
  meta: "rating" | "downloads";
  home: boolean;
}) {
  return (
    <div className="pointer-events-none relative z-10 flex h-full flex-col">
      <div
        className={cn(
          "relative flex items-center justify-center border-b border-black-10 bg-surface",
          home ? "h-55 p-6" : "h-42 p-4",
        )}
      >
        <FormatBadge
          format={document.format}
          className="absolute left-3 top-3"
        />
        <FileText
          aria-hidden
          className={cn("text-black-10", home ? "size-14" : "size-12")}
          strokeWidth={1.25}
        />
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          home ? "gap-1.5 p-4" : "gap-1 p-3",
        )}
      >
        <h3
          className={cn(
            "line-clamp-2 font-semibold leading-snug text-black group-hover:text-primary",
            home ? "text-md" : "text-sm",
          )}
        >
          {document.titre}
        </h3>
        <p className="truncate text-xs text-black-60">
          {document.ue.nom} · {document.niveau}
        </p>

        <div className="mt-auto flex items-center justify-between text-xs text-black-60">
          <DocumentMeta document={document} meta={meta} />
          <div className="pointer-events-auto">
            <FavoriteButton
              documentId={document.id}
              estFavori={document.estFavori}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchListContent({ document }: { document: DocumentListItem }) {
  return (
    <div className="pointer-events-none relative z-10 flex w-full gap-4 p-3 sm:gap-5 sm:p-4">
      <div className="relative flex h-36 w-28 shrink-0 items-center justify-center border border-black-10 bg-surface sm:h-48 sm:w-44">
        <FormatBadge
          format={document.format}
          className="absolute left-2 top-2"
        />
        <FileText
          aria-hidden
          className="size-10 text-black-10 sm:size-12"
          strokeWidth={1.25}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-black-60">
            <RatingMeta document={document} />
            <span aria-hidden>·</span>
            <DownloadsMeta document={document} />
          </div>

          <div className="pointer-events-auto flex items-center gap-1">
            <DownloadButton
              documentId={document.id}
              fileName={document.titre}
            />
            <FavoriteButton
              documentId={document.id}
              estFavori={document.estFavori}
            />
          </div>
        </div>

        <h3 className="mt-1 line-clamp-2 text-md font-semibold leading-snug text-black group-hover:text-primary">
          {document.titre}
        </h3>

        {document.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-black-60">
            {document.description}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 text-xs text-black-60">
          {/* TODO : lier l'uploader à son profil une fois la page publique disponible. */}
          <span>
            Téléversé par{" "}
            <span className="font-medium text-black-80">
              {document.uploader.nom}
            </span>{" "}
            le {formatDate(document.dateUpload)}
          </span>
          <span className="rounded border border-black-20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black-70">
            {document.format.toUpperCase()}
          </span>
          <span className="rounded border border-black-20 px-2 py-0.5 text-[10px] font-semibold text-black-70">
            {TYPE_DOCUMENT_LABELS[document.type]}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DocumentCardSkeleton({
  variant = "home",
  className,
}: {
  variant?: CardVariant;
  className?: string;
}) {
  if (variant === "search-list") {
    return (
      <div
        className={cn(
          "flex min-h-44 gap-4 rounded-md border border-black-10 bg-white p-4",
          className,
        )}
      >
        <Skeleton className="h-36 w-28 shrink-0 sm:h-48 sm:w-44" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    );
  }

  const isHome = variant === "home";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-black-10 bg-white",
        isHome ? "h-90" : "h-72",
        className,
      )}
    >
      <Skeleton className={cn("rounded-none", isHome ? "h-55" : "h-42")} />
      <div className={cn("space-y-3", isHome ? "p-4" : "p-3")}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
