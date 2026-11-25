# Graph Report - uldocs  (2026-11-25)

## Corpus Check
- 320 files · ~178,547 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1519 nodes · 4111 edges · 93 communities (80 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `09e5edd4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src/index.ts
- filiere-detail-content.tsx
- container.tsx
- mocks/documents.ts
- document-detail.ts
- biome.json
- lucide-react
- compilerOptions
- 4. DTO publiques
- use-documents-search.ts
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
- header.tsx
- mocks/academic.ts
- devDependencies
- routes/documents.ts
- use-new-document-flow.ts
- api/documents.ts
- uldocs
- mocks/users.ts
- Product Brief : UL Docs
- admin-evolution-chart.tsx
- scripts
- format.ts
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- new-document-flow.tsx
- api.ts
- Backlog MVP — ce qu'il reste à faire
- react
- moderation.ts
- handlers.test.ts
- ue-documents-content.tsx
- mocks/admin.ts
- lib/reports.ts
- mocks/reports.ts
- document-detail-page.tsx
- app/layout.tsx
- moderation/[id]/page.tsx
- auth-select.tsx
- document-options-sheet.tsx
- edit-profile-content.tsx
- pdf-viewer.tsx
- useSession
- categories-content.tsx
- next
- admin-header.tsx
- moderation-content.tsx
- routes.ts
- onboarding-flow.tsx
- auth-modal.tsx
- login-screen.tsx
- public-profile-content.tsx
- favorites-content.tsx
- profile-content.tsx
- document-download-button.tsx
- profile-document-grid.tsx
- profile-skeleton.tsx
- auth-schemas.ts
- register-screen.tsx
- admin-recent-activity.tsx
- profil/page.tsx
- recherche/page.tsx
- document-detail-skeleton.tsx
- admin-sidebar.tsx
- OnboardingFlow
- charte-de-contribution/page.tsx
- parametres/page.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 109 edges
2. `lucide-react` - 78 edges
3. `react` - 77 edges
4. `routes` - 62 edges
5. `mockRequest()` - 46 edges
6. `next` - 43 edges
7. `ApiError` - 35 edges
8. `Container()` - 32 edges
9. `@tanstack/react-query` - 29 edges
10. `ButtonLink()` - 28 edges

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

## Communities (93 total, 4 thin omitted)

### Community 0 - "src/index.ts"
Cohesion: 0.16
Nodes (10): SearchFiltersProps, SheetOptions, TypeFilterRow(), UeFilters(), TypeChip(), UeTypeChips(), TRI_DOCUMENT_LABELS, TRI_DOCUMENT_OPTIONS (+2 more)

### Community 1 - "filiere-detail-content.tsx"
Cohesion: 0.06
Nodes (44): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, SearchFilters(), FiliereDetailContent(), FiliereDetailSkeleton() (+36 more)

### Community 2 - "container.tsx"
Cohesion: 0.16
Nodes (15): ContributeSection(), FAQ_ITEMS, FaqSection(), HomeContent(), CategorySection(), FEATURED_FACULTY_CODES, DocumentSection(), DocumentSectionProps (+7 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.12
Nodes (26): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+18 more)

### Community 4 - "document-detail.ts"
Cohesion: 0.18
Nodes (17): DocumentReaction(), vote(), ReactionVariant, VOTES, ReactionVariables, useDocumentReaction(), setDocumentReaction(), applyReaction() (+9 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "lucide-react"
Cohesion: 0.10
Nodes (26): RegisterSuccess(), COMMITMENTS, SANCTIONS, SUGGESTIONS, ClassificationStep(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown() (+18 more)

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

### Community 14 - "lib/profile.ts"
Cohesion: 0.21
Nodes (11): BADGE_ICONS, ProfileBadges(), MyDocumentsPage(), PROFILE_BADGES, PROFILE_MOCK, ProfileBadge, ProfileBadgeIcon, buildPublicProfileBadges() (+3 more)

### Community 15 - "cn"
Cohesion: 0.13
Nodes (19): DocumentShareButton(), ShareVariant, ReportStatus(), STATUS_TONES, AcademicPageHeader(), AcademicPageHeaderSkeleton(), Breadcrumb(), BreadcrumbItem (+11 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "handlers.ts"
Cohesion: 0.18
Nodes (26): request(), ApiError, getUeContext(), createMockDocument(), recordMockDownload(), setMockFavorite(), delay(), mockRequest() (+18 more)

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

### Community 23 - "header.tsx"
Cohesion: 0.17
Nodes (7): Footer(), Header(), HeaderSearch(), PRESERVED_KEYS, HeaderShell(), FOOTER_LINKS, MOBILE_NAV_LINKS

### Community 24 - "mocks/academic.ts"
Cohesion: 0.08
Nodes (24): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+16 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "use-new-document-flow.ts"
Cohesion: 0.06
Nodes (45): UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated(), useNewDocumentFlow() (+37 more)

### Community 28 - "api/documents.ts"
Cohesion: 0.06
Nodes (62): AdminSearchResults(), DocumentFavoriteRow(), ModerationDashboard(), ReportDetail(), EditProfileForm(), useAdminAudit(), useAdminDocuments(), useAdminUsers() (+54 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "mocks/users.ts"
Cohesion: 0.11
Nodes (18): mockAcademic, getMockPublicUserProfile(), analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel (+10 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "admin-evolution-chart.tsx"
Cohesion: 0.11
Nodes (29): AdminDashboard(), AdminDashboardSkeleton(), AdminEvolutionChart(), AdminStatCard(), DETAIL_TONES, ICON_TONES, StatTone, metadata (+21 more)

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "format.ts"
Cohesion: 0.15
Nodes (18): DocumentTop(), SimilarDocumentCard(), ModerationReportCard(), ReportDetailView(), DownloadsMeta(), RatingMeta(), SearchListContent(), UploadedDocumentCard() (+10 more)

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
Cohesion: 0.21
Nodes (7): AdminAccess(), NewDocumentAuthGate(), NewDocumentFlow(), metadata, ProfileLocked(), AUTH_PATHS, withNextPath()

### Community 43 - "api.ts"
Cohesion: 0.12
Nodes (25): ApiResponse, DocumentCreatePayload, PaginatedResponse, SignalementDocumentSummary, Document, Enseignant, ModerationAction, Niveau (+17 more)

### Community 44 - "Backlog MVP — ce qu'il reste à faire"
Cohesion: 0.06
Nodes (35): Administration, Authentification, Authentification et compte, Backlog MVP — ce qu'il reste à faire, Communauté, Communauté, Contenu et UX, Contenu éditorial (+27 more)

### Community 48 - "react"
Cohesion: 0.35
Nodes (9): AuthLink(), FloatingInput, FloatingInputProps, LoadingDots(), PasswordInput, PasswordInputProps, AuthMode, react (+1 more)

### Community 49 - "moderation.ts"
Cohesion: 0.23
Nodes (9): ModerationFilters(), ModerationFiltersProps, FILTER_KEYS, useReportsSearch(), MODERATION_PAGE_SIZE, ModerationSearchState, parseModerationSearchState(), readMotifSignalement() (+1 more)

### Community 50 - "handlers.test.ts"
Cohesion: 0.28
Nodes (7): resetMockDocuments(), resetMockReactions(), resetMockUserStatuses(), AdminStats, Paginated, SignalementListItem, Signalement

### Community 51 - "ue-documents-content.tsx"
Cohesion: 0.10
Nodes (17): DocumentsContent(), EmptyResults(), metadata, UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), MatierePageProps, metadata (+9 more)

### Community 57 - "mocks/admin.ts"
Cohesion: 0.14
Nodes (22): AUDIT_ENTRIES, AUDIT_NOW, buildEvolution(), buildPointDates(), buildSeries(), countNewDocuments(), countNewUsers(), getMetricTotal() (+14 more)

### Community 58 - "lib/reports.ts"
Cohesion: 0.17
Nodes (18): MODERATION_DECISION_LABELS, MODERATION_DECISION_OPTIONS, MODERATION_REASON_MAX_LENGTH, MODERATION_REASON_MIN_LENGTH, ModerationDecisionFormOutput, ModerationDecisionFormValues, moderationDecisionSchema, MOTIF_SIGNALEMENT_LABELS (+10 more)

### Community 60 - "mocks/reports.ts"
Cohesion: 0.17
Nodes (24): getMockDocument(), setMockDocumentStatus(), ACTIONS, applyMockModerationAction(), at(), buildSeed(), createMockReport(), ensureActionable() (+16 more)

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.13
Nodes (16): DocumentActionBar(), DocumentDetailPage(), DocumentMobileBar(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, SIMILAR_SKELETON_KEYS, SimilarDocuments() (+8 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 63 - "moderation/[id]/page.tsx"
Cohesion: 0.29
Nodes (4): ReportDetailContent(), ReportDetailSkeleton(), metadata, ModerationReportPageProps

### Community 64 - "auth-select.tsx"
Cohesion: 0.27
Nodes (9): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), AuthSelectOption, AuthSelectProps (+1 more)

### Community 65 - "document-options-sheet.tsx"
Cohesion: 0.27
Nodes (6): DocumentOptionsSheet(), DocumentReportDialog(), getFocusableElements(), handleKeyDown(), FilterSheet(), useBodyScrollLock()

### Community 66 - "edit-profile-content.tsx"
Cohesion: 0.18
Nodes (10): EditProfileContent(), EditProfilePanel(), metadata, AcademicSelection, ProfileAcademicInfo, resolveAcademicSelection(), EditProfileFormValues, editProfileSchema (+2 more)

### Community 67 - "pdf-viewer.tsx"
Cohesion: 0.09
Nodes (18): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PageStepper(), commit(), PdfToolbar(), PAGE_WIDTH_CLASS (+10 more)

### Community 68 - "useSession"
Cohesion: 0.29
Nodes (12): AdminAccountMenu(), AdminMobileMenu(), DesktopAccountMenu(), MobileMenu(), UserAvatar(), useLogout(), useSession(), logout() (+4 more)

### Community 69 - "categories-content.tsx"
Cohesion: 0.14
Nodes (13): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, CategoryCard(), CategoryCardSkeleton(), ICONS (+5 more)

### Community 70 - "next"
Cohesion: 0.17
Nodes (7): metadata, metadata, metadata, metadata, AdminPlaceholder(), nextConfig, next

### Community 71 - "admin-header.tsx"
Cohesion: 0.18
Nodes (8): AdminHeader(), AdminHeaderSearch(), AdminNotifications(), AdminShell(), AdminShellSkeleton(), Hero(), SearchBar(), SearchBarProps

### Community 72 - "moderation-content.tsx"
Cohesion: 0.22
Nodes (6): metadata, ModerationContent(), ModerationCardsSkeleton(), ModerationPageSkeleton(), metadata, Skeleton()

### Community 73 - "routes.ts"
Cohesion: 0.29
Nodes (6): ModerationAccess(), ModerationDecisionForm(), ReportDecisionSummary(), useModerationForm(), routes, SignalementDetail

### Community 74 - "onboarding-flow.tsx"
Cohesion: 0.21
Nodes (9): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthMobileTopBar(), Step, STEP_CONTENT, STEPS (+1 more)

### Community 75 - "auth-modal.tsx"
Cohesion: 0.23
Nodes (3): AuthModal(), ForgotPasswordScreen(), useAppShellInert()

### Community 76 - "login-screen.tsx"
Cohesion: 0.24
Nodes (5): LoginForm(), LoginScreen(), useLogin(), useNextPath(), getSafeNextPath()

### Community 77 - "public-profile-content.tsx"
Cohesion: 0.35
Nodes (7): PublicProfileView(), usePublicProfileSummary(), usePublicUserProfile(), usePublicUserDocuments(), getPublicUserProfile(), listPublicUserDocuments(), PublicUserProfile

### Community 78 - "favorites-content.tsx"
Cohesion: 0.22
Nodes (5): FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, DocumentCard()

### Community 79 - "profile-content.tsx"
Cohesion: 0.25
Nodes (8): ProfileDetails(), ProfileHeader(), ProfileStats(), ProfileStatsProps, ProfileTabs(), TabLink(), useProfileSummary(), ProfileTab

### Community 80 - "document-download-button.tsx"
Cohesion: 0.31
Nodes (7): DocumentDownloadButton(), DownloadVariant, DownloadVariables, saveFile(), useDownloadDocument(), downloadDocument(), toDownloadFileName()

### Community 81 - "profile-document-grid.tsx"
Cohesion: 0.24
Nodes (6): DocumentsQuery, PROFILE_GRID_SKELETON_KEYS, ProfileDocumentGrid(), ProfileEmptyState, PublicProfileDocuments(), PROFILE_PAGE_SIZE

### Community 82 - "profile-skeleton.tsx"
Cohesion: 0.24
Nodes (6): PROFILE_STAT_SKELETON_KEYS, ProfileSkeleton(), PublicProfileContent(), PublicProfileRoute(), metadata, PublicProfilePageProps

### Community 83 - "auth-schemas.ts"
Cohesion: 0.27
Nodes (8): emailSchema, ForgotPasswordFormValues, forgotPasswordSchema, LoginFormValues, loginSchema, passwordSchema, RegisterFormValues, registerSchema

### Community 84 - "register-screen.tsx"
Cohesion: 0.25
Nodes (4): RegisterForm(), EMPTY_DRAFT, RegisterScreen(), RegisterStage

### Community 85 - "admin-recent-activity.tsx"
Cohesion: 0.39
Nodes (6): AdminRecentActivity(), AUDIT_ACTION_ICONS, AUDIT_ACTION_LABELS, AUDIT_TARGET_LABELS, getAuditTargetHref(), AuditEntry

### Community 86 - "profil/page.tsx"
Cohesion: 0.32
Nodes (5): ProfileContent(), ProfileTabContent(), metadata, ProfilePageProps, parseProfileTab()

### Community 87 - "recherche/page.tsx"
Cohesion: 0.38
Nodes (3): AdminSearchContent(), AdminSearchSkeleton(), metadata

### Community 88 - "document-detail-skeleton.tsx"
Cohesion: 0.33
Nodes (3): DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentPageProps

### Community 89 - "admin-sidebar.tsx"
Cohesion: 0.53
Nodes (4): AdminSidebar(), ADMIN_NAV_ITEMS, AdminNavItem, isAdminNavItemActive()

### Community 90 - "OnboardingFlow"
Cohesion: 0.40
Nodes (3): OnboardingFlow(), handleContinue(), handleFinish()

## Knowledge Gaps
- **445 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+440 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 572 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `src/index.ts`, `filiere-detail-content.tsx`, `container.tsx`, `lucide-react`, `use-documents-search.ts`, `web/package.json`, `cn`, `header.tsx`, `use-new-document-flow.ts`, `api/documents.ts`, `admin-evolution-chart.tsx`, `moderation.ts`, `ue-documents-content.tsx`, `lib/reports.ts`, `document-detail-page.tsx`, `app/layout.tsx`, `moderation/[id]/page.tsx`, `auth-select.tsx`, `document-options-sheet.tsx`, `pdf-viewer.tsx`, `useSession`, `categories-content.tsx`, `next`, `admin-header.tsx`, `moderation-content.tsx`, `onboarding-flow.tsx`, `auth-modal.tsx`, `login-screen.tsx`, `public-profile-content.tsx`, `profile-skeleton.tsx`, `register-screen.tsx`, `profil/page.tsx`, `recherche/page.tsx`, `document-detail-skeleton.tsx`, `admin-sidebar.tsx`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `src/index.ts`, `filiere-detail-content.tsx`, `container.tsx`, `document-detail.ts`, `lucide-react`, `use-new-document-flow.ts`, `api/documents.ts`, `admin-evolution-chart.tsx`, `format.ts`, `react`, `ue-documents-content.tsx`, `lib/reports.ts`, `document-detail-page.tsx`, `auth-select.tsx`, `document-options-sheet.tsx`, `pdf-viewer.tsx`, `useSession`, `categories-content.tsx`, `admin-header.tsx`, `moderation-content.tsx`, `onboarding-flow.tsx`, `favorites-content.tsx`, `profile-content.tsx`, `document-download-button.tsx`, `admin-sidebar.tsx`, `OnboardingFlow`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `src/index.ts`, `container.tsx`, `document-detail.ts`, `web/package.json`, `lib/profile.ts`, `cn`, `header.tsx`, `use-new-document-flow.ts`, `api/documents.ts`, `admin-evolution-chart.tsx`, `format.ts`, `new-document-flow.tsx`, `react`, `ue-documents-content.tsx`, `lib/reports.ts`, `document-detail-page.tsx`, `auth-select.tsx`, `document-options-sheet.tsx`, `edit-profile-content.tsx`, `pdf-viewer.tsx`, `useSession`, `categories-content.tsx`, `next`, `admin-header.tsx`, `moderation-content.tsx`, `routes.ts`, `onboarding-flow.tsx`, `favorites-content.tsx`, `profile-content.tsx`, `document-download-button.tsx`, `profile-document-grid.tsx`, `admin-recent-activity.tsx`, `admin-sidebar.tsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _445 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filiere-detail-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06292966684294024 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._
- **Should `biome.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._