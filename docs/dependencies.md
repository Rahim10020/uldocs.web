# Dépendances autorisées du projet

## Frontend (`apps/web`)

- **UI** : Tailwind CSS pur (pas de librairie de composants externe).
- **Icônes** : `lucide-react`
- **Formulaires** : `react-hook-form`, `zod`, `@hookform/resolvers`
- **Data Fetching** : `@tanstack/react-query`
- **PDF** : `react-pdf`
- **Utilitaires** : `clsx`, `tailwind-merge`

## Backend (`apps/api`)

- **Framework** : Express, `cors`, `helmet` (sécurité)
- **Base de données** : Prisma, `@prisma/client`
- **Auth** : `jsonwebtoken`, `bcryptjs`
- **Upload** : `multer` (pour recevoir les fichiers)
- **Stockage** : `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner` (pour Cloudflare R2)

## Règle stricte

Si une tâche nécessite une dépendance qui n'est pas dans cette liste :

1. Ne l'installe pas de toi-même.
2. Demande-moi la permission de l'ajouter à cette liste.
