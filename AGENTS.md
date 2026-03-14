# AGENTS.md

## Project Snapshot
- **Stack:** Expo 53 + React Native 0.79 + React 19 + TypeScript 5.8.
- **Package manager:** pnpm 10 (`pnpm-lock.yaml`). Pinned via `mise.toml`.
- **Node:** 22.21.1 (`engine-strict=true` in `.npmrc`, `save-exact=true`).
- **State:** MobX 6 stores with decorators (`@observable`, `@action`, `@computed`).
- **Runtime validation:** Zod schemas (`src/store/schemas.ts`) are the single source of truth for domain types.
- **Auth:** Clerk (`@clerk/expo` v3). Subpath imports: `@clerk/expo/token-cache`, `@clerk/expo/apple`.
- **Navigation:** React Navigation 7 native-stack.
- **Localization:** `i18n-js` 3.x + `expo-localization`. Two locales: `english.json`, `russian.json`.
- **Analytics:** `src/helpers/analytics.ts` wraps `vexo-analytics`; guarded by `__DEV__`.
- **Storage:** `expo-file-system` (not AsyncStorage). Helper in `src/helpers/storage.ts`.
- **IDs:** ULID via `ulid` monotonicFactory in `src/helpers/idGenerator.ts`.
- **No test runner configured.** No Jest/Vitest/Mocha. No `test` script in `package.json`.

## Commands
```sh
pnpm install --frozen-lockfile          # CI / agent install
pnpm install                            # local install
pnpm start                              # Expo dev server
pnpm dev                                # reset watchman + dev client
pnpm run type-check                      # typecheck (full)
pnpm run lint                     # lint (full, cached, no autofix)
pnpm run lint:fix                 # lint with autofix (full)
pnpm eslint ./src/path/to/file.tsx --fix  # lint a single file
pnpm run lint:sarif                    # SARIF output for CI
```
**Tests:** No test runner (Jest/Vitest/Mocha) is configured. No `test` script exists.
Closest per-file verification is single-file ESLint.

## Suggested Agent Workflow
1. Apply focused code changes.
2. Lint touched files: `pnpm eslint ./src/path/to/changed-file.tsx --fix`
3. Full lint: `pnpm run lint`
4. Full typecheck: `pnpm run type-check`

## Architecture

### Directory Layout
```md
src/
  App.tsx               # Root component
  colors/               # Theme colors, useThemeColor, useColorScheme
  components/           # Shared UI: Screen, Button, Card, Header, Modal, etc.
  constants/            # Layout, timings, default styles
  features/             # Domain features grouped by area (auth, skills, workout, workouts, stats, sync)
  helpers/              # analytics, i18n, storage, idGenerator, createStaticStyles
  hooks/                # useBoolean, useBootstrapApp, useKeyboard, useSendSwipeEvent
  json/                 # Static JSON data (skills catalog)
  navigation/           # Navigators, route types, useNavigate, useParams
  screens/              # One file per screen (HomeScreen, StatsScreen, etc.)
  store/                # MobX stores, Zod schemas, StoresProvider
  types/                # Global type declarations (image modules)
```

### MobX Store Pattern
Every synced store follows this shape:
- Constructor receives `Stores` (cross-store dependency injection), calls `makeObservable(this)`.
- `@observable` on state fields, `@action` on every method that mutates state.
- Private `@action` setters called by public methods.
- `getSnapshot()` / `loadSnapshot(snapshot)` / `reset()` triad for persistence.
- `loadSnapshot` validates data with Zod `.parse()` before applying.
- `Stores` class in `src/store/Stores.ts` instantiates all stores and wires dependencies.

### Zod Schema Conventions
- All domain types derived via `z.infer<typeof schema>` in `src/store/schemas.ts`.
- API DTOs and conversion functions (`toSyncRequest`, `toAppSaveSnapshot`) colocated there.

### Context / Hook Pattern
- `StoresContext` created via `createContext<Stores | null>(null)`.
- `useStores()` uses React 19 `use()` hook; throws if called outside provider.
- `createStores()` uses singleton pattern.

### Screen Pattern
- Named export, no default export.
- Props typed as `NavigationProps<StackParamList, "ScreenName">` from `src/navigation/types.ts`.
- `__t()` for all user-facing strings. `useMemo` for stable derived values.

### Component Pattern
- `memo()` wrapping a named function expression.
- `createStaticStyles()` for static styles; dynamic styles merged in `useMemo`.
- Components reading MobX state use `observer()` from `mobx-react`.

## Code Style Rules (Enforced by ESLint Flat Config)

### Imports
- Named exports only in `src/**`; default exports are **errors**.
- Sort groups: builtin > external > internal > parent > sibling. Alphabetize within groups.
- One blank line between import groups and after the last import.
- `react` / `react-native` sort first within external group.
- Use `import type` for type-only imports (`verbatimModuleSyntax` enforced in tsconfig).
- No duplicate imports. Remove unused imports/vars (`unused-imports` plugin).
- Circular imports are errors (`import-x/no-cycle`, max depth 10).

### Formatting (no Prettier -- `@stylistic` plugin only)
- 2 spaces indent. Double quotes, `avoidEscape`. No semicolons.
- Trailing commas on multiline. No spacing inside object braces: `{foo: bar}`.
- Unix (LF) line endings. Max line length 120 (warning).
- Max 1 consecutive empty line; 0 at end of file. No space inside blocks.

### JSX
- Sort props alphabetically; callbacks last, reserved (`key`, `ref`) first, shorthand first.
- Max 1 prop per line. Closing bracket on same line as last prop (`after-props`).

### TypeScript
- `strict` mode enabled. Do not weaken it.
- `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters` all enabled.
- All functions should have explicit return types (except JS config files). Note: not enforced by ESLint rule, but followed by convention.
- Use `type` aliases, never `interface` (`consistent-type-definitions: type`).
- Avoid `any`; prefer `unknown` + safe narrowing.
- Prefix unused parameters with `_`.
- Template expressions restricted to `string | number` only.

### React / React Native
- Functional components only. `memo` for stable/expensive components.
- `rules-of-hooks`: error. `exhaustive-deps`: error.
- Screen/navigation params strongly typed via `src/navigation/types.ts`.

### Naming Conventions
- Components / classes / stores: **PascalCase** (`SkillsStore`, `HomeScreen`).
- Variables / functions / methods: **camelCase**. Hooks: **useXxx**.
- Constants: **UPPER_SNAKE_CASE** (`STORAGE_KEY`, `STORES_TO_SYNC`).

### Error Handling And Logging
- Wrap async I/O and persistence in `try/catch`.
- Report errors with `analytics.trackError(error)`.
- `trackError` accepts `unknown`; narrows with `instanceof Error`.
- Throw `Error` for hard invariants (e.g., missing env keys).
- No `console.log` in production; lint allows only `console.warn` and `console.error`.
- Metro strips all `console.*` in production builds (`drop_console: true`).

### Async Patterns
- Use `void` keyword for intentional fire-and-forget promises.
- Use `finally` for cleanup and restoring loading/ready state.

### Localization
- Use helpers from `src/helpers/i18n.ts`: `__t`, `__date`, `__day`, `__shortDay`, `__locale`, `__create`.
- Never hardcode user-facing strings; use locale keys.
- Keep key shape consistent across `locales/english.json` and `locales/russian.json`.

## CI Pipeline (`.github/workflows/eslint.yml`)
Two jobs on push/PR to `main` (plus weekly cron):
1. **eslint** -- runs `pnpm run lint:sarif`, uploads SARIF to GitHub Code Scanning.
2. **typecheck** -- runs `pnpm run type-check`.

## Practical Guidance For Agents
- Follow existing file structure before introducing new abstractions.
- Keep edits minimal and aligned with local patterns.
- Add comments only when logic is non-obvious.
- Run lint fixes early to prevent import/style drift.
- Do not add default exports in `src/` files.
- When creating a new store, follow the `getSnapshot`/`loadSnapshot`/`reset` pattern.
- When adding UI strings, add keys to both locale files.
- Prefix unused function params with `_` to satisfy lint.
- Use `createStaticStyles()` for static styles, `useMemo` for dynamic styles.
- No one-line blocks: `if (x) doSomething();` is an error.
- Curly braces required for all control blocks.
