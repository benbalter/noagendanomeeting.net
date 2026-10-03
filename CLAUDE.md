# CLAUDE.md

Single-page Astro site at [noagendanomeeting.net](https://noagendanomeeting.net), served by Cloudflare Workers static assets. See [README.md](README.md) for where content, metadata and security headers live.

## Commands

Run this before pushing. It's what [ci.yml](.github/workflows/ci.yml) runs, minus Lighthouse:

```sh
npm run validate   # astro check + tsc, prettier --check, build, vitest with coverage, html-validate
```

`npm run format` fixes Prettier failures. Prettier also checks Markdown, including this file.

## Deploying

- Pushing to `main` is a production deploy. Cloudflare Workers Builds builds and deploys it on Cloudflare's side using [wrangler.toml](wrangler.toml), without waiting for the GitHub `Validate` job, so a red CI doesn't stop a push from shipping.
- `npm run deploy` (`wrangler deploy`) also ships to production.
- So run `npm run validate`, then push or merge to `main`, or deploy by hand, only when the owner says to.
