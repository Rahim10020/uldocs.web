"use client";

import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilterButton } from "@/components/shared/filter-button";
import { FilterField, FilterSheet } from "@/components/shared/filter-sheet";
import { ResetFiltersButton } from "@/components/shared/reset-filters-button";
import { Button } from "@/components/ui/button";
import { SearchSelect } from "@/components/ui/search-select";
import type { useDocumentsSearch } from "@/hooks/use-documents-search";
import { formatNiveau, formatSemestre } from "@/lib/academic-labels";
import {
  TRI_DOCUMENT_LABELS,
  TRI_DOCUMENT_OPTIONS,
  TYPE_DOCUMENT_OPTIONS,
} from "@/lib/document-labels";

type SearchFiltersProps = {
  search: ReturnType<typeof useDocumentsSearch>;
};

/** Filtres de la page résultats : barre desktop, chips mobile et feuille plein écran. */
export function SearchFilters({ search }: SearchFiltersProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const facultyOptions = search.faculties.map((faculty) => ({
    value: String(faculty.id),
    label: faculty.nom,
  }));

  const niveauOptions = search.niveaux.map((niveau) => ({
    value: niveau,
    label: formatNiveau(niveau),
  }));

  const semestreOptions = search.semestres.map((semestre) => ({
    value: semestre,
    label: formatSemestre(semestre),
  }));

  const yearOptions = search.years.map((year) => ({
    value: year,
    label: year,
  }));

  return (
    <>
      <div className="hidden flex-wrap items-center gap-3 lg:flex">
        <SearchSelect
          label="Faculté"
          allLabel="Facultés/E/I"
          value={search.state.faculteId?.toString() ?? ""}
          options={facultyOptions}
          onChange={search.setFaculte}
          className="w-56"
        />
        <SearchSelect
          label="Niveau"
          value={search.state.niveau ?? ""}
          options={niveauOptions}
          onChange={search.setNiveau}
          className="w-44"
          disabled={search.niveaux.length === 0}
        />
        <SearchSelect
          label="Semestre"
          value={search.state.semestre ?? ""}
          options={semestreOptions}
          onChange={search.setSemestre}
          className="w-44"
          disabled={search.semestres.length === 0}
        />
        <SearchSelect
          label="Type"
          value={search.state.type ?? ""}
          options={TYPE_DOCUMENT_OPTIONS}
          onChange={search.setType}
          className="w-36"
        />
        <SearchSelect
          label="Année"
          value={search.state.anneeAcademique ?? ""}
          options={yearOptions}
          onChange={search.setAnnee}
          className="w-36"
        />
        <SearchSelect
          label="Tri"
          allLabel={TRI_DOCUMENT_LABELS[search.effectiveTri]}
          value={search.state.tri ?? ""}
          options={TRI_DOCUMENT_OPTIONS}
          onChange={search.setSortValue}
          className="w-40"
        />
        <ResetFiltersButton
          onClick={search.resetFilters}
          disabled={!search.hasFilters && !search.state.tri}
        />
      </div>

      <MobileFilterRow
        search={search}
        yearOptions={yearOptions}
        onOpenSheet={() => setSheetOpen(true)}
      />

      <MobileFilterSheet
        open={sheetOpen}
        onClose={closeSheet}
        search={search}
        options={{
          faculties: facultyOptions,
          niveaux: niveauOptions,
          semestres: semestreOptions,
          types: TYPE_DOCUMENT_OPTIONS,
          years: yearOptions,
        }}
      />
    </>
  );
}

function MobileFilterRow({
  search,
  yearOptions,
  onOpenSheet,
}: {
  search: ReturnType<typeof useDocumentsSearch>;
  yearOptions: { value: string; label: string }[];
  onOpenSheet: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const update = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const maxScroll = element.scrollWidth - element.clientWidth;
    setCanScrollNext(element.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update);

    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [update]);

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative lg:hidden">
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto pb-1 pr-12 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        <FilterButton
          activeCount={search.activeFilterCount}
          onClick={onOpenSheet}
          className="size-10 shrink-0"
        />

        <SearchSelect
          label="Tri"
          allLabel={TRI_DOCUMENT_LABELS[search.effectiveTri]}
          value={search.state.tri ?? ""}
          options={TRI_DOCUMENT_OPTIONS}
          onChange={search.setSortValue}
          className="w-36 shrink-0"
        />
        <SearchSelect
          label="Année"
          value={search.state.anneeAcademique ?? ""}
          options={yearOptions}
          onChange={search.setAnnee}
          className="w-32 shrink-0"
        />
        <SearchSelect
          label="Type"
          value={search.state.type ?? ""}
          options={TYPE_DOCUMENT_OPTIONS}
          onChange={search.setType}
          className="w-32 shrink-0"
        />

        {canScrollNext ? (
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Afficher plus de filtres"
            className="absolute right-0 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black-40 bg-white text-black shadow-sm transition-colors hover:text-primary"
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

type SheetOptions = {
  faculties: { value: string; label: string }[];
  niveaux: { value: string; label: string }[];
  semestres: { value: string; label: string }[];
  types: { value: string; label: string }[];
  years: { value: string; label: string }[];
};

function MobileFilterSheet({
  open,
  onClose,
  search,
  options,
}: {
  open: boolean;
  onClose: () => void;
  search: ReturnType<typeof useDocumentsSearch>;
  options: SheetOptions;
}) {
  return (
    <FilterSheet
      open={open}
      onClose={onClose}
      title="Filtres"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={search.resetFilters}
            className="flex-1"
          >
            Réinitialiser
          </Button>
          <Button onClick={onClose} className="flex-2">
            Voir les résultats
          </Button>
        </>
      }
    >
      <FilterField label="Facultés/E/I">
        <SearchSelect
          label="Faculté"
          allLabel="Toutes les facultés"
          value={search.state.faculteId?.toString() ?? ""}
          options={options.faculties}
          onChange={search.setFaculte}
          inline
        />
      </FilterField>

      <FilterField label="Niveau">
        <SearchSelect
          label="Niveau"
          allLabel="Tous les niveaux"
          value={search.state.niveau ?? ""}
          options={options.niveaux}
          onChange={search.setNiveau}
          disabled={search.niveaux.length === 0}
          inline
        />
      </FilterField>

      <FilterField label="Semestre">
        <SearchSelect
          label="Semestre"
          allLabel="Tous les semestres"
          value={search.state.semestre ?? ""}
          options={options.semestres}
          onChange={search.setSemestre}
          disabled={search.semestres.length === 0}
          inline
        />
      </FilterField>

      <FilterField label="Type">
        <SearchSelect
          label="Type"
          allLabel="Tous les types"
          value={search.state.type ?? ""}
          options={options.types}
          onChange={search.setType}
          inline
        />
      </FilterField>

      <FilterField label="Année">
        <SearchSelect
          label="Année"
          allLabel="Toutes les années"
          value={search.state.anneeAcademique ?? ""}
          options={options.years}
          onChange={search.setAnnee}
          inline
        />
      </FilterField>
    </FilterSheet>
  );
}
