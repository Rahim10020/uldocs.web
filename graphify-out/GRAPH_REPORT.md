# Graph Report - uldocs  (2026-10-27)

## Corpus Check
- 140 files · ~242,733 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 763 nodes · 1501 edges · 49 communities (33 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `12703dd5`
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
- document-detail-page.tsx
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- categories-content.tsx
- tasks
- use-documents-search.ts
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- devDependencies
- routes/documents.ts
- uldocs
- react
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
1. `cn()` - 50 edges
2. `lucide-react` - 31 edges
3. `react` - 30 edges
4. `routes` - 19 edges
5. `Container()` - 18 edges
6. `apiFetch()` - 17 edges
7. `compilerOptions` - 16 edges
8. `DocumentDetail` - 15 edges
9. `Règles du projet UL Docs` - 15 edges
10. `mockRequest()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `GridContent()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/shared/document-card.tsx → apps/web/lib/utils.ts
- `CategoriesContent()` --calls--> `useAcademicTree()`  [EXTRACTED]
  apps/web/app/(main)/categories/components/categories-content.tsx → apps/web/hooks/use-academic-tree.ts
- `DocumentDownloadButton()` --calls--> `useDownloadDocument()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-download-button.tsx → apps/web/hooks/use-download-document.ts
- `DocumentFavoriteRow()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-favorite-row.tsx → apps/web/lib/utils.ts
- `DocumentReaction()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-reaction.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (49 total, 2 thin omitted)

### Community 0 - "documents-content.tsx"
Cohesion: 0.10
Nodes (22): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), DocumentsContent(), metadata, CategorySection() (+14 more)

### Community 1 - "cn"
Cohesion: 0.06
Nodes (41): getPageItems(), PageItem, SearchPagination(), SearchResultsHeader(), ViewButton(), DocumentActionBar(), DocumentDownloadButton(), DownloadVariant (+33 more)

### Community 2 - "src/index.ts"
Cohesion: 0.09
Nodes (37): DocumentFavoriteRow(), DownloadVariables, saveFile(), useDownloadDocument(), DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites() (+29 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.08
Nodes (41): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), defaultTitle(), DocumentSpec, FAVORITE_IDS, getMockDocument() (+33 more)

### Community 4 - "document-card.tsx"
Cohesion: 0.09
Nodes (31): DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop(), SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), SimilarDocuments() (+23 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "mocks/academic.ts"
Cohesion: 0.06
Nodes (48): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), getUeContext(), mockAcademic, MockFiliere (+40 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail-page.tsx"
Cohesion: 0.19
Nodes (10): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentPageProps, useDocument(), copyWithTextarea(), useShareDocument(), share() (+2 more)

### Community 10 - "web/package.json"
Cohesion: 0.05
Nodes (40): dependencies, clsx, lucide-react, next, react, react-dom, react-pdf, shared (+32 more)

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
Cohesion: 0.10
Nodes (15): metadata, satoshi, CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, Providers() (+7 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "use-documents-search.ts"
Cohesion: 0.11
Nodes (22): SearchFilters(), SearchFiltersProps, SheetOptions, DocumentsSearchState, FILTER_KEYS, getAcademicYears(), niveauxOf(), parseDocumentsSearchState() (+14 more)

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

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "react"
Cohesion: 0.07
Nodes (31): EmptyResults(), SUGGESTIONS, FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, DesktopAccountMenu(), Footer() (+23 more)

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
- **305 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+300 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 378 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `documents-content.tsx`, `cn`, `src/index.ts`, `document-detail-page.tsx`, `web/package.json`, `categories-content.tsx`, `use-documents-search.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `express` connect `app.ts` to `routes/documents.ts`, `api/package.json`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `cn` to `documents-content.tsx`, `src/index.ts`, `document-card.tsx`, `document-detail-page.tsx`, `web/package.json`, `categories-content.tsx`, `use-documents-search.ts`, `react`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _305 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `documents-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09513742071881606 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.057971014492753624 - nodes in this community are weakly interconnected._
- **Should `src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0880503144654088 - nodes in this community are weakly interconnected._