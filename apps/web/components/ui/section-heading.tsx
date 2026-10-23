import { cn } from "@/lib/utils";

/** Titre + sous-titre d'une section de page. */
export function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm text-black-60 sm:text-base">{subtitle}</p>
      ) : null}
    </div>
  );
}
