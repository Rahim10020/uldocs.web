import { Search } from "lucide-react";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  className?: string;
  placeholder?: string;
  variant?: "header" | "hero";
};

/** Recherche globale : redirige vers /documents?q=... (aucun JS requis). */
export function SearchBar({
  className,
  placeholder = "Recherche",
  variant = "header",
}: SearchBarProps) {
  const isHero = variant === "hero";

  return (
    <search className={cn("block w-full", className)}>
      <form action={routes.documents} method="get" className="relative w-full">
        <input
          type="search"
          name="q"
          aria-label="Rechercher un document"
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="search"
          className={cn(
            "w-full rounded-md bg-white text-left text-black placeholder:text-black-50 focus:border-black-90 focus:outline-none focus:ring focus:ring-black-90",
            isHero
              ? "h-14 border border-transparent pl-5 pr-14 text-base shadow-lg"
              : "h-10 border border-black-60 pl-4 pr-10 text-sm",
          )}
        />
        <button
          type="submit"
          aria-label="Rechercher"
          className={cn(
            "absolute right-1 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded text-black-50 transition-colors hover:text-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-90",
            isHero ? "size-12" : "size-8",
          )}
        >
          <Search aria-hidden className={isHero ? "size-6" : "size-5"} />
        </button>
      </form>
    </search>
  );
}
