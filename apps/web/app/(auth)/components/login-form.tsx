"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthLink } from "@/app/(auth)/components/auth-link";
import { FloatingInput } from "@/components/ui/floating-input";
import { LoadingDots } from "@/components/ui/loading-dots";
import { PasswordInput } from "@/components/ui/password-input";
import { useLogin } from "@/hooks/use-login";
import { ApiError } from "@/lib/api/errors";
import { type LoginFormValues, loginSchema } from "@/lib/auth-schemas";
import { routes } from "@/lib/routes";
import type { AuthMode } from "@/types/auth";

export function LoginForm({
  onSuccess,
  mode,
}: {
  onSuccess: () => void;
  mode: AuthMode;
}) {
  const loginMutation = useLogin();
  const [apiError, setApiError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      motDePasse: "",
    },
    mode: "onSubmit",
  });

  const isLoading = isSubmitting || loginMutation.isPending;

  async function onSubmit(values: LoginFormValues) {
    setApiError(null);

    try {
      await loginMutation.mutateAsync(values);
      onSuccess();
    } catch (error) {
      setApiError(
        error instanceof ApiError && error.status === 401
          ? "Email ou mot de passe incorrect."
          : "Impossible de te connecter pour le moment. Réessaie.",
      );
    }
  }

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
        label="Adresse e-mail"
        type="email"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register("email")}
      />

      <div>
        <PasswordInput
          label="Mot de passe"
          autoComplete="current-password"
          required
          error={errors.motDePasse?.message}
          {...register("motDePasse")}
        />
        <div className="mt-2 text-right">
          <AuthLink
            href={routes.forgotPassword}
            mode={mode}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
          >
            Mot de passe oublié ?
          </AuthLink>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-md font-semibold text-white transition-colors hover:bg-primary-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <LoadingDots />
            <span className="sr-only">Connexion en cours</span>
          </>
        ) : (
          "Se connecter"
        )}
      </button>

      <p className="text-center text-sm text-black-60">
        Pas encore de compte ?{" "}
        <AuthLink
          href={routes.register}
          mode={mode}
          className="font-semibold text-primary transition-colors hover:text-primary-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
        >
          S’inscrire
        </AuthLink>
      </p>
    </form>
  );
}
