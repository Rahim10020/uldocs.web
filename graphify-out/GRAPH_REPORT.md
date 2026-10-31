# Graph Report - uldocs  (2026-10-31)

## Corpus Check
- 227 files · ~164,652 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1116 nodes · 2728 edges · 51 communities (38 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a79959d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- academic-selection.ts
- filiere-detail-content.tsx
- src/index.ts
- mocks/documents.ts
- biome.json
- compilerOptions
- Contrat d'API — UL Docs
- pdf-viewer.tsx
- web/package.json
- package.json
- Règles du projet UL Docs
- shared/package.json
- tasks
- ue-documents-content.tsx
- compilerOptions
- **Methode de remplissage de la matrice**
- api/package.json
- app.ts
- compilerOptions
- api.ts
- devDependencies
- routes/documents.ts
- button.tsx
- uldocs
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
- users.ts
- use-new-document-flow.ts
- register-screen.tsx
- cn
- react

## God Nodes (most connected - your core abstractions)
1. `cn()` - 92 edges
2. `react` - 58 edges
3. `lucide-react` - 50 edges
4. `routes` - 37 edges
5. `mockRequest()` - 27 edges
6. `useNewDocumentFlow()` - 25 edges
7. `Container()` - 24 edges
8. `next` - 22 edges
9. `useAcademicTree()` - 20 edges
10. `ApiError` - 20 edges

## Surprising Connections (you probably didn't know these)
- `PageThumbnail()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/page-thumbnail-rail.tsx → apps/web/lib/utils.ts
- `PreviewFallback()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `PdfPageSkeleton()` --calls--> `cn()`  [EXTRACTED]
  apps/web/app/(main)/documents/[id]/components/pdf-viewer.tsx → apps/web/lib/utils.ts
- `NewDocumentAuthGate()` --calls--> `withNextPath()`  [EXTRACTED]
  apps/web/app/(main)/documents/nouveau/components/new-document-flow.tsx → apps/web/lib/next-path.ts
- `MyDocumentsLocked()` --calls--> `withNextPath()`  [EXTRACTED]
  apps/web/app/(main)/profil/documents/components/my-documents-content.tsx → apps/web/lib/next-path.ts

## Import Cycles
- None detected.

## Communities (51 total, 2 thin omitted)

### Community 0 - "academic-selection.ts"
Cohesion: 0.50
Nodes (3): AcademicSelection, ProfileAcademicInfo, FaculteTree

### Community 1 - "filiere-detail-content.tsx"
Cohesion: 0.06
Nodes (44): CategoryDetailContent(), CategoryDetailSkeleton(), SKELETON_KEYS, CategoryPageProps, metadata, FiliereDetailContent(), FiliereDetailSkeleton(), SKELETON_KEYS (+36 more)

### Community 2 - "src/index.ts"
Cohesion: 0.07
Nodes (42): ContributeSection(), FAQ_ITEMS, FaqSection(), HomeContent(), DocumentFavoriteRow(), DocumentSection(), DocumentSectionProps, Accordion() (+34 more)

### Community 3 - "mocks/documents.ts"
Cohesion: 0.11
Nodes (30): getUeContextByName(), BASE_UPLOAD, buildDocuments(), compare(), CreateMockDocumentInput, defaultTitle(), DocumentSpec, FAVORITE_IDS (+22 more)

### Community 5 - "biome.json"
Cohesion: 0.08
Nodes (25): source, assist, actions, enabled, css, parser, files, ignoreUnknown (+17 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Contrat d'API — UL Docs"
Cohesion: 0.11
Nodes (18): 1. Conventions, 2. Mapping SQL → API, 3. Enums (valeurs figées), 4.1 `DocumentListItem`, 4.2 `DocumentDetail`, 4.3 `DocumentSearchParams`, 4.4 Arbre académique, 4. DTO publiques (+10 more)

### Community 9 - "pdf-viewer.tsx"
Cohesion: 0.05
Nodes (51): DocumentPreview(), PdfViewer, VIEWER_THUMBNAIL_SKELETON_KEYS, DocumentReaction(), vote(), ReactionVariant, VOTES, DocumentTop() (+43 more)

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

### Community 16 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, dependsOn, cache, persistent, $schema, tasks, build (+6 more)

### Community 17 - "ue-documents-content.tsx"
Cohesion: 0.05
Nodes (50): DocumentsContent(), EmptyResults(), SUGGESTIONS, NewDocumentAuthGate(), NewDocumentFlow(), NewDocumentForm(), metadata, metadata (+42 more)

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

### Community 24 - "api.ts"
Cohesion: 0.09
Nodes (29): ApiResponse, DocumentCreatePayload, DocumentReactionPayload, PaginatedResponse, UpdateProfilePayload, Document, Enseignant, Faculte (+21 more)

### Community 25 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, supertest, tsx, @types/cors, @types/express, @types/node, @types/supertest, typescript (+1 more)

### Community 26 - "routes/documents.ts"
Cohesion: 0.36
Nodes (7): getReaction(), getState(), reactions, ReactionState, setReaction(), DocumentReaction, VOTES_DOCUMENT

### Community 27 - "button.tsx"
Cohesion: 0.07
Nodes (32): AuthMobileTopBar(), Hero(), FavoritesContent(), FavoritesList(), SKELETON_KEYS, metadata, UeDocumentsEmpty(), DesktopAccountMenu() (+24 more)

### Community 29 - "uldocs"
Cohesion: 0.25
Nodes (7): Adding a new type, AI/LLM Guidelines, Commands, Getting started, Shared types, Structure, uldocs

### Community 31 - "Product Brief : UL Docs"
Cohesion: 0.29
Nodes (6): 🚫 Ce que nous ne sommes PAS (Non-objectifs), 🎯 La Vision, 🔄 Le Parcours Utilisateur (Le Flow Idéal), 💡 Les Principes Directeurs (UX & Produit), 👥 Les Utilisateurs Cibles, Product Brief : UL Docs

### Community 32 - "handlers.ts"
Cohesion: 0.20
Nodes (21): request(), ApiError, getUeContext(), createMockDocument(), recordMockDownload(), setMockFavorite(), delay(), mockRequest() (+13 more)

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

### Community 43 - "users.ts"
Cohesion: 0.13
Nodes (14): mockAcademic, analyses, anglais, CURRENT_USER, droitPrive, economie, genieLogiciel, getMockSessionUser() (+6 more)

### Community 44 - "use-new-document-flow.ts"
Cohesion: 0.05
Nodes (49): ClassificationStep(), UploadStep(), getUploadErrorMessage(), UploadDocumentsVariables, UploadMetadata, useCreateDocuments(), createDefaultValues(), mergeCreated() (+41 more)

### Community 48 - "register-screen.tsx"
Cohesion: 0.05
Nodes (49): AuthDialog(), getFocusableElements(), handleKeyDown(), AuthDialogProps, AuthLink(), AuthModal(), ForgotPasswordScreen(), LoginForm() (+41 more)

### Community 57 - "cn"
Cohesion: 0.05
Nodes (59): CategoriesContent(), CATEGORY_TYPE_LABELS, CATEGORY_TYPE_OPTIONS, SKELETON_KEYS, metadata, DocumentActionBar(), DocumentDownloadButton(), DownloadVariant (+51 more)

### Community 66 - "react"
Cohesion: 0.07
Nodes (28): metadata, satoshi, SearchFilters(), SearchFiltersProps, SheetOptions, DocumentDetailPage(), DocumentDetailSkeleton(), SIMILAR_SKELETON_KEYS (+20 more)

## Knowledge Gaps
- **359 isolated node(s):** `name`, `private`, `type`, `dev`, `build` (+354 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 465 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filiere-detail-content.tsx`, `src/index.ts`, `pdf-viewer.tsx`, `web/package.json`, `use-new-document-flow.ts`, `register-screen.tsx`, `ue-documents-content.tsx`, `cn`, `button.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `filiere-detail-content.tsx`, `src/index.ts`, `react`, `pdf-viewer.tsx`, `use-new-document-flow.ts`, `register-screen.tsx`, `ue-documents-content.tsx`, `button.tsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `useNewDocumentFlow()` connect `use-new-document-flow.ts` to `ue-documents-content.tsx`, `filiere-detail-content.tsx`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `name`, `private`, `type` to the rest of the system?**
  _359 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filiere-detail-content.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06400409626216078 - nodes in this community are weakly interconnected._
- **Should `src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07459505541346974 - nodes in this community are weakly interconnected._
- **Should `mocks/documents.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10795454545454546 - nodes in this community are weakly interconnected._