"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { TRIS_DOCUMENTS, type TriDocuments } from "shared";
import { useDocuments } from "@/hooks/use-documents";
import { getAcademicYears } from "@/lib/document-search";
import {
	parseUeDocumentsSearchState,
	toUeDocumentsParams,
} from "@/lib/ue-documents-search";

/**
 * État de la page UE : filtres, tri, pagination et affichage.
 * L'ueId est verrouillé sur celui de la route.
 */
export function useUeDocuments(ueId: number) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const state = useMemo(
		() =>
			parseUeDocumentsSearchState(new URLSearchParams(searchParams.toString())),
		[searchParams],
	);

	const params = useMemo(() => toUeDocumentsParams(ueId, state), [ueId, state]);

	const query = useDocuments(params);

	const effectiveTri = state.tri ?? "recent";
	const years = useMemo(() => getAcademicYears(), []);

	const push = useCallback(
		(mutate: (params: URLSearchParams) => void, resetPage = true) => {
			const next = new URLSearchParams(searchParams.toString());

			mutate(next);

			if (resetPage) {
				next.delete("page");
			}

			const queryString = next.toString();
			const href = queryString ? `${pathname}?${queryString}` : pathname;

			router.push(href as Route, { scroll: false });
		},
		[pathname, router, searchParams],
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

	const setSortValue = useCallback(
		(value: string) => {
			const tri = TRIS_DOCUMENTS.includes(value as TriDocuments)
				? (value as TriDocuments)
				: effectiveTri;

			setSort(tri);
		},
		[effectiveTri, setSort],
	);

	const setPage = useCallback(
		(page: number) => {
			const next = new URLSearchParams(searchParams.toString());

			if (page <= 1) {
				next.delete("page");
			} else {
				next.set("page", String(page));
			}

			const queryString = next.toString();
			const href = queryString ? `${pathname}?${queryString}` : pathname;

			router.push(href as Route);
		},
		[pathname, router, searchParams],
	);

	const setView = useCallback(
		(view: "grid" | "list") => {
			push((params) => params.set("view", view), false);
		},
		[push],
	);

	const resetFilters = useCallback(() => {
		push((params) => {
			params.delete("type");
			params.delete("anneeAcademique");
			params.delete("tri");
		});
	}, [push]);

	const activeFilterCount = [state.type, state.anneeAcademique].filter(
		Boolean,
	).length;

	return {
		state,
		query,
		effectiveTri,
		years,
		activeFilterCount,
		hasFilters: activeFilterCount > 0,
		setType,
		setAnnee,
		setSortValue,
		setPage,
		setView,
		resetFilters,
	};
}
