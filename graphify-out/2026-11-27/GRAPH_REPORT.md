# Graph Report - uldocs  (2026-11-25)

## Corpus Check
- 328 files · ~184,426 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1573 nodes · 4306 edges · 87 communities (76 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `01c45703`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- search-filters.tsx
- academic-navigation.ts
- container.tsx
- mocks/documents.ts
- admin-users-content.tsx
- biome.json
- button.tsx
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
- routes.ts
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
- new-document-flow.tsx
- mocks/academic.ts
- Backlog MVP — ce qu'il reste à faire
- react
- moderation.ts
- report-detail-content.tsx
- ue-documents-content.tsx
- mocks/admin.ts
- lib/reports.ts
- mocks/reports.ts
- document-detail-page.tsx
- app/layout.tsx
- admin/moderation/[id]/page.tsx
- edit-profile-content.tsx
- lucide-react
- lib/profile.ts
- pdf-viewer.tsx
- useSession
- document-detail.ts
- next
- admin-shell.tsx
- moderation-content.tsx
- formatCount
- public-profile-content.tsx
- handlers.test.ts
- profile-tabs.tsx
- faq-section.tsx
- profile.test.ts
- favorites-content.tsx
- DocumentDetail
- profile-document-grid.tsx
- profile-skeleton.tsx
- AdminUsersContent
- document-preview.tsx
- api.ts
- admin-search-results.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 109 edges
2. `react` - 81 edges
3. `lucide-react` - 79 edges
4. `routes` - 61 edges
5. `mockRequest()` - 48 edges
6. `next` - 44 edges
7. `ApiError` - 38 edges
8. `Container()` - 32 edges
9. `useSession()` - 30 edges
10. `@tanstack/react-query` - 30 edges

## Surprising Connections (you probably didn't know these)
- `PreviewFallback()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `PdfPageSkeleton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `TypeFilterRow()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-filters.tsx → apps/web/lib/utils.ts
- `TypeChip()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-type-chips.tsx → apps/web/lib/utils.ts
- `TabLink()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/profil/components/profile-tabs.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (87 total, 2 thin omitted)

### Community 0 - "search-filters.tsx"
Cohesion: 0.12
Nodes (17): SearchFilters(), SearchFiltersProps, SheetOptions, FiliereFilters(), TypeFilterRow(), UeFilters(), TypeChip(), UeTypeChips() (+9 more)

### Community 1 - "academic-navigation.ts"
Cohesion: 0.07
Nodes (33): CategoryDetailContent(), CategoryDetailSkeleton(), CategoryPageProps, metadata, FiliereDetailContent(), FiliereDetailSkeleton(), FilierePageProps, metadata (+25 more)

### Community 2 - "container.tsx"
Cohesion: 0.14
Nodes (8): CharterContent(), COMMITMENTS, SANCTIONS, metadata, AccountSettingsPlaceholder(), metadata, HeaderShell(), Container()

### Community 3 - "mocks/documents.ts"
Cohesion: 0.11
Nodes (27): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+19 more)

### Community 4 - "admin-users-content.tsx"
Cohesion: 0.12
Nodes (26): ACTION_CONFIRM_LABELS, AdminUserActionDialog(), AdminUserActions(), AllOr, PendingAction, UserAccountBadges(), AdminUsersSkeleton(), ADMIN_USER_ACTION_LABELS (+18 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "button.tsx"
Cohesion: 0.13
Nodes (19): RegisterSuccess(), SKELETON_KEYS, SUGGESTIONS, SKELETON_KEYS, ProfileHeaderProps, ProfileHeaderUser, AcademicNotFound(), ErrorPanel() (+11 more)

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

### Community 14 - "profile-content.tsx"
Cohesion: 0.21
Nodes (12): BADGE_ICONS, ProfileBadges(), ProfileDetails(), ProfileHeader(), useMyDocuments(), useProfileSummary(), PROFILE_BADGES, PROFILE_MOCK (+4 more)

### Community 15 - "cn"
Cohesion: 0.12
Nodes (19): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, metadata, AcademicLinkCard(), AcademicLinkCardSkeleton(), AcademicPageHeaderSkeleton() (+11 more)

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

### Community 23 - "routes.ts"
Cohesion: 0.13
Nodes (14): AdminHeaderSearch(), AdminNotifications(), Footer(), Header(), HeaderSearch(), PRESERVED_KEYS, SearchBar(), SearchBarProps (+6 more)

### Community 24 - "useAcademicTree"
Cohesion: 0.12
Nodes (17): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, ContributeSection(), Hero(), HomeContent() (+9 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "use-new-document-flow.ts"
Cohesion: 0.06
Nodes (45): UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated(), useNewDocumentFlow() (+37 more)

### Community 28 - "src/index.ts"
Cohesion: 0.06
Nodes (66): DocumentFavoriteRow(), ModerationDashboard(), EditProfileForm(), DownloadButton(), useAdminAudit(), UpdateAdminUserVariables, useAdminUserUpdate(), DownloadVariables (+58 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "mocks/users.ts"
Cohesion: 0.11
Nodes (15): mockAcademic, getMockPublicUserProfile(), analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel (+7 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "format.ts"
Cohesion: 0.09
Nodes (35): AdminDashboard(), AdminDashboardSkeleton(), AdminEvolutionChart(), AdminRecentActivity(), AdminStatCard(), DETAIL_TONES, ICON_TONES, StatTone (+27 more)

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "document-card.tsx"
Cohesion: 0.14
Nodes (15): SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), CardVariant, DocumentCardProps, GridContent(), RatingMeta(), DocumentStatusBadge(), STATUS_STYLES (+7 more)

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
Cohesion: 0.20
Nodes (7): ClassificationStep(), DetailsStep(), NewDocumentFlow(), NewDocumentForm(), SuccessStep(), metadata, NewDocumentFlowController

### Community 43 - "mocks/academic.ts"
Cohesion: 0.08
Nodes (25): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+17 more)

### Community 44 - "Backlog MVP — ce qu'il reste à faire"
Cohesion: 0.06
Nodes (35): Administration, Authentification, Authentification et compte, Backlog MVP — ce qu'il reste à faire, Communauté, Communauté, Contenu et UX, Contenu éditorial (+27 more)

### Community 48 - "react"
Cohesion: 0.06
Nodes (44): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthLink(), AuthMobileTopBar(), AuthModal(), ForgotPasswordScreen() (+36 more)

### Community 49 - "moderation.ts"
Cohesion: 0.24
Nodes (10): ModerationReportCard(), FILTER_KEYS, useReportsSearch(), ModerationContext, moderationReportHref(), ModerationSearchState, parseModerationSearchState(), MOTIF_SIGNALEMENT_LABELS (+2 more)

### Community 50 - "report-detail-content.tsx"
Cohesion: 0.26
Nodes (10): ModerationDecisionForm(), ReportDecisionSummary(), ReportDetail(), ReportDetailError(), useModerationForm(), useReport(), moderationDashboardHref(), MODERATION_DECISION_LABELS (+2 more)

### Community 51 - "ue-documents-content.tsx"
Cohesion: 0.12
Nodes (17): DocumentsContent(), EmptyResults(), UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), MatierePageProps, metadata, DocumentResults() (+9 more)

### Community 57 - "mocks/admin.ts"
Cohesion: 0.11
Nodes (26): AUDIT_ENTRIES, AUDIT_NOW, buildAdminUserList(), buildEvolution(), buildPointDates(), buildSeries(), countNewDocuments(), countNewUsers() (+18 more)

### Community 58 - "lib/reports.ts"
Cohesion: 0.15
Nodes (18): ModerationFilters(), ModerationFiltersProps, ReportStatus(), STATUS_TONES, MODERATION_DECISION_OPTIONS, MODERATION_REASON_MIN_LENGTH, ModerationDecisionFormOutput, ModerationDecisionFormValues (+10 more)

### Community 60 - "mocks/reports.ts"
Cohesion: 0.17
Nodes (24): getMockDocument(), MOCK_DOCUMENTS, setMockDocumentStatus(), ACTIONS, applyMockModerationAction(), at(), buildSeed(), ensureActionable() (+16 more)

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.13
Nodes (14): DocumentActionBar(), DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), DocumentOptionsSheet(), SimilarDocuments(), DocumentPageProps (+6 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 63 - "admin/moderation/[id]/page.tsx"
Cohesion: 0.19
Nodes (6): AdminModerationReportPageProps, metadata, ReportDetailContent(), ReportDetailSkeleton(), metadata, ModerationReportPageProps

### Community 64 - "edit-profile-content.tsx"
Cohesion: 0.14
Nodes (12): ProfileLocked(), EditProfileContent(), metadata, AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption() (+4 more)

### Community 65 - "lucide-react"
Cohesion: 0.17
Nodes (15): AdminMobileMenu(), AdminSidebar(), DocumentReportDialog(), getFocusableElements(), handleKeyDown(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown() (+7 more)

### Community 66 - "lib/profile.ts"
Cohesion: 0.31
Nodes (7): EditProfilePanel(), AcademicSelection, ProfileAcademicInfo, resolveAcademicSelection(), PROFILE_TABS, FaculteTree, Utilisateur

### Community 67 - "pdf-viewer.tsx"
Cohesion: 0.12
Nodes (14): PageStepper(), commit(), PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PagePicker(), commit(), PdfPage() (+6 more)

### Community 68 - "useSession"
Cohesion: 0.29
Nodes (12): AdminAccountMenu(), DesktopAccountMenu(), MobileMenu(), UserAvatar(), useLogout(), useSession(), getSession(), logout() (+4 more)

### Community 69 - "document-detail.ts"
Cohesion: 0.16
Nodes (20): DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop(), ReactionVariables, useDocumentReaction(), setDocumentReaction() (+12 more)

### Community 70 - "next"
Cohesion: 0.20
Nodes (6): metadata, metadata, metadata, AdminPlaceholder(), nextConfig, next

### Community 71 - "admin-shell.tsx"
Cohesion: 0.27
Nodes (5): AdminAccess(), AdminHeader(), AdminShell(), AdminShellSkeleton(), instant

### Community 72 - "moderation-content.tsx"
Cohesion: 0.19
Nodes (7): metadata, ModerationAccess(), ModerationContent(), ModerationCardsSkeleton(), ModerationPageSkeleton(), metadata, MODERATION_PAGE_SIZE

### Community 73 - "formatCount"
Cohesion: 0.50
Nodes (4): ProfileStats(), ProfileStatsProps, DownloadsMeta(), formatCount()

### Community 74 - "public-profile-content.tsx"
Cohesion: 0.29
Nodes (8): PublicProfileContent(), PublicProfileView(), PublicProfileRoute(), usePublicProfileSummary(), usePublicUserProfile(), usePublicUserDocuments(), getPublicUserProfile(), PublicUserProfile

### Community 75 - "handlers.test.ts"
Cohesion: 0.24
Nodes (8): resetMockAdminState(), resetMockDocuments(), resetMockReactions(), resetMockUserStatuses(), AdminStats, AuditEntry, SignalementListItem, Signalement

### Community 76 - "profile-tabs.tsx"
Cohesion: 0.36
Nodes (6): ProfileTabs(), TabLink(), MyDocumentsPage(), useFavoriteDocuments(), useProfileDocuments(), profileTabHref()

### Community 77 - "faq-section.tsx"
Cohesion: 0.47
Nodes (4): FAQ_ITEMS, FaqSection(), Accordion(), AccordionItem

### Community 78 - "profile.test.ts"
Cohesion: 0.40
Nodes (4): buildPublicProfileBadges(), EditProfileFormValues, editProfileSchema, zod

### Community 79 - "favorites-content.tsx"
Cohesion: 0.24
Nodes (4): FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata

### Community 80 - "DocumentDetail"
Cohesion: 0.32
Nodes (6): DocumentDownloadButton(), DownloadVariant, DocumentShareButton(), ShareVariant, FavoriteButton(), DocumentDetail

### Community 81 - "profile-document-grid.tsx"
Cohesion: 0.24
Nodes (6): DocumentsQuery, PROFILE_GRID_SKELETON_KEYS, ProfileDocumentGrid(), ProfileEmptyState, PublicProfileDocuments(), PROFILE_PAGE_SIZE

### Community 82 - "profile-skeleton.tsx"
Cohesion: 0.17
Nodes (9): ProfileContent(), PROFILE_STAT_SKELETON_KEYS, ProfileSkeleton(), ProfileTabContent(), metadata, PublicProfilePageProps, metadata, ProfilePageProps (+1 more)

### Community 83 - "AdminUsersContent"
Cohesion: 0.40
Nodes (3): AdminUsersContent(), getUpdatePayload(), metadata

### Community 84 - "document-preview.tsx"
Cohesion: 0.40
Nodes (3): DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS

### Community 85 - "api.ts"
Cohesion: 0.11
Nodes (26): ApiResponse, DocumentCreatePayload, DocumentReactionPayload, PaginatedResponse, RejectReportPayload, SignalementDocumentSummary, Document, Enseignant (+18 more)

### Community 87 - "admin-search-results.tsx"
Cohesion: 0.27
Nodes (6): AdminSearchContent(), AdminSearchResults(), AdminSearchSkeleton(), metadata, useAdminDocuments(), useAdminUsers()

## Knowledge Gaps
- **453 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+448 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 582 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `search-filters.tsx`, `academic-navigation.ts`, `container.tsx`, `admin-users-content.tsx`, `button.tsx`, `use-documents-search.ts`, `web/package.json`, `cn`, `routes.ts`, `useAcademicTree`, `use-new-document-flow.ts`, `src/index.ts`, `format.ts`, `new-document-flow.tsx`, `moderation.ts`, `ue-documents-content.tsx`, `document-detail-page.tsx`, `app/layout.tsx`, `admin/moderation/[id]/page.tsx`, `edit-profile-content.tsx`, `lucide-react`, `pdf-viewer.tsx`, `useSession`, `next`, `admin-shell.tsx`, `moderation-content.tsx`, `public-profile-content.tsx`, `profile-tabs.tsx`, `faq-section.tsx`, `DocumentDetail`, `profile-skeleton.tsx`, `admin-search-results.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `academic-navigation.ts`, `container.tsx`, `button.tsx`, `use-documents-search.ts`, `web/package.json`, `cn`, `routes.ts`, `useAcademicTree`, `format.ts`, `new-document-flow.tsx`, `react`, `moderation.ts`, `ue-documents-content.tsx`, `app/layout.tsx`, `admin/moderation/[id]/page.tsx`, `edit-profile-content.tsx`, `lucide-react`, `lib/profile.ts`, `document-detail.ts`, `moderation-content.tsx`, `profile-tabs.tsx`, `favorites-content.tsx`, `profile-document-grid.tsx`, `profile-skeleton.tsx`, `AdminUsersContent`, `admin-search-results.tsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `search-filters.tsx`, `container.tsx`, `button.tsx`, `routes.ts`, `useAcademicTree`, `use-new-document-flow.ts`, `src/index.ts`, `format.ts`, `document-card.tsx`, `new-document-flow.tsx`, `react`, `ue-documents-content.tsx`, `lib/reports.ts`, `document-detail-page.tsx`, `edit-profile-content.tsx`, `lucide-react`, `pdf-viewer.tsx`, `useSession`, `document-detail.ts`, `profile-tabs.tsx`, `faq-section.tsx`, `DocumentDetail`, `admin-search-results.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _453 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `search-filters.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12169312169312169 - nodes in this community are weakly interconnected._
- **Should `academic-navigation.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07053140096618357 - nodes in this community are weakly interconnected._
- **Should `container.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14210526315789473 - nodes in this community are weakly interconnected._