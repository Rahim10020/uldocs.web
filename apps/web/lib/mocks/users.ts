import type { Utilisateur } from "shared";
import { mockAcademic } from "./academic";

/** Utilisateurs de démonstration. Aucune donnée réelle. */

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

/** Utilisateur connecté dans les mocks (session simulée). */
export const CURRENT_USER = MOCK_USERS[0] as Utilisateur;
