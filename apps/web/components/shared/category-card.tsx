import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Cog,
  Dna,
  FlaskConical,
  Gavel,
  GraduationCap,
  type LucideIcon,
  Microscope,
  Monitor,
  Palette,
  Radio,
  Sprout,
  Stethoscope,
  TrendingUp,
  Trophy,
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
  ENP: Cog,
  IUT: Monitor,
  FLLA: Palette,
  FSHS: Users,
  ESTBA: Microscope,
  FSS: Dna,
  EAM: Stethoscope,
  ESA: Sprout,
  ESAAd: Briefcase,
  INSE: BookOpen,
  ISICA: Radio,
  INJS: Trophy,
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
        "group flex h-55 flex-col overflow-hidden rounded-md border border-black-10 bg-white transition-colors hover:border-black-20",
        className,
      )}
    >
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-3 text-md font-semibold leading-snug text-black group-hover:text-primary">
          {faculty.nom}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium text-black-60 transition-colors group-hover:text-primary">
          Voir tout
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>

      <div className="flex h-12 border-t border-black">
        <div className="flex flex-1 items-center bg-black px-4">
          <span className="text-md font-bold tracking-wide text-white">
            {faculty.code}
          </span>
        </div>
        <div className="flex w-12 shrink-0 items-center justify-center bg-white text-black">
          <Icon aria-hidden className="size-4" />
        </div>
      </div>
    </Link>
  );
}

export function CategoryCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-55 flex-col overflow-hidden rounded-md border border-black-10 bg-white",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <div className="flex h-12 border-t border-black-10">
        <Skeleton className="h-full flex-1 rounded-none bg-black-10" />
        <Skeleton className="h-full w-12 rounded-none" />
      </div>
    </div>
  );
}
