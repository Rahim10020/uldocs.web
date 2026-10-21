import Link from "next/link";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-black">Page introuvable</h1>
      <p className="text-black-60">
        La page que tu cherches n'existe pas ou a été déplacée.
      </p>
      <Link
        href={routes.home}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-90"
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}
