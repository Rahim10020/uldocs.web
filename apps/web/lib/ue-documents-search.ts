import type { DocumentSearchParams } from "shared";
import {
	DOCUMENTS_PAGE_SIZE,
	readInt,
	readString,
	readTriDocuments,
	readTypeDocument,
	type SearchView,
} from "./document-search";

export type UeDocumentsSearchState = {
	type?: DocumentSearchParams["type"];
	anneeAcademique?: string;
	tri?: DocumentSearchParams["tri"];
	page: number;
	view: SearchView;
};

export function parseUeDocumentsSearchState(
	searchParams: URLSearchParams,
): UeDocumentsSearchState {
	const view = searchParams.get("view");

	return {
		type: readTypeDocument(searchParams.get("type")),
		anneeAcademique: readString(searchParams.get("anneeAcademique")),
		tri: readTriDocuments(searchParams.get("tri")),
		page: readInt(searchParams.get("page")) ?? 1,
		view: view === "list" ? "list" : "grid",
	};
}

/** Construit les paramètres API en verrouillant l'UE de la page courante. */
export function toUeDocumentsParams(
	ueId: number,
	state: UeDocumentsSearchState,
): DocumentSearchParams {
	return {
		ueId,
		type: state.type,
		anneeAcademique: state.anneeAcademique,
		tri: state.tri,
		page: state.page,
		pageSize: DOCUMENTS_PAGE_SIZE,
	};
}
