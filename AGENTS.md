# AGENTS.md

## Purpose
This guide helps coding agents work safely and consistently in this repository.
It captures the current command surface and enforced style rules.

## Project Snapshot
- Stack: Expo + React Native + TypeScript.
- Package manager: `pnpm` (`pnpm-lock.yaml` present).
- Node: `>=20.0.0` (`engine-strict=true` in `.npmrc`).
- State: MobX stores with decorators (`@observable`, `@action`).
- Runtime validation: Zod schemas in stores.
- Localization: `i18n-js` + `locales/*.json`.
- Error/event tracking wrapper: `src/helpers/analytics.ts`.

## Install And Setup
- CI-style install: `pnpm install --frozen-lockfile`
- Local install: `pnpm install`

## Development Commands
- Expo dev server: `pnpm start`
- Dev client with watchman reset: `pnpm dev`

## Validation Commands

### Typecheck
- Full typecheck: `pnpm run check:tsc`

### Lint
- Full lint (with fix): `pnpm run check:lint`
- SARIF output for CI/security: `pnpm run check:sarif`
- Single file lint:
  - `pnpm eslint ./src/path/to/file.ts --fix`
  - `pnpm eslint ./src/path/to/file.tsx --fix`

### Tests (Important)
- There is no configured Jest/Vitest/Mocha test runner in this repo today.
- `package.json` currently has no `test` scripts.
- Running a single test is therefore **not available** yet.
- Closest per-file verification is single-file ESLint (commands above).

## Suggested Agent Workflow
When editing code, use this order unless task instructions differ:
1. Apply focused code changes.
2. Lint touched files directly.
3. Run full lint (`pnpm run check:lint`).
4. Run full typecheck (`pnpm run check:tsc`).

## Code Style Rules (Enforced)

### Imports
- Prefer named exports for app code.
- Default exports are disallowed in `src/**`.
- Sort imports by groups: builtin, external, internal, parent, sibling.
- Keep one blank line between import groups.
- Keep `react`/`react-native` first within external group.
- Use `import type` for type-only imports.
- Do not keep duplicate imports.
- Remove unused imports/vars (`unused-imports` plugin enforced).

### Formatting
- Indent with 2 spaces.
- Use double quotes.
- Do not use semicolons.
- Require trailing commas for multiline literals/types.
- Use no spacing inside object braces (`{foo: bar}`).
- Keep Unix line endings.
- Keep lines readable; 120-char max length is warning-level.

### TypeScript
- `strict` mode is enabled and should remain enabled.
- `noImplicitAny`, `strictNullChecks`, and unused checks are enabled.
- All functions must have explicit return types.
- Use `type`, not `interface` (`consistent-type-definitions`).
- Avoid `any`; prefer `unknown` + safe narrowing.
- Keep JSON module usage typed (`resolveJsonModule=true`).

### React / React Native
- Use functional components.
- Use `memo` for stable/expensive components when appropriate.
- Follow hook rules and exhaustive deps.
- Keep screen/navigation params strongly typed via `src/navigation/types.ts`.

### MobX Store Conventions
- Call `makeObservable(this)` in constructors.
- Mark observable state with `@observable`.
- Mark mutating methods with `@action`.
- Keep async initialization in `init()` and invoke with `void this.init()`.
- Persist store state via `src/helpers/storage.ts`.

### Naming Conventions
- Components/classes/stores: PascalCase (`SkillsStore`, `HomeScreen`).
- Variables/functions/methods: camelCase.
- Hooks: `useXxx` (`useBootstrapApp`, `useKeyboard`).
- Constants: UPPER_SNAKE_CASE for fixed constants (`STORAGE_KEY`).
- Navigation route names: explicit and descriptive.

### Error Handling And Logging
- Wrap async I/O and persistence operations in `try/catch`.
- Report caught errors with `analytics.trackError(error)`.
- Throw `Error` for hard invariants (for example missing env keys).
- Avoid `console.log` in production paths; lint only allows warn/error.

### Async Patterns
- Use `void` for intentional fire-and-forget promises.
- Use `finally` for cleanup and restoring loading/ready state.
- Keep side effects explicit in async flows.

### Localization
- Use helpers from `src/helpers/i18n.ts` (`__t`, `__date`, `__day`, `__create`).
- Prefer locale keys over hardcoded user-facing strings.
- Keep key shape consistent across `locales/english.json` and `locales/russian.json`.

## Practical Guidance For Agents
- Follow existing file structure before introducing new abstractions.
- Keep edits minimal and aligned with local patterns.
- Add comments only when logic is non-obvious.
- Run lint fixes early to prevent import/style drift.
- Do not add default exports in app source files.

