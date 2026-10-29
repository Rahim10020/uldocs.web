"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
	type AcademicFiliere,
	listFiliereSemestres,
} from "@/lib/academic-navigation";
import {
	parseFiliereFilters,
	resolveFiliereFilters,
} from "@/lib/filiere-filters";

/**
 * Filtres niveau/semestre de la page filière.
 * Par défaut, aucun filtre : tous les niveaux et semestres sont affichés.
 */
export function useFiliereFilters(filiere: AcademicFiliere | undefined) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const rawState = useMemo(
		() => parseFiliereFilters(new URLSearchParams(searchParams.toString())),
		[searchParams],
	);

	const state = useMemo(
		() => resolveFiliereFilters(filiere, rawState),
		[filiere, rawState],
	);

	const niveaux = filiere?.niveaux ?? [];

	const semestres = useMemo(
		() => (filiere ? listFiliereSemestres(filiere, state.niveau) : []),
		[filiere, state.niveau],
	);

	const push = useCallback(
		(mutate: (params: URLSearchParams) => void) => {
			const next = new URLSearchParams(searchParams.toString());

			mutate(next);

			const query = next.toString();
			const href = query ? `${pathname}?${query}` : pathname;

			router.push(href as Route, { scroll: false });
		},
		[pathname, router, searchParams],
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

	const resetFilters = useCallback(() => {
		push((params) => {
			params.delete("niveau");
			params.delete("semestre");
		});
	}, [push]);

	return {
		state,
		niveaux,
		semestres,
		hasFilters: Boolean(state.niveau ?? state.semestre),
		setNiveau,
		setSemestre,
		resetFilters,
	};
}
