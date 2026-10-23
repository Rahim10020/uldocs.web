import { cn } from "@/lib/utils";

/** Bloc de chargement neutre. */
export function Skeleton({ className }: { className?: string }) {
	return (
		<div
			aria-hidden
			className={cn("animate-pulse rounded-md bg-black-5", className)}
		/>
	);
}
