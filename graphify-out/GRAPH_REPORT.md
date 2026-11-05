# Graph Report - uldocs  (2026-11-05)

## Corpus Check
- 279 files · ~182,406 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1326 nodes · 3541 edges · 70 communities (59 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `85267ed0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- search-filters.tsx
- academic-navigation.ts
- container.tsx
- handlers.ts
- document-detail.ts
- biome.json
- document-card.tsx
- compilerOptions
- Contrat d'API — UL Docs
- documents-content.tsx
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- edit-profile-content.tsx
- cn
- tasks
- useAcademicTree
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- routes.ts
- api.ts
- devDependencies
- routes/documents.ts
- lib/reports.ts
- @tanstack/react-query
- uldocs
- public-profile-content.tsx
- Product Brief : UL Docs
- filiere-detail-content.tsx
- scripts
- format.ts
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- api/reports.ts
- src/index.ts
- use-new-document-flow.ts
- register-screen.tsx
- ue-documents-content.tsx
- api/documents.ts
- report-detail-content.tsx
- category-detail-content.tsx
- moderation-content.tsx
- moderation-report-card.tsx
- document-detail-page.tsx
- academic-content.test.ts
- use-download-document.ts
- AuthSelect
- react
- OnboardingFlow
- pdf-viewer.tsx
- utils.ts
- search-pagination.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 99 edges
2. `react` - 66 edges
3. `lucide-react` - 59 edges
4. `routes` - 49 edges
5. `mockRequest()` - 37 edges
6. `ApiError` - 34 edges
7. `Container()` - 31 edges
8. `next` - 31 edges
9. `useAcademicTree()` - 26 edges
10. `apiFetch()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `PageThumbnail()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/page-thumbnail-rail.tsx → apps/web/lib/utils.ts
- `PreviewFallback()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `PdfPageSkeleton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `SimilarDocumentCard()` --calls--> `formatRating()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/similar-documents.tsx → apps/web/lib/format.ts
- `NewDocumentAuthGate()` --calls--> `withNextPath()`  [EXTRACTED]
  apps/web/app/(main)/documents/nouveau/components/new-document-flow.tsx → apps/web/lib/next-path.ts

## Import Cycles
- None detected.

## Communities (70 total, 2 thin omitted)

### Community 0 - "search-filters.tsx"
Cohesion: 0.12
Nodes (16): SearchFilters(), SearchFiltersProps, SheetOptions, FiliereFilters(), TypeFilterRow(), TypeChip(), UeTypeChips(), SearchSelect() (+8 more)

### Community 1 - "academic-navigation.ts"
Cohesion: 0.20
Nodes (13): useFiliereFilters(), AcademicFiliere, AcademicNiveau, AcademicSemestre, FiliereContext, listFiliereSemestres(), UeContext, FiliereFiltersState (+5 more)

### Community 2 - "container.tsx"
Cohesion: 0.15
Nodes (10): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), CategorySection(), HeaderShell(), AccordionItem (+2 more)

### Community 3 - "handlers.ts"
Cohesion: 0.05
Nodes (91): ApiError, getUeContext(), getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), createMockDocument(), CreateMockDocumentInput (+83 more)

### Community 4 - "document-detail.ts"
Cohesion: 0.11
Nodes (23): DocumentReaction(), vote(), ReactionVariant, VOTES, PageStepper(), commit(), PagePicker(), commit() (+15 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "document-card.tsx"
Cohesion: 0.14
Nodes (16): SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), SimilarDocuments(), CardVariant, DocumentCardProps, GridContent(), RatingMeta(), DocumentStatusBadge() (+8 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.10
Nodes (20): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4.5 Modération (+12 more)

### Community 9 - "documents-content.tsx"
Cohesion: 0.16
Nodes (24): DocumentsContent(), DocumentSection(), DocumentSectionProps, DocumentsSearchState, FILTER_KEYS, niveauxOf(), parseDocumentsSearchState(), sortNiveaux() (+16 more)

### Community 10 - "web/package.json"
Cohesion: 0.04
Nodes (45): dependencies, clsx, @hookform/resolvers, lucide-react, next, react, react-dom, react-hook-form (+37 more)

### Community 11 - "package.json"
Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"
Cohesion: 0.11
Nodes (18): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 🖱️ Curseur des éléments interactifs, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants (+10 more)

### Community 13 - "shared/package.json"
Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "edit-profile-content.tsx"
Cohesion: 0.05
Nodes (47): BADGE_ICONS, ProfileBadges(), ProfileContent(), ProfileDetails(), DocumentsQuery, PROFILE_GRID_SKELETON_KEYS, ProfileDocumentGrid(), ProfileEmptyState (+39 more)

### Community 15 - "cn"
Cohesion: 0.17
Nodes (15): DocumentActionBar(), DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentMobileBar(), DocumentShareButton(), ShareVariant, Breadcrumb() (+7 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "useAcademicTree"
Cohesion: 0.16
Nodes (13): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, CategoryCard(), CategoryCardSkeleton(), ICONS (+5 more)

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

### Community 23 - "routes.ts"
Cohesion: 0.06
Nodes (38): AuthMobileTopBar(), RegisterSuccess(), NewDocumentAuthGate(), NewDocumentFlow(), metadata, FavoritesContent(), FavoritesList(), SKELETON_KEYS (+30 more)

### Community 24 - "api.ts"
Cohesion: 0.07
Nodes (43): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+35 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "lib/reports.ts"
Cohesion: 0.16
Nodes (19): ModerationDecisionForm(), useModerationForm(), MODERATION_DECISION_LABELS, MODERATION_DECISION_OPTIONS, MODERATION_REASON_MAX_LENGTH, MODERATION_REASON_MIN_LENGTH, ModerationDecisionFormOutput, ModerationDecisionFormValues (+11 more)

### Community 28 - "@tanstack/react-query"
Cohesion: 0.23
Nodes (11): ModerationDashboard(), ReportDetail(), useOpenReportsCount(), useReport(), useReports(), getReport(), listReports(), queryKeys (+3 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "public-profile-content.tsx"
Cohesion: 0.27
Nodes (10): PublicProfileContent(), PublicProfileView(), usePublicProfileSummary(), usePublicUserProfile(), usePublicUserDocuments(), getPublicUserProfile(), listPublicUserDocuments(), buildPublicProfileBadges() (+2 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "filiere-detail-content.tsx"
Cohesion: 0.21
Nodes (9): FiliereDetailContent(), FiliereDetailSkeleton(), SKELETON_KEYS, FilierePageProps, metadata, AcademicNotFound(), ErrorPanel(), findFiliere() (+1 more)

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "format.ts"
Cohesion: 0.22
Nodes (12): DocumentTop(), ReportDetailView(), ProfileStats(), ProfileStatsProps, DownloadsMeta(), SearchListContent(), formatCount(), formatDate() (+4 more)

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

### Community 42 - "api/reports.ts"
Cohesion: 0.31
Nodes (7): ModerationDecisionInput, useModerationDecision(), endpoints, applyModerationAction(), rejectReport(), ModerationActionPayload, RejectReportPayload

### Community 43 - "src/index.ts"
Cohesion: 0.24
Nodes (10): EditProfileForm(), useRegister(), useUpdateProfile(), getMe(), getSession(), login(), register(), updateProfile() (+2 more)

### Community 44 - "use-new-document-flow.ts"
Cohesion: 0.06
Nodes (47): NewDocumentForm(), UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated() (+39 more)

### Community 48 - "register-screen.tsx"
Cohesion: 0.06
Nodes (37): AuthLink(), AuthModal(), ForgotPasswordScreen(), LoginForm(), LoginScreen(), RegisterForm(), EMPTY_DRAFT, RegisterScreen() (+29 more)

### Community 49 - "ue-documents-content.tsx"
Cohesion: 0.12
Nodes (16): metadata, UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), UeFilters(), MatierePageProps, metadata, AcademicPageHeader() (+8 more)

### Community 50 - "api/documents.ts"
Cohesion: 0.15
Nodes (21): DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites(), useFavoriteDocument(), useReportDocument(), apiFetch(), apiFetchPaginated() (+13 more)

### Community 51 - "report-detail-content.tsx"
Cohesion: 0.23
Nodes (6): ReportDecisionSummary(), ReportDetailContent(), ReportDetailSkeleton(), metadata, ModerationReportPageProps, SignalementDetail

### Community 57 - "category-detail-content.tsx"
Cohesion: 0.22
Nodes (8): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, AcademicLinkCard(), AcademicLinkCardSkeleton(), findFaculte()

### Community 58 - "moderation-content.tsx"
Cohesion: 0.13
Nodes (14): ModerationAccess(), ModerationContent(), ModerationFilters(), ModerationFiltersProps, ModerationCardsSkeleton(), ModerationPageSkeleton(), metadata, FILTER_KEYS (+6 more)

### Community 60 - "moderation-report-card.tsx"
Cohesion: 0.38
Nodes (5): ModerationReportCard(), ReportStatus(), STATUS_TONES, moderationReportHref(), SignalementListItem

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.14
Nodes (13): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentPageProps, useDocument() (+5 more)

### Community 62 - "academic-content.test.ts"
Cohesion: 0.31
Nodes (9): FACULTE_DESCRIPTIONS, FALLBACK_DESCRIPTION, FILIERE_DESCRIPTIONS, getFaculteDescription(), getFiliereDescription(), getUeDescription(), UE_DESCRIPTIONS, filieres (+1 more)

### Community 63 - "use-download-document.ts"
Cohesion: 0.48
Nodes (5): DownloadButton(), DownloadVariables, saveFile(), useDownloadDocument(), downloadDocument()

### Community 64 - "AuthSelect"
Cohesion: 0.39
Nodes (7): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), getShouldOpenUp()

### Community 65 - "react"
Cohesion: 0.16
Nodes (15): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, DocumentOptionsSheet(), DocumentReportDialog(), getFocusableElements(), handleKeyDown() (+7 more)

### Community 66 - "OnboardingFlow"
Cohesion: 0.40
Nodes (3): OnboardingFlow(), handleContinue(), handleFinish()

### Community 67 - "pdf-viewer.tsx"
Cohesion: 0.11
Nodes (13): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PdfPage() (+5 more)

### Community 68 - "utils.ts"
Cohesion: 0.15
Nodes (14): Step, STEP_CONTENT, STEPS, EmptyResults(), SUGGESTIONS, ClassificationStep(), DetailsStep(), SuccessStep() (+6 more)

### Community 69 - "search-pagination.tsx"
Cohesion: 0.50
Nodes (3): getPageItems(), PageItem, SearchPagination()

## Knowledge Gaps
- **383 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+378 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 499 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `search-filters.tsx`, `academic-navigation.ts`, `container.tsx`, `documents-content.tsx`, `web/package.json`, `edit-profile-content.tsx`, `cn`, `useAcademicTree`, `routes.ts`, `@tanstack/react-query`, `public-profile-content.tsx`, `filiere-detail-content.tsx`, `use-new-document-flow.ts`, `register-screen.tsx`, `ue-documents-content.tsx`, `report-detail-content.tsx`, `category-detail-content.tsx`, `moderation-content.tsx`, `document-detail-page.tsx`, `pdf-viewer.tsx`, `utils.ts`, `search-pagination.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `next` connect `register-screen.tsx` to `filiere-detail-content.tsx`, `academic-navigation.ts`, `document-detail.ts`, `documents-content.tsx`, `web/package.json`, `edit-profile-content.tsx`, `cn`, `ue-documents-content.tsx`, `useAcademicTree`, `report-detail-content.tsx`, `routes.ts`, `category-detail-content.tsx`, `moderation-content.tsx`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `search-filters.tsx`, `container.tsx`, `document-detail.ts`, `document-card.tsx`, `edit-profile-content.tsx`, `useAcademicTree`, `routes.ts`, `use-new-document-flow.ts`, `register-screen.tsx`, `ue-documents-content.tsx`, `category-detail-content.tsx`, `moderation-report-card.tsx`, `use-download-document.ts`, `AuthSelect`, `react`, `OnboardingFlow`, `pdf-viewer.tsx`, `utils.ts`, `search-pagination.tsx`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _383 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `search-filters.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1225071225071225 - nodes in this community are weakly interconnected._
- **Should `handlers.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05227781926811053 - nodes in this community are weakly interconnected._
- **Should `document-detail.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11088709677419355 - nodes in this community are weakly interconnected._