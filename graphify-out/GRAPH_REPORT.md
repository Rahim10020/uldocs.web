# Graph Report - uldocs  (2026-10-30)

## Corpus Check
- 203 files · ~166,879 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 988 nodes · 2282 edges · 54 communities (39 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `193d1c6d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- filiere-detail-content.tsx
- src/index.ts
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
- search-pagination.tsx
- pdf-viewer.tsx
- tasks
- ue-documents-content.tsx
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- react
- mocks/academic.ts
- devDependencies
- routes/documents.ts
- routes.ts
- app/layout.tsx
- uldocs
- container.tsx
- Product Brief : UL Docs
- scripts
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- register-screen.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 82 edges
2. `react` - 52 edges
3. `lucide-react` - 42 edges
4. `routes` - 31 edges
5. `Container()` - 21 edges
6. `mockRequest()` - 20 edges
7. `apiFetch()` - 19 edges
8. `useAcademicTree()` - 18 edges
9. `@tanstack/react-query` - 16 edges
10. `next` - 16 edges

## Surprising Connections (you probably didn't know these)
- `PageThumbnail()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/page-thumbnail-rail.tsx → apps/web/lib/utils.ts
- `PreviewFallback()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `PdfPageSkeleton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `TypeFilterRow()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-filters.tsx → apps/web/lib/utils.ts
- `TypeChip()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-type-chips.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (54 total, 2 thin omitted)

### Community 0 - "cn"
Cohesion: 0.27
Nodes (9): AcademicPageHeader(), AcademicPageHeaderSkeleton(), Breadcrumb(), BreadcrumbItem, ViewButton(), Accordion(), Carousel(), ReadMoreText() (+1 more)

### Community 1 - "filiere-detail-content.tsx"
Cohesion: 0.06
Nodes (42): OnboardingFlow(), handleContinue(), handleFinish(), CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata (+34 more)

### Community 2 - "src/index.ts"
Cohesion: 0.08
Nodes (46): DocumentDetailPage(), DownloadButton(), ReactionVariables, useDocument(), DownloadVariables, saveFile(), useDownloadDocument(), DocumentsCache (+38 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.07
Nodes (54): request(), ApiError, getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), defaultTitle(), DocumentSpec (+46 more)

### Community 4 - "document-card.tsx"
Cohesion: 0.07
Nodes (37): DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop(), PageStepper(), commit(), PagePicker() (+29 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "lucide-react"
Cohesion: 0.24
Nodes (9): DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentMobileBar(), DocumentShareButton(), ShareVariant, FavoriteButton(), toDownloadFileName() (+1 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail-page.tsx"
Cohesion: 0.14
Nodes (11): DocumentActionBar(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentPageProps, Skeleton() (+3 more)

### Community 10 - "web/package.json"
Cohesion: 0.04
Nodes (45): dependencies, clsx, @hookform/resolvers, lucide-react, next, react, react-dom, react-hook-form (+37 more)

### Community 11 - "package.json"
Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"
Cohesion: 0.12
Nodes (15): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants, 📦 Dépendances (+7 more)

### Community 13 - "shared/package.json"
Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "search-pagination.tsx"
Cohesion: 0.50
Nodes (3): getPageItems(), PageItem, SearchPagination()

### Community 15 - "pdf-viewer.tsx"
Cohesion: 0.11
Nodes (13): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PdfPage() (+5 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "ue-documents-content.tsx"
Cohesion: 0.05
Nodes (57): DocumentsContent(), EmptyResults(), SUGGESTIONS, SearchFilters(), SearchFiltersProps, SheetOptions, metadata, FiliereFilters() (+49 more)

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

### Community 23 - "react"
Cohesion: 0.15
Nodes (14): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, Step, STEP_CONTENT, STEPS, DocumentOptionsSheet() (+6 more)

### Community 24 - "mocks/academic.ts"
Cohesion: 0.05
Nodes (49): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), getUeContext(), MockFiliere, MockNiveau (+41 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.31
Nodes (8): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VoteDocument, VOTES_DOCUMENT

### Community 27 - "routes.ts"
Cohesion: 0.07
Nodes (35): AuthMobileTopBar(), RegisterSuccess(), FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, DesktopAccountMenu(), DocumentCard() (+27 more)

### Community 28 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "container.tsx"
Cohesion: 0.09
Nodes (24): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, ContributeSection(), FAQ_ITEMS, FaqSection() (+16 more)

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

### Community 42 - "register-screen.tsx"
Cohesion: 0.07
Nodes (28): AuthLink(), AuthRoute, AuthModal(), ForgotPasswordScreen(), LoginForm(), LoginScreen(), RegisterForm(), EMPTY_DRAFT (+20 more)

## Knowledge Gaps
- **341 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+336 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 433 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `cn`, `filiere-detail-content.tsx`, `src/index.ts`, `lucide-react`, `document-detail-page.tsx`, `register-screen.tsx`, `web/package.json`, `search-pagination.tsx`, `pdf-viewer.tsx`, `ue-documents-content.tsx`, `routes.ts`, `app/layout.tsx`, `container.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `express` connect `app.ts` to `routes/documents.ts`, `api/package.json`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `filiere-detail-content.tsx`, `src/index.ts`, `document-card.tsx`, `lucide-react`, `document-detail-page.tsx`, `register-screen.tsx`, `search-pagination.tsx`, `pdf-viewer.tsx`, `ue-documents-content.tsx`, `react`, `routes.ts`, `container.tsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _341 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filiere-detail-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06174863387978142 - nodes in this community are weakly interconnected._
- **Should `src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08077260755048288 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06605222734254992 - nodes in this community are weakly interconnected._