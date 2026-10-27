import { notFound } from "next/navigation";
import { DocumentDetailPage } from "./components/document-detail-page";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  return <DocumentDetailPage key={numericId} documentId={numericId} />;
}
