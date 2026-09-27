import { describe, it, expect, beforeAll } from "vitest";
import { loadDist } from "./setup";

function rulesFor(headers: string, path: string): string[] {
  const lines = headers.split("\n");
  const start = lines.findIndex((l) => l.trim() === path);
  if (start === -1) return [];
  const rules: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (!/^\s+\S/.test(line)) break;
    if (!line.trim().startsWith("#")) rules.push(line.trim());
  }
  return rules;
}

describe("_headers file", () => {
  let headers: string;

  beforeAll(() => {
    headers = loadDist("_headers");
  });

  it("should apply security headers to all routes", () => {
    const all = rulesFor(headers, "/*");
    expect(all).toContain("X-Content-Type-Options: nosniff");
    expect(all).toContain("X-Frame-Options: DENY");
    expect(all).toContain("Referrer-Policy: strict-origin-when-cross-origin");
    expect(all).toContain("Content-Security-Policy: frame-ancestors 'none'");
    expect(all.some((r) => r.startsWith("Strict-Transport-Security: max-age="))).toBe(true);
    expect(all.some((r) => r.startsWith("Permissions-Policy:"))).toBe(true);
  });

  it("should deny camera, microphone, and geolocation", () => {
    const policy = rulesFor(headers, "/*").find((r) => r.startsWith("Permissions-Policy:"));
    expect(policy).toContain("camera=()");
    expect(policy).toContain("microphone=()");
    expect(policy).toContain("geolocation=()");
  });

  it("should not put script-src or default-src in the header CSP", () => {
    // The hash-based policy lives in each page's <meta>; a header policy
    // without the hashes would block Astro's inline scripts.
    const csp = rulesFor(headers, "/*").find((r) => r.startsWith("Content-Security-Policy:"));
    expect(csp).not.toContain("script-src");
    expect(csp).not.toContain("default-src");
  });

  it("should cache hashed build assets immutably", () => {
    const rules = rulesFor(headers, "/_astro/*");
    expect(rules).toContain("! Cache-Control");
    expect(rules).toContain("Cache-Control: public, max-age=31536000, immutable");
  });

  it("should detach the default Cache-Control in every more specific rule", () => {
    const paths = headers
      .split("\n")
      .filter((l) => /^\/\S/.test(l) && l.trim() !== "/*")
      .map((l) => l.trim());
    for (const path of paths) {
      const rules = rulesFor(headers, path);
      if (rules.some((r) => r.startsWith("Cache-Control:"))) {
        expect(rules, path).toContain("! Cache-Control");
      }
    }
  });

  it("should allow the OG image to be embedded cross-origin", () => {
    expect(rulesFor(headers, "/og-image.png")).toContain(
      "Cross-Origin-Resource-Policy: cross-origin",
    );
  });
});

describe("_redirects file", () => {
  let redirects: string;

  beforeAll(() => {
    redirects = loadDist("_redirects");
  });

  it("should redirect /noagenda to the homepage", () => {
    expect(redirects.trim()).toBe("/noagenda / 301");
  });

  it("should have valid redirect format (source destination status)", () => {
    const lines = redirects.split("\n").filter((l) => l.trim().length > 0);
    lines.forEach((line) => {
      const [source, destination, status] = line.trim().split(/\s+/);
      expect(source).toMatch(/^\//);
      expect(destination).toMatch(/^(\/|https:\/\/)/);
      expect(parseInt(status)).toBeGreaterThanOrEqual(300);
      expect(parseInt(status)).toBeLessThan(400);
    });
  });
});
