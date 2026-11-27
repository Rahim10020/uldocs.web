import type {
	AdminSearchParams,
	AdminStats,
	AdminStatsPeriod,
	AdminStatsPoint,
	AdminUserListItem,
	AdminUserSearchParams,
	AdminUserUpdatePayload,
	AuditAction,
	AuditEntry,
	AuditSearchParams,
	DocumentListItem,
	Paginated,
} from "shared";
import { STATUTS_UTILISATEUR } from "shared";
import { ApiError } from "../api/errors";
import { MOCK_DOCUMENTS } from "./documents";
import { listMockReports } from "./reports";
import { MOCK_USERS, requireMockAdmin } from "./users";

/**
 * Statistiques et journal d'audit de démonstration.
 * Les totaux sont dérivés des mocks existants : aucune valeur inventée.
 */

const DAY_MS = 86_400_000;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

/** Date de référence des stats : la plus récente activité des mocks. */
const STATS_NOW = Date.UTC(2026, 10, 25, 9, 0, 0);

const PERIOD_POINTS: Record<AdminStatsPeriod, number> = {
	"7d": 7,
	"30d": 30,
	"12m": 12,
};

const PERIOD_SPAN_DAYS: Record<AdminStatsPeriod, number> = {
	"7d": 7,
	"30d": 30,
	"12m": 365,
};

/** Part de l'activité totale attribuée à chaque période du graphique. */
const PERIOD_GAIN_RATIO: Record<AdminStatsPeriod, number> = {
	"7d": 0.12,
	"30d": 0.38,
	"12m": 1,
};

type MetricKey = keyof Omit<AdminStatsPoint, "date">;

const METRICS: MetricKey[] = [
	"utilisateurs",
	"documents",
	"telechargements",
	"signalements",
];

/** PRNG déterministe : la même courbe est rendue côté serveur et client. */
function mulberry32(seed: number): () => number {
	let value = seed;

	return () => {
		value |= 0;
		value = (value + 0x6d2b79f5) | 0;
		let t = Math.imul(value ^ (value >>> 15), 1 | value);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function normalize(value: string): string {
	return value
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase()
		.trim();
}

function paginate<T>(
	items: T[],
	params: { page?: number; pageSize?: number },
	defaultPageSize = DEFAULT_PAGE_SIZE,
): Paginated<T> {
	const page = Math.max(1, params.page ?? 1);
	const pageSize = Math.min(
		MAX_PAGE_SIZE,
		Math.max(1, params.pageSize ?? defaultPageSize),
	);
	const start = (page - 1) * pageSize;

	return {
		data: items.slice(start, start + pageSize),
		total: items.length,
		page,
		pageSize,
	};
}

function sumDownloads(): number {
	return MOCK_DOCUMENTS.reduce(
		(total, document) => total + document.nbTelechargements,
		0,
	);
}

function countNewUsers(days: number): number {
	const cutoff = STATS_NOW - days * DAY_MS;

	return MOCK_USERS.filter(
		(user) => new Date(user.dateInscription).getTime() >= cutoff,
	).length;
}

function countNewDocuments(days: number): number {
	const cutoff = STATS_NOW - days * DAY_MS;

	return MOCK_DOCUMENTS.filter(
		(document) => new Date(document.dateUpload).getTime() >= cutoff,
	).length;
}

function getMetricTotal(metric: MetricKey): number {
	switch (metric) {
		case "utilisateurs":
			return MOCK_USERS.length;
		case "documents":
			return MOCK_DOCUMENTS.length;
		case "telechargements":
			return sumDownloads();
		case "signalements":
			return listMockReports({ page: 1, pageSize: 1 }).total;
	}

	return 0;
}

/**
 * Construit une série cumulée : le dernier point vaut le total réel de la
 * métrique, les précédents remontent dans le temps avec une croissance
 * légèrement irrégulière.
 */
function buildSeries(metric: MetricKey, period: AdminStatsPeriod): number[] {
	const total = getMetricTotal(metric);
	const points = PERIOD_POINTS[period];
	const gain = Math.round(total * PERIOD_GAIN_RATIO[period]);
	const start = Math.max(0, total - gain);
	const random = mulberry32(
		period.length * 97 + METRICS.indexOf(metric) * 41 + 7,
	);

	const weights = Array.from({ length: points }, (_, index) => {
		const trend = 0.55 + (index / Math.max(1, points - 1)) * 0.9;
		return trend * (0.7 + random() * 0.6);
	});
	const weightSum = weights.reduce((sum, weight) => sum + weight, 0);

	const series: number[] = [];
	let previous = start;
	let cumulative = 0;

	for (const [index, weight] of weights.entries()) {
		cumulative += weight;
		const isLast = index === points - 1;
		const value = isLast
			? total
			: Math.round(start + (gain * cumulative) / weightSum);

		previous = Math.max(previous, value);
		series.push(previous);
	}

	return series;
}

function buildPointDates(period: AdminStatsPeriod): string[] {
	const points = PERIOD_POINTS[period];

	if (period === "12m") {
		return Array.from({ length: points }, (_, index) => {
			const date = new Date(STATS_NOW);

			date.setUTCMonth(date.getUTCMonth() - (points - 1 - index));
			date.setUTCDate(1);

			return date.toISOString();
		});
	}

	const step = (PERIOD_SPAN_DAYS[period] * DAY_MS) / (points - 1);

	return Array.from({ length: points }, (_, index) => {
		const offset = PERIOD_SPAN_DAYS[period] * DAY_MS - index * step;

		return new Date(STATS_NOW - offset).toISOString();
	});
}

function buildEvolution(period: AdminStatsPeriod): AdminStatsPoint[] {
	const dates = buildPointDates(period);
	const series = Object.fromEntries(
		METRICS.map((metric) => [metric, buildSeries(metric, period)]),
	) as Record<MetricKey, number[]>;

	return dates.map((date, index) => ({
		date,
		utilisateurs: series.utilisateurs[index] ?? 0,
		documents: series.documents[index] ?? 0,
		telechargements: series.telechargements[index] ?? 0,
		signalements: series.signalements[index] ?? 0,
	}));
}

/** GET /admin/stats — totaux réels et évolution cumulée. */
export function getMockAdminStats(
	period: AdminStatsPeriod = "30d",
): AdminStats {
	const totalDownloads = sumDownloads();
	const pendingReports = listMockReports({
		statut: "ouvert",
		page: 1,
		pageSize: 1,
	}).total;
	const thisWeekDownloads = Math.round(totalDownloads * 0.12);

	return {
		utilisateurs: {
			total: MOCK_USERS.length,
			actifs: MOCK_USERS.filter((user) => user.statut === "actif").length,
			nouveauxCetteSemaine: countNewUsers(7),
		},
		documents: {
			total: MOCK_DOCUMENTS.length,
			nouveauxCetteSemaine: countNewDocuments(7),
		},
		telechargements: {
			total: totalDownloads,
			cetteSemaine: thisWeekDownloads,
		},
		signalements: {
			enAttente: pendingReports,
		},
		evolution: buildEvolution(period),
	};
}

const AUDIT_NOW = Date.UTC(2026, 10, 25, 8, 0, 0);

function auditDate(hoursAgo: number): string {
	return new Date(AUDIT_NOW - hoursAgo * 3_600_000).toISOString();
}

/**
 * Journal d'audit de démonstration.
 * Les acteurs et les cibles pointent vers les données mockées existantes.
 */
const AUDIT_ENTRIES: AuditEntry[] = [
	{
		id: 1,
		acteur: { id: 8, nom: "Mawuli Amegan" },
		action: "role_modifie",
		cible: { type: "utilisateur", id: 7, libelle: "Sandrine Houngbo" },
		details: "Passage du rôle « étudiant » à « modérateur ».",
		dateAction: auditDate(2),
	},
	{
		id: 2,
		acteur: { id: 7, nom: "Sandrine Houngbo" },
		action: "signalement_traite",
		cible: { type: "signalement", id: 1, libelle: "Annale de Droit Civil" },
		details: "Signalement rejeté après vérification des droits.",
		dateAction: auditDate(5),
	},
	{
		id: 3,
		acteur: { id: 7, nom: "Sandrine Houngbo" },
		action: "utilisateur_averti",
		cible: { type: "utilisateur", id: 1, libelle: "Akouvi Mensah" },
		details: "Avertissement pour un doublon publié.",
		dateAction: auditDate(9),
	},
	{
		id: 4,
		acteur: { id: 8, nom: "Mawuli Amegan" },
		action: "document_retire",
		cible: { type: "document", id: 6, libelle: "Cours de Droit Pénal" },
		details: "Document retiré à la demande de l'enseignant.",
		dateAction: auditDate(26),
	},
	{
		id: 5,
		acteur: { id: 3, nom: "Ama Dossou" },
		action: "document_cree",
		cible: {
			type: "document",
			id: 15,
			libelle: "Annale Algorithmique — 2024-2025",
		},
		details: "Nouveau document en attente de validation.",
		dateAction: auditDate(30),
	},
	{
		id: 6,
		acteur: { id: 7, nom: "Sandrine Houngbo" },
		action: "utilisateur_suspendu",
		cible: { type: "utilisateur", id: 6, libelle: "Komlan Adjei" },
		details: "Suspension de 7 jours pour uploads non conformes.",
		dateAction: auditDate(52),
	},
	{
		id: 7,
		acteur: { id: 8, nom: "Mawuli Amegan" },
		action: "document_modifie",
		cible: { type: "document", id: 20, libelle: "TD Développement Web" },
		details: "UE et année académique corrigées.",
		dateAction: auditDate(73),
	},
	{
		id: 8,
		acteur: { id: 7, nom: "Sandrine Houngbo" },
		action: "signalement_traite",
		cible: { type: "signalement", id: 9, libelle: "TD Droit Civil" },
		details: "Avertissement envoyé à l'uploader.",
		dateAction: auditDate(96),
	},
	{
		id: 9,
		acteur: { id: 4, nom: "Yao Kouassi" },
		action: "document_cree",
		cible: {
			type: "document",
			id: 44,
			libelle: "Cours de Réseaux",
		},
		details: "Nouveau document en attente de validation.",
		dateAction: auditDate(120),
	},
	{
		id: 10,
		acteur: { id: 8, nom: "Mawuli Amegan" },
		action: "utilisateur_banni",
		cible: { type: "utilisateur", id: 2, libelle: "Kossi Agbeko" },
		details: "Bannissement définitif après récidive.",
		dateAction: auditDate(168),
	},
];

const INITIAL_AUDIT_ENTRIES = [...AUDIT_ENTRIES];
const INITIAL_ADMIN_USER_STATE = new Map(
	MOCK_USERS.map((user) => [user.id, { role: user.role, statut: user.statut }]),
);

/** Réinitialise les mutations admin mockées entre les tests. */
export function resetMockAdminState(): void {
	for (const user of MOCK_USERS) {
		const initial = INITIAL_ADMIN_USER_STATE.get(user.id);

		if (initial) {
			user.role = initial.role;
			user.statut = initial.statut;
		}
	}

	AUDIT_ENTRIES.splice(0, AUDIT_ENTRIES.length, ...INITIAL_AUDIT_ENTRIES);
}

function buildAdminUserList(): AdminUserListItem[] {
	const uploadCounts = new Map<number, number>();

	for (const document of MOCK_DOCUMENTS) {
		const userId = document.uploader.id;
		uploadCounts.set(userId, (uploadCounts.get(userId) ?? 0) + 1);
	}

	return MOCK_USERS.map((user) => ({
		...user,
		nbDocumentsUploades: uploadCounts.get(user.id) ?? 0,
	}));
}

/** GET /admin/audit — journal paginé, trié du plus récent au plus ancien. */
export function listMockAudit(
	params: AuditSearchParams = {},
): Paginated<AuditEntry> {
	const page = Math.max(1, params.page ?? 1);
	const pageSize = Math.min(
		MAX_PAGE_SIZE,
		Math.max(1, params.pageSize ?? DEFAULT_PAGE_SIZE),
	);
	const filtered = AUDIT_ENTRIES.filter(
		(entry) => !params.action || entry.action === params.action,
	).sort((a, b) => b.dateAction.localeCompare(a.dateAction) || b.id - a.id);
	const start = (page - 1) * pageSize;

	return {
		data: filtered.slice(start, start + pageSize),
		total: filtered.length,
		page,
		pageSize,
	};
}

/** GET /admin/users — recherche sur le nom et l'email. */
export function searchMockUsers(
	params: AdminUserSearchParams = {},
): Paginated<AdminUserListItem> {
	const query = params.q ? normalize(params.q) : "";
	const filtered = buildAdminUserList()
		.filter((user) => {
			if (params.role && user.role !== params.role) {
				return false;
			}

			if (params.statut && user.statut !== params.statut) {
				return false;
			}

			if (
				params.contribution === "contributeur" &&
				user.nbDocumentsUploades === 0
			) {
				return false;
			}

			if (
				params.contribution === "utilisateur" &&
				user.nbDocumentsUploades > 0
			) {
				return false;
			}

			if (!query) {
				return true;
			}

			return (
				normalize(user.nom).includes(query) ||
				normalize(user.email).includes(query)
			);
		})
		.sort(
			(a, b) =>
				b.dateInscription.localeCompare(a.dateInscription) || b.id - a.id,
		);

	return paginate(filtered, params, 8);
}

/** PATCH /admin/users/:id — mutation simulée et inscrite à l'audit. */
export function updateMockAdminUser(
	id: number,
	payload: AdminUserUpdatePayload,
): AdminUserListItem {
	const actor = requireMockAdmin();
	const target = MOCK_USERS.find((user) => user.id === id);

	if (!target) {
		throw new ApiError("Utilisateur introuvable", 404, "NOT_FOUND");
	}

	if (target.id === actor.id || target.role === "admin") {
		throw new ApiError(
			"Les actions sur soi-même ou un administrateur sont interdites",
			403,
			"FORBIDDEN",
		);
	}

	if (!payload || typeof payload !== "object") {
		throw new ApiError(
			"Payload de modification invalide",
			400,
			"VALIDATION_ERROR",
		);
	}

	const hasRole = "role" in payload && payload.role !== undefined;
	const hasStatus = "statut" in payload && payload.statut !== undefined;
	const hasUnknownKey = Object.keys(payload).some(
		(key) => !["role", "statut", "raison"].includes(key),
	);

	if (
		typeof payload.raison !== "string" ||
		hasRole === hasStatus ||
		hasUnknownKey ||
		(hasRole && payload.role !== "moderateur") ||
		(hasStatus && !STATUTS_UTILISATEUR.includes(payload.statut))
	) {
		throw new ApiError(
			"Payload de modification invalide",
			400,
			"VALIDATION_ERROR",
		);
	}

	const reason = payload.raison.trim();

	if (reason.length < 10 || reason.length > 1000) {
		throw new ApiError(
			"La raison doit contenir entre 10 et 1000 caractères",
			400,
			"VALIDATION_ERROR",
		);
	}

	let action: AuditAction;
	let details: string;

	if (hasRole && payload.role === "moderateur") {
		if (target.role !== "etudiant" || target.statut !== "actif") {
			throw new ApiError(
				"Seul un étudiant actif peut devenir modérateur",
				409,
				"CONFLICT",
			);
		}

		target.role = "moderateur";
		action = "role_modifie";
		details = `Passage du rôle « étudiant » à « modérateur ». Motif : ${reason}`;
	} else if (hasStatus && "statut" in payload) {
		const nextStatus = payload.statut;
		const canReactivate =
			nextStatus === "actif" && target.statut === "suspendu";
		const canSuspend = nextStatus === "suspendu" && target.statut === "actif";
		const canBan = nextStatus === "supprime" && target.statut !== "supprime";

		if (!canReactivate && !canSuspend && !canBan) {
			throw new ApiError(
				"Cette transition de statut n'est pas autorisée",
				409,
				"CONFLICT",
			);
		}

		target.statut = nextStatus;

		if (nextStatus === "suspendu") {
			action = "utilisateur_suspendu";
			details = `Compte suspendu. Motif : ${reason}`;
		} else if (nextStatus === "supprime") {
			action = "utilisateur_banni";
			details = `Compte banni. Motif : ${reason}`;
		} else {
			action = "utilisateur_reactive";
			details = `Compte réactivé. Motif : ${reason}`;
		}
	} else {
		throw new ApiError(
			"Une seule modification est requise",
			400,
			"VALIDATION_ERROR",
		);
	}

	AUDIT_ENTRIES.push({
		id: Math.max(0, ...AUDIT_ENTRIES.map((entry) => entry.id)) + 1,
		acteur: { id: actor.id, nom: actor.nom },
		action,
		cible: { type: "utilisateur", id: target.id, libelle: target.nom },
		details,
		dateAction: new Date().toISOString(),
	});

	return (
		buildAdminUserList().find((user) => user.id === target.id) ?? {
			...target,
			nbDocumentsUploades: 0,
		}
	);
}

/** GET /admin/documents — recherche sur le titre, l'UE et l'uploader. */
export function searchMockAdminDocuments(
	params: AdminSearchParams = {},
): Paginated<DocumentListItem> {
	const query = params.q ? normalize(params.q) : "";
	const filtered = MOCK_DOCUMENTS.filter((document) => {
		if (!query) {
			return true;
		}

		return (
			normalize(document.titre).includes(query) ||
			normalize(document.ue.nom).includes(query) ||
			normalize(document.uploader.nom).includes(query)
		);
	}).sort((a, b) => b.dateUpload.localeCompare(a.dateUpload) || b.id - a.id);

	return paginate<DocumentListItem>(filtered, params);
}
