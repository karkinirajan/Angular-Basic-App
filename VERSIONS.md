# Versions

Resolved in `package-lock.json` on 2026-10-29.

| Component | Version | Previous | Note |
|---|---|---|---|
| Node.js | 26 (`.nvmrc`); Angular requires ^22.22.3 or ^24.15 or >=26 | not stated | |
| @angular/core | 22.2.3 | 13.0 | latest at generation time (CLI 22.2.5); LTS status not verified |
| @angular/cli, @angular/build | 22.2.5 | 13.0.4 (`@angular-devkit/build-angular`) | new application builder |
| TypeScript | 6.0.3 | 4.4 | |
| RxJS | 7.8.2 | 7.4 | |
| Bootstrap | 5.3.8 (npm, CSS only) | 4.3.1 + jQuery 3.3.1 + Popper 1.14 from CDNs | CDN scripts removed |
| Vitest / jsdom | 5.0.5 / 30.1.3 | Karma + Jasmine (needs Chrome) | |
| Prettier | 3.9.10 | none | |

Removed: Karma, Jasmine, zone.js, polyfills, `environment*.ts` (unused), NgModule setup.
