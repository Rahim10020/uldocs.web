"use client";

import dynamic from "next/dynamic";
import type { DocumentDetail } from "shared";
import { Skeleton } from "@/components/ui/skeleton";

const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((module) => module.PdfViewer),
  {
    ssr: false,
    loading: () => <ViewerLoading />,
  },
);

export function DocumentPreview({
  document,
  fullscreen,
  onFullscreenChange,
  onPageCountChange,
}: {
  document: DocumentDetail;
  fullscreen: boolean;
  onFullscreenChange: (fullscreen: boolean) => void;
  onPageCountChange: (numPages: number | null) => void;
}) {
  return (
    <PdfViewer
      document={document}
      fullscreen={fullscreen}
      onFullscreenChange={onFullscreenChange}
      onPageCountChange={onPageCountChange}
    />
  );
}

const VIEWER_THUMBNAIL_SKELETON_KEYS = [
  "viewer-thumbnail-1",
  "viewer-thumbnail-2",
  "viewer-thumbnail-3",
] as const;

function ViewerLoading() {
  return (
    <div
      role="status"
      aria-label="Chargement de l'aperçu"
      className="rounded-md border border-black-10 bg-surface"
    >
      <div className="flex min-h-105 items-stretch">
        <div className="hidden w-16 shrink-0 flex-col items-center gap-1 border-r border-black-10 bg-white p-2 lg:flex">
          <Skeleton className="size-8 rounded" />
          <Skeleton className="size-8 rounded" />
          <Skeleton className="mt-2 size-8 rounded" />
        </div>

        <div className="hidden w-54 shrink-0 flex-col gap-2 border-r border-black-10 bg-black-5 p-3 lg:flex">
          {VIEWER_THUMBNAIL_SKELETON_KEYS.map((key) => (
            <div key={key} className="rounded-md border border-transparent p-2">
              <Skeleton className="aspect-612/792 w-full rounded-sm" />
              <Skeleton className="mx-auto mt-2 h-5 w-6" />
            </div>
          ))}
        </div>

        <div className="min-w-0 flex-1 p-3 sm:p-4 lg:p-6">
          <Skeleton className="mx-auto aspect-612/792 w-full max-w-225 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
