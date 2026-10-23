import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Conteneur central du site : 1248px max, gouttière Scribd. */
export function Container({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn("mx-auto w-full max-w-[1248px] px-4 sm:px-6", className)}
		>
			{children}
		</div>
	);
}
