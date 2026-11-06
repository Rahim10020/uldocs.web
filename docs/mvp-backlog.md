# Backlog MVP — ce qu'il reste à faire

> Dernière mise à jour : 6 novembre 2026
>
> Périmètre de référence : `docs/mvp-scope.md`
> Contrat d'API : `docs/api-contract.md`
> Périmètre de code : frontend `apps/web` uniquement. Les tâches backend/infra sont signalées.

## Légende

- **P0 — Must** : bloquant pour considérer le MVP comme livré.
- **P1 — Should** : important pour la V1.5, mais le produit peut sortir sans.
- **P2 — Could** : V2.
- **Won't** : hors périmètre, ne pas coder.
- **Front** : `apps/web`.
- **API** : `docs/api-contract.md`, `apps/api`, `packages/shared`.
- **Infra** : CI/CD, stockage, monitoring, sauvegardes.
- `[ ]` à faire, `[~]` partiel, `[x]` fait.

## Résumé

Le socle étudiant / modérateur est déjà codé côté frontend et branché sur les mocks. Il reste plusieurs chantiers **Must** avant de pouvoir considérer le MVP comme terminé.

| Chantier                                                   | Priorité | Périmètre            | État                            |
| ---------------------------------------------------------- | -------- | -------------------- | ------------------------------- |
| Administration (dashboard, users, documents, arborescence) | P0       | Front + API + Shared | Absent                          |
| Édition de document                                        | P0       | Front + API + Shared | Absent                          |
| Suppression de document                                    | P0       | Front + API          | API client présente, UI absente |
| Aperçu multi-format                                        | P0       | Front + API          | PDF uniquement                  |
| Paramètres de compte                                       | P0       | Front + API + Shared | Absent                          |
| Journal d'audit                                            | P0       | Front + API + Shared | Dernière décision seulement     |
| Retrait sur demande d'auteur                               | P0       | Front + API          | Absent / page stub              |
| Action « demander précision »                              | P0       | Front + API + Shared | Absente                         |
| Analytics / monitoring / sauvegardes                       | P0       | Infra + Front        | Absent                          |

---

## P0 — Must

### P0.1 — Administration

**Objectif** : disposer d'un espace admin complet, protégé par le rôle `admin`.

- [ ] Définir / compléter le contrat d'API admin : stats, utilisateurs, documents, arborescence académique, permissions. `[API]`
- [ ] Ajouter les types `AdminStats` et les payloads admin dans `packages/shared`. `[Shared]`
- [ ] Ajouter les endpoints client et les mocks : `/admin/stats`, `/admin/users`, `/admin/documents`. `[Front]`
- [ ] Créer la route `/admin` et son layout, avec garde de rôle côté client et message d'accès refusé. `[Front]`
- [ ] Dashboard admin : compteurs globaux (utilisateurs, documents, signalements, téléchargements). `[Front]`
- [ ] Gestion utilisateurs : liste, recherche, promotion / rétrogradation, suspension, bannissement. `[Front]`
- [ ] Gestion documents : liste, filtres, édition, retrait. `[Front]`
- [ ] Gestion facultés / filières / niveaux / UE : ajout, modification, suppression. `[Front]`
- [ ] Ajouter l'entrée « Administration » dans le menu de compte pour les admins. `[Front]`
- [ ] Ajouter les tests des hooks, des mocks et des écrans admin. `[Front]`

**Notes** :

- Le contrat prévoit déjà `GET /admin/stats`, `GET /admin/users`, `PATCH /admin/users/:id` et `GET /admin/documents`.
- Il manque les endpoints d'écriture de l'arborescence académique.
- Le payload de `PATCH /admin/users/:id` n'est pas défini.
- La gestion des signalements est déjà couverte par la file de modération ; l'admin y a accès.

### P0.2 — Cycle de vie du document

**Objectif** : permettre à l'auteur ou à un admin de modifier et supprimer un document.

- [ ] Ajouter `DocumentUpdatePayload` dans `packages/shared`. `[Shared]`
- [ ] Ajouter `updateDocument(id, payload)` dans `lib/api/documents.ts`. `[Front]`
- [ ] Ajouter le mock `PATCH /documents/:id`. `[Front]`
- [ ] Créer l'écran ou la modale d'édition : titre, description, type, UE, année, langue, pages. `[Front]`
- [ ] Préremplir le formulaire avec les données du document et gérer les erreurs de validation. `[Front]`
- [ ] Brancher `deleteDocument()` sur une action réelle avec confirmation. `[Front]`
- [ ] Vérifier les permissions : auteur ou admin uniquement. `[Front][API]`
- [ ] Invalider les caches TanStack Query après édition / suppression. `[Front]`
- [ ] Ajouter les tests des hooks et des écrans. `[Front]`

**Notes** :

- `PATCH /documents/:id` est dans le contrat, mais le type partagé et l'appel client n'existent pas.
- `deleteDocument()` existe déjà dans `lib/api/documents.ts`, mais n'est utilisé nulle part.
- L'édition doit rester cohérente avec le formulaire d'upload et les valeurs de `packages/shared`.

### P0.3 — Aperçu multi-format

**Objectif** : ne pas afficher un PDF vide pour un DOCX, PPTX ou une image.

- [ ] Décider de la stratégie : URL d'aperçu PDF générée par le backend, viewer par format, ou fallback téléchargement. `[API][Front]`
- [ ] Ajouter le champ / endpoint nécessaire au contrat si le backend doit générer un aperçu. `[API]`
- [ ] Afficher un aperçu pour les images. `[Front]`
- [ ] Afficher un message clair + bouton de téléchargement pour les formats sans aperçu natif. `[Front]`
- [ ] Adapter `DocumentPreview` pour ne plus monter systématiquement `PdfViewer`. `[Front]`
- [ ] Tester les cas PDF, image et format non prévisualisable. `[Front]`

**Notes** :

- `DocumentPreview` monte actuellement `PdfViewer` pour tous les documents.
- L'upload accepte PDF, DOCX, PPTX, JPG et PNG.
- Ne pas ajouter de dépendance de conversion sans accord explicite.

### P0.4 — Modération : compléter les actions

**Objectif** : couvrir les actions prévues par le périmètre.

- [ ] Définir le contrat de « demander précision » : action dédiée ou statut `en_cours` + message. `[API]`
- [ ] Ajouter la valeur dans `ACTIONS_MODERATION` ou dans les statuts de signalement. `[Shared]`
- [ ] Ajouter l'option dans le formulaire de décision et les libellés UI. `[Front]`
- [ ] Mettre à jour le mock et les tests. `[Front]`

**Notes** :

- `ACTIONS_MODERATION` contient `valider`, `retirer`, `avertir`, `suspendre`, `bannir`.
- L'action « demander précision » n'existe pas aujourd'hui.

### P0.5 — Journal d'audit

**Objectif** : savoir qui a fait quoi et quand, au-delà de la dernière décision d'un signalement.

- [ ] Définir le contrat : `GET /admin/audit` ou `GET /moderation/audit` avec pagination et filtres. `[API]`
- [ ] Ajouter le type `AuditEntry` dans `packages/shared`. `[Shared]`
- [ ] Ajouter l'endpoint client, le mock et le hook. `[Front]`
- [ ] Créer l'écran de journal : date, acteur, action, cible, détails. `[Front]`
- [ ] Ajouter les filtres : acteur, type d'action, période. `[Front]`
- [ ] Ajouter les tests. `[Front]`

**Notes** :

- `report-decision-summary.tsx` affiche seulement l'action, le modérateur et la raison.
- La date de traitement existe dans les mocks, mais n'est pas affichée.
- Le journal global n'existe pas.

### P0.6 — Retrait sur demande d'auteur

**Objectif** : traiter une demande de retrait DMCA-like, pas seulement un signalement classique.

- [ ] Définir le contrat : formulaire public, pièces justificatives, statut de demande, endpoint admin. `[API]`
- [ ] Créer le formulaire de demande de retrait. `[Front]`
- [ ] Ajouter la file de traitement côté admin / modération. `[Front]`
- [ ] Relier le motif `droit_auteur` existant à ce process. `[Front][API]`
- [ ] Ajouter les notifications et les statuts nécessaires. `[Front][API]`
- [ ] Ajouter les tests. `[Front]`

**Notes** :

- `signaler-un-probleme/page.tsx` est un stub : le formulaire de contact est annoncé « prochainement ».
- Le motif `droit_auteur` existe déjà dans `MOTIFS_SIGNALEMENT`.

### P0.7 — Paramètres de compte

**Objectif** : couvrir les préférences et la langue, prévues en Must.

- [ ] Créer la route `/profil/parametres`. `[Front]`
- [ ] Ajouter les préférences : langue, notifications, éventuellement affichage. `[Front]`
- [ ] Définir le contrat et les types partagés. `[API][Shared]`
- [ ] Ajouter le mock et le hook de mise à jour. `[Front]`
- [ ] Ajouter le lien dans le menu de compte et le profil. `[Front]`
- [ ] Ajouter les tests. `[Front]`

**Notes** :

- Aucune page de paramètres n'existe aujourd'hui.
- La langue est actuellement forcée à `"fr"` dans l'upload.

### P0.8 — Technique Must

- [ ] Analytics : choisir l'outil, instrumenter les événements clés (inscription, upload, téléchargement, signalement). `[Front][Infra]`
- [ ] Monitoring erreurs : brancher un error boundary global et un outil de remontée. `[Front][Infra]`
- [ ] Sauvegardes : documenter et automatiser les backups de la base et du stockage. `[Infra]`

**Notes** :

- Aucun outil d'analytics ou de monitoring n'est présent.
- Les sauvegardes ne relèvent pas du frontend.
- Toute nouvelle dépendance doit être validée et ajoutée à `docs/dependencies.md`.

---

## P1 — Should (V1.5)

### Authentification et compte

- [ ] Vérification email. `[API][Front]`
- [ ] Suppression de compte / droit à l'oubli. `[API][Front]`
- [ ] Upload d'avatar. `[API][Front]`
- [ ] Notifications utilisateur (nouveaux documents dans sa filière). `[API][Front]`

**Notes** :

- L'avatar est affiché via des initiales, mais aucun upload n'existe.
- `UpdateProfilePayload` ne contient pas `avatarUrl`, alors que le contrat mentionne `avatarUrl` dans `PATCH /users/me`.

### Upload et documents

- [~] Pré-remplissage automatique : le titre depuis le nom de fichier est fait ; compléter les autres métadonnées si pertinent. `[Front]`
- [ ] Brouillon d'upload. `[Front][API]`
- [ ] Détection de doublons avant publication. `[Front][API]`
- [ ] Compression PDF avant stockage. `[API][Infra]`
- [ ] Compression des images. `[API][Infra]`
- [ ] Zone « documents à classer ». `[Front][API]`

### Recherche et navigation

- [ ] Recherche avancée (matière, enseignant, année, etc.). `[Front][API]`
- [ ] Auto-complétion. `[Front][API]`
- [ ] Tolérance aux fautes. `[API]`
- [ ] Alias / synonymes. `[API]`

**Notes** :

- La recherche globale, les filtres, le tri, l'arborescence, la page matière et le filtre par année sont déjà codés.

### Communauté

- [ ] Partage sur réseaux sociaux (WhatsApp, Facebook). `[Front]`
- [ ] Notation par étoiles : l'affichage existe, pas l'action de noter. `[Front][API]`
- [ ] Notifications modérateurs à chaque signalement. `[API][Front]`
- [ ] Modération par les pairs. `[Front][API]`
- [ ] Filtrage automatique (mots-clés, extensions). `[API]`
- [ ] Scan antivirus des fichiers uploadés. `[API][Infra]`

**Notes** :

- Le partage de lien natif et le vote utile / pas utile sont déjà codés.
- Les badges sont déjà affichés sur le profil.

### Profil

- [ ] Statistiques perso complètes : téléchargements et notes, en plus des documents / points / vues. `[Front]`
- [ ] Badge de contributeur visible sur les documents et les profils publics. `[Front]`

### Contenu éditorial

- [ ] FAQ. `[Front]`
- [ ] Guide « Comment scanner ». `[Front]`
- [ ] Formulaire de contact sur `/signaler-un-probleme`. `[Front][API]`

### Technique

- [ ] PWA installable. `[Front]`
- [ ] SEO complet : sitemap, robots, données structurées. `[Front]`
- [ ] Audit d'accessibilité (contrastes, lecteurs d'écran, navigation clavier). `[Front]`
- [ ] CDN et cache. `[Infra]`

**Notes** :

- Les métadonnées de base existent déjà sur les pages.
- Le responsive est déjà codé.

### Administration

- [ ] Gestion des tags : création, fusion. `[Front][API]`
- [ ] Statistiques globales détaillées. `[Front][API]`
- [ ] Gestion des rôles et permissions fines. `[Front][API]`

---

## P2 — Could (V2)

### Authentification

- [ ] Vérification du numéro de carte étudiant UL. `[Front][API]`
- [ ] Connexion sociale Google / Facebook. `[API][Front]`
- [ ] Double authentification pour modérateurs et admins. `[API][Front]`

### Documents

- [ ] Versionnage des documents. `[Front][API]`
- [ ] OCR / extraction de texte pour la recherche dans le contenu. `[API][Infra]`
- [ ] Historique des téléchargements. `[Front][API]`
- [ ] Collections / dossiers personnels. `[Front][API]`

### Recherche et navigation

- [ ] Page enseignant. `[Front][API]`
- [ ] Historique de recherche. `[Front][API]`
- [ ] Recommandations « documents similaires ». `[Déjà codé]`

### Communauté

- [ ] Commentaires sous les documents. `[Front][API]`
- [ ] Réponses aux commentaires. `[Front][API]`
- [ ] Suivre un contributeur. `[Front][API]`
- [ ] Classement des contributeurs (top uploaders). `[Front][API]`
- [ ] Demande de document (« Qui a le sujet de X ? »). `[Front][API]`

### Contenu et UX

- [ ] Blog / actualités. `[Front][API]`
- [ ] Newsletter. `[Front][API]`
- [ ] Mode sombre. `[Front]`
- [ ] Multilingue FR + EN. `[Front][API]`
- [ ] Mode hors-ligne. `[Front][Infra]`

### Technique et administration

- [ ] Sitemap. `[Front]`
- [ ] Export CSV des documents / utilisateurs. `[Front][API]`
- [ ] Annonces plateforme (bandeau d'info). `[Front][API]`

### Monétisation

- [ ] Publicités locales. `[Front]`
- [ ] Compte premium. `[Front][API]`
- [ ] Dons. `[Front][API]`
- [ ] Partenariats écoles / librairies. `[Business]`

---

## Won't — hors périmètre

Ne pas coder pour l'instant :

- Recherche vocale.
- Messagerie interne.
- Forum.
- Vente de documents à l'acte.

---

## Dette technique et incohérences à corriger

- [ ] `DocumentUpdatePayload` est référencé dans le contrat mais absent de `packages/shared`. `[Shared]`
- [ ] `deleteDocument()` existe mais n'est branché sur aucune UI. `[Front]`
- [ ] Le contrat mentionne `PATCH /users/me`, alors que le type partagé parle de `PATCH /auth/me`. `[API][Shared]`
- [ ] `UpdateProfilePayload` ne contient pas `avatarUrl`, alors que le contrat l'inclut. `[API][Shared]`
- [ ] `AdminStats` n'existe pas dans `packages/shared`. `[Shared]`
- [ ] Le payload de `PATCH /admin/users/:id` n'est pas défini. `[API]`
- [ ] Aucun endpoint d'écriture pour l'arborescence académique. `[API]`
- [ ] Aucun endpoint pour le journal d'audit. `[API]`
- [ ] Aucun endpoint pour le retrait sur demande d'auteur. `[API]`
- [ ] La stratégie d'aperçu multi-format n'est pas définie. `[API][Front]`
- [ ] Les permissions admin sur `PATCH /documents/:id` et `DELETE /documents/:id` ne sont pas explicites. `[API]`

---

## Ordre recommandé

1. **Contrat + types + mocks** : admin, édition document, paramètres, audit, retrait auteur, demande de précision.
2. **Administration** : shell `/admin`, stats, utilisateurs, documents.
3. **Cycle de vie document** : édition, suppression, aperçu multi-format.
4. **Modération et confiance** : demande de précision, journal d'audit, retrait auteur.
5. **Paramètres de compte**.
6. **Technique Must** : analytics, monitoring, sauvegardes.
7. **Should** : auth, upload, recherche, communauté, profil, éditorial, PWA/SEO.
8. **Could** : V2.

Ne pas commencer les Should avant d'avoir terminé les P0 admin, cycle de vie document et paramètres de compte.

---

## Definition of Done

Pour chaque fonctionnalité :

- [ ] Le contrat d'API est mis à jour si un endpoint ou un payload change.
- [ ] Les types sont dans `packages/shared`, jamais dupliqués localement.
- [ ] L'appel API est centralisé dans `apps/web/lib/api`.
- [ ] Le mock correspondant existe dans `apps/web/lib/mocks`.
- [ ] Le hook TanStack Query est créé ou réutilisé.
- [ ] L'écran gère les états chargement, erreur, vide et succès.
- [ ] L'écran est responsive mobile / desktop.
- [ ] Les couleurs viennent uniquement de `apps/web/app/globals.css`.
- [ ] Les éléments cliquables ont `cursor-pointer` (sauf les liens).
- [ ] Les règles Next.js 16 sur `params` / `searchParams` et `<Suspense>` sont respectées.
- [ ] Les tests Vitest sont ajoutés ou mis à jour.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm check` et `pnpm build` passent.
- [ ] Aucune nouvelle dépendance sans validation préalable.

---

## Déjà couvert — ne pas refaire

Côté frontend, avec les mocks :

- Inscription, connexion, déconnexion, mot de passe oublié.
- Profil, édition du profil, profil public.
- Upload multi-fichiers, cascade académique, certification, limite 20 Mo, statuts.
- Recherche globale, filtres, tri, arborescence, pages catégorie / filière / matière.
- Détail document, aperçu PDF, téléchargement, partage de lien.
- Signalement d'un document, motifs.
- File de signalements, décisions de modération, sanctions graduées.
- Favoris, votes utiles, badges, documents similaires.
- Page d'accueil, page À propos, charte de contribution.
- Responsive.

Points partiels déjà identifiés :

- Aperçu PDF seulement.
- Suppression de document non branchée.
- Journal d'audit limité à la dernière décision.
- Statistiques perso partielles.
- Page « Signaler un problème » encore stub.

---

## Contraintes de réalisation

- **Frontend uniquement** : ne pas modifier `apps/api` sans demande explicite.
- **Contrat d'abord** : toute évolution d'endpoint ou de DTO passe par `docs/api-contract.md`, puis `packages/shared`.
- **Mocks avant le réel** : créer ou compléter le mock avant de brancher l'appel réel.
- **Pas de nouvelle dépendance** sans accord ; vérifier `docs/dependencies.md`.
- **Tailwind pur** : pas de librairie de composants, pas de CSS custom, pas de `style={{}}`.
- **Biome** : tabulations, guillemets doubles, point-virgules.
- **Tests TDD** : écrire le test qui échoue, puis le code minimal.
- **Next.js 16** : ne pas lire `params` / `searchParams` hors `<Suspense>`.
- **Accessibilité** : labels, focus visible, contrastes, navigation clavier.
