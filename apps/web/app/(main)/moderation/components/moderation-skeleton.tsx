import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

/** Squelette de la file de modération. */
export function ModerationPageSkeleton() {
	return (
		<Container className="max-w-5xl py-8 lg:py-12">
			<Skeleton className="h-8 w-72" />
			<div className="mt-8 flex flex-col gap-4 lg:mt-10 lg:flex-row lg:items-center lg:justify-between">
				<Skeleton className="h-5 w-48" />
				<div className="flex gap-4">
					<Skeleton className="h-10 w-44" />
					<Skeleton className="h-10 w-44" />
				</div>
			</div>
			<ModerationCardsSkeleton />
		</Container>
	);
}

/** Cartes de chargement de la file. */
export function ModerationCardsSkeleton() {
	return (
		<div
			role="status"
			aria-label="Chargement des signalements"
			className="mt-6 space-y-4"
		>
			{Array.from(
				{ length: 6 },
				(_, index) => `moderation-skeleton-${index}`,
			).map((key) => (
				<div key={key} className="rounded-md border border-black-10 p-5 lg:p-6">
					<div className="flex items-center gap-3">
						<Skeleton className="size-7" />
						<Skeleton className="h-5 w-2/3" />
					</div>
					<div className="mt-4 space-y-2">
						<Skeleton className="h-4 w-48" />
						<Skeleton className="h-4 w-64" />
						<Skeleton className="h-4 w-28" />
					</div>
					<Skeleton className="mt-4 h-9 w-24" />
				</div>
			))}
		</div>
	);
}
