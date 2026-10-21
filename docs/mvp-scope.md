# Definition du perimetre (MVP)

Ce qu’on fais dans la V1 et ce qu’on laisse pour plus tard

## **Methode de remplissage de la matrice**

1. **Sans elle, le produit ne fonctionne pas du tout ?** → Must
2. **Elle est importante mais on peut vivre sans au lancement ?** → Should
3. **Ce serait un plus, plus tard ?** → Could
4. **Hors périmètre pour l'instant ?** → Won't

### Authentification

| Fonctionnalite           | Description                               | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| ------------------------ | ----------------------------------------- | --------- | ------------ | --------- | ---------------------- |
| Inscription par email    | Créer un compte avec email + mot de passe | ✅        |              |           |                        |
| Connexion / Déconnexion  | Session utilisateur                       | ✅        |              |           |                        |
| Mot de passe oublié      | Réinitialisation par email                | ✅        |              |           |                        |
| Vérification email       | Confirmer l'adresse email                 |           | ✅           |           |                        |
| Vérification étudiant UL | Numéro de carte d’étudiant                |           |              | ✅        |                        |
| Profil utilisateur       | Nom, faculté, filière, niveau, avatar     | ✅        |              |           |                        |
| Modification profil      | Éditer ses infos                          | ✅        |              |           |                        |
| Suppression de compte    | Droit à l'oubli                           |           | ✅           |           |                        |
| Connexion sociale        | Google / Facebook                         |           |              | ✅        |                        |
| Rôles                    | Étudiant / Modérateur / Admin             | ✅        |              |           |                        |
| Double authentification  | 2FA pour modérateurs/admins               |           |              | ✅        |                        |

### Gestion des documents

| Fonctionnalite               | Description                                   | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| ---------------------------- | --------------------------------------------- | --------- | ------------ | --------- | ---------------------- |
| Upload de fichier            | Drag & drop, PDF/DOCX/images                  | ✅        |              |           |                        |
| Pré-remplissage auto         | Deviner les métadonnées depuis le nom/fichier |           | ✅           |           |                        |
| Formulaire à cascade         | Faculté→Filière→Niveau→Semestre→Matière       | ✅        |              |           |                        |
| Certification upload         | Case "je certifie avoir le droit”             | ✅        |              |           |                        |
| Brouillon d'upload           | Sauvegarder avant publication                 |           | ✅           |           |                        |
| Édition de document          | Modifier les métadonnées après upload         | ✅        |              |           |                        |
| Suppression de document      | Par l'auteur ou un admin                      | ✅        |              |           |                        |
| Versionnage                  | Historique des versions d'un doc              |           |              | ✅        |                        |
| Détection de doublons        | Alerter si un doc similaire existe            |           | ✅           |           |                        |
| Compression PDF              | Réduire le poids avant stockage               |           | ✅           |           |                        |
| Aperçu du document           | Voir les premières pages sans télécharger     | ✅        |              |           |                        |
| Extraction de texte (OCR)    | Pour la recherche dans le contenu             |           |              | ✅        |                        |
| Multi-formats                | PDF, DOCX, PPTX, images, audio ?              |           | ✅           |           |                        |
| Taille maximale              | Limite par fichier (ex : 20 Mo)               | ✅        |              |           |                        |
| Statut du document           | En attente / validé / signalé / retiré        | ✅        |              |           |                        |
| Documents "à classer”        | Zone pour docs non catégorisés                |           | ✅           |           |                        |
| Marquer comme favori         | Sauvegarder un doc pour plus tard             |           | ✅           |           |                        |
| Historique de téléchargement | Voir ce qu'on a téléchargé                    |           |              | ✅        |                        |
| Collections / Dossiers perso | Regrouper ses docs                            |           |              | ✅        |                        |

### Recherche et Navigation

| Fonctionnalite                 | Description                               | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| ------------------------------ | ----------------------------------------- | --------- | ------------ | --------- | ---------------------- |
| Barre de recherche globale     | Recherche par mot-clé                     | ✅        |              |           |                        |
| Recherche avancée              | Par matière, enseignant, année…           |           | ✅           |           |                        |
| Filtres à facettes             | Faculté, niveau, semestre, type, année    | ✅        |              |           |                        |
| Tri                            | Pertinence, récent, populaire, mieux noté | ✅        |              |           |                        |
| Auto-complétion                | Suggestions pendant la frappe             |           | ✅           |           |                        |
| Tolérance aux fautes           | "droit civl" trouve "droit civil”         |           | ✅           |           |                        |
| Alias / synonymes              | "DC" = "Droit civil”                      |           | ✅           |           |                        |
| Navigation par arborescence    | Parcourir Faculté→Matière                 | ✅        |              |           |                        |
| Page matière dédiée            | Tous les docs d'une matière               | ✅        |              |           |                        |
| Page enseignant                | Tous les docs d'un enseignant             |           |              | ✅        |                        |
| Recherche par année académique | Filtrer sur 2020-2021 etc.                | ✅        |              |           |                        |
| Recommandations                | "Docs similaires”                         |           |              | ✅        |                        |
| Recherche vocale               | Sur mobile                                |           |              |           | ✅                     |
| Historique de recherche        | Retrouver ses recherches                  |           |              | ✅        |                        |

### Interaction et communaute

| Fonctionnalite              | Description                   | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| --------------------------- | ----------------------------- | --------- | ------------ | --------- | ---------------------- |
| Notation (étoiles)          | Noter un document             |           | ✅           |           |                        |
| Commentaires                | Discuter sous un doc          |           |              | ✅        |                        |
| Réponses aux commentaires   | Fil de discussion             |           |              | ✅        |                        |
| Like / vote utile           | Remonter les bons docs        |           | ✅           |           |                        |
| Partage de lien             | Partager un doc               | ✅        |              |           |                        |
| Partage sur réseaux sociaux | WhatsApp, Facebook            |           | ✅           |           |                        |
| Suivre un contributeur      | Voir ses nouveaux uploads     |           |              | ✅        |                        |
| Badges / gamification       | Récompenser les contributeurs |           | ✅           |           |                        |
| Classement contributeurs    | Top uploaders du mois         |           |              | ✅        |                        |
| Demande de document         | "Qui a le sujet de X ?”       |           |              | ✅        |                        |
| Messagerie interne          | Filtrer sur 2020-2021 etc.    |           |              |           | ✅                     |
| Forum                       | "Docs similaires”             |           |              |           | ✅                     |

### Moderation et confiance

| Fonctionnalite               | Description                               | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| ---------------------------- | ----------------------------------------- | --------- | ------------ | --------- | ---------------------- |
| Signaler un document         | Bouton sur chaque doc                     | ✅        |              |           |                        |
| Motifs de signalement        | Contenu illégal, erreur, doublon…         | ✅        |              |           |                        |
| File de signalements         | Interface modérateur                      | ✅        |              |           |                        |
| Actions de modération        | Valider / retirer / demander précision    | ✅        |              |           |                        |
| Sanctions graduées           | Avertissement → suspension → ban          | ✅        |              |           |                        |
| Journal d'audit              | Qui a fait quoi, quand                    | ✅        |              |           |                        |
| Notifications modérateurs    | Alerte en cas de signalement              |           | ✅           |           |                        |
| Modération par les pairs     | Étudiants de confiance par faculté        |           | ✅           |           |                        |
| Filtrage automatique         | Mots-clés interdits, extensions           |           | ✅           |           |                        |
| Scan antivirus               | Vérifier les fichiers uploadés            |           | ✅           |           |                        |
| Retrait sur demande d'auteur | Process DMCA-like                         | ✅        |              |           |                        |
| Charte de contribution       | Règles claires, acceptées à l'inscription | ✅        |              |           |                        |
| Page "Signaler un problème”  | Contact pour ayants droit                 |           | ✅           |           |                        |

### Profil et Tableau de bord

| Fonctionnalite        | Description                   | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| --------------------- | ----------------------------- | --------- | ------------ | --------- | ---------------------- |
| Mes uploads           | Liste de ses documents        | ✅        |              |           |                        |
| Statistiques perso    | Vues, téléchargements, notes  |           | ✅           |           |                        |
| Mes favoris           | Docs sauvegardés              |           | ✅           |           |                        |
| Mes téléchargements   | Historique                    |           |              | ✅        |                        |
| Notifications         | Nouveaux docs dans sa filière |           | ✅           |           |                        |
| Paramètres de compte  | Préférences, langue           | ✅        |              |           |                        |
| Photo de profil       | Avatar                        |           | ✅           |           |                        |
| Badge de contributeur | Statut visible                |           | ✅           |           |                        |

### Experience et Contenu Editorial

| Fonctionnalite          | Description                      | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| ----------------------- | -------------------------------- | --------- | ------------ | --------- | ---------------------- |
| Page d'accueil          | Recherche + populaires + récents | ✅        |              |           |                        |
| Sections thématiques    | "Top annales", "Nouveautés”      |           | ✅           |           |                        |
| Page "À propos”         | Présentation du projet           | ✅        |              |           |                        |
| FAQ                     | Questions fréquentes             |           | ✅           |           |                        |
| Guide "Comment scanner” | Aide à la qualité                |           | ✅           |           |                        |
| Blog / actualités       | Pour le SEO et la comm, langue   |           |              | ✅        |                        |
| Newsletter              | Infos aux inscrits               |           |              | ✅        |                        |
| Mode sombre             | Confort visuel                   |           |              | ✅        |                        |
| Multilingue             | FR + EN                          |           |              | ✅        |                        |

### Technique et Performance

| Fonctionnalite     | Description                  | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| ------------------ | ---------------------------- | --------- | ------------ | --------- | ---------------------- |
| Responsive design  | Mobile-first                 | ✅        |              |           |                        |
| PWA (installable)  | Ajouter à l'écran d'accueil  |           | ✅           |           |                        |
| Mode hors-ligne    | Lire sans connexion          |           |              | ✅        |                        |
| Compression images | Réduire le poids             |           | ✅           |           |                        |
| CDN                | Distribution rapide          |           | ✅           |           |                        |
| Cache              | Pages rapides                |           | ✅           |           |                        |
| SEO                | Être trouvable sur Google    |           | ✅           |           |                        |
| Sitemap            | Pour les moteurs             |           |              | ✅        |                        |
| Accessibilité      | Contrastes, lecteurs d'écran |           | ✅           |           |                        |
| Analytics          | Mesurer l'usage              | ✅        |              |           |                        |
| Monitoring erreurs | Détecter les bugs            | ✅        |              |           |                        |
| Sauvegardes        | Backup régulier              | ✅        |              |           |                        |

### Monetisation (Plus tard)

| Fonctionnalite     | Description             | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| ------------------ | ----------------------- | --------- | ------------ | --------- | ---------------------- |
| Publicités locales | Petites annonces        |           |              | ✅        |                        |
| Compte premium     | Sans pub, avantages     |           |              | ✅        |                        |
| Dons               | Soutenir le projet      |           |              | ✅        |                        |
| Partenariats       | Avec écoles, librairies |           |              | ✅        |                        |
| Vente de docs      | Payant à l'acte         |           |              |           | ✅                     |

### Administration

| Fonctionnalite            | Description                      | Must (V1) | Should(V1.5) | Could(V2) | Won’t (pour l’instant) |
| ------------------------- | -------------------------------- | --------- | ------------ | --------- | ---------------------- |
| Dashboard admin           | Vue d'ensemble                   | ✅        |              |           |                        |
| Gestion utilisateurs      | Voir, bannir, promouvoir         | ✅        |              |           |                        |
| Gestion documents         | Éditer, retirer                  | ✅        |              |           |                        |
| Gestion facultés/filières | Ajouter, modifier l'arborescence | ✅        |              |           |                        |
| Gestion signalements      | Traiter la file                  | ✅        |              |           |                        |
| Gestion tags              | Créer, fusionner                 |           | ✅           |           |                        |
| Statistiques globales     | Uploads, users, téléchargements  |           | ✅           |           |                        |
| Export de données         | CSV des docs/users               |           |              | ✅        |                        |
| Gestion des rôles         | Permissions fines                |           | ✅           |           |                        |
| Annonces plateforme       | Bandeau d'info                   |           |              | ✅        |                        |
