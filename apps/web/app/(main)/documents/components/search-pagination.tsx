"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageItem = number | "start-ellipsis" | "end-ellipsis";

function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, page - 1, page, page + 1]);

  if (page <= 4) {
    pages.add(2).add(3).add(4).add(5);
  }

  if (page >= totalPages - 3) {
    pages
      .add(totalPages - 1)
      .add(totalPages - 2)
      .add(totalPages - 3)
      .add(totalPages - 4);
  }

  const sorted = [...pages]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);

  const items: PageItem[] = [];

  for (const [index, value] of sorted.entries()) {
    const previous = sorted[index - 1];

    if (previous !== undefined && value - previous > 1) {
      items.push(previous < page ? "start-ellipsis" : "end-ellipsis");
    }

    items.push(value);
  }

  return items;
}

/** Pagination numérotée, avec ellipses et flèches. */
export function SearchPagination({
  page,
  total,
  pageSize,
  onPageChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const items = getPageItems(page, totalPages);

  return (
    <nav
      aria-label="Pagination des résultats"
      className="mt-10 flex items-center justify-center gap-1"
    >
      <ArrowButton
        label="Page précédente"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        <ChevronLeft aria-hidden className="size-5" />
      </ArrowButton>

      {items.map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={cn(
              "flex size-9 cursor-pointer items-center justify-center rounded text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
              item === page
                ? "bg-black text-white"
                : "text-black-70 hover:bg-black-5 hover:text-black",
            )}
          >
            {item}
          </button>
        ) : (
          <span
            key={item}
            aria-hidden
            className="flex size-9 items-center justify-center text-sm text-black-50"
          >
            …
          </span>
        ),
      )}

      <ArrowButton
        label="Page suivante"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        <ChevronRight aria-hidden className="size-5" />
      </ArrowButton>
    </nav>
  );
}

function ArrowButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="ml-2 flex size-9 cursor-pointer items-center justify-center rounded-full border border-black-30 text-black transition-colors hover:border-black-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-default disabled:opacity-30 disabled:hover:border-black-30 first:ml-0"
    >
      {children}
    </button>
  );
}
