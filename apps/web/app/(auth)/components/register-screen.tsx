"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Utilisateur } from "shared";
import { AuthDialog } from "@/app/(auth)/components/auth-dialog";
import { OnboardingFlow } from "@/app/(auth)/components/onboarding-flow";
import { RegisterForm } from "@/app/(auth)/components/register-form";
import { RegisterSuccess } from "@/app/(auth)/components/register-success";
import { useNextPath } from "@/hooks/use-next-path";
import { useRegister } from "@/hooks/use-register";
import { useUpdateProfile } from "@/hooks/use-update-profile";
import { ApiError } from "@/lib/api/errors";
import type { RegisterFormValues } from "@/lib/auth-schemas";
import { routes } from "@/lib/routes";
import type { AcademicDraft, AuthMode, RegisterStage } from "@/types/auth";

const EMPTY_DRAFT: AcademicDraft = {
	faculteId: null,
	filiereId: null,
	niveauId: null,
};

export function RegisterScreen({ mode }: { mode: AuthMode }) {
	const router = useRouter();
	const nextPath = useNextPath();
	const registerMutation = useRegister();
	const updateMutation = useUpdateProfile();
	const [stage, setStage] = useState<RegisterStage>("form");
	const [user, setUser] = useState<Utilisateur | null>(null);
	const [draft, setDraft] = useState<AcademicDraft>(EMPTY_DRAFT);
	const [apiError, setApiError] = useState<string | null>(null);
	const [saveError, setSaveError] = useState<string | null>(null);

	const close = () => {
		if (mode === "modal") {
			router.back();
			return;
		}

		router.push(routes.home);
	};

	async function handleRegister(values: RegisterFormValues) {
		setApiError(null);

		try {
			const registeredUser = await registerMutation.mutateAsync({
				nom: values.nom,
				email: values.email,
				motDePasse: values.motDePasse,
			});
			setUser(registeredUser);
			setStage("onboarding");
		} catch (error) {
			setApiError(
				error instanceof ApiError && error.status === 409
					? "Cet email est déjà utilisé. Essaie de te connecter."
					: "Impossible de créer ton compte pour le moment. Réessaie.",
			);
		}
	}

	async function handleFinish(nextDraft: AcademicDraft) {
		setDraft(nextDraft);
		setSaveError(null);

		const hasAcademicSelection =
			nextDraft.faculteId !== null ||
			nextDraft.filiereId !== null ||
			nextDraft.niveauId !== null;

		if (hasAcademicSelection) {
			try {
				await updateMutation.mutateAsync(nextDraft);
			} catch {
				setSaveError(
					"Tes informations académiques n’ont pas pu être enregistrées. Tu pourras les compléter plus tard depuis ton compte.",
				);
			}
		}

		setStage("success");
	}

	if (stage === "form" || !user) {
		return (
			<AuthDialog
				title="Créer ton compte"
				description="Rejoins la communauté ulDocs et partage les documents qui font avancer tout le monde."
				image
				onClose={close}
			>
				<RegisterForm
					onSubmit={handleRegister}
					apiError={apiError}
					mode={mode}
					nextPath={nextPath}
				/>
			</AuthDialog>
		);
	}

	if (stage === "success") {
		return (
			<RegisterSuccess
				user={user}
				draft={draft}
				saveError={saveError}
				nextPath={nextPath}
			/>
		);
	}

	return (
		<OnboardingFlow
			user={user}
			isSaving={updateMutation.isPending}
			onFinish={handleFinish}
		/>
	);
}
