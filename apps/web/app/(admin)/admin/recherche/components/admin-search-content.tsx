import { AdminSearchResults } from "./admin-search-results";

/** Lit `q` dans une boundary Suspense, jamais dans `page.tsx`. */
export async function AdminSearchContent({
	searchParams,
}: {
	searchParams: Promise<{ q?: string | string[] }>;
}) {
	const { q } = await searchParams;
	const query = (Array.isArray(q) ? q[0] : (q ?? "")).trim();

	return <AdminSearchResults query={query} />;
}
