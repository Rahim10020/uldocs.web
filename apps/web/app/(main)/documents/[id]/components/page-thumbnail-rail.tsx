"use client";

import { useEffect, useRef, useState } from "react";
import { Page } from "react-pdf";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const THUMBNAIL_PAGE_WIDTH = 174;
const DESKTOP_QUERY = "(min-width: 1024px)";

const THUMBNAIL_SKELETON_KEYS = [
  "thumbnail-1",
  "thumbnail-2",
  "thumbnail-3",
] as const;

export function PageThumbnailRail({
  numPages,
  currentPage,
  onPageChange,
  className,
}: {
  numPages: number | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);

    function update() {
      setIsDesktop(query.matches);
    }

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>(
      `[data-page="${currentPage}"]`,
    );

    if (!list || !active) {
      return;
    }

    const top = active.offsetTop;
    const bottom = top + active.offsetHeight;

    if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) {
      list.scrollTo({
        top: top - list.clientHeight / 2 + active.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  if (!isDesktop) {
    return null;
  }

  return (
    <nav
      aria-label="Miniatures des pages"
      aria-busy={!numPages}
      className={cn(
        "w-54 shrink-0 flex-col border-r border-black-10 bg-black-5 p-3",
        className,
      )}
    >
      <div
        ref={listRef}
        className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto"
      >
        {numPages ? (
          Array.from({ length: numPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <PageThumbnail
                key={pageNumber}
                pageNumber={pageNumber}
                active={pageNumber === currentPage}
                onSelect={() => onPageChange(pageNumber)}
              />
            ),
          )
        ) : (
          <PageThumbnailSkeletons />
        )}
      </div>
    </nav>
  );
}

export function PageThumbnailRailSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <nav
      aria-hidden
      className={cn(
        "w-54 shrink-0 flex-col border-r border-black-10 bg-black-5 p-3",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <PageThumbnailSkeletons />
      </div>
    </nav>
  );
}

function PageThumbnail({
  pageNumber,
  active,
  onSelect,
}: {
  pageNumber: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-page={pageNumber}
      aria-label={`Aller à la page ${pageNumber}`}
      aria-current={active ? "page" : undefined}
      onClick={onSelect}
      className={cn(
        "block w-full shrink-0 rounded-md border p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
        active
          ? "border-black bg-white"
          : "border-transparent hover:border-black-20 hover:bg-white",
      )}
    >
      <span className="block aspect-612/792 overflow-hidden border border-black-10 bg-white">
        <Page
          pageNumber={pageNumber}
          width={THUMBNAIL_PAGE_WIDTH}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={<Skeleton className="h-full w-full rounded-none" />}
          className="w-full!"
        />
      </span>
      <span
        className={cn(
          "mt-2 block text-center text-sm leading-5",
          active ? "font-medium text-black" : "text-black-60",
        )}
      >
        {pageNumber}
      </span>
    </button>
  );
}

function PageThumbnailSkeletons() {
  return (
    <>
      {THUMBNAIL_SKELETON_KEYS.map((key) => (
        <div
          key={key}
          aria-hidden
          className="rounded-md border border-transparent p-2"
        >
          <Skeleton className="aspect-612/792 w-full rounded-sm" />
          <Skeleton className="mx-auto mt-2 h-5 w-6" />
        </div>
      ))}
    </>
  );
}
