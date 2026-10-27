"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import type { DocumentDetail, VoteDocument } from "shared";
import { useDocumentReaction } from "@/hooks/use-document-reaction";
import { nextReactionVote, usefulPercentage } from "@/lib/document-detail";
import { cn } from "@/lib/utils";

type ReactionVariant = "icons" | "sheet";

const VOTES: {
  valeur: VoteDocument;
  label: string;
  icon: typeof ThumbsUp;
}[] = [
  { valeur: "utile", label: "Utile", icon: ThumbsUp },
  { valeur: "inutile", label: "Pas utile", icon: ThumbsDown },
];

export function DocumentReaction({
  document,
  variant = "icons",
}: {
  document: DocumentDetail;
  variant?: ReactionVariant;
}) {
  const mutation = useDocumentReaction();
  const current = document.reaction.voteUtilisateur;

  function vote(valeur: VoteDocument) {
    mutation.mutate({
      documentId: document.id,
      valeur: nextReactionVote(current, valeur),
    });
  }

  const percentage = usefulPercentage(document.reaction);
  const total = document.reaction.votesUtiles + document.reaction.votesInutiles;

  if (variant === "sheet") {
    return (
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-black">
          Ce document est-il utile ?
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {VOTES.map(({ valeur, label, icon: Icon }) => {
            const selected = current === valeur;

            return (
              <button
                key={valeur}
                type="button"
                aria-pressed={selected}
                disabled={mutation.isPending}
                onClick={() => vote(valeur)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-wait disabled:opacity-60",
                  selected
                    ? "border-primary bg-primary-5 text-primary"
                    : "border-black-20 text-black-70 hover:border-black-30 hover:text-black",
                )}
              >
                <Icon
                  aria-hidden
                  className={cn("size-4", selected && "fill-current")}
                />
                {label}
              </button>
            );
          })}

          <span className="ml-auto text-sm text-black-60" aria-live="polite">
            {percentage}% ({total})
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {VOTES.map(({ valeur, label, icon: Icon }) => {
        const selected = current === valeur;

        return (
          <button
            key={valeur}
            type="button"
            aria-label={label}
            aria-pressed={selected}
            title={label}
            disabled={mutation.isPending}
            onClick={() => vote(valeur)}
            className={cn(
              "flex size-8 items-center justify-center rounded transition-colors cursor-pointer bg-surface p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 disabled:cursor-wait disabled:opacity-60",
              selected ? "text-primary" : "text-black-50 hover:text-black-90",
            )}
          >
            <Icon
              aria-hidden
              className={cn("size-5", selected && "fill-current")}
            />
          </button>
        );
      })}
    </div>
  );
}
