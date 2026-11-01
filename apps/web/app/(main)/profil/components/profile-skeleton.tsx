import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

const PROFILE_STAT_SKELETON_KEYS = ["documents", "points", "views"] as const;

/** Squelette du profil, aussi utilisé comme fallback de la boundary Suspense. */
export function ProfileSkeleton() {
	return (
		<Container className="py-8 sm:py-12">
			<div className="flex items-start gap-4">
				<Skeleton className="size-16 rounded-full sm:size-20" />
				<div className="space-y-2">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-64 max-w-full" />
					<Skeleton className="h-3 w-40" />
				</div>
			</div>

			<div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
				<div className="grid grid-cols-3 gap-3 sm:gap-4">
					{PROFILE_STAT_SKELETON_KEYS.map((key) => (
						<Skeleton key={key} className="h-24" />
					))}
				</div>
				<Skeleton className="h-24" />
			</div>

			<Skeleton className="mt-10 h-12" />
		</Container>
	);
}
