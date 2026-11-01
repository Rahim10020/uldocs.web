"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import {
  Bookmark,
  FileStack,
  FileUp,
  type LucideIcon,
  RefreshCw,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { DocumentListItem, Paginated } from "shared";
import {
  DocumentCard,
  DocumentCardSkeleton,
} from "@/components/shared/document-card";
import { SearchPagination } from "@/components/shared/search-pagination";
import { Button, ButtonLink } from "@/components/ui/button";
import { useProfileDocuments } from "@/hooks/use-profile-documents";
import {
  PROFILE_PAGE_SIZE,
  type ProfileTab,
  profileTabHref,
} from "@/lib/profile";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const PROFILE_GRID_SKELETON_KEYS = ["one", "two", "three", "four"] as const;

type DocumentsQuery = UseQueryResult<Paginated<DocumentListItem>>;

type EmptyState = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: Route;
  actionIcon: LucideIcon;
};

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
              actionLabel: "Importer un document",
              actionHref: routes.newDocument,
              actionIcon: FileUp,
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
              actionLabel: "Explorer les documents",
              actionHref: routes.documents,
              actionIcon: FileStack,
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

function ProfileDocumentGrid({
  query,
  page,
  onPageChange,
  emptyState,
  onlyFavorites = false,
}: {
  query: DocumentsQuery;
  page: number;
  onPageChange: (page: number) => void;
  emptyState: EmptyState;
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
  actionLabel,
  actionHref,
  actionIcon: ActionIcon,
}: EmptyState) {
  return (
    <div className="mx-auto max-w-lg rounded-md border border-black-10 bg-surface p-8 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-black-40">
        <Icon aria-hidden className="size-7" />
      </span>
      <h2 className="mt-5 text-xl font-semibold text-black">{title}</h2>
      <p className="mt-2 text-sm text-black-60">{description}</p>
      <ButtonLink href={actionHref} className="mt-6">
        <ActionIcon aria-hidden className="size-4" />
        {actionLabel}
      </ButtonLink>
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
