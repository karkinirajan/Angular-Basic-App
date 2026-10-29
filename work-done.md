# Work done: Angular-Basic-App

Branch: `chore/modernize` (local, not pushed). Date: 2026-10-29. The repo had no uncommitted work.

## What was there
An Angular 13 app (NgModules, Karma/Jasmine, 2021 dependencies) with two pages over a JSON file of students. Bootstrap 4, jQuery and Popper loaded from CDNs inside `app.component.html`; the "search" input on both pages did nothing; the GPA page showed `NaN` for a student with zero credit hours; `RouterModule.forRoot` was declared twice with route tracing on; the same `Student` interface was copy-pasted into two components; no `.gitignore`. The README was the CLI boilerplate.

## Approach
Angular 13 to current would mean about nine sequential major upgrades. For a two-component app it was safer to generate a fresh Angular 22 project (CLI 22.2.5) and port the code onto it, keeping the pages, routes and visible behavior.

## Changes by file
| File | Before | Change |
|---|---|---|
| `package.json`, `package-lock.json`, `angular.json`, `tsconfig*.json`, `public/`, `src/main.ts`, `src/index.html`, `src/styles.css`, `src/app/app.config.ts` | Angular 13 config and bootstrap | Replaced by the Angular 22 scaffold (standalone, zoneless, new application builder); `strict` and `resolveJsonModule` enabled; Bootstrap 5 added as an npm dependency and wired into `angular.json` |
| `karma.conf.js`, `src/test.ts`, `src/polyfills.ts`, `src/environments/*` | Karma test setup, polyfills, unused environments | Deleted (Vitest + jsdom now; nothing referenced the environments) |
| `src/app/app.module.ts`, `app-routing.module.ts` | two `forRoot` calls, tracing on | Deleted; routes in `app.routes.ts` with page titles and a fallback redirect |
| `src/app/app.component.*` | CDN stylesheet and scripts in the template; `routerLink=''` | `app.ts` / `app.html`: Bootstrap 5 navbar with active-link highlighting and a signal-driven collapse toggle (no jQuery) |
| `src/app/components/home/*`, `components/gpa/*` | `any`-typed copy-pasted `Student` interface; JSON strings used directly; dead search input | `src/app/home/` and `src/app/gpa/`: standalone components using `@for`/`@empty`, working search, typed data |
| `src/assets/students.json` | in assets | Moved (git mv) to `src/app/students/students.json` |
| `src/app/students/student.ts` | absent | New: `Student` type, `parseStudents`, `gpa`, `formatGpa` (en dash when there are no credit hours), `filterStudents` |
| `*.spec.ts` | four generated boilerplate specs | 13 tests: helpers, both pages, app shell |
| `.gitignore`, `.nvmrc`, `.prettierrc`, `.github/workflows/ci.yml` | absent | New (without a `.gitignore`, `git add -A` would have staged `node_modules`) |
| `README.md` | Angular CLI boilerplate | Rewritten for this app |
| `VERSIONS.md`, `work-done.md` | absent | New |

## Verification (actual runs)
- `npm run test:ci`: 13 tests passed (Vitest 5.0.5, jsdom).
- `npm run format:check`: clean.
- `npm run build`: production build succeeded (initial total 463.58 kB raw, 86.02 kB transfer).
- Not run: the app in a real browser (no Chrome available here); visual comparison against the old UI.

## Needs your attention
- Visual details differ slightly because Bootstrap went from 4 to 5 (for example `ml-`/`mr-` utilities became `ms-`/`me-`).
- The data is a static JSON file; the original had no backend either.
- The Angular 22 LTS status was not verified.
- Nothing pushed. To publish: `git push -u origin chore/modernize`
