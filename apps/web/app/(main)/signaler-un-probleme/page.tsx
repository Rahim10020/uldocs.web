import { Container } from "@/components/ui/container";

export default function ReportPage() {
	return (
		<Container className="max-w-3xl py-12">
			<h1 className="text-2xl font-bold text-black">Signaler un problème</h1>
			<p className="mt-2 text-black-60">
				Pour signaler un document, ouvrez sa page et utilisez le bouton «
				Signaler ». Pour toute autre demande (droit d&apos;auteur, contenu
				illicite), le formulaire de contact sera disponible prochainement.
			</p>
		</Container>
	);
}
