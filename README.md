# noagendanomeeting.net

A single-page micro-site for politely pushing back on meeting invites that lack an agenda.

**Got a calendar invite without context, goals, or a read-ahead doc?** Send the organizer [noagendanomeeting.net](https://noagendanomeeting.net) and reclaim your calendar.

## How it works

The site makes a simple, shareable case: if you haven't written down what the meeting is about, you don't need a meeting yet—you need a document. It's the [nohello.net](https://nohello.net) of calendar hygiene, adapted from [Open & Async](https://open-and-async.com/).

## Development

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Requires Node 22+ (see `.nvmrc`).

```sh
npm ci
npm run dev        # http://localhost:4321
npm run validate   # typecheck, prettier, build, and tests
```

Page content lives in `src/pages/index.astro`. Shared metadata (URLs, author, dates) lives in `src/consts.ts`; bump `DATE_MODIFIED` there when the copy changes.

### Security headers

`public/_headers` sets the security and caching headers. The script and style CSP is emitted per page by Astro (`security.csp` in `astro.config.mjs`) as a hash-based `<meta>` tag, so inline scripts don't need `'unsafe-inline'`. Tests in `tests/csp.test.ts` fail the build if anything would violate it.

### Deployment

Deployed to [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/) on push to `main` (config in `wrangler.toml`). To deploy by hand: `npm run build && npm run deploy`.

## License

Code is MIT-licensed. Site content is © [Open & Async LLC](https://open-and-async.com/), all rights reserved. See [LICENSE](LICENSE).
