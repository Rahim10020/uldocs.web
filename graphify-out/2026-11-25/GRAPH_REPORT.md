# Graph Report - uldocs  (2026-11-05)

## Corpus Check
- 280 files · ~162,908 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1331 nodes · 3555 edges · 70 communities (58 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `81331b22`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- search-filters.tsx
- academic-navigation.ts
- document-section.tsx
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
- use-new-document-flow.ts
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
- next
- api.ts
- document-card.tsx
- react
- moderation.ts
- client.ts
- edit-profile-content.tsx
- PdfViewer
- lib/reports.ts
- mocks/reports.ts
- document-detail-page.tsx
- app/layout.tsx
- moderation/[id]/page.tsx
- AuthSelect
- DocumentReportDialog
- modifier/page.tsx
- pdf-viewer.tsx
- new-document-form.tsx
- DocumentDetail

## God Nodes (most connected - your core abstractions)
1. `cn()` - 99 edges
2. `react` - 66 edges
3. `lucide-react` - 60 edges
4. `routes` - 51 edges
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

## Communities (70 total, 3 thin omitted)

### Community 0 - "search-filters.tsx"
Cohesion: 0.07
Nodes (28): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, SearchFilters(), SearchFiltersProps, SheetOptions (+20 more)

### Community 1 - "academic-navigation.ts"
Cohesion: 0.07
Nodes (33): CategoryDetailContent(), CategoryDetailSkeleton(), CategoryPageProps, metadata, FiliereDetailContent(), FiliereDetailSkeleton(), FilierePageProps, metadata (+25 more)

### Community 2 - "document-section.tsx"
Cohesion: 0.27
Nodes (6): FAQ_ITEMS, DocumentCard(), DocumentSectionProps, Accordion(), AccordionItem, SectionHeading()

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
Cohesion: 0.10
Nodes (23): COMMITMENTS, SANCTIONS, SUGGESTIONS, FavoritesList(), SKELETON_KEYS, ModerationAccess(), ReportStatus(), STATUS_TONES (+15 more)

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

### Community 14 - "lib/profile.ts"
Cohesion: 0.06
Nodes (41): BADGE_ICONS, ProfileBadges(), ProfileContent(), ProfileDetails(), DocumentsQuery, PROFILE_GRID_SKELETON_KEYS, ProfileDocumentGrid(), ProfileEmptyState (+33 more)

### Community 15 - "cn"
Cohesion: 0.15
Nodes (18): DocumentActionBar(), DocumentDownloadButton(), DownloadVariant, DocumentShareButton(), ShareVariant, PdfToolbar(), Breadcrumb(), BreadcrumbItem (+10 more)

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
Cohesion: 0.12
Nodes (19): DesktopAccountMenu(), Footer(), Header(), HeaderSearch(), PRESERVED_KEYS, HeaderShell(), MobileMenu(), SearchBar() (+11 more)

### Community 24 - "mocks/academic.ts"
Cohesion: 0.08
Nodes (25): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), mockAcademic, MockFiliere, MockNiveau (+17 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "use-new-document-flow.ts"
Cohesion: 0.05
Nodes (45): UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated(), useNewDocumentFlow() (+37 more)

### Community 28 - "src/index.ts"
Cohesion: 0.05
Nodes (64): DocumentFavoriteRow(), ModerationContent(), ModerationDashboard(), ModerationFilters(), ModerationCardsSkeleton(), ModerationPageSkeleton(), ReportDetail(), metadata (+56 more)

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
Cohesion: 0.33
Nodes (8): SKELETON_KEYS, SKELETON_KEYS, AcademicNotFound(), ErrorPanel(), AcademicLinkCard(), AcademicLinkCardSkeleton(), AcademicPageHeader(), AcademicPageHeaderSkeleton()

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

### Community 42 - "next"
Cohesion: 0.13
Nodes (8): CharterContent(), metadata, NewDocumentFlow(), metadata, FavoritesContent(), metadata, nextConfig, next

### Community 43 - "api.ts"
Cohesion: 0.12
Nodes (25): DocumentCreatePayload, DocumentReactionPayload, LoginPayload, RegisterPayload, SignalementDocumentSummary, UpdateProfilePayload, Document, Enseignant (+17 more)

### Community 44 - "document-card.tsx"
Cohesion: 0.19
Nodes (9): CardVariant, DocumentCardProps, GridContent(), DocumentStatusBadge(), STATUS_STYLES, UploadedDocumentCard(), FormatBadge(), LABELS (+1 more)

### Community 48 - "react"
Cohesion: 0.05
Nodes (49): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthLink(), AuthMobileTopBar(), AuthModal(), ForgotPasswordScreen() (+41 more)

### Community 49 - "moderation.ts"
Cohesion: 0.23
Nodes (9): ModerationFiltersProps, ModerationReportCard(), FILTER_KEYS, useReportsSearch(), moderationReportHref(), ModerationSearchState, parseModerationSearchState(), readMotifSignalement() (+1 more)

### Community 50 - "client.ts"
Cohesion: 0.40
Nodes (3): ApiResponse, Paginated, PaginatedResponse

### Community 51 - "edit-profile-content.tsx"
Cohesion: 0.15
Nodes (8): SIMILAR_SKELETON_KEYS, NewDocumentForm(), metadata, ReportDetailSkeleton(), ProfileLocked(), DocumentCardSkeleton(), Container(), Skeleton()

### Community 57 - "PdfViewer"
Cohesion: 0.24
Nodes (6): PageStepper(), commit(), PagePicker(), commit(), PdfViewer(), clampPage()

### Community 58 - "lib/reports.ts"
Cohesion: 0.16
Nodes (18): ReportDecisionSummary(), MODERATION_DECISION_LABELS, MODERATION_DECISION_OPTIONS, MODERATION_REASON_MAX_LENGTH, MODERATION_REASON_MIN_LENGTH, ModerationDecisionFormOutput, ModerationDecisionFormValues, moderationDecisionSchema (+10 more)

### Community 60 - "mocks/reports.ts"
Cohesion: 0.14
Nodes (27): getMockDocument(), setMockDocumentStatus(), ACTIONS, applyMockModerationAction(), at(), buildSeed(), ensureActionable(), getMockReport() (+19 more)

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.16
Nodes (12): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), SimilarDocuments(), DocumentPageProps, useDocument(), copyWithTextarea() (+4 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 63 - "moderation/[id]/page.tsx"
Cohesion: 0.33
Nodes (3): ReportDetailContent(), metadata, ModerationReportPageProps

### Community 64 - "AuthSelect"
Cohesion: 0.39
Nodes (7): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), getShouldOpenUp()

### Community 65 - "DocumentReportDialog"
Cohesion: 1.00
Nodes (3): DocumentReportDialog(), getFocusableElements(), handleKeyDown()

### Community 67 - "pdf-viewer.tsx"
Cohesion: 0.13
Nodes (11): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PAGE_WIDTH_CLASS, pageElementId(), PdfPage(), PdfPageSkeleton() (+3 more)

### Community 68 - "new-document-form.tsx"
Cohesion: 0.19
Nodes (11): ClassificationStep(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), DetailsStep(), SuccessStep(), AuthSelectOption, AuthSelectProps (+3 more)

### Community 69 - "DocumentDetail"
Cohesion: 0.33
Nodes (4): DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentDetail

## Knowledge Gaps
- **386 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+381 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 502 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `search-filters.tsx`, `academic-navigation.ts`, `document-section.tsx`, `routes.ts`, `ue-documents-content.tsx`, `web/package.json`, `lib/profile.ts`, `cn`, `api/auth.ts`, `use-new-document-flow.ts`, `src/index.ts`, `moderation.ts`, `edit-profile-content.tsx`, `lib/reports.ts`, `document-detail-page.tsx`, `app/layout.tsx`, `moderation/[id]/page.tsx`, `pdf-viewer.tsx`, `new-document-form.tsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `search-filters.tsx`, `document-section.tsx`, `document-detail.ts`, `routes.ts`, `ue-documents-content.tsx`, `lib/profile.ts`, `api/auth.ts`, `use-new-document-flow.ts`, `src/index.ts`, `filiere-detail-content.tsx`, `document-card.tsx`, `react`, `edit-profile-content.tsx`, `PdfViewer`, `lib/reports.ts`, `AuthSelect`, `DocumentReportDialog`, `pdf-viewer.tsx`, `new-document-form.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `search-filters.tsx`, `academic-navigation.ts`, `modifier/page.tsx`, `filiere-detail-content.tsx`, `document-detail.ts`, `ue-documents-content.tsx`, `web/package.json`, `lib/profile.ts`, `cn`, `react`, `moderation.ts`, `edit-profile-content.tsx`, `src/index.ts`, `app/layout.tsx`, `moderation/[id]/page.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _386 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `search-filters.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0700354609929078 - nodes in this community are weakly interconnected._
- **Should `academic-navigation.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07053140096618357 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10984848484848485 - nodes in this community are weakly interconnected._