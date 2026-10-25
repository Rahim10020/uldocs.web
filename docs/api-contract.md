# Contrat d'API — UL Docs

Version : **1 (MVP)**
Source de vérité : `docs/database.sql` et `docs/academic-data.md`.

Règle : toute évolution du contrat se fait **ici d'abord**, puis dans
`packages/shared`. Le backend et le frontend ne doivent jamais diverger.

---

## 1. Conventions

| Sujet            | Règle                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Transport        | REST, JSON, UTF-8                                                     |
| Base d'URL       | `NEXT_PUBLIC_API_URL` (ex. `http://localhost:4000`)                   |
| Casse            | `snake_case` en base, `camelCase` dans l'API et en TypeScript         |
| Identifiants     | **entiers** (`number` en TS). Jamais de code académique dans une URL. |
| Dates            | ISO 8601 UTC (`2024-10-21T14:32:00.000Z`)                             |
| Valeurs absentes | `null` explicite, jamais `undefined` dans une réponse                 |
| Langue           | Français pour les libellés, anglais pour le code                      |

### Enveloppes

```ts
// Succès
type ApiResponse<T> = { ok: true; data: T };

// Erreur
type ApiErrorResponse = { ok: false; error: string; code?: string };

// Liste paginée
type PaginatedResponse<T> = {
  ok: true;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};
```

Le client `lib/api/client.ts` retire déjà l'enveloppe : les fonctions
renvoient directement `data` ou `Paginated<T>`.

---

## 2. Mapping SQL → API

| Table               | Type TS            | Remarque                                       |
| ------------------- | ------------------ | ---------------------------------------------- |
| `FACULTE`           | `Faculte`          | `categorie` ∈ `faculte` / `ecole` / `institut` |
| `FILIERE`           | `Filiere`          | `code` peut être `null`                        |
| `NIVEAU`            | `Niveau`           | `ordre` : L1=1 … M2=5, Doctorat=6              |
| `SEMESTRE`          | `Semestre`         | `ordre` : S1=1 … S10=10                        |
| `UE`                | `UE`               | ex-`MATIERE`                                   |
| `ENSEIGNANT`        | `Enseignant`       |                                                |
| `UTILISATEUR`       | `Utilisateur`      | jamais de `mot_de_passe_hash` en sortie        |
| `DOCUMENT`          | `Document`         | `ue_id` → `ueId`                               |
| `TAG`               | `Tag`              |                                                |
| `SIGNALEMENT`       | `Signalement`      |                                                |
| `MODERATION_ACTION` | `ModerationAction` |                                                |

Colonnes non exposées : `mot_de_passe_hash`, `ip`.

---

## 3. Enums (valeurs figées)

Ces valeurs sont contraintes en base par des `CHECK` et doivent être
utilisées telles quelles côté TypeScript (`packages/shared/src/enums.ts`).

```ts
export type CategorieFaculte = "faculte" | "ecole" | "institut";
export type Role = "etudiant" | "moderateur" | "admin";
export type StatutUtilisateur = "actif" | "suspendu" | "supprime";
export type StatutDocument = "en_attente" | "valide" | "signale" | "retire";

export type TypeDocument =
  | "cours"
  | "annale"
  | "corrige"
  | "td"
  | "memoire"
  | "autre";

export type FormatDocument = "pdf" | "docx" | "pptx" | "image";

export type MotifSignalement =
  | "contenu_illegal"
  | "erreur"
  | "doublon"
  | "qualite"
  | "droit_auteur"
  | "autre";

export type StatutSignalement = "ouvert" | "en_cours" | "traite" | "rejete";

export type ActionModeration =
  | "valider"
  | "retirer"
  | "avertir"
  | "suspendre"
  | "bannir";

export type TriDocuments = "pertinence" | "recent" | "populaire" | "mieux_note";
```

---

## 4. DTO publiques

### 4.1 `DocumentListItem`

Version dénormalisée destinée aux cartes : un seul appel suffit, pas de
jointures côté client.

```ts
export type DocumentListItem = {
  id: number;
  titre: string;
  description: string | null;
  type: TypeDocument;
  format: FormatDocument;
  anneeAcademique: string;
  fichierUrl: string;
  nbVues: number;
  nbTelechargements: number;
  noteMoyenne: number;
  /** `true` si l'utilisateur connecté a mis le document en favori. */
  estFavori: boolean;
  dateUpload: string;
  ue: { id: number; nom: string };
  niveau: string; // libellé, ex. "L1"
  semestre: string; // libellé, ex. "S1"
  filiere: { id: number; nom: string };
  faculte: {
    id: number;
    nom: string;
    categorie: CategorieFaculte;
    code: string;
  };
  uploader: { id: number; nom: string };
};
```

### 4.2 `DocumentDetail`

```ts
export type DocumentDetail = DocumentListItem & {
  tailleKo: number;
  nbPages: number | null;
  langue: string;
  statut: StatutDocument;
  dateMiseAJour: string;
  enseignant: { id: number; nom: string } | null;
  tags: { id: number; nom: string }[];
};
```

### 4.3 `DocumentSearchParams`

```ts
export type DocumentSearchParams = {
  q?: string;
  faculteId?: number;
  filiereId?: number;
  niveau?: string; // libellé : "L1", "M1"…
  semestre?: string; // libellé : "S1", "S7"…
  ueId?: number;
  type?: TypeDocument;
  format?: FormatDocument;
  anneeAcademique?: string; // "2024-2025"
  tri?: TriDocuments;
  page?: number; // défaut 1
  pageSize?: number; // défaut 20, max 50
};
```

**Règles de recherche :**

- `q` cherche dans `titre`, `description`, `UE.nom` et `UE.aliases`.
- `niveau` et `semestre` sont des **libellés**, pas des ids (décision MVP :
  un niveau n'a pas le même id d'une filière à l'autre).
- Les filtres se combinent en `AND`.
- Sans `tri`, `pertinence` si `q` est fourni, sinon `recent`.
- `total` reflète le nombre de résultats **avant** pagination.

### 4.4 Arbre académique

```ts
export type FaculteTree = Faculte & {
  filieres: (Filiere & {
    niveaux: (Niveau & {
      semestres: (Semestre & {
        ues: UE[];
      })[];
    })[];
  })[];
};
```

---

## 5. Endpoints V1

### Authentification

| Méthode | Chemin                  | Entrée                  | Sortie        |
| ------- | ----------------------- | ----------------------- | ------------- |
| `POST`  | `/auth/register`        | `RegisterPayload`       | `Utilisateur` |
| `POST`  | `/auth/login`           | `LoginPayload`          | `Utilisateur` |
| `POST`  | `/auth/logout`          | —                       | `204`         |
| `GET`   | `/auth/me`              | —                       | `Utilisateur` |
| `POST`  | `/auth/forgot-password` | `{ email }`             | `204`         |
| `POST`  | `/auth/reset-password`  | `{ token, motDePasse }` | `204`         |

### Académique

| Méthode | Chemin                   | Sortie          |
| ------- | ------------------------ | --------------- |
| `GET`   | `/academic/tree`         | `FaculteTree[]` |
| `GET`   | `/facultes`              | `Faculte[]`     |
| `GET`   | `/facultes/:id/filieres` | `Filiere[]`     |
| `GET`   | `/filieres/:id/niveaux`  | `Niveau[]`      |
| `GET`   | `/niveaux/:id/semestres` | `Semestre[]`    |
| `GET`   | `/semestres/:id/ues`     | `UE[]`          |

`/academic/tree` est la source unique pour la cascade d'upload et les
filtres : une requête, mise en cache côté client (TanStack Query, `staleTime`
long).

### Documents

| Méthode  | Chemin                    | Entrée                    | Sortie                        |
| -------- | ------------------------- | ------------------------- | ----------------------------- |
| `GET`    | `/documents`              | `DocumentSearchParams`    | `Paginated<DocumentListItem>` |
| `GET`    | `/documents/:id`          | —                         | `DocumentDetail`              |
| `GET`    | `/documents/mine`         | `page`, `pageSize`        | `Paginated<DocumentListItem>` |
| `GET`    | `/documents/favorites`    | `page`, `pageSize`        | `Paginated<DocumentListItem>` |
| `POST`   | `/documents`              | `multipart/form-data`     | `DocumentDetail`              |
| `PATCH`  | `/documents/:id`          | `DocumentUpdatePayload`   | `DocumentDetail`              |
| `DELETE` | `/documents/:id`          | —                         | `204`                         |
| `POST`   | `/documents/:id/download` | —                         | `{ url: string }`             |
| `POST`   | `/documents/:id/favorite` | —                         | `204`                         |
| `DELETE` | `/documents/:id/favorite` | —                         | `204`                         |
| `POST`   | `/documents/:id/report`   | `{ motif, commentaire? }` | `Signalement`                 |

- Les listes publiques ne renvoient que `statut = "valide"`.
- L'auteur voit aussi ses documents `en_attente` dans `/documents/mine`.
- `GET /documents/favorites` exige une session (401 sinon) et ne renvoie que
  les documents validés, triés du plus récent au plus ancien.
- `POST /documents/:id/download` exige une session (401 sinon) et enregistre
  une ligne `TELECHARGEMENT`. L'aperçu reste public.
- `estFavori` vaut `false` pour un visiteur non connecté.
- `POST` / `DELETE /documents/:id/favorite` exigent une session (401 sinon) et
  sont idempotents.
- Upload : `pdf`, `docx`, `pptx`, `image`, **20 Mo max**, champ
  `certification = true` obligatoire. Le document est créé en `en_attente`.

```ts
export type DocumentCreatePayload = {
  titre: string;
  description?: string;
  type: TypeDocument;
  ueId: number;
  enseignantId?: number;
  anneeAcademique: string;
  langue?: string;
  nbPages?: number;
  certification: true;
  fichier: File;
};

export type DocumentUpdatePayload = {
  titre?: string;
  description?: string | null;
  type?: TypeDocument;
  ueId?: number;
  enseignantId?: number | null;
  anneeAcademique?: string;
  langue?: string;
  nbPages?: number | null;
};
```

### Profil

| Méthode | Chemin                | Entrée                                                    | Sortie                        |
| ------- | --------------------- | --------------------------------------------------------- | ----------------------------- |
| `GET`   | `/users/me`           | —                                                         | `Utilisateur`                 |
| `PATCH` | `/users/me`           | `{ nom?, faculteId?, filiereId?, niveauId?, avatarUrl? }` | `Utilisateur`                 |
| `GET`   | `/users/me/documents` | `page`, `pageSize`                                        | `Paginated<DocumentListItem>` |

### Modération et administration (phase finale V1)

| Méthode | Chemin                | Sortie                        |
| ------- | --------------------- | ----------------------------- |
| `GET`   | `/reports`            | `Paginated<Signalement>`      |
| `PATCH` | `/reports/:id`        | `Signalement`                 |
| `POST`  | `/moderation/actions` | `ModerationAction`            |
| `GET`   | `/admin/stats`        | `AdminStats`                  |
| `GET`   | `/admin/users`        | `Paginated<Utilisateur>`      |
| `PATCH` | `/admin/users/:id`    | `Utilisateur`                 |
| `GET`   | `/admin/documents`    | `Paginated<DocumentListItem>` |

---

## 6. Erreurs

| HTTP | `code`              | Cas                        |
| ---- | ------------------- | -------------------------- |
| 400  | `VALIDATION_ERROR`  | Payload invalide (Zod)     |
| 401  | `UNAUTHORIZED`      | Session absente ou expirée |
| 403  | `FORBIDDEN`         | Rôle insuffisant           |
| 404  | `NOT_FOUND`         | Ressource inexistante      |
| 409  | `CONFLICT`          | Email déjà utilisé         |
| 413  | `PAYLOAD_TOO_LARGE` | Fichier > 20 Mo            |
| 429  | `RATE_LIMITED`      | Trop de requêtes           |
| 500  | `INTERNAL_ERROR`    | Erreur serveur             |

Le front mappe `code` vers un message français ; il ne se base **jamais** sur
le texte de `error`.

---

## 7. Règles de seed (mocks et Prisma)

Source unique : `docs/academic-data.md` → `packages/shared/src/data/academic.ts`.

- 15 entités académiques : 6 facultés, 5 écoles, 4 instituts.
- 8 entités ont des filières documentées ; les 7 autres sont insérées **sans
  filière** et affichent « Bientôt disponible » dans l'UI.
- Catégories du JSON mappées en minuscules : `Faculté` → `faculte`,
  `École` → `ecole`, `Institut` → `institut`.
- Semestres dérivés mécaniquement du niveau : L1 → S1/S2, L2 → S3/S4,
  L3 → S5/S6, M1 → S7/S8, M2 → S9/S10.
- Les UE sont listées **par filière** dans le fichier source. En l'absence de
  rattachement officiel à un semestre, le seed les répartit de façon
  **uniforme** sur les semestres de la filière. Cette règle est provisoire et
  isolée dans un seul module pour être remplacée sans impact sur l'UI.
- Aucune donnée académique inventée : toute structure absente du fichier
  source reste vide.
