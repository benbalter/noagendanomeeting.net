import type { APIRoute } from "astro";
import { AUTHOR, BOOK_URL, DECLINE_REPLY, REPO_URL, SITE_NAME, SITE_URL } from "../consts";

// Built from consts.ts so names, links, and the reply can't drift from the page.
export const GET: APIRoute = () => {
  const body = `# ${SITE_NAME}

> A single-page explainer asking people not to send meeting invites without an agenda. Share the link with an organizer when you get an invite with no context, goals, or read-ahead.

## Key points

- An invite without an agenda forces every attendee to context-switch twice: once to work out what the meeting is about, and again when they arrive unprepared.
- A good invite states the decision or question, lists agenda items with time allocations, and attaches a read-ahead document.
- Before scheduling, ask "Can this start as a document instead?" Write first, meet second.
- If an invite has no agenda, it's reasonable to ask for one or decline politely. A suggested reply: "${DECLINE_REPLY}"

## Links

- [${SITE_NAME}](${SITE_URL}): the full page
- [Open & Async](${BOOK_URL}): the book by ${AUTHOR.name} this page is adapted from
- [${AUTHOR.name}](${AUTHOR.url}): author
- [Source code](${REPO_URL}): the site's repository on GitHub
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
