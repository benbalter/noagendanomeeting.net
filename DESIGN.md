---
name: No Agenda, No Meeting
description: A calm, well-organized calendar invite of a page that politely makes the case for agendas.
colors:
  redline-pink: "#be185d"
  highlighter-lime: "#d0d820"
  bright-redline-pink: "#f070a8"
  ink-navy: "#102038"
  night-card: "#1b2a47"
  night-rule: "#2e3e62"
  paper: "oklch(98.5% 0 none)"
  card-white: "#ffffff"
  hairline: "oklch(87.2% 0.01 258.338)"
  divider: "oklch(92.8% 0.006 264.531)"
  inner-rule: "oklch(96.7% 0.003 264.542)"
  muted-text: "oklch(55.1% 0.027 264.364)"
  body-gray: "oklch(37.3% 0.034 259.733)"
  blush-wash: "oklch(97.1% 0.014 343.198)"
  bad-red: "oklch(57.7% 0.245 27.325)"
  bad-wash: "oklch(97.1% 0.013 17.38)"
  good-green: "oklch(52.7% 0.154 150.069)"
  good-wash: "oklch(98.2% 0.018 155.826)"
typography:
  display:
    fontFamily: "DM Serif Display, serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.5
  headline:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.55
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.05em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  mono-eyebrow:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  card-pad: "16px 20px"
  stack: "24px"
  section: "40px"
  column: "640px"
  breakout: "960px"
components:
  invite-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.xl}"
  invite-header-bad:
    backgroundColor: "{colors.bad-wash}"
    typography: "{typography.label}"
    padding: "12px 16px"
  invite-header-good:
    backgroundColor: "{colors.good-wash}"
    typography: "{typography.label}"
    padding: "12px 16px"
  copy-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.body-gray}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-pad}"
  copy-card-invite:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.body-gray}"
    rounded: "{rounded.xl}"
  copy-card-invite-header:
    backgroundColor: "{colors.blush-wash}"
    textColor: "{colors.redline-pink}"
    typography: "{typography.label}"
    padding: "12px 16px"
  button-copy:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.redline-pink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "44px"
  button-copy-hover:
    backgroundColor: "{colors.blush-wash}"
    textColor: "{colors.redline-pink}"
  callout:
    backgroundColor: "{colors.blush-wash}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-pad}"
  share-box:
    backgroundColor: "oklch(98.5% 0.002 247.839)"
    textColor: "oklch(44.6% 0.03 256.802)"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-pad}"
  book-promo:
    backgroundColor: "{colors.ink-navy}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.xl}"
    padding: "32px 24px"
  book-promo-button:
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
---

# Design System: No Agenda, No Meeting

## Overview

**Creative North Star: "The Well-Written Invite"**

The page should feel the way a good calendar invite reads: calm, organized, and clear about what it wants. It sits on near-white paper in a single narrow column, with the main argument carried by two mock invites, one bad and one good. Everything else stays out of their way. Color shows up for only three reasons: to mark bad vs. good, to point at something you can act on (copy, share, follow a link), and in the one promo object for the book.

The page is low-density and reads top to bottom in a couple of minutes. The serif headline gives it a little editorial authority, the system sans keeps the body plain, and the developer humor lives in the copy rather than in decoration. The reader is often an organizer who's just been sent this link, so nothing visual should feel like a scolding: no alarm-red banners, no shouting type, no mockery in the art.

**Key Characteristics:**

- One 640px reading column that breaks out to a two-up grid only for the invite comparison.
- Flat, quiet paper surfaces with hairline borders and the faintest shadow.
- Redline Pink as the single action-and-annotation accent in light mode, swapped for Highlighter Lime and a brighter pink in dark mode.
- Red and green appear only as the bad and good invite signals.
- The Open & Async book card is the one deliberately bold, lifted object, and it's fixed in the book's own colors.

## Colors

A neutral paper-and-ink base with one editing-pen accent, plus a pair of semantic signals used only on the invite mocks.

### Primary

- **Redline Pink** (`redline-pink`): The light-mode accent, like an editor's correction pen. It colors the title punctuation (the comma and period in "No Agenda, No Meeting."), the strike-through and arrow in the opening subject-line correction, the list arrows, the copy and share button labels, and the agenda template's header band. It's chosen for contrast (5.8:1 on paper), because the real brand pink and lime are too light to read as text on near-white.
- **Highlighter Lime** (`highlighter-lime`): The dark-mode stand-in for Redline Pink on the title punctuation (10.5:1 on Ink Navy). In both modes it's the commit-graph line and dots on the book card and the start of the book's gradient.

### Secondary

- **Bright Redline Pink** (`bright-redline-pink`): The dark-mode stand-in for Redline Pink on arrows, links, and buttons (5.9:1 on Ink Navy). It's also the end of the book's lime-to-pink gradient.

### Neutral

- **Ink Navy** (`ink-navy`): Body text in light mode, the page background in dark mode, the book card background, and `theme-color`. It's the one dark that ties both modes together.
- **Night Card** (`night-card`): Dark-mode surface for invite cards, copy cards, the callout, and the share box.
- **Night Rule** (`night-rule`): Dark-mode borders and dividers.
- **Paper** (`paper`): The light-mode page background. It's barely off-white, so the white cards sit on it without needing a heavy shadow.
- **Card White** (`card-white`): The surface of invite cards, copy cards, and buttons.
- **Hairline** (`hairline`): Card and button borders.
- **Divider** (`divider`): The `<hr>` rules between sections.
- **Inner Rule** (`inner-rule`): The faint rules inside an invite card (above the agenda and the reaction line).
- **Muted Text** (`muted-text`): The subtitle, field labels, "(none)" placeholders, copy-card headings, and icons.
- **Body Gray** (`body-gray`): The lede, invite field values, and copyable text.
- **Blush Wash** (`blush-wash`): The callout background and the hover state of copy buttons. It's Redline Pink diluted to almost nothing.

### Semantic (invite mocks only)

- **Bad Red** (`bad-red`) on **Bad Wash** (`bad-wash`): The "Don't do this" icon and the bad invite's header band. The dark-mode header uses deep red tints (red-950 surface, red-300 text).
- **Good Green** (`good-green`) on **Good Wash** (`good-wash`): The "Try this instead" icon and the good invite's header band, mirrored in dark mode with green-950 and green-300.

### Named Rules

**The One Pen Rule.** Redline Pink (or its dark-mode swap) is the only accent outside the book card. It marks either a correction (punctuation, the struck-through "Quick sync", arrows) or an action (copy, share). If something isn't one of those, it stays neutral.

**The Signals Stay in the Mock Rule.** Red and green belong to the invite comparison: the two section icons and the two header bands. They never color body copy, buttons, or page chrome, because a red page reads as a scolding to the organizer we're trying to persuade. The one use outside the mocks is the bad-red underline on "Quick sync" in the opening paragraph, which points at the bad invite before the reader reaches it.

**The Book Keeps Its Own Colors Rule.** The book card uses Ink Navy, Highlighter Lime, and Bright Redline Pink as fixed values, not theme tokens, so it matches open-and-async.com in both modes. Don't retheme it to fit the page, and don't spread its gradient to the rest of the page.

## Typography

**Display Font:** DM Serif Display (self-hosted, with a metric-matched serif fallback generated by Astro's Fonts API)
**Body Font:** The system sans stack (`ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** The system mono stack, for the share link and the book card's eyebrow line

**Character:** One high-contrast serif gives the title, and the book's name, the weight of a printed headline. Everything else is plain system sans, so the page reads like a well-formatted document instead of a poster.

### Hierarchy

- **Display** (400, 2.5rem from 640px up and 1.875rem below it, line-height 1.1, tight tracking): The page title only, plus "Open & Async" on the book card.
- **Lede** (500, 1.125rem with line-height 1.5, rising to 1.25rem at 640px): The opening "Imagine getting a calendar invite…" paragraph.
- **Headline** (600, 1.25rem, tight tracking): Section headings ("Don't do this", "Why this matters"), sometimes led by a 22px icon.
- **Title** (700, 1.125rem): The subject line inside an invite card.
- **Body** (400, 1rem, line-height 1.625): Running prose, held to a 640px column of roughly 70 characters.
- **Body Small** (400, 0.95rem): List items, callouts, invite reactions, and copyable text.
- **Label** (600, 0.75rem, 0.05em tracking, uppercase): "CALENDAR INVITE" header bands, "AGENDA" inside the good invite, and copy-card headings.
- **Mono** (400, 0.875rem): The `noagendanomeeting.net` share button, because it's a URL.
- **Mono Eyebrow** (400, 0.7rem, widest tracking, uppercase): Only the book card's "> Adapted from the book" line, ported from ben.balter.com so the card matches the book everywhere. Don't add eyebrows above headings anywhere else.

### Named Rules

**The Single Serif Rule.** DM Serif Display appears only in the page title and the book's name. Section headings stay sans, and adding the serif anywhere else dilutes the title.

**The Document, Not Poster Rule.** Body text never goes above 1.25rem, and nothing but the title uses display sizes. The argument wins on clarity, not volume.

## Layout

The page is a single centered column (`column`, 640px) with a 16px side gutter (`gutter`) that widens to 24px (`gutter-sm`) at 640px. Top padding goes from 32px to 48px at the same breakpoint.

The one exception is the invite comparison. At 1024px and up it breaks out of the column into a 960px (`breakout`) two-column grid with a 40px gap, centered on the column, so the bad and good invites sit side by side. Below 1024px they stack, bad first. Inside an invite, the label/value field rows stack on mobile and become a two-column row at 640px, with labels held to a 5.5rem minimum width.

The vertical rhythm is simple: major sections are separated by a 1px divider with 40px (`section`) above and below, and cards, callouts, and copy blocks sit 24px (`stack`) from their neighbors. The footer shares the 640px column and holds the share box, the book card, and a small centered credit line.

## Elevation & Depth

The system is close to flat. Surfaces are separated mainly by tone (white cards on Paper, or Night Card on Ink Navy) and by hairline borders. Invite cards and copy cards add Tailwind's smallest shadow, just enough that they read as objects you could pick up. Only the book card lifts: its shadow grows and it rises 1px on hover, and the lift is disabled under `prefers-reduced-motion`.

### Shadow Vocabulary

- **Resting sheet** (`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): Invite cards, copy cards, and the book card at rest.
- **Lifted promo** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): The book card on hover only.

### Named Rules

**The Flat Paper Rule.** Content surfaces stay at the resting sheet. Lift is reserved for the book card's hover, the one thing on the page that's an invitation rather than an argument.

## Shapes

The page uses soft, modest corners that step up with the size of the object: 6px (`md`) for small buttons, 8px (`lg`) for the reply card, the callout, the share box, and the book's call-to-action button, and 12px (`xl`) for invite cards, the agenda template, and the book card. No surface uses a thick one-sided colored border; that stripe reads as generated UI. The share box is the only dashed border, which marks it as a "pass this along" slip rather than content. Invite cards clip their header bands to the card's corners.

## Components

### Calendar Invite Card (signature)

The page's central object. It's a stylized invite, not a working form.

- **Shape:** Gently rounded card (12px) with a hairline border and the resting-sheet shadow, clipped so the header band follows the corners.
- **Header band:** A Label-style "CALENDAR INVITE" strip with a 14px calendar icon and a 2px bottom border. Bad invites use Bad Wash with red text and a red-300 border. Good invites use Good Wash with green text and a green-300 border.
- **Body:** 16px padding. The subject sits in Title type, followed by label/value field rows in 0.875rem. An empty field shows an italic muted "(none)". The good invite adds a numbered agenda under an Inner Rule divider, plus a paperclip read-ahead line.
- **Reaction:** An italic Body Small footer line in muted gray, under an Inner Rule, giving the attendee's internal monologue.

### Subject-Line Correction (signature)

The page's opening move and its one use of the correction pen. Between hairline rules, a "SUBJECT" Label sits beside the struck-through "Quick sync" (muted text, 2px Redline Pink line-through), then an accent arrow and the rewritten subject in semibold ink. The arrow and new subject wrap together, so on a phone the correction reads as two lines: old, then new. Visually hidden "from" and "to" make the change readable to screen readers. A one-sentence Body Small caption names the whole fix. It sits above the invite comparison so the fix shows on a phone's first screen.

### Copy Card

- **Plain (the reply):** 8px corners, hairline border, resting-sheet shadow, 16px × 20px padding, with an uppercase Label heading.
- **Invite (the agenda template):** Dressed as a third, blank calendar invite: 12px corners, a Blush Wash header band with a calendar-plus icon and Redline Pink Label text over a 2px pink-200 rule, then 16px padding. It's the invite the reader fills in.
- **Content:** The copyable text, either as a blockquote or as pre-wrapped text in the body sans (never mono) for the template.
- **Action:** A copy button below the text. A visually hidden `role="status"` element announces "Reply copied" and similar.

### Buttons

- **Shape:** Gently rounded (6px), white surface, hairline border, 8px × 16px padding and a 44px minimum height for thumbs, 0.875rem text with a trailing 14px muted icon.
- **Copy / share:** Redline Pink label text. The share variant sets the host in mono and, on touch screens where it opens the share sheet, swaps the copy icon and screen-reader verb for "share".
- **Feedback:** "Copied!" replaces the label for 2 seconds while the button holds its width.
- **Hover:** The surface shifts to Blush Wash and the border to Redline Pink over 150ms. In dark mode the surface is Ink Navy and goes to Night Card on hover.
- **Book CTA:** The one filled button: an 8px pill with the lime-to-pink gradient, Ink Navy semibold text, and an arrow that nudges 2px right on hover (motion-safe only). In print it falls back to a solid navy button.

### Callout

A Blush Wash panel (Night Card in dark mode) with 8px corners and Body Small text, and no side stripe. It holds one key claim with its strongest phrase in bold Ink Navy (white in dark mode). It's used once, for the time-in-meetings point.

### Arrow List

An unstyled list where each item hangs a bold Redline Pink "→" in a 28px left indent. The arrow is decorative, so its alt text is empty for screen readers. It's used for the "hidden costs" and "what to do instead" lists.

### Share Box

A centered, dashed-border slip in a faint gray-50 with 8px corners and 0.875rem muted text ("Got an invite without an agenda? Share this page:"), holding the mono share button.

### Book Promo Card

An Ink Navy card (12px corners, a Night Rule border that turns 30% Highlighter Lime in dark mode so the card stays distinct from the navy page, 32px × 24px padding) with the commit-graph SVG along the bottom at 40% opacity, the 144px 3D cover, a lime mono eyebrow, "Open & Async" in Display with a gradient ampersand, slate-300 supporting text, and the gradient CTA. The cover and text stack and center on mobile, then go side by side and left-aligned at 640px. The whole card is one link, and in print it switches to white with navy text.

## Do's and Don'ts

### Do:

- **Do** keep content in the 640px column, and break out to the 960px two-up grid only for side-by-side comparisons.
- **Do** use Redline Pink in light mode and Highlighter Lime or Bright Redline Pink in dark mode for every accent, swapped through the `accent` and `accent-alt` theme tokens rather than hard-coded.
- **Do** keep text contrast at or above WCAG AA in both modes. The accent swap exists because the brand lime and pink fail on Paper.
- **Do** separate content surfaces with tone and hairlines, using at most the resting-sheet shadow.
- **Do** style with Tailwind utilities and theme tokens. The hash-based CSP rejects `style="…"` attributes.
- **Do** mark icons that sit beside text `aria-hidden`, and pair every copy action with a screen-reader status message.

### Don't:

- **Don't** use red or green outside the bad and good invite mocks.
- **Don't** use DM Serif Display for anything but the page title and the book's name.
- **Don't** retheme the book card, or spread its gradient, commit-graph motif, or navy surface into the rest of the page.
- **Don't** add filled buttons other than the book CTA. Page actions stay as quiet outlined buttons.
- **Don't** add lift, deeper shadows, or hover motion to content cards. Lift belongs to the book card.
- **Don't** hard-code one-off hex values. Use a token from the palette.
- **Don't** put a thick colored border on one side of a card, callout, or list item.
