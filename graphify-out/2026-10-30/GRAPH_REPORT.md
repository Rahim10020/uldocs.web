# Graph Report - uldocs  (2026-10-30)

## Corpus Check
- 228 files · ~164,303 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1110 nodes · 2719 edges · 65 communities (52 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a79959d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- utils.ts
- filiere-detail-content.tsx
- api/documents.ts
- mocks/documents.ts
- academic-navigation.ts
- biome.json
- document-download-button.tsx
- compilerOptions
- Contrat d'API — UL Docs
- document-detail-page.tsx
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- cn
- pdf-viewer.tsx
- tasks
- use-documents-search.ts
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- onboarding-flow.tsx
- api.ts
- devDependencies
- routes/documents.ts
- routes.ts
- lucide-react
- uldocs
- documents-content.tsx
- Product Brief : UL Docs
- handlers.ts
- scripts
- mocks/academic.ts
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- floating-input.tsx
- users.ts
- use-new-document-flow.ts
- register-screen.tsx
- academic-navigation.test.ts
- categories-content.tsx
- src/index.ts
- academic-content.test.ts
- search-pagination.tsx
- react
- ue-documents-content.tsx
- OnboardingFlow

## God Nodes (most connected - your core abstractions)
1. `cn()` - 92 edges
2. `react` - 57 edges
3. `lucide-react` - 51 edges
4. `routes` - 37 edges
5. `mockRequest()` - 27 edges
6. `useNewDocumentFlow()` - 25 edges
7. `Container()` - 24 edges
8. `next` - 22 edges
9. `useAcademicTree()` - 20 edges
10. `ApiError` - 20 edges

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

## Communities (65 total, 2 thin omitted)

### Community 0 - "utils.ts"
Cohesion: 0.27
Nodes (6): AcademicPageHeaderSkeleton(), Breadcrumb(), BreadcrumbItem, ReadMoreText(), SearchBar(), SearchBarProps

### Community 1 - "filiere-detail-content.tsx"
Cohesion: 0.18
Nodes (11): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, SKELETON_KEYS, AcademicNotFound(), ErrorPanel() (+3 more)

### Community 2 - "api/documents.ts"
Cohesion: 0.07
Nodes (44): metadata, satoshi, MyDocumentsContent(), MyDocumentsList(), metadata, Providers(), UploadedDocumentCard(), DownloadVariables (+36 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.11
Nodes (30): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+22 more)

### Community 4 - "academic-navigation.ts"
Cohesion: 0.26
Nodes (11): useFiliereFilters(), AcademicFiliere, AcademicNiveau, AcademicSemestre, FiliereContext, listFiliereSemestres(), UeContext, FiliereFiltersState (+3 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "document-download-button.tsx"
Cohesion: 0.29
Nodes (6): DocumentActionBar(), DocumentDownloadButton(), DownloadVariant, DocumentShareButton(), ShareVariant, FavoriteButton()

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail-page.tsx"
Cohesion: 0.05
Nodes (50): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentReaction() (+42 more)

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

### Community 14 - "cn"
Cohesion: 0.14
Nodes (14): metadata, SKELETON_KEYS, AcademicLinkCard(), AcademicLinkCardSkeleton(), CardVariant, DocumentCard(), DocumentCardProps, DocumentCardSkeleton() (+6 more)

### Community 15 - "pdf-viewer.tsx"
Cohesion: 0.11
Nodes (13): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PdfPage() (+5 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "use-documents-search.ts"
Cohesion: 0.10
Nodes (31): SearchFilters(), SearchFiltersProps, SheetOptions, FiliereFilters(), SearchSelect(), handleKeyDown(), selectOption(), DocumentsSearchState (+23 more)

### Community 18 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, declaration, declarationMap, esModuleInterop, lib, module, moduleResolution, outDir (+6 more)

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

### Community 23 - "onboarding-flow.tsx"
Cohesion: 0.29
Nodes (6): Step, STEP_CONTENT, STEPS, AuthSelect(), AuthSelectOption, AuthSelectProps

### Community 24 - "api.ts"
Cohesion: 0.10
Nodes (27): ApiResponse, DocumentCreatePayload, PaginatedResponse, Document, Enseignant, Faculte, Filiere, ModerationAction (+19 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "routes.ts"
Cohesion: 0.06
Nodes (35): AuthMobileTopBar(), RegisterSuccess(), NewDocumentFlow(), NewDocumentForm(), metadata, FavoritesContent(), FavoritesList(), metadata (+27 more)

### Community 28 - "lucide-react"
Cohesion: 0.27
Nodes (8): CategoryCard(), CategoryCardSkeleton(), ICONS, FEATURED_FACULTY_CODES, DocumentSectionProps, Carousel(), SectionHeading(), lucide-react

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "documents-content.tsx"
Cohesion: 0.11
Nodes (17): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), DocumentsContent(), EmptyResults(), SUGGESTIONS (+9 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "handlers.ts"
Cohesion: 0.20
Nodes (21): request(), ApiError, getUeContext(), createMockDocument(), recordMockDownload(), setMockFavorite(), delay(), mockRequest() (+13 more)

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "mocks/academic.ts"
Cohesion: 0.10
Nodes (21): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+13 more)

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

### Community 42 - "floating-input.tsx"
Cohesion: 0.50
Nodes (3): FloatingInput, FloatingInputProps, PasswordInputProps

### Community 43 - "users.ts"
Cohesion: 0.11
Nodes (18): AcademicSelection, ProfileAcademicInfo, mockAcademic, analyses, anglais, CURRENT_USER, droitPrive, economie (+10 more)

### Community 44 - "use-new-document-flow.ts"
Cohesion: 0.05
Nodes (54): ClassificationStep(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), StepProgress(), STEPS, SuccessStep(), UploadStep() (+46 more)

### Community 48 - "register-screen.tsx"
Cohesion: 0.06
Nodes (36): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthLink(), AuthModal(), ForgotPasswordScreen(), LoginForm(), LoginScreen() (+28 more)

### Community 49 - "academic-navigation.test.ts"
Cohesion: 0.18
Nodes (8): FiliereDetailContent(), FiliereDetailSkeleton(), FilierePageProps, metadata, findFiliere(), listFiliereUes(), filieres, ues

### Community 50 - "categories-content.tsx"
Cohesion: 0.22
Nodes (7): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, SearchSelectOption, CATEGORIES_FACULTE

### Community 57 - "src/index.ts"
Cohesion: 0.19
Nodes (11): DetailsStep(), TypeFilterRow(), TypeChip(), UeTypeChips(), DocumentStatusBadge(), STATUS_STYLES, FormatBadge(), LABELS (+3 more)

### Community 60 - "academic-content.test.ts"
Cohesion: 0.33
Nodes (8): FACULTE_DESCRIPTIONS, FALLBACK_DESCRIPTION, FILIERE_DESCRIPTIONS, getFaculteDescription(), getFiliereDescription(), UE_DESCRIPTIONS, filieres, ues

### Community 61 - "search-pagination.tsx"
Cohesion: 0.50
Nodes (3): getPageItems(), PageItem, SearchPagination()

### Community 66 - "react"
Cohesion: 0.26
Nodes (6): AuthDialogProps, DocumentFavoriteRow(), DocumentOptionsSheet(), FilterSheet(), useBodyScrollLock(), react

### Community 67 - "ue-documents-content.tsx"
Cohesion: 0.22
Nodes (8): UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), UeFilters(), MatierePageProps, metadata, getUeDescription(), findUe()

### Community 68 - "OnboardingFlow"
Cohesion: 0.40
Nodes (3): OnboardingFlow(), handleContinue(), handleFinish()

## Knowledge Gaps
- **358 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+353 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 463 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `utils.ts`, `filiere-detail-content.tsx`, `api/documents.ts`, `academic-navigation.ts`, `document-download-button.tsx`, `document-detail-page.tsx`, `web/package.json`, `cn`, `pdf-viewer.tsx`, `use-documents-search.ts`, `onboarding-flow.tsx`, `routes.ts`, `lucide-react`, `documents-content.tsx`, `floating-input.tsx`, `use-new-document-flow.ts`, `register-screen.tsx`, `academic-navigation.test.ts`, `categories-content.tsx`, `src/index.ts`, `search-pagination.tsx`, `ue-documents-content.tsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `useNewDocumentFlow()` connect `use-new-document-flow.ts` to `routes.ts`, `documents-content.tsx`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `utils.ts`, `react`, `api/documents.ts`, `OnboardingFlow`, `document-download-button.tsx`, `document-detail-page.tsx`, `floating-input.tsx`, `use-new-document-flow.ts`, `pdf-viewer.tsx`, `register-screen.tsx`, `use-documents-search.ts`, `onboarding-flow.tsx`, `src/index.ts`, `routes.ts`, `lucide-react`, `search-pagination.tsx`, `documents-content.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _358 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `api/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06804214223002635 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10795454545454546 - nodes in this community are weakly interconnected._
- **Should `biome.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._