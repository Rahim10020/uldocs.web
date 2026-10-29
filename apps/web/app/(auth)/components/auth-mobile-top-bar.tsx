import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

/** Bandeau mobile des écrans d'authentification. */
export function AuthMobileTopBar() {
  return (
    <div className="flex h-16 shrink-0 items-center px-5 lg:hidden">
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
          priority
          unoptimized
          className="h-5 w-auto"
        />
      </Link>
    </div>
  );
}
