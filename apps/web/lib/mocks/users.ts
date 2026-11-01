import type {
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  Utilisateur,
} from "shared";
import { ApiError } from "../api/errors";
import { mockAcademic } from "./academic";

/** Utilisateurs de démonstration. Aucune donnée réelle. */

export const MOCK_PASSWORD = "uldocs2026";

const INSCRIPTION = "2025-10-02T09:15:00.000Z";
const CONNEXION = "2026-10-18T18:42:00.000Z";

function findFiliere(faculteCode: string, filiereNom: string) {
  const faculte = mockAcademic.facultes.find(
    (item) => item.code === faculteCode,
  );
  const filiere = faculte?.filieres.find((item) => item.nom === filiereNom);

  return { faculte, filiere };
}

const droitPrive = findFiliere("FDD", "Droit Privé");
const economie = findFiliere("FASEG", "Économie Appliquée");
const genieLogiciel = findFiliere("ENP", "Génie Logiciel");
const informatique = findFiliere("FDS", "Informatique");
const anglais = findFiliere("FLLA", "Anglais");
const analyses = findFiliere("ESTBA", "Analyses Médicales et Biologiques");
const sociologie = findFiliere("FSHS", "Sociologie");

function niveauDe(
  filiere: { niveaux: { id: number; nom: string }[] } | undefined,
  nom: string,
): number | null {
  return filiere?.niveaux.find((item) => item.nom === nom)?.id ?? null;
}

export const MOCK_USERS: Utilisateur[] = [
  {
    id: 1,
    nom: "Akouvi Mensah",
    email: "akouvi.mensah@etu.univ-lome.tg",
    avatarUrl: null,
    role: "etudiant",
    statut: "actif",
    faculteId: droitPrive.faculte?.id ?? null,
    filiereId: droitPrive.filiere?.id ?? null,
    niveauId: niveauDe(droitPrive.filiere, "L1"),
    emailVerifie: true,
    points: 120,
    dateInscription: INSCRIPTION,
    derniereConnexion: CONNEXION,
  },
  {
    id: 2,
    nom: "Kossi Agbeko",
    email: "kossi.agbeko@etu.univ-lome.tg",
    avatarUrl: null,
    role: "etudiant",
    statut: "actif",
    faculteId: economie.faculte?.id ?? null,
    filiereId: economie.filiere?.id ?? null,
    niveauId: niveauDe(economie.filiere, "L2"),
    emailVerifie: true,
    points: 340,
    dateInscription: "2024-11-14T08:00:00.000Z",
    derniereConnexion: CONNEXION,
  },
  {
    id: 3,
    nom: "Ama Dossou",
    email: "ama.dossou@etu.univ-lome.tg",
    avatarUrl: null,
    role: "etudiant",
    statut: "actif",
    faculteId: genieLogiciel.faculte?.id ?? null,
    filiereId: genieLogiciel.filiere?.id ?? null,
    niveauId: niveauDe(genieLogiciel.filiere, "M1"),
    emailVerifie: true,
    points: 780,
    dateInscription: "2023-10-09T10:30:00.000Z",
    derniereConnexion: CONNEXION,
  },
  {
    id: 4,
    nom: "Yao Kouassi",
    email: "yao.kouassi@etu.univ-lome.tg",
    avatarUrl: null,
    role: "etudiant",
    statut: "actif",
    faculteId: informatique.faculte?.id ?? null,
    filiereId: informatique.filiere?.id ?? null,
    niveauId: niveauDe(informatique.filiere, "L3"),
    emailVerifie: true,
    points: 95,
    dateInscription: "2025-10-20T16:05:00.000Z",
    derniereConnexion: CONNEXION,
  },
  {
    id: 5,
    nom: "Fatou Traoré",
    email: "fatou.traore@etu.univ-lome.tg",
    avatarUrl: null,
    role: "etudiant",
    statut: "actif",
    faculteId: anglais.faculte?.id ?? null,
    filiereId: anglais.filiere?.id ?? null,
    niveauId: niveauDe(anglais.filiere, "L2"),
    emailVerifie: true,
    points: 210,
    dateInscription: "2024-10-03T11:20:00.000Z",
    derniereConnexion: CONNEXION,
  },
  {
    id: 6,
    nom: "Komlan Adjei",
    email: "komlan.adjei@etu.univ-lome.tg",
    avatarUrl: null,
    role: "etudiant",
    statut: "actif",
    faculteId: analyses.faculte?.id ?? null,
    filiereId: analyses.filiere?.id ?? null,
    niveauId: niveauDe(analyses.filiere, "L1"),
    emailVerifie: true,
    points: 60,
    dateInscription: "2025-10-28T07:45:00.000Z",
    derniereConnexion: CONNEXION,
  },
  {
    id: 7,
    nom: "Sandrine Houngbo",
    email: "sandrine.houngbo@etu.univ-lome.tg",
    avatarUrl: null,
    role: "moderateur",
    statut: "actif",
    faculteId: sociologie.faculte?.id ?? null,
    filiereId: sociologie.filiere?.id ?? null,
    niveauId: niveauDe(sociologie.filiere, "L3"),
    emailVerifie: true,
    points: 450,
    dateInscription: "2024-09-18T12:00:00.000Z",
    derniereConnexion: CONNEXION,
  },
  {
    id: 8,
    nom: "Mawuli Amegan",
    email: "admin@uldocs.tg",
    avatarUrl: null,
    role: "admin",
    statut: "actif",
    faculteId: null,
    filiereId: null,
    niveauId: null,
    emailVerifie: true,
    points: 0,
    dateInscription: "2024-08-01T08:00:00.000Z",
    derniereConnexion: CONNEXION,
  },
];

/** Utilisateur de référence pour les données de démonstration. */
export const CURRENT_USER = MOCK_USERS[0] as Utilisateur;

const MOCK_PASSWORDS = new Map(
  MOCK_USERS.map((user) => [user.email, MOCK_PASSWORD]),
);

/** Session mock : Akouvi est connectée au premier chargement. */
let sessionUserId: number | null = CURRENT_USER.id;

export function getMockSessionUser(): Utilisateur | null {
  if (sessionUserId === null) {
    return null;
  }

  return MOCK_USERS.find((user) => user.id === sessionUserId) ?? null;
}

export function requireMockSession(): Utilisateur {
  const user = getMockSessionUser();

  if (!user) {
    throw new ApiError("Authentification requise", 401, "UNAUTHORIZED");
  }

  return user;
}

export function loginMock({ email, motDePasse }: LoginPayload): Utilisateur {
  const normalizedEmail = email.trim().toLowerCase();
  const user = MOCK_USERS.find((item) => item.email === normalizedEmail);

  if (!user || MOCK_PASSWORDS.get(normalizedEmail) !== motDePasse) {
    throw new ApiError(
      "Email ou mot de passe incorrect",
      401,
      "INVALID_CREDENTIALS",
    );
  }

  const connectedUser: Utilisateur = {
    ...user,
    derniereConnexion: new Date().toISOString(),
  };
  const index = MOCK_USERS.findIndex((item) => item.id === user.id);
  MOCK_USERS[index] = connectedUser;
  sessionUserId = connectedUser.id;

  return connectedUser;
}

export function registerMock({
  nom,
  email,
  motDePasse,
  faculteId,
  filiereId,
  niveauId,
}: RegisterPayload): Utilisateur {
  const normalizedEmail = email.trim().toLowerCase();

  if (MOCK_USERS.some((user) => user.email === normalizedEmail)) {
    throw new ApiError("Cet email est déjà utilisé", 409, "EMAIL_ALREADY_USED");
  }

  const now = new Date().toISOString();
  const user: Utilisateur = {
    id: Math.max(...MOCK_USERS.map((item) => item.id)) + 1,
    nom: nom.trim(),
    email: normalizedEmail,
    avatarUrl: null,
    role: "etudiant",
    statut: "actif",
    faculteId: faculteId ?? null,
    filiereId: filiereId ?? null,
    niveauId: niveauId ?? null,
    emailVerifie: false,
    points: 0,
    dateInscription: now,
    derniereConnexion: now,
  };

  MOCK_USERS.push(user);
  MOCK_PASSWORDS.set(normalizedEmail, motDePasse);
  sessionUserId = user.id;

  return user;
}

export function updateMockProfile(payload: UpdateProfilePayload): Utilisateur {
  const user = requireMockSession();
  const nom = payload.nom?.trim();

  if (nom !== undefined && nom.length < 2) {
    throw new ApiError(
      "Le nom complet doit contenir au moins 2 caractères",
      400,
      "VALIDATION_ERROR",
    );
  }

  const updatedUser: Utilisateur = {
    ...user,
    ...(nom !== undefined ? { nom } : {}),
    ...(payload.faculteId !== undefined
      ? { faculteId: payload.faculteId }
      : {}),
    ...(payload.filiereId !== undefined
      ? { filiereId: payload.filiereId }
      : {}),
    ...(payload.niveauId !== undefined ? { niveauId: payload.niveauId } : {}),
  };

  const index = MOCK_USERS.findIndex((item) => item.id === user.id);
  MOCK_USERS[index] = updatedUser;

  return updatedUser;
}

export function logoutMock(): void {
  sessionUserId = null;
}

/** Réinitialise la session mock (tests ou démonstration). */
export function resetMockAuth(userId: number | null = CURRENT_USER.id): void {
  sessionUserId = userId;
}
