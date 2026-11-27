import { Skeleton } from "@/components/ui/skeleton";

/** Chargement fidèle des filtres et des résultats utilisateurs. */
export function AdminUsersSkeleton() {
	return (
		<div role="status" className="mt-6">
			<span className="sr-only">Chargement des utilisateurs</span>
			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(16rem,1fr)_12rem_12rem_12rem]">
				<Skeleton className="h-11 w-full sm:col-span-2 xl:col-span-1" />
				<Skeleton className="h-11 w-full" />
				<Skeleton className="h-11 w-full" />
				<Skeleton className="h-11 w-full" />
			</div>

			<div className="mt-6 hidden xl:block">
				{Array.from({ length: 8 }, (_, index) => `user-row-${index}`).map(
					(key) => (
						<div
							key={key}
							className="grid grid-cols-[1.4fr_1.5fr_1fr_1.4fr_0.8fr_1fr_2.5rem] items-center gap-4 border-b border-black-10 py-4"
						>
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-5 w-40" />
							<Skeleton className="h-5 w-24" />
							<Skeleton className="h-6 w-28 rounded-full" />
							<Skeleton className="h-6 w-20 rounded-full" />
							<Skeleton className="h-5 w-24" />
							<Skeleton className="size-8 rounded-full" />
						</div>
					),
				)}
			</div>

			<div className="mt-6 space-y-3 xl:hidden">
				{Array.from({ length: 4 }, (_, index) => `user-card-${index}`).map(
					(key) => (
						<div
							key={key}
							className="rounded-xl border border-black-10 bg-white p-4"
						>
							<Skeleton className="h-5 w-40" />
							<Skeleton className="mt-2 h-4 w-52 max-w-full" />
							<div className="mt-4 flex justify-between gap-4">
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-5 w-24" />
							</div>
							<div className="mt-4 flex gap-2">
								<Skeleton className="h-6 w-24 rounded-full" />
								<Skeleton className="h-6 w-24 rounded-full" />
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}
