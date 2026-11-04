import { LockKeyhole, ShieldAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { withNextPath } from "@/lib/next-path";
import { routes } from "@/lib/routes";

/** Écran d'accès refusé pour la modération. */
export function ModerationAccess({
	authenticated,
}: {
	authenticated: boolean;
}) {
	return (
		<div className="mx-auto mt-10 max-w-lg rounded-md border border-black-10 bg-surface p-8 text-center sm:p-12">
			<span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-10 text-primary">
				{authenticated ? (
					<ShieldAlert aria-hidden className="size-7" />
				) : (
					<LockKeyhole aria-hidden className="size-7" />
				)}
			</span>
			<h2 className="mt-5 text-xl font-semibold text-black">
				{authenticated
					? "Accès réservé aux modérateurs"
					: "Connecte-toi pour accéder à la modération"}
			</h2>
			<p className="mt-2 text-sm text-black-60">
				{authenticated
					? "Cette page est réservée aux membres de l'équipe de modération."
					: "La file de signalements est réservée aux modérateurs et aux administrateurs."}
			</p>
			<div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
				{authenticated ? null : (
					<ButtonLink
						href={withNextPath(routes.login, routes.moderation)}
						className="w-full sm:w-auto"
					>
						Se connecter
					</ButtonLink>
				)}
				<ButtonLink
					href={routes.home}
					variant={authenticated ? "primary" : "secondary"}
					className="w-full sm:w-auto"
				>
					Retour à l'accueil
				</ButtonLink>
			</div>
		</div>
	);
}
