"use client";

import { Flag, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import type { ReportSearchParams } from "shared";
import { SearchPagination } from "@/components/shared/search-pagination";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { useOpenReportsCount } from "@/hooks/use-open-reports-count";
import { useReports } from "@/hooks/use-reports";
import { useReportsSearch } from "@/hooks/use-reports-search";
import { useSession } from "@/hooks/use-session";
import { MODERATION_PAGE_SIZE } from "@/lib/moderation";
import { ModerationAccess } from "./moderation-access";
import { ModerationFilters } from "./moderation-filters";
import { ModerationReportCard } from "./moderation-report-card";
import {
  ModerationCardsSkeleton,
  ModerationPageSkeleton,
} from "./moderation-skeleton";

/** Point d'entrée de la modération : session, rôle et page. */
export function ModerationContent() {
  const { user, isLoading, isModerator } = useSession();

  if (isLoading) {
    return <ModerationPageSkeleton />;
  }

  if (!isModerator) {
    return (
      <Container className="max-w-5xl py-8 lg:py-12">
        <ModerationAccess authenticated={Boolean(user)} />
      </Container>
    );
  }

  return <ModerationDashboard />;
}

function ModerationDashboard() {
  const search = useReportsSearch();
  const { state } = search;
  const params = useMemo<ReportSearchParams>(
    () => ({
      statut: state.statut,
      motif: state.motif,
      page: state.page,
      pageSize: MODERATION_PAGE_SIZE,
    }),
    [state],
  );
  const reportsQuery = useReports(params);
  const openCountQuery = useOpenReportsCount();
  const reports = reportsQuery.data?.data ?? [];
  const total = reportsQuery.data?.total ?? 0;
  const isEmpty =
    !reportsQuery.isPending && !reportsQuery.isError && total === 0;

  return (
    <Container className="max-w-5xl py-8 lg:py-12">
      <h1 className="text-2xl font-semibold text-black lg:text-3xl">
        Dashboard de modération
      </h1>

      <div className="mt-6 flex flex-col gap-4 lg:mt-10 lg:flex-row lg:items-center lg:justify-between">
        <OpenReportsCount
          count={openCountQuery.data}
          isPending={openCountQuery.isPending}
          isError={openCountQuery.isError}
        />
        <ModerationFilters search={search} />
      </div>

      {reportsQuery.isError ? (
        <ModerationErrorState onRetry={() => void reportsQuery.refetch()} />
      ) : reportsQuery.isPending ? (
        <ModerationCardsSkeleton />
      ) : isEmpty ? (
        <ModerationEmptyState
          hasFilters={search.hasFilters}
          onReset={search.resetFilters}
        />
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {reports.map((report) => (
              <ModerationReportCard key={report.id} report={report} />
            ))}
          </div>

          <SearchPagination
            page={state.page}
            total={total}
            pageSize={MODERATION_PAGE_SIZE}
            onPageChange={search.setPage}
          />
        </>
      )}
    </Container>
  );
}

function OpenReportsCount({
  count,
  isPending,
  isError,
}: {
  count: number | undefined;
  isPending: boolean;
  isError: boolean;
}) {
  if (isPending) {
    return <Skeleton className="h-5 w-44" />;
  }

  if (isError || count === undefined) {
    return (
      <p className="text-sm font-medium text-black-60">
        Signalements en attente
      </p>
    );
  }

  return (
    <p className="text-sm font-medium text-black" aria-live="polite">
      {count} signalement{count > 1 ? "s" : ""} en attente
    </p>
  );
}

function ModerationErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mt-6 rounded-md border border-black-10 bg-surface p-8 text-center">
      <p className="text-sm text-black-70">
        Impossible de charger les signalements pour le moment.
      </p>
      <Button variant="secondary" className="mt-4" onClick={onRetry}>
        Réessayer
      </Button>
    </div>
  );
}

function ModerationEmptyState({
  hasFilters,
  onReset,
}: {
  hasFilters: boolean;
  onReset: () => void;
}) {
  return (
    <div className="mt-6 rounded-md border border-black-10 bg-surface p-8 text-center sm:p-10">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-black-5 text-black-50">
        {hasFilters ? (
          <Flag aria-hidden className="size-6" />
        ) : (
          <ShieldCheck aria-hidden className="size-6" />
        )}
      </span>
      <h2 className="mt-4 text-lg font-semibold text-black">
        {hasFilters
          ? "Aucun signalement pour ces filtres"
          : "Aucun signalement"}
      </h2>
      <p className="mt-2 text-sm text-black-60">
        {hasFilters
          ? "Essaie un autre statut ou un autre motif."
          : "La file de modération est vide pour le moment."}
      </p>
      {hasFilters ? (
        <Button variant="secondary" className="mt-5" onClick={onReset}>
          Réinitialiser les filtres
        </Button>
      ) : null}
    </div>
  );
}
