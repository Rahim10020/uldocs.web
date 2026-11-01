# Graph Report - uldocs  (2026-11-01)

## Corpus Check
- 245 files · ~165,999 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1185 nodes · 2993 edges · 80 communities (68 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `67bd8de5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- edit-profile-content.tsx
- academic-navigation.ts
- documents-content.tsx
- mocks/documents.ts
- pdf-viewer.tsx
- biome.json
- src/index.ts
- compilerOptions
- Contrat d'API — UL Docs
- document-detail.ts
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- profile-tabs.tsx
- lucide-react
- tasks
- use-documents-search.ts
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- ue-documents-content.tsx
- api.ts
- devDependencies
- routes/documents.ts
- footer.tsx
- header.tsx
- uldocs
- register-screen.tsx
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
- api/documents.ts
- users.ts
- use-new-document-flow.ts
- forgot-password-screen.tsx
- button.tsx
- api/auth.ts
- profile-content.tsx
- react
- category-detail-content.tsx
- document-detail-page.tsx
- next
- filiere-detail-content.tsx
- document-report-dialog.tsx
- academic-content.test.ts
- RegisterScreen
- cn
- AuthSelect
- use-favorite-document.ts
- routes.ts
- favorites-content.tsx
- handlers.test.ts
- search-bar.tsx
- ForgotPasswordScreen
- OnboardingFlow
- app/layout.tsx
- profil/page.tsx
- use-document-reaction.ts
- search-pagination.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 96 edges
2. `react` - 59 edges
3. `lucide-react` - 55 edges
4. `routes` - 42 edges
5. `mockRequest()` - 28 edges
6. `Container()` - 25 edges
7. `useNewDocumentFlow()` - 25 edges
8. `next` - 25 edges
9. `useAcademicTree()` - 24 edges
10. `ApiError` - 23 edges

## Surprising Connections (you probably didn't know these)
- `PreviewFallback()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `PdfPageSkeleton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `NewDocumentAuthGate()` --calls--> `withNextPath()`  [EXTRACTED]
  apps/web/app/(main)/documents/nouveau/components/new-document-flow.tsx → apps/web/lib/next-path.ts
- `TypeFilterRow()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-filters.tsx → apps/web/lib/utils.ts
- `TypeChip()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-type-chips.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (80 total, 2 thin omitted)

### Community 0 - "edit-profile-content.tsx"
Cohesion: 0.18
Nodes (9): EditProfileContent(), EditProfilePanel(), metadata, AcademicSelection, ProfileAcademicInfo, resolveAcademicSelection(), EditProfileFormValues, editProfileSchema (+1 more)

### Community 1 - "academic-navigation.ts"
Cohesion: 0.20
Nodes (14): useFiliereFilters(), AcademicFiliere, AcademicNiveau, AcademicSemestre, FiliereContext, listFiliereSemestres(), listFiliereUes(), UeContext (+6 more)

### Community 2 - "documents-content.tsx"
Cohesion: 0.07
Nodes (31): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, ContributeSection(), FAQ_ITEMS, FaqSection() (+23 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.12
Nodes (26): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+18 more)

### Community 4 - "pdf-viewer.tsx"
Cohesion: 0.11
Nodes (15): PageStepper(), commit(), PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PagePicker(), commit(), PdfPage() (+7 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "src/index.ts"
Cohesion: 0.13
Nodes (22): DocumentTop(), SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), ProfileStats(), ProfileStatsProps, CardVariant, DocumentCardProps, DownloadsMeta() (+14 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail.ts"
Cohesion: 0.21
Nodes (13): DocumentReaction(), vote(), ReactionVariant, VOTES, BreadcrumbItem, buildDocumentBreadcrumb(), canPreviewDocument(), documentsHref() (+5 more)

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

### Community 14 - "profile-tabs.tsx"
Cohesion: 0.17
Nodes (12): DocumentsQuery, EmptyState, PROFILE_GRID_SKELETON_KEYS, ProfileTabs(), TabLink(), MyDocumentsPage(), useFavoriteDocuments(), useMyDocuments() (+4 more)

### Community 15 - "lucide-react"
Cohesion: 0.23
Nodes (10): DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentShareButton(), ShareVariant, DownloadButton(), FavoriteButton(), useDownloadDocument() (+2 more)

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

### Community 23 - "ue-documents-content.tsx"
Cohesion: 0.19
Nodes (10): UeDocumentsContent(), UeDocumentsSkeleton(), UeFilters(), MatierePageProps, metadata, AcademicPageHeader(), AcademicPageHeaderSkeleton(), useAcademicTree() (+2 more)

### Community 24 - "api.ts"
Cohesion: 0.11
Nodes (24): DocumentCreatePayload, DocumentReactionPayload, Document, Enseignant, Faculte, Filiere, ModerationAction, Niveau (+16 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "footer.tsx"
Cohesion: 0.24
Nodes (4): Footer(), Header(), FOOTER_LINKS, MOBILE_NAV_LINKS

### Community 28 - "header.tsx"
Cohesion: 0.30
Nodes (9): ProfileHeaderProps, DesktopAccountMenu(), MobileMenu(), UserAvatar(), useLogout(), useSession(), logout(), getInitial() (+1 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "register-screen.tsx"
Cohesion: 0.19
Nodes (14): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthMobileTopBar(), Step, STEP_CONTENT, STEPS (+6 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "handlers.ts"
Cohesion: 0.21
Nodes (21): ApiError, getUeContext(), createMockDocument(), recordMockDownload(), setMockFavorite(), delay(), mockRequest(), parseSearchParams() (+13 more)

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

### Community 42 - "api/documents.ts"
Cohesion: 0.27
Nodes (10): DownloadVariables, saveFile(), apiFetchPaginated(), downloadDocument(), listDocuments(), listFavoriteDocuments(), listMyDocuments(), queryKeys (+2 more)

### Community 43 - "users.ts"
Cohesion: 0.13
Nodes (14): mockAcademic, analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel, getMockSessionUser() (+6 more)

### Community 44 - "use-new-document-flow.ts"
Cohesion: 0.06
Nodes (46): UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated(), useNewDocumentFlow() (+38 more)

### Community 48 - "forgot-password-screen.tsx"
Cohesion: 0.19
Nodes (16): AuthLink(), FloatingInput, FloatingInputProps, LoadingDots(), PasswordInput, PasswordInputProps, emailSchema, ForgotPasswordFormValues (+8 more)

### Community 49 - "button.tsx"
Cohesion: 0.17
Nodes (13): UeDocumentsEmpty(), AcademicNotFound(), ErrorPanel(), Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize (+5 more)

### Community 50 - "api/auth.ts"
Cohesion: 0.14
Nodes (19): EditProfileForm(), useLogin(), useRegister(), useUpdateProfile(), getMe(), getSession(), login(), register() (+11 more)

### Community 51 - "profile-content.tsx"
Cohesion: 0.18
Nodes (12): BADGE_ICONS, ProfileBadges(), PROFILE_STAT_SKELETON_KEYS, ProfileDetails(), ProfileHeader(), useProfileSummary(), PROFILE_BADGES, PROFILE_MOCK (+4 more)

### Community 57 - "react"
Cohesion: 0.13
Nodes (16): ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), DetailsStep(), TYPE_OPTION_LABELS, TYPE_ORDER, TypeFilterRow(), TypeChip() (+8 more)

### Community 60 - "category-detail-content.tsx"
Cohesion: 0.25
Nodes (7): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, getFaculteDescription(), findFaculte()

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.11
Nodes (16): DocumentActionBar(), DocumentDetailPage(), DocumentDetailSkeleton(), DocumentMobileBar(), DocumentOptionsSheet(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS (+8 more)

### Community 62 - "next"
Cohesion: 0.17
Nodes (10): LoginForm(), LoginScreen(), RegisterForm(), ProfileLocked(), useNextPath(), AUTH_PATHS, getSafeNextPath(), withNextPath() (+2 more)

### Community 63 - "filiere-detail-content.tsx"
Cohesion: 0.22
Nodes (8): FiliereDetailContent(), FiliereDetailSkeleton(), SKELETON_KEYS, FilierePageProps, metadata, AcademicLinkCard(), AcademicLinkCardSkeleton(), findFiliere()

### Community 64 - "document-report-dialog.tsx"
Cohesion: 0.25
Nodes (11): DocumentReportDialog(), getFocusableElements(), handleKeyDown(), useReportDocument(), reportDocument(), MOTIF_SIGNALEMENT_LABELS, MOTIF_SIGNALEMENT_OPTIONS, ReportDocumentFormOutput (+3 more)

### Community 65 - "academic-content.test.ts"
Cohesion: 0.33
Nodes (8): FACULTE_DESCRIPTIONS, FALLBACK_DESCRIPTION, FILIERE_DESCRIPTIONS, getFiliereDescription(), getUeDescription(), UE_DESCRIPTIONS, filieres, ues

### Community 66 - "RegisterScreen"
Cohesion: 0.18
Nodes (3): AuthModal(), RegisterScreen(), useAppShellInert()

### Community 67 - "cn"
Cohesion: 0.15
Nodes (13): SIMILAR_SKELETON_KEYS, PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, Breadcrumb(), BreadcrumbItem, ViewButton() (+5 more)

### Community 68 - "AuthSelect"
Cohesion: 0.39
Nodes (7): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), getShouldOpenUp()

### Community 69 - "use-favorite-document.ts"
Cohesion: 0.39
Nodes (7): DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites(), useFavoriteDocument(), addFavorite(), removeFavorite()

### Community 70 - "routes.ts"
Cohesion: 0.18
Nodes (8): ClassificationStep(), NewDocumentAuthGate(), NewDocumentFlow(), NewDocumentForm(), SuccessStep(), metadata, NewDocumentFlowController, routes

### Community 71 - "favorites-content.tsx"
Cohesion: 0.22
Nodes (5): FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, DocumentCard()

### Community 72 - "handlers.test.ts"
Cohesion: 0.31
Nodes (7): resetMockDocuments(), resetMockReactions(), REPORTS, resetMockReports(), Paginated, ReportDocumentPayload, Signalement

### Community 73 - "search-bar.tsx"
Cohesion: 0.32
Nodes (5): Hero(), HeaderSearch(), PRESERVED_KEYS, SearchBar(), SearchBarProps

### Community 74 - "ForgotPasswordScreen"
Cohesion: 0.33
Nodes (3): ForgotPasswordScreen(), useForgotPassword(), forgotPassword()

### Community 75 - "OnboardingFlow"
Cohesion: 0.40
Nodes (3): OnboardingFlow(), handleContinue(), handleFinish()

### Community 76 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

### Community 77 - "profil/page.tsx"
Cohesion: 0.40
Nodes (5): ProfileContent(), metadata, ProfilePage(), ProfilePageProps, parseProfileTab()

### Community 78 - "use-document-reaction.ts"
Cohesion: 0.47
Nodes (5): ReactionVariables, useDocumentReaction(), setDocumentReaction(), applyReaction(), VoteDocument

### Community 79 - "search-pagination.tsx"
Cohesion: 0.50
Nodes (3): getPageItems(), PageItem, SearchPagination()

## Knowledge Gaps
- **366 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+361 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 475 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `academic-navigation.ts`, `documents-content.tsx`, `pdf-viewer.tsx`, `web/package.json`, `profile-tabs.tsx`, `lucide-react`, `use-documents-search.ts`, `ue-documents-content.tsx`, `footer.tsx`, `header.tsx`, `register-screen.tsx`, `api/documents.ts`, `use-new-document-flow.ts`, `forgot-password-screen.tsx`, `button.tsx`, `category-detail-content.tsx`, `document-detail-page.tsx`, `next`, `filiere-detail-content.tsx`, `document-report-dialog.tsx`, `RegisterScreen`, `cn`, `search-bar.tsx`, `app/layout.tsx`, `search-pagination.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `documents-content.tsx`, `pdf-viewer.tsx`, `src/index.ts`, `document-detail.ts`, `profile-tabs.tsx`, `lucide-react`, `use-documents-search.ts`, `ue-documents-content.tsx`, `header.tsx`, `register-screen.tsx`, `use-new-document-flow.ts`, `forgot-password-screen.tsx`, `button.tsx`, `react`, `document-detail-page.tsx`, `filiere-detail-content.tsx`, `document-report-dialog.tsx`, `AuthSelect`, `routes.ts`, `favorites-content.tsx`, `search-bar.tsx`, `OnboardingFlow`, `search-pagination.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `edit-profile-content.tsx`, `documents-content.tsx`, `pdf-viewer.tsx`, `src/index.ts`, `document-detail.ts`, `web/package.json`, `profile-tabs.tsx`, `use-documents-search.ts`, `header.tsx`, `register-screen.tsx`, `use-new-document-flow.ts`, `forgot-password-screen.tsx`, `button.tsx`, `profile-content.tsx`, `react`, `document-detail-page.tsx`, `next`, `document-report-dialog.tsx`, `cn`, `routes.ts`, `favorites-content.tsx`, `search-bar.tsx`, `search-pagination.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _366 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `documents-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06753246753246753 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._
- **Should `pdf-viewer.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._