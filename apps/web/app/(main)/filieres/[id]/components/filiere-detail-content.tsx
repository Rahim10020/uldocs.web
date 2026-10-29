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
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { useFiliereFilters } from "@/hooks/use-filiere-filters";
import { getFiliereDescription } from "@/lib/academic-content";
import { findFiliere, listFiliereUes } from "@/lib/academic-navigation";
import { routes } from "@/lib/routes";
import { FiliereFilters } from "./filiere-filters";

const SKELETON_KEYS = Array.from(
	{ length: 6 },
	(_, index) => `ue-skeleton-${index}`,
);

export function FiliereDetailContent({ filiereId }: { filiereId: number }) {
	const { data, isPending, isError, refetch } = useAcademicTree();
	const context = data ? findFiliere(data, filiereId) : undefined;
	const filters = useFiliereFilters(context?.filiere);

	if (isPending) {
		return <FiliereDetailSkeleton />;
	}

	if (isError) {
		return (
			<Container className="max-w-5xl py-8 sm:py-10">
				<ErrorPanel
					message="Impossible de charger cette filière pour le moment."
					onRetry={() => void refetch()}
				/>
			</Container>
		);
	}

	if (!context) {
		return (
			<Container className="max-w-5xl py-8 sm:py-10">
				<AcademicNotFound
					title="Filière introuvable"
					message="Cette filière n'existe pas ou n'est plus disponible."
					href={routes.categories}
					linkLabel="Voir toutes les catégories"
				/>
			</Container>
		);
	}

	const { faculte, filiere } = context;
	const ues = listFiliereUes(filiere, filters.state);

	return (
		<Container className="max-w-5xl py-8 sm:py-10">
			<AcademicPageHeader
				breadcrumb={[
					{ label: faculte.nom, href: routes.categorie(faculte.id) },
					{ label: filiere.nom },
				]}
				title={filiere.nom}
				description={getFiliereDescription(filiere.nom)}
				actions={<FiliereFilters search={filters} />}
			/>

			{ues.length === 0 ? (
				<div className="mt-12 rounded-md border border-black-10 bg-surface p-8 text-center">
					<p className="text-sm text-black-70">
						{filters.hasFilters
							? "Aucune UE ne correspond à ce niveau et à ce semestre."
							: "Aucune UE n'est disponible pour cette filière pour le moment."}
					</p>
					{filters.hasFilters ? (
						<Button
							variant="secondary"
							className="mt-4"
							onClick={filters.resetFilters}
						>
							Réinitialiser les filtres
						</Button>
					) : (
						<ButtonLink
							href={routes.categories}
							variant="secondary"
							className="mt-4"
						>
							Retour aux catégories
						</ButtonLink>
					)}
				</div>
			) : (
				<div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
					{ues.map((ue) => (
						<AcademicLinkCard
							key={ue.id}
							label={ue.nom}
							href={routes.matiere(ue.id)}
						/>
					))}
				</div>
			)}
		</Container>
	);
}

export function FiliereDetailSkeleton() {
	return (
		<Container className="max-w-5xl py-8 sm:py-10">
			<AcademicPageHeaderSkeleton withActions />

			<div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
				{SKELETON_KEYS.map((key) => (
					<AcademicLinkCardSkeleton key={key} />
				))}
			</div>
		</Container>
	);
}
