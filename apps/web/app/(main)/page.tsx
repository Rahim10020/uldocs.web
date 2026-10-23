import { CategorySection } from "./components/home/category-section";
import { ContributeSection } from "./components/home/contribute-section";
import { DocumentSection } from "./components/home/document-section";
import { FaqSection } from "./components/home/faq-section";
import { Hero } from "./components/home/hero";

export default function HomePage() {
	return (
		<>
			<Hero />
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
			<ContributeSection />
			<FaqSection />
		</>
	);
}
