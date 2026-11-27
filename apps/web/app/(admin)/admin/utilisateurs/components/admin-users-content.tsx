"use client";

import { useMemo, useState } from "react";
import type {
  AdminUserListItem,
  AdminUserUpdatePayload,
  StatutUtilisateur,
} from "shared";
import { SearchPagination } from "@/components/shared/search-pagination";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { useAdminUsers } from "@/hooks/use-admin-search";
import { useAdminUserUpdate } from "@/hooks/use-admin-user-update";
import { useAdminUsersSearch } from "@/hooks/use-admin-users-search";
import { useSession } from "@/hooks/use-session";
import {
  ADMIN_USERS_PAGE_SIZE,
  type AdminUserActionKind,
  getContributionCategory,
} from "@/lib/admin-users";
import { ApiError } from "@/lib/api/errors";
import { formatDate, formatNumber } from "@/lib/format";
import {
  CATEGORIE_CONTRIBUTION_LABELS,
  getFullRoleLabel,
  STATUT_UTILISATEUR_LABELS,
  STATUT_UTILISATEUR_TONES,
} from "@/lib/user";
import { AdminUserActionDialog } from "./admin-user-action-dialog";
import { AdminUserActions } from "./admin-user-actions";
import { AdminUsersFilters } from "./admin-users-filters";
import { AdminUsersSkeleton } from "./admin-users-skeleton";

type PendingAction = {
  user: AdminUserListItem;
  action: AdminUserActionKind;
};

function getUpdatePayload(
  action: AdminUserActionKind,
  raison: string,
): AdminUserUpdatePayload {
  switch (action) {
    case "promote":
      return { role: "moderateur", raison };
    case "suspend":
      return { statut: "suspendu", raison };
    case "reactivate":
      return { statut: "actif", raison };
    case "ban":
      return { statut: "supprime", raison };
  }
}

export function AdminUsersContent() {
  const search = useAdminUsersSearch();
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const { user: currentUser } = useSession();
  const academicTreeQuery = useAcademicTree();
  const updateMutation = useAdminUserUpdate();
  const usersQuery = useAdminUsers(search.params);
  const { page, setPage } = search;
  const users = usersQuery.data?.data ?? [];
  const total = usersQuery.data?.total ?? 0;
  const facultyNames = useMemo(
    () =>
      new Map(
        (academicTreeQuery.data ?? []).map((faculty) => [
          faculty.id,
          faculty.nom,
        ]),
      ),
    [academicTreeQuery.data],
  );

  const openActionDialog = (
    user: AdminUserListItem,
    action: AdminUserActionKind,
  ) => {
    updateMutation.reset();
    setPendingAction({ user, action });
  };

  const closeActionDialog = () => {
    setPendingAction(null);
    updateMutation.reset();
  };

  const confirmAction = async (raison: string) => {
    if (!pendingAction) {
      return;
    }

    await updateMutation.mutateAsync({
      id: pendingAction.user.id,
      payload: getUpdatePayload(pendingAction.action, raison),
    });
    setPage(1);
  };

  const updateError =
    updateMutation.error instanceof ApiError
      ? updateMutation.error.message
      : updateMutation.error instanceof Error
        ? updateMutation.error.message
        : "L'action n'a pas pu être appliquée. Réessaie.";

  return (
    <section className="mx-auto w-full max-w-[90rem]">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-black-50 xl:hidden">
          Admin <span aria-hidden>›</span> Utilisateurs
        </p>
        <h1 className="text-2xl font-semibold text-black lg:text-3xl">
          Gestion des utilisateurs
        </h1>
      </div>

      <AdminUsersFilters search={search} />

      <div>
        <p className="mt-4 text-sm text-black-60" aria-live="polite">
          {usersQuery.isPending
            ? "Chargement des utilisateurs…"
            : `${formatNumber(total)} utilisateur${total === 1 ? "" : "s"}${usersQuery.isFetching ? " — mise à jour…" : ""}`}
        </p>

        {usersQuery.isError ? (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-black-10 bg-white p-8 text-center"
          >
            <p className="text-sm text-black-70">
              Impossible de charger les utilisateurs pour le moment.
            </p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => void usersQuery.refetch()}
            >
              Réessayer
            </Button>
          </div>
        ) : usersQuery.isPending ? (
          <AdminUsersSkeleton />
        ) : total === 0 ? (
          <div className="mt-6 rounded-xl border border-black-10 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-black">
              Aucun utilisateur trouvé
            </h2>
            <p className="mt-2 text-sm text-black-60">
              Essaie une autre recherche ou modifie les filtres.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-4 hidden xl:block">
              <table className="w-full table-fixed border-collapse text-left">
                <caption className="sr-only">
                  Liste des utilisateurs de la plateforme
                </caption>
                <colgroup>
                  <col className="w-[17%]" />
                  <col className="w-[18%]" />
                  <col className="w-[13%]" />
                  <col className="w-[21%]" />
                  <col className="w-[10%]" />
                  <col className="w-[14%]" />
                  <col className="w-[7%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-black-20 text-sm text-black-60">
                    <th scope="col" className="px-2 py-3 font-semibold">
                      Nom complet
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold">
                      Email
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold">
                      Faculté
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold">
                      Rôle / contribution
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold">
                      Statut
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold">
                      Date d&apos;inscription
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-right font-semibold"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-black-10 text-sm text-black-80"
                    >
                      <td className="px-2 py-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <UserAvatar
                            nom={user.nom}
                            className="size-9 shrink-0"
                          />
                          <span className="truncate font-medium text-black">
                            {user.nom}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <span className="block truncate" title={user.email}>
                          {user.email}
                        </span>
                      </td>
                      <td className="px-2 py-3">
                        <span className="block truncate">
                          {user.faculteId === null
                            ? "—"
                            : (facultyNames.get(user.faculteId) ?? "—")}
                        </span>
                      </td>
                      <td className="px-2 py-3">
                        <UserAccountBadges user={user} />
                      </td>
                      <td className="px-2 py-3">
                        <UserStatusBadge statut={user.statut} />
                      </td>
                      <td className="px-2 py-3 text-sm">
                        <time dateTime={user.dateInscription}>
                          {formatDate(user.dateInscription)}
                        </time>
                      </td>
                      <td className="px-2 py-3">
                        <AdminUserActions
                          user={user}
                          currentUserId={currentUser?.id ?? null}
                          onAction={(action) => openActionDialog(user, action)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3 xl:hidden">
              {users.map((user) => (
                <article
                  key={user.id}
                  className="rounded-xl border border-black-10 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <UserAvatar nom={user.nom} className="size-9 shrink-0" />
                      <p className="truncate font-semibold text-black">
                        {user.nom}
                      </p>
                    </div>
                    <UserStatusBadge statut={user.statut} />
                  </div>
                  <p className="mt-2 break-all text-sm text-black-60">
                    {user.email}
                  </p>
                  <div className="mt-4 flex items-start justify-between gap-3 text-sm">
                    <p className="min-w-0 truncate text-black-70">
                      {user.faculteId === null
                        ? "—"
                        : (facultyNames.get(user.faculteId) ?? "—")}
                    </p>
                    <time
                      dateTime={user.dateInscription}
                      className="shrink-0 text-right text-black-60"
                    >
                      {formatDate(user.dateInscription)}
                    </time>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <UserAccountBadges user={user} />
                    <AdminUserActions
                      user={user}
                      currentUserId={currentUser?.id ?? null}
                      onAction={(action) => openActionDialog(user, action)}
                    />
                  </div>
                </article>
              ))}
            </div>

            <SearchPagination
              page={page}
              total={total}
              pageSize={ADMIN_USERS_PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {pendingAction ? (
        <AdminUserActionDialog
          userName={pendingAction.user.nom}
          action={pendingAction.action}
          errorMessage={updateMutation.isError ? updateError : null}
          isPending={updateMutation.isPending}
          onConfirm={confirmAction}
          onClose={closeActionDialog}
        />
      ) : null}
    </section>
  );
}

function UserAccountBadges({ user }: { user: AdminUserListItem }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="inline-flex rounded-full bg-black-5 px-2.5 py-1 text-xs font-semibold text-black-70">
        {getFullRoleLabel(user.role)}
      </span>
      <span className="inline-flex rounded-full bg-primary-10 px-2.5 py-1 text-xs font-semibold text-primary">
        {
          CATEGORIE_CONTRIBUTION_LABELS[
            getContributionCategory(user.nbDocumentsUploades)
          ]
        }
      </span>
    </div>
  );
}

function UserStatusBadge({ statut }: { statut: StatutUtilisateur }) {
  return (
    <span
      className={`inline-flex min-w-20 justify-center rounded-md px-2.5 py-1 text-xs font-semibold ${STATUT_UTILISATEUR_TONES[statut]}`}
    >
      {STATUT_UTILISATEUR_LABELS[statut]}
    </span>
  );
}
