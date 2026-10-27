import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

const SIMILAR_SKELETON_KEYS = [
	"similar-1",
	"similar-2",
	"similar-3",
	"similar-4",
] as const;

export function DocumentDetailSkeleton() {
	return (
		<Container fluid className="pb-24 pt-5 sm:pt-6 lg:pb-8 lg:pt-8">
			<div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
				<div className="min-w-0">
					<Skeleton className="hidden h-3 w-2/3 lg:block" />

					<div className="mt-3 flex flex-col lg:mt-4">
						<Skeleton className="order-1 h-4 w-52 lg:order-2 lg:mt-3" />
						<Skeleton className="order-2 mt-3 h-8 w-4/5 lg:order-1 lg:mt-0" />
						<Skeleton className="order-3 mt-2 h-3 w-60" />
					</div>

					<div className="mt-4 flex items-center gap-2">
						<Skeleton className="h-10 w-36" />
						<div className="ml-auto flex gap-1">
							<Skeleton className="size-10" />
							<Skeleton className="size-10" />
							<Skeleton className="size-10" />
						</div>
					</div>

					<div className="mt-4 rounded-md border border-black-10 bg-surface p-3 sm:p-4 lg:p-6">
						<div className="flex items-start gap-3">
							<Skeleton className="hidden h-80 w-12 shrink-0 lg:block" />
							<Skeleton className="mx-auto aspect-[612/792] w-full max-w-[900px] rounded-sm" />
						</div>
					</div>
				</div>

				<div className="hidden lg:block">
					<Skeleton className="h-5 w-40" />
					<div className="mt-4 flex flex-col gap-4">
						{SIMILAR_SKELETON_KEYS.map((key) => (
							<div key={key} className="flex gap-3">
								<Skeleton className="h-24 w-[78px] shrink-0" />
								<div className="flex-1 space-y-2 pt-1">
									<Skeleton className="h-3 w-1/2" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-4/5" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}
