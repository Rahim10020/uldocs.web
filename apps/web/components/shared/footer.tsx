import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-black-10 bg-white py-8">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-black-60 sm:flex-row">
				<p>© UL Docs — Université de Lomé</p>

				<nav className="flex items-center gap-6">
					<Link
						href="/a-propos"
						className="transition-colors hover:text-primary"
					>
						À propos
					</Link>
					<Link
						href="/documents"
						className="transition-colors hover:text-primary"
					>
						Documents
					</Link>
				</nav>
			</div>
		</footer>
	);
}
