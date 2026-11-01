"use client";

import type { Utilisateur } from "shared";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileSummary } from "@/hooks/use-profile-summary";
import { useSession } from "@/hooks/use-session";
import type { ProfileTab } from "@/lib/profile";
import { routes } from "@/lib/routes";
import { ProfileBadges } from "./profile-badges";
import { ProfileHeader } from "./profile-header";
import { ProfileLocked } from "./profile-locked";
import { ProfileStats } from "./profile-stats";
import { ProfileTabs } from "./profile-tabs";

const PROFILE_STAT_SKELETON_KEYS = ["documents", "points", "views"] as const;

/** Écran profil : identité, statistiques, badges et documents. */
export function ProfileContent({ initialTab }: { initialTab: ProfileTab }) {
  const { user, isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Container className="py-8 sm:py-12">
        <ProfileLocked nextPath={routes.profile} />
      </Container>
    );
  }

  return <ProfileDetails user={user} initialTab={initialTab} />;
}

function ProfileDetails({
  user,
  initialTab,
}: {
  user: Utilisateur;
  initialTab: ProfileTab;
}) {
  const summary = useProfileSummary(user);

  return (
    <Container className="py-8 sm:py-12">
      <ProfileHeader
        user={user}
        academicLabel={summary.academicLabel}
        isAcademicLoading={summary.isAcademicLoading}
        rank={summary.rank}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <ProfileStats
          documents={summary.documentsCount}
          points={summary.points}
          views={summary.views}
        />
        <ProfileBadges badges={summary.badges} />
      </div>

      <ProfileTabs activeTab={initialTab} />
    </Container>
  );
}

function ProfileSkeleton() {
  return (
    <Container className="py-8 sm:py-12">
      <div className="flex items-start gap-4">
        <Skeleton className="size-16 rounded-full sm:size-20" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 max-w-full" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {PROFILE_STAT_SKELETON_KEYS.map((key) => (
            <Skeleton key={key} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-24" />
      </div>

      <Skeleton className="mt-10 h-12" />
    </Container>
  );
}
