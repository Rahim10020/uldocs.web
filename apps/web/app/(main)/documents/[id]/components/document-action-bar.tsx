"use client";

import { Maximize2 } from "lucide-react";
import type { DocumentDetail } from "shared";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { cn } from "@/lib/utils";
import { DocumentDownloadButton } from "./document-download-button";
import { DocumentShareButton } from "./document-share-button";

export function DocumentActionBar({
  document,
  onShare,
  onFullscreen,
  isCopied,
  className,
}: {
  document: DocumentDetail;
  onShare: () => void;
  onFullscreen: () => void;
  isCopied: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "z-40 flex flex-wrap items-center gap-2 border-b border-black-10 bg-white/95 py-3 backdrop-blur lg:sticky lg:top-14",
        className,
      )}
    >
      <div className="flex items-center gap-2 lg:gap-4">
        <DocumentDownloadButton
          documentId={document.id}
          fileName={document.titre}
          className="min-w-42 flex-1 sm:flex-none"
        />
        <FavoriteButton
          documentId={document.id}
          estFavori={document.estFavori}
          className="hidden size-10 lg:flex"
        />
        <DocumentShareButton
          onShare={onShare}
          isCopied={isCopied}
          className="hidden lg:flex"
        />
      </div>

      <div className="ml-auto">
        <button
          type="button"
          onClick={onFullscreen}
          aria-label="Ouvrir l'aperçu en plein écran"
          title="Plein écran"
          className="flex size-10 items-center justify-center rounded text-black-60 transition-colors bg-primary-5 hover:text-black-90 focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
        >
          <Maximize2 aria-hidden className="size-6" />
        </button>
      </div>
    </div>
  );
}
