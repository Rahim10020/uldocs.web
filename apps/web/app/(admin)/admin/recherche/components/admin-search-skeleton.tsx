import { Skeleton } from "@/components/ui/skeleton";

/** Squelette de la page de recherche admin. */
export function AdminSearchSkeleton() {
	return (
		<div>
			<Skeleton className="h-8 w-48" />
			<Skeleton className="mt-2 h-4 w-72 max-w-full" />

			<div className="mt-6 space-y-6">
				<Skeleton className="h-64 rounded-xl" />
				<Skeleton className="h-64 rounded-xl" />
			</div>
		</div>
	);
}
