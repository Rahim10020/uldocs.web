import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  UeDocumentsContent,
  UeDocumentsSkeleton,
} from "./components/ue-documents-content";

export const metadata: Metadata = {
  title: "Unité d'enseignement — ulDocs",
  description:
    "Retrouvez les cours, examens et corrigés d'une unité d'enseignement de l'Université de Lomé.",
};

type MatierePageProps = {
  params: Promise<{ id: string }>;
};

export default function MatierePage({ params }: MatierePageProps) {
  return (
    <Suspense fallback={<UeDocumentsSkeleton />}>
      <MatiereRoute params={params} />
    </Suspense>
  );
}

async function MatiereRoute({ params }: MatierePageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  return <UeDocumentsContent key={numericId} ueId={numericId} />;
}
