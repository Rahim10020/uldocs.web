import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ReportDetailContent } from "@/app/(main)/moderation/[id]/components/report-detail-content";
import { ReportDetailSkeleton } from "@/app/(main)/moderation/[id]/components/report-detail-skeleton";

export const metadata: Metadata = {
	title: "Détail d'un signalement — Administration ulDocs",
	description:
		"Consulte un signalement et applique une décision de modération depuis l'administration ulDocs.",
};

type AdminModerationReportPageProps = {
	params: Promise<{ id: string }>;
};

export default function AdminModerationReportPage({
	params,
}: AdminModerationReportPageProps) {
	return (
		<Suspense fallback={<ReportDetailSkeleton />}>
			<AdminModerationReportRoute params={params} />
		</Suspense>
	);
}

async function AdminModerationReportRoute({
	params,
}: AdminModerationReportPageProps) {
	const { id } = await params;
	const reportId = Number(id);

	if (!Number.isInteger(reportId) || reportId <= 0) {
		notFound();
	}

	return (
		<ReportDetailContent key={reportId} reportId={reportId} context="admin" />
	);
}
