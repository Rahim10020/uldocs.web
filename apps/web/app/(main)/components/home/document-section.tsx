"use client";

import type { TriDocuments } from "shared";
import {
	DocumentCard,
	DocumentCardSkeleton,
} from "@/components/shared/document-card";
import { Carousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useDocuments } from "@/hooks/use-documents";

type DocumentSectionProps = {
	title: string;
	subtitle: string;
	tri: Extract<TriDocuments, "recent" | "populaire">;
};

export function DocumentSection({
	title,
	subtitle,
	tri,
}: DocumentSectionProps) {
	const { data, isPending, isError } = useDocuments({ tri, pageSize: 12 });
	const documents = data?.data ?? [];

	return (
		<section className="py-10 sm:py-12">
			<Container>
				<SectionHeading title={title} subtitle={subtitle} />

				{isPending ? (
					<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6">
						{Array.from(
							{ length: 6 },
							(_, index) => `document-skeleton-${index}`,
						).map((key) => (
							<DocumentCardSkeleton key={key} />
						))}
					</div>
				) : isError ? (
					<p className="mt-8 text-sm text-black-60">
						Impossible de charger les documents pour le moment.
					</p>
				) : documents.length === 0 ? (
					<p className="mt-8 text-sm text-black-60">
						Aucun document disponible pour le moment.
					</p>
				) : (
					<Carousel ariaLabel={title} className="mt-8">
						{documents.map((document) => (
							<DocumentCard key={document.id} document={document} />
						))}
					</Carousel>
				)}
			</Container>
		</section>
	);
}
