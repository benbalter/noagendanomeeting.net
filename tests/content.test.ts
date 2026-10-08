import { describe, it, expect, beforeAll } from "vitest";
import { loadDocument } from "./setup";

describe("Page Content", () => {
  let document: Document;

  beforeAll(() => {
    document = loadDocument();
  });

  it("should have the page heading", () => {
    const h1 = document.querySelector("h1");
    expect(h1?.textContent).toContain("No Agenda, No Meeting");
  });

  it("should have the subtitle about agendas", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).toContain("don't send meeting invites without an agenda");
  });

  it("should keep spaces between inline elements", () => {
    const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
    expect(text).toContain('says "Quick sync" with');
    expect(text).toContain("spend one to two full days a week in meetings");
    expect(text).toContain("Inspired by nohello.net");
  });

  it("should have a Don't do this section", () => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const found = headings.some((h) => h.textContent?.includes("Don't do this"));
    expect(found).toBe(true);
  });

  it("should have a Try this instead section", () => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const found = headings.some((h) => h.textContent?.includes("Try this instead"));
    expect(found).toBe(true);
  });

  it("should have a Why this matters section", () => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const found = headings.some((h) => h.textContent?.includes("Why this matters"));
    expect(found).toBe(true);
  });

  it("should have a What to do instead section", () => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const found = headings.some((h) => h.textContent?.includes("What to do instead"));
    expect(found).toBe(true);
  });

  // Published figures vary widely and none supports the old "40%" claim.
  it("should not cite an unsourced meetings percentage", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).not.toMatch(/\d+% of (their|the) workweek/);
  });

  it("should have a share prompt with the site URL", () => {
    const button = document.querySelector("footer [data-copy-text]");
    expect(button).not.toBeNull();
    expect(button?.getAttribute("data-copy-text")).toBe("https://noagendanomeeting.net");
  });

  it("should offer a copyable decline reply that matches the text shown", () => {
    const button = document.querySelector('main [data-copy-label="Reply"]');
    const shown = button?.parentElement?.querySelector("blockquote")?.textContent?.trim();
    expect(shown).toContain("agenda and a desired outcome");
    expect(button?.getAttribute("data-copy-text")).toBe(shown);
  });

  it("should not style the example read-ahead like a link", () => {
    const readAhead = Array.from(document.querySelectorAll("span")).find(
      (el) => el.textContent === "Q3 launch status doc",
    );
    expect(readAhead?.className).not.toMatch(/text-blue/);
  });

  it("should link to the Open & Async book", () => {
    const link = document.querySelector('a[href^="https://open-and-async.com/"]');
    expect(link).not.toBeNull();
    expect(link?.textContent).toContain("Open & Async");
  });

  it("should tag book links with a utm_source", () => {
    const links = document.querySelectorAll('a[href^="https://open-and-async.com/"]');
    links.forEach((a) => {
      expect(new URL(a.getAttribute("href") ?? "").searchParams.get("utm_source")).toBe(
        "noagendanomeeting",
      );
    });
  });

  it("should not link to the old openandasync.com domain", () => {
    expect(document.querySelector('[href*="openandasync.com"]')).toBeNull();
  });

  it("should have a Get the book call-to-action", () => {
    const links = Array.from(document.querySelectorAll('a[href^="https://open-and-async.com/"]'));
    const cta = links.find((a) => a.textContent?.includes("Get the book"));
    expect(cta).toBeDefined();
  });

  it("should have blue punctuation in the heading", () => {
    const h1 = document.querySelector("h1");
    const blueSpans = h1?.querySelectorAll("span") ?? [];
    expect(blueSpans.length).toBeGreaterThanOrEqual(2);
    expect(h1?.textContent).toContain(",");
    expect(h1?.textContent).toContain(".");
  });

  it("should credit nohello.net as inspiration", () => {
    const link = document.querySelector('a[href="https://nohello.net"]');
    expect(link).not.toBeNull();
    const footer = document.querySelector("footer");
    expect(footer?.textContent).toContain("nohello.net");
  });

  it("should have at least 4 h2 headings", () => {
    expect(document.querySelectorAll("h2").length).toBeGreaterThanOrEqual(4);
  });

  it("should have horizontal rule dividers between sections", () => {
    expect(document.querySelectorAll("hr").length).toBeGreaterThanOrEqual(2);
  });
});
