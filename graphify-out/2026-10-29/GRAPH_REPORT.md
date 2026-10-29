# Graph Report - uldocs  (2026-10-29)

## Corpus Check
- 202 files · ~178,255 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 986 nodes · 2277 edges · 60 communities (45 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `308b6a45`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- academic-page-header.tsx
- academic-navigation.ts
- api/documents.ts
- mocks/documents.ts
- document-card.tsx
- biome.json
- lucide-react
- compilerOptions
- Contrat d'API — UL Docs
- document-detail-page.tsx
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- ue-documents-content.tsx
- cn
- tasks
- src/index.ts
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- PdfViewer
- mocks/academic.ts
- devDependencies
- routes/documents.ts
- button.tsx
- app/layout.tsx
- uldocs
- routes.ts
- Product Brief : UL Docs
- document-detail.ts
- scripts
- category-detail-content.tsx
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- react
- filiere-detail-content.tsx
- use-favorite-document.ts
- academic-content.test.ts
- pdf-toolbar.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 82 edges
2. `react` - 51 edges
3. `lucide-react` - 42 edges
4. `routes` - 31 edges
5. `Container()` - 21 edges
6. `mockRequest()` - 20 edges
7. `apiFetch()` - 19 edges
8. `useAcademicTree()` - 18 edges
9. `@tanstack/react-query` - 16 edges
10. `next` - 16 edges

## Surprising Connections (you probably didn't know these)
- `GridContent()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/shared/document-card.tsx → apps/web/lib/utils.ts
- `ViewButton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/shared/search-results-header.tsx → apps/web/lib/utils.ts
- `useAcademicTree()` --indirect_call--> `getAcademicTree()`  [INFERRED]
  apps/web/hooks/use-academic-tree.ts → apps/web/lib/api/academic.ts
- `AuthDialog()` --calls--> `useBodyScrollLock()`  [EXTRACTED]
  apps/web/app/(auth)/components/auth-dialog.tsx → apps/web/hooks/use-body-scroll-lock.ts
- `AuthDialog()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(auth)/components/auth-dialog.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (60 total, 2 thin omitted)

### Community 0 - "academic-page-header.tsx"
Cohesion: 0.47
Nodes (4): AcademicPageHeader(), AcademicPageHeaderSkeleton(), Breadcrumb(), BreadcrumbItem

### Community 1 - "academic-navigation.ts"
Cohesion: 0.19
Nodes (14): useFiliereFilters(), AcademicFiliere, AcademicNiveau, AcademicSemestre, FiliereContext, listFiliereSemestres(), UeContext, FiliereFiltersState (+6 more)

### Community 2 - "api/documents.ts"
Cohesion: 0.09
Nodes (37): LoginForm(), DesktopAccountMenu(), MobileMenu(), UserAvatar(), DownloadVariables, useForgotPassword(), useLogin(), useLogout() (+29 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.06
Nodes (56): request(), ApiError, getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), defaultTitle(), DocumentSpec (+48 more)

### Community 4 - "document-card.tsx"
Cohesion: 0.16
Nodes (16): DocumentTop(), SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), SimilarDocuments(), CardVariant, DocumentCardProps, DownloadsMeta(), GridContent() (+8 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "lucide-react"
Cohesion: 0.18
Nodes (14): DocumentDownloadButton(), DownloadVariant, DocumentShareButton(), ShareVariant, DownloadButton(), FavoriteButton(), AuthSelect(), AuthSelectOption (+6 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail-page.tsx"
Cohesion: 0.16
Nodes (12): DocumentActionBar(), DocumentDetailPage(), DocumentDetailSkeleton(), DocumentMobileBar(), DocumentPreview(), DocumentPageProps, useDocument(), copyWithTextarea() (+4 more)

### Community 10 - "web/package.json"
Cohesion: 0.04
Nodes (46): dependencies, clsx, @hookform/resolvers, lucide-react, next, react, react-dom, react-hook-form (+38 more)

### Community 11 - "package.json"
Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"
Cohesion: 0.12
Nodes (15): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants, 📦 Dépendances (+7 more)

### Community 13 - "shared/package.json"
Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "ue-documents-content.tsx"
Cohesion: 0.16
Nodes (11): UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), UeFilters(), MatierePageProps, metadata, getPageItems(), PageItem (+3 more)

### Community 15 - "cn"
Cohesion: 0.11
Nodes (19): SIMILAR_SKELETON_KEYS, PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PAGE_WIDTH_CLASS (+11 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "src/index.ts"
Cohesion: 0.06
Nodes (48): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, DocumentsContent(), SearchFilters(), SearchFiltersProps (+40 more)

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

### Community 23 - "PdfViewer"
Cohesion: 0.18
Nodes (5): DocumentOptionsSheet(), PdfViewer(), FilterSheet(), useBodyScrollLock(), canPreviewDocument()

### Community 24 - "mocks/academic.ts"
Cohesion: 0.05
Nodes (50): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), getUeContext(), MockFiliere, MockNiveau (+42 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "button.tsx"
Cohesion: 0.10
Nodes (20): RegisterSuccess(), EmptyResults(), SUGGESTIONS, FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, DocumentCard() (+12 more)

### Community 28 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "routes.ts"
Cohesion: 0.07
Nodes (31): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), metadata, CategoryCard(), CategoryCardSkeleton() (+23 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "document-detail.ts"
Cohesion: 0.19
Nodes (16): DocumentReaction(), vote(), ReactionVariant, VOTES, ReactionVariables, useDocumentReaction(), setDocumentReaction(), applyReaction() (+8 more)

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "category-detail-content.tsx"
Cohesion: 0.21
Nodes (9): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, AcademicNotFound(), ErrorPanel(), getFaculteDescription() (+1 more)

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

### Community 42 - "react"
Cohesion: 0.06
Nodes (38): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthLink(), AuthRoute, AuthMobileTopBar(), AuthModal() (+30 more)

### Community 43 - "filiere-detail-content.tsx"
Cohesion: 0.21
Nodes (9): FiliereDetailContent(), FiliereDetailSkeleton(), SKELETON_KEYS, FilierePageProps, metadata, AcademicLinkCard(), AcademicLinkCardSkeleton(), findFiliere() (+1 more)

### Community 44 - "use-favorite-document.ts"
Cohesion: 0.33
Nodes (8): DocumentFavoriteRow(), DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites(), useFavoriteDocument(), addFavorite(), removeFavorite()

### Community 49 - "academic-content.test.ts"
Cohesion: 0.36
Nodes (7): FACULTE_DESCRIPTIONS, FALLBACK_DESCRIPTION, FILIERE_DESCRIPTIONS, getFiliereDescription(), UE_DESCRIPTIONS, filieres, ues

### Community 57 - "pdf-toolbar.tsx"
Cohesion: 0.36
Nodes (6): PageStepper(), commit(), PdfToolbar(), PagePicker(), commit(), clampPage()

## Knowledge Gaps
- **341 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+336 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 433 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `academic-page-header.tsx`, `academic-navigation.ts`, `category-detail-content.tsx`, `api/documents.ts`, `lucide-react`, `document-detail-page.tsx`, `web/package.json`, `filiere-detail-content.tsx`, `ue-documents-content.tsx`, `cn`, `src/index.ts`, `PdfViewer`, `pdf-toolbar.tsx`, `button.tsx`, `app/layout.tsx`, `routes.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `express` connect `app.ts` to `routes/documents.ts`, `api/package.json`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `document-detail.ts`, `academic-page-header.tsx`, `api/documents.ts`, `document-card.tsx`, `lucide-react`, `document-detail-page.tsx`, `react`, `filiere-detail-content.tsx`, `use-favorite-document.ts`, `ue-documents-content.tsx`, `src/index.ts`, `PdfViewer`, `pdf-toolbar.tsx`, `button.tsx`, `routes.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _341 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `api/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08926553672316384 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06377204884667571 - nodes in this community are weakly interconnected._
- **Should `biome.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._