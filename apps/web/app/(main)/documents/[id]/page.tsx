import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DocumentDetailPage } from "./components/document-detail-page";
import { DocumentDetailSkeleton } from "./components/document-detail-skeleton";

type DocumentPageProps = {
  params: Promise<{ id: string }>;
};

export default function DocumentPage({ params }: DocumentPageProps) {
  return (
    <Suspense fallback={<DocumentDetailSkeleton />}>
      <DocumentRoute params={params} />
    </Suspense>
  );
}

async function DocumentRoute({ params }: DocumentPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  return <DocumentDetailPage key={numericId} documentId={numericId} />;
}
