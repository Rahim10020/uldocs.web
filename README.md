# uldocs

Lome university docs plateform created by students for students

## Structure

- `apps/api/` — Express API server
- `apps/web/` — Next.js frontend
- `packages/shared/` — Shared TypeScript types used across all apps

## Getting started

1. Copy `apps/api/.env.example` to `apps/api/.env` and fill in the values
2. Run `pnpm install`
3. Run `pnpm dev` to start all apps

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps concurrently |
| `pnpm build` | Build all packages and apps |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | Type-check all packages |
| `pnpm check` | Lint with Biome |
| `pnpm format` | Lint and auto-fix with Biome |

## Shared types

The `packages/shared` package contains shared TypeScript types (API request/response shapes, etc.) used by all apps.

### Adding a new type

1. Add your type to `packages/shared/src/api.ts` (or create a new file)
2. Export it from `packages/shared/src/index.ts`
3. Import it in any app:

```ts
import type { ApiResponse } from "shared";
```

## AI/LLM Guidelines

This project includes an `AGENTS.md` file with coding conventions, naming rules, and project structure guidelines. Any AI tool will automatically pick these up. Edit `AGENTS.md` to customize how AI assistants write code in this project.
