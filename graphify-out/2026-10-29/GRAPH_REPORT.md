# Graph Report - uldocs  (2026-10-28)

## Corpus Check
- 169 files · ~155,191 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 867 nodes · 1887 edges · 53 communities (37 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5bcb88e1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- documents-content.tsx
- filiere-detail-content.tsx
- src/index.ts
- mocks/documents.ts
- document-card.tsx
- biome.json
- mocks/academic.ts
- compilerOptions
- Contrat d'API — UL Docs
- document-detail-page.tsx
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- use-documents-search.ts
- cn
- tasks
- search-filters.tsx
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- handlers.ts
- api.ts
- devDependencies
- routes/documents.ts
- users.ts
- uldocs
- button.tsx
- Product Brief : UL Docs
- scripts
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md

## God Nodes (most connected - your core abstractions)
1. `cn()` - 70 edges
2. `react` - 40 edges
3. `lucide-react` - 37 edges
4. `routes` - 23 edges
5. `Container()` - 21 edges
6. `apiFetch()` - 17 edges
7. `useAcademicTree()` - 16 edges
8. `next` - 16 edges
9. `compilerOptions` - 16 edges
10. `DocumentDetail` - 15 edges

## Surprising Connections (you probably didn't know these)
- `GridContent()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/shared/document-card.tsx → apps/web/lib/utils.ts
- `useAcademicTree()` --indirect_call--> `getAcademicTree()`  [INFERRED]
  apps/web/hooks/use-academic-tree.ts → apps/web/lib/api/academic.ts
- `CategoryDetailContent()` --calls--> `useAcademicTree()`  [EXTRACTED]
  apps/web/app/(main)/categories/[id]/components/category-detail-content.tsx → apps/web/hooks/use-academic-tree.ts
- `DocumentActionBar()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-action-bar.tsx → apps/web/lib/utils.ts
- `DocumentDownloadButton()` --calls--> `useDownloadDocument()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-download-button.tsx → apps/web/hooks/use-download-document.ts

## Import Cycles
- None detected.

## Communities (53 total, 2 thin omitted)

### Community 0 - "documents-content.tsx"
Cohesion: 0.08
Nodes (29): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, ContributeSection(), FAQ_ITEMS, FaqSection() (+21 more)

### Community 1 - "filiere-detail-content.tsx"
Cohesion: 0.08
Nodes (37): CategoryDetailContent(), SKELETON_KEYS, CategoryPageProps, metadata, FiliereDetailContent(), FiliereDetailSkeleton(), SKELETON_KEYS, FilierePageProps (+29 more)

### Community 2 - "src/index.ts"
Cohesion: 0.09
Nodes (35): DocumentFavoriteRow(), DownloadButton(), ReactionVariables, DownloadVariables, saveFile(), useDownloadDocument(), DocumentsCache, FavoriteVariables (+27 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.13
Nodes (23): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), defaultTitle(), DocumentSpec, FAVORITE_IDS, listMockDocumentsByUploader() (+15 more)

### Community 4 - "document-card.tsx"
Cohesion: 0.07
Nodes (36): DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop(), PageStepper(), commit(), PagePicker() (+28 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "mocks/academic.ts"
Cohesion: 0.09
Nodes (25): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), getUeContext(), mockAcademic, MockFiliere (+17 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail-page.tsx"
Cohesion: 0.16
Nodes (12): DocumentActionBar(), DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), DocumentPageProps, useDocument(), copyWithTextarea() (+4 more)

### Community 10 - "web/package.json"
Cohesion: 0.05
Nodes (41): dependencies, clsx, lucide-react, next, react, react-dom, react-pdf, shared (+33 more)

### Community 11 - "package.json"
Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"
Cohesion: 0.12
Nodes (15): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants, 📦 Dépendances (+7 more)

### Community 13 - "shared/package.json"
Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "use-documents-search.ts"
Cohesion: 0.13
Nodes (25): metadata, satoshi, Providers(), DocumentsSearchState, FILTER_KEYS, niveauxOf(), parseDocumentsSearchState(), sortNiveaux() (+17 more)

### Community 15 - "cn"
Cohesion: 0.05
Nodes (55): DocumentDownloadButton(), DownloadVariant, DocumentOptionsSheet(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentShareButton(), ShareVariant (+47 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "search-filters.tsx"
Cohesion: 0.16
Nodes (12): SearchFilters(), SearchFiltersProps, SheetOptions, FiliereFilters(), SearchSelect(), handleKeyDown(), selectOption(), formatNiveau() (+4 more)

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

### Community 23 - "handlers.ts"
Cohesion: 0.20
Nodes (15): request(), ApiError, getMockDocument(), getMockReaction(), getReactionState(), recordMockDownload(), setMockFavorite(), setMockReaction() (+7 more)

### Community 24 - "api.ts"
Cohesion: 0.11
Nodes (26): DocumentReactionPayload, Document, Enseignant, Faculte, Filiere, ModerationAction, Niveau, Signalement (+18 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "users.ts"
Cohesion: 0.15
Nodes (10): analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel, informatique, MOCK_USERS (+2 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "button.tsx"
Cohesion: 0.08
Nodes (27): EmptyResults(), SUGGESTIONS, FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, UeDocumentsEmpty(), DesktopAccountMenu() (+19 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 35 - "copy-pdf-worker.mjs"
Cohesion: 0.33
Nodes (5): appRoot, reactPdfPackage, require, workerSource, workerTarget

### Community 36 - "Données Académiques de l'Université de Lomé (UL)"
Cohesion: 0.33
Nodes (5): 1. Structure de la Base, 2. Données détaillées (Filières & UE), Données Académiques de l'Université de Lomé (UL), Liste des entités (15), 🎯 Objectif

### Community 37 - "__tests__/documents.test.ts"
Cohesion: 0.50
Nodes (3): app, resetReactions(), supertest

### Community 38 - "Dépendances autorisées du projet"
Cohesion: 0.40
Nodes (4): Backend (`apps/api`), Dépendances autorisées du projet, Frontend (`apps/web`), Règle stricte

### Community 39 - "dependencies"
Cohesion: 0.50
Nodes (4): dependencies, cors, express, shared

## Knowledge Gaps
- **324 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+319 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 402 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `cn` to `documents-content.tsx`, `filiere-detail-content.tsx`, `src/index.ts`, `document-detail-page.tsx`, `web/package.json`, `use-documents-search.ts`, `search-filters.tsx`, `button.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `express` connect `app.ts` to `routes/documents.ts`, `api/package.json`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `documents-content.tsx`, `src/index.ts`, `document-card.tsx`, `document-detail-page.tsx`, `search-filters.tsx`, `button.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _324 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `documents-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07617051013277429 - nodes in this community are weakly interconnected._
- **Should `filiere-detail-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07607843137254902 - nodes in this community are weakly interconnected._
- **Should `src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09490196078431372 - nodes in this community are weakly interconnected._