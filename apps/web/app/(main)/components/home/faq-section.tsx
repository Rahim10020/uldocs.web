import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "quest-ce-que-uldocs",
    question: "Qu'est-ce que ulDocs ?",
    answer:
      "ulDocs est une plateforme communautaire de partage de documents académiques pour les étudiants de l'Université de Lomé. Elle centralise les cours, annales et corrigés pour faciliter les révisions.",
  },
  {
    id: "documents-gratuits",
    question: "Les documents sont-ils gratuits ?",
    answer:
      "Oui. La consultation et le téléchargement des documents sont gratuits. Un compte est nécessaire pour télécharger et pour contribuer.",
  },
  {
    id: "comment-contribuer",
    question: "Comment contribuer ?",
    answer:
      "Créez un compte, cliquez sur « Contribuer », puis déposez votre document en respectant la charte de contribution. Vous pouvez aussi candidater pour devenir modérateur.",
  },
  {
    id: "signaler-un-document",
    question: "Comment signaler un document ?",
    answer:
      "Depuis la page d'un document, utilisez le bouton « Signaler ». L'équipe de modération examine chaque signalement.",
  },
];

export function FaqSection() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <SectionHeading
          title="FAQ"
          subtitle="Vous vous posez certaines questions ? Vous êtes au bon endroit."
        />
        <Accordion items={FAQ_ITEMS} className="mt-8" />
      </Container>
    </section>
  );
}
