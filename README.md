# Students App

An Angular app for a small student-advising demo: a table of advisees with live search, and a page with each advisee's grade point average (GPA points / credit hours, one decimal place).

## Features

- **Advisees** (`/`): id, name, credit hours, GPA points and major for every student.
- **Grade Point Averages** (`/gpa`): id, name and GPA; a student with no credit hours shows an en dash instead of `NaN`.
- Search box on both pages filters by id, first/last name, full name or major, case-insensitively, with an empty-state message.
- Navigation with active-link highlighting and an accessible collapsible menu on small screens (no jQuery or Bootstrap JS).

## Stack

Angular 22 (standalone components, signals, zoneless), TypeScript 6, Bootstrap 5 (CSS from npm), Vitest + jsdom for tests, Prettier. Versions: [VERSIONS.md](./VERSIONS.md).

## Getting started

Requires Node 26 (see `.nvmrc`; 22.22.3+ or 24.15+ also supported).

```bash
git clone https://github.com/kneeraazon404/Angular-Basic-App.git
cd Angular-Basic-App
npm ci
npm start          # http://localhost:4200
```

## Scripts

| Command | What it does |
|---|---|
| `npm start` | dev server with live reload |
| `npm run build` | production build into `dist/students-app` |
| `npm run test:ci` | run the unit tests once (Vitest) |
| `npm test` | tests in watch mode |
| `npm run format` / `npm run format:check` | Prettier write / check |

## Data

The advisees come from `src/app/students/students.json` (strings, as in the original app) and are converted to typed records by `parseStudents` in `src/app/students/student.ts`. There is no backend; replace `STUDENTS` with a service call to use real data.

## Project structure

```
src/app/
  app.ts, app.html, app.routes.ts, app.config.ts   shell, navigation and routing
  home/          advisees table + search
  gpa/           GPA table + search
  students/      student model, JSON data, parse / gpa / filter helpers (+ specs)
public/          static assets (favicon)
```

## Testing

13 tests cover the helpers (parsing, GPA maths, the zero-credit case, filtering), both pages (rendering, filtering as you type, empty state) and the app shell (links, menu toggle). CI (`.github/workflows/ci.yml`) runs format check, tests and a production build.

## License

Apache License 2.0. See [LICENSE](LICENSE).
