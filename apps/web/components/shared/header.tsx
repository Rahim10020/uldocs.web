import { Upload, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/shared/mobile-menu";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SearchBar } from "@/components/ui/search-bar";
import { routes } from "@/lib/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black-10 bg-white">
      <Container className="flex h-14 items-center gap-3 sm:gap-6">
        <MobileMenu />

        <Link
          href={routes.home}
          aria-label="ulDocs — Accueil"
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
        >
          <Image
            src="/logo.svg"
            alt="ulDocs"
            width={92}
            height={25}
            priority
            unoptimized
            className="h-6 w-auto"
          />
        </Link>

        <div className="min-w-0 flex-1 lg:w-112.5 lg:flex-none">
          <SearchBar placeholder="Recherche" />
        </div>

        <nav
          aria-label="Actions du compte"
          className="ml-auto hidden items-center gap-2 lg:flex"
        >
          <Link
            href={routes.newDocument}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-md font-semibold text-black-80 transition-colors hover:text-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
          >
            <Upload aria-hidden className="size-4" />
            Importer
          </Link>
          <Link
            href={routes.login}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-md font-semibold text-black-80 transition-colors hover:text-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
          >
            <UserRound aria-hidden className="size-4" />
            Se connecter
          </Link>
          <ButtonLink href={routes.newDocument} className="ml-1 text-md">
            Contribuer
          </ButtonLink>
        </nav>
      </Container>
    </header>
  );
}
