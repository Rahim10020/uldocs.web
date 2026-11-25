import { Skeleton } from "@/components/ui/skeleton";

/** Squelette du tableau de bord admin. */
export function AdminDashboardSkeleton() {
	return (
		<>
			<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{Array.from(
					{ length: 4 },
					(_, index) => `admin-dashboard-stat-${index}`,
				).map((key) => (
					<Skeleton key={key} className="h-36 rounded-xl" />
				))}
			</div>

			<div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
				<Skeleton className="h-96 rounded-xl" />
				<Skeleton className="h-96 rounded-xl" />
			</div>
		</>
	);
}
