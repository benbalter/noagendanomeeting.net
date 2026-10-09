# No Agenda, No Meeting

[![No Agenda, No Meeting: please don't send meeting invites without an agenda.](https://noagendanomeeting.net/og-image.png)](https://noagendanomeeting.net)

**Got a calendar invite without context, goals, or a read-ahead doc?** Send the organizer [noagendanomeeting.net](https://noagendanomeeting.net) and reclaim your calendar.

## What's on the page

[noagendanomeeting.net](https://noagendanomeeting.net) is a single page that makes a short, shareable case: if you haven't written down what a meeting is about, you don't need a meeting yet. You need a document. It's the [nohello.net](https://nohello.net) of calendar hygiene, adapted from the book [Open & Async](https://open-and-async.com/).

- A side-by-side comparison of an agenda-less "Quick sync" invite and a good one, with a decision, time-boxed agenda items, and a read-ahead.
- Why meetings without an agenda cost more than they look, and what to do instead: write first, meet second.
- A polite, copy-paste reply for declining an invite until it has an agenda.
- A copyable meeting agenda template for organizers.
- A one-click share button (the native share sheet on phones).

## Development

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Requires Node 22+ (see `.nvmrc`).

```sh
npm ci
npm run dev        # http://localhost:4321
npm run validate   # typecheck, prettier, build, and tests
```

- Page content lives in `src/pages/index.astro`. Shared copy and metadata (URLs, author, dates, the decline reply, the agenda template) live in `src/consts.ts`; bump `DATE_MODIFIED` there when the copy changes.
- The social card (`og-image.png`) and every icon are generated at build time: the card by `src/pages/og-image.png.ts`, and the PNG and ICO icons from `public/favicon.svg` by `src/icons.ts`. `src/brand.ts` holds the Open & Async palette they use, and `tests/brand.test.ts` keeps it in sync with the CSS tokens in `src/styles.css`.
- The heading font is self-hosted through Astro's [Fonts API](https://docs.astro.build/en/guides/fonts/).

### Security headers

`public/_headers` sets the security and caching headers. The script and style CSP is emitted per page by Astro (`security.csp` in `astro.config.mjs`) as a hash-based `<meta>` tag, so inline scripts and styles don't need `'unsafe-inline'`. Tests in `tests/csp.test.ts` fail the build if anything would violate it.

### Deployment

Deployed to [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/) on push to `main` (config in `wrangler.toml`). Cloudflare deploys without waiting for GitHub Actions, so a ruleset requires every change to `main` to pass `Validate` and the Cloudflare build, and to be up to date with `main`. Repo admins can bypass it. To deploy by hand: `npm run build && npm run deploy`.

## Contributing

Bug reports and fixes are welcome. To suggest a change to the page's wording, please open an issue first.

## License

Code is MIT-licensed. Site content is © [Open & Async LLC](https://open-and-async.com/), all rights reserved. See [LICENSE](LICENSE).
