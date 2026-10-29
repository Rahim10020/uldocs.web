"use client";

import { ChevronLeft, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Utilisateur } from "shared";
import { AuthDialog } from "@/app/(auth)/components/auth-dialog";
import { AuthSelect } from "@/components/ui/auth-select";
import { LoadingDots } from "@/components/ui/loading-dots";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { routes } from "@/lib/routes";
import { getFirstName } from "@/lib/user";
import { cn } from "@/lib/utils";
import type { AcademicDraft } from "@/types/auth";

type Step = 1 | 2 | 3;

const STEPS: Step[] = [1, 2, 3];

const STEP_CONTENT: Record<Step, { description: string; title: string }> = {
	1: {
		title: "Bienvenue",
		description:
			"Complète ton profil pour personnaliser ton expérience. Tu pourras le faire plus tard depuis ton compte.",
	},
	2: {
		title: "Quelle est ta filière ?",
		description:
			"Choisis la filière qui correspond à ton parcours pour retrouver les bons documents.",
	},
	3: {
		title: "En quelle année es-tu ?",
		description:
			"Sélectionne ton niveau actuel pour affiner les ressources qui te sont proposées.",
	},
};

export function OnboardingFlow({
	user,
	isSaving,
	onFinish,
}: {
	user: Utilisateur;
	isSaving: boolean;
	onFinish: (draft: AcademicDraft) => void | Promise<void>;
}) {
	const treeQuery = useAcademicTree();
	const [step, setStep] = useState<Step>(1);
	const [faculteId, setFaculteId] = useState("");
	const [filiereId, setFiliereId] = useState("");
	const [niveauId, setNiveauId] = useState("");

	const facultes = treeQuery.data ?? [];
	const selectedFaculte = facultes.find(
		(faculte) => String(faculte.id) === faculteId,
	);
	const selectedFiliere = selectedFaculte?.filieres.find(
		(filiere) => String(filiere.id) === filiereId,
	);

	const faculteOptions = facultes.map((faculte) => ({
		value: String(faculte.id),
		label: `${faculte.nom} (${faculte.code})`,
	}));
	const filiereOptions =
		selectedFaculte?.filieres.map((filiere) => ({
			value: String(filiere.id),
			label: filiere.nom,
		})) ?? [];
	const niveauOptions =
		selectedFiliere?.niveaux.map((niveau) => ({
			value: String(niveau.id),
			label: niveau.nom,
		})) ?? [];

	const hasSelection =
		step === 1
			? Boolean(faculteId)
			: step === 2
				? Boolean(filiereId)
				: Boolean(niveauId);
	const isTreeLoading = treeQuery.isPending;
	const isTreeError = treeQuery.isError;
	const canContinue = hasSelection && !isTreeLoading && !isTreeError;
	const stepContent = STEP_CONTENT[step];
	const title =
		step === 1 ? `Bienvenue, ${getFirstName(user.nom)} !` : stepContent.title;

	function handleFaculteChange(value: string) {
		setFaculteId(value);
		setFiliereId("");
		setNiveauId("");
	}

	function handleFiliereChange(value: string) {
		setFiliereId(value);
		setNiveauId("");
	}

	function handleBack() {
		setStep((current) => (current > 1 ? ((current - 1) as Step) : current));
	}

	function handleFinish() {
		void onFinish({
			faculteId: faculteId ? Number(faculteId) : null,
			filiereId: filiereId ? Number(filiereId) : null,
			niveauId: niveauId ? Number(niveauId) : null,
		});
	}

	function handleContinue() {
		if (step < 3) {
			setStep((current) => (current + 1) as Step);
			return;
		}

		handleFinish();
	}

	const desktopHeader = (
		<div className="mb-6 hidden lg:block">
			<div className="flex items-center justify-between gap-4">
				<span className="text-sm font-semibold text-black-60">
					Étape {step} sur 3
				</span>
				<button
					type="button"
					onClick={handleFinish}
					disabled={isSaving}
					className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-black-60 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50"
				>
					Passer
					<X aria-hidden className="size-4" />
				</button>
			</div>
			<div
				className="mt-3 flex gap-2"
				role="progressbar"
				aria-label="Progression de l’inscription"
				aria-valuemin={1}
				aria-valuemax={3}
				aria-valuenow={step}
			>
				{STEPS.map((item) => (
					<span
						key={item}
						className={cn(
							"h-1 flex-1 rounded-full transition-colors",
							item <= step ? "bg-primary" : "bg-black-10",
						)}
					/>
				))}
			</div>
		</div>
	);

	const mobileHeader = (
		<div className="flex h-16 shrink-0 items-center justify-between px-5 lg:hidden">
			<div className="flex min-w-10 items-center">
				{step > 1 ? (
					<button
						type="button"
						onClick={handleBack}
						disabled={isSaving}
						aria-label="Étape précédente"
						className="flex size-9 items-center justify-center rounded text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50"
					>
						<ChevronLeft aria-hidden className="size-5" />
					</button>
				) : (
					<Link
						href={routes.home}
						aria-label="ulDocs — Accueil"
						className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
					>
						<Image
							src="/logo.svg"
							alt="ulDocs"
							width={92}
							height={25}
							priority
							unoptimized
							className="h-5 w-auto"
						/>
					</Link>
				)}
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm font-semibold text-black-60">
					Étape {step} sur 3
				</span>
				<button
					type="button"
					onClick={handleFinish}
					disabled={isSaving}
					aria-label="Passer l’inscription"
					className="flex size-8 items-center justify-center rounded text-black-50 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50"
				>
					<X aria-hidden className="size-4" />
				</button>
			</div>
		</div>
	);

	return (
		<AuthDialog
			title={title}
			description={stepContent.description}
			mobileHeader={mobileHeader}
			topContent={desktopHeader}
		>
			<div className="space-y-5">
				{isTreeError ? (
					<div
						role="alert"
						className="rounded-md border border-error px-4 py-3 text-sm text-error"
					>
						<p>Impossible de charger les données académiques.</p>
						<button
							type="button"
							onClick={() => void treeQuery.refetch()}
							className="mt-2 font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						>
							Réessayer
						</button>
					</div>
				) : null}

				{step === 1 ? (
					<AuthSelect
						label="Faculté"
						value={faculteId}
						options={faculteOptions}
						onChange={handleFaculteChange}
						placeholder={
							isTreeLoading
								? "Chargement des facultés…"
								: "Sélectionne ta faculté"
						}
						disabled={isTreeLoading || isTreeError}
					/>
				) : null}

				{step === 2 ? (
					<AuthSelect
						label="Filière"
						value={filiereId}
						options={filiereOptions}
						onChange={handleFiliereChange}
						placeholder={
							filiereOptions.length === 0
								? "Aucune filière disponible"
								: "Sélectionne ta filière"
						}
						disabled={filiereOptions.length === 0}
					/>
				) : null}

				{step === 3 ? (
					<AuthSelect
						label="Niveau"
						value={niveauId}
						options={niveauOptions}
						onChange={setNiveauId}
						placeholder={
							niveauOptions.length === 0
								? "Aucun niveau disponible"
								: "Sélectionne ton niveau"
						}
						disabled={niveauOptions.length === 0}
					/>
				) : null}

				<button
					type="button"
					onClick={handleContinue}
					disabled={!canContinue || isSaving}
					aria-busy={isSaving}
					className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-md font-semibold text-white transition-colors hover:bg-primary-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					{isSaving ? (
						<>
							<LoadingDots />
							<span className="sr-only">Enregistrement du profil</span>
						</>
					) : step === 3 ? (
						"Terminer"
					) : (
						"Continuer"
					)}
				</button>

				<div className="flex min-h-9 items-center justify-between">
					{step > 1 ? (
						<button
							type="button"
							onClick={handleBack}
							disabled={isSaving}
							className="hidden rounded text-sm font-semibold text-black-60 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50 lg:inline-flex"
						>
							Retour
						</button>
					) : (
						<span />
					)}
					<button
						type="button"
						onClick={handleFinish}
						disabled={isSaving}
						className="rounded text-sm font-semibold text-black-60 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:pointer-events-none disabled:opacity-50 lg:hidden"
					>
						Passer
					</button>
				</div>
			</div>
		</AuthDialog>
	);
}
