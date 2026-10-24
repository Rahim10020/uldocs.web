"use client";

import { Download } from "lucide-react";
import { useDownloadDocument } from "@/hooks/use-download-document";
import { cn } from "@/lib/utils";

/** Bouton de téléchargement : enregistre l'action puis lance le fichier. */
export function DownloadButton({
  documentId,
  fileName,
  className,
}: {
  documentId: number;
  fileName: string;
  className?: string;
}) {
  const mutation = useDownloadDocument();

  return (
    <button
      type="button"
      aria-label={`Télécharger ${fileName}`}
      title="Télécharger"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id: documentId, fileName })}
      className={cn(
        "flex size-8 cursor-pointer items-center justify-center rounded text-black-60 transition-colors hover:text-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-wait disabled:opacity-60",
        className,
      )}
    >
      <Download aria-hidden className="size-5" />
    </button>
  );
}
