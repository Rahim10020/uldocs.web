"use client";

import { ArrowRight, ChevronLeft, RefreshCw } from "lucide-react";
import { useId } from "react";
import { AuthSelect } from "@/components/ui/auth-select";
import { Button } from "@/components/ui/button";
import type { NewDocumentFlowController } from "@/hooks/use-new-document-flow";
import { TYPE_DOCUMENT_OPTIONS } from "@/lib/document-labels";
import { cn } from "@/lib/utils";

/** Étape 2 : titres individuels, type et rattachement académique. */
export function DetailsStep({ flow }: { flow: NewDocumentFlowController }) {
  const errors = flow.form.formState.errors;
  const faculteId = flow.form.watch("faculteId");
  const filiereId = flow.form.watch("filiereId");
  const treeUnavailable = flow.treeQuery.isPending || flow.treeQuery.isError;
  const titleId = useId();

  return (
    <section className="mt-8" aria-labelledby="details-step-title">
      <div className="mx-auto w-full max-w-sm">
        <button
          type="button"
          onClick={flow.handleBack}
          className="mb-6 cursor-pointer inline-flex items-center gap-2 rounded text-sm font-semibold text-black-70 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
        >
          <ChevronLeft aria-hidden className="size-5" />
          Retour
        </button>

        <div>
          <h2
            id="details-step-title"
            className="text-xl font-bold text-black sm:text-2xl"
          >
            Détails du document
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-black-60">
            Ces informations aident les autres à trouver ton document.
          </p>
        </div>

        {flow.treeQuery.isError ? (
          <div
            role="alert"
            className="mt-5 flex flex-col gap-3 rounded-md border border-error px-4 py-3 text-sm text-error sm:flex-row sm:items-center sm:justify-between"
          >
            <span>Impossible de charger les données académiques.</span>
            <Button
              variant="secondary"
              size="sm"
              className="self-start sm:self-auto"
              onClick={() => void flow.treeQuery.refetch()}
            >
              <RefreshCw aria-hidden className="size-4" />
              Réessayer
            </Button>
          </div>
        ) : null}

        <div className="mt-6 space-y-5">
          {flow.files.map((item, index) => {
            const inputId = `${titleId}-${index}`;
            const errorId = `${inputId}-error`;
            const error = flow.titleErrors[item.id];

            return (
              <div key={item.id}>
                <label
                  htmlFor={inputId}
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Titre du document
                  <span aria-hidden> *</span>
                </label>
                <input
                  id={inputId}
                  value={flow.titles[item.id] ?? ""}
                  onChange={(event) =>
                    flow.handleTitleChange(item.id, event.target.value)
                  }
                  maxLength={160}
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  className={cn(
                    "h-12 w-full rounded-md border border-black-30 bg-white px-4 text-md text-black outline-none transition-colors focus:border-primary",
                    error && "border-error focus:border-error",
                  )}
                />
                {error ? (
                  <p id={errorId} className="mt-1.5 text-sm text-error">
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold text-black">
            Type de document
            <span aria-hidden> *</span>
          </legend>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            {TYPE_DOCUMENT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-black"
              >
                <input
                  type="radio"
                  value={option.value}
                  {...flow.form.register("type")}
                  className="size-4 accent-primary"
                />
                {option.label}
              </label>
            ))}
          </div>
          {errors.type?.message ? (
            <p className="mt-2 text-sm text-error">{errors.type.message}</p>
          ) : null}
        </fieldset>

        <div className="mt-8 space-y-4">
          <AuthSelect
            label="Faculté"
            value={faculteId}
            options={flow.faculteOptions}
            placeholder={
              flow.treeQuery.isPending ? "Chargement…" : "Choisir une faculté"
            }
            onChange={flow.handleFaculteChange}
            disabled={treeUnavailable}
            error={errors.faculteId?.message}
            required
          />
          <AuthSelect
            label="Filière"
            value={filiereId}
            options={flow.filiereOptions}
            placeholder={
              !faculteId ? "Choisis d’abord une faculté" : "Choisir une filière"
            }
            onChange={flow.handleFiliereChange}
            disabled={treeUnavailable || !faculteId}
            error={errors.filiereId?.message}
            required
          />
        </div>

        <div className="mt-8">
          <Button
            className="h-12 w-full rounded-md text-md"
            onClick={() => void flow.handleDetailsContinue()}
          >
            Continuer
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
