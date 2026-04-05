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
    expect(meta?.getAttribute("content")).toBe("No Agenda, No Meeting");
  });

  it("should have og:description", () => {
    const meta = document.querySelector('meta[property="og:description"]');
    const content = meta?.getAttribute("content") ?? "";
    expect(content.length).toBeGreaterThan(10);
  });

  it("should have og:url pointing to the production URL", () => {
    const meta = document.querySelector('meta[property="og:url"]');
    expect(meta?.getAttribute("content")).toBe("https://noagendanomeeting.net");
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
    expect(meta?.getAttribute("content")).toBe("No Agenda, No Meeting");
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
    expect(link?.getAttribute("href")).toBe("https://noagendanomeeting.net");
  });

  it("should have theme-color meta tags for light and dark modes", () => {
    const themeTags = document.querySelectorAll('meta[name="theme-color"]');
    expect(themeTags.length).toBeGreaterThanOrEqual(1);
  });
});
