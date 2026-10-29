import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDetailContent } from "./components/category-detail-content";

export const metadata: Metadata = {
	title: "Catégorie — ulDocs",
	description:
		"Parcourez les filières d'une faculté, d'une école ou d'un institut de l'Université de Lomé.",
};

type CategoryPageProps = {
	params: Promise<{ id: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { id } = await params;
	const numericId = Number(id);

	if (!Number.isInteger(numericId) || numericId <= 0) {
		notFound();
	}

	return <CategoryDetailContent key={numericId} categoryId={numericId} />;
}
