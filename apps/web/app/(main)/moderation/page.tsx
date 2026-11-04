import type { Metadata } from "next";
import { Suspense } from "react";
import { ModerationContent } from "./components/moderation-content";
import { ModerationPageSkeleton } from "./components/moderation-skeleton";

export const metadata: Metadata = {
  title: "Dashboard de modération — ulDocs",
  description:
    "Traite les signalements des documents partagés sur ulDocs et applique les décisions de modération.",
};

export default function ModerationPage() {
  return (
    <Suspense fallback={<ModerationPageSkeleton />}>
      <ModerationContent />
    </Suspense>
  );
}
