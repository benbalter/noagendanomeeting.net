import type { Article, Graph, Person, WebSite } from "schema-dts";
import {
  AUTHOR,
  BOOK_ID,
  DATE_MODIFIED,
  DATE_PUBLISHED,
  DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
  SITE_URL,
} from "./consts";

const author: Person = {
  "@type": "Person",
  "@id": AUTHOR.id,
  name: AUTHOR.name,
  url: AUTHOR.url,
  sameAs: AUTHOR.sameAs,
};

const website: WebSite = {
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-US",
  publisher: { "@id": AUTHOR.id },
};

const article: Article = {
  "@type": "Article",
  "@id": `${SITE_URL}#article`,
  headline: HOME_TITLE,
  description: DESCRIPTION,
  url: SITE_URL,
  image: new URL("/og-image.png", SITE_URL).href,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  inLanguage: "en-US",
  author: { "@id": AUTHOR.id },
  publisher: { "@id": AUTHOR.id },
  isPartOf: { "@id": `${SITE_URL}#website` },
  mainEntityOfPage: SITE_URL,
  // Links this page to the Book entity open-and-async.com publishes.
  isBasedOn: { "@id": BOOK_ID },
  keywords: ["meetings", "agenda", "productivity", "async work", "remote work"],
};

export const homeGraph: Graph = {
  "@context": "https://schema.org",
  "@graph": [website, author, article],
};
