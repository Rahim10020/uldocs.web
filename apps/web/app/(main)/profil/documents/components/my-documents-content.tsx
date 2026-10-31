"use client";

import { FileStack, FileUp, LockKeyhole, RefreshCw } from "lucide-react";
import { useState } from "react";
import { SearchPagination } from "@/components/shared/search-pagination";
import { UploadedDocumentCard } from "@/components/shared/uploaded-document-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyDocuments } from "@/hooks/use-my-documents";
import { useSession } from "@/hooks/use-session";
import { withNextPath } from "@/lib/next-path";
import { routes } from "@/lib/routes";

const PAGE_SIZE = 10;

/** Page « Mes documents » : uniquement les uploads de l'utilisateur. */
export function MyDocumentsContent() {
	const { isAuthenticated, isLoading } = useSession();

	return (
		<Container className="py-8 sm:py-12">
			<div className="max-w-2xl">
				<h1 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
					Mes documents
				</h1>
				<p className="mt-2 text-sm text-black-60 sm:text-base">
					Retrouve tous les documents que tu as importés, quel que soit leur
					statut.
				</p>
			</div>

			{isLoading ? (
				<MyDocumentsSkeleton />
			) : isAuthenticated ? (
				<MyDocumentsList />
			) : (
				<MyDocumentsLocked />
			)}
		</Container>
	);
}

function MyDocumentsList() {
	const [page, setPage] = useState(1);
	const { data, isPending, isError, refetch, isFetching } = useMyDocuments(
		page,
		PAGE_SIZE,
	);

	if (isError) {
		return (
			<div className="mt-10 rounded-md border border-black-10 bg-surface p-8 text-center">
				<p className="text-sm text-black-70">
					Impossible de charger tes documents pour le moment.
				</p>
				<Button
					variant="secondary"
					className="mt-4"
					onClick={() => void refetch()}
				>
					<RefreshCw aria-hidden className="size-4" />
					Réessayer
				</Button>
			</div>
		);
	}

	if (isPending) {
		return <MyDocumentsSkeleton />;
	}

	const documents = data?.data ?? [];

	if (documents.length === 0) {
		return (
			<div className="mx-auto mt-10 max-w-lg text-center">
				<span className="mx-auto flex size-14 items-center justify-center rounded-full bg-surface text-black-40">
					<FileStack aria-hidden className="size-7" />
				</span>
				<h2 className="mt-5 text-xl font-semibold text-black">
					Aucun document importé
				</h2>
				<p className="mt-2 text-sm text-black-60">
					Tes documents apparaîtront ici dès que tu en auras envoyé un.
				</p>
				<ButtonLink href={routes.newDocument} className="mt-6">
					<FileUp aria-hidden className="size-4" />
					Importer un document
				</ButtonLink>
			</div>
		);
	}

	const total = data?.total ?? documents.length;

	return (
		<div className="mt-8">
			<p className="text-sm text-black-70" aria-live="polite">
				{total} {total > 1 ? "documents" : "document"}
				{isFetching ? " · mise à jour…" : ""}
			</p>

			<div className="mt-4 grid gap-3 lg:grid-cols-2">
				{documents.map((document) => (
					<UploadedDocumentCard key={document.id} document={document} />
				))}
			</div>

			<SearchPagination
				page={page}
				total={total}
				pageSize={PAGE_SIZE}
				onPageChange={setPage}
			/>
		</div>
	);
}

function MyDocumentsLocked() {
	const next = routes.myDocuments;

	return (
		<div className="mx-auto mt-10 max-w-lg text-center">
			<span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-10 text-primary">
				<LockKeyhole aria-hidden className="size-7" />
			</span>
			<h2 className="mt-5 text-xl font-semibold text-black">
				Connecte-toi pour voir tes documents
			</h2>
			<p className="mt-2 text-sm text-black-60">
				Ton espace personnel regroupe tous les fichiers que tu as importés.
			</p>
			<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
				<ButtonLink href={withNextPath(routes.login, next)}>
					Se connecter
				</ButtonLink>
				<ButtonLink
					href={withNextPath(routes.register, next)}
					variant="secondary"
				>
					Créer un compte
				</ButtonLink>
			</div>
		</div>
	);
}

function MyDocumentsSkeleton() {
	return (
		<div
			role="status"
			aria-label="Chargement de tes documents"
			className="mt-8 grid gap-3 lg:grid-cols-2"
		>
			{Array.from(
				{ length: 4 },
				(_, index) => `my-document-skeleton-${index}`,
			).map((key) => (
				<div
					key={key}
					className="flex gap-4 rounded-md border border-black-10 bg-white p-4"
				>
					<Skeleton className="h-20 w-16 shrink-0" />
					<div className="flex-1 space-y-3">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
						<Skeleton className="h-3 w-2/3" />
					</div>
				</div>
			))}
		</div>
	);
}
