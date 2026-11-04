"use client";

import { SearchSelect } from "@/components/ui/search-select";
import type { useReportsSearch } from "@/hooks/use-reports-search";
import {
	MOTIF_SIGNALEMENT_OPTIONS,
	STATUT_SIGNALEMENT_OPTIONS,
} from "@/lib/reports";

type ModerationFiltersProps = {
	search: ReturnType<typeof useReportsSearch>;
};

/** Filtres de statut et de motif de la file de modération. */
export function ModerationFilters({ search }: ModerationFiltersProps) {
	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-6">
			<div className="flex items-center gap-1.5 sm:gap-2">
				<span className="text-sm font-medium text-black">Statut :</span>
				<SearchSelect
					label="Statut"
					allLabel="Tous"
					value={search.state.statut ?? ""}
					options={STATUT_SIGNALEMENT_OPTIONS}
					onChange={search.setStatut}
					className="w-24 sm:w-40"
				/>
			</div>
			<div className="flex items-center gap-1.5 sm:gap-2">
				<span className="text-sm font-medium text-black">Motif :</span>
				<SearchSelect
					label="Motif"
					allLabel="Tous"
					value={search.state.motif ?? ""}
					options={MOTIF_SIGNALEMENT_OPTIONS}
					onChange={search.setMotif}
					className="w-28 sm:w-48"
				/>
			</div>
		</div>
	);
}
