"use client";

import { Check } from "lucide-react";
import { useCallback, useState } from "react";
import { FilterSheet } from "@/components/shared/filter-sheet";
import { SearchSelect } from "@/components/ui/search-select";
import type { useUeDocuments } from "@/hooks/use-ue-documents";
import {
  TRI_DOCUMENT_OPTIONS,
  TYPE_DOCUMENT_OPTIONS,
} from "@/lib/document-labels";
import { cn } from "@/lib/utils";
import { UeTypeChips } from "./ue-type-chips";

/** Barre de filtres desktop + chips mobile + feuille de filtres. */
export function UeFilters({
  search,
}: {
  search: ReturnType<typeof useUeDocuments>;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const openSheet = useCallback(() => setSheetOpen(true), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const canReset = search.hasFilters || Boolean(search.state.tri);

  const yearOptions = search.years.map((year) => ({
    value: year,
    label: year,
  }));

  return (
    <>
      <div className="hidden flex-wrap items-center gap-3 lg:flex">
        <SearchSelect
          label="Type"
          allLabel="Tous les types"
          value={search.state.type ?? ""}
          options={TYPE_DOCUMENT_OPTIONS}
          onChange={search.setType}
          className="w-44"
        />
        <SearchSelect
          label="Année"
          allLabel="Toutes les années"
          value={search.state.anneeAcademique ?? ""}
          options={yearOptions}
          onChange={search.setAnnee}
          className="w-40"
        />
        <SearchSelect
          label="Tri"
          value={search.effectiveTri}
          options={TRI_DOCUMENT_OPTIONS}
          onChange={search.setSortValue}
          className="w-48"
          showAllOption={false}
        />
        <button
          type="button"
          onClick={search.resetFilters}
          disabled={!canReset}
          className="cursor-pointer text-sm font-medium text-black underline decoration-black-20 underline-offset-4 transition-colors hover:text-primary disabled:cursor-default disabled:text-black-40"
        >
          Réinitialiser
        </button>
      </div>

      <UeTypeChips
        value={search.state.type}
        onChange={search.setType}
        onOpenFilters={openSheet}
        activeFilterCount={search.activeFilterCount}
      />

      <UeFilterSheet
        open={sheetOpen}
        onClose={closeSheet}
        search={search}
        yearOptions={yearOptions}
      />
    </>
  );
}

function UeFilterSheet({
  open,
  onClose,
  search,
  yearOptions,
}: {
  open: boolean;
  onClose: () => void;
  search: ReturnType<typeof useUeDocuments>;
  yearOptions: { value: string; label: string }[];
}) {
  const canReset = search.hasFilters || Boolean(search.state.tri);

  return (
    <FilterSheet open={open} onClose={onClose} title="Filtres">
      <fieldset>
        <legend className="mb-1 text-sm font-medium text-black-80">
          Type de document
        </legend>

        <div className="flex flex-col">
          <TypeFilterRow
            label="Tous les types"
            active={!search.state.type}
            onClick={() => search.setType("")}
          />
          {TYPE_DOCUMENT_OPTIONS.map((option) => (
            <TypeFilterRow
              key={option.value}
              label={option.label}
              active={search.state.type === option.value}
              onClick={() =>
                search.setType(
                  search.state.type === option.value ? "" : option.value,
                )
              }
            />
          ))}
        </div>
      </fieldset>

      <div className="space-y-1.5">
        <span className="text-sm font-medium text-black-80">
          Année académique
        </span>
        <SearchSelect
          label="Année"
          allLabel="Toutes les années"
          value={search.state.anneeAcademique ?? ""}
          options={yearOptions}
          onChange={search.setAnnee}
          inline
        />
      </div>

      <div className="space-y-1.5">
        <span className="text-sm font-medium text-black-80">Trier par</span>
        <SearchSelect
          label="Tri"
          value={search.effectiveTri}
          options={TRI_DOCUMENT_OPTIONS}
          onChange={search.setSortValue}
          showAllOption={false}
          inline
        />
      </div>

      {canReset ? (
        <button
          type="button"
          onClick={search.resetFilters}
          className="cursor-pointer text-sm font-medium text-black underline decoration-black-20 underline-offset-4 transition-colors hover:text-primary"
        >
          Réinitialiser les filtres
        </button>
      ) : null}
    </FilterSheet>
  );
}

function TypeFilterRow({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className="flex min-h-10 cursor-pointer items-center justify-between gap-4 rounded px-1 text-left text-sm text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
    >
      <span>{label}</span>
      <span
        aria-hidden
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors",
          active
            ? "border-primary bg-primary text-white"
            : "border-black-30 bg-white",
        )}
      >
        {active ? <Check className="size-3.5" /> : null}
      </span>
    </button>
  );
}
