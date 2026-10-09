# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Single-page Astro site at [noagendanomeeting.net](https://noagendanomeeting.net), served by Cloudflare Workers static assets. See [README.md](README.md) for where content, metadata and security headers live.

## Commands

Run this before pushing. It's what [ci.yml](.github/workflows/ci.yml) runs, minus Lighthouse:

```sh
npm run validate   # astro check + tsc, prettier --check, build, vitest with coverage, html-validate
```

`npm run format` fixes Prettier failures. Prettier also checks Markdown, including this file.

## Tests

Most tests in [tests/](tests/) read the built HTML in `dist/` (via the helpers in [tests/setup.ts](tests/setup.ts)), not the source, so build before running them. `npm test` does that; for one file, run `npm run build` once and then `npx vitest run tests/csp.test.ts`. A stale `dist/` means tests pass or fail against old output.

Coverage thresholds in [vitest.config.ts](vitest.config.ts) apply only to `src/**/*.ts` outside `src/pages/`, so a new helper module there needs direct unit tests.

## Architecture notes

- [src/consts.ts](src/consts.ts) is the single source for URLs, titles, descriptions, dates and the copy-paste reply and agenda text. Pages, JSON-LD ([src/jsonld.ts](src/jsonld.ts)), `llms.txt`, the sitemap's `lastmod` and several tests import from it, so change copy there rather than in markup.
- The CSP is a hash-based `<meta>` that Astro generates from `security.csp` in [astro.config.mjs](astro.config.mjs). [tests/csp.test.ts](tests/csp.test.ts) fails on `style="…"` attributes, unhashed inline scripts or styles, and `'unsafe-inline'`, so style with Tailwind classes and add any new third-party origin to the directives there. `frame-ancestors` can't go in a `<meta>`, so it lives in [public/\_headers](public/_headers) with the other response headers.

## Deploying

- Pushing to `main` is a production deploy. Cloudflare Workers Builds builds and deploys it on Cloudflare's side using [wrangler.toml](wrangler.toml), without waiting for the GitHub `Validate` job, so a red CI doesn't stop a push from shipping.
- `npm run deploy` (`wrangler deploy`) also ships to production.
- So run `npm run validate`, then push or merge to `main`, or deploy by hand, only when the owner says to.
