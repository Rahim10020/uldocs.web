import { Settings } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { routes } from "@/lib/routes";

/** Attente de la maquette des paramètres du compte. */
export function AccountSettingsPlaceholder() {
	return (
		<div className="rounded-xl border border-black-10 bg-white p-8 text-center sm:p-12">
			<span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-10 text-primary">
				<Settings aria-hidden className="size-7" />
			</span>
			<h1 className="mt-5 text-2xl font-semibold text-black">
				Paramètres du compte
			</h1>
			<p className="mx-auto mt-2 max-w-lg text-sm text-black-60">
				La gestion de l&apos;email, du mot de passe et des préférences de
				notification arrivera avec la maquette dédiée.
			</p>
			<span className="mt-5 inline-flex rounded-full border border-black-10 bg-white px-3 py-1 text-xs font-semibold text-black-60">
				Bientôt disponible
			</span>
			<div className="mt-6">
				<ButtonLink href={routes.profile} variant="secondary">
					Retour au profil
				</ButtonLink>
			</div>
		</div>
	);
}
