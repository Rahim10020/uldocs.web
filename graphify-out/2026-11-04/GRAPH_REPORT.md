# Graph Report - uldocs  (2026-11-04)

## Corpus Check
- 269 files · ~180,496 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1297 nodes · 3408 edges · 69 communities (58 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4da0833e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- filiere-detail-content.tsx
- container.tsx
- handlers.ts
- document-detail.ts
- biome.json
- document-card.tsx
- compilerOptions
- Contrat d'API — UL Docs
- use-documents-search.ts
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- profile-content.tsx
- lucide-react
- tasks
- categories-content.tsx
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- useSession
- mocks/academic.ts
- devDependencies
- routes/documents.ts
- lib/reports.ts
- routes.ts
- uldocs
- button.tsx
- Product Brief : UL Docs
- profile-tabs.tsx
- scripts
- format.ts
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- api.ts
- edit-profile-content.tsx
- use-new-document-flow.ts
- register-screen.tsx
- ue-documents-content.tsx
- src/index.ts
- report-detail-content.tsx
- PdfViewer
- moderation-content.tsx
- moderation-report-card.tsx
- document-detail-page.tsx
- new-document-flow.tsx
- moderation.ts
- AuthSelect
- DocumentReportDialog
- cn
- Button
- app/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 99 edges
2. `react` - 64 edges
3. `lucide-react` - 57 edges
4. `routes` - 46 edges
5. `mockRequest()` - 34 edges
6. `ApiError` - 33 edges
7. `Container()` - 30 edges
8. `next` - 29 edges
9. `useNewDocumentFlow()` - 25 edges
10. `Button()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `NewDocumentAuthGate()` --calls--> `withNextPath()`  [EXTRACTED]
  apps/web/app/(main)/documents/nouveau/components/new-document-flow.tsx → apps/web/lib/next-path.ts
- `TypeFilterRow()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-filters.tsx → apps/web/lib/utils.ts
- `TypeChip()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-type-chips.tsx → apps/web/lib/utils.ts
- `TabLink()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/profil/components/profile-tabs.tsx → apps/web/lib/utils.ts
- `GridContent()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/shared/document-card.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (69 total, 2 thin omitted)

### Community 0 - "react"
Cohesion: 0.12
Nodes (17): SearchFiltersProps, SheetOptions, ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), TypeFilterRow(), UeFilters(), TypeChip() (+9 more)

### Community 1 - "filiere-detail-content.tsx"
Cohesion: 0.06
Nodes (43): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, SearchFilters(), FiliereDetailContent(), FiliereDetailSkeleton() (+35 more)

### Community 2 - "container.tsx"
Cohesion: 0.11
Nodes (19): ContributeSection(), FAQ_ITEMS, FaqSection(), HomeContent(), EmptyResults(), SUGGESTIONS, metadata, CategorySection() (+11 more)

### Community 3 - "handlers.ts"
Cohesion: 0.05
Nodes (92): request(), ApiError, getDocumentFormat(), getUeContext(), getUeContextByName(), mockAcademic, BASE_UPLOAD, buildDocuments() (+84 more)

### Community 4 - "document-detail.ts"
Cohesion: 0.17
Nodes (18): DocumentReaction(), vote(), ReactionVariant, VOTES, ReactionVariables, useDocumentReaction(), setDocumentReaction(), applyReaction() (+10 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "document-card.tsx"
Cohesion: 0.16
Nodes (11): SIMILAR_SKELETON_KEYS, CardVariant, DocumentCard(), DocumentCardProps, GridContent(), DocumentStatusBadge(), STATUS_STYLES, UploadedDocumentCard() (+3 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.10
Nodes (19): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4.5 Modération (+11 more)

### Community 9 - "use-documents-search.ts"
Cohesion: 0.20
Nodes (21): DocumentsContent(), DocumentsSearchState, FILTER_KEYS, niveauxOf(), parseDocumentsSearchState(), sortNiveaux(), sortSemestres(), useDocumentsSearch() (+13 more)

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

### Community 14 - "profile-content.tsx"
Cohesion: 0.12
Nodes (16): BADGE_ICONS, ProfileBadges(), ProfileContent(), ProfileDetails(), ProfileHeader(), ProfileHeaderProps, ProfileLocked(), PROFILE_STAT_SKELETON_KEYS (+8 more)

### Community 15 - "lucide-react"
Cohesion: 0.20
Nodes (11): DocumentActionBar(), DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentOptionsSheet(), DocumentShareButton(), ShareVariant, DownloadButton() (+3 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "categories-content.tsx"
Cohesion: 0.17
Nodes (10): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, SearchSelect(), handleKeyDown(), selectOption() (+2 more)

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

### Community 23 - "useSession"
Cohesion: 0.21
Nodes (10): DesktopAccountMenu(), Footer(), Header(), HeaderShell(), MobileMenu(), UserAvatar(), useLogout(), useSession() (+2 more)

### Community 24 - "mocks/academic.ts"
Cohesion: 0.09
Nodes (23): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+15 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "lib/reports.ts"
Cohesion: 0.15
Nodes (20): ModerationFilters(), ModerationFiltersProps, ModerationDecisionForm(), useModerationForm(), MODERATION_DECISION_LABELS, MODERATION_DECISION_OPTIONS, MODERATION_REASON_MAX_LENGTH, MODERATION_REASON_MIN_LENGTH (+12 more)

### Community 28 - "routes.ts"
Cohesion: 0.19
Nodes (8): Hero(), HeaderSearch(), PRESERVED_KEYS, SearchBar(), SearchBarProps, FOOTER_LINKS, MOBILE_NAV_LINKS, routes

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "button.tsx"
Cohesion: 0.13
Nodes (12): FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize (+4 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "profile-tabs.tsx"
Cohesion: 0.15
Nodes (13): ProfileTabContent(), DocumentsQuery, EmptyState, PROFILE_GRID_SKELETON_KEYS, ProfileTabs(), TabLink(), MyDocumentsPage(), formatProfileAcademic() (+5 more)

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

### Community 42 - "api.ts"
Cohesion: 0.12
Nodes (24): ApiResponse, DocumentCreatePayload, DocumentReactionPayload, PaginatedResponse, RejectReportPayload, SignalementDocumentSummary, Document, Enseignant (+16 more)

### Community 43 - "edit-profile-content.tsx"
Cohesion: 0.16
Nodes (11): EditProfileContent(), EditProfileForm(), EditProfilePanel(), metadata, useUpdateProfile(), AcademicSelection, ProfileAcademicInfo, resolveAcademicSelection() (+3 more)

### Community 44 - "use-new-document-flow.ts"
Cohesion: 0.05
Nodes (46): UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated(), useNewDocumentFlow() (+38 more)

### Community 48 - "register-screen.tsx"
Cohesion: 0.05
Nodes (45): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthLink(), AuthMobileTopBar(), AuthModal(), ForgotPasswordScreen() (+37 more)

### Community 49 - "ue-documents-content.tsx"
Cohesion: 0.13
Nodes (14): UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), MatierePageProps, metadata, AcademicPageHeaderSkeleton(), DocumentResults(), DocumentResultsSkeleton() (+6 more)

### Community 50 - "src/index.ts"
Cohesion: 0.08
Nodes (47): DownloadVariables, saveFile(), DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites(), useFavoriteDocument(), useFavoriteDocuments() (+39 more)

### Community 51 - "report-detail-content.tsx"
Cohesion: 0.18
Nodes (9): ModerationAccess(), ReportDecisionSummary(), ReportDetail(), ReportDetailContent(), ReportDetailSkeleton(), metadata, ModerationReportPageProps, useReport() (+1 more)

### Community 57 - "PdfViewer"
Cohesion: 0.24
Nodes (6): PageStepper(), commit(), PagePicker(), commit(), PdfViewer(), clampPage()

### Community 58 - "moderation-content.tsx"
Cohesion: 0.21
Nodes (8): ModerationContent(), ModerationDashboard(), ModerationCardsSkeleton(), ModerationPageSkeleton(), metadata, useOpenReportsCount(), useReportsSearch(), useReports()

### Community 60 - "moderation-report-card.tsx"
Cohesion: 0.28
Nodes (7): ModerationReportCard(), ReportStatus(), STATUS_TONES, moderationReportHref(), MOTIF_SIGNALEMENT_LABELS, STATUT_SIGNALEMENT_LABELS, StatutSignalement

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.12
Nodes (15): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, SimilarDocuments() (+7 more)

### Community 62 - "new-document-flow.tsx"
Cohesion: 0.29
Nodes (4): NewDocumentAuthGate(), NewDocumentFlow(), NewDocumentForm(), metadata

### Community 63 - "moderation.ts"
Cohesion: 0.33
Nodes (6): FILTER_KEYS, MODERATION_PAGE_SIZE, ModerationSearchState, parseModerationSearchState(), readMotifSignalement(), readStatutSignalement()

### Community 64 - "AuthSelect"
Cohesion: 0.39
Nodes (7): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), getShouldOpenUp()

### Community 65 - "DocumentReportDialog"
Cohesion: 0.47
Nodes (5): DocumentReportDialog(), getFocusableElements(), handleKeyDown(), useReportDocument(), reportDocument()

### Community 67 - "cn"
Cohesion: 0.12
Nodes (22): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PdfPage() (+14 more)

### Community 68 - "Button"
Cohesion: 0.25
Nodes (9): ClassificationStep(), DetailsStep(), SuccessStep(), AuthSelectOption, AuthSelectProps, Button(), LoadingDots(), NewDocumentFlowController (+1 more)

### Community 76 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

## Knowledge Gaps
- **380 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+375 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 495 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filiere-detail-content.tsx`, `container.tsx`, `use-documents-search.ts`, `web/package.json`, `profile-content.tsx`, `lucide-react`, `categories-content.tsx`, `useSession`, `lib/reports.ts`, `routes.ts`, `button.tsx`, `use-new-document-flow.ts`, `register-screen.tsx`, `ue-documents-content.tsx`, `src/index.ts`, `report-detail-content.tsx`, `moderation-content.tsx`, `document-detail-page.tsx`, `moderation.ts`, `cn`, `Button`, `app/layout.tsx`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `react`, `container.tsx`, `document-detail.ts`, `document-card.tsx`, `lucide-react`, `categories-content.tsx`, `useSession`, `lib/reports.ts`, `routes.ts`, `button.tsx`, `profile-tabs.tsx`, `use-new-document-flow.ts`, `register-screen.tsx`, `ue-documents-content.tsx`, `PdfViewer`, `moderation-report-card.tsx`, `AuthSelect`, `DocumentReportDialog`, `Button`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `react`, `filiere-detail-content.tsx`, `container.tsx`, `document-detail.ts`, `document-card.tsx`, `web/package.json`, `profile-content.tsx`, `categories-content.tsx`, `useSession`, `lib/reports.ts`, `routes.ts`, `button.tsx`, `profile-tabs.tsx`, `format.ts`, `edit-profile-content.tsx`, `use-new-document-flow.ts`, `register-screen.tsx`, `ue-documents-content.tsx`, `moderation-content.tsx`, `document-detail-page.tsx`, `new-document-flow.tsx`, `cn`, `Button`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _380 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.1206896551724138 - nodes in this community are weakly interconnected._
- **Should `filiere-detail-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06393442622950819 - nodes in this community are weakly interconnected._
- **Should `container.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1064102564102564 - nodes in this community are weakly interconnected._