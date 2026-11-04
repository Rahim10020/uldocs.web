import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

/** Squelette du détail d'un signalement. */
export function ReportDetailSkeleton() {
	return (
		<Container className="max-w-2xl py-8 lg:py-12">
			<Skeleton className="h-8 w-56" />
			<Skeleton className="mt-4 h-5 w-32" />

			<div className="mt-8 space-y-2">
				<Skeleton className="h-5 w-40" />
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-4 w-28" />
			</div>

			<div className="mt-8 space-y-2">
				<Skeleton className="h-4 w-48" />
				<Skeleton className="h-4 w-64" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
			</div>

			<div className="mt-8 space-y-2">
				<Skeleton className="h-5 w-48" />
				<Skeleton className="h-4 w-64" />
				<Skeleton className="h-4 w-52" />
			</div>

			<div className="mt-10 space-y-3">
				<Skeleton className="h-5 w-36" />
				{Array.from({ length: 5 }, (_, index) => `decision-${index}`).map(
					(key) => (
						<Skeleton key={key} className="h-5 w-52" />
					),
				)}
			</div>

			<div className="mt-8 space-y-3">
				<Skeleton className="h-5 w-44" />
				<Skeleton className="h-32 w-full" />
				<Skeleton className="ml-auto h-9 w-40" />
			</div>
		</Container>
	);
}
