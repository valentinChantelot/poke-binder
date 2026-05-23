# poke-binder

Self-hosted Pokemon card collection manager. Single user, authentication required. Open source AGPL v3.

Data source: TCGDex SDK (community API — minimize requests). Backend: PocketBase (embedded, local).

## Stack

| Layer | Tech |
|-------|------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| State/cache | TanStack Query 5 |
| Lint/format | Biome 2 |
| Tests | Vitest 4 + Testing Library |
| Card data | @tcgdex/sdk 2 |
| Backend/DB/Auth | PocketBase 0.26 |

Node ≥ 24, pnpm ≥ 9.

## Architecture

```
src/
  app/              # Root component, providers
  config/           # App-level constants (locale, default set)
  features/
    {feature}/      # Component, CSS, types, query — all co-located
  lib/
    tcgdex/         # client.ts (SDK instance), index.ts (QueryOptions), mapper.ts
    pocketbase/     # client.ts (PB instance), index.ts (re-export)
  shared/
    hooks/          # Cross-feature hooks
    ui/             # Primitive UI components
pb_migrations/      # PocketBase JS migrations (timestamp-named, auto-applied)
```

**Pattern for new features:** create `src/features/{name}/` with types, query (QueryOptions), component, CSS. Never import between features directly — go through shared or lib.

**Pattern for lib integrations:** `client.ts` creates the SDK instance, `index.ts` exports QueryOptions, `mapper.ts` transforms raw API types into domain types. Never spread raw SDK types into domain types.

## Commands

```bash
pnpm dev        # Vite dev server (port 5173)
pnpm pb         # PocketBase server (.pb/pocketbase, port 8090)
pnpm check      # biome check --write (lint + format, auto-fix)
pnpm lint       # biome lint only
pnpm format     # biome format --write only
pnpm ci         # biome ci (no write — for CI gates)
pnpm test       # vitest
pnpm build      # tsc -b + vite build
```

Run `pnpm dev` and `pnpm pb` in separate terminals during development.

## Git workflow

- **Never commit directly to main** — pre-commit hook blocks it.
- Branch naming convention: `{type}_{scope}_{description}` (e.g. `feat_auth_login-screen`).
- Conventional commits enforced by commitlint:
  - `feat(scope):`, `fix(scope):`, `chore(scope):`, `refactor(scope):`, `test(scope):`, `docs(scope):`
  - Header ≤ 80 chars
  - Exemptions: Merge commits, Revert commits, `fixup!`, `squash!`
- Pre-push hook runs `tsc -b` — push is blocked on type errors.
- lint-staged runs `biome check --write` on staged `ts,tsx,js,jsx,json,css` files.

## TypeScript

`tsconfig.base.json` enables strict + extras:

| Flag | Implication |
|------|-------------|
| `exactOptionalPropertyTypes` | Don't assign `undefined` to optional props — use `Omit` or conditional assignment |
| `noUncheckedIndexedAccess` | Array/object index access returns `T \| undefined` — always guard |
| `noPropertyAccessFromIndexSignature` | Use bracket notation `obj["key"]` for index-signature types |
| `noImplicitOverride` | Must annotate overrides explicitly |

Target: ES2023. Module resolution: bundler. Path alias: `@` → `./src`.

## Biome conventions

- Naming: types/interfaces/enums → PascalCase, variables/functions/methods → camelCase
- Max cognitive complexity: 15
- Quotes: double. Semicolons: always. Trailing commas: always. Indent: 2 spaces. Line width: 80.
- A11y rules: enforced as lint errors — no skipping.
- `dangerouslySetInnerHTML`: forbidden.

## TCGDex integration

**CRITICAL: minimize API calls.** TCGDex is a free community API. Flooding it is a project values violation.

- All TCGDex fetches must go through TanStack Query (`QueryOptions` in `src/lib/tcgdex/index.ts`).
- Set `staleTime` to at least `1000 * 60 * 60 * 24` (24h) for set/card data — they change infrequently.
- Set `gcTime` generously so cache survives remounts.
- Never fetch card details speculatively — only on user intent.
- Images: always use `.webp` format. Cards: `/high.webp`. Logos: `.webp` suffix.
- Default locale: `fr` (defined in `src/config/locale.ts`, `SupportedLanguages` from SDK).
- SDK instance: `src/lib/tcgdex/client.ts`.

## PocketBase

Embedded database + auth. Binary at `.pb/pocketbase`, data at `pb_data/` (gitignored).

### First-time setup

1. Download PocketBase binary → place at `.pb/pocketbase` and make it executable.
2. `pnpm pb` — starts server at `http://localhost:8090`.
3. Visit `http://localhost:8090/_/` — create a superadmin account (one-time only).
4. In the PocketBase Admin UI → Users collection → create a regular user account for the app.
5. Migrations apply automatically on startup.

### Auth

- Auth is via the `users` collection (regular user, **not** admin/superuser).
- Single user — no multi-tenancy.
- PocketBase SDK stores auth state in `localStorage` automatically.
- All `card_entries` CRUD requires `@request.auth.id != ''`.
- PocketBase client: `src/lib/pocketbase/client.ts`.

### Migrations

- Located in `pb_migrations/`, named `{unix_timestamp}_{description}.js`.
- Applied automatically by PocketBase on startup.
- **Never edit existing migration files** — always create a new one for schema changes.
- Generate timestamp: `Date.now()` or `Math.floor(Date.now() / 1000)` (PocketBase uses seconds).

### Collections

**`card_entries`**

| Field | Type | Constraints |
|-------|------|-------------|
| `card_id` | text | required, 1–64 chars |
| `set_id` | text | required, 1–64 chars |
| `variant_id` | text | required, 1–128 chars |
| `quantity` | number | required, min 1, no decimal |
| `language` | text | required, 2–8 chars |

Unique index: `(card_id, variant_id, language)`.

## Domain types

Defined in `src/features/{feature}/types.ts`.

**Variants migration note:** `Variants` (boolean flags) is deprecated in TCGDex in favor of `VariantsDetailed`. The mapper (`src/lib/tcgdex/mapper.ts`) should fall back to `variants` if `variantsDetailed` is absent. When this mapping is complete, `Card.variants` will be removed. Do not add new code that relies on `Variants`.

**`CardSet.cards`** is `Array<LightCard>` — minimal data for list rendering. Fetch `Card` (full) only on user selection.

## Accessibility

- Biome a11y rules are enforced — treat violations as build failures.
- Every interactive element needs an accessible name.
- Card images: alt text must include card name and set/localId context.
- Full keyboard navigation required throughout.
- Color contrast must meet WCAG AA.

## Licensing (AGPL v3)

- Any public deployment of a modified version must publish source changes.
- All dependencies must be AGPL v3-compatible.
- Attribute TCGDex in the UI and README.
- Do not bundle proprietary assets.

## Environment variables

```bash
VITE_POCKETBASE_URL=http://localhost:8090
```

Defined in `.env` (gitignored). Template in `.env.example`. Only `VITE_` prefixed vars are exposed to the client.
