import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Conteneur central du site : 1248px max */
export function Container({
  children,
  className,
  fluid = false,
}: {
  children: ReactNode;
  className?: string;
  /** Pleine largeur avec gouttières, pour la fiche document. */
  fluid?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        fluid ? "max-w-none lg:px-8" : "max-w-[1248px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
