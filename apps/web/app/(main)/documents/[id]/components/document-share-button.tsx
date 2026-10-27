"use client";

import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ShareVariant = "icon" | "row";

export function DocumentShareButton({
  onShare,
  isCopied,
  variant = "icon",
  className,
}: {
  onShare: () => void;
  isCopied: boolean;
  variant?: ShareVariant;
  className?: string;
}) {
  const label = isCopied ? "Lien copié" : "Partager";

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={onShare}
        className={cn(
          "flex w-full items-center gap-3 px-4 py-3 text-left text-md font-medium text-black transition-colors hover:bg-black-5 focus-visible:bg-black-5 focus-visible:outline-none",
          className,
        )}
      >
        {isCopied ? (
          <Check aria-hidden className="size-5 text-success" />
        ) : (
          <Share2 aria-hidden className="size-5" />
        )}
        <span aria-live="polite">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-10 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black-90 focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
        className,
      )}
    >
      {isCopied ? (
        <Check aria-hidden className="size-5 text-success" />
      ) : (
        <Share2 aria-hidden className="size-5" />
      )}
      <span className="sr-only" aria-live="polite">
        {label}
      </span>
    </button>
  );
}
