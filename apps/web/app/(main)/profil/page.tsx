import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfileSkeleton } from "./components/profile-skeleton";
import { ProfileTabContent } from "./components/profile-tab-content";

export const metadata: Metadata = {
  title: "Mon profil — ulDocs",
  description:
    "Retrouve tes documents importés, tes enregistrés et tes informations académiques sur ulDocs.",
};

type ProfilePageProps = {
  searchParams: Promise<{ tab?: string | string[] }>;
};

export default function ProfilePage({ searchParams }: ProfilePageProps) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileTabContent searchParams={searchParams} />
    </Suspense>
  );
}
