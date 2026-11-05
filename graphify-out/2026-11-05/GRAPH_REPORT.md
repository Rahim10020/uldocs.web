# Graph Report - uldocs  (2026-11-05)

## Corpus Check
- 280 files · ~162,878 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1331 nodes · 3553 edges · 71 communities (59 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `017562e9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- search-filters.tsx
- academic-navigation.ts
- category-section.tsx
- mocks/documents.ts
- document-detail.ts
- biome.json
- routes.ts
- compilerOptions
- Contrat d'API — UL Docs
- ue-documents-content.tsx
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- lib/profile.ts
- cn
- tasks
- handlers.ts
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- api/auth.ts
- mocks/academic.ts
- devDependencies
- routes/documents.ts
- useNewDocumentFlow
- src/index.ts
- uldocs
- mocks/users.ts
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
- use-new-document-flow.ts
- api.ts
- lib/document-upload.ts
- react
- dependencies
- client.ts
- report-detail-content.tsx
- PdfViewer
- moderation-content.tsx
- mocks/reports.ts
- document-detail-page.tsx
- document-upload-schema.ts
- devDependencies
- AuthSelect
- DocumentReportDialog
- scripts
- pdf-viewer.tsx
- new-document-flow.tsx
- DocumentDetail
- pdf-page-count.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 99 edges
2. `react` - 66 edges
3. `lucide-react` - 60 edges
4. `routes` - 50 edges
5. `mockRequest()` - 37 edges
6. `ApiError` - 34 edges
7. `next` - 32 edges
8. `Container()` - 31 edges
9. `useAcademicTree()` - 26 edges
10. `apiFetch()` - 26 edges

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

## Communities (71 total, 3 thin omitted)

### Community 0 - "search-filters.tsx"
Cohesion: 0.07
Nodes (28): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, SearchFilters(), SearchFiltersProps, SheetOptions (+20 more)

### Community 1 - "academic-navigation.ts"
Cohesion: 0.07
Nodes (33): CategoryDetailContent(), CategoryDetailSkeleton(), CategoryPageProps, metadata, FiliereDetailContent(), FiliereDetailSkeleton(), FilierePageProps, metadata (+25 more)

### Community 2 - "category-section.tsx"
Cohesion: 0.18
Nodes (10): FAQ_ITEMS, CategoryCard(), CategoryCardSkeleton(), ICONS, FEATURED_FACULTY_CODES, DocumentSectionProps, Accordion(), AccordionItem (+2 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.11
Nodes (29): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+21 more)

### Community 4 - "document-detail.ts"
Cohesion: 0.19
Nodes (15): DocumentReaction(), vote(), ReactionVariant, VOTES, useDocumentReaction(), applyReaction(), BreadcrumbItem, buildDocumentBreadcrumb() (+7 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "routes.ts"
Cohesion: 0.09
Nodes (24): COMMITMENTS, SANCTIONS, SUGGESTIONS, SIMILAR_SKELETON_KEYS, FavoritesList(), SKELETON_KEYS, ModerationDecisionForm(), ProfileHeader() (+16 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.10
Nodes (20): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4.5 Modération (+12 more)

### Community 9 - "ue-documents-content.tsx"
Cohesion: 0.07
Nodes (43): ContributeSection(), FaqSection(), Hero(), HomeContent(), DocumentsContent(), EmptyResults(), UeDocumentsContent(), UeDocumentsSkeleton() (+35 more)

### Community 10 - "web/package.json"
Cohesion: 0.12
Nodes (16): shared, @types/node, typescript, vitest, name, packageManager, private, version (+8 more)

### Community 11 - "package.json"
Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"
Cohesion: 0.11
Nodes (18): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 🖱️ Curseur des éléments interactifs, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants (+10 more)

### Community 13 - "shared/package.json"
Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "lib/profile.ts"
Cohesion: 0.06
Nodes (41): BADGE_ICONS, ProfileBadges(), ProfileContent(), ProfileDetails(), DocumentsQuery, PROFILE_GRID_SKELETON_KEYS, ProfileDocumentGrid(), ProfileEmptyState (+33 more)

### Community 15 - "cn"
Cohesion: 0.13
Nodes (21): DocumentActionBar(), DocumentDownloadButton(), DownloadVariant, DocumentShareButton(), ShareVariant, PdfToolbar(), SuccessStep(), CardVariant (+13 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "handlers.ts"
Cohesion: 0.19
Nodes (26): request(), ApiError, getDocumentFormat(), getUeContext(), createMockDocument(), listMockFavoriteDocuments(), recordMockDownload(), setMockFavorite() (+18 more)

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

### Community 23 - "api/auth.ts"
Cohesion: 0.08
Nodes (25): NewDocumentFlow(), metadata, FavoritesContent(), metadata, EditProfileContent(), metadata, DesktopAccountMenu(), Footer() (+17 more)

### Community 24 - "mocks/academic.ts"
Cohesion: 0.08
Nodes (25): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), mockAcademic, MockFiliere, MockNiveau (+17 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "useNewDocumentFlow"
Cohesion: 0.12
Nodes (11): createDefaultValues(), mergeCreated(), useNewDocumentFlow(), applyProfileSelection(), handleClassificationContinue(), handleDetailsContinue(), handleRetryFailed(), handleStartOver() (+3 more)

### Community 28 - "src/index.ts"
Cohesion: 0.06
Nodes (58): DocumentFavoriteRow(), ModerationDashboard(), ReportDetail(), PublicProfileContent(), PublicProfileView(), PublicProfileRoute(), EditProfileForm(), ReactionVariables (+50 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "mocks/users.ts"
Cohesion: 0.14
Nodes (12): analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel, getMockSessionUser(), informatique (+4 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "filiere-detail-content.tsx"
Cohesion: 0.26
Nodes (10): SKELETON_KEYS, SKELETON_KEYS, AcademicNotFound(), ErrorPanel(), AcademicLinkCard(), AcademicLinkCardSkeleton(), AcademicPageHeader(), AcademicPageHeaderSkeleton() (+2 more)

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "format.ts"
Cohesion: 0.19
Nodes (14): DocumentTop(), SimilarDocumentCard(), ReportDetailView(), ProfileStats(), ProfileStatsProps, DownloadsMeta(), RatingMeta(), SearchListContent() (+6 more)

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

### Community 42 - "use-new-document-flow.ts"
Cohesion: 0.29
Nodes (10): getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDocument(), buildDocumentFormData(), NewDocumentStep, UploadDocumentsResult (+2 more)

### Community 43 - "api.ts"
Cohesion: 0.12
Nodes (25): DocumentCreatePayload, DocumentReactionPayload, LoginPayload, RegisterPayload, SignalementDocumentSummary, UpdateProfilePayload, Document, Enseignant (+17 more)

### Community 44 - "lib/document-upload.ts"
Cohesion: 0.18
Nodes (17): UploadStep(), handleFilesAdd(), addFilesToSelection(), DocumentFormDataInput, EXTENSION_FORMATS, FileSelectionResult, fileSizeInKiloOctets(), getFileExtension() (+9 more)

### Community 48 - "react"
Cohesion: 0.05
Nodes (49): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthLink(), AuthMobileTopBar(), AuthModal(), ForgotPasswordScreen() (+41 more)

### Community 49 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, clsx, @hookform/resolvers, lucide-react, next, react, react-dom, react-hook-form (+5 more)

### Community 50 - "client.ts"
Cohesion: 0.40
Nodes (3): ApiResponse, Paginated, PaginatedResponse

### Community 51 - "report-detail-content.tsx"
Cohesion: 0.17
Nodes (8): ModerationAccess(), ReportStatus(), STATUS_TONES, ReportDetailContent(), ReportDetailSkeleton(), metadata, ModerationReportPageProps, Container()

### Community 57 - "PdfViewer"
Cohesion: 0.24
Nodes (6): PageStepper(), commit(), PagePicker(), commit(), PdfViewer(), clampPage()

### Community 58 - "moderation-content.tsx"
Cohesion: 0.06
Nodes (40): metadata, satoshi, CharterContent(), metadata, ModerationContent(), ModerationFilters(), ModerationFiltersProps, ModerationReportCard() (+32 more)

### Community 60 - "mocks/reports.ts"
Cohesion: 0.14
Nodes (27): getMockDocument(), setMockDocumentStatus(), ACTIONS, applyMockModerationAction(), at(), buildSeed(), ensureActionable(), getMockReport() (+19 more)

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.16
Nodes (12): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), SimilarDocuments(), DocumentPageProps, useDocument(), copyWithTextarea() (+4 more)

### Community 62 - "document-upload-schema.ts"
Cohesion: 0.29
Nodes (5): documentMetadataSchema, DocumentMetadataValues, validValues, TYPES_DOCUMENT, zod

### Community 63 - "devDependencies"
Cohesion: 0.25
Nodes (8): devDependencies, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom, typescript, vitest

### Community 64 - "AuthSelect"
Cohesion: 0.39
Nodes (7): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), getShouldOpenUp()

### Community 65 - "DocumentReportDialog"
Cohesion: 1.00
Nodes (3): DocumentReportDialog(), getFocusableElements(), handleKeyDown()

### Community 66 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, prebuild, predev, start, test, test:watch

### Community 67 - "pdf-viewer.tsx"
Cohesion: 0.11
Nodes (13): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PAGE_WIDTH_CLASS, pageElementId(), PdfPage(), PdfPageSkeleton() (+5 more)

### Community 68 - "new-document-flow.tsx"
Cohesion: 0.17
Nodes (11): ClassificationStep(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), DetailsStep(), NewDocumentForm(), AuthSelectOption, AuthSelectProps (+3 more)

### Community 69 - "DocumentDetail"
Cohesion: 0.33
Nodes (4): DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentDetail

## Knowledge Gaps
- **386 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+381 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 502 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `search-filters.tsx`, `academic-navigation.ts`, `filiere-detail-content.tsx`, `pdf-viewer.tsx`, `new-document-flow.tsx`, `category-section.tsx`, `routes.ts`, `ue-documents-content.tsx`, `use-new-document-flow.ts`, `web/package.json`, `lib/document-upload.ts`, `lib/profile.ts`, `cn`, `report-detail-content.tsx`, `api/auth.ts`, `moderation-content.tsx`, `src/index.ts`, `document-detail-page.tsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `search-filters.tsx`, `DocumentReportDialog`, `filiere-detail-content.tsx`, `pdf-viewer.tsx`, `document-detail.ts`, `new-document-flow.tsx`, `category-section.tsx`, `AuthSelect`, `routes.ts`, `ue-documents-content.tsx`, `lib/document-upload.ts`, `lib/profile.ts`, `react`, `report-detail-content.tsx`, `api/auth.ts`, `PdfViewer`, `moderation-content.tsx`, `src/index.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `next` connect `moderation-content.tsx` to `search-filters.tsx`, `academic-navigation.ts`, `filiere-detail-content.tsx`, `pdf-viewer.tsx`, `document-detail.ts`, `ue-documents-content.tsx`, `web/package.json`, `lib/profile.ts`, `react`, `report-detail-content.tsx`, `api/auth.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _386 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `search-filters.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0700354609929078 - nodes in this community are weakly interconnected._
- **Should `academic-navigation.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07053140096618357 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10984848484848485 - nodes in this community are weakly interconnected._