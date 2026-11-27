"use client";

import { Download, FileText, Search, Users } from "lucide-react";
import Link from "next/link";
import { DocumentStatusBadge } from "@/components/shared/document-status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useAdminDocuments, useAdminUsers } from "@/hooks/use-admin-search";
import { formatCount, formatNumber } from "@/lib/format";
import { routes } from "@/lib/routes";
import {
  getFullRoleLabel,
  STATUT_UTILISATEUR_LABELS,
  STATUT_UTILISATEUR_TEXT_TONES,
} from "@/lib/user";

const SEARCH_PAGE_SIZE = 5;

/** Résultats minimaux de la recherche admin : comptes et documents. */
export function AdminSearchResults({ query }: { query: string }) {
  const enabledQuery = query.length > 0;
  const usersQuery = useAdminUsers(
    {
      q: query,
      page: 1,
      pageSize: SEARCH_PAGE_SIZE,
    },
    { enabled: enabledQuery },
  );
  const documentsQuery = useAdminDocuments({
    q: query,
    page: 1,
    pageSize: SEARCH_PAGE_SIZE,
  });
  const users = usersQuery.data?.data ?? [];
  const documents = documentsQuery.data?.data ?? [];
  const isLoading =
    enabledQuery && (usersQuery.isPending || documentsQuery.isPending);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black lg:text-3xl">
        Recherche
      </h1>
      <p className="mt-1 text-sm text-black-60">
        {enabledQuery
          ? `Résultats pour « ${query} »`
          : "Recherche un utilisateur par nom ou email, ou un document par titre."}
      </p>

      {!enabledQuery ? (
        <div className="mt-10 rounded-xl border border-black-10 bg-white p-10 text-center">
          <Search aria-hidden className="mx-auto size-7 text-black-40" />
          <p className="mt-4 text-sm text-black-60">
            Utilise la barre de recherche du header pour lancer une recherche.
          </p>
        </div>
      ) : isLoading ? (
        <div className="mt-6 space-y-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <section className="rounded-xl border border-black-10 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-black">
                <Users aria-hidden className="size-5 text-black-50" />
                Utilisateurs
              </h2>
              <span className="text-sm text-black-60">
                {usersQuery.data
                  ? `${formatNumber(usersQuery.data.total)} résultat${usersQuery.data.total > 1 ? "s" : ""}`
                  : ""}
              </span>
            </div>

            {usersQuery.isError ? (
              <p className="mt-4 text-sm text-black-60">
                Impossible de charger les utilisateurs.
              </p>
            ) : users.length === 0 ? (
              <p className="mt-4 text-sm text-black-60">
                Aucun utilisateur ne correspond à cette recherche.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-black-10">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="flex flex-wrap items-center gap-3 py-3"
                  >
                    <UserAvatar nom={user.nom} />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={routes.profileById(user.id)}
                        className="truncate font-medium text-black transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                      >
                        {user.nom}
                      </Link>
                      <p className="truncate text-sm text-black-60">
                        {user.email}
                      </p>
                    </div>
                    <span className="rounded-full bg-black-5 px-2.5 py-1 text-xs font-semibold text-black-70">
                      {getFullRoleLabel(user.role)}
                    </span>
                    <span
                      className={`text-xs font-semibold ${STATUT_UTILISATEUR_TEXT_TONES[user.statut]}`}
                    >
                      {STATUT_UTILISATEUR_LABELS[user.statut]}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-xl border border-black-10 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-black">
                <FileText aria-hidden className="size-5 text-black-50" />
                Documents
              </h2>
              <span className="text-sm text-black-60">
                {documentsQuery.data
                  ? `${formatNumber(documentsQuery.data.total)} résultat${documentsQuery.data.total > 1 ? "s" : ""}`
                  : ""}
              </span>
            </div>

            {documentsQuery.isError ? (
              <p className="mt-4 text-sm text-black-60">
                Impossible de charger les documents.
              </p>
            ) : documents.length === 0 ? (
              <p className="mt-4 text-sm text-black-60">
                Aucun document ne correspond à cette recherche.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-black-10">
                {documents.map((document) => (
                  <li key={document.id} className="py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={routes.document(document.id)}
                        className="min-w-0 truncate font-medium text-black transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                      >
                        {document.titre}
                      </Link>
                      <DocumentStatusBadge statut={document.statut} />
                    </div>
                    <p className="mt-1 truncate text-sm text-black-60">
                      {document.ue.nom} · {document.filiere.nom} ·{" "}
                      {document.anneeAcademique}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black-50">
                      <span>Par {document.uploader.nom}</span>
                      <span className="inline-flex items-center gap-1">
                        <Download aria-hidden className="size-3.5" />
                        {formatCount(document.nbTelechargements)}{" "}
                        téléchargements
                      </span>
                      <span>{formatCount(document.nbVues)} vues</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
