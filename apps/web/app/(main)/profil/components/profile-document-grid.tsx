"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import { type LucideIcon, RefreshCw } from "lucide-react";
import type { Route } from "next";
import type { DocumentListItem, Paginated } from "shared";
import {
	DocumentCard,
	DocumentCardSkeleton,
} from "@/components/shared/document-card";
import { SearchPagination } from "@/components/shared/search-pagination";
import { Button, ButtonLink } from "@/components/ui/button";
import { PROFILE_PAGE_SIZE } from "@/lib/profile";

const PROFILE_GRID_SKELETON_KEYS = ["one", "two", "three", "four"] as const;

export type DocumentsQuery = UseQueryResult<Paginated<DocumentListItem>>;

export type ProfileEmptyState = {
	icon: LucideIcon;
	title: string;
	description: string;
	action?: {
		label: string;
		href: Route;
		icon: LucideIcon;
	};
};

/** Grille paginée de documents utilisée par le profil privé et public. */
export function ProfileDocumentGrid({
	query,
	page,
	onPageChange,
	emptyState,
	onlyFavorites = false,
}: {
	query: DocumentsQuery;
	page: number;
	onPageChange: (page: number) => void;
	emptyState: ProfileEmptyState;
	onlyFavorites?: boolean;
}) {
	if (query.isError) {
		return (
			<div className="rounded-md border border-black-10 bg-surface p-8 text-center">
				<p className="text-sm text-black-70">
					Impossible de charger ces documents pour le moment.
				</p>
				<Button
					variant="secondary"
					className="mt-4"
					onClick={() => void query.refetch()}
				>
					<RefreshCw aria-hidden className="size-4" />
					Réessayer
				</Button>
			</div>
		);
	}

	if (query.isPending) {
		return <ProfileGridSkeleton />;
	}

	const documents = (query.data?.data ?? []).filter(
		(document) => !onlyFavorites || document.estFavori,
	);
	const total = query.data?.total ?? documents.length;

	if (documents.length === 0) {
		return <ProfileEmpty {...emptyState} />;
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
				{documents.map((document) => (
					<DocumentCard
						key={document.id}
						document={document}
						variant="search-grid"
					/>
				))}
			</div>
			{total > PROFILE_PAGE_SIZE ? (
				<SearchPagination
					page={page}
					total={total}
					pageSize={PROFILE_PAGE_SIZE}
					onPageChange={onPageChange}
				/>
			) : null}
		</>
	);
}

function ProfileEmpty({
	icon: Icon,
	title,
	description,
	action,
}: ProfileEmptyState) {
	const ActionIcon = action?.icon;

	return (
		<div className="mx-auto max-w-lg rounded-md border border-black-10 bg-surface p-8 text-center">
			<span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-black-40">
				<Icon aria-hidden className="size-7" />
			</span>
			<h2 className="mt-5 text-xl font-semibold text-black">{title}</h2>
			<p className="mt-2 text-sm text-black-60">{description}</p>
			{action && ActionIcon ? (
				<ButtonLink href={action.href} className="mt-6">
					<ActionIcon aria-hidden className="size-4" />
					{action.label}
				</ButtonLink>
			) : null}
		</div>
	);
}

function ProfileGridSkeleton() {
	return (
		<div
			role="status"
			aria-label="Chargement des documents"
			className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4"
		>
			{PROFILE_GRID_SKELETON_KEYS.map((key) => (
				<DocumentCardSkeleton key={key} variant="search-grid" />
			))}
		</div>
	);
}
