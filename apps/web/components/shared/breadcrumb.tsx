import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
	label: string;
	href?: string;
};

/**
 * Fil d'Ariane compact sur mobile : les éléments antérieurs aux deux derniers
 * sont regroupés derrière une ellipse cliquable.
 */
export function Breadcrumb({
	items,
	className,
}: {
	items: BreadcrumbItem[];
	className?: string;
}) {
	if (items.length === 0) {
		return null;
	}

	const first = items[0];
	const firstHiddenOnMobile = items.length > 2;

	return (
		<nav
			aria-label="Fil d'Ariane"
			className={cn("min-w-0 text-xs text-black-60 sm:text-sm", className)}
		>
			<ol className="flex min-w-0 items-center gap-1 overflow-hidden">
				{firstHiddenOnMobile ? (
					<li className="flex shrink-0 items-center sm:hidden">
						{first.href ? (
							<Link
								href={first.href as Route}
								aria-label={`Aller à ${first.label}`}
								className="rounded px-0.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
							>
								…
							</Link>
						) : (
							<span aria-hidden>…</span>
						)}
					</li>
				) : null}

				{items.map((item, index) => {
					const current = index === items.length - 1;
					const hiddenOnMobile = index < items.length - 2;

					return (
						<li
							key={`${item.href ?? "current"}-${item.label}`}
							className={cn(
								"flex min-w-0 items-center gap-1",
								hiddenOnMobile && "hidden sm:flex",
							)}
						>
							{index > 0 ? (
								<ChevronRight
									aria-hidden
									className="size-3.5 shrink-0 text-black-40"
								/>
							) : null}

							{current ? (
								<span
									aria-current="page"
									className="min-w-0 truncate font-medium text-black"
								>
									{item.label}
								</span>
							) : item.href ? (
								<Link
									href={item.href as Route}
									className="min-w-0 truncate rounded px-0.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
								>
									{item.label}
								</Link>
							) : (
								<span className="truncate">{item.label}</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
