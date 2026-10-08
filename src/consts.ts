export const SITE_URL = "https://noagendanomeeting.net/";
// Bare host and slashless URL, for the share button's label and copied link.
export const SITE_HOST = new URL(SITE_URL).host;
export const SHARE_URL = `https://${SITE_HOST}`;
export const SITE_NAME = "No Agenda, No Meeting";
// The brand alone doesn't say what the page is about in search results, so
// the homepage title adds the topic. Keep it under ~60 characters so Google
// doesn't truncate it.
export const HOME_TITLE = `${SITE_NAME} — Why Every Invite Needs an Agenda`;

export const DESCRIPTION =
  "No agenda, no meeting — why every calendar invite needs a clear agenda, how agendaless meetings waste time, and what to do instead.";

// Shared by Open Graph and Twitter, kept identical on purpose.
export const SOCIAL_DESCRIPTION =
  "A meeting without an agenda is like calling a function without documentation. Please don't send meeting invites without one.";
export const OG_IMAGE_ALT =
  "No Agenda, No Meeting — Please don't send meeting invites without an agenda.";

export const DATE_PUBLISHED = "2026-04-05";
export const DATE_MODIFIED = "2026-10-08";

// A copy-paste reply to an agenda-less invite, adapted from the note in
// Open & Async's "Meetings are a point of escalation" chapter. The book's
// "this belongs in an issue" is generalized for non-GitHub readers.
// No link to this site in the reply: citing a site at someone, especially a
// manager, reads as a lecture. The share button covers sending the link.
export const DECLINE_REPLY =
  "Happy to join once there's an agenda and a desired outcome. Until then, could we start in a doc or thread?";

// Canonical book URL and @id, matching open-and-async.com's own JSON-LD.
export const BOOK_URL = "https://open-and-async.com/";
export const BOOK_ID = `${BOOK_URL}#book`;
export const BOOK_LINK = `${BOOK_URL}?utm_source=noagendanomeeting`;

// Matches the Person entity ben.balter.com publishes, so search engines
// merge them into one author.
export const AUTHOR = {
  id: "https://ben.balter.com/#person",
  name: "Ben Balter",
  url: "https://ben.balter.com",
  twitter: "@benbalter",
  sameAs: [
    "https://ben.balter.com",
    "https://github.com/benbalter",
    "https://bsky.app/profile/ben.balter.com",
    "https://mastodon.social/@benbalter",
    "https://www.linkedin.com/in/benbalter",
  ],
};
