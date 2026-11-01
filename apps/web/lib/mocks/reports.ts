import type { ReportDocumentPayload, Signalement } from "shared";
import { ApiError } from "../api/errors";
import { getMockDocument } from "./documents";

const REPORTS: Signalement[] = [];
let nextReportId = 1;

/** POST /documents/:id/report — crée un signalement `ouvert`. */
export function createMockReport({
  documentId,
  signaleurId,
  payload,
}: {
  documentId: number;
  signaleurId: number;
  payload: ReportDocumentPayload;
}): Signalement {
  if (!getMockDocument(documentId)) {
    throw new ApiError("Document introuvable", 404, "NOT_FOUND");
  }

  const commentaire = payload.commentaire?.trim() || null;

  if (commentaire && commentaire.length > 1000) {
    throw new ApiError(
      "Les détails ne peuvent pas dépasser 1000 caractères",
      400,
      "VALIDATION_ERROR",
    );
  }

  const report: Signalement = {
    id: nextReportId++,
    documentId,
    signaleurId,
    motif: payload.motif,
    commentaire,
    statut: "ouvert",
    traitePar: null,
    dateSignalement: new Date().toISOString(),
    dateTraitement: null,
  };

  REPORTS.push(report);

  return report;
}

/** Réinitialise les signalements créés en mémoire (tests). */
export function resetMockReports(): void {
  REPORTS.length = 0;
  nextReportId = 1;
}
