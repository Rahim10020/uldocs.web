import { getInitial } from "@/lib/user";
import { cn } from "@/lib/utils";

/** Avatar circulaire avec l'initiale du nom, utilisé dans les menus de compte. */
export function UserAvatar({
  nom,
  className,
}: {
  nom: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-10 text-sm font-bold text-primary",
        className,
      )}
    >
      {getInitial(nom)}
    </span>
  );
}
