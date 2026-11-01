# Graph Report - uldocs  (2026-11-01)

## Corpus Check
- 246 files · ~166,497 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1190 nodes · 3021 edges · 74 communities (61 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `67bd8de5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- edit-profile-content.tsx
- academic-navigation.ts
- container.tsx
- mocks/documents.ts
- cn
- biome.json
- document-card.tsx
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
- routes.ts
- api/auth.ts
- uldocs
- documents-content.tsx
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
- react
- button.tsx
- src/index.ts
- profile-content.tsx
- utils.ts
- category-detail-content.tsx
- document-detail-page.tsx
- useBodyScrollLock
- filiere-detail-content.tsx
- document-report-dialog.tsx
- academic-content.test.ts
- search-filters.tsx
- academic-page-header.tsx
- AuthSelect
- use-favorite-document.ts
- new-document-flow.tsx
- favorites-content.tsx
- favorites-list.tsx
- use-download-document.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 96 edges
2. `react` - 60 edges
3. `lucide-react` - 56 edges
4. `routes` - 43 edges
5. `mockRequest()` - 28 edges
6. `Container()` - 26 edges
7. `useNewDocumentFlow()` - 25 edges
8. `next` - 25 edges
9. `useAcademicTree()` - 24 edges
10. `ApiError` - 23 edges

## Surprising Connections (you probably didn't know these)
- `NewDocumentAuthGate()` --calls--> `withNextPath()`  [EXTRACTED]
  apps/web/app/(main)/documents/nouveau/components/new-document-flow.tsx → apps/web/lib/next-path.ts
- `TabLink()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/profil/components/profile-tabs.tsx → apps/web/lib/utils.ts
- `MyDocumentsContent()` --calls--> `useSession()`  [EXTRACTED]
  apps/web/app/(main)/profil/documents/components/my-documents-content.tsx → apps/web/hooks/use-session.ts
- `MyDocumentsLocked()` --calls--> `withNextPath()`  [EXTRACTED]
  apps/web/app/(main)/profil/documents/components/my-documents-content.tsx → apps/web/lib/next-path.ts
- `GridContent()` --calls--> `cn()`  [EXTRACTED]
  apps/web/components/shared/document-card.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (74 total, 3 thin omitted)

### Community 0 - "edit-profile-content.tsx"
Cohesion: 0.16
Nodes (13): EditProfileContent(), EditProfilePanel(), metadata, AcademicSelection, ProfileAcademicInfo, resolveAcademicSelection(), formatProfileAcademic(), PROFILE_TABS (+5 more)

### Community 1 - "academic-navigation.ts"
Cohesion: 0.17
Nodes (17): FiliereDetailContent(), useFiliereFilters(), AcademicFiliere, AcademicNiveau, AcademicSemestre, FiliereContext, findFiliere(), listFiliereSemestres() (+9 more)

### Community 2 - "container.tsx"
Cohesion: 0.07
Nodes (26): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, ContributeSection(), FAQ_ITEMS, FaqSection() (+18 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.10
Nodes (31): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+23 more)

### Community 4 - "cn"
Cohesion: 0.10
Nodes (19): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PdfToolbar(), PAGE_WIDTH_CLASS, pageElementId(), PdfPage() (+11 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "document-card.tsx"
Cohesion: 0.12
Nodes (22): DocumentTop(), SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), SimilarDocuments(), ProfileStats(), ProfileStatsProps, CardVariant, DocumentCardProps (+14 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail.ts"
Cohesion: 0.13
Nodes (18): DocumentReaction(), vote(), ReactionVariant, VOTES, PageStepper(), commit(), PagePicker(), commit() (+10 more)

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
Cohesion: 0.10
Nodes (18): DocumentsQuery, EmptyState, PROFILE_GRID_SKELETON_KEYS, ProfileTabs(), TabLink(), MyDocumentsContent(), MyDocumentsList(), MyDocumentsLocked() (+10 more)

### Community 15 - "lucide-react"
Cohesion: 0.23
Nodes (11): DocumentActionBar(), DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentMobileBar(), DocumentShareButton(), ShareVariant, FavoriteButton() (+3 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "use-documents-search.ts"
Cohesion: 0.13
Nodes (26): metadata, satoshi, Providers(), DocumentsSearchState, FILTER_KEYS, niveauxOf(), parseDocumentsSearchState(), sortNiveaux() (+18 more)

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
Cohesion: 0.18
Nodes (11): UeDocumentsContent(), UeDocumentsSkeleton(), UeDocumentsEmpty(), MatierePageProps, metadata, DocumentResults(), DocumentResultsSkeleton(), SearchResultsHeader() (+3 more)

### Community 24 - "api.ts"
Cohesion: 0.10
Nodes (23): DocumentCreatePayload, DocumentReactionPayload, LoginPayload, RegisterPayload, UpdateProfilePayload, Document, Enseignant, Filiere (+15 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.31
Nodes (8): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VoteDocument, VOTES_DOCUMENT

### Community 27 - "routes.ts"
Cohesion: 0.15
Nodes (11): AuthMobileTopBar(), Hero(), Footer(), Header(), HeaderSearch(), PRESERVED_KEYS, SearchBar(), SearchBarProps (+3 more)

### Community 28 - "api/auth.ts"
Cohesion: 0.29
Nodes (10): DesktopAccountMenu(), MobileMenu(), UserAvatar(), useLogout(), useSession(), getMe(), getSession(), logout() (+2 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "documents-content.tsx"
Cohesion: 0.19
Nodes (9): DocumentsContent(), EmptyResults(), SUGGESTIONS, metadata, DocumentCardSkeleton(), DocumentSection(), DocumentSectionProps, useDocuments() (+1 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "handlers.ts"
Cohesion: 0.17
Nodes (25): request(), ApiError, getUeContext(), createMockDocument(), getMockDocument(), recordMockDownload(), setMockFavorite(), delay() (+17 more)

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
Cohesion: 0.21
Nodes (12): useReportDocument(), useSimilarDocuments(), login(), apiFetch(), apiFetchPaginated(), deleteDocument(), getDocument(), listDocuments() (+4 more)

### Community 43 - "users.ts"
Cohesion: 0.13
Nodes (14): mockAcademic, analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel, getMockSessionUser() (+6 more)

### Community 44 - "use-new-document-flow.ts"
Cohesion: 0.05
Nodes (50): ClassificationStep(), NewDocumentForm(), SuccessStep(), UploadStep(), Button(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata (+42 more)

### Community 48 - "react"
Cohesion: 0.06
Nodes (44): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthLink(), AuthModal(), ForgotPasswordScreen(), LoginForm() (+36 more)

### Community 49 - "button.tsx"
Cohesion: 0.17
Nodes (13): RegisterSuccess(), ProfileHeader(), ProfileHeaderProps, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles() (+5 more)

### Community 50 - "src/index.ts"
Cohesion: 0.28
Nodes (8): EditProfileForm(), ReactionVariables, useRegister(), useUpdateProfile(), register(), updateProfile(), queryKeys, @tanstack/react-query

### Community 51 - "profile-content.tsx"
Cohesion: 0.13
Nodes (16): BADGE_ICONS, ProfileBadges(), PROFILE_STAT_SKELETON_KEYS, ProfileContent(), ProfileDetails(), ProfileLocked(), metadata, ProfilePage() (+8 more)

### Community 57 - "utils.ts"
Cohesion: 0.15
Nodes (13): DetailsStep(), TYPE_OPTION_LABELS, TYPE_ORDER, UeFilters(), UeTypeChips(), DocumentStatusBadge(), STATUS_STYLES, AuthSelectOption (+5 more)

### Community 60 - "category-detail-content.tsx"
Cohesion: 0.21
Nodes (9): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, AcademicNotFound(), ErrorPanel(), getFaculteDescription() (+1 more)

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.21
Nodes (9): DocumentDetailPage(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, useDocument(), copyWithTextarea(), useShareDocument(), share() (+1 more)

### Community 62 - "useBodyScrollLock"
Cohesion: 0.21
Nodes (9): DocumentOptionsSheet(), DocumentReportDialog(), getFocusableElements(), handleKeyDown(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), FilterSheet() (+1 more)

### Community 63 - "filiere-detail-content.tsx"
Cohesion: 0.24
Nodes (6): FiliereDetailSkeleton(), SKELETON_KEYS, FilierePageProps, metadata, AcademicLinkCard(), AcademicLinkCardSkeleton()

### Community 64 - "document-report-dialog.tsx"
Cohesion: 0.44
Nodes (6): MOTIF_SIGNALEMENT_LABELS, MOTIF_SIGNALEMENT_OPTIONS, ReportDocumentFormOutput, ReportDocumentFormValues, reportDocumentSchema, MOTIFS_SIGNALEMENT

### Community 65 - "academic-content.test.ts"
Cohesion: 0.36
Nodes (7): FACULTE_DESCRIPTIONS, FALLBACK_DESCRIPTION, FILIERE_DESCRIPTIONS, getFiliereDescription(), UE_DESCRIPTIONS, filieres, ues

### Community 66 - "search-filters.tsx"
Cohesion: 0.19
Nodes (10): SearchFilters(), SearchFiltersProps, SheetOptions, FiliereFilters(), SearchSelect(), handleKeyDown(), selectOption(), formatNiveau() (+2 more)

### Community 67 - "academic-page-header.tsx"
Cohesion: 0.36
Nodes (5): AcademicPageHeader(), AcademicPageHeaderSkeleton(), Breadcrumb(), BreadcrumbItem, ReadMoreText()

### Community 68 - "AuthSelect"
Cohesion: 0.39
Nodes (7): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), getShouldOpenUp()

### Community 69 - "use-favorite-document.ts"
Cohesion: 0.39
Nodes (7): DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites(), useFavoriteDocument(), addFavorite(), removeFavorite()

### Community 70 - "new-document-flow.tsx"
Cohesion: 0.33
Nodes (3): NewDocumentAuthGate(), NewDocumentFlow(), metadata

### Community 72 - "favorites-list.tsx"
Cohesion: 0.43
Nodes (5): FavoritesList(), SKELETON_KEYS, DocumentCard(), useFavoriteDocuments(), listFavoriteDocuments()

### Community 73 - "use-download-document.ts"
Cohesion: 0.48
Nodes (5): DownloadButton(), DownloadVariables, saveFile(), useDownloadDocument(), downloadDocument()

## Knowledge Gaps
- **366 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+361 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 476 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `academic-navigation.ts`, `container.tsx`, `cn`, `web/package.json`, `profile-tabs.tsx`, `lucide-react`, `use-documents-search.ts`, `ue-documents-content.tsx`, `routes.ts`, `api/auth.ts`, `documents-content.tsx`, `api/documents.ts`, `use-new-document-flow.ts`, `button.tsx`, `utils.ts`, `category-detail-content.tsx`, `document-detail-page.tsx`, `useBodyScrollLock`, `filiere-detail-content.tsx`, `document-report-dialog.tsx`, `search-filters.tsx`, `academic-page-header.tsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `container.tsx`, `document-card.tsx`, `document-detail.ts`, `profile-tabs.tsx`, `lucide-react`, `ue-documents-content.tsx`, `routes.ts`, `api/auth.ts`, `documents-content.tsx`, `use-new-document-flow.ts`, `react`, `button.tsx`, `utils.ts`, `useBodyScrollLock`, `filiere-detail-content.tsx`, `document-report-dialog.tsx`, `search-filters.tsx`, `academic-page-header.tsx`, `AuthSelect`, `favorites-list.tsx`, `use-download-document.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `edit-profile-content.tsx`, `container.tsx`, `cn`, `document-card.tsx`, `document-detail.ts`, `web/package.json`, `profile-tabs.tsx`, `routes.ts`, `api/auth.ts`, `documents-content.tsx`, `use-new-document-flow.ts`, `react`, `button.tsx`, `profile-content.tsx`, `utils.ts`, `category-detail-content.tsx`, `document-detail-page.tsx`, `useBodyScrollLock`, `document-report-dialog.tsx`, `search-filters.tsx`, `academic-page-header.tsx`, `new-document-flow.tsx`, `favorites-content.tsx`, `favorites-list.tsx`, `use-download-document.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _366 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `container.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07446808510638298 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09915966386554621 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.1010752688172043 - nodes in this community are weakly interconnected._