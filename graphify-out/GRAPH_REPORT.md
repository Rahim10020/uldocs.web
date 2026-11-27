# Graph Report - uldocs  (2026-11-27)

## Corpus Check
- 333 files · ~185,292 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1583 nodes · 4364 edges · 82 communities (70 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cded18fa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- search-filters.tsx
- academic-navigation.ts
- container.tsx
- mocks/documents.ts
- admin-users-content.tsx
- biome.json
- routes.ts
- compilerOptions
- 4. DTO publiques
- use-documents-search.ts
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- profile-content.tsx
- cn
- tasks
- handlers.ts
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- useSession
- useAcademicTree
- devDependencies
- routes/documents.ts
- use-new-document-flow.ts
- src/index.ts
- uldocs
- mocks/users.ts
- Product Brief : UL Docs
- format.ts
- scripts
- document-card.tsx
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- new-document-form.tsx
- mocks/academic.ts
- Backlog MVP — ce qu'il reste à faire
- register-screen.tsx
- moderation.ts
- filiere-detail-content.tsx
- ue-documents-content.tsx
- mocks/admin.ts
- lib/reports.ts
- mocks/reports.ts
- document-detail-page.tsx
- useNewDocumentFlow
- report-detail-content.tsx
- details-step.tsx
- react
- edit-profile-content.tsx
- pdf-viewer.tsx
- lib/document-upload.ts
- academic-content.test.ts
- next
- filiere-filters.tsx
- moderation-content.tsx
- moderation-report-card.tsx
- public-profile-content.tsx
- client.ts
- search-pagination.tsx
- nouveau/page.tsx
- ConfirmCancelDialog
- favorites-content.tsx
- profile-document-grid.tsx
- api.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 113 edges
2. `react` - 84 edges
3. `lucide-react` - 80 edges
4. `routes` - 61 edges
5. `mockRequest()` - 48 edges
6. `next` - 44 edges
7. `ApiError` - 38 edges
8. `Container()` - 32 edges
9. `Button()` - 30 edges
10. `useSession()` - 30 edges

## Surprising Connections (you probably didn't know these)
- `PreviewFallback()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `PdfPageSkeleton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `TypeChip()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-type-chips.tsx → apps/web/lib/utils.ts
- `TabLink()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/profil/components/profile-tabs.tsx → apps/web/lib/utils.ts
- `GridContent()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/shared/document-card.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (82 total, 3 thin omitted)

### Community 0 - "search-filters.tsx"
Cohesion: 0.15
Nodes (14): SearchFiltersProps, SheetOptions, TypeChip(), UeTypeChips(), FilterButton(), FilterField(), FilterSheet(), ResetFiltersButton() (+6 more)

### Community 1 - "academic-navigation.ts"
Cohesion: 0.19
Nodes (16): FiliereDetailContent(), useFiliereFilters(), AcademicFiliere, AcademicNiveau, AcademicSemestre, FiliereContext, findFiliere(), listFiliereSemestres() (+8 more)

### Community 2 - "container.tsx"
Cohesion: 0.09
Nodes (21): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), DocumentsContent(), EmptyResults(), SUGGESTIONS (+13 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.11
Nodes (27): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+19 more)

### Community 4 - "admin-users-content.tsx"
Cohesion: 0.08
Nodes (37): AdminSearchContent(), AdminSearchResults(), AdminSearchSkeleton(), metadata, ACTION_CONFIRM_LABELS, AdminUserActionDialog(), AdminUserActions(), AdminUsersContent() (+29 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "routes.ts"
Cohesion: 0.12
Nodes (21): AdminAccess(), AuthMobileTopBar(), RegisterSuccess(), COMMITMENTS, SANCTIONS, NewDocumentAuthGate(), ModerationAccess(), ProfileLocked() (+13 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "4. DTO publiques"
Cohesion: 0.09
Nodes (21): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4.5 Modération (+13 more)

### Community 9 - "use-documents-search.ts"
Cohesion: 0.21
Nodes (20): DocumentsSearchState, FILTER_KEYS, niveauxOf(), parseDocumentsSearchState(), sortNiveaux(), sortSemestres(), useDocumentsSearch(), useUeDocuments() (+12 more)

### Community 10 - "web/package.json"
Cohesion: 0.04
Nodes (45): dependencies, clsx, @hookform/resolvers, lucide-react, next, react, react-dom, react-hook-form (+37 more)

### Community 11 - "package.json"
Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"
Cohesion: 0.10
Nodes (19): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 🖱️ Curseur des éléments interactifs, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants (+11 more)

### Community 13 - "shared/package.json"
Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "profile-content.tsx"
Cohesion: 0.15
Nodes (14): BADGE_ICONS, ProfileBadges(), ProfileContent(), ProfileDetails(), ProfileSkeleton(), ProfileTabContent(), metadata, ProfilePageProps (+6 more)

### Community 15 - "cn"
Cohesion: 0.12
Nodes (20): DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentMobileBar(), DocumentShareButton(), ShareVariant, PageThumbnail(), PageThumbnailRail() (+12 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "handlers.ts"
Cohesion: 0.21
Nodes (26): ApiError, getUeContext(), updateMockAdminUser(), createMockDocument(), delay(), mockRequest(), parseAdminSearchParams(), parseAdminStatsPeriod() (+18 more)

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
Cohesion: 0.20
Nodes (10): DesktopAccountMenu(), Footer(), Header(), HeaderSearch(), PRESERVED_KEYS, MobileMenu(), useLogout(), useSession() (+2 more)

### Community 24 - "useAcademicTree"
Cohesion: 0.15
Nodes (14): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, CategoryCard(), CategoryCardSkeleton(), ICONS (+6 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "use-new-document-flow.ts"
Cohesion: 0.16
Nodes (16): getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDocument(), buildDocumentFormData(), documentMetadataSchema, DocumentMetadataValues (+8 more)

### Community 28 - "src/index.ts"
Cohesion: 0.05
Nodes (71): AdminNotifications(), ReportDetail(), EditProfileForm(), DownloadButton(), UpdateAdminUserVariables, useAdminUserUpdate(), ReactionVariables, useDocumentReaction() (+63 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "mocks/users.ts"
Cohesion: 0.12
Nodes (15): getMockPublicUserProfile(), analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel, getMockSessionUser() (+7 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "format.ts"
Cohesion: 0.08
Nodes (37): AdminDashboard(), AdminDashboardSkeleton(), AdminEvolutionChart(), AdminRecentActivity(), AdminStatCard(), DETAIL_TONES, ICON_TONES, StatTone (+29 more)

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "document-card.tsx"
Cohesion: 0.12
Nodes (19): ModerationReportCard(), ReportDetailView(), ProfileStats(), ProfileStatsProps, CardVariant, DocumentCardProps, DownloadsMeta(), GridContent() (+11 more)

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

### Community 42 - "new-document-form.tsx"
Cohesion: 0.21
Nodes (11): ClassificationStep(), SuccessStep(), UploadStep(), NewDocumentFlowController, academicYearOptions(), fileSizeInKiloOctets(), MAX_FILE_SIZE_LABEL, MAX_UPLOAD_FILES (+3 more)

### Community 43 - "mocks/academic.ts"
Cohesion: 0.09
Nodes (24): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), mockAcademic, MockFiliere, MockNiveau (+16 more)

### Community 44 - "Backlog MVP — ce qu'il reste à faire"
Cohesion: 0.06
Nodes (35): Administration, Authentification, Authentification et compte, Backlog MVP — ce qu'il reste à faire, Communauté, Communauté, Contenu et UX, Contenu éditorial (+27 more)

### Community 48 - "register-screen.tsx"
Cohesion: 0.06
Nodes (32): AuthLink(), AuthModal(), ForgotPasswordScreen(), LoginForm(), LoginScreen(), OnboardingFlow(), handleContinue(), handleFinish() (+24 more)

### Community 49 - "moderation.ts"
Cohesion: 0.39
Nodes (6): MODERATION_PAGE_SIZE, moderationReportHref(), ModerationSearchState, parseModerationSearchState(), readMotifSignalement(), readStatutSignalement()

### Community 50 - "filiere-detail-content.tsx"
Cohesion: 0.13
Nodes (15): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, FiliereDetailSkeleton(), SKELETON_KEYS, FilierePageProps (+7 more)

### Community 51 - "ue-documents-content.tsx"
Cohesion: 0.13
Nodes (14): AdminUsersSkeleton(), AdminShellSkeleton(), SIMILAR_SKELETON_KEYS, UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), UeFilters(), MatierePageProps (+6 more)

### Community 57 - "mocks/admin.ts"
Cohesion: 0.11
Nodes (25): AUDIT_ENTRIES, AUDIT_NOW, buildAdminUserList(), buildEvolution(), buildPointDates(), buildSeries(), countNewDocuments(), countNewUsers() (+17 more)

### Community 58 - "lib/reports.ts"
Cohesion: 0.16
Nodes (17): ModerationFilters(), ModerationFiltersProps, useModerationForm(), MODERATION_DECISION_OPTIONS, MODERATION_REASON_MAX_LENGTH, MODERATION_REASON_MIN_LENGTH, ModerationDecisionFormOutput, ModerationDecisionFormValues (+9 more)

### Community 60 - "mocks/reports.ts"
Cohesion: 0.13
Nodes (31): resetMockAdminState(), getMockDocument(), MOCK_DOCUMENTS, resetMockDocuments(), resetMockReactions(), setMockDocumentStatus(), ACTIONS, applyMockModerationAction() (+23 more)

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.10
Nodes (19): DocumentActionBar(), DocumentDetailPage(), DocumentDetailSkeleton(), DocumentOptionsSheet(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, SIMILAR_SKELETON_KEYS (+11 more)

### Community 62 - "useNewDocumentFlow"
Cohesion: 0.12
Nodes (11): NewDocumentForm(), createDefaultValues(), mergeCreated(), useNewDocumentFlow(), applyProfileSelection(), handleClassificationContinue(), handleDetailsContinue(), handleRetryFailed() (+3 more)

### Community 63 - "report-detail-content.tsx"
Cohesion: 0.15
Nodes (12): AdminModerationReportPageProps, metadata, ModerationDecisionForm(), ReportDecisionSummary(), ReportDetailContent(), ReportDetailError(), ReportDetailSkeleton(), metadata (+4 more)

### Community 64 - "details-step.tsx"
Cohesion: 0.23
Nodes (10): DetailsStep(), AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), AuthSelectOption (+2 more)

### Community 65 - "react"
Cohesion: 0.09
Nodes (30): AdminAccountMenu(), AdminHeader(), AdminHeaderSearch(), AdminMobileMenu(), AdminShell(), AdminSidebar(), instant, AuthDialog() (+22 more)

### Community 66 - "edit-profile-content.tsx"
Cohesion: 0.17
Nodes (11): EditProfileContent(), EditProfilePanel(), metadata, AcademicSelection, ProfileAcademicInfo, resolveAcademicSelection(), PROFILE_TABS, EditProfileFormValues (+3 more)

### Community 67 - "pdf-viewer.tsx"
Cohesion: 0.08
Nodes (27): DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop(), PageStepper(), commit(), PdfToolbar() (+19 more)

### Community 68 - "lib/document-upload.ts"
Cohesion: 0.19
Nodes (15): handleFilesAdd(), addFilesToSelection(), currentAcademicYear(), DocumentFormDataInput, EXTENSION_FORMATS, FileSelectionResult, getDocumentFormat(), getFileExtension() (+7 more)

### Community 69 - "academic-content.test.ts"
Cohesion: 0.31
Nodes (9): FACULTE_DESCRIPTIONS, FALLBACK_DESCRIPTION, FILIERE_DESCRIPTIONS, getFaculteDescription(), getFiliereDescription(), getUeDescription(), UE_DESCRIPTIONS, filieres (+1 more)

### Community 70 - "next"
Cohesion: 0.08
Nodes (14): metadata, metadata, metadata, AdminPlaceholder(), metadata, satoshi, CharterContent(), metadata (+6 more)

### Community 71 - "filiere-filters.tsx"
Cohesion: 0.52
Nodes (5): SearchFilters(), FiliereFilters(), formatNiveau(), formatSemestre(), NIVEAU_LABELS

### Community 72 - "moderation-content.tsx"
Cohesion: 0.17
Nodes (9): metadata, ModerationContent(), ModerationDashboard(), ModerationCardsSkeleton(), ModerationPageSkeleton(), metadata, FILTER_KEYS, useReportsSearch() (+1 more)

### Community 73 - "moderation-report-card.tsx"
Cohesion: 0.33
Nodes (5): ReportStatus(), STATUS_TONES, ModerationContext, MOTIF_SIGNALEMENT_LABELS, STATUT_SIGNALEMENT_LABELS

### Community 74 - "public-profile-content.tsx"
Cohesion: 0.23
Nodes (10): ProfileHeader(), ProfileHeaderProps, ProfileHeaderUser, PublicProfileContent(), PublicProfileView(), usePublicProfileSummary(), usePublicUserProfile(), getPublicUserProfile() (+2 more)

### Community 75 - "client.ts"
Cohesion: 0.33
Nodes (4): request(), ApiResponse, Paginated, PaginatedResponse

### Community 76 - "search-pagination.tsx"
Cohesion: 0.50
Nodes (3): getPageItems(), PageItem, SearchPagination()

### Community 78 - "ConfirmCancelDialog"
Cohesion: 1.00
Nodes (3): ConfirmCancelDialog(), getFocusableElements(), handleKeyDown()

### Community 79 - "favorites-content.tsx"
Cohesion: 0.21
Nodes (6): FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, DocumentCard(), useFavoriteDocuments()

### Community 81 - "profile-document-grid.tsx"
Cohesion: 0.15
Nodes (13): DocumentsQuery, PROFILE_GRID_SKELETON_KEYS, ProfileDocumentGrid(), ProfileEmptyState, ProfileTabs(), TabLink(), MyDocumentsPage(), PublicProfileDocuments() (+5 more)

### Community 85 - "api.ts"
Cohesion: 0.12
Nodes (27): DocumentCreatePayload, DocumentReactionPayload, RegisterPayload, SignalementDocumentSummary, UpdateProfilePayload, Document, Enseignant, Filiere (+19 more)

## Knowledge Gaps
- **454 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+449 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 582 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `search-filters.tsx`, `academic-navigation.ts`, `container.tsx`, `admin-users-content.tsx`, `routes.ts`, `use-documents-search.ts`, `web/package.json`, `profile-content.tsx`, `cn`, `useSession`, `useAcademicTree`, `use-new-document-flow.ts`, `src/index.ts`, `format.ts`, `new-document-form.tsx`, `register-screen.tsx`, `filiere-detail-content.tsx`, `ue-documents-content.tsx`, `document-detail-page.tsx`, `report-detail-content.tsx`, `details-step.tsx`, `pdf-viewer.tsx`, `next`, `moderation-content.tsx`, `public-profile-content.tsx`, `search-pagination.tsx`, `profile-document-grid.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `search-filters.tsx`, `container.tsx`, `routes.ts`, `useAcademicTree`, `src/index.ts`, `format.ts`, `document-card.tsx`, `new-document-form.tsx`, `register-screen.tsx`, `filiere-detail-content.tsx`, `ue-documents-content.tsx`, `document-detail-page.tsx`, `details-step.tsx`, `react`, `pdf-viewer.tsx`, `moderation-report-card.tsx`, `search-pagination.tsx`, `favorites-content.tsx`, `profile-document-grid.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `academic-navigation.ts`, `container.tsx`, `admin-users-content.tsx`, `routes.ts`, `use-documents-search.ts`, `web/package.json`, `profile-content.tsx`, `cn`, `useAcademicTree`, `format.ts`, `register-screen.tsx`, `moderation.ts`, `filiere-detail-content.tsx`, `ue-documents-content.tsx`, `report-detail-content.tsx`, `react`, `edit-profile-content.tsx`, `pdf-viewer.tsx`, `moderation-content.tsx`, `nouveau/page.tsx`, `favorites-content.tsx`, `profile-document-grid.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _454 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `search-filters.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14814814814814814 - nodes in this community are weakly interconnected._
- **Should `container.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09059233449477352 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11083743842364532 - nodes in this community are weakly interconnected._