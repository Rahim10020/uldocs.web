"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ChevronLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { FaculteTree, Utilisateur } from "shared";
import { AuthSelect } from "@/components/ui/auth-select";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FloatingInput } from "@/components/ui/floating-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { useSession } from "@/hooks/use-session";
import { useUpdateProfile } from "@/hooks/use-update-profile";
import {
  type AcademicSelection,
  resolveAcademicSelection,
} from "@/lib/academic-selection";
import {
  type EditProfileFormValues,
  editProfileSchema,
} from "@/lib/profile-schema";
import { routes } from "@/lib/routes";
import { ProfileLocked } from "../../components/profile-locked";

/** Écran de modification du profil. */
export function EditProfileContent() {
  const { user, isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return <EditProfileSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Container className="py-8 sm:py-12">
        <ProfileLocked nextPath={routes.profileEdit} />
      </Container>
    );
  }

  return <EditProfilePanel user={user} />;
}

function EditProfilePanel({ user }: { user: Utilisateur }) {
  const tree = useAcademicTree();
  const facultes = tree.data ?? [];
  const initialSelection = resolveAcademicSelection(facultes, user);

  return (
    <Container className="py-8 sm:py-12">
      <div className="mx-auto max-w-xl">
        <Link
          href={routes.profile}
          className="inline-flex items-center gap-2 text-sm font-medium text-black-60 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
        >
          <ChevronLeft aria-hidden className="size-5" />
          Retour
        </Link>

        <div className="mt-4 p-5 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Modification du profil
          </h1>
          <p className="mt-2 text-sm text-black-60">
            Mets à jour ton nom et tes informations académiques.
          </p>

          {tree.isPending ? (
            <EditProfileFormSkeleton />
          ) : tree.isError ? (
            <div className="mt-6 rounded-md border border-black-10 bg-surface p-6 text-center">
              <p className="text-sm text-black-70">
                Impossible de charger les informations académiques.
              </p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => void tree.refetch()}
              >
                <RefreshCw aria-hidden className="size-4" />
                Réessayer
              </Button>
            </div>
          ) : (
            <EditProfileForm
              user={user}
              facultes={facultes}
              initialSelection={initialSelection}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

function EditProfileForm({
  user,
  facultes,
  initialSelection,
}: {
  user: Utilisateur;
  facultes: FaculteTree[];
  initialSelection: AcademicSelection | null;
}) {
  const router = useRouter();
  const mutation = useUpdateProfile();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nom: user.nom,
      faculteId: initialSelection?.faculteId ?? "",
      filiereId: initialSelection?.filiereId ?? "",
      niveauId: initialSelection?.niveauId ?? "",
    },
  });

  const faculteId = useWatch({ control, name: "faculteId" });
  const filiereId = useWatch({ control, name: "filiereId" });

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

  const onSubmit = handleSubmit(async (values) => {
    await mutation.mutateAsync({
      nom: values.nom,
      faculteId: Number(values.faculteId),
      filiereId: Number(values.filiereId),
      niveauId: Number(values.niveauId),
    });

    router.push(routes.profile);
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
      <FloatingInput
        label="Nom complet"
        autoComplete="name"
        required
        error={errors.nom?.message}
        {...register("nom")}
      />

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-black">
          Tes informations académiques
        </legend>

        <Controller
          control={control}
          name="faculteId"
          render={({ field }) => (
            <AuthSelect
              label="Faculté"
              value={field.value}
              options={faculteOptions}
              onChange={(value) => {
                field.onChange(value);
                setValue("filiereId", "");
                setValue("niveauId", "");
              }}
              placeholder="Choisis ta faculté"
              error={errors.faculteId?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="filiereId"
          render={({ field }) => (
            <AuthSelect
              label="Filière"
              value={field.value}
              options={filiereOptions}
              onChange={(value) => {
                field.onChange(value);
                setValue("niveauId", "");
              }}
              placeholder={
                selectedFaculte
                  ? "Choisis ta filière"
                  : "Choisis d'abord une faculté"
              }
              disabled={!selectedFaculte}
              error={errors.filiereId?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="niveauId"
          render={({ field }) => (
            <AuthSelect
              label="Niveau"
              value={field.value}
              options={niveauOptions}
              onChange={field.onChange}
              placeholder={
                selectedFiliere
                  ? "Choisis ton niveau"
                  : "Choisis d'abord une filière"
              }
              disabled={!selectedFiliere}
              error={errors.niveauId?.message}
              required
            />
          )}
        />
      </fieldset>

      {mutation.isError ? (
        <p role="alert" className="text-sm text-error">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Impossible d'enregistrer tes modifications pour le moment."}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <ButtonLink
          href={routes.profile}
          variant="secondary"
          className="w-full sm:w-auto"
        >
          Annuler
        </ButtonLink>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full sm:w-auto"
        >
          {mutation.isPending ? "Enregistrement…" : "Modifier"}
        </Button>
      </div>
    </form>
  );
}

function EditProfileFormSkeleton() {
  return (
    <div className="mt-6 space-y-5">
      <Skeleton className="h-14" />
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
      <div className="flex gap-3 pt-2 sm:justify-end">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  );
}

function EditProfileSkeleton() {
  return (
    <Container className="py-8 sm:py-12">
      <div className="mx-auto max-w-xl">
        <Skeleton className="h-4 w-32" />
        <div className="mt-4 rounded-md border border-black-10 bg-white p-5 sm:p-8">
          <Skeleton className="h-8 w-64 max-w-full" />
          <Skeleton className="mt-2 h-4 w-72 max-w-full" />
          <EditProfileFormSkeleton />
        </div>
      </div>
    </Container>
  );
}
