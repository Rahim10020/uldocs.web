"use client";

import { Download, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDownloadDocument } from "@/hooks/use-download-document";
import { toDownloadFileName } from "@/lib/document-detail";
import { cn } from "@/lib/utils";

type DownloadVariant = "primary" | "row";

export function DocumentDownloadButton({
  documentId,
  fileName,
  variant = "primary",
  className,
  onDownloaded,
}: {
  documentId: number;
  fileName: string;
  variant?: DownloadVariant;
  className?: string;
  onDownloaded?: () => void;
}) {
  const mutation = useDownloadDocument();
  const safeFileName = toDownloadFileName(fileName);
  const label = mutation.isPending ? "Téléchargement…" : "Télécharger";

  function download() {
    mutation.mutate(
      { id: documentId, fileName: safeFileName },
      { onSuccess: onDownloaded },
    );
  }

  if (variant === "row") {
    return (
      <button
        type="button"
        disabled={mutation.isPending}
        onClick={download}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-md font-medium text-black transition-colors hover:bg-black-5 focus-visible:bg-black-5 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60",
          className,
        )}
      >
        {mutation.isPending ? (
          <LoaderCircle aria-hidden className="size-5 animate-spin" />
        ) : (
          <Download aria-hidden className="size-5" />
        )}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <Button
      type="button"
      onClick={download}
      disabled={mutation.isPending}
      className={cn("h-10 px-5 cursor-pointer", className)}
    >
      {mutation.isPending ? (
        <LoaderCircle aria-hidden className="size-4 animate-spin" />
      ) : (
        <Download aria-hidden className="size-4" />
      )}
      {label}
    </Button>
  );
}
