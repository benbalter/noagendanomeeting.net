import { createHash } from "node:crypto";
import { describe, it, expect } from "vitest";
import { listDistHTML, loadDocument } from "./setup";

// Guards against regressions like the one fixed in 20db363, where inline
// styles were silently blocked by the CSP in production.
describe.each(listDistHTML())("CSP compliance: %s", (page) => {
  const document = loadDocument(page);
  const csp =
    document.querySelector('meta[http-equiv="content-security-policy"]')?.getAttribute("content") ??
    "";

  it("should have a CSP meta tag", () => {
    expect(csp).toContain("default-src 'none'");
    expect(csp).not.toContain("'unsafe-inline'");
    expect(csp).not.toContain("'unsafe-eval'");
  });

  it("should not use inline <style> elements", () => {
    expect(document.querySelectorAll("style")).toHaveLength(0);
  });

  it("should not use style attributes", () => {
    expect(document.querySelectorAll("[style]")).toHaveLength(0);
  });

  it("should hash every inline executable script", () => {
    const inline = Array.from(document.querySelectorAll("script:not([src])")).filter(
      (s) => s.getAttribute("type") !== "application/ld+json",
    );
    for (const script of inline) {
      const hash = createHash("sha256")
        .update(script.textContent ?? "")
        .digest("base64");
      expect(csp).toContain(`'sha256-${hash}'`);
    }
  });

  it("should only load same-origin scripts and stylesheets", () => {
    const urls = [
      ...Array.from(document.querySelectorAll("script[src]")).map((s) => s.getAttribute("src")),
      ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) =>
        l.getAttribute("href"),
      ),
    ];
    for (const url of urls) {
      expect(url).toMatch(/^\/(?!\/)/);
    }
  });
});
