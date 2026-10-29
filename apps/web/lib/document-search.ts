import {
	TRIS_DOCUMENTS,
	type TriDocuments,
	TYPES_DOCUMENT,
	type TypeDocument,
} from "shared";

/** Taille de page de la recherche (contrat API : 20 par défaut). */
export const DOCUMENTS_PAGE_SIZE = 20;

export type SearchView = "grid" | "list";

/** Cinq dernières années académiques, la plus récente en premier. */
export function getAcademicYears(count = 5, now = new Date()): string[] {
	const startYear =
		now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;

	return Array.from(
		{ length: count },
		(_, index) => `${startYear - index}-${startYear - index + 1}`,
	);
}

export function readInt(value: string | null): number | undefined {
	if (!value) {
		return undefined;
	}

	const parsed = Number(value);

	return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

export function readString(value: string | null): string | undefined {
	return value === null || value === "" ? undefined : value;
}

export function readTypeDocument(
	value: string | null,
): TypeDocument | undefined {
	return value && TYPES_DOCUMENT.includes(value as TypeDocument)
		? (value as TypeDocument)
		: undefined;
}

export function readTriDocuments(
	value: string | null,
): TriDocuments | undefined {
	return value && TRIS_DOCUMENTS.includes(value as TriDocuments)
		? (value as TriDocuments)
		: undefined;
}
