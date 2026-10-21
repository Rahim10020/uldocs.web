# Règles du projet UL Docs

## 🎯 Contexte

Monorepo pnpm + Turborepo pour une plateforme de partage de documents.

- **Frontend** : `apps/web` — Next.js App Router, TypeScript, Tailwind CSS pur.
- **Backend** : `apps/api` — Express, Prisma. Le schéma de référence est
  `docs/database.sql`.
- **Mon rôle** : je code **uniquement le frontend**. Ne touche pas à `apps/api`.
- `packages/shared/` — types partagés : à importer, jamais à modifier sans demande explicite.

## 📚 Documentation de référence (À LIRE OBLIGATOIREMENT)

Avant de générer du code, lis :

- `docs/product-brief.md` : **LA VISION DU PRODUIT**. Comprends pour qui on code et pourquoi.
- `docs/mvp-scope.md` — le périmètre. Ne code pas les fonctionnalités marquées
  « Could » ou « Won't » pour l'instant.
- `docs/dependencies.md` — la liste **exhaustive** des dépendances autorisées.
- `docs/database.sql` — le schéma de référence de la base de données (modèle de
  données du backend, dont découlent les types exposés au frontend).

## 🛠️ Stack technique (frontend)

- **UI** : Tailwind CSS pur. **Pas de shadcn/ui, pas de Material UI, pas de
  Bootstrap.** Les composants sont codés à la main.
- **Icônes** : `lucide-react`.
- **Formulaires** : `react-hook-form` + `zod` + `@hookform/resolvers`.
- **Data fetching** : `@tanstack/react-query`.
- **PDF** : `react-pdf`.
- **Utilitaires** : `clsx` + `tailwind-merge` (pour la fonction `cn`).

## 📦 Dépendances

La liste des dépendances autorisées est dans `docs/dependencies.md`. Elle fait
foi : rien d'autre ne doit être installé.

- **Ne jamais installer une dépendance absente de cette liste.**
- Si une tâche en nécessite une, demande d'abord la permission de l'ajouter à
  la liste.
- Pas de librairie de composants externe : les composants sont écrits à la main.

## 📐 Architecture frontend (`apps/web`)

- `app/` — pages et layouts (App Router uniquement).
- `components/ui/` — composants UI réutilisables (primitives génériques).
- `components/shared/` — composants de layout (Header, Footer, etc.).
- `app/<route>/components/` — composants spécifiques à une route.
- `lib/utils.ts` — utilitaires, dont `cn` (fusion `clsx` + `tailwind-merge`)
  pour fusionner les classes Tailwind.
- `lib/api.ts` — appels API centralisés. Ne jamais appeler `fetch` directement
  dans un composant si possible.
- `lib/mock-data.ts` — mocks des données backend, à créer avant d'implémenter
  l'appel réel.
- `hooks/` — hooks React personnalisés, nommés `use-<feature>.ts`.
- `types/` — types et interfaces TypeScript.
- `public/` — assets statiques.

Jamais de fichier de types ou d'utilitaires dans `app/` ou `components/`.
Pas de CSS custom : uniquement des classes Tailwind.
Ne crée pas de nouveaux dossiers sans raison.

## 🧱 Conventions de nommage

- **Fichiers / dossiers** : `kebab-case` (`user-card.tsx`, `auth-provider/`).
- **Composants** : fichier `kebab-case`, export `PascalCase`
  (`user-card.tsx` → `UserCard`).
- **Fonctions / variables** : `camelCase`.
- **Types / interfaces** : `PascalCase`, sans préfixe `I` (`User`, pas `IUser`).
- **Constantes** : `UPPER_SNAKE_CASE` pour les vraies constantes, `camelCase`
  pour les objets de configuration.
- **Routes API** : `kebab-case` (`/api/user-profile`).

## ✍️ Style de code

- **Linter / formateur** : Biome (pas ESLint ni Prettier). `pnpm check` pour
  vérifier, `pnpm format` pour corriger.
- Indentation : **tabulations**. Guillemets : **doubles**. Point-virgules : **oui**.
- Imports de types : `import type`. Biome organise les imports automatiquement.

## 🎨 Styling

- Toujours via `className`. **Jamais** de `style={{}}`.
- Les tokens de design (couleurs, polices, espacements) sont déclarés dans
  `app/globals.css` via `@theme` (Tailwind v4 — pas de `tailwind.config.js`).
- Pas de valeur hexadécimale en dur dans un composant.

## 🧩 Décomposition des écrans & composants

- Les pages restent fines : elles composent des composants et des hooks.
- Composant utilisé sur plusieurs écrans → `components/shared/`.
- Composant propre à un écran → `app/<route>/components/`.
- Sous-composant petit et utilisé une seule fois → peut rester inline.

## 🪝 Hooks personnalisés

- Extraire dans un hook dès qu'un écran gère un état non trivial, des effets de
  bord ou des appels API.
- Nommage : `use-<feature>.ts` en `kebab-case`.
- Dans un hook : état de formulaire, wrappers de mutation API, valeurs dérivées,
  état de chargement.
- Pas dans un hook : navigation et transitions d'écran.
- **Query hooks** : wrappers fins de TanStack Query (`useQuery` / `useMutation`).
- **Flow hooks** : composent plusieurs query hooks avec un état local.
- Composer les hooks plutôt que construire des monolithes.

## 🧪 Tests (TDD)

- Écrire d'abord un test qui échoue, puis le code minimal, puis refactorer.
- Runner : **Vitest**, via `pnpm test` (racine ou app).
- Emplacement : `__tests__/`, miroir de la structure source, suffixe
  `.test.ts` / `.test.tsx`.
- Tester les utilitaires, les hooks (état, async) et les composants avec
  `@testing-library/react`.
- Ne pas tester les internals de framework, le comportement de tiers ni les
  getters triviaux.

## ⚙️ Commandes

- `pnpm dev` — lance toutes les apps (Turborepo).
- `pnpm build` — build de tous les packages et apps.
- `pnpm test` — tous les tests.
- `pnpm typecheck` — vérification des types.
- `pnpm check` — lint Biome.
- `pnpm format` — lint + correction automatique.

## 🤖 Astuces de workflow IA

- **Écrire un guide de build d'abord** : avant de demander une implémentation,
  écris une spec pas à pas (chemins de fichiers, formes d'API, schémas SQL).
  L'IA suit des instructions précises bien mieux que des intentions vagues.
- **Découper en prompts ciblés** : plutôt que « construis tout le système
  d'auth », enchaîne routes → services → hooks frontend → tests. Chaque étape
  s'appuie sur un résultat vérifié.
- **Expliciter les correspondances de valeurs** : quand le front et le back
  utilisent des noms différents (ex. `"light"` vs `"lightly_active"`), liste
  les correspondances. L'IA ne les devinera pas.
- **Rappeler le style de code dans les prompts** : les outils IA partent par
  défaut sur des espaces, des guillemets simples et sans point-virgule. Même
  avec ce fichier, rappeler « tabulations, guillemets doubles, point-virgules »
  évite la dérive, surtout avec des sous-agents.
- **Utiliser des prompts TDD** : plutôt que « construis la fonctionnalité X »,
  essaie « écris les tests qui échouent pour la fonctionnalité X, puis
  implémente-la ». Cela produit du code plus ciblé et testable, et attrape les
  bugs immédiatement.

## 🧭 Principes généraux

- Code simple et explicite plutôt qu'abstractions astucieuses.
- Ne pas sur-concevoir : résoudre le problème actuel, pas des besoins futurs
  hypothétiques.
- Dépendances internes en `workspace:*`.
- Lancer les apps depuis la racine pour profiter de Turborepo.
