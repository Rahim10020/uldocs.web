import Link from "next/link";

const navigation = [
	{ href: "/documents", label: "Documents" },
	{ href: "/a-propos", label: "À propos" },
];

export function Header() {
	return (
		<header className="border-b border-black-10 bg-white">
			<div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
				<Link href="/" className="text-lg font-bold text-primary">
					UL Docs
				</Link>

				<nav className="hidden items-center gap-6 text-sm font-medium text-black-70 sm:flex">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="transition-colors hover:text-primary"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<Link
						href="/connexion"
						className="text-sm font-medium text-black-70 transition-colors hover:text-primary"
					>
						Connexion
					</Link>
					<Link
						href="/inscription"
						className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-90"
					>
						S'inscrire
					</Link>
				</div>
			</div>
		</header>
	);
}
