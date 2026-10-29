import type { DocumentListItem } from "shared";
import {
	DocumentCard,
	DocumentCardSkeleton,
} from "@/components/shared/document-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SearchView } from "@/lib/document-search";

/** Résultats documents en grille ou en liste, avec leur skeleton. */
export function DocumentResults({
	documents,
	view,
	showAcademicContext = true,
}: {
	documents: DocumentListItem[];
	view: SearchView;
	showAcademicContext?: boolean;
}) {
	if (view === "list") {
		return (
			<div className="mt-6 space-y-4">
				{documents.map((document) => (
					<DocumentCard
						key={document.id}
						document={document}
						variant="search-list"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
			{documents.map((document) => (
				<DocumentCard
					key={document.id}
					document={document}
					variant="search-grid"
					showAcademicContext={showAcademicContext}
				/>
			))}
		</div>
	);
}

export function DocumentResultsSkeleton({ view }: { view: SearchView }) {
	return (
		<div>
			<div className="mt-8 flex items-center justify-between">
				<Skeleton className="h-4 w-48" />
				<Skeleton className="h-8 w-16" />
			</div>

			{view === "list" ? (
				<div className="mt-6 space-y-4">
					{Array.from(
						{ length: 5 },
						(_, index) => `list-skeleton-${index}`,
					).map((key) => (
						<DocumentCardSkeleton key={key} variant="search-list" />
					))}
				</div>
			) : (
				<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
					{Array.from(
						{ length: 10 },
						(_, index) => `grid-skeleton-${index}`,
					).map((key) => (
						<DocumentCardSkeleton key={key} variant="search-grid" />
					))}
				</div>
			)}
		</div>
	);
}
