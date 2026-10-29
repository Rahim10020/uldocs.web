# Graph Report - uldocs  (2026-10-28)

## Corpus Check

- 142 files · ~243,580 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 777 nodes · 1540 edges · 60 communities (44 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `14227eb2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- categories-content.tsx
- lucide-react
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
- next
- cn
- tasks
- search-filters.tsx
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- document-detail.ts
- api.ts
- devDependencies
- routes/documents.ts
- use-documents-search.ts
- enums.ts
- uldocs
- react
- Product Brief : UL Docs
- PdfViewer
- scripts
- dependencies
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- **tests**/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- devDependencies
- scripts
- search-pagination.tsx
- use-share-document.ts

## God Nodes (most connected - your core abstractions)

1. `cn()` - 55 edges
2. `lucide-react` - 32 edges
3. `react` - 32 edges
4. `routes` - 19 edges
5. `Container()` - 18 edges
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
- `DocumentActionBar()` --calls--> `cn()` [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-action-bar.tsx → apps/web/lib/utils.ts
- `DocumentDetailPage()` --calls--> `useShareDocument()` [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-detail-page.tsx → apps/web/hooks/use-share-document.ts
- `DocumentDetailPage()` --calls--> `documentPageCount()` [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/document-detail-page.tsx → apps/web/lib/document-detail.ts

## Import Cycles

- None detected.

## Communities (60 total, 2 thin omitted)

### Community 0 - "categories-content.tsx"

Cohesion: 0.07
Nodes (30): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, ContributeSection(), FAQ_ITEMS, FaqSection() (+22 more)

### Community 1 - "lucide-react"

Cohesion: 0.23
Nodes (10): DocumentDownloadButton(), DownloadVariant, DocumentOptionsSheet(), DocumentShareButton(), ShareVariant, FavoriteButton(), useBodyScrollLock(), toDownloadFileName() (+2 more)

### Community 2 - "src/index.ts"

Cohesion: 0.09
Nodes (36): DocumentDetailPage(), DocumentFavoriteRow(), DownloadButton(), ReactionVariables, useDocument(), DownloadVariables, saveFile(), useDownloadDocument() (+28 more)

### Community 3 - "mocks/documents.ts"

Cohesion: 0.07
Nodes (47): request(), ApiError, getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), defaultTitle(), DocumentSpec (+39 more)

### Community 4 - "document-card.tsx"

Cohesion: 0.14
Nodes (19): DocumentTop(), SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), SimilarDocuments(), CardVariant, DocumentCardProps, DownloadsMeta(), GridContent() (+11 more)

### Community 5 - "biome.json"

Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "mocks/academic.ts"

Cohesion: 0.10
Nodes (21): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), getUeContext(), mockAcademic, MockFiliere (+13 more)

### Community 7 - "compilerOptions"

Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"

Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail-page.tsx"

Cohesion: 0.15
Nodes (9): DocumentActionBar(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentPageProps (+1 more)

### Community 10 - "web/package.json"

Cohesion: 0.12
Nodes (15): shared, @types/node, typescript, vitest, name, packageManager, private, version (+7 more)

### Community 11 - "package.json"

Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"

Cohesion: 0.12
Nodes (15): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants, 📦 Dépendances (+7 more)

### Community 13 - "shared/package.json"

Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "next"

Cohesion: 0.25
Nodes (5): metadata, satoshi, Providers(), nextConfig, next

### Community 15 - "cn"

Cohesion: 0.13
Nodes (18): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PdfPage() (+10 more)

### Community 16 - "tasks"

Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "search-filters.tsx"

Cohesion: 0.15
Nodes (12): SearchFilters(), SearchFiltersProps, SheetOptions, formatNiveau(), formatSemestre(), NIVEAU_LABELS, TRI_DOCUMENT_LABELS, TYPE_DOCUMENT_LABELS (+4 more)

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

### Community 23 - "document-detail.ts"

Cohesion: 0.21
Nodes (13): DocumentReaction(), vote(), ReactionVariant, VOTES, useDocumentReaction(), applyReaction(), BreadcrumbItem, canPreviewDocument() (+5 more)

### Community 24 - "api.ts"

Cohesion: 0.18
Nodes (15): DocumentReactionPayload, LoginPayload, Document, Enseignant, Faculte, Filiere, ModerationAction, Niveau (+7 more)

### Community 25 - "devDependencies"

Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"

Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "use-documents-search.ts"

Cohesion: 0.19
Nodes (14): SearchResultsHeader(), ViewButton(), DOCUMENTS_PAGE_SIZE, DocumentsSearchState, FILTER_KEYS, getAcademicYears(), niveauxOf(), parseDocumentsSearchState() (+6 more)

### Community 28 - "enums.ts"

Cohesion: 0.15
Nodes (12): ActionModeration, ACTIONS_MODERATION, FORMATS_DOCUMENT, MOTIFS_SIGNALEMENT, MotifSignalement, Role, ROLES, STATUTS_DOCUMENT (+4 more)

### Community 29 - "uldocs"

Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "react"

Cohesion: 0.06
Nodes (32): EmptyResults(), SUGGESTIONS, FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, MatierePageProps, DesktopAccountMenu() (+24 more)

### Community 31 - "Product Brief : UL Docs"

Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "PdfViewer"

Cohesion: 0.24
Nodes (6): PageStepper(), commit(), PagePicker(), commit(), PdfViewer(), clampPage()

### Community 33 - "scripts"

Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "dependencies"

Cohesion: 0.20
Nodes (10): dependencies, clsx, lucide-react, next, react, react-dom, react-pdf, shared (+2 more)

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

### Community 49 - "devDependencies"

Cohesion: 0.25
Nodes (8): devDependencies, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom, typescript, vitest

### Community 57 - "scripts"

Cohesion: 0.25
Nodes (8): scripts, build, dev, prebuild, predev, start, test, test:watch

### Community 58 - "search-pagination.tsx"

Cohesion: 0.50
Nodes (3): getPageItems(), PageItem, SearchPagination()

### Community 59 - "use-share-document.ts"

Cohesion: 0.67
Nodes (3): copyWithTextarea(), useShareDocument(), share()

## Knowledge Gaps

- **306 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+301 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 383 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `categories-content.tsx`, `lucide-react`, `src/index.ts`, `document-detail-page.tsx`, `use-share-document.ts`, `web/package.json`, `next`, `cn`, `search-filters.tsx`, `search-pagination.tsx`, `use-documents-search.ts`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `express` connect `app.ts` to `routes/documents.ts`, `api/package.json`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `categories-content.tsx`, `src/index.ts`, `document-card.tsx`, `document-detail-page.tsx`, `web/package.json`, `cn`, `search-filters.tsx`, `document-detail.ts`, `search-pagination.tsx`, `use-documents-search.ts`, `react`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _306 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `categories-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0707070707070707 - nodes in this community are weakly interconnected._
- **Should `src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08552188552188553 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06766917293233082 - nodes in this community are weakly interconnected._
