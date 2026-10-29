import type { ReactNode } from "react";
import { ReadMoreText } from "@/components/ui/read-more-text";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";

/** En-tête commun aux pages catégorie, filière et UE. */
export function AcademicPageHeader({
	breadcrumb,
	title,
	description,
	actions,
	className,
}: {
	breadcrumb: BreadcrumbItem[];
	title: string;
	description: string;
	actions?: ReactNode;
	className?: string;
}) {
	return (
		<header className={className}>
			<Breadcrumb items={breadcrumb} />

			<div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
				<div className="min-w-0 max-w-2xl">
					<h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
						{title}
					</h1>

					<ReadMoreText text={description} className="mt-3" />
				</div>

				{actions ? <div className="shrink-0">{actions}</div> : null}
			</div>
		</header>
	);
}

export function AcademicPageHeaderSkeleton({
	withActions = false,
	className,
}: {
	withActions?: boolean;
	className?: string;
}) {
	return (
		<div className={cn(className)}>
			<Skeleton className="h-3 w-56" />

			<div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
				<div className="w-full max-w-2xl">
					<Skeleton className="h-8 w-2/3" />
					<Skeleton className="mt-3 h-4 w-full" />
					<Skeleton className="mt-2 h-4 w-4/5" />
				</div>

				{withActions ? (
					<div className="grid grid-cols-2 gap-2 sm:flex">
						<Skeleton className="h-10 w-full sm:w-40" />
						<Skeleton className="h-10 w-full sm:w-40" />
					</div>
				) : null}
			</div>
		</div>
	);
}
