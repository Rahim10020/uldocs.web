"use client";

import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { TRIS_DOCUMENTS, TYPES_DOCUMENT } from "shared";
import { Button } from "@/components/ui/button";
import { SearchSelect } from "@/components/ui/search-select";
import type { useDocumentsSearch } from "@/hooks/use-documents-search";
import { formatNiveau, formatSemestre } from "@/lib/academic-labels";
import {
  TRI_DOCUMENT_LABELS,
  TYPE_DOCUMENT_LABELS,
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

  const typeOptions = TYPES_DOCUMENT.map((type) => ({
    value: type,
    label: TYPE_DOCUMENT_LABELS[type],
  }));

  const yearOptions = search.years.map((year) => ({
    value: year,
    label: year,
  }));

  const triOptions = TRIS_DOCUMENTS.map((tri) => ({
    value: tri,
    label: TRI_DOCUMENT_LABELS[tri],
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
          options={typeOptions}
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
          options={triOptions}
          onChange={search.setSortValue}
          className="w-40"
        />
        <button
          type="button"
          onClick={search.resetFilters}
          disabled={!search.hasFilters && !search.state.tri}
          className="cursor-pointer text-sm font-medium text-black underline decoration-black-20 underline-offset-4 transition-colors hover:text-primary disabled:cursor-default disabled:text-black-40"
        >
          Réinitialiser
        </button>
      </div>

      <MobileFilterRow
        search={search}
        triOptions={triOptions}
        yearOptions={yearOptions}
        typeOptions={typeOptions}
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
          types: typeOptions,
          years: yearOptions,
        }}
      />
    </>
  );
}

function MobileFilterRow({
  search,
  triOptions,
  yearOptions,
  typeOptions,
  onOpenSheet,
}: {
  search: ReturnType<typeof useDocumentsSearch>;
  triOptions: { value: string; label: string }[];
  yearOptions: { value: string; label: string }[];
  typeOptions: { value: string; label: string }[];
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
        <button
          type="button"
          onClick={onOpenSheet}
          aria-label={
            search.activeFilterCount > 0
              ? `Filtres (${search.activeFilterCount} actifs)`
              : "Ouvrir les filtres"
          }
          className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded border border-black-40 bg-white text-black transition-colors hover:border-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
        >
          <SlidersHorizontal aria-hidden className="size-5" />
          {search.activeFilterCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {search.activeFilterCount}
            </span>
          ) : null}
        </button>

        <SearchSelect
          label="Tri"
          allLabel={TRI_DOCUMENT_LABELS[search.effectiveTri]}
          value={search.state.tri ?? ""}
          options={triOptions}
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
          options={typeOptions}
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
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Filtres de recherche"
      className="fixed inset-0 z-60 lg:hidden"
    >
      <button
        type="button"
        aria-label="Fermer les filtres"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black-50"
      />

      <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-black-10 px-5 py-4">
          <h2 className="text-lg font-semibold text-black">Filtres</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex size-9 cursor-pointer items-center justify-center rounded text-black-60 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
          >
            <X aria-hidden className="size-6" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <SheetField label="Facultés/E/I">
            <SearchSelect
              label="Faculté"
              allLabel="Toutes les facultés"
              value={search.state.faculteId?.toString() ?? ""}
              options={options.faculties}
              onChange={search.setFaculte}
            />
          </SheetField>

          <SheetField label="Niveau">
            <SearchSelect
              label="Niveau"
              allLabel="Tous les niveaux"
              value={search.state.niveau ?? ""}
              options={options.niveaux}
              onChange={search.setNiveau}
              disabled={search.niveaux.length === 0}
            />
          </SheetField>

          <SheetField label="Semestre">
            <SearchSelect
              label="Semestre"
              allLabel="Tous les semestres"
              value={search.state.semestre ?? ""}
              options={options.semestres}
              onChange={search.setSemestre}
              disabled={search.semestres.length === 0}
            />
          </SheetField>

          <SheetField label="Type">
            <SearchSelect
              label="Type"
              allLabel="Tous les types"
              value={search.state.type ?? ""}
              options={options.types}
              onChange={search.setType}
            />
          </SheetField>

          <SheetField label="Année">
            <SearchSelect
              label="Année"
              allLabel="Toutes les années"
              value={search.state.anneeAcademique ?? ""}
              options={options.years}
              onChange={search.setAnnee}
            />
          </SheetField>
        </div>

        <div className="flex gap-3 border-t border-black-10 px-5 py-4">
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
        </div>
      </div>
    </div>
  );
}

function SheetField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-sm font-medium text-black-80">{label}</span>
      {children}
    </div>
  );
}
