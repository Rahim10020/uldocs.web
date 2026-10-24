"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Carrousel horizontal responsive.
 * 2 cartes en mobile, 3 en md, 4 en lg, 5 en xl.
 */
export function Carousel({
  children,
  ariaLabel,
  className,
}: {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const update = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const maxScroll = element.scrollWidth - element.clientWidth;

    setCanScrollPrev(element.scrollLeft > 4);
    setCanScrollNext(element.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    update();

    const resizeObserver = new ResizeObserver(update);
    const mutationObserver = new MutationObserver(update);

    resizeObserver.observe(element);
    mutationObserver.observe(element, { childList: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [update]);

  const scroll = (direction: 1 | -1) => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    element.scrollBy({
      left: direction * element.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <section aria-label={ariaLabel} className={cn("relative", className)}>
      <div
        ref={scrollRef}
        onScroll={update}
        className="grid snap-x snap-mandatory auto-cols-[calc((100%-1rem)/2)] grid-flow-col gap-4 overflow-x-auto pb-1 scrollbar-none md:auto-cols-[calc((100%-3rem)/3)] md:gap-6 lg:auto-cols-[calc((100%-4.5rem)/4)] xl:auto-cols-[calc((100%-6rem)/5)] [&::-webkit-scrollbar]:hidden *:snap-start"
      >
        {children}
      </div>

      {canScrollPrev ? (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Faire défiler vers la gauche"
          className="absolute cursor-pointer left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-black-10 bg-white text-black shadow-md transition-colors hover:text-primary md:-left-4 xl:-left-10"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
      ) : null}

      {canScrollNext ? (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Faire défiler vers la droite"
          className="absolute cursor-pointer right-2 top-1/2 flex size-14 lg:size-10 -translate-y-1/2 items-center justify-center rounded-full border border-black-10 bg-white text-black shadow-md transition-colors hover:text-primary md:-right-4 xl:-right-10"
        >
          <ChevronRight aria-hidden className="size-6 lg:size-5" />
        </button>
      ) : null}
    </section>
  );
}
