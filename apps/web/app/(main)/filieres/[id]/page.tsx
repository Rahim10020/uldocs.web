import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
	FiliereDetailContent,
	FiliereDetailSkeleton,
} from "./components/filiere-detail-content";

export const metadata: Metadata = {
	title: "Filière — ulDocs",
	description:
		"Parcourez les unités d'enseignement d'une filière de l'Université de Lomé.",
};

type FilierePageProps = {
	params: Promise<{ id: string }>;
};

export default async function FilierePage({ params }: FilierePageProps) {
	const { id } = await params;
	const numericId = Number(id);

	if (!Number.isInteger(numericId) || numericId <= 0) {
		notFound();
	}

	return (
		<Suspense fallback={<FiliereDetailSkeleton />}>
			<FiliereDetailContent key={numericId} filiereId={numericId} />
		</Suspense>
	);
}
