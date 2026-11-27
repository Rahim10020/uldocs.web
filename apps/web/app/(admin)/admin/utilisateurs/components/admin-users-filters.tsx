"use client";

import { useCallback, useState } from "react";
import { FilterButton } from "@/components/shared/filter-button";
import { FilterField, FilterSheet } from "@/components/shared/filter-sheet";
import { ResetFiltersButton } from "@/components/shared/reset-filters-button";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { SearchSelect } from "@/components/ui/search-select";
import type { useAdminUsersSearch } from "@/hooks/use-admin-users-search";
import {
	CATEGORIE_CONTRIBUTION_OPTIONS,
	ROLE_OPTIONS,
	STATUT_UTILISATEUR_OPTIONS,
} from "@/lib/user";

/** Recherche et filtres de la liste admin des utilisateurs. */
export function AdminUsersFilters({
	search,
}: {
	search: ReturnType<typeof useAdminUsersSearch>;
}) {
	const [sheetOpen, setSheetOpen] = useState(false);
	const closeSheet = useCallback(() => setSheetOpen(false), []);
	const openSheet = () => setSheetOpen(true);

	return (
		<div className="mt-6">
			<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
				<SearchInput
					value={search.query}
					onChange={search.setQuery}
					ariaLabel="Rechercher un utilisateur par nom ou email"
					placeholder="Rechercher par nom ou email…"
					withLeadingIcon
					className="lg:max-w-md"
				/>

				<div className="hidden flex-wrap items-center gap-3 xl:flex">
					<SearchSelect
						label="Rôle"
						allLabel="Tous les rôles"
						value={search.role}
						options={ROLE_OPTIONS}
						onChange={search.setRole}
						className="w-40"
					/>
					<SearchSelect
						label="Contribution"
						allLabel="Toutes les contributions"
						value={search.contribution}
						options={CATEGORIE_CONTRIBUTION_OPTIONS}
						onChange={search.setContribution}
						className="w-48"
					/>
					<SearchSelect
						label="Statut"
						allLabel="Tous les statuts"
						value={search.statut}
						options={STATUT_UTILISATEUR_OPTIONS}
						onChange={search.setStatut}
						className="w-40"
					/>
					<ResetFiltersButton
						disabled={!search.hasFilters}
						onClick={search.resetFilters}
					/>
				</div>

				<FilterButton
					activeCount={search.activeFilterCount}
					label="Filtres"
					onClick={openSheet}
					className="w-full lg:w-auto xl:hidden"
				/>
			</div>

			<FilterSheet
				open={sheetOpen}
				onClose={closeSheet}
				title="Filtres"
				breakpoint="xl"
				footer={
					<>
						<Button
							variant="secondary"
							onClick={search.resetFilters}
							className="flex-1"
						>
							Réinitialiser
						</Button>
						<Button onClick={closeSheet} className="flex-2">
							Voir les résultats
						</Button>
					</>
				}
			>
				<FilterField label="Rôle">
					<SearchSelect
						label="Rôle"
						allLabel="Tous les rôles"
						value={search.role}
						options={ROLE_OPTIONS}
						onChange={search.setRole}
						inline
					/>
				</FilterField>

				<FilterField label="Contribution">
					<SearchSelect
						label="Contribution"
						allLabel="Toutes les contributions"
						value={search.contribution}
						options={CATEGORIE_CONTRIBUTION_OPTIONS}
						onChange={search.setContribution}
						inline
					/>
				</FilterField>

				<FilterField label="Statut">
					<SearchSelect
						label="Statut"
						allLabel="Tous les statuts"
						value={search.statut}
						options={STATUT_UTILISATEUR_OPTIONS}
						onChange={search.setStatut}
						inline
					/>
				</FilterField>

				{search.hasFilters ? (
					<ResetFiltersButton onClick={search.resetFilters} />
				) : null}
			</FilterSheet>
		</div>
	);
}
