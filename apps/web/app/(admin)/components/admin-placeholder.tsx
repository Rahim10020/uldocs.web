import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Écran d'attente pour les sections admin sans maquette définitive. */
export function AdminPlaceholder({
	title,
	description,
	icon: Icon,
	children,
}: {
	title: string;
	description: string;
	icon: LucideIcon;
	children?: ReactNode;
}) {
	return (
		<div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center text-center">
			<span className="flex size-14 items-center justify-center rounded-full bg-primary-10 text-primary">
				<Icon aria-hidden className="size-7" />
			</span>
			<h1 className="mt-5 text-2xl font-semibold text-black">{title}</h1>
			<p className="mt-2 max-w-lg text-sm text-black-60">{description}</p>
			<span className="mt-5 inline-flex rounded-full border border-black-10 bg-white px-3 py-1 text-xs font-semibold text-black-60">
				Bientôt disponible
			</span>
			{children ? <div className="mt-6">{children}</div> : null}
		</div>
	);
}
