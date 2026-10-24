"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
	type NiveauScolarite,
	ORDRE_NIVEAU,
	TRIS_DOCUMENTS,
	type TriDocuments,
	TYPES_DOCUMENT,
	type TypeDocument,
} from "shared";
import { useAcademicTree } from "@/hooks/use-academic-tree";

/** Taille de page de la recherche (contrat API : 20 par défaut). */
export const DOCUMENTS_PAGE_SIZE = 20;

const FILTER_KEYS = [
	"faculteId",
	"filiereId",
	"niveau",
	"semestre",
	"ueId",
	"type",
	"anneeAcademique",
] as const;

export type SearchView = "grid" | "list";

export type DocumentsSearchState = {
	q: string;
	faculteId?: number;
	filiereId?: number;
	niveau?: string;
	semestre?: string;
	ueId?: number;
	type?: TypeDocument;
	anneeAcademique?: string;
	tri?: TriDocuments;
	page: number;
	view: SearchView;
};

function readInt(value: string | null): number | undefined {
	if (!value) {
		return undefined;
	}

	const parsed = Number(value);

	return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function readString(value: string | null): string | undefined {
	return value === null || value === "" ? undefined : value;
}

/** Lit l'état de recherche depuis l'URL. Exporté pour être testable. */
export function parseDocumentsSearchState(
	searchParams: URLSearchParams,
): DocumentsSearchState {
	const type = searchParams.get("type");
	const tri = searchParams.get("tri");
	const view = searchParams.get("view");

	return {
		q: searchParams.get("q") ?? "",
		faculteId: readInt(searchParams.get("faculteId")),
		filiereId: readInt(searchParams.get("filiereId")),
		niveau: readString(searchParams.get("niveau")),
		semestre: readString(searchParams.get("semestre")),
		ueId: readInt(searchParams.get("ueId")),
		type:
			type && TYPES_DOCUMENT.includes(type as TypeDocument)
				? (type as TypeDocument)
				: undefined,
		anneeAcademique: readString(searchParams.get("anneeAcademique")),
		tri:
			tri && TRIS_DOCUMENTS.includes(tri as TriDocuments)
				? (tri as TriDocuments)
				: undefined,
		page: readInt(searchParams.get("page")) ?? 1,
		view: view === "list" ? "list" : "grid",
	};
}

/** Cinq dernières années académiques, la plus récente en premier. */
export function getAcademicYears(count = 5, now = new Date()): string[] {
	const startYear =
		now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;

	return Array.from(
		{ length: count },
		(_, index) => `${startYear - index}-${startYear - index + 1}`,
	);
}

function niveauxOf(facultes: { filieres: { niveaux: { nom: string }[] }[] }[]) {
	return facultes.flatMap((faculte) =>
		faculte.filieres.flatMap((filiere) =>
			filiere.niveaux.map((niveau) => niveau.nom),
		),
	);
}

function sortNiveaux(values: string[]): string[] {
	return [...new Set(values)].sort(
		(a, b) =>
			(ORDRE_NIVEAU[a as NiveauScolarite] ?? 99) -
			(ORDRE_NIVEAU[b as NiveauScolarite] ?? 99),
	);
}

function sortSemestres(values: string[]): string[] {
	return [...new Set(values)].sort(
		(a, b) => Number(a.slice(1)) - Number(b.slice(1)),
	);
}

/**
 * État de la page /documents : lit et écrit les paramètres d'URL,
 * et dérive les options de filtres depuis l'arbre académique.
 */
export function useDocumentsSearch() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const academicTree = useAcademicTree();

	const state = useMemo(
		() =>
			parseDocumentsSearchState(new URLSearchParams(searchParams.toString())),
		[searchParams],
	);

	const push = useCallback(
		(mutate: (params: URLSearchParams) => void, resetPage = true) => {
			const next = new URLSearchParams(searchParams.toString());

			mutate(next);

			if (resetPage) {
				next.delete("page");
			}

			const query = next.toString();
			const href = query ? `${pathname}?${query}` : pathname;

			router.push(href as Route, { scroll: false });
		},
		[pathname, router, searchParams],
	);

	const setFaculte = useCallback(
		(value: string) => {
			push((params) => {
				if (value) {
					params.set("faculteId", value);
				} else {
					params.delete("faculteId");
				}

				params.delete("filiereId");
				params.delete("niveau");
				params.delete("semestre");
				params.delete("ueId");
			});
		},
		[push],
	);

	const setNiveau = useCallback(
		(value: string) => {
			push((params) => {
				if (value) {
					params.set("niveau", value);
				} else {
					params.delete("niveau");
				}

				params.delete("semestre");
			});
		},
		[push],
	);

	const setSemestre = useCallback(
		(value: string) => {
			push((params) => {
				if (value) {
					params.set("semestre", value);
				} else {
					params.delete("semestre");
				}
			});
		},
		[push],
	);

	const setType = useCallback(
		(value: string) => {
			push((params) => {
				if (value) {
					params.set("type", value);
				} else {
					params.delete("type");
				}
			});
		},
		[push],
	);

	const setAnnee = useCallback(
		(value: string) => {
			push((params) => {
				if (value) {
					params.set("anneeAcademique", value);
				} else {
					params.delete("anneeAcademique");
				}
			});
		},
		[push],
	);

	const setSort = useCallback(
		(tri: TriDocuments) => {
			push((params) => params.set("tri", tri));
		},
		[push],
	);

	const setQuery = useCallback(
		(q: string) => {
			push((params) => {
				if (q) {
					params.set("q", q);
				} else {
					params.delete("q");
				}
			});
		},
		[push],
	);

	const setPage = useCallback(
		(page: number) => {
			const next = new URLSearchParams(searchParams.toString());

			if (page <= 1) {
				next.delete("page");
			} else {
				next.set("page", String(page));
			}

			const query = next.toString();
			const href = query ? `${pathname}?${query}` : pathname;

			router.push(href as Route);
		},
		[pathname, router, searchParams],
	);

	const setView = useCallback(
		(view: SearchView) => {
			push((params) => params.set("view", view), false);
		},
		[push],
	);

	const resetFilters = useCallback(() => {
		push((params) => {
			for (const key of FILTER_KEYS) {
				params.delete(key);
			}

			params.delete("tri");
		});
	}, [push]);

	const faculties = academicTree.data ?? [];

	const selectedFaculty = faculties.find(
		(faculty) => faculty.id === state.faculteId,
	);

	const niveaux = useMemo(
		() =>
			sortNiveaux(niveauxOf(selectedFaculty ? [selectedFaculty] : faculties)),
		[faculties, selectedFaculty],
	);

	const semestres = useMemo(() => {
		const sourceNiveaux = (
			selectedFaculty
				? selectedFaculty.filieres
				: faculties.flatMap((f) => f.filieres)
		).flatMap((filiere) => filiere.niveaux);

		return sortSemestres(
			sourceNiveaux
				.filter((niveau) => !state.niveau || niveau.nom === state.niveau)
				.flatMap((niveau) => niveau.semestres.map((semestre) => semestre.nom)),
		);
	}, [faculties, selectedFaculty, state.niveau]);

	const years = useMemo(() => getAcademicYears(), []);

	const activeFilterCount = FILTER_KEYS.filter(
		(key) => state[key] !== undefined,
	).length;

	const effectiveTri = state.tri ?? (state.q.trim() ? "pertinence" : "recent");

	const setSortValue = useCallback(
		(value: string) => {
			const tri = TRIS_DOCUMENTS.includes(value as TriDocuments)
				? (value as TriDocuments)
				: effectiveTri;

			setSort(tri);
		},
		[effectiveTri, setSort],
	);

	return {
		state,
		effectiveTri,
		faculties,
		niveaux,
		semestres,
		years,
		activeFilterCount,
		hasFilters: activeFilterCount > 0,
		setFaculte,
		setNiveau,
		setSemestre,
		setType,
		setAnnee,
		setSort,
		setSortValue,
		setQuery,
		setPage,
		setView,
		resetFilters,
	};
}
