import {
  ArrowRight,
  Dna,
  FlaskConical,
  Gavel,
  GraduationCap,
  type LucideIcon,
  Palette,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { Faculte } from "shared";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  FDD: Gavel,
  FDS: FlaskConical,
  FASEG: TrendingUp,
  FLLA: Palette,
  FSHS: Users,
  FSS: Dna,
};

export function CategoryCard({
  faculty,
  className,
}: {
  faculty: Faculte;
  className?: string;
}) {
  const Icon = ICONS[faculty.code] ?? GraduationCap;

  return (
    <Link
      href={{
        pathname: routes.documents,
        query: { faculteId: faculty.id },
      }}
      className={cn(
        "group flex h-55 flex-col overflow-hidden rounded-md border border-black-10 bg-surface transition-colors hover:border-black-20",
        className,
      )}
    >
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-3 text-md font-semibold leading-snug text-black group-hover:text-primary">
          {faculty.nom}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-black-60 transition-colors group-hover:text-primary">
          Voir tout
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>

      <div className="flex h-12 items-center justify-between bg-black px-4 text-white">
        <span className="text-md font-bold tracking-wide">{faculty.code}</span>
        <span className="flex size-8 items-center justify-center">
          <Icon aria-hidden className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export function CategoryCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-55 flex-col overflow-hidden rounded-md border border-black-10 bg-surface",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-12 rounded-none bg-black-10" />
    </div>
  );
}
