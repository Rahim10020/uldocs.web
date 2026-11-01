"use client";

import { useState } from "react";
import { PROFILE_PAGE_SIZE } from "@/lib/profile";
import { useFavoriteDocuments } from "./use-favorite-documents";
import { useMyDocuments } from "./use-my-documents";

/** Listes « Mes documents » et « Enregistres » du profil, avec pagination. */
export function useProfileDocuments() {
	const [documentsPage, setDocumentsPage] = useState(1);
	const [favoritesPage, setFavoritesPage] = useState(1);

	const documents = useMyDocuments(documentsPage, PROFILE_PAGE_SIZE);
	const favorites = useFavoriteDocuments(favoritesPage, PROFILE_PAGE_SIZE);

	return {
		documents,
		favorites,
		documentsPage,
		setDocumentsPage,
		favoritesPage,
		setFavoritesPage,
	};
}
