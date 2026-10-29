"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthDialog } from "@/app/(auth)/components/auth-dialog";
import { AuthLink } from "@/app/(auth)/components/auth-link";
import { FloatingInput } from "@/components/ui/floating-input";
import { LoadingDots } from "@/components/ui/loading-dots";
import { useForgotPassword } from "@/hooks/use-forgot-password";
import {
	type ForgotPasswordFormValues,
	forgotPasswordSchema,
} from "@/lib/auth-schemas";
import { routes } from "@/lib/routes";
import type { AuthMode } from "@/types/auth";

export function ForgotPasswordScreen({ mode }: { mode: AuthMode }) {
	const router = useRouter();
	const forgotMutation = useForgotPassword();
	const [sent, setSent] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: { email: "" },
		mode: "onSubmit",
	});

	const isLoading = isSubmitting || forgotMutation.isPending;

	const close = () => {
		if (mode === "modal") {
			router.back();
			return;
		}

		router.push(routes.home);
	};

	async function onSubmit(values: ForgotPasswordFormValues) {
		setApiError(null);

		try {
			await forgotMutation.mutateAsync(values.email);
			setSent(true);
		} catch {
			setApiError(
				"Impossible d’envoyer le lien pour le moment. Réessaie dans un instant.",
			);
		}
	}

	return (
		<AuthDialog
			title={sent ? "Vérifie ta boîte mail" : "Mot de passe oublié"}
			description={
				sent
					? "Si un compte existe avec cette adresse, un lien de réinitialisation vient d’être envoyé."
					: "Saisis l’adresse email de ton compte : nous t’enverrons un lien pour choisir un nouveau mot de passe."
			}
			image
			onClose={close}
		>
			{sent ? (
				<div className="space-y-5">
					<div className="rounded-md border border-black-10 bg-surface px-4 py-3 text-sm text-black-70">
						Pense à vérifier tes courriers indésirables.
					</div>
					<AuthLink
						href={routes.login}
						mode={mode}
						className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-md font-semibold text-white transition-colors hover:bg-primary-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 focus-visible:ring-offset-2"
					>
						Retour à la connexion
					</AuthLink>
				</div>
			) : (
				<form
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-5"
				>
					{apiError ? (
						<div
							role="alert"
							className="rounded-md border border-error px-4 py-3 text-sm text-error"
						>
							{apiError}
						</div>
					) : null}

					<FloatingInput
						label="Adresse e-mail"
						type="email"
						autoComplete="email"
						required
						error={errors.email?.message}
						{...register("email")}
					/>

					<button
						type="submit"
						disabled={isLoading}
						aria-busy={isLoading}
						className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-md font-semibold text-white transition-colors hover:bg-primary-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
					>
						{isLoading ? (
							<>
								<LoadingDots />
								<span className="sr-only">Envoi en cours</span>
							</>
						) : (
							"Envoyer le lien"
						)}
					</button>

					<p className="text-center text-sm text-black-60">
						<AuthLink
							href={routes.login}
							mode={mode}
							className="font-semibold text-primary transition-colors hover:text-primary-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						>
							Retour à la connexion
						</AuthLink>
					</p>
				</form>
			)}
		</AuthDialog>
	);
}
