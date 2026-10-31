"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthLink } from "@/app/(auth)/components/auth-link";
import { FloatingInput } from "@/components/ui/floating-input";
import { LoadingDots } from "@/components/ui/loading-dots";
import { PasswordInput } from "@/components/ui/password-input";
import { type RegisterFormValues, registerSchema } from "@/lib/auth-schemas";
import { withNextPath } from "@/lib/next-path";
import { routes } from "@/lib/routes";
import type { AuthMode } from "@/types/auth";

export function RegisterForm({
	onSubmit,
	apiError,
	mode,
	nextPath,
}: {
	onSubmit: (values: RegisterFormValues) => Promise<void>;
	apiError: string | null;
	mode: AuthMode;
	nextPath: string | null;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			nom: "",
			email: "",
			motDePasse: "",
			confirmation: "",
			charte: false,
		},
		mode: "onSubmit",
	});

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			{apiError ? (
				<div
					role="alert"
					className="rounded-md border border-error px-4 py-3 text-sm text-error"
				>
					{apiError}
				</div>
			) : null}

			<FloatingInput
				label="Nom complet"
				autoComplete="name"
				required
				error={errors.nom?.message}
				{...register("nom")}
			/>

			<FloatingInput
				label="Adresse e-mail"
				type="email"
				autoComplete="email"
				required
				error={errors.email?.message}
				{...register("email")}
			/>

			<PasswordInput
				label="Mot de passe"
				autoComplete="new-password"
				required
				error={errors.motDePasse?.message}
				{...register("motDePasse")}
			/>

			<PasswordInput
				label="Confirmation du mot de passe"
				autoComplete="new-password"
				required
				error={errors.confirmation?.message}
				{...register("confirmation")}
			/>

			<div>
				<div className="flex items-start gap-3">
					<input
						id="charte"
						type="checkbox"
						aria-invalid={Boolean(errors.charte)}
						aria-describedby={errors.charte ? "charte-error" : undefined}
						className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-black-30 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						{...register("charte")}
					/>
					<label
						htmlFor="charte"
						className="text-sm leading-relaxed text-black-70"
					>
						J&apos;accepte la{" "}
						<Link
							href={routes.charter}
							onClick={(event) => event.stopPropagation()}
							className="font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						>
							charte de contribution
						</Link>{" "}
						et la politique de confidentialité.
					</label>
				</div>
				{errors.charte ? (
					<p id="charte-error" className="mt-1.5 text-sm text-error">
						{errors.charte.message}
					</p>
				) : null}
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				aria-busy={isSubmitting}
				className="inline-flex cursor-pointer h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-md font-semibold text-white transition-colors hover:bg-primary-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
			>
				{isSubmitting ? (
					<>
						<LoadingDots />
						<span className="sr-only">Création du compte en cours</span>
					</>
				) : (
					"Créer un compte"
				)}
			</button>

			<p className="text-center text-sm text-black-60">
				Déjà un compte ?{" "}
				<AuthLink
					href={withNextPath(routes.login, nextPath)}
					mode={mode}
					className="font-semibold text-primary transition-colors hover:text-primary-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
				>
					Se connecter
				</AuthLink>
			</p>
		</form>
	);
}
