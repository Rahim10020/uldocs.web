"use client";

import { Container } from "@/components/ui/container";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { useDocuments } from "@/hooks/use-documents";
import { CategorySection } from "./category-section";
import { ContributeSection } from "./contribute-section";
import { DocumentSection } from "./document-section";
import { FaqSection } from "./faq-section";
import { Hero } from "./hero";

export function HomeContent() {
  const academicTree = useAcademicTree();
  const documents = useDocuments({ tri: "recent", pageSize: 12 });
  const hasNoInitialContent =
    academicTree.isSuccess &&
    documents.isSuccess &&
    academicTree.data.length === 0 &&
    documents.data.data.length === 0;

  return (
    <>
      <Hero />
      {hasNoInitialContent ? (
        <Container className="py-8 sm:py-10">
          <p className="max-w-xl text-balance text-2xl font-semibold leading-tight text-black sm:text-3xl">
            La plateforme démarre ! Sois le premier à contribuer.
          </p>
        </Container>
      ) : (
        <>
          <CategorySection />
          <DocumentSection
            title="Derniers ajouts"
            subtitle="Derniers documents ajoutés"
            tri="recent"
          />
          <DocumentSection
            title="Les plus téléchargés"
            subtitle="Les plus téléchargés cette semaine"
            tri="populaire"
          />
        </>
      )}
      <ContributeSection />
      <div className="mb-12 lg:mb-24">
        <FaqSection />
      </div>
    </>
  );
}
