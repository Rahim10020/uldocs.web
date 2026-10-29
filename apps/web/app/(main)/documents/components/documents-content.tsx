"use client";

import { useMemo } from "react";
import type { DocumentSearchParams } from "shared";
import { CategorySection } from "@/components/shared/category-section";
import {
	DocumentResults,
	DocumentResultsSkeleton,
} from "@/components/shared/document-results";
import { DocumentSection } from "@/components/shared/document-section";
import { SearchPagination } from "@/components/shared/search-pagination";
import { SearchResultsHeader } from "@/components/shared/search-results-header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useDocuments } from "@/hooks/use-documents";
import {
	DOCUMENTS_PAGE_SIZE,
	useDocumentsSearch,
} from "@/hooks/use-documents-search";
import { EmptyResults } from "./empty-results";
import { SearchFilters } from "./search-filters";

export function DocumentsContent() {
	const search = useDocumentsSearch();
	const { state } = search;

	const params = useMemo<DocumentSearchParams>(
		() => ({
			q: state.q.trim() || undefined,
			faculteId: state.faculteId,
			filiereId: state.filiereId,
			niveau: state.niveau,
			semestre: state.semestre,
			ueId: state.ueId,
			type: state.type,
			anneeAcademique: state.anneeAcademique,
			tri: search.effectiveTri,
			page: state.page,
			pageSize: DOCUMENTS_PAGE_SIZE,
		}),
		[search.effectiveTri, state],
	);

	const { data, isPending, isError, refetch } = useDocuments(params);

	const documents = data?.data ?? [];
	const total = data?.total ?? 0;
	const isEmpty = !isPending && !isError && total === 0;

	return (
		<div>
			<Container className="py-6 lg:py-8">
				<h1 className="sr-only">Recherche de documents</h1>

				<SearchFilters search={search} />

				{isError ? (
					<ErrorState onRetry={() => void refetch()} />
				) : isPending ? (
					<DocumentResultsSkeleton view={state.view} />
				) : isEmpty ? (
					<EmptyResults
						query={state.q}
						hasFilters={search.hasFilters}
						onSuggestion={search.setQuery}
						onResetFilters={search.resetFilters}
					/>
				) : (
					<>
						<SearchResultsHeader
							total={total}
							query={state.q}
							view={state.view}
							onViewChange={search.setView}
						/>

						<DocumentResults documents={documents} view={state.view} />

						<SearchPagination
							page={state.page}
							total={total}
							pageSize={DOCUMENTS_PAGE_SIZE}
							onPageChange={search.setPage}
						/>
					</>
				)}
			</Container>

			{isEmpty ? (
				<>
					<CategorySection />
					<DocumentSection
						title="Les plus téléchargés"
						subtitle="Les documents que les étudiants consultent le plus"
						tri="populaire"
					/>
				</>
			) : null}
		</div>
	);
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="mt-12 rounded-md border border-black-10 bg-surface p-8 text-center">
			<p className="text-sm text-black-70">
				Impossible de charger les résultats pour le moment.
			</p>
			<Button variant="secondary" className="mt-4" onClick={onRetry}>
				Réessayer
			</Button>
		</div>
	);
}
