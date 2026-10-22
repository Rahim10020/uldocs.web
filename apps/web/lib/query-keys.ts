import type { DocumentSearchParams } from "shared";

/** Clés TanStack Query : source unique pour lire et invalider le cache. */
export const queryKeys = {
  academic: {
    tree: ["academic", "tree"] as const,
  },
  documents: {
    list: (params: DocumentSearchParams) =>
      ["documents", "list", params] as const,
    detail: (id: number) => ["documents", "detail", id] as const,
  },
};
