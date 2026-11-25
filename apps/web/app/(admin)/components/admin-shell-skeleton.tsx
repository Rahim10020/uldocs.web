import { Skeleton } from "@/components/ui/skeleton";

/** Squelette du shell admin pendant le chargement de la session. */
export function AdminShellSkeleton() {
	return (
		<div className="grid h-dvh grid-rows-[3.5rem_minmax(0,1fr)] overflow-hidden bg-surface">
			<div className="flex h-14 items-center gap-3 border-b border-black-10 bg-white px-4 sm:gap-4 sm:px-6 lg:px-8">
				<Skeleton className="size-9 lg:hidden" />
				<Skeleton className="h-5 w-28" />
				<Skeleton className="ml-2 h-10 w-full max-w-md" />
				<Skeleton className="ml-auto size-9 rounded-full" />
			</div>

			<div className="flex min-h-0 overflow-hidden">
				<aside
					aria-hidden
					className="hidden h-full min-h-0 w-56 shrink-0 overflow-hidden border-r border-black-10 bg-white p-3 lg:block"
				>
					<div className="space-y-2">
						{Array.from(
							{ length: 6 },
							(_, index) => `admin-nav-skeleton-${index}`,
						).map((key) => (
							<Skeleton key={key} className="h-10 w-full" />
						))}
					</div>
				</aside>

				<main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8">
					<Skeleton className="h-8 w-56" />
					<Skeleton className="mt-2 h-4 w-80 max-w-full" />

					<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{Array.from(
							{ length: 4 },
							(_, index) => `admin-stat-skeleton-${index}`,
						).map((key) => (
							<Skeleton key={key} className="h-36 rounded-xl" />
						))}
					</div>

					<div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
						<Skeleton className="h-96 rounded-xl" />
						<Skeleton className="h-96 rounded-xl" />
					</div>
				</main>
			</div>
		</div>
	);
}
