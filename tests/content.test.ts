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

  it("should mention the 40% meetings statistic", () => {
    const text = document.querySelector("main")?.textContent ?? "";
    expect(text).toContain("40%");
  });

  it("should have a share prompt with the site URL", () => {
    const button = document.querySelector("[data-copy-url]");
    expect(button).not.toBeNull();
    expect(button?.getAttribute("data-copy-url")).toBe("https://noagendanomeeting.net");
  });

  it("should link to the Open and Async book", () => {
    const link = document.querySelector('a[href="https://openandasync.com"]');
    expect(link).not.toBeNull();
    expect(link?.textContent).toContain("Open and Async");
  });

  it("should have at least 4 h2 headings", () => {
    expect(document.querySelectorAll("h2").length).toBeGreaterThanOrEqual(4);
  });

  it("should have horizontal rule dividers between sections", () => {
    expect(document.querySelectorAll("hr").length).toBeGreaterThanOrEqual(2);
  });
});
