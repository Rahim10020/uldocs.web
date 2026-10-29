# Graph Report - uldocs  (2026-10-27)

## Corpus Check

- 139 files · ~242,582 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 757 nodes · 1486 edges · 57 communities (40 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `7dcc35b5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- documents-content.tsx
- cn
- src/index.ts
- mocks/documents.ts
- document-card.tsx
- biome.json
- mocks/academic.ts
- compilerOptions
- Contrat d'API — UL Docs
- api.ts
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- categories-content.tsx
- enums.ts
- tasks
- search-filters.tsx
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- use-documents-search.ts
- dependencies
- devDependencies
- routes/documents.ts
- devDependencies
- scripts
- uldocs
- next
- Product Brief : UL Docs
- data/academic.ts
- scripts
- app/layout.tsx
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- **tests**/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md

## God Nodes (most connected - your core abstractions)

1. `cn()` - 50 edges
2. `lucide-react` - 31 edges
3. `react` - 28 edges
4. `routes` - 19 edges
5. `Container()` - 17 edges
6. `apiFetch()` - 17 edges
7. `compilerOptions` - 16 edges
8. `DocumentDetail` - 15 edges
9. `Règles du projet UL Docs` - 15 edges
10. `mockRequest()` - 13 edges

## Surprising Connections (you probably didn't know these)

- `ViewButton()` --calls--> `cn()` [EXTRACTED]
  apps/web/app/(main)/documents/components/search-results-header.tsx → apps/web/lib/utils.ts
- `GridContent()` --calls--> `cn()` [EXTRACTED]
  apps/web/components/shared/document-card.tsx → apps/web/lib/utils.ts
- `useAcademicTree()` --indirect_call--> `getAcademicTree()` [INFERRED]
  apps/web/hooks/use-academic-tree.ts → apps/web/lib/api/academic.ts
- `CategoriesContent()` --calls--> `useAcademicTree()` [EXTRACTED]
  apps/web/app/(main)/categories/components/categories-content.tsx → apps/web/hooks/use-academic-tree.ts
- `DocumentDetailPage()` --calls--> `useShareDocument()` [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-detail-page.tsx → apps/web/hooks/use-share-document.ts

## Import Cycles

- None detected.

## Communities (57 total, 2 thin omitted)

### Community 0 - "documents-content.tsx"

Cohesion: 0.05
Nodes (48): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), DocumentsContent(), EmptyResults(), SUGGESTIONS (+40 more)

### Community 1 - "cn"

Cohesion: 0.06
Nodes (44): DocumentActionBar(), SIMILAR_SKELETON_KEYS, DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentMobileBar(), DocumentOptionsSheet(), DocumentPreview() (+36 more)

### Community 2 - "src/index.ts"

Cohesion: 0.09
Nodes (39): DocumentDetailPage(), ReactionVariables, useDocumentReaction(), useDocument(), DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites() (+31 more)

### Community 3 - "mocks/documents.ts"

Cohesion: 0.08
Nodes (42): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), defaultTitle(), DocumentSpec, FAVORITE_IDS, getMockDocument() (+34 more)

### Community 4 - "document-card.tsx"

Cohesion: 0.09
Nodes (31): DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop(), PagePicker(), commit(), SIMILAR_SKELETON_KEYS (+23 more)

### Community 5 - "biome.json"

Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "mocks/academic.ts"

Cohesion: 0.12
Nodes (17): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), getUeContext(), mockAcademic, MockFiliere (+9 more)

### Community 7 - "compilerOptions"

Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"

Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "api.ts"

Cohesion: 0.14
Nodes (16): DocumentReactionPayload, LoginPayload, RegisterPayload, Document, Enseignant, Faculte, ModerationAction, Niveau (+8 more)

### Community 10 - "web/package.json"

Cohesion: 0.12
Nodes (16): shared, @types/node, typescript, vitest, name, packageManager, private, version (+8 more)

### Community 11 - "package.json"

Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"

Cohesion: 0.12
Nodes (15): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants, 📦 Dépendances (+7 more)

### Community 13 - "shared/package.json"

Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "categories-content.tsx"

Cohesion: 0.17
Nodes (10): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, SearchSelect(), handleKeyDown(), selectOption() (+2 more)

### Community 15 - "enums.ts"

Cohesion: 0.14
Nodes (13): TRI_DOCUMENT_LABELS, TYPE_DOCUMENT_LABELS, ActionModeration, ACTIONS_MODERATION, FORMATS_DOCUMENT, MOTIFS_SIGNALEMENT, MotifSignalement, ROLES (+5 more)

### Community 16 - "tasks"

Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "search-filters.tsx"

Cohesion: 0.19
Nodes (9): SearchFilters(), SearchFiltersProps, SheetOptions, formatNiveau(), formatSemestre(), NIVEAU_LABELS, NiveauScolarite, TRIS_DOCUMENTS (+1 more)

### Community 18 - "compilerOptions"

Cohesion: 0.14
Nodes (13): compilerOptions, declaration, declarationMap, esModuleInterop, module, moduleResolution, outDir, rootDir (+5 more)

### Community 19 - "**Methode de remplissage de la matrice**"

Cohesion: 0.15
Nodes (12): Administration, Authentification, Definition du perimetre (MVP), Experience et Contenu Editorial, Gestion des documents, Interaction et communaute, **Methode de remplissage de la matrice**, Moderation et confiance (+4 more)

### Community 20 - "api/package.json"

Cohesion: 0.17
Nodes (11): shared, @types/node, typescript, vitest, name, private, type, tsx (+3 more)

### Community 21 - "app.ts"

Cohesion: 0.26
Nodes (8): errorHandler(), documentsRouter, healthRouter, router, ErrorResponse, HealthResponse, cors, express

### Community 22 - "compilerOptions"

Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, lib, module, moduleResolution, outDir, rootDir, skipLibCheck (+3 more)

### Community 23 - "use-documents-search.ts"

Cohesion: 0.27
Nodes (11): DOCUMENTS_PAGE_SIZE, DocumentsSearchState, FILTER_KEYS, getAcademicYears(), niveauxOf(), parseDocumentsSearchState(), readInt(), readString() (+3 more)

### Community 24 - "dependencies"

Cohesion: 0.20
Nodes (10): dependencies, clsx, lucide-react, next, react, react-dom, react-pdf, shared (+2 more)

### Community 25 - "devDependencies"

Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"

Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "devDependencies"

Cohesion: 0.25
Nodes (8): devDependencies, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom, typescript, vitest

### Community 28 - "scripts"

Cohesion: 0.25
Nodes (8): scripts, build, dev, prebuild, predev, start, test, test:watch

### Community 29 - "uldocs"

Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "next"

Cohesion: 0.29
Nodes (4): FavoritesContent(), metadata, nextConfig, next

### Community 31 - "Product Brief : UL Docs"

Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "data/academic.ts"

Cohesion: 0.29
Nodes (6): AcademicFiliereSeed, AcademicStructureSeed, NIVEAUX_SCOLARITE, ORDRE_NIVEAU, SEMESTRES_PAR_NIVEAU, CategorieFaculte

### Community 33 - "scripts"

Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "app/layout.tsx"

Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 35 - "copy-pdf-worker.mjs"

Cohesion: 0.33
Nodes (5): appRoot, reactPdfPackage, require, workerSource, workerTarget

### Community 36 - "Données Académiques de l'Université de Lomé (UL)"

Cohesion: 0.33
Nodes (5): 1. Structure de la Base, 2. Données détaillées (Filières & UE), Données Académiques de l'Université de Lomé (UL), Liste des entités (15), 🎯 Objectif

### Community 37 - "**tests**/documents.test.ts"

Cohesion: 0.50
Nodes (3): app, resetReactions(), supertest

### Community 38 - "Dépendances autorisées du projet"

Cohesion: 0.40
Nodes (4): Backend (`apps/api`), Dépendances autorisées du projet, Frontend (`apps/web`), Règle stricte

### Community 39 - "dependencies"

Cohesion: 0.50
Nodes (4): dependencies, cors, express, shared

## Knowledge Gaps

- **303 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+298 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 375 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `express` connect `app.ts` to `routes/documents.ts`, `api/package.json`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `react` connect `documents-content.tsx` to `cn`, `app/layout.tsx`, `src/index.ts`, `web/package.json`, `categories-content.tsx`, `search-filters.tsx`, `use-documents-search.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `documents-content.tsx` to `cn`, `document-card.tsx`, `web/package.json`, `categories-content.tsx`, `search-filters.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _303 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `documents-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05124685426675818 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.05868544600938967 - nodes in this community are weakly interconnected._
- **Should `src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0852994555353902 - nodes in this community are weakly interconnected._
