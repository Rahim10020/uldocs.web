"use client";

import { useMemo, useState } from "react";
import { CATEGORIES_FACULTE, type CategorieFaculte } from "shared";
import {
	CategoryCard,
	CategoryCardSkeleton,
} from "@/components/shared/category-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
	SearchSelect,
	type SearchSelectOption,
} from "@/components/ui/search-select";
import { useAcademicTree } from "@/hooks/use-academic-tree";

const CATEGORY_TYPE_LABELS: Record<CategorieFaculte, string> = {
	faculte: "Facultés",
	ecole: "Écoles",
	institut: "Instituts",
};

const CATEGORY_TYPE_OPTIONS: SearchSelectOption[] = CATEGORIES_FACULTE.map(
	(value) => ({
		value,
		label: CATEGORY_TYPE_LABELS[value],
	}),
);

const SKELETON_KEYS = Array.from(
	{ length: 8 },
	(_, index) => `category-skeleton-${index}`,
);

export function CategoriesContent() {
	const { data, isPending, isError, refetch } = useAcademicTree();
	const [categorie, setCategorie] = useState<CategorieFaculte | "">("");

	const categories = data ?? [];
	const visibleCategories = useMemo(
		() =>
			categorie
				? categories.filter((item) => item.categorie === categorie)
				: categories,
		[categories, categorie],
	);

	return (
		<Container className="py-8 sm:py-12">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="min-w-0 max-w-2xl">
					<h1 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
						Toutes les catégories
					</h1>
					<p className="mt-2 text-sm text-black-60 sm:text-base">
						Explorez par facultés, écoles et instituts de l'Université de Lomé.
					</p>
				</div>

				<SearchSelect
					label="Type de catégorie"
					allLabel="Toutes les catégories"
					value={categorie}
					options={CATEGORY_TYPE_OPTIONS}
					onChange={(value) => setCategorie(value as CategorieFaculte | "")}
					className="w-full shrink-0 sm:w-52"
					disabled={isPending || isError}
				/>
			</div>

			{isError ? (
				<div className="mt-10 rounded-md border border-black-10 bg-surface p-8 text-center">
					<p className="text-sm text-black-70">
						Impossible de charger les catégories pour le moment.
					</p>
					<Button
						variant="secondary"
						className="mt-4"
						onClick={() => void refetch()}
					>
						Réessayer
					</Button>
				</div>
			) : isPending ? (
				<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
					{SKELETON_KEYS.map((key) => (
						<CategoryCardSkeleton key={key} />
					))}
				</div>
			) : visibleCategories.length === 0 ? (
				<div className="mt-8 rounded-md border border-black-10 bg-surface p-8 text-center">
					<p className="text-sm text-black-70">
						{categorie
							? "Aucune catégorie dans cette section."
							: "Aucune catégorie disponible pour le moment."}
					</p>
					{categorie ? (
						<Button
							variant="secondary"
							className="mt-4"
							onClick={() => setCategorie("")}
						>
							Afficher toutes les catégories
						</Button>
					) : null}
				</div>
			) : (
				<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
					{visibleCategories.map((category) => (
						<CategoryCard key={category.id} faculty={category} />
					))}
				</div>
			)}
		</Container>
	);
}
