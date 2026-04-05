import { describe, it, expect, beforeAll } from "vitest";
import { loadDocument } from "./setup";

describe("Accessibility", () => {
  let document: Document;

  beforeAll(() => {
    document = loadDocument();
  });

  it("should have a lang attribute on the html element", () => {
    expect(document.documentElement.getAttribute("lang")).toBe("en");
  });

  it("should have a single main landmark", () => {
    expect(document.querySelectorAll("main")).toHaveLength(1);
  });

  it("should have exactly one h1", () => {
    expect(document.querySelectorAll("h1")).toHaveLength(1);
  });

  it("should have a logical heading hierarchy starting with h1", () => {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0].tagName).toBe("H1");
  });

  it("should not skip heading levels", () => {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    for (let i = 1; i < headings.length; i++) {
      const current = parseInt(headings[i].tagName[1]);
      const previous = parseInt(headings[i - 1].tagName[1]);
      expect(current).toBeLessThanOrEqual(previous + 1);
    }
  });

  it("should have no empty links", () => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      const text = link.textContent?.trim() ?? "";
      const ariaLabel = link.getAttribute("aria-label") ?? "";
      expect(text.length + ariaLabel.length).toBeGreaterThan(0);
    });
  });

  it("should have no empty buttons", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      const text = button.textContent?.trim() ?? "";
      const ariaLabel = button.getAttribute("aria-label") ?? "";
      expect(text.length + ariaLabel.length).toBeGreaterThan(0);
    });
  });

  it("should use semantic list elements", () => {
    const uls = document.querySelectorAll("ul");
    const ols = document.querySelectorAll("ol");
    expect(uls.length + ols.length).toBeGreaterThan(0);
  });

  it("should have no links with generic click here text", () => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      const text = link.textContent?.trim().toLowerCase() ?? "";
      expect(text).not.toBe("click here");
      expect(text).not.toBe("here");
    });
  });

  it("should have all links with href attributes", () => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      expect(link.hasAttribute("href")).toBe(true);
    });
  });

  it("should have a meta description under 160 characters", () => {
    const meta = document.querySelector('meta[name="description"]');
    const content = meta?.getAttribute("content") ?? "";
    expect(content.length).toBeGreaterThan(0);
    expect(content.length).toBeLessThanOrEqual(160);
  });

  it("should have a title under 60 characters", () => {
    expect(document.title.length).toBeGreaterThan(0);
    expect(document.title.length).toBeLessThanOrEqual(60);
  });
});
