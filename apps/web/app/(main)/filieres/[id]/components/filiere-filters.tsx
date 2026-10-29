"use client";

import { SearchSelect } from "@/components/ui/search-select";
import type { useFiliereFilters } from "@/hooks/use-filiere-filters";
import { formatNiveau, formatSemestre } from "@/lib/academic-labels";

/** Sélecteurs niveau/semestre de la page filière. */
export function FiliereFilters({
	search,
}: {
	search: ReturnType<typeof useFiliereFilters>;
}) {
	const niveauOptions = search.niveaux.map((niveau) => ({
		value: niveau.nom,
		label: formatNiveau(niveau.nom),
	}));

	const semestreOptions = search.semestres.map((semestre) => ({
		value: semestre.nom,
		label: formatSemestre(semestre.nom),
	}));

	return (
		<div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
			<SearchSelect
				label="Niveau"
				value={search.state.niveau ?? ""}
				options={niveauOptions}
				onChange={search.setNiveau}
				className="w-full sm:w-40"
				disabled={search.niveaux.length === 0}
			/>
			<SearchSelect
				label="Semestre"
				value={search.state.semestre ?? ""}
				options={semestreOptions}
				onChange={search.setSemestre}
				className="w-full sm:w-40"
				disabled={search.semestres.length === 0}
			/>
		</div>
	);
}
