# AGENTS.md - Règles du projet UL Docs

## 🎯 Contexte du projet

Plateforme de partage de documents pour l'Université de Lomé.
Stack : Next.js (App Router), TypeScript, Tailwind CSS, Express, Prisma.
Architecture : Monorepo (apps/web pour le front, apps/api pour le back).

## 🎨 DESIGN SYSTEM (RÈGLE ABSOLUE)

Toutes les interfaces doivent suivre strictement les tokens ci-dessous.
**INTERDICTION** d'inventer des couleurs, des polices ou des espacements.

### Couleurs (Tailwind)

- Primaire (Primary) : `bg-blue-600` / `text-blue-600` (Adapter avec tes vrais codes hex)
- Secondaire (Secondary) : `bg-gray-800`
- Fond (Background) : `bg-white` ou `bg-gray-50`
- Texte (Foreground) : `text-gray-900`
- Erreur : `text-red-600`
- Succès : `text-green-600`

### Typographie

- Police principale : `Inter` (ou la tienne, ex: Poppins)
- Titres (H1) : `text-3xl font-bold`
- Sous-titres (H2) : `text-2xl font-semibold`
- Corps de texte : `text-base text-gray-700`
- Petits textes : `text-sm text-gray-500`

### Espacements (Tailwind)

- Sections : `py-12` ou `py-16`
- Entre les éléments d'un formulaire : `space-y-4`
- Padding des cartes : `p-6`
- Gap grille : `gap-6`

## 🏗️ Architecture Frontend (apps/web)

- Utilise **exclusivement** le App Router (`app/`).
- Les composants UI réutilisables vont dans `components/ui/`.
- Les composants de layout (Header, Footer) vont dans `components/shared/`.
- Les appels API se font depuis `lib/api.ts`. **Ne jamais** appeler `fetch` directement dans les composants si possible.
- Utilise `lucide-react` pour les icônes.

## 🚫 Règles pour l'IA

- Ne génère pas de CSS custom, utilise **uniquement** les classes Tailwind.
- Ne crée pas de nouveaux dossiers sans raison.
- Si tu as besoin d'une donnée qui vient du backend, crée d'abord un mock dans `lib/mock-data.ts` avant d'implémenter l'appel réel.
- Respecte scrupuleusement le design system ci-dessus.
