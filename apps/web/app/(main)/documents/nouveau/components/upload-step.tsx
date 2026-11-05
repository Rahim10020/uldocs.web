"use client";

import { ArrowRight, X } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import type { NewDocumentFlowController } from "@/hooks/use-new-document-flow";
import {
  fileSizeInKiloOctets,
  MAX_FILE_SIZE_LABEL,
  MAX_UPLOAD_FILES,
  UPLOAD_ACCEPT,
  UPLOAD_FORMATS_LABEL,
} from "@/lib/document-upload";
import { formatFileSize } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Étape 1 : sélection multiple par clic ou glisser-déposer. */
export function UploadStep({ flow }: { flow: NewDocumentFlowController }) {
  const inputId = useId();
  const helpId = useId();
  const mobileHelpId = `${helpId}-mobile`;
  const [dragActive, setDragActive] = useState(false);
  const hasFiles = flow.files.length > 0;
  const limitReached = flow.files.length >= MAX_UPLOAD_FILES;
  const helpContent = (
    <>
      Formats acceptés : {UPLOAD_FORMATS_LABEL} • Taille max :{" "}
      {MAX_FILE_SIZE_LABEL}
    </>
  );

  return (
    <section className="mt-8" aria-label="Sélection des documents">
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed px-5 py-10 text-center transition-colors focus-within:ring-2 focus-within:ring-primary-40 sm:px-8 sm:py-14",
          dragActive
            ? "border-primary bg-primary-5"
            : "border-black-20 bg-white",
        )}
      >
        {hasFiles ? (
          <ul className="grid gap-8 sm:grid-cols-2">
            {flow.files.map((item) => {
              const pageLabel =
                item.nbPages === null
                  ? null
                  : `${item.nbPages} page${item.nbPages > 1 ? "s" : ""}`;
              const meta = [
                formatFileSize(fileSizeInKiloOctets(item.file.size)),
                pageLabel,
              ]
                .filter(Boolean)
                .join(" · ");

              return (
                <li
                  key={item.id}
                  className="flex min-w-0 flex-col items-center text-center"
                >
                  <button
                    type="button"
                    onClick={() => flow.handleFileRemove(item.id)}
                    aria-label={`Retirer ${item.file.name}`}
                    className="relative z-30 flex size-8 cursor-pointer items-center justify-center rounded text-black-70 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                  >
                    <X aria-hidden className="size-5" />
                  </button>
                  <p className="mt-1 max-w-full wrap-break-word text-sm font-semibold text-black">
                    {item.file.name}
                  </p>
                  <p className="mt-1 text-xs text-black-60">{meta}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center">
            <span className="inline-flex min-h-16 max-w-64 items-center justify-center rounded-md bg-primary px-6 text-center text-md font-semibold text-white sm:max-w-none">
              Sélectionner les documents à importer
            </span>
            <span className="mt-3 hidden text-sm text-black-60 sm:block">
              ou glissez et déposez
            </span>
          </div>
        )}

        <p
          id={mobileHelpId}
          className="mt-6 text-xs leading-relaxed text-black-50 sm:hidden"
        >
          {helpContent}
        </p>

        <input
          id={inputId}
          type="file"
          multiple
          accept={UPLOAD_ACCEPT}
          className="absolute inset-0 z-20 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          aria-label="Sélectionner des documents à importer"
          aria-describedby={`${mobileHelpId} ${helpId}`}
          disabled={limitReached}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(event) => {
            if (
              event.relatedTarget instanceof Node &&
              event.currentTarget.contains(event.relatedTarget)
            ) {
              return;
            }

            setDragActive(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setDragActive(false);

            if (event.dataTransfer.files.length > 0) {
              flow.handleFilesAdd(Array.from(event.dataTransfer.files));
            }
          }}
          onChange={(event) => {
            const selected = Array.from(event.target.files ?? []);

            if (selected.length > 0) {
              flow.handleFilesAdd(selected);
            }

            event.target.value = "";
          }}
        />
      </div>

      <p
        id={helpId}
        className="mt-4 hidden text-center text-xs leading-relaxed text-black-50 sm:block"
      >
        {helpContent}
      </p>

      {flow.fileErrors.length > 0 ? (
        <div
          role="alert"
          className="mt-4 rounded-md border border-error px-4 py-3 text-sm text-error"
        >
          <ul className="space-y-1">
            {flow.fileErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {hasFiles ? (
        <div className="mt-8 flex justify-center">
          <Button
            className="h-12 w-full max-w-80 rounded-md text-md"
            onClick={flow.handleFilesContinue}
          >
            Continuer
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      ) : null}
    </section>
  );
}
