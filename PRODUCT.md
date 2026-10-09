# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, in priority order:

1. **The recipient: the organizer who sent an agenda-less invite and was sent this link.** They didn't ask to be here, may feel called out, and may outrank the person who sent it. Their job is to understand, quickly and without feeling scolded, why the invite didn't work and what a good one looks like. If they leave persuaded and able to write a better invite, the page worked.
2. **The sharer: an attendee tired of mystery meetings.** They need a link that's safe to send, even to a manager, plus a polite reply they can paste back to the invite.

Organizers who find the page through search ("meeting agenda template") are a real but secondary audience. They're served by the same agenda template.

## Product Purpose

[noagendanomeeting.net](https://noagendanomeeting.net) is a single shareable page that makes a simple case: if you haven't written down what the meeting is about, you don't need a meeting yet. You need a document. Success means the page gets shared, the recipient changes how they write invites, and people use the copy-paste reply and agenda template.

## Positioning

It's the [nohello.net](https://nohello.net) of calendar hygiene: one link you can send instead of an awkward explanation. The argument is adapted from Ben Balter's book [Open & Async](https://open-and-async.com/) ("Meetings are a point of escalation"), so the page stands on a published, async-first philosophy rather than generic productivity tips.

## Operating Context

- The recipient almost always arrives from a link pasted into a calendar reply, chat, or email, often on a phone between meetings. The first screen has to make the point on its own.
- The sharer copies one of two things: the site URL (the footer share button copies the bare host) or the decline reply. The reply leaves out the link on purpose, so the two are shared separately.
- The page argues by contrast: a bad "Quick sync" invite next to a good, time-boxed invite with a read-ahead.

## Capabilities and Constraints

- Single page, built with Astro and Tailwind and served as Cloudflare Workers static assets. Pushing to `main` deploys to production.
- All copy, URLs, dates, the decline reply, and the agenda template live in [src/consts.ts](src/consts.ts). Pages, JSON-LD, `llms.txt`, and tests import them from there.
- Strict hash-based CSP: no inline `style="…"`, no unhashed inline scripts or styles, no `'unsafe-inline'`. New third-party origins have to be added to `security.csp` in [astro.config.mjs](astro.config.mjs).
- Copy-to-clipboard for the reply, the template, and the share link ([src/clipboard.ts](src/clipboard.ts)), with a screen-reader status message.
- Supports light and dark mode.
- The code is MIT-licensed. Site content is © Open & Async LLC, all rights reserved.

## Brand Commitments

- **Name:** "No Agenda, No Meeting."
- **Voice: polite, never preachy.** Push back without lecturing. The recipient is the primary reader, so the copy persuades instead of scolding. For example, the decline reply has no link to the site, because citing a site at someone (especially a manager) reads as a lecture.
- **nohello.net lineage.** Keep the single-page, link-you-send-someone format, and keep crediting nohello.net.
- **Developer-flavored humor.** Keep it light and a little nerdy: analogies like "a meeting without an agenda is like calling a function without documentation" and the emoji reactions in the invite examples.
- **The book is a quiet secondary goal.** Open & Async is the credited source and gets one promo ([src/components/BookCta.astro](src/components/BookCta.astro)) near the end. It must never interrupt the argument or make the page read like an ad. The promo card uses the book's own fixed colors so it matches the book's site. The book's broader navy/lime/pink palette is the current look, but it isn't a binding brand commitment for the whole page.

## Evidence on Hand

- The bad-vs-good invite examples, decline reply, and agenda template are on the page and in [src/consts.ts](src/consts.ts).
- Open & Async book cover: [src/assets/img/open-and-async-cover.webp](src/assets/img/open-and-async-cover.webp).
- The "one to two full days a week in meetings" claim is hedged on purpose ("depending on whose survey you read"), after an unsourced stat was removed. Don't add statistics without a citable source.
- No testimonials, usage numbers, press, or endorsements exist. Don't make any up.

## Product Principles

1. **Persuade the recipient, equip the sharer.** Every addition should either help the organizer see the point without getting defensive, or make the link and reply easier and safer to send.
2. **Show, don't scold.** Contrast and concrete examples carry the argument, not moralizing.
3. **One page, one point.** It's a link you send someone. Keep it focused enough to get the point in the first screen and finish in a couple of minutes.
4. **Copy-paste ready.** Anything a reader is expected to reuse should be one click to copy.
5. **Earned claims only.** Every factual claim is sourced or openly hedged.

## Accessibility & Inclusion

The page has to stay readable and usable on mobile, in light and dark mode, and with a keyboard or screen reader. That includes the copy buttons, which announce their status to screen readers.
