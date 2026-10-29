import { cn } from "@/lib/utils";

/** Trois points animés, utilisés dans les boutons pendant une requête. */
export function LoadingDots({ className }: { className?: string }) {
	return (
		<span
			aria-hidden
			className={cn("inline-flex items-center gap-1 leading-none", className)}
		>
			<span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
			<span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
			<span className="size-1.5 animate-bounce rounded-full bg-current" />
		</span>
	);
}
