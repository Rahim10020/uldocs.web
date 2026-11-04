import type {
	ActionModeration,
	ModerationAction,
	ModerationActionPayload,
	ReportDocumentPayload,
	ReportSearchParams,
	Signalement,
	SignalementDetail,
	SignalementListItem,
	StatutSignalement,
} from "shared";
import { ApiError } from "../api/errors";
import {
	MODERATION_REASON_MAX_LENGTH,
	MODERATION_REASON_MIN_LENGTH,
} from "../reports";
import {
	getMockDocument,
	MOCK_DOCUMENTS,
	setMockDocumentStatus,
} from "./documents";
import { MOCK_USERS, setMockUserStatus } from "./users";

type StoredModerationAction = ModerationAction & {
	reportId: number;
};

type SeedDecision = {
	moderateurId: number;
	action: ActionModeration;
	raison: string;
};

type SeedReport = {
	documentId: number;
	signaleurId: number;
	motif: Signalement["motif"];
	statut: StatutSignalement;
	commentaire?: string;
	/** Ancienneté en heures par rapport à la date de référence des seeds. */
	hoursAgo: number;
	decision?: SeedDecision;
};

const SEED_NOW = Date.UTC(2026, 10, 4, 9, 0, 0);
const HOUR_MS = 3_600_000;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

function at(hoursAgo: number): string {
	return new Date(SEED_NOW - hoursAgo * HOUR_MS).toISOString();
}

/**
 * Signalements de démonstration.
 * Trois reports ouverts alimentent le compteur « en attente ».
 */
const SEED_REPORTS: SeedReport[] = [
	{
		documentId: 1,
		signaleurId: 2,
		motif: "droit_auteur",
		statut: "ouvert",
		commentaire:
			"Ce document est mon cours, je n'ai pas autorisé sa diffusion.",
		hoursAgo: 2,
	},
	{
		documentId: 2,
		signaleurId: 3,
		motif: "erreur",
		statut: "ouvert",
		commentaire: "La correction de l'exercice 3 semble incorrecte.",
		hoursAgo: 4,
	},
	{
		documentId: 4,
		signaleurId: 1,
		motif: "doublon",
		statut: "ouvert",
		hoursAgo: 6,
	},
	{
		documentId: 5,
		signaleurId: 4,
		motif: "mal_classe",
		statut: "en_cours",
		hoursAgo: 9,
	},
	{
		documentId: 5,
		signaleurId: 2,
		motif: "qualite",
		statut: "en_cours",
		commentaire: "Le scan est trop sombre pour être lisible.",
		hoursAgo: 12,
	},
	{
		documentId: 8,
		signaleurId: 6,
		motif: "contenu_illegal",
		statut: "en_cours",
		hoursAgo: 15,
	},
	{
		documentId: 10,
		signaleurId: 3,
		motif: "autre",
		statut: "en_cours",
		hoursAgo: 18,
	},
	{
		documentId: 1,
		signaleurId: 4,
		motif: "droit_auteur",
		statut: "traite",
		hoursAgo: 24,
		decision: {
			moderateurId: 7,
			action: "avertir",
			raison:
				"L'uploader a été averti et devra vérifier les autorisations de diffusion.",
		},
	},
	{
		documentId: 3,
		signaleurId: 5,
		motif: "erreur",
		statut: "traite",
		hoursAgo: 30,
		decision: {
			moderateurId: 7,
			action: "retirer",
			raison:
				"Le document contient plusieurs erreurs de corrigé confirmées par l'enseignant.",
		},
	},
	{
		documentId: 7,
		signaleurId: 6,
		motif: "doublon",
		statut: "traite",
		hoursAgo: 36,
		decision: {
			moderateurId: 8,
			action: "avertir",
			raison:
				"Un doublon a été signalé à l'uploader pour éviter de futures publications identiques.",
		},
	},
	{
		documentId: 9,
		signaleurId: 1,
		motif: "mal_classe",
		statut: "traite",
		hoursAgo: 42,
		decision: {
			moderateurId: 7,
			action: "retirer",
			raison:
				"Le document ne correspond pas à l'UE indiquée et sera réimporté au bon endroit.",
		},
	},
	{
		documentId: 12,
		signaleurId: 2,
		motif: "qualite",
		statut: "traite",
		hoursAgo: 48,
		decision: {
			moderateurId: 7,
			action: "avertir",
			raison:
				"L'uploader a été averti : les prochains scans devront être lisibles.",
		},
	},
	{
		documentId: 14,
		signaleurId: 3,
		motif: "contenu_illegal",
		statut: "traite",
		hoursAgo: 54,
		decision: {
			moderateurId: 7,
			action: "suspendre",
			raison:
				"Le contenu est contraire à la charte. Le document est retiré et l'uploader suspendu.",
		},
	},
	{
		documentId: 16,
		signaleurId: 4,
		motif: "droit_auteur",
		statut: "traite",
		hoursAgo: 60,
		decision: {
			moderateurId: 7,
			action: "bannir",
			raison:
				"Réitération de publications non autorisées. Le document est retiré et l'uploader banni.",
		},
	},
	{
		documentId: 18,
		signaleurId: 5,
		motif: "erreur",
		statut: "rejete",
		hoursAgo: 66,
		decision: {
			moderateurId: 7,
			action: "valider",
			raison:
				"Après vérification, le contenu est conforme et le signalement n'est pas fondé.",
		},
	},
	{
		documentId: 20,
		signaleurId: 6,
		motif: "doublon",
		statut: "rejete",
		hoursAgo: 72,
		decision: {
			moderateurId: 8,
			action: "valider",
			raison:
				"Les deux documents portent sur des sessions différentes : aucun doublon.",
		},
	},
	{
		documentId: 22,
		signaleurId: 1,
		motif: "autre",
		statut: "rejete",
		hoursAgo: 78,
		decision: {
			moderateurId: 7,
			action: "valider",
			raison:
				"Le motif ne permet pas d'identifier un problème nécessitant une action.",
		},
	},
	{
		documentId: 1,
		signaleurId: 5,
		motif: "doublon",
		statut: "rejete",
		hoursAgo: 84,
		decision: {
			moderateurId: 7,
			action: "valider",
			raison:
				"Le document n'est pas un doublon : il s'agit d'une version révisée.",
		},
	},
];

const REPORTS: Signalement[] = [];
const ACTIONS: StoredModerationAction[] = [];
let nextReportId = 1;
let nextActionId = 1;

function buildSeed(): {
	reports: Signalement[];
	actions: StoredModerationAction[];
	nextReportId: number;
	nextActionId: number;
} {
	const reports: Signalement[] = [];
	const actions: StoredModerationAction[] = [];
	let reportId = 1;
	let actionId = 1;

	for (const seed of SEED_REPORTS) {
		const dateSignalement = at(seed.hoursAgo);
		const dateTraitement = seed.decision
			? at(Math.max(0, seed.hoursAgo - 1))
			: null;

		reports.push({
			id: reportId,
			documentId: seed.documentId,
			signaleurId: seed.signaleurId,
			motif: seed.motif,
			commentaire: seed.commentaire ?? null,
			statut: seed.statut,
			traitePar: seed.decision?.moderateurId ?? null,
			dateSignalement,
			dateTraitement,
		});

		if (seed.decision) {
			actions.push({
				id: actionId,
				reportId,
				moderateurId: seed.decision.moderateurId,
				documentId: seed.documentId,
				utilisateurCibleId:
					seed.decision.action === "retirer" ||
					seed.decision.action === "valider"
						? null
						: (MOCK_DOCUMENTS.find(
								(document) => document.id === seed.documentId,
							)?.uploader.id ?? null),
				action: seed.decision.action,
				raison: seed.decision.raison,
				dateAction: dateTraitement ?? dateSignalement,
			});
			actionId += 1;
		}

		reportId += 1;
	}

	return {
		reports,
		actions,
		nextReportId: reportId,
		nextActionId: actionId,
	};
}

/** Réinitialise les signalements et les actions en mémoire (tests). */
export function resetMockReports(): void {
	const seed = buildSeed();

	REPORTS.splice(0, REPORTS.length, ...seed.reports);
	ACTIONS.splice(0, ACTIONS.length, ...seed.actions);
	nextReportId = seed.nextReportId;
	nextActionId = seed.nextActionId;
}

function getUserOrThrow(id: number) {
	const user = MOCK_USERS.find((item) => item.id === id);

	if (!user) {
		throw new ApiError("Utilisateur introuvable", 404, "NOT_FOUND");
	}

	return user;
}

function getReportOrThrow(id: number): Signalement {
	const report = REPORTS.find((item) => item.id === id);

	if (!report) {
		throw new ApiError("Signalement introuvable", 404, "NOT_FOUND");
	}

	return report;
}

function toListItem(report: Signalement): SignalementListItem {
	const document = getMockDocument(report.documentId);

	if (!document) {
		throw new ApiError("Document introuvable", 404, "NOT_FOUND");
	}

	const signaleur = getUserOrThrow(report.signaleurId);

	return {
		id: report.id,
		document: {
			id: document.id,
			titre: document.titre,
			format: document.format,
			statut: document.statut,
		},
		signaleur: { id: signaleur.id, nom: signaleur.nom },
		motif: report.motif,
		commentaire: report.commentaire,
		statut: report.statut,
		dateSignalement: report.dateSignalement,
	};
}

/** GET /reports — file de signalements filtrée et paginée. */
export function listMockReports(
	params: ReportSearchParams = {},
): {
	data: SignalementListItem[];
	total: number;
	page: number;
	pageSize: number;
} {
	const page = Math.max(1, params.page ?? 1);
	const pageSize = Math.min(
		MAX_PAGE_SIZE,
		Math.max(1, params.pageSize ?? DEFAULT_PAGE_SIZE),
	);
	const filtered = REPORTS.filter(
		(report) =>
			(!params.statut || report.statut === params.statut) &&
			(!params.motif || report.motif === params.motif),
	).sort(
		(a, b) =>
			b.dateSignalement.localeCompare(a.dateSignalement) || b.id - a.id,
	);
	const start = (page - 1) * pageSize;

	return {
		data: filtered.slice(start, start + pageSize).map(toListItem),
		total: filtered.length,
		page,
		pageSize,
	};
}

/** GET /reports/:id — détail enrichi d'un signalement. */
export function getMockReport(id: number): SignalementDetail {
	const report = getReportOrThrow(id);
	const document = getMockDocument(report.documentId);

	if (!document) {
		throw new ApiError("Document introuvable", 404, "NOT_FOUND");
	}

	const signaleur = getUserOrThrow(report.signaleurId);
	const traitePar = report.traitePar
		? getUserOrThrow(report.traitePar)
		: null;
	const action =
		ACTIONS.find((item) => item.reportId === report.id) ?? null;

	return {
		...toListItem(report),
		document: {
			id: document.id,
			titre: document.titre,
			format: document.format,
			statut: document.statut,
			dateUpload: document.dateUpload,
			nbVues: document.nbVues,
			nbTelechargements: document.nbTelechargements,
			uploader: {
				id: document.uploader.id,
				nom: document.uploader.nom,
			},
		},
		signaleur: { id: signaleur.id, nom: signaleur.nom },
		traitePar: traitePar
			? { id: traitePar.id, nom: traitePar.nom }
			: null,
		dateTraitement: report.dateTraitement,
		action: action
			? {
					action: action.action,
					raison: action.raison,
					dateAction: action.dateAction,
				}
			: null,
		previousReportsCount: REPORTS.filter(
			(item) =>
				item.documentId === report.documentId && item.id !== report.id,
		).length,
	};
}

function validateReason(raison: string): string {
	const trimmed = raison.trim();

	if (trimmed.length < MODERATION_REASON_MIN_LENGTH) {
		throw new ApiError(
			`La raison doit contenir au moins ${MODERATION_REASON_MIN_LENGTH} caractères`,
			400,
			"VALIDATION_ERROR",
		);
	}

	if (trimmed.length > MODERATION_REASON_MAX_LENGTH) {
		throw new ApiError(
			`La raison ne peut pas dépasser ${MODERATION_REASON_MAX_LENGTH} caractères`,
			400,
			"VALIDATION_ERROR",
		);
	}

	return trimmed;
}

function ensureActionable(report: Signalement): void {
	if (report.statut === "traite" || report.statut === "rejete") {
		throw new ApiError(
			"Ce signalement a déjà été traité",
			409,
			"ALREADY_PROCESSED",
		);
	}
}

/** POST /moderation/actions — applique une décision punitive. */
export function applyMockModerationAction({
	moderatorId,
	reportId,
	action,
	raison,
}: ModerationActionPayload & {
	moderatorId: number;
}): SignalementDetail {
	const report = getReportOrThrow(reportId);
	ensureActionable(report);

	const document = getMockDocument(report.documentId);

	if (!document) {
		throw new ApiError("Document introuvable", 404, "NOT_FOUND");
	}

	const trimmedReason = validateReason(raison);
	const now = new Date().toISOString();

	if (
		action === "retirer" ||
		action === "suspendre" ||
		action === "bannir"
	) {
		setMockDocumentStatus(document.id, "retire");
	}

	if (action === "suspendre") {
		setMockUserStatus(document.uploader.id, "suspendu");
	}

	if (action === "bannir") {
		setMockUserStatus(document.uploader.id, "supprime");
	}

	report.statut = "traite";
	report.traitePar = moderatorId;
	report.dateTraitement = now;

	ACTIONS.push({
		id: nextActionId++,
		reportId,
		moderateurId: moderatorId,
		documentId: document.id,
		utilisateurCibleId:
			action === "retirer" ? null : document.uploader.id,
		action,
		raison: trimmedReason,
		dateAction: now,
	});

	return getMockReport(reportId);
}

/** PATCH /reports/:id — rejette un signalement et valide le document. */
export function rejectMockReport({
	moderatorId,
	reportId,
	raison,
}: {
	moderatorId: number;
	reportId: number;
	raison: string;
}): SignalementDetail {
	const report = getReportOrThrow(reportId);
	ensureActionable(report);

	const document = getMockDocument(report.documentId);

	if (!document) {
		throw new ApiError("Document introuvable", 404, "NOT_FOUND");
	}

	const trimmedReason = validateReason(raison);
	const now = new Date().toISOString();

	if (document.statut === "signale") {
		setMockDocumentStatus(document.id, "valide");
	}

	report.statut = "rejete";
	report.traitePar = moderatorId;
	report.dateTraitement = now;

	ACTIONS.push({
		id: nextActionId++,
		reportId,
		moderateurId: moderatorId,
		documentId: document.id,
		utilisateurCibleId: null,
		action: "valider",
		raison: trimmedReason,
		dateAction: now,
	});

	return getMockReport(reportId);
}

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

resetMockReports();
