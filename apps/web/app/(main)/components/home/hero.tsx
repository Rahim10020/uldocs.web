import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SearchBar } from "@/components/ui/search-bar";

export function Hero() {
	return (
		<section className="bg-black">
			<Container className="pb-16 sm:pb-20">
				<div className="relative mx-auto max-w-5xl">
					<div className="relative h-[200px] overflow-hidden rounded-md sm:h-[300px] lg:h-[360px]">
						<Image
							src="/images/banner.png"
							alt="Étagère de livres et de documents académiques"
							fill
							priority
							sizes="(min-width: 1248px) 1024px, 100vw"
							className="object-cover"
						/>
					</div>

					<div className="absolute inset-x-0 -bottom-7 mx-auto max-w-3xl px-4 sm:px-8">
						<SearchBar
							variant="hero"
							placeholder="Quel document cherchez-vous ?"
						/>
					</div>
				</div>

				<div className="mt-16 max-w-4xl">
					<h1 className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
						Tous les documents de l&apos;Université de Lomé, au même endroit.
					</h1>
					<p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
						Cours, sujets corrigés, anciennes épreuves et résumés partagés par
						les étudiants, pour les étudiants.
					</p>
				</div>
			</Container>
		</section>
	);
}
