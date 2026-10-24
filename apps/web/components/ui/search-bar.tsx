"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  className?: string;
  placeholder?: string;
  variant?: "header" | "hero";
  defaultValue?: string;
  /** Filtres conservés lors d'une nouvelle recherche (page exclue). */
  hiddenParams?: Record<string, string>;
};

/** Recherche globale : redirige vers /documents?q=... (aucun JS requis). */
export function SearchBar({
  className,
  placeholder = "Recherche",
  variant = "header",
  defaultValue = "",
  hiddenParams,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const isHero = variant === "hero";
  const hasValue = value.length > 0;

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const clear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <search className={cn("block w-full", className)}>
      <form action={routes.documents} method="get" className="relative w-full">
        {Object.entries(hiddenParams ?? {}).map(([name, hiddenValue]) => (
          <input key={name} type="hidden" name={name} value={hiddenValue} />
        ))}

        <input
          ref={inputRef}
          type="search"
          name="q"
          aria-label="Rechercher un document"
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={cn(
            "w-full rounded-md bg-white text-left text-black placeholder:text-black-50 focus:border-black-90 focus:outline-none focus:ring focus:ring-black-90 [&::-webkit-search-cancel-button]:appearance-none",
            isHero
              ? "h-18 border border-transparent pl-5 pr-24 text-lg shadow-lg"
              : "h-10 border border-black-60 pl-4 pr-16 text-sm",
          )}
        />

        {hasValue ? (
          <button
            type="button"
            onClick={clear}
            aria-label="Effacer la recherche"
            className={cn(
              "absolute top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded text-black-50 transition-colors hover:text-black-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-90",
              isHero ? "right-14 size-10" : "right-9 size-8",
            )}
          >
            <X aria-hidden className={isHero ? "size-5" : "size-4"} />
          </button>
        ) : null}

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
