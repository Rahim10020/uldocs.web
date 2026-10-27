import type {
  DocumentDetail,
  DocumentListItem,
  DocumentReaction,
  DocumentSearchParams,
  Paginated,
  StatutDocument,
  TypeDocument,
  VoteDocument,
} from "shared";
import { getUeContextByName } from "./academic";
import { CURRENT_USER, MOCK_USERS } from "./users";

/**
 * Documents de démonstration.
 * Les UE, filières et facultés proviennent exclusivement du seed officiel.
 */

const BASE_UPLOAD = Date.UTC(2026, 9, 18, 9, 0, 0);
const DAY_MS = 86_400_000;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;
const MOCK_FILE_URL = "/downloads/art-de-la-guerre-sun-tzu.pdf";

/** Favoris de l'utilisateur courant (session simulée). */
const FAVORITE_IDS = new Set<number>([1, 5, 12]);

type MockReactionState = {
  votesUtiles: number;
  votesInutiles: number;
  votes: Map<number, VoteDocument>;
};

/** Réactions en mémoire, indexées par document. */
const MOCK_REACTIONS = new Map<number, MockReactionState>();

function getReactionState(documentId: number): MockReactionState {
  const existing = MOCK_REACTIONS.get(documentId);

  if (existing) {
    return existing;
  }

  const state: MockReactionState = {
    votesUtiles: 0,
    votesInutiles: 0,
    votes: new Map(),
  };

  MOCK_REACTIONS.set(documentId, state);

  return state;
}

/** Réinitialise les réactions (tests et session de démonstration). */
export function resetMockReactions(): void {
  MOCK_REACTIONS.clear();
}

/** Réaction de l'utilisateur courant pour un document. */
export function getMockReaction(documentId: number): DocumentReaction {
  const state = getReactionState(documentId);

  return {
    votesUtiles: state.votesUtiles,
    votesInutiles: state.votesInutiles,
    voteUtilisateur: state.votes.get(CURRENT_USER.id) ?? null,
  };
}

/** PUT /documents/:id/reaction — idempotent, `null` retire le vote. */
export function setMockReaction(
  documentId: number,
  valeur: VoteDocument | null,
): DocumentReaction | undefined {
  const document = MOCK_DOCUMENTS.find((item) => item.id === documentId);

  if (!document) {
    return undefined;
  }

  const state = getReactionState(documentId);
  const previous = state.votes.get(CURRENT_USER.id) ?? null;

  if (previous === "utile") {
    state.votesUtiles = Math.max(0, state.votesUtiles - 1);
  }

  if (previous === "inutile") {
    state.votesInutiles = Math.max(0, state.votesInutiles - 1);
  }

  state.votes.delete(CURRENT_USER.id);

  if (valeur === "utile") {
    state.votesUtiles += 1;
    state.votes.set(CURRENT_USER.id, valeur);
  }

  if (valeur === "inutile") {
    state.votesInutiles += 1;
    state.votes.set(CURRENT_USER.id, valeur);
  }

  return getMockReaction(documentId);
}

const TYPE_LABEL: Record<TypeDocument, string> = {
  cours: "cours",
  annale: "annale",
  corrige: "corrigé",
  td: "travaux dirigés",
  memoire: "mémoire",
  autre: "document",
};

type DocumentSpec = {
  ue: string;
  type: TypeDocument;
  annee: string;
  uploader: number;
  titre?: string;
  statut?: StatutDocument;
};

const SPECS: DocumentSpec[] = [
  // Droit
  {
    ue: "Droit Civil",
    type: "annale",
    annee: "2024-2025",
    uploader: 1,
    titre: "Annale de Droit Civil — Session 1",
  },
  { ue: "Droit Civil", type: "cours", annee: "2025-2026", uploader: 0 },
  { ue: "Droit Civil", type: "td", annee: "2025-2026", uploader: 0 },
  { ue: "Droit Civil", type: "corrige", annee: "2024-2025", uploader: 1 },
  { ue: "Droit Pénal", type: "annale", annee: "2025-2026", uploader: 2 },
  {
    ue: "Droit Pénal",
    type: "cours",
    annee: "2024-2025",
    uploader: 0,
    statut: "en_attente",
  },
  { ue: "Procédure Civile", type: "annale", annee: "2023-2024", uploader: 1 },
  { ue: "Droit des Obligations", type: "td", annee: "2025-2026", uploader: 4 },
  {
    ue: "Droit Constitutionnel",
    type: "cours",
    annee: "2024-2025",
    uploader: 2,
  },
  {
    ue: "Droit Constitutionnel",
    type: "annale",
    annee: "2025-2026",
    uploader: 4,
  },
  {
    ue: "Droit Administratif",
    type: "annale",
    annee: "2025-2026",
    uploader: 3,
  },
  {
    ue: "Droit International Public",
    type: "cours",
    annee: "2024-2025",
    uploader: 2,
  },

  // Sciences
  { ue: "Algorithmique", type: "cours", annee: "2025-2026", uploader: 2 },
  { ue: "Algorithmique", type: "td", annee: "2025-2026", uploader: 3 },
  { ue: "Algorithmique", type: "annale", annee: "2024-2025", uploader: 3 },
  { ue: "Bases de Données", type: "cours", annee: "2025-2026", uploader: 2 },
  { ue: "Bases de Données", type: "td", annee: "2025-2026", uploader: 3 },
  { ue: "Réseaux", type: "annale", annee: "2024-2025", uploader: 4 },
  { ue: "Développement Web", type: "cours", annee: "2026-2027", uploader: 2 },
  { ue: "Développement Web", type: "td", annee: "2025-2026", uploader: 3 },

  // Économie et gestion
  { ue: "Microéconomie", type: "annale", annee: "2024-2025", uploader: 1 },
  { ue: "Microéconomie", type: "cours", annee: "2025-2026", uploader: 1 },
  { ue: "Macroéconomie", type: "cours", annee: "2024-2025", uploader: 1 },
  { ue: "Statistiques", type: "td", annee: "2025-2026", uploader: 1 },
  { ue: "Statistiques", type: "annale", annee: "2024-2025", uploader: 4 },
  { ue: "Économétrie", type: "cours", annee: "2025-2026", uploader: 2 },
  {
    ue: "Comptabilité Générale",
    type: "cours",
    annee: "2025-2026",
    uploader: 1,
  },
  { ue: "Comptabilité Générale", type: "td", annee: "2025-2026", uploader: 1 },
  { ue: "Audit Financier", type: "annale", annee: "2024-2025", uploader: 5 },
  { ue: "Fiscalité", type: "cours", annee: "2025-2026", uploader: 1 },

  // Polytechnique
  { ue: "Génie Logiciel", type: "cours", annee: "2025-2026", uploader: 2 },
  { ue: "Génie Logiciel", type: "td", annee: "2025-2026", uploader: 2 },
  {
    ue: "Architecture Logicielle",
    type: "cours",
    annee: "2025-2026",
    uploader: 2,
  },
  {
    ue: "Programmation Orientée Objet",
    type: "td",
    annee: "2024-2025",
    uploader: 3,
  },
  {
    ue: "Programmation Orientée Objet",
    type: "annale",
    annee: "2025-2026",
    uploader: 3,
  },
  { ue: "Gestion de Projet", type: "cours", annee: "2026-2027", uploader: 2 },
  { ue: "Machine Learning", type: "cours", annee: "2025-2026", uploader: 2 },
  { ue: "Deep Learning", type: "annale", annee: "2025-2026", uploader: 4 },

  // IUT
  {
    ue: "Comptabilité Analytique",
    type: "td",
    annee: "2025-2026",
    uploader: 5,
  },

  // Lettres
  { ue: "Grammaire Anglaise", type: "cours", annee: "2025-2026", uploader: 4 },
  { ue: "Traduction", type: "annale", annee: "2024-2025", uploader: 4 },

  // Santé et sciences humaines
  { ue: "Biochimie", type: "td", annee: "2025-2026", uploader: 5 },
  {
    ue: "Sociologie Générale",
    type: "annale",
    annee: "2025-2026",
    uploader: 6,
  },

  // Uploads récents de l'utilisateur courant
  {
    ue: "Réseaux",
    type: "cours",
    annee: "2026-2027",
    uploader: 0,
    statut: "en_attente",
  },
];

/** PRNG déterministe : mêmes métriques à chaque exécution. */
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

function defaultTitle(spec: DocumentSpec): string {
  switch (spec.type) {
    case "annale":
      return `Annale ${spec.ue} — ${spec.annee}`;
    case "corrige":
      return `Corrigé ${spec.ue} — ${spec.annee}`;
    case "cours":
      return `Cours de ${spec.ue}`;
    case "td":
      return `TD ${spec.ue}`;
    case "memoire":
      return `Mémoire — ${spec.ue}`;
    default:
      return spec.ue;
  }
}

function buildDocuments(): DocumentDetail[] {
  return SPECS.map((spec, index) => {
    const context = getUeContextByName(spec.ue);

    if (!context) {
      throw new Error(`UE inconnue dans les mocks : ${spec.ue}`);
    }

    const random = mulberry32(index + 1);
    const uploader = MOCK_USERS[spec.uploader] ?? CURRENT_USER;
    const nbVues = 80 + Math.floor(random() * 4200);
    const nbTelechargements = Math.min(nbVues, 15 + Math.floor(random() * 800));

    const dateUpload = new Date(
      BASE_UPLOAD - index * 1.6 * DAY_MS,
    ).toISOString();

    return {
      id: index + 1,
      titre: spec.titre ?? defaultTitle(spec),
      description: `Support de ${TYPE_LABEL[spec.type]} pour l'UE « ${context.ue.nom} », année académique ${spec.annee}.`,
      type: spec.type,
      format: "pdf",
      anneeAcademique: spec.annee,
      fichierUrl: MOCK_FILE_URL,
      tailleKo: 250 + Math.floor(random() * 7500),
      nbPages: 6 + Math.floor(random() * 110),
      langue: "fr",
      nbVues,
      nbTelechargements,
      noteMoyenne: Math.round((3 + random() * 2) * 100) / 100,
      estFavori: FAVORITE_IDS.has(index + 1),
      dateUpload,
      dateMiseAJour: dateUpload,
      statut: spec.statut ?? "valide",
      ue: { id: context.ue.id, nom: context.ue.nom },
      niveau: context.niveau.nom,
      semestre: context.semestre.nom,
      filiere: { id: context.filiere.id, nom: context.filiere.nom },
      faculte: {
        id: context.faculte.id,
        nom: context.faculte.nom,
        categorie: context.faculte.categorie,
        code: context.faculte.code,
      },
      uploader: { id: uploader.id, nom: uploader.nom },
      enseignant: null,
      tags: [],
      reaction: {
        votesUtiles: 0,
        votesInutiles: 0,
        voteUtilisateur: null,
      },
    };
  });
}

export const MOCK_DOCUMENTS: DocumentDetail[] = buildDocuments();

export function toDocumentListItem(doc: DocumentDetail): DocumentListItem {
  return {
    id: doc.id,
    titre: doc.titre,
    description: doc.description,
    type: doc.type,
    format: doc.format,
    nbPages: doc.nbPages,
    anneeAcademique: doc.anneeAcademique,
    fichierUrl: doc.fichierUrl,
    nbVues: doc.nbVues,
    nbTelechargements: doc.nbTelechargements,
    noteMoyenne: doc.noteMoyenne,
    estFavori: FAVORITE_IDS.has(doc.id),
    dateUpload: doc.dateUpload,
    ue: doc.ue,
    niveau: doc.niveau,
    semestre: doc.semestre,
    filiere: doc.filiere,
    faculte: doc.faculte,
    uploader: doc.uploader,
  };
}

export function getMockDocument(id: number): DocumentDetail | undefined {
  const document = MOCK_DOCUMENTS.find((doc) => doc.id === id);

  return document
    ? {
        ...document,
        estFavori: FAVORITE_IDS.has(document.id),
        reaction: getMockReaction(document.id),
      }
    : undefined;
}

/** POST/DELETE /documents/:id/favorite — idempotent. */
export function setMockFavorite(id: number, estFavori: boolean): boolean {
  if (!MOCK_DOCUMENTS.some((doc) => doc.id === id)) {
    return false;
  }

  if (estFavori) {
    FAVORITE_IDS.add(id);
  } else {
    FAVORITE_IDS.delete(id);
  }

  return true;
}

/** POST /documents/:id/download — incrémente le compteur et renvoie le fichier. */
export function recordMockDownload(id: number): string | undefined {
  const document = MOCK_DOCUMENTS.find((doc) => doc.id === id);

  if (!document) {
    return undefined;
  }

  document.nbTelechargements += 1;

  return document.fichierUrl;
}

function relevance(doc: DocumentDetail, query: string): number {
  let score = 0;

  if (doc.titre.toLowerCase().includes(query)) {
    score += 3;
  }

  if (doc.ue.nom.toLowerCase().includes(query)) {
    score += 2;
  }

  if (doc.description?.toLowerCase().includes(query)) {
    score += 1;
  }

  return score;
}

function compare(
  a: DocumentDetail,
  b: DocumentDetail,
  params: DocumentSearchParams,
): number {
  const tri = params.tri ?? (params.q ? "pertinence" : "recent");

  switch (tri) {
    case "populaire":
      return b.nbTelechargements - a.nbTelechargements || b.id - a.id;
    case "mieux_note":
      return b.noteMoyenne - a.noteMoyenne || b.id - a.id;
    case "pertinence": {
      const query = params.q?.trim().toLowerCase() ?? "";
      return (
        relevance(b, query) - relevance(a, query) ||
        b.dateUpload.localeCompare(a.dateUpload) ||
        b.id - a.id
      );
    }
    default:
      return b.dateUpload.localeCompare(a.dateUpload) || b.id - a.id;
  }
}

function paginate(
  documents: DocumentDetail[],
  page: number,
  pageSize: number,
): Paginated<DocumentListItem> {
  const safePage = Math.max(1, page);
  const safeSize = Math.min(MAX_PAGE_SIZE, Math.max(1, pageSize));
  const start = (safePage - 1) * safeSize;

  return {
    data: documents.slice(start, start + safeSize).map(toDocumentListItem),
    total: documents.length,
    page: safePage,
    pageSize: safeSize,
  };
}

/** GET /documents — uniquement les documents validés. */
export function searchMockDocuments(
  params: DocumentSearchParams = {},
): Paginated<DocumentListItem> {
  const query = params.q?.trim().toLowerCase();

  let results = MOCK_DOCUMENTS.filter((doc) => doc.statut === "valide");

  if (query) {
    results = results.filter((doc) => relevance(doc, query) > 0);
  }

  if (params.faculteId !== undefined) {
    results = results.filter((doc) => doc.faculte.id === params.faculteId);
  }

  if (params.filiereId !== undefined) {
    results = results.filter((doc) => doc.filiere.id === params.filiereId);
  }

  if (params.niveau !== undefined) {
    results = results.filter((doc) => doc.niveau === params.niveau);
  }

  if (params.semestre !== undefined) {
    results = results.filter((doc) => doc.semestre === params.semestre);
  }

  if (params.ueId !== undefined) {
    results = results.filter((doc) => doc.ue.id === params.ueId);
  }

  if (params.type !== undefined) {
    results = results.filter((doc) => doc.type === params.type);
  }

  if (params.format !== undefined) {
    results = results.filter((doc) => doc.format === params.format);
  }

  if (params.anneeAcademique !== undefined) {
    results = results.filter(
      (doc) => doc.anneeAcademique === params.anneeAcademique,
    );
  }

  results = [...results].sort((a, b) => compare(a, b, params));

  return paginate(
    results,
    params.page ?? 1,
    params.pageSize ?? DEFAULT_PAGE_SIZE,
  );
}

/** GET /documents/mine — tous les documents de l'utilisateur, quel que soit le statut. */
export function listMockDocumentsByUploader(
  uploaderId: number,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): Paginated<DocumentListItem> {
  const results = MOCK_DOCUMENTS.filter(
    (doc) => doc.uploader.id === uploaderId,
  ).sort((a, b) => b.dateUpload.localeCompare(a.dateUpload));

  return paginate(results, page, pageSize);
}

/** GET /documents/favorites — favoris validés de l'utilisateur courant. */
export function listMockFavoriteDocuments(
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): Paginated<DocumentListItem> {
  const results = MOCK_DOCUMENTS.filter(
    (doc) => doc.statut === "valide" && FAVORITE_IDS.has(doc.id),
  ).sort((a, b) => b.dateUpload.localeCompare(a.dateUpload));

  return paginate(results, page, pageSize);
}
