import type { Route } from "next";
import type { MotifSignalement, StatutSignalement } from "shared";
import { readInt } from "./document-search";
import { readMotifSignalement, readStatutSignalement } from "./reports";
import { routes } from "./routes";

/** Taille de page de la file de modération. */
export const MODERATION_PAGE_SIZE = 6;

export type ModerationSearchState = {
	statut?: StatutSignalement;
	motif?: MotifSignalement;
	page: number;
};

/** Lit l'état des filtres de modération depuis l'URL. */
export function parseModerationSearchState(
	searchParams: URLSearchParams,
): ModerationSearchState {
	return {
		statut: readStatutSignalement(searchParams.get("statut")),
		motif: readMotifSignalement(searchParams.get("motif")),
		page: readInt(searchParams.get("page")) ?? 1,
	};
}

/** URL du détail d'un signalement. */
export function moderationReportHref(id: number): Route {
	return routes.moderationReport(id) as Route;
}
