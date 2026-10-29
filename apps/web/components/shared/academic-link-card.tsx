import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Carte compacte utilisée pour les filières et les UE.
 * Volontairement différente de `CategoryCard` : titre + illustration, sans
 * bandeau de code ni pied de carte.
 */
export function AcademicLinkCard({
	label,
	href,
	className,
}: {
	label: string;
	href: string;
	className?: string;
}) {
	return (
		<Link
			href={href as Route}
			aria-label={`Voir ${label}`}
			className={cn(
				"group relative flex h-24 items-start overflow-hidden border border-black-40 bg-white p-4 transition-colors hover:border-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 sm:h-28",
				className,
			)}
		>
			<span className="relative z-10 line-clamp-3 max-w-[70%] text-sm font-semibold leading-snug text-black transition-colors group-hover:text-primary sm:text-base">
				{label}
			</span>

			<Image
				src="/images/doc.png"
				alt=""
				aria-hidden
				width={113}
				height={100}
				className="pointer-events-none absolute -bottom-2 -right-2 w-20 select-none sm:w-24"
			/>
		</Link>
	);
}

export function AcademicLinkCardSkeleton({
	className,
}: {
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative h-24 overflow-hidden border border-black-10 bg-white p-4 sm:h-28",
				className,
			)}
		>
			<Skeleton className="h-4 w-2/3" />
			<Skeleton className="absolute -bottom-2 -right-2 size-20 rounded-none sm:size-24" />
		</div>
	);
}
