"use client";

import {
	AcademicNotFound,
	ErrorPanel,
} from "@/components/shared/academic-feedback";
import {
	AcademicLinkCard,
	AcademicLinkCardSkeleton,
} from "@/components/shared/academic-link-card";
import {
	AcademicPageHeader,
	AcademicPageHeaderSkeleton,
} from "@/components/shared/academic-page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { getFaculteDescription } from "@/lib/academic-content";
import { findFaculte } from "@/lib/academic-navigation";
import { routes } from "@/lib/routes";

const SKELETON_KEYS = Array.from(
	{ length: 6 },
	(_, index) => `filiere-skeleton-${index}`,
);

export function CategoryDetailContent({ categoryId }: { categoryId: number }) {
	const { data, isPending, isError, refetch } = useAcademicTree();
	const faculte = data ? findFaculte(data, categoryId) : undefined;

	if (isPending) {
		return <CategoryDetailSkeleton />;
	}

	if (isError) {
		return (
			<Container className="max-w-5xl py-8 sm:py-10">
				<ErrorPanel
					message="Impossible de charger cette catégorie pour le moment."
					onRetry={() => void refetch()}
				/>
			</Container>
		);
	}

	if (!faculte) {
		return (
			<Container className="max-w-5xl py-8 sm:py-10">
				<AcademicNotFound
					title="Catégorie introuvable"
					message="Cette faculté, école ou institut n'existe pas ou n'est plus disponible."
					href={routes.categories}
					linkLabel="Voir toutes les catégories"
				/>
			</Container>
		);
	}

	return (
		<Container className="max-w-5xl py-8 sm:py-10">
			<AcademicPageHeader
				breadcrumb={[
					{ label: "Catégories", href: routes.categories },
					{ label: faculte.nom },
				]}
				title={faculte.nom}
				description={faculte.description ?? getFaculteDescription(faculte.code)}
			/>

			{faculte.filieres.length === 0 ? (
				<div className="mt-12 rounded-md border border-black-10 bg-surface p-8 text-center">
					<p className="text-sm text-black-70">
						Les filières de cette structure seront bientôt disponibles.
					</p>
					<ButtonLink
						href={routes.categories}
						variant="secondary"
						className="mt-4"
					>
						Retour aux catégories
					</ButtonLink>
				</div>
			) : (
				<div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
					{faculte.filieres.map((filiere) => (
						<AcademicLinkCard
							key={filiere.id}
							label={filiere.nom}
							href={routes.filiere(filiere.id)}
						/>
					))}
				</div>
			)}
		</Container>
	);
}

export function CategoryDetailSkeleton() {
	return (
		<Container className="max-w-5xl py-8 sm:py-10">
			<AcademicPageHeaderSkeleton />

			<div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
				{SKELETON_KEYS.map((key) => (
					<AcademicLinkCardSkeleton key={key} />
				))}
			</div>
		</Container>
	);
}
