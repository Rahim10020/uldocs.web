# Graph Report - uldocs  (2026-11-01)

## Corpus Check
- 247 files · ~166,410 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1190 nodes · 2999 edges · 70 communities (57 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d5d5c68c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ue-filters.tsx
- ue-documents-content.tsx
- documents-content.tsx
- handlers.ts
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
- edit-profile-content.tsx
- lucide-react
- tasks
- search-filters.tsx
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- useNewDocumentFlow
- api.ts
- devDependencies
- routes/documents.ts
- use-new-document-flow.ts
- routes.ts
- uldocs
- register-screen.tsx
- Product Brief : UL Docs
- react
- scripts
- mocks/academic.ts
- copy-pdf-worker.mjs
- Données Académiques de l'Université de Lomé (UL)
- __tests__/documents.test.ts
- Dépendances autorisées du projet
- dependencies
- server.ts
- web/AGENTS.md
- document-report-dialog.tsx
- enums.ts
- lib/document-upload.ts
- forgot-password-screen.tsx
- data/academic.ts
- api/documents.ts
- document-upload-schema.ts
- Button
- academic.test.ts
- document-detail-page.tsx
- next
- RegisterScreen
- DocumentReportDialog
- auth-modal.tsx
- cn
- auth-select.tsx
- OnboardingFlow
- app/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 96 edges
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
- `PageThumbnail()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/page-thumbnail-rail.tsx → apps/web/lib/utils.ts
- `PreviewFallback()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `PdfPageSkeleton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `NewDocumentAuthGate()` --calls--> `withNextPath()`  [EXTRACTED]
  apps/web/app/(main)/documents/nouveau/components/new-document-flow.tsx → apps/web/lib/next-path.ts
- `TypeFilterRow()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/matieres/[id]/components/ue-filters.tsx → apps/web/lib/utils.ts

## Import Cycles
- None detected.

## Communities (70 total, 3 thin omitted)

### Community 0 - "ue-filters.tsx"
Cohesion: 0.20
Nodes (10): TypeFilterRow(), UeFilters(), TypeChip(), UeTypeChips(), DocumentStatusBadge(), STATUS_STYLES, STATUT_DOCUMENT_LABELS, TRI_DOCUMENT_OPTIONS (+2 more)

### Community 1 - "ue-documents-content.tsx"
Cohesion: 0.06
Nodes (48): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, FiliereDetailContent(), FiliereDetailSkeleton(), SKELETON_KEYS (+40 more)

### Community 2 - "documents-content.tsx"
Cohesion: 0.07
Nodes (44): ContributeSection(), FAQ_ITEMS, FaqSection(), Hero(), HomeContent(), DocumentsContent(), EmptyResults(), SUGGESTIONS (+36 more)

### Community 3 - "handlers.ts"
Cohesion: 0.06
Nodes (70): request(), ApiError, getUeContext(), getUeContextByName(), mockAcademic, BASE_UPLOAD, buildDocuments(), compare() (+62 more)

### Community 4 - "pdf-viewer.tsx"
Cohesion: 0.09
Nodes (20): PageThumbnail(), PageThumbnailRail(), PageThumbnailRailSkeleton(), THUMBNAIL_SKELETON_KEYS, PageStepper(), commit(), PdfToolbar(), PAGE_WIDTH_CLASS (+12 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 6 - "src/index.ts"
Cohesion: 0.14
Nodes (20): DocumentTop(), SIMILAR_SKELETON_KEYS, SimilarDocumentCard(), SimilarDocuments(), ProfileStats(), ProfileStatsProps, CardVariant, DocumentCardProps (+12 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "document-detail.ts"
Cohesion: 0.19
Nodes (16): DocumentReaction(), vote(), ReactionVariant, VOTES, ReactionVariables, useDocumentReaction(), setDocumentReaction(), applyReaction() (+8 more)

### Community 10 - "web/package.json"
Cohesion: 0.04
Nodes (45): dependencies, clsx, @hookform/resolvers, lucide-react, next, react, react-dom, react-hook-form (+37 more)

### Community 11 - "package.json"
Cohesion: 0.12
Nodes (16): description, devDependencies, @biomejs/biome, turbo, engines, node, name, packageManager (+8 more)

### Community 12 - "Règles du projet UL Docs"
Cohesion: 0.11
Nodes (17): 📐 Architecture frontend (`apps/web`), 🤖 Astuces de workflow IA, ⚙️ Commandes, 🎯 Contexte, 🧱 Conventions de nommage, 📚 Documentation de référence (À LIRE OBLIGATOIREMENT), 🧩 Décomposition des écrans & composants, 📦 Dépendances (+9 more)

### Community 13 - "shared/package.json"
Cohesion: 0.12
Nodes (15): devDependencies, typescript, vitest, exports, typescript, vitest, main, name (+7 more)

### Community 14 - "edit-profile-content.tsx"
Cohesion: 0.05
Nodes (43): BADGE_ICONS, ProfileBadges(), ProfileContent(), ProfileDetails(), PROFILE_STAT_SKELETON_KEYS, ProfileSkeleton(), ProfileTabContent(), DocumentsQuery (+35 more)

### Community 15 - "lucide-react"
Cohesion: 0.23
Nodes (11): DocumentDownloadButton(), DownloadVariant, DocumentShareButton(), ShareVariant, DownloadButton(), FavoriteButton(), saveFile(), useDownloadDocument() (+3 more)

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "search-filters.tsx"
Cohesion: 0.11
Nodes (18): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, SearchFilters(), SearchFiltersProps, SheetOptions (+10 more)

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

### Community 23 - "useNewDocumentFlow"
Cohesion: 0.12
Nodes (11): createDefaultValues(), mergeCreated(), useNewDocumentFlow(), applyProfileSelection(), handleClassificationContinue(), handleDetailsContinue(), handleRetryFailed(), handleStartOver() (+3 more)

### Community 24 - "api.ts"
Cohesion: 0.15
Nodes (14): ApiResponse, DocumentCreatePayload, DocumentReactionPayload, PaginatedResponse, Document, Enseignant, Filiere, ModerationAction (+6 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "use-new-document-flow.ts"
Cohesion: 0.29
Nodes (10): getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDocument(), buildDocumentFormData(), NewDocumentStep, UploadDocumentsResult (+2 more)

### Community 28 - "routes.ts"
Cohesion: 0.06
Nodes (36): NewDocumentAuthGate(), NewDocumentFlow(), NewDocumentForm(), metadata, FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata (+28 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 30 - "register-screen.tsx"
Cohesion: 0.20
Nodes (13): AuthDialog(), getFocusableElements(), handleKeyDown(), Step, STEP_CONTENT, STEPS, EMPTY_DRAFT, RegisterSuccess() (+5 more)

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "react"
Cohesion: 0.25
Nodes (8): AuthDialogProps, AuthMobileTopBar(), ConfirmCancelDialog(), getFocusableElements(), handleKeyDown(), FilterSheet(), useBodyScrollLock(), react

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, start, test, test:watch

### Community 34 - "mocks/academic.ts"
Cohesion: 0.22
Nodes (9): AcademicBuild, buildAcademicData(), built, contextsByUeName, createSemestres(), MockFiliere, MockNiveau, MockSemestre (+1 more)

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

### Community 42 - "document-report-dialog.tsx"
Cohesion: 0.44
Nodes (6): MOTIF_SIGNALEMENT_LABELS, MOTIF_SIGNALEMENT_OPTIONS, ReportDocumentFormOutput, ReportDocumentFormValues, reportDocumentSchema, MOTIFS_SIGNALEMENT

### Community 43 - "enums.ts"
Cohesion: 0.22
Nodes (8): ActionModeration, ACTIONS_MODERATION, FORMATS_DOCUMENT, MotifSignalement, ROLES, STATUTS_DOCUMENT, STATUTS_SIGNALEMENT, STATUTS_UTILISATEUR

### Community 44 - "lib/document-upload.ts"
Cohesion: 0.16
Nodes (19): UploadStep(), handleFilesAdd(), addFilesToSelection(), DocumentFormDataInput, EXTENSION_FORMATS, FileSelectionResult, fileSizeInKiloOctets(), getDocumentFormat() (+11 more)

### Community 48 - "forgot-password-screen.tsx"
Cohesion: 0.20
Nodes (15): AuthLink(), FloatingInput, FloatingInputProps, PasswordInput, PasswordInputProps, emailSchema, ForgotPasswordFormValues, forgotPasswordSchema (+7 more)

### Community 49 - "data/academic.ts"
Cohesion: 0.25
Nodes (7): AcademicFiliereSeed, AcademicStructureSeed, NiveauScolarite, NIVEAUX_SCOLARITE, ORDRE_NIVEAU, SEMESTRES_PAR_NIVEAU, CategorieFaculte

### Community 50 - "api/documents.ts"
Cohesion: 0.09
Nodes (39): DocumentFavoriteRow(), EditProfileForm(), DownloadVariables, DocumentsCache, FavoriteVariables, patchCache(), removeFromFavorites(), useFavoriteDocument() (+31 more)

### Community 51 - "document-upload-schema.ts"
Cohesion: 0.33
Nodes (4): documentMetadataSchema, DocumentMetadataValues, validValues, TYPES_DOCUMENT

### Community 57 - "Button"
Cohesion: 0.38
Nodes (6): ClassificationStep(), DetailsStep(), SuccessStep(), Button(), NewDocumentFlowController, academicYearOptions()

### Community 60 - "academic.test.ts"
Cohesion: 0.29
Nodes (5): filieres, niveaux, semestres, ues, ACADEMIC_DATA

### Community 61 - "document-detail-page.tsx"
Cohesion: 0.09
Nodes (19): DocumentActionBar(), DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS, DocumentMobileBar(), DocumentOptionsSheet(), DocumentPreview(), PdfViewer (+11 more)

### Community 62 - "next"
Cohesion: 0.17
Nodes (10): LoginForm(), LoginScreen(), RegisterForm(), ProfileLocked(), useNextPath(), AUTH_PATHS, getSafeNextPath(), withNextPath() (+2 more)

### Community 64 - "DocumentReportDialog"
Cohesion: 1.00
Nodes (3): DocumentReportDialog(), getFocusableElements(), handleKeyDown()

### Community 66 - "auth-modal.tsx"
Cohesion: 0.20
Nodes (3): AuthModal(), ForgotPasswordScreen(), useAppShellInert()

### Community 67 - "cn"
Cohesion: 0.28
Nodes (9): Breadcrumb(), BreadcrumbItem, CategoryCard(), CategoryCardSkeleton(), ICONS, Carousel(), ReadMoreText(), cn() (+1 more)

### Community 68 - "auth-select.tsx"
Cohesion: 0.27
Nodes (9): AuthSelect(), handleKeyDown(), openList(), selectActiveOption(), selectOption(), updatePlacement(), AuthSelectOption, AuthSelectProps (+1 more)

### Community 75 - "OnboardingFlow"
Cohesion: 0.40
Nodes (3): OnboardingFlow(), handleContinue(), handleFinish()

### Community 76 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): metadata, satoshi, Providers()

## Knowledge Gaps
- **366 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+361 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 475 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `ue-filters.tsx`, `ue-documents-content.tsx`, `documents-content.tsx`, `pdf-viewer.tsx`, `web/package.json`, `edit-profile-content.tsx`, `lucide-react`, `search-filters.tsx`, `use-new-document-flow.ts`, `routes.ts`, `register-screen.tsx`, `document-report-dialog.tsx`, `lib/document-upload.ts`, `forgot-password-screen.tsx`, `api/documents.ts`, `Button`, `document-detail-page.tsx`, `next`, `auth-modal.tsx`, `cn`, `auth-select.tsx`, `app/layout.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `ue-filters.tsx`, `ue-documents-content.tsx`, `documents-content.tsx`, `pdf-viewer.tsx`, `src/index.ts`, `document-detail.ts`, `edit-profile-content.tsx`, `lucide-react`, `search-filters.tsx`, `routes.ts`, `register-screen.tsx`, `react`, `document-report-dialog.tsx`, `lib/document-upload.ts`, `forgot-password-screen.tsx`, `api/documents.ts`, `Button`, `document-detail-page.tsx`, `DocumentReportDialog`, `auth-select.tsx`, `OnboardingFlow`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `ue-documents-content.tsx`, `documents-content.tsx`, `cn`, `document-detail.ts`, `web/package.json`, `app/layout.tsx`, `edit-profile-content.tsx`, `forgot-password-screen.tsx`, `search-filters.tsx`, `routes.ts`, `document-detail-page.tsx`, `register-screen.tsx`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _366 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ue-documents-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `documents-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06881287726358148 - nodes in this community are weakly interconnected._
- **Should `handlers.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05671466353217749 - nodes in this community are weakly interconnected._