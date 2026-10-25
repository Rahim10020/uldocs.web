"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DocumentDetail, DocumentListItem, Paginated } from "shared";
import { addFavorite, removeFavorite } from "@/lib/api/documents";
import { queryKeys } from "@/lib/query-keys";

type DocumentsCache = Paginated<DocumentListItem> | DocumentDetail;

type FavoriteVariables = {
	id: number;
	/** État visé : `true` pour ajouter, `false` pour retirer. */
	estFavori: boolean;
};

function patchCache(
	data: DocumentsCache | undefined,
	id: number,
	estFavori: boolean,
): DocumentsCache | undefined {
	if (!data) {
		return data;
	}

	if ("data" in data) {
		return {
			...data,
			data: data.data.map((document) =>
				document.id === id ? { ...document, estFavori } : document,
			),
		};
	}

	return data.id === id ? { ...data, estFavori } : data;
}

function removeFromFavorites(
	data: Paginated<DocumentListItem> | undefined,
	id: number,
): Paginated<DocumentListItem> | undefined {
	if (!data) {
		return data;
	}

	const nextData = data.data.filter((document) => document.id !== id);

	if (nextData.length === data.data.length) {
		return data;
	}

	return {
		...data,
		data: nextData,
		total: Math.max(0, data.total - 1),
	};
}

/** Ajoute ou retire un document des favoris, avec mise à jour optimiste. */
export function useFavoriteDocument() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, estFavori }: FavoriteVariables) =>
			estFavori ? addFavorite(id) : removeFavorite(id),
		onMutate: async ({ id, estFavori }) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.documents.all });

			const snapshot = queryClient.getQueriesData<DocumentsCache>({
				queryKey: queryKeys.documents.all,
			});

			queryClient.setQueriesData<DocumentsCache>(
				{ queryKey: queryKeys.documents.all },
				(data) => patchCache(data, id, estFavori),
			);

			if (!estFavori) {
				queryClient.setQueriesData<Paginated<DocumentListItem>>(
					{ queryKey: queryKeys.documents.favoritesRoot },
					(data) => removeFromFavorites(data, id),
				);
			}

			return { snapshot };
		},
		onError: (_error, _variables, context) => {
			for (const [key, data] of context?.snapshot ?? []) {
				queryClient.setQueryData(key, data);
			}
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: queryKeys.documents.all });
		},
	});
}
