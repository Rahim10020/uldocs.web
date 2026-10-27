"use client";

import { MoreHorizontal } from "lucide-react";
import type { RefObject } from "react";
import { useEffect, useState } from "react";
import type { DocumentDetail } from "shared";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { DocumentDownloadButton } from "./document-download-button";
import { DocumentShareButton } from "./document-share-button";

export function DocumentMobileBar({
  document,
  sentinelRef,
  onShare,
  onMore,
  isCopied,
  alwaysVisible = false,
}: {
  document: DocumentDetail;
  sentinelRef: RefObject<HTMLDivElement | null>;
  onShare: () => void;
  onMore: () => void;
  isCopied: boolean;
  /** Visible en plein écran, sans attendre le scroll. */
  alwaysVisible?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (alwaysVisible) {
      return;
    }

    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 56);
      },
      {
        rootMargin: "-56px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [alwaysVisible, sentinelRef]);

  if (!alwaysVisible && !scrolled) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-black-10 bg-white/95 px-4 py-2 backdrop-blur lg:hidden">
      <div className="flex items-center gap-1.5">
        <DocumentDownloadButton
          documentId={document.id}
          fileName={document.titre}
          className="h-10 flex-1"
        />
        <FavoriteButton
          documentId={document.id}
          estFavori={document.estFavori}
          className="size-10"
        />
        <DocumentShareButton onShare={onShare} isCopied={isCopied} />
        <button
          type="button"
          onClick={onMore}
          aria-label="Plus d'options"
          title="Plus d'options"
          className="flex size-10 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black-90 focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
        >
          <MoreHorizontal aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
}
