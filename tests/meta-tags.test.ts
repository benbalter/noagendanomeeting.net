import { describe, it, expect, beforeAll } from "vitest";
import { loadDocument } from "./setup";

describe("Open Graph Meta Tags", () => {
  let document: Document;

  beforeAll(() => {
    document = loadDocument();
  });

  it("should have og:type set to website", () => {
    const meta = document.querySelector('meta[property="og:type"]');
    expect(meta?.getAttribute("content")).toBe("website");
  });

  it("should have og:title matching the page title", () => {
    const meta = document.querySelector('meta[property="og:title"]');
    expect(meta?.getAttribute("content")).toBe(
      "No Agenda, No Meeting — Why Every Invite Needs an Agenda",
    );
  });

  it("should have og:description", () => {
    const meta = document.querySelector('meta[property="og:description"]');
    const content = meta?.getAttribute("content") ?? "";
    expect(content.length).toBeGreaterThan(10);
  });

  it("should have og:url pointing to the production URL", () => {
    const meta = document.querySelector('meta[property="og:url"]');
    expect(meta?.getAttribute("content")).toBe("https://noagendanomeeting.net/");
  });

  it("should have og:image with type and alt text", () => {
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe(
      "https://noagendanomeeting.net/og-image.png",
    );
    expect(document.querySelector('meta[property="og:image:type"]')?.getAttribute("content")).toBe(
      "image/png",
    );
    expect(
      document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content"),
    ).toBeTruthy();
  });
});

describe("Twitter Card Meta Tags", () => {
  let document: Document;

  beforeAll(() => {
    document = loadDocument();
  });

  it("should have twitter:card set to summary_large_image", () => {
    const meta = document.querySelector('meta[name="twitter:card"]');
    expect(meta?.getAttribute("content")).toBe("summary_large_image");
  });

  it("should have twitter:title matching the page title", () => {
    const meta = document.querySelector('meta[name="twitter:title"]');
    expect(meta?.getAttribute("content")).toBe(
      "No Agenda, No Meeting — Why Every Invite Needs an Agenda",
    );
  });

  it("should have twitter:description", () => {
    const meta = document.querySelector('meta[name="twitter:description"]');
    const content = meta?.getAttribute("content") ?? "";
    expect(content.length).toBeGreaterThan(10);
  });
});

describe("SEO Meta Tags Consistency", () => {
  let document: Document;

  beforeAll(() => {
    document = loadDocument();
  });

  it("should have matching og:title and twitter:title", () => {
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
    const twitterTitle = document
      .querySelector('meta[name="twitter:title"]')
      ?.getAttribute("content");
    expect(ogTitle).toBe(twitterTitle);
  });

  it("should have matching og:description and twitter:description", () => {
    const ogDesc = document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content");
    const twitterDesc = document
      .querySelector('meta[name="twitter:description"]')
      ?.getAttribute("content");
    expect(ogDesc).toBe(twitterDesc);
  });

  it("should have og:title matching the document title", () => {
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
    expect(ogTitle).toBe(document.title);
  });

  it("should have a canonical URL pointing to the production site", () => {
    const link = document.querySelector('link[rel="canonical"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("https://noagendanomeeting.net/");
  });

  it("should have og:url matching the canonical URL", () => {
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute("content");
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
    expect(ogUrl).toBe(canonical);
  });

  it("should not set a redundant robots meta tag on indexable pages", () => {
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });

  it("should link author identity profiles with rel=me", () => {
    const hrefs = Array.from(document.querySelectorAll('link[rel="me"]')).map((l) =>
      l.getAttribute("href"),
    );
    expect(hrefs).toContain("https://ben.balter.com");
    expect(hrefs).toContain("https://github.com/benbalter");
  });

  it("should reference favicons and a web manifest", () => {
    expect(document.querySelector('link[rel="icon"][href="/favicon.svg"]')).not.toBeNull();
    expect(document.querySelector('link[rel="icon"][href="/favicon.ico"]')).not.toBeNull();
    expect(document.querySelector('link[rel="manifest"]')).not.toBeNull();
  });

  it("should have theme-color meta tags for light and dark modes", () => {
    const themeTags = document.querySelectorAll('meta[name="theme-color"]');
    expect(themeTags.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Structured data", () => {
  let graph: Array<Record<string, unknown>>;

  beforeAll(() => {
    const document = loadDocument();
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(1);
    graph = JSON.parse(scripts[0].textContent ?? "{}")["@graph"];
  });

  const byType = (type: string) => graph.find((node) => node["@type"] === type);

  it("should describe the page as an Article with dates", () => {
    const article = byType("Article");
    expect(article?.headline).toBe("No Agenda, No Meeting — Why Every Invite Needs an Agenda");
    expect(article?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article?.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("should attribute the article to the same Person entity as ben.balter.com", () => {
    expect(byType("Article")?.author).toEqual({ "@id": "https://ben.balter.com/#person" });
    expect(byType("Person")?.["@id"]).toBe("https://ben.balter.com/#person");
  });

  it("should link the article to the Open & Async book entity", () => {
    expect(byType("Article")?.isBasedOn).toEqual({ "@id": "https://open-and-async.com/#book" });
  });

  it("should include a WebSite entity", () => {
    expect(byType("WebSite")?.url).toBe("https://noagendanomeeting.net/");
  });
});
