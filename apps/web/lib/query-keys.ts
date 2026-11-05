import type { DocumentSearchParams, ReportSearchParams } from "shared";

/** Clés TanStack Query : source unique pour lire et invalider le cache. */
export const queryKeys = {
	auth: {
		me: ["auth", "me"] as const,
	},
	academic: {
		tree: ["academic", "tree"] as const,
	},
	documents: {
		/** Racine de toutes les données documents (invalidation des favoris). */
		all: ["documents"] as const,
		list: (params: DocumentSearchParams) =>
			["documents", "list", params] as const,
		detail: (id: number) => ["documents", "detail", id] as const,
		publicByUser: (userId: number, page: number, pageSize: number) =>
			["documents", "public-by-user", userId, page, pageSize] as const,
		favoritesRoot: ["documents", "favorites"] as const,
		favorites: (page: number, pageSize: number) =>
			["documents", "favorites", page, pageSize] as const,
		mineRoot: ["documents", "mine"] as const,
		mine: (page: number, pageSize: number) =>
			["documents", "mine", page, pageSize] as const,
	},
	users: {
		publicProfile: (id: number) => ["users", "public-profile", id] as const,
	},
	reports: {
		all: ["reports"] as const,
		list: (params: ReportSearchParams) => ["reports", "list", params] as const,
		detail: (id: number) => ["reports", "detail", id] as const,
		openCount: ["reports", "open-count"] as const,
	},
};
