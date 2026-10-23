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
 * 2 cartes en mobile, 3 en md, 4 en lg, 6 en xl (métriques Scribd).
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
				className="grid snap-x snap-mandatory auto-cols-[calc((100%_-_1rem)/2)] grid-flow-col gap-4 overflow-x-auto pb-1 [scrollbar-width:none] md:auto-cols-[calc((100%_-_3rem)/3)] md:gap-6 lg:auto-cols-[calc((100%_-_4.5rem)/4)] xl:auto-cols-[calc((100%_-_7.5rem)/6)] [&::-webkit-scrollbar]:hidden [&>*]:snap-start"
			>
				{children}
			</div>

			{canScrollPrev ? (
				<button
					type="button"
					onClick={() => scroll(-1)}
					aria-label="Faire défiler vers la gauche"
					className="absolute -left-4 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-black-10 bg-white text-black shadow-md transition-colors hover:text-primary md:flex xl:-left-10"
				>
					<ChevronLeft aria-hidden className="size-5" />
				</button>
			) : null}

			{canScrollNext ? (
				<button
					type="button"
					onClick={() => scroll(1)}
					aria-label="Faire défiler vers la droite"
					className="absolute -right-4 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-black-10 bg-white text-black shadow-md transition-colors hover:text-primary md:flex xl:-right-10"
				>
					<ChevronRight aria-hidden className="size-5" />
				</button>
			) : null}
		</section>
	);
}
