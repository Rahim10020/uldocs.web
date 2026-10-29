"use client";

import { Check, Compass, Upload } from "lucide-react";
import Link from "next/link";
import type { Utilisateur } from "shared";
import { AuthDialog } from "@/app/(auth)/components/auth-dialog";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { getFirstName } from "@/lib/user";
import type { AcademicDraft } from "@/types/auth";

export function RegisterSuccess({
	user,
	draft,
	saveError,
}: {
	user: Utilisateur;
	draft: AcademicDraft;
	saveError: string | null;
}) {
	const firstName = getFirstName(user.nom);
	const hasAcademicInfo =
		draft.faculteId !== null ||
		draft.filiereId !== null ||
		draft.niveauId !== null;
	const isProfileComplete = draft.filiereId !== null && draft.niveauId !== null;

	return (
		<AuthDialog
			title={`Ton ${isProfileComplete ? "profil" : "compte"} est prêt, ${firstName} !`}
			description={
				isProfileComplete
					? "Les documents de ta filière t’attendent. Tu peux aussi partager les tiens dès maintenant."
					: "Ton compte est créé. Tu peux compléter ton profil plus tard depuis ton espace personnel."
			}
		>
			<div className="space-y-6">
				<div className="flex items-start gap-4 rounded-md border border-black-10 bg-surface p-4">
					<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-10 text-primary">
						<Check aria-hidden className="size-5" />
					</span>
					<div>
						<p className="font-semibold text-black">Bienvenue sur ulDocs</p>
						<p className="mt-1 text-sm leading-relaxed text-black-60">
							{isProfileComplete
								? "Ton profil académique est configuré. Tu peux le modifier à tout moment depuis ton compte."
								: hasAcademicInfo
									? "Tes informations académiques sont enregistrées. Tu pourras les compléter depuis ton compte."
									: "Tu pourras choisir ta faculté, ta filière et ton niveau depuis ton compte."}
						</p>
					</div>
				</div>

				{saveError ? (
					<div
						role="alert"
						className="rounded-md border border-error px-4 py-3 text-sm text-error"
					>
						{saveError}
					</div>
				) : null}

				<div className="space-y-3">
					{draft.filiereId !== null ? (
						<Link
							href={routes.filiere(draft.filiereId)}
							className={buttonStyles({ className: "h-12 w-full text-md" })}
						>
							<Compass aria-hidden className="size-4" />
							Explorer ma filière
						</Link>
					) : (
						<Link
							href={routes.documents}
							className={buttonStyles({ className: "h-12 w-full text-md" })}
						>
							<Compass aria-hidden className="size-4" />
							Explorer les documents
						</Link>
					)}
					<ButtonLink
						href={routes.newDocument}
						variant="secondary"
						className="h-12 w-full text-md"
					>
						<Upload aria-hidden className="size-4" />
						Importer un document
					</ButtonLink>
				</div>
			</div>
		</AuthDialog>
	);
}
