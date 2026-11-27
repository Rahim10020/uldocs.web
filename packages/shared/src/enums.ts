/**
 * Valeurs figées du domaine.
 * Chaque tableau est la source unique des options d'UI (filtres, selects).
 * Les valeurs persistées sont contraintes en base par des CHECK
 * (docs/database.sql); les catégories calculées ne sont pas persistées.
 */

/** Catégorie d'une entité académique (table FACULTE). */
export const CATEGORIES_FACULTE = ["faculte", "ecole", "institut"] as const;
export type CategorieFaculte = (typeof CATEGORIES_FACULTE)[number];

/** Rôles utilisateur (table UTILISATEUR). */
export const ROLES = ["etudiant", "moderateur", "admin"] as const;
export type Role = (typeof ROLES)[number];

/** Statut d'un compte utilisateur. */
export const STATUTS_UTILISATEUR = ["actif", "suspendu", "supprime"] as const;
export type StatutUtilisateur = (typeof STATUTS_UTILISATEUR)[number];

/** Statut de contribution dérivé du nombre de documents uploadés. */
export const CATEGORIES_CONTRIBUTION = ["utilisateur", "contributeur"] as const;
export type CategorieContribution = (typeof CATEGORIES_CONTRIBUTION)[number];

/** Statut éditorial d'un document. */
export const STATUTS_DOCUMENT = [
  "en_attente",
  "valide",
  "signale",
  "retire",
] as const;
export type StatutDocument = (typeof STATUTS_DOCUMENT)[number];

/** Nature d'un document. */
export const TYPES_DOCUMENT = [
  "cours",
  "annale",
  "corrige",
  "resume",
  "td",
  "autre",
] as const;
export type TypeDocument = (typeof TYPES_DOCUMENT)[number];

/** Format du fichier stocké. */
export const FORMATS_DOCUMENT = ["pdf", "docx", "pptx", "image"] as const;
export type FormatDocument = (typeof FORMATS_DOCUMENT)[number];

/** Réaction binaire d'un utilisateur sur un document. */
export const VOTES_DOCUMENT = ["utile", "inutile"] as const;
export type VoteDocument = (typeof VOTES_DOCUMENT)[number];

/** Motifs de signalement d'un document. */
export const MOTIFS_SIGNALEMENT = [
  "contenu_illegal",
  "erreur",
  "doublon",
  "mal_classe",
  "qualite",
  "droit_auteur",
  "autre",
] as const;
export type MotifSignalement = (typeof MOTIFS_SIGNALEMENT)[number];

/** Statut de traitement d'un signalement. */
export const STATUTS_SIGNALEMENT = [
  "ouvert",
  "en_cours",
  "traite",
  "rejete",
] as const;
export type StatutSignalement = (typeof STATUTS_SIGNALEMENT)[number];

/** Action prise par un modérateur. */
export const ACTIONS_MODERATION = [
  "valider",
  "retirer",
  "avertir",
  "suspendre",
  "bannir",
] as const;
export type ActionModeration = (typeof ACTIONS_MODERATION)[number];

/** Actions consignées dans le journal d'audit. */
export const ACTIONS_AUDIT = [
  "document_cree",
  "document_modifie",
  "document_retire",
  "signalement_traite",
  "utilisateur_averti",
  "utilisateur_suspendu",
  "utilisateur_reactive",
  "utilisateur_banni",
  "role_modifie",
] as const;
export type AuditAction = (typeof ACTIONS_AUDIT)[number];

/** Type d'entité visée par une entrée du journal d'audit. */
export const TYPES_CIBLE_AUDIT = [
  "document",
  "utilisateur",
  "signalement",
  "systeme",
] as const;
export type AuditTargetType = (typeof TYPES_CIBLE_AUDIT)[number];

/** Périodes proposées par le graphique d'administration. */
export const PERIODES_STATS_ADMIN = ["7d", "30d", "12m"] as const;
export type AdminStatsPeriod = (typeof PERIODES_STATS_ADMIN)[number];

/** Ordre de tri des résultats de recherche. */
export const TRIS_DOCUMENTS = [
  "pertinence",
  "recent",
  "populaire",
  "mieux_note",
] as const;
export type TriDocuments = (typeof TRIS_DOCUMENTS)[number];
