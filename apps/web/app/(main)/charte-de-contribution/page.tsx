import { Container } from "@/components/ui/container";

export default function CharterPage() {
	return (
		<Container className="max-w-3xl py-12">
			<h1 className="text-2xl font-bold text-black">Charte de contribution</h1>
			<p className="mt-2 text-black-60">
				Le texte de la charte sera publié ici. En contribuant, vous certifiez
				détenir les droits sur le document partagé et respecter les règles de la
				communauté.
			</p>
		</Container>
	);
}
