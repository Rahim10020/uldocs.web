import type { Metadata } from "next";
import { parseProfileTab } from "@/lib/profile";
import { ProfileContent } from "./components/profile-content";

export const metadata: Metadata = {
  title: "Mon profil — ulDocs",
  description:
    "Retrouve tes documents importés, tes enregistrés et tes informations académiques sur ulDocs.",
};

type ProfilePageProps = {
  searchParams: Promise<{ tab?: string | string[] }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const { tab } = await searchParams;

  return <ProfileContent initialTab={parseProfileTab(tab)} />;
}
