import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FOOTER_LINKS } from "@/lib/navigation";
import { routes } from "@/lib/routes";

export function Footer() {
	return (
		<footer className="bg-white py-6 sm:bg-surface sm:py-0">
			<Container className="sm:py-10">
				<div className="flex flex-col items-center gap-6 rounded-2xl bg-surface px-6 py-8 text-center sm:flex-row sm:justify-between sm:rounded-none sm:px-0 sm:py-0 sm:text-left">
					<Link
						href={routes.home}
						aria-label="ulDocs — Accueil"
						className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
					>
						<Image
							src="/logo.svg"
							alt="ulDocs"
							width={92}
							height={25}
							unoptimized
							className="h-6 w-auto"
						/>
					</Link>

					<nav
						aria-label="Liens du pied de page"
						className="flex flex-col items-center gap-3 text-sm text-black-70 sm:flex-row sm:gap-8"
					>
						{FOOTER_LINKS.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="transition-colors hover:text-primary"
							>
								{item.label}
							</Link>
						))}
					</nav>

					<p className="text-xs text-black-50 sm:hidden">
						© 2026 ulDocs. Tous droits réservés.
					</p>
				</div>
			</Container>
		</footer>
	);
}
