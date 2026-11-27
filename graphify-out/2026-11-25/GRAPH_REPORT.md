# Graph Report - uldocs  (2026-11-25)

## Corpus Check
- 321 files · ~178,984 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1527 nodes · 4134 edges · 92 communities (80 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `767710da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- search-filters.tsx
- academic-navigation.ts
- container.tsx
- mocks/documents.ts
- academic-content.test.ts
- biome.json
- button.tsx
- compilerOptions
- 4. DTO publiques
- use-documents-search.ts
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- public-profile-content.tsx
- cn
- tasks
- handlers.ts
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- routes.ts
- academic.test.ts
- devDependencies
- routes/documents.ts
- use-new-document-flow.ts
- src/index.ts
- uldocs
- mocks/users.ts
- Product Brief : UL Docs
- admin-evolution-chart.tsx
- scripts
- document-card.tsx
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- new-document-flow.tsx
- mocks/academic.ts
- Backlog MVP — ce qu'il reste à faire
- react
- moderation.ts
- ue-documents-content.tsx
- documents-content.tsx
- mocks/admin.ts
- lib/reports.ts
- mocks/reports.ts
- document-detail-page.tsx
- app/layout.tsx
- report-detail-content.tsx
- auth-select.tsx
- useBodyScrollLock
- edit-profile-content.tsx
- pdf-viewer.tsx
- useSession
- document-detail.ts
- admin-placeholder.tsx
- admin-mobile-menu.tsx
- moderation-content.tsx
- format.ts
- register-screen.tsx
- next
- auth-modal.tsx
- filiere-detail-content.tsx
- auth-schemas.ts
- favorites-content.tsx
- document-options-sheet.tsx
- lucide-react
- profile-skeleton.tsx
- filieres/[id]/page.tsx
- moderation-report-card.tsx
- enums.ts
- charter-content.tsx
- admin-search-results.tsx
- use-download-document.ts
- OnboardingFlow
- categories/[id]/page.tsx
- RegisterScreen

## God Nodes (most connected - your core abstractions)
1. `cn()` - 109 edges
2. `lucide-react` - 78 edges
3. `react` - 78 edges
4. `routes` - 61 edges
5. `mockRequest()` - 46 edges
6. `next` - 44 edges
7. `ApiError` - 35 edges
8. `Container()` - 32 edges
9. `@tanstack/react-query` - 29 edges
10. `ButtonLink()` - 28 edges

## Surprising Connections (you probably didn't know these)
- `PreviewFallback()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `PdfPageSkeleton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `TypeFilterRow()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-filters.tsx → apps/web/lib/utils.ts
- `TypeChip()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-type-chips.tsx → apps/web/lib/utils.ts
- `RatingMeta()` --calls--> `formatRating()`  [EXTRACTED]
  apps/web/components/shared/document-card.tsx → apps/web/lib/format.ts

## Import Cycles
- None detected.

## Communities (92 total, 3 thin omitted)

### Community 0 - "search-filters.tsx"
Cohesion: 0.10
Nodes (19): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, SearchFilters(), SearchFiltersProps, SheetOptions (+11 more)

### Community 1 - "academic-navigation.ts"
Cohesion: 0.19
Nodes (15): useFiliereFilters(), AcademicFiliere, AcademicNiveau, AcademicSemestre, FiliereContext, listFiliereSemestres(), listFiliereUes(), UeContext (+7 more)

### Community 2 - "container.tsx"
Cohesion: 0.12
Nodes (16): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), AccountSettingsPlaceholder(), metadata, CategorySection() (+8 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.10
Nodes (29): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+21 more)

### Community 4 - "academic-content.test.ts"
Cohesion: 0.26
Nodes (10): CategoryDetailContent(), FACULTE_DESCRIPTIONS, FALLBACK_DESCRIPTION, FILIERE_DESCRIPTIONS, getFaculteDescription(), getUeDescription(), UE_DESCRIPTIONS, findFaculte() (+2 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "button.tsx"
Cohesion: 0.14
Nodes (17): SUGGESTIONS, ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), DetailsStep(), SuccessStep(), DocumentCard(), Button() (+9 more)

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
Cohesion: 0.11
Nodes (18): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 🖱️ Curseur des éléments interactifs, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants (+10 more)

### Community 13 - "shared/package.json"
Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "public-profile-content.tsx"
Cohesion: 0.10
Nodes (27): BADGE_ICONS, ProfileBadges(), ProfileContent(), ProfileDetails(), ProfileHeader(), ProfileHeaderProps, ProfileHeaderUser, ProfileStats() (+19 more)

### Community 15 - "cn"
Cohesion: 0.17
Nodes (15): AdminShellSkeleton(), PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, TabLink(), Breadcrumb(), BreadcrumbItem (+7 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "handlers.ts"
Cohesion: 0.20
Nodes (26): request(), ApiError, getDocumentFormat(), getUeContext(), createMockDocument(), delay(), mockRequest(), parseAdminSearchParams() (+18 more)

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
Cohesion: 0.17
Nodes (13): AdminAccess(), AdminHeaderSearch(), AdminNotifications(), NewDocumentAuthGate(), ModerationAccess(), ProfileLocked(), HeaderSearch(), PRESERVED_KEYS (+5 more)

### Community 24 - "academic.test.ts"
Cohesion: 0.29
Nodes (5): filieres, niveaux, semestres, ues, ACADEMIC_DATA

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "use-new-document-flow.ts"
Cohesion: 0.05
Nodes (47): ClassificationStep(), UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated() (+39 more)

### Community 28 - "src/index.ts"
Cohesion: 0.05
Nodes (76): AdminRecentActivity(), ModerationDashboard(), useAdminAudit(), DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites(), useFavoriteDocument() (+68 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "mocks/users.ts"
Cohesion: 0.11
Nodes (17): resetMockDocuments(), resetMockReactions(), getMockPublicUserProfile(), analyses, anglais, CURRENT_USER, droitPrive, economie (+9 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "admin-evolution-chart.tsx"
Cohesion: 0.11
Nodes (28): AdminDashboard(), AdminDashboardSkeleton(), AdminEvolutionChart(), AdminStatCard(), DETAIL_TONES, ICON_TONES, StatTone, metadata (+20 more)

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "document-card.tsx"
Cohesion: 0.12
Nodes (16): TypeChip(), UeTypeChips(), CardVariant, DocumentCardProps, DownloadsMeta(), GridContent(), RatingMeta(), SearchListContent() (+8 more)

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

### Community 42 - "new-document-flow.tsx"
Cohesion: 0.33
Nodes (3): NewDocumentFlow(), NewDocumentForm(), metadata

### Community 43 - "mocks/academic.ts"
Cohesion: 0.09
Nodes (24): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+16 more)

### Community 44 - "Backlog MVP — ce qu'il reste à faire"
Cohesion: 0.06
Nodes (35): Administration, Authentification, Authentification et compte, Backlog MVP — ce qu'il reste à faire, Communauté, Communauté, Contenu et UX, Contenu éditorial (+27 more)

### Community 48 - "react"
Cohesion: 0.35
Nodes (9): AuthLink(), FloatingInput, FloatingInputProps, LoadingDots(), PasswordInput, PasswordInputProps, AuthMode, react (+1 more)

### Community 49 - "moderation.ts"
Cohesion: 0.36
Nodes (6): FILTER_KEYS, useReportsSearch(), ModerationSearchState, parseModerationSearchState(), readMotifSignalement(), readStatutSignalement()

### Community 50 - "ue-documents-content.tsx"
Cohesion: 0.16
Nodes (10): UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), TypeFilterRow(), UeFilters(), MatierePageProps, metadata, DocumentResults() (+2 more)

### Community 51 - "documents-content.tsx"
Cohesion: 0.14
Nodes (11): DocumentsContent(), EmptyResults(), metadata, DocumentCardSkeleton(), DocumentSection(), getPageItems(), PageItem, SearchPagination() (+3 more)

### Community 57 - "mocks/admin.ts"
Cohesion: 0.14
Nodes (23): AUDIT_ENTRIES, AUDIT_NOW, buildEvolution(), buildPointDates(), buildSeries(), countNewDocuments(), countNewUsers(), getMetricTotal() (+15 more)

### Community 58 - "lib/reports.ts"
Cohesion: 0.15
Nodes (19): ModerationFilters(), ModerationFiltersProps, ReportDecisionSummary(), MODERATION_DECISION_LABELS, MODERATION_DECISION_OPTIONS, MODERATION_REASON_MAX_LENGTH, MODERATION_REASON_MIN_LENGTH, ModerationDecisionFormOutput (+11 more)

### Community 60 - "mocks/reports.ts"
Cohesion: 0.15
Nodes (26): getMockDocument(), setMockDocumentStatus(), ACTIONS, applyMockModerationAction(), at(), buildSeed(), ensureActionable(), getMockReport() (+18 more)

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.13
Nodes (14): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, SimilarDocuments(), DocumentPageProps (+6 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 63 - "report-detail-content.tsx"
Cohesion: 0.15
Nodes (13): AdminModerationReportPageProps, metadata, ModerationDecisionForm(), ReportDetail(), ReportDetailContent(), ReportDetailError(), ReportDetailSkeleton(), metadata (+5 more)

### Community 64 - "auth-select.tsx"
Cohesion: 0.27
Nodes (9): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), AuthSelectOption, AuthSelectProps (+1 more)

### Community 65 - "useBodyScrollLock"
Cohesion: 0.27
Nodes (6): DocumentOptionsSheet(), DocumentReportDialog(), getFocusableElements(), handleKeyDown(), FilterSheet(), useBodyScrollLock()

### Community 66 - "edit-profile-content.tsx"
Cohesion: 0.13
Nodes (14): EditProfileContent(), EditProfileForm(), EditProfilePanel(), metadata, useAcademicTree(), useUpdateProfile(), AcademicSelection, ProfileAcademicInfo (+6 more)

### Community 67 - "pdf-viewer.tsx"
Cohesion: 0.12
Nodes (14): PageStepper(), commit(), PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PagePicker(), commit(), PdfPage() (+6 more)

### Community 68 - "useSession"
Cohesion: 0.16
Nodes (15): AdminAccountMenu(), DesktopAccountMenu(), Footer(), Header(), MobileMenu(), UserAvatar(), useLogout(), useSession() (+7 more)

### Community 69 - "document-detail.ts"
Cohesion: 0.19
Nodes (15): DocumentReaction(), vote(), ReactionVariant, VOTES, ReactionVariables, useDocumentReaction(), setDocumentReaction(), applyReaction() (+7 more)

### Community 70 - "admin-placeholder.tsx"
Cohesion: 0.19
Nodes (5): metadata, metadata, metadata, metadata, AdminPlaceholder()

### Community 71 - "admin-mobile-menu.tsx"
Cohesion: 0.23
Nodes (8): AdminHeader(), AdminMobileMenu(), AdminShell(), AdminSidebar(), instant, ADMIN_NAV_ITEMS, AdminNavItem, isAdminNavItemActive()

### Community 72 - "moderation-content.tsx"
Cohesion: 0.21
Nodes (6): metadata, ModerationContent(), ModerationCardsSkeleton(), ModerationPageSkeleton(), metadata, MODERATION_PAGE_SIZE

### Community 73 - "format.ts"
Cohesion: 0.23
Nodes (12): DocumentTop(), SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), ReportDetailView(), buildDocumentBreadcrumb(), documentsHref(), formatCount(), formatDate() (+4 more)

### Community 74 - "register-screen.tsx"
Cohesion: 0.16
Nodes (15): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthMobileTopBar(), Step, STEP_CONTENT, STEPS (+7 more)

### Community 75 - "next"
Cohesion: 0.20
Nodes (7): LoginForm(), LoginScreen(), useNextPath(), AUTH_PATHS, getSafeNextPath(), nextConfig, next

### Community 76 - "auth-modal.tsx"
Cohesion: 0.20
Nodes (3): AuthModal(), ForgotPasswordScreen(), useAppShellInert()

### Community 77 - "filiere-detail-content.tsx"
Cohesion: 0.33
Nodes (8): SKELETON_KEYS, SKELETON_KEYS, AcademicNotFound(), ErrorPanel(), AcademicLinkCard(), AcademicLinkCardSkeleton(), AcademicPageHeader(), AcademicPageHeaderSkeleton()

### Community 78 - "auth-schemas.ts"
Cohesion: 0.27
Nodes (8): emailSchema, ForgotPasswordFormValues, forgotPasswordSchema, LoginFormValues, loginSchema, passwordSchema, RegisterFormValues, registerSchema

### Community 79 - "favorites-content.tsx"
Cohesion: 0.20
Nodes (7): FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, useFavoriteDocuments(), useMyDocuments(), useProfileDocuments()

### Community 80 - "document-options-sheet.tsx"
Cohesion: 0.21
Nodes (9): DocumentActionBar(), DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentMobileBar(), DocumentShareButton(), ShareVariant, FavoriteButton() (+1 more)

### Community 81 - "lucide-react"
Cohesion: 0.31
Nodes (5): DocumentsQuery, PROFILE_GRID_SKELETON_KEYS, ProfileDocumentGrid(), ProfileEmptyState, lucide-react

### Community 82 - "profile-skeleton.tsx"
Cohesion: 0.18
Nodes (8): PROFILE_STAT_SKELETON_KEYS, ProfileSkeleton(), PublicProfileContent(), PublicProfileRoute(), metadata, PublicProfilePageProps, metadata, ProfilePageProps

### Community 83 - "filieres/[id]/page.tsx"
Cohesion: 0.22
Nodes (6): FiliereDetailContent(), FiliereDetailSkeleton(), FilierePageProps, metadata, getFiliereDescription(), findFiliere()

### Community 84 - "moderation-report-card.tsx"
Cohesion: 0.28
Nodes (7): ModerationReportCard(), ReportStatus(), STATUS_TONES, moderationReportHref(), MOTIF_SIGNALEMENT_LABELS, STATUT_SIGNALEMENT_LABELS, StatutSignalement

### Community 85 - "enums.ts"
Cohesion: 0.25
Nodes (7): ACTIONS_AUDIT, FORMATS_DOCUMENT, MotifSignalement, ROLES, STATUTS_DOCUMENT, STATUTS_UTILISATEUR, TYPES_CIBLE_AUDIT

### Community 86 - "charter-content.tsx"
Cohesion: 0.33
Nodes (4): CharterContent(), COMMITMENTS, SANCTIONS, metadata

### Community 87 - "admin-search-results.tsx"
Cohesion: 0.23
Nodes (8): AdminSearchContent(), AdminSearchResults(), AdminSearchSkeleton(), metadata, DocumentStatusBadge(), useAdminDocuments(), useAdminUsers(), getFullRoleLabel()

### Community 88 - "use-download-document.ts"
Cohesion: 0.48
Nodes (5): DownloadButton(), DownloadVariables, saveFile(), useDownloadDocument(), downloadDocument()

### Community 89 - "OnboardingFlow"
Cohesion: 0.40
Nodes (3): OnboardingFlow(), handleContinue(), handleFinish()

### Community 90 - "categories/[id]/page.tsx"
Cohesion: 0.33
Nodes (3): CategoryDetailSkeleton(), CategoryPageProps, metadata

## Knowledge Gaps
- **448 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+443 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 576 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `search-filters.tsx`, `academic-navigation.ts`, `container.tsx`, `button.tsx`, `use-documents-search.ts`, `web/package.json`, `public-profile-content.tsx`, `cn`, `routes.ts`, `use-new-document-flow.ts`, `src/index.ts`, `admin-evolution-chart.tsx`, `document-card.tsx`, `moderation.ts`, `ue-documents-content.tsx`, `documents-content.tsx`, `lib/reports.ts`, `document-detail-page.tsx`, `app/layout.tsx`, `report-detail-content.tsx`, `auth-select.tsx`, `useBodyScrollLock`, `pdf-viewer.tsx`, `useSession`, `admin-placeholder.tsx`, `admin-mobile-menu.tsx`, `moderation-content.tsx`, `register-screen.tsx`, `next`, `auth-modal.tsx`, `favorites-content.tsx`, `document-options-sheet.tsx`, `profile-skeleton.tsx`, `filieres/[id]/page.tsx`, `admin-search-results.tsx`, `categories/[id]/page.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `search-filters.tsx`, `container.tsx`, `button.tsx`, `routes.ts`, `use-new-document-flow.ts`, `admin-evolution-chart.tsx`, `document-card.tsx`, `react`, `ue-documents-content.tsx`, `documents-content.tsx`, `lib/reports.ts`, `auth-select.tsx`, `useBodyScrollLock`, `pdf-viewer.tsx`, `useSession`, `document-detail.ts`, `admin-mobile-menu.tsx`, `register-screen.tsx`, `filiere-detail-content.tsx`, `document-options-sheet.tsx`, `lucide-react`, `moderation-report-card.tsx`, `admin-search-results.tsx`, `use-download-document.ts`, `OnboardingFlow`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `search-filters.tsx`, `academic-navigation.ts`, `container.tsx`, `use-documents-search.ts`, `web/package.json`, `public-profile-content.tsx`, `cn`, `routes.ts`, `src/index.ts`, `admin-evolution-chart.tsx`, `new-document-flow.tsx`, `react`, `moderation.ts`, `ue-documents-content.tsx`, `documents-content.tsx`, `app/layout.tsx`, `report-detail-content.tsx`, `edit-profile-content.tsx`, `document-detail.ts`, `admin-placeholder.tsx`, `admin-mobile-menu.tsx`, `moderation-content.tsx`, `register-screen.tsx`, `filiere-detail-content.tsx`, `favorites-content.tsx`, `lucide-react`, `profile-skeleton.tsx`, `filieres/[id]/page.tsx`, `charter-content.tsx`, `admin-search-results.tsx`, `categories/[id]/page.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _448 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `search-filters.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10114942528735632 - nodes in this community are weakly interconnected._
- **Should `container.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11931818181818182 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._