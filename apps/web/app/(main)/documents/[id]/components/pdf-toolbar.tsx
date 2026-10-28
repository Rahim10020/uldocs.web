"use client";

import { ChevronDown, ChevronUp, ZoomIn, ZoomOut } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { clampPage } from "@/lib/document-detail";
import { cn } from "@/lib/utils";

export function PdfToolbar({
  page,
  numPages,
  onPageChange,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  showPageStepper = true,
  className,
}: {
  page: number;
  numPages: number | null;
  onPageChange: (page: number) => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  showPageStepper?: boolean;
  className?: string;
}) {
  return (
    <div
      role="toolbar"
      aria-label="Outils d'aperçu"
      aria-orientation="vertical"
      className={cn(
        "w-16 shrink-0 flex-col items-center gap-2 border-r border-black-10 bg-white p-2",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-4 border-b border-black-10 pt-2 pb-2">
        <ToolButton
          label="Agrandir la page"
          title="Agrandir"
          disabled={!canZoomIn}
          onClick={onZoomIn}
        >
          <ZoomIn aria-hidden className="size-5" />
        </ToolButton>
        <ToolButton
          label="Réduire la page"
          title="Réduire"
          disabled={!canZoomOut}
          onClick={onZoomOut}
        >
          <ZoomOut aria-hidden className="size-5" />
        </ToolButton>
      </div>

      {showPageStepper ? (
        <PageStepper
          page={page}
          numPages={numPages}
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
}

function PageStepper({
  page,
  numPages,
  onPageChange,
}: {
  page: number;
  numPages: number | null;
  onPageChange: (page: number) => void;
}) {
  const [value, setValue] = useState(String(page));

  useEffect(() => {
    setValue(String(page));
  }, [page]);

  function commit() {
    if (!numPages) {
      setValue(String(page));
      return;
    }

    const parsed = Number.parseInt(value, 10);

    if (Number.isFinite(parsed)) {
      onPageChange(clampPage(parsed, numPages));
      return;
    }

    setValue(String(page));
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ToolButton
        label="Page précédente"
        disabled={!numPages || page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronUp aria-hidden className="size-5" />
      </ToolButton>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          commit();
        }}
        className="flex w-full flex-col items-center gap-2"
      >
        <input
          value={value}
          onChange={(event) => setValue(event.target.value.replace(/\D/g, ""))}
          onBlur={commit}
          disabled={!numPages}
          inputMode="numeric"
          aria-label="Numéro de page de l'aperçu"
          className="h-8 w-10 rounded border border-black-20 bg-white px-1 text-center text-sm text-black transition-colors focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        />
        <span className="text-[11px] leading-none text-black-60">
          {numPages ? `/ ${numPages}` : "/ …"}
        </span>
      </form>

      <ToolButton
        label="Page suivante"
        disabled={!numPages || page >= numPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronDown aria-hidden className="size-5" />
      </ToolButton>
    </div>
  );
}

function ToolButton({
  label,
  title,
  disabled,
  onClick,
  children,
}: {
  label: string;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={title ?? label}
      className="flex size-10 cursor-pointer shrink-0 items-center justify-center rounded text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
