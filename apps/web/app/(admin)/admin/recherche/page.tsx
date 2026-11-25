import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminSearchContent } from "./components/admin-search-content";
import { AdminSearchSkeleton } from "./components/admin-search-skeleton";

export const metadata: Metadata = {
	title: "Recherche — Administration ulDocs",
	description:
		"Recherche un utilisateur ou un document depuis l'espace d'administration d'ulDocs.",
};

export default function AdminSearchPage({
	searchParams,
}: {
	searchParams: Promise<{ q?: string | string[] }>;
}) {
	return (
		<Suspense fallback={<AdminSearchSkeleton />}>
			<AdminSearchContent searchParams={searchParams} />
		</Suspense>
	);
}
