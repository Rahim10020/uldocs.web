"use client";

import { Flag, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { DocumentDetail } from "shared";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { DocumentDownloadButton } from "./document-download-button";
import { DocumentFavoriteRow } from "./document-favorite-row";
import { DocumentReaction } from "./document-reaction";
import { DocumentShareButton } from "./document-share-button";

export function DocumentOptionsSheet({
  open,
  onClose,
  document: doc,
  onShare,
  isCopied,
}: {
  open: boolean;
  onClose: () => void;
  document: DocumentDetail;
  onShare: () => void;
  isCopied: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = "document-options-title";

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousFocus = globalThis.document
      .activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    globalThis.document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      globalThis.document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[80] flex items-end lg:hidden"
    >
      <button
        type="button"
        aria-label="Fermer les options"
        onClick={onClose}
        className="absolute inset-0 bg-black-40"
      />

      <div className="relative max-h-[85dvh] w-full overflow-y-auto rounded-t-2xl bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black-10 bg-white px-4 py-3">
          <h2 id={titleId} className="text-md font-semibold text-black">
            Plus d'options
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer les options"
            className="flex size-9 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <DocumentReaction document={doc} variant="sheet" />

        <div className="border-t border-black-10">
          <button
            type="button"
            disabled
            aria-label="Signaler ce document (bientôt disponible)"
            className="flex w-full cursor-not-allowed items-center gap-3 px-4 py-3 text-left text-md font-medium text-black-30"
          >
            <Flag aria-hidden className="size-5" />
            <span>Signaler ce document</span>
            <span className="ml-auto text-xs">Bientôt</span>
          </button>
        </div>

        <div className="divide-y divide-black-10 border-t border-black-10">
          <DocumentShareButton
            onShare={onShare}
            isCopied={isCopied}
            variant="row"
          />
          <DocumentFavoriteRow documentId={doc.id} estFavori={doc.estFavori} />
          <DocumentDownloadButton
            documentId={doc.id}
            fileName={doc.titre}
            variant="row"
            onDownloaded={onClose}
          />
        </div>
      </div>
    </div>
  );
}
