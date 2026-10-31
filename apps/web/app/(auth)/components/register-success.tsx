"use client";

import { ArrowRight, Check, Compass, Upload } from "lucide-react";
import type { Route } from "next";
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
	nextPath,
}: {
	user: Utilisateur;
	draft: AcademicDraft;
	saveError: string | null;
	nextPath: string | null;
}) {
	const firstName = getFirstName(user.nom);
	const hasAcademicInfo =
		draft.faculteId !== null ||
		draft.filiereId !== null ||
		draft.niveauId !== null;
	const isProfileComplete = draft.filiereId !== null && draft.niveauId !== null;
	const isNextImport = nextPath === routes.newDocument;
	const primaryHref = (nextPath ??
		(draft.filiereId !== null
			? routes.filiere(draft.filiereId)
			: routes.documents)) as Route;
	const primaryLabel = nextPath
		? isNextImport
			? "Importer un document"
			: "Continuer"
		: draft.filiereId !== null
			? "Explorer ma filière"
			: "Explorer les documents";
	const PrimaryIcon = nextPath ? (isNextImport ? Upload : ArrowRight) : Compass;

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
					<Link
						href={primaryHref}
						className={buttonStyles({ className: "h-12 w-full text-md" })}
					>
						<PrimaryIcon aria-hidden className="size-4" />
						{primaryLabel}
					</Link>
					{isNextImport ? null : (
						<ButtonLink
							href={routes.newDocument}
							variant="secondary"
							className="h-12 w-full text-md"
						>
							<Upload aria-hidden className="size-4" />
							Importer un document
						</ButtonLink>
					)}
				</div>
			</div>
		</AuthDialog>
	);
}
