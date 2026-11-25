import { ExternalLink, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { routes } from "@/lib/routes";
import { AdminAccountMenu } from "./admin-account-menu";
import { AdminHeaderSearch } from "./admin-header-search";
import { AdminMobileMenu } from "./admin-mobile-menu";
import { AdminNotifications } from "./admin-notifications";

/** Header de l'espace d'administration. */
export function AdminHeader() {
	return (
		<header className="sticky top-0 z-30 border-b border-black-10 bg-white">
			<div className="flex h-14 items-center gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
				<AdminMobileMenu />

				<Link
					href={routes.admin}
					aria-label="ulDocs — Administration"
					className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 sm:gap-3"
				>
					<Image
						src="/logo.svg"
						alt="ulDocs"
						width={92}
						height={25}
						priority
						unoptimized
						className="h-4 w-auto lg:h-5"
					/>
					<span className="hidden border-l border-black-20 pl-3 text-sm font-semibold text-black-70 sm:inline">
						Administration
					</span>
				</Link>

				<div className="min-w-0 flex-1 sm:ml-2 sm:max-w-md">
					<Suspense
						fallback={
							<SearchBar
								action={routes.adminSearch}
								ariaLabel="Rechercher dans l'administration"
								placeholder="Rechercher un utilisateur, un document…"
							/>
						}
					>
						<AdminHeaderSearch />
					</Suspense>
				</div>

				<div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
					<Link
						href={routes.home}
						className="hidden h-9 items-center gap-1.5 rounded-md px-3 text-sm font-semibold text-black-70 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 lg:inline-flex"
					>
						<ExternalLink aria-hidden className="size-4" />
						Voir le site
					</Link>

					<ButtonLink
						href={routes.newDocument}
						className="hidden h-9 text-sm lg:inline-flex"
					>
						<Plus aria-hidden className="size-4" />
						Ajouter un document
					</ButtonLink>

					<AdminNotifications />
					<AdminAccountMenu />
				</div>
			</div>
		</header>
	);
}
