"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/ui/search-bar";
import { routes } from "@/lib/routes";

/** Recherche de l'administration : redirige vers /admin/recherche?q=... */
export function AdminHeaderSearch() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isSearchPage = pathname === routes.adminSearch;
	const defaultValue = isSearchPage ? (searchParams.get("q") ?? "") : "";

	return (
		<SearchBar
			action={routes.adminSearch}
			ariaLabel="Rechercher dans l'administration"
			placeholder="Rechercher un utilisateur, un document…"
			defaultValue={defaultValue}
		/>
	);
}
