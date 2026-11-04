"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { parseModerationSearchState } from "@/lib/moderation";

const FILTER_KEYS = ["statut", "motif"] as const;

/** Filtres de la file de modération, synchronisés avec l'URL. */
export function useReportsSearch() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const state = useMemo(
		() =>
			parseModerationSearchState(new URLSearchParams(searchParams.toString())),
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

	const setStatut = useCallback(
		(value: string) => {
			push((params) => {
				if (value) {
					params.set("statut", value);
				} else {
					params.delete("statut");
				}
			});
		},
		[push],
	);

	const setMotif = useCallback(
		(value: string) => {
			push((params) => {
				if (value) {
					params.set("motif", value);
				} else {
					params.delete("motif");
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

	const resetFilters = useCallback(() => {
		push((params) => {
			for (const key of FILTER_KEYS) {
				params.delete(key);
			}
		});
	}, [push]);

	return {
		state,
		setStatut,
		setMotif,
		setPage,
		resetFilters,
		hasFilters: Boolean(state.statut || state.motif),
	};
}
