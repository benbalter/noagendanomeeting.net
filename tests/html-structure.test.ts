import { describe, it, expect, beforeAll } from "vitest";
import { loadDocument, loadRawHTML } from "./setup";

describe("HTML Document Structure", () => {
  let document: Document;
  let rawHTML: string;

  beforeAll(() => {
    document = loadDocument();
    rawHTML = loadRawHTML();
  });

  it("should start with DOCTYPE declaration", () => {
    expect(rawHTML.trimStart()).toMatch(/^<!DOCTYPE html>/i);
  });

  it("should have lang attribute set to en", () => {
    expect(document.documentElement.lang).toBe("en");
  });

  it("should have a charset meta tag set to UTF-8", () => {
    const meta = document.querySelector("meta[charset]");
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute("charset")).toBe("UTF-8");
  });

  it("should have a viewport meta tag", () => {
    const meta = document.querySelector('meta[name="viewport"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute("content")).toContain("width=device-width");
  });

  it("should have exactly one <main> element", () => {
    expect(document.querySelectorAll("main")).toHaveLength(1);
  });

  it("should have a <footer> element", () => {
    expect(document.querySelectorAll("footer")).toHaveLength(1);
  });

  it("should have exactly one <h1> element", () => {
    expect(document.querySelectorAll("h1")).toHaveLength(1);
  });

  it("should have a title element", () => {
    expect(document.title).toBe("No Agenda, No Meeting");
  });

  it("should have a description meta tag", () => {
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute("content")).toBeTruthy();
  });

  it("should have a favicon", () => {
    const link = document.querySelector('link[rel="icon"]');
    expect(link).not.toBeNull();
  });

  it("should inline the site stylesheet", () => {
    const css = Array.from(document.querySelectorAll("style"))
      .map((s) => s.textContent)
      .join("");
    expect(css).toContain(".arrow-list");
    expect(document.querySelector('link[rel="stylesheet"]')).toBeNull();
  });

  it("should include a module script", () => {
    const script = document.querySelector('script[type="module"]');
    expect(script).not.toBeNull();
  });

  it("should not load Tailwind from a CDN", () => {
    expect(rawHTML).not.toContain("cdn.tailwindcss.com");
  });

  it("should self-host fonts instead of using Google Fonts CDN", () => {
    const preconnect = document.querySelector('link[rel="preconnect"][href*="fonts.googleapis"]');
    expect(preconnect).toBeNull();
  });

  it("should have a canonical URL link", () => {
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();
  });
});
