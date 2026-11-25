# Graph Report - uldocs  (2026-11-25)

## Corpus Check
- 320 files · ~178,690 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1520 nodes · 4112 edges · 84 communities (73 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2f4582e3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- search-filters.tsx
- filiere-detail-content.tsx
- container.tsx
- mocks/documents.ts
- category-detail-content.tsx
- biome.json
- button.tsx
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
- profile-content.tsx
- api.ts
- Backlog MVP — ce qu'il reste à faire
- register-screen.tsx
- moderation.ts
- ue-documents-content.tsx
- documents-content.tsx
- mocks/admin.ts
- report-detail-content.tsx
- mocks/reports.ts
- document-detail-page.tsx
- app/layout.tsx
- skeleton.tsx
- auth-select.tsx
- react
- edit-profile-content.tsx
- pdf-viewer.tsx
- useSession
- useAcademicTree
- next
- admin-mobile-menu.tsx
- moderation-content.tsx
- DocumentReportDialog
- onboarding-flow.tsx
- search-pagination.tsx
- public-profile-content.tsx
- new-document-form.tsx
- profile-tabs.tsx
- lucide-react
- profile-document-grid.tsx
- profile-skeleton.tsx
- admin-recent-activity.tsx
- recherche/page.tsx

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

## Communities (84 total, 2 thin omitted)

### Community 0 - "search-filters.tsx"
Cohesion: 0.16
Nodes (12): SearchFilters(), SearchFiltersProps, SheetOptions, FiliereFilters(), SearchSelect(), handleKeyDown(), selectOption(), formatNiveau() (+4 more)

### Community 1 - "filiere-detail-content.tsx"
Cohesion: 0.13
Nodes (20): FiliereDetailContent(), FiliereDetailSkeleton(), SKELETON_KEYS, FilierePageProps, metadata, useFiliereFilters(), AcademicFiliere, AcademicNiveau (+12 more)

### Community 2 - "container.tsx"
Cohesion: 0.13
Nodes (16): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), AccountSettingsPlaceholder(), metadata, CategorySection() (+8 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.09
Nodes (35): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+27 more)

### Community 4 - "category-detail-content.tsx"
Cohesion: 0.13
Nodes (17): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, AcademicLinkCard(), AcademicLinkCardSkeleton(), FACULTE_DESCRIPTIONS (+9 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "button.tsx"
Cohesion: 0.10
Nodes (19): RegisterSuccess(), CharterContent(), COMMITMENTS, SANCTIONS, metadata, FavoritesContent(), FavoritesList(), SKELETON_KEYS (+11 more)

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
Cohesion: 0.24
Nodes (10): BADGE_ICONS, ProfileBadges(), ProfileDetails(), useProfileSummary(), PROFILE_BADGES, PROFILE_MOCK, ProfileBadge, ProfileBadgeIcon (+2 more)

### Community 15 - "cn"
Cohesion: 0.24
Nodes (10): DocumentActionBar(), AcademicPageHeader(), AcademicPageHeaderSkeleton(), Breadcrumb(), BreadcrumbItem, ViewButton(), Accordion(), Carousel() (+2 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "handlers.ts"
Cohesion: 0.16
Nodes (30): request(), ApiError, getUeContext(), listMockAudit(), createMockDocument(), listMockFavoriteDocuments(), recordMockDownload(), setMockFavorite() (+22 more)

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
Cohesion: 0.16
Nodes (10): AdminHeaderSearch(), Footer(), Header(), HeaderSearch(), PRESERVED_KEYS, SearchBar(), SearchBarProps, FOOTER_LINKS (+2 more)

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
Cohesion: 0.06
Nodes (48): NewDocumentForm(), UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated() (+40 more)

### Community 28 - "src/index.ts"
Cohesion: 0.07
Nodes (57): AdminNotifications(), LoginForm(), ReportDetail(), EditProfileForm(), ReactionVariables, DownloadVariables, saveFile(), DocumentsCache (+49 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "mocks/users.ts"
Cohesion: 0.13
Nodes (15): mockAcademic, analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel, getMockSessionUser() (+7 more)

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
Cohesion: 0.06
Nodes (53): AdminSearchResults(), DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop(), PageStepper(), commit() (+45 more)

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

### Community 42 - "profile-content.tsx"
Cohesion: 0.15
Nodes (10): AdminAccess(), NewDocumentAuthGate(), NewDocumentFlow(), metadata, ProfileContent(), ProfileHeader(), ProfileHeaderProps, ProfileHeaderUser (+2 more)

### Community 43 - "api.ts"
Cohesion: 0.06
Nodes (45): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+37 more)

### Community 44 - "Backlog MVP — ce qu'il reste à faire"
Cohesion: 0.06
Nodes (35): Administration, Authentification, Authentification et compte, Backlog MVP — ce qu'il reste à faire, Communauté, Communauté, Contenu et UX, Contenu éditorial (+27 more)

### Community 48 - "register-screen.tsx"
Cohesion: 0.06
Nodes (32): AuthLink(), AuthModal(), ForgotPasswordScreen(), LoginScreen(), OnboardingFlow(), handleContinue(), handleFinish(), RegisterForm() (+24 more)

### Community 49 - "moderation.ts"
Cohesion: 0.25
Nodes (8): ModerationReportCard(), FILTER_KEYS, MODERATION_PAGE_SIZE, moderationReportHref(), ModerationSearchState, parseModerationSearchState(), readMotifSignalement(), readStatutSignalement()

### Community 50 - "ue-documents-content.tsx"
Cohesion: 0.20
Nodes (9): UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), UeFilters(), MatierePageProps, metadata, AcademicNotFound(), ErrorPanel() (+1 more)

### Community 51 - "documents-content.tsx"
Cohesion: 0.18
Nodes (8): DocumentsContent(), EmptyResults(), SUGGESTIONS, metadata, DocumentCardSkeleton(), DocumentResults(), DocumentResultsSkeleton(), SearchResultsHeader()

### Community 57 - "mocks/admin.ts"
Cohesion: 0.14
Nodes (21): AUDIT_ENTRIES, AUDIT_NOW, buildEvolution(), buildPointDates(), buildSeries(), countNewDocuments(), countNewUsers(), getMetricTotal() (+13 more)

### Community 58 - "report-detail-content.tsx"
Cohesion: 0.11
Nodes (26): ModerationAccess(), ModerationFilters(), ModerationFiltersProps, ReportStatus(), STATUS_TONES, ModerationDecisionForm(), ReportDecisionSummary(), ReportDetailContent() (+18 more)

### Community 60 - "mocks/reports.ts"
Cohesion: 0.18
Nodes (22): getMockDocument(), setMockDocumentStatus(), ACTIONS, applyMockModerationAction(), at(), buildSeed(), ensureActionable(), getMockReport() (+14 more)

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.13
Nodes (14): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentPageProps (+6 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 63 - "skeleton.tsx"
Cohesion: 0.28
Nodes (4): ReportDetailSkeleton(), metadata, ModerationReportPageProps, Skeleton()

### Community 64 - "auth-select.tsx"
Cohesion: 0.27
Nodes (9): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), AuthSelectOption, AuthSelectProps (+1 more)

### Community 65 - "react"
Cohesion: 0.17
Nodes (11): DocumentOptionsSheet(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), TypeFilterRow(), TypeChip(), UeTypeChips(), FilterSheet() (+3 more)

### Community 66 - "edit-profile-content.tsx"
Cohesion: 0.18
Nodes (9): EditProfileContent(), EditProfilePanel(), metadata, AcademicSelection, ProfileAcademicInfo, resolveAcademicSelection(), EditProfileFormValues, editProfileSchema (+1 more)

### Community 67 - "pdf-viewer.tsx"
Cohesion: 0.09
Nodes (14): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PdfPage() (+6 more)

### Community 68 - "useSession"
Cohesion: 0.33
Nodes (10): AdminAccountMenu(), DesktopAccountMenu(), MobileMenu(), UserAvatar(), useLogout(), useSession(), logout(), getFirstName() (+2 more)

### Community 69 - "useAcademicTree"
Cohesion: 0.16
Nodes (12): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, CategoryCard(), CategoryCardSkeleton(), ICONS (+4 more)

### Community 70 - "next"
Cohesion: 0.17
Nodes (7): metadata, metadata, metadata, metadata, AdminPlaceholder(), nextConfig, next

### Community 71 - "admin-mobile-menu.tsx"
Cohesion: 0.20
Nodes (9): AdminHeader(), AdminMobileMenu(), AdminShell(), AdminShellSkeleton(), AdminSidebar(), instant, ADMIN_NAV_ITEMS, AdminNavItem (+1 more)

### Community 72 - "moderation-content.tsx"
Cohesion: 0.19
Nodes (8): metadata, ModerationContent(), ModerationDashboard(), ModerationCardsSkeleton(), ModerationPageSkeleton(), metadata, useReportsSearch(), useReports()

### Community 73 - "DocumentReportDialog"
Cohesion: 0.47
Nodes (5): DocumentReportDialog(), getFocusableElements(), handleKeyDown(), useReportDocument(), reportDocument()

### Community 74 - "onboarding-flow.tsx"
Cohesion: 0.24
Nodes (8): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthMobileTopBar(), Step, STEP_CONTENT, STEPS

### Community 75 - "search-pagination.tsx"
Cohesion: 0.50
Nodes (3): getPageItems(), PageItem, SearchPagination()

### Community 77 - "public-profile-content.tsx"
Cohesion: 0.29
Nodes (8): PublicProfileContent(), PublicProfileView(), PublicProfileRoute(), usePublicProfileSummary(), usePublicUserProfile(), usePublicUserDocuments(), getPublicUserProfile(), buildPublicProfileBadges()

### Community 78 - "new-document-form.tsx"
Cohesion: 0.30
Nodes (7): ClassificationStep(), DetailsStep(), SuccessStep(), DocumentCard(), LoadingDots(), NewDocumentFlowController, academicYearOptions()

### Community 79 - "profile-tabs.tsx"
Cohesion: 0.29
Nodes (8): ProfileTabs(), TabLink(), MyDocumentsPage(), useFavoriteDocuments(), useMyDocuments(), useProfileDocuments(), ProfileTab, profileTabHref()

### Community 80 - "lucide-react"
Cohesion: 0.25
Nodes (9): DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentShareButton(), ShareVariant, DownloadButton(), FavoriteButton(), useDownloadDocument() (+1 more)

### Community 81 - "profile-document-grid.tsx"
Cohesion: 0.24
Nodes (6): DocumentsQuery, PROFILE_GRID_SKELETON_KEYS, ProfileDocumentGrid(), ProfileEmptyState, PublicProfileDocuments(), PROFILE_PAGE_SIZE

### Community 82 - "profile-skeleton.tsx"
Cohesion: 0.19
Nodes (8): PROFILE_STAT_SKELETON_KEYS, ProfileSkeleton(), ProfileTabContent(), metadata, PublicProfilePageProps, metadata, ProfilePageProps, parseProfileTab()

### Community 85 - "admin-recent-activity.tsx"
Cohesion: 0.27
Nodes (9): AdminRecentActivity(), useAdminAudit(), AUDIT_ACTION_ICONS, AUDIT_ACTION_LABELS, AUDIT_TARGET_LABELS, getAuditTargetHref(), AuditEntry, AuditAction (+1 more)

### Community 87 - "recherche/page.tsx"
Cohesion: 0.38
Nodes (3): AdminSearchContent(), AdminSearchSkeleton(), metadata

## Knowledge Gaps
- **446 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+441 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 573 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `search-filters.tsx`, `filiere-detail-content.tsx`, `container.tsx`, `category-detail-content.tsx`, `button.tsx`, `use-documents-search.ts`, `web/package.json`, `cn`, `routes.ts`, `use-new-document-flow.ts`, `src/index.ts`, `admin-evolution-chart.tsx`, `register-screen.tsx`, `moderation.ts`, `ue-documents-content.tsx`, `documents-content.tsx`, `report-detail-content.tsx`, `document-detail-page.tsx`, `app/layout.tsx`, `skeleton.tsx`, `auth-select.tsx`, `pdf-viewer.tsx`, `useSession`, `useAcademicTree`, `next`, `admin-mobile-menu.tsx`, `moderation-content.tsx`, `onboarding-flow.tsx`, `search-pagination.tsx`, `public-profile-content.tsx`, `new-document-form.tsx`, `profile-tabs.tsx`, `lucide-react`, `profile-skeleton.tsx`, `recherche/page.tsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `search-filters.tsx`, `container.tsx`, `button.tsx`, `web/package.json`, `lib/profile.ts`, `cn`, `routes.ts`, `use-new-document-flow.ts`, `src/index.ts`, `admin-evolution-chart.tsx`, `document-card.tsx`, `profile-content.tsx`, `register-screen.tsx`, `ue-documents-content.tsx`, `documents-content.tsx`, `report-detail-content.tsx`, `document-detail-page.tsx`, `auth-select.tsx`, `react`, `edit-profile-content.tsx`, `pdf-viewer.tsx`, `useSession`, `useAcademicTree`, `next`, `admin-mobile-menu.tsx`, `moderation-content.tsx`, `onboarding-flow.tsx`, `search-pagination.tsx`, `new-document-form.tsx`, `profile-tabs.tsx`, `profile-document-grid.tsx`, `admin-recent-activity.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `search-filters.tsx`, `container.tsx`, `category-detail-content.tsx`, `button.tsx`, `routes.ts`, `use-new-document-flow.ts`, `admin-evolution-chart.tsx`, `document-card.tsx`, `register-screen.tsx`, `documents-content.tsx`, `report-detail-content.tsx`, `skeleton.tsx`, `auth-select.tsx`, `react`, `pdf-viewer.tsx`, `useSession`, `useAcademicTree`, `admin-mobile-menu.tsx`, `DocumentReportDialog`, `onboarding-flow.tsx`, `search-pagination.tsx`, `new-document-form.tsx`, `profile-tabs.tsx`, `lucide-react`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _446 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filiere-detail-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1330049261083744 - nodes in this community are weakly interconnected._
- **Should `container.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12903225806451613 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09146341463414634 - nodes in this community are weakly interconnected._