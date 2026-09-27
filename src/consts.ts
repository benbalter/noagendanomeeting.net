export const SITE_URL = "https://noagendanomeeting.net/";
export const SITE_NAME = "No Agenda, No Meeting";

export const DESCRIPTION =
  "No agenda, no meeting — why every calendar invite needs a clear agenda, how agendaless meetings waste time, and what to do instead.";

// Shared by Open Graph and Twitter, kept identical on purpose.
export const SOCIAL_DESCRIPTION =
  "A meeting without an agenda is like calling a function without documentation. Please don't send meeting invites without one.";
export const OG_IMAGE_ALT =
  "No Agenda, No Meeting — Please don't send meeting invites without an agenda.";

export const DATE_PUBLISHED = "2026-04-05";
export const DATE_MODIFIED = "2026-09-27";

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
