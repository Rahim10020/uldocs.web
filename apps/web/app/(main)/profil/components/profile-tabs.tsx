"use client";

import { Bookmark, FileStack, FileUp } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useProfileDocuments } from "@/hooks/use-profile-documents";
import type { ProfileTab } from "@/lib/profile";
import { profileTabHref } from "@/lib/profile";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ProfileDocumentGrid } from "./profile-document-grid";

/** Onglets « Mes documents » et « Enregistrés » du profil. */
export function ProfileTabs({ activeTab }: { activeTab: ProfileTab }) {
	const {
		documents,
		favorites,
		documentsPage,
		setDocumentsPage,
		favoritesPage,
		setFavoritesPage,
	} = useProfileDocuments();

	const documentsCount = documents.data?.total ?? 0;
	const favoritesCount = favorites.data?.total ?? 0;

	return (
		<section aria-label="Contenu du profil" className="mt-10">
			<nav
				aria-label="Onglets du profil"
				className="flex gap-6 overflow-x-auto border-b border-black-10"
			>
				<TabLink
					active={activeTab === "documents"}
					href={profileTabHref("documents")}
					label="Mes documents"
					count={documentsCount}
				/>
				<TabLink
					active={activeTab === "enregistres"}
					href={profileTabHref("enregistres")}
					label="Enregistrés"
					count={favoritesCount}
				/>
			</nav>

			<div className="mt-6">
				{activeTab === "documents" ? (
					<ProfileDocumentGrid
						query={documents}
						page={documentsPage}
						onPageChange={setDocumentsPage}
						emptyState={{
							icon: FileStack,
							title: "Aucun document partagé",
							description:
								"Tes documents apparaîtront ici dès que tu en auras importé un.",
							action: {
								label: "Importer un document",
								href: routes.newDocument,
								icon: FileUp,
							},
						}}
					/>
				) : (
					<ProfileDocumentGrid
						query={favorites}
						page={favoritesPage}
						onPageChange={setFavoritesPage}
						onlyFavorites
						emptyState={{
							icon: Bookmark,
							title: "Aucun document enregistré",
							description:
								"Enregistre des documents depuis la recherche ou une fiche document.",
							action: {
								label: "Explorer les documents",
								href: routes.documents,
								icon: FileStack,
							},
						}}
					/>
				)}
			</div>
		</section>
	);
}

function TabLink({
	active,
	href,
	label,
	count,
}: {
	active: boolean;
	href: Route;
	label: string;
	count: number;
}) {
	return (
		<Link
			href={href}
			scroll={false}
			aria-current={active ? "page" : undefined}
			className={cn(
				"shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40",
				active
					? "border-black text-black"
					: "border-transparent text-black-50 hover:text-black-80",
			)}
		>
			{label} <span className="font-normal text-black-50">({count})</span>
		</Link>
	);
}
