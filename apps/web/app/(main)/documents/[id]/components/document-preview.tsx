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

function ViewerLoading() {
  return (
    <div
      role="status"
      aria-label="Chargement de l'aperçu"
      className="rounded-md border border-black-10 bg-surface p-3 sm:p-4 lg:p-6"
    >
      <div className="flex items-start gap-3">
        <Skeleton className="hidden h-80 w-12 shrink-0 lg:block" />
        <Skeleton className="mx-auto aspect-[612/792] w-full max-w-[900px] rounded-sm" />
      </div>
    </div>
  );
}
