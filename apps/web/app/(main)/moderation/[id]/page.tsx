import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ReportDetailContent } from "./components/report-detail-content";
import { ReportDetailSkeleton } from "./components/report-detail-skeleton";

export const metadata: Metadata = {
  title: "Détail d'un signalement — ulDocs",
  description:
    "Consulte un signalement et applique une décision de modération sur ulDocs.",
};

type ModerationReportPageProps = {
  params: Promise<{ id: string }>;
};

export default function ModerationReportPage({
  params,
}: ModerationReportPageProps) {
  return (
    <Suspense fallback={<ReportDetailSkeleton />}>
      <ModerationReportRoute params={params} />
    </Suspense>
  );
}

async function ModerationReportRoute({ params }: ModerationReportPageProps) {
  const { id } = await params;
  const reportId = Number(id);

  if (!Number.isInteger(reportId) || reportId <= 0) {
    notFound();
  }

  return <ReportDetailContent key={reportId} reportId={reportId} />;
}
