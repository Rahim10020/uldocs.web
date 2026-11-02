# Graph Report - uldocs  (2026-11-02)

## Corpus Check
- 247 files · ~150,080 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1191 nodes · 3001 edges · 66 communities (54 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b194f3bf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ue-filters.tsx
- filiere-detail-content.tsx
- ue-documents-content.tsx
- mocks/documents.ts
- pdf-viewer.tsx
- biome.json
- document-card.tsx
- compilerOptions
- Contrat d'API — UL Docs
- handlers.ts
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- src/index.ts
- lucide-react
- tasks
- categories-content.tsx
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- onboarding-flow.tsx
- mocks/academic.ts
- devDependencies
- routes/documents.ts
- users.ts
- routes.ts
- uldocs
- button.tsx
- Product Brief : UL Docs
- useBodyScrollLock
- scripts
- category-section.tsx
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- handlers.test.ts
- favorites-content.tsx
- use-new-document-flow.ts
- forgot-password-screen.tsx
- search-pagination.tsx
- api/documents.ts
- academic.test.ts
- document-detail-page.tsx
- next
- react
- cn
- Button
- OnboardingFlow
- app/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 97 edges
2. `react` - 60 edges
3. `lucide-react` - 55 edges
4. `routes` - 42 edges
5. `mockRequest()` - 28 edges
6. `Container()` - 26 edges
7. `useNewDocumentFlow()` - 25 edges
8. `next` - 25 edges
9. `useAcademicTree()` - 24 edges
10. `ApiError` - 23 edges

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

## Communities (66 total, 2 thin omitted)

### Community 0 - "ue-filters.tsx"
Cohesion: 0.17
Nodes (12): TypeFilterRow(), UeFilters(), TypeChip(), UeTypeChips(), DocumentStatusBadge(), STATUS_STYLES, STATUT_DOCUMENT_LABELS, TRI_DOCUMENT_LABELS (+4 more)

### Community 1 - "filiere-detail-content.tsx"
Cohesion: 0.06
Nodes (43): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, SearchFilters(), FiliereDetailContent(), FiliereDetailSkeleton() (+35 more)

### Community 2 - "ue-documents-content.tsx"
Cohesion: 0.06
Nodes (45): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), DocumentsContent(), EmptyResults(), SUGGESTIONS (+37 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.12
Nodes (27): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+19 more)

### Community 4 - "pdf-viewer.tsx"
Cohesion: 0.07
Nodes (38): DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop(), PageStepper(), commit(), PdfToolbar() (+30 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "document-card.tsx"
Cohesion: 0.18
Nodes (13): SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), CardVariant, DocumentCardProps, GridContent(), RatingMeta(), SearchListContent(), UploadedDocumentCard() (+5 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "handlers.ts"
Cohesion: 0.20
Nodes (24): request(), ApiError, getDocumentFormat(), getUeContext(), createMockDocument(), getMockDocument(), recordMockDownload(), setMockFavorite() (+16 more)

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

### Community 14 - "src/index.ts"
Cohesion: 0.06
Nodes (41): BADGE_ICONS, ProfileBadges(), ProfileContent(), ProfileDetails(), ProfileHeader(), ProfileHeaderProps, ProfileLocked(), PROFILE_STAT_SKELETON_KEYS (+33 more)

### Community 15 - "lucide-react"
Cohesion: 0.23
Nodes (10): DocumentActionBar(), DocumentDownloadButton(), DownloadVariant, DocumentFavoriteRow(), DocumentShareButton(), ShareVariant, DownloadButton(), FavoriteButton() (+2 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "categories-content.tsx"
Cohesion: 0.19
Nodes (9): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, SearchSelect(), handleKeyDown(), selectOption() (+1 more)

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

### Community 23 - "onboarding-flow.tsx"
Cohesion: 0.22
Nodes (12): Step, STEP_CONTENT, STEPS, DesktopAccountMenu(), HeaderShell(), MobileMenu(), UserAvatar(), useLogout() (+4 more)

### Community 24 - "mocks/academic.ts"
Cohesion: 0.07
Nodes (39): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+31 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "users.ts"
Cohesion: 0.13
Nodes (14): mockAcademic, analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel, getMockSessionUser() (+6 more)

### Community 28 - "routes.ts"
Cohesion: 0.15
Nodes (9): Footer(), Header(), HeaderSearch(), PRESERVED_KEYS, SearchBar(), SearchBarProps, FOOTER_LINKS, MOBILE_NAV_LINKS (+1 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "button.tsx"
Cohesion: 0.13
Nodes (18): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthMobileTopBar(), EMPTY_DRAFT, RegisterSuccess(), ButtonLink() (+10 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "useBodyScrollLock"
Cohesion: 0.27
Nodes (6): DocumentOptionsSheet(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), FilterSheet(), useBodyScrollLock()

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "category-section.tsx"
Cohesion: 0.24
Nodes (8): CategoryCard(), CategoryCardSkeleton(), ICONS, CategorySection(), FEATURED_FACULTY_CODES, DocumentSectionProps, Carousel(), SectionHeading()

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

### Community 42 - "handlers.test.ts"
Cohesion: 0.24
Nodes (7): REPORTS, resetMockReports(), ApiResponse, Paginated, PaginatedResponse, ReportDocumentPayload, Signalement

### Community 43 - "favorites-content.tsx"
Cohesion: 0.29
Nodes (3): FavoritesContent(), FavoritesList(), metadata

### Community 44 - "use-new-document-flow.ts"
Cohesion: 0.05
Nodes (46): UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated(), useNewDocumentFlow() (+38 more)

### Community 48 - "forgot-password-screen.tsx"
Cohesion: 0.19
Nodes (16): AuthLink(), FloatingInput, FloatingInputProps, LoadingDots(), PasswordInput, PasswordInputProps, emailSchema, ForgotPasswordFormValues (+8 more)

### Community 49 - "search-pagination.tsx"
Cohesion: 0.50
Nodes (3): getPageItems(), PageItem, SearchPagination()

### Community 50 - "api/documents.ts"
Cohesion: 0.08
Nodes (40): RegisterScreen(), EditProfileForm(), DownloadVariables, saveFile(), DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites() (+32 more)

### Community 60 - "academic.test.ts"
Cohesion: 0.29
Nodes (5): filieres, niveaux, semestres, ues, ACADEMIC_DATA

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.08
Nodes (27): DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentReportDialog() (+19 more)

### Community 62 - "next"
Cohesion: 0.11
Nodes (13): LoginForm(), LoginScreen(), RegisterForm(), NewDocumentAuthGate(), NewDocumentFlow(), NewDocumentForm(), metadata, useNextPath() (+5 more)

### Community 66 - "react"
Cohesion: 0.22
Nodes (4): AuthModal(), ForgotPasswordScreen(), useAppShellInert(), react

### Community 67 - "cn"
Cohesion: 0.16
Nodes (16): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, AcademicLinkCard(), AcademicLinkCardSkeleton(), AcademicPageHeader(), AcademicPageHeaderSkeleton() (+8 more)

### Community 68 - "Button"
Cohesion: 0.15
Nodes (16): ClassificationStep(), DetailsStep(), SuccessStep(), SKELETON_KEYS, AuthSelect(), handleKeyDown(), openList(), selectActiveOption() (+8 more)

### Community 75 - "OnboardingFlow"
Cohesion: 0.40
Nodes (3): OnboardingFlow(), handleContinue(), handleFinish()

### Community 76 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

## Knowledge Gaps
- **367 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+362 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 476 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `ue-filters.tsx`, `filiere-detail-content.tsx`, `ue-documents-content.tsx`, `pdf-viewer.tsx`, `web/package.json`, `src/index.ts`, `lucide-react`, `categories-content.tsx`, `onboarding-flow.tsx`, `routes.ts`, `button.tsx`, `useBodyScrollLock`, `category-section.tsx`, `use-new-document-flow.ts`, `forgot-password-screen.tsx`, `search-pagination.tsx`, `api/documents.ts`, `document-detail-page.tsx`, `next`, `cn`, `Button`, `app/layout.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `ue-filters.tsx`, `useBodyScrollLock`, `category-section.tsx`, `ue-documents-content.tsx`, `pdf-viewer.tsx`, `Button`, `document-card.tsx`, `OnboardingFlow`, `use-new-document-flow.ts`, `src/index.ts`, `lucide-react`, `forgot-password-screen.tsx`, `search-pagination.tsx`, `categories-content.tsx`, `onboarding-flow.tsx`, `routes.ts`, `document-detail-page.tsx`, `button.tsx`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `filiere-detail-content.tsx`, `ue-documents-content.tsx`, `cn`, `pdf-viewer.tsx`, `web/package.json`, `favorites-content.tsx`, `app/layout.tsx`, `src/index.ts`, `forgot-password-screen.tsx`, `categories-content.tsx`, `button.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _367 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filiere-detail-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0633879781420765 - nodes in this community are weakly interconnected._
- **Should `ue-documents-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05543859649122807 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11576354679802955 - nodes in this community are weakly interconnected._