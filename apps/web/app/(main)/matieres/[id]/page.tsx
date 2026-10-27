import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type MatierePageProps = {
	params: Promise<{ id: string }>;
};

export default function MatierePage({ params }: MatierePageProps) {
	return (
		<Suspense fallback={<MatiereSkeleton />}>
			<MatiereContent params={params} />
		</Suspense>
	);
}

async function MatiereContent({ params }: MatierePageProps) {
	const { id } = await params;

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-12">
			<h1 className="text-2xl font-bold text-black">Matière #{id}</h1>
			<p className="mt-2 text-black-60">Liste des documents à venir.</p>
		</div>
	);
}

function MatiereSkeleton() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-12">
			<Skeleton className="h-8 w-48" />
			<Skeleton className="mt-2 h-4 w-64" />
		</div>
	);
}
