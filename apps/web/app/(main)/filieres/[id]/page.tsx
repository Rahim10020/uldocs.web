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

export default function FilierePage({ params }: FilierePageProps) {
	return (
		<Suspense fallback={<FiliereDetailSkeleton />}>
			<FiliereRoute params={params} />
		</Suspense>
	);
}

async function FiliereRoute({ params }: FilierePageProps) {
	const { id } = await params;
	const numericId = Number(id);

	if (!Number.isInteger(numericId) || numericId <= 0) {
		notFound();
	}

	return <FiliereDetailContent key={numericId} filiereId={numericId} />;
}
