import { describe, it, expect, beforeAll } from "vitest";
import { loadFile } from "./setup";

describe("_headers file", () => {
  let headers: string;

  beforeAll(() => {
    headers = loadFile("public/_headers");
  });

  it("should not be empty", () => {
    expect(headers.trim().length).toBeGreaterThan(0);
  });

  it("should set X-Content-Type-Options to nosniff", () => {
    expect(headers).toContain("X-Content-Type-Options: nosniff");
  });

  it("should set X-Frame-Options to DENY", () => {
    expect(headers).toContain("X-Frame-Options: DENY");
  });

  it("should set Referrer-Policy to strict-origin-when-cross-origin", () => {
    expect(headers).toContain("Referrer-Policy: strict-origin-when-cross-origin");
  });

  it("should set a Permissions-Policy", () => {
    expect(headers).toContain("Permissions-Policy:");
  });

  it("should deny camera, microphone, and geolocation", () => {
    expect(headers).toContain("camera=()");
    expect(headers).toContain("microphone=()");
    expect(headers).toContain("geolocation=()");
  });

  it("should set Cache-Control for all routes", () => {
    expect(headers).toContain("/*");
    expect(headers).toContain("Cache-Control:");
  });

  it("should have a specific cache rule for index.html", () => {
    expect(headers).toContain("/index.html");
  });

  it("should apply to all routes with the wildcard pattern", () => {
    const lines = headers.split("\n");
    const firstRoute = lines.find((l) => l.trim().startsWith("/"));
    expect(firstRoute?.trim()).toBe("/*");
  });
});

describe("_redirects file", () => {
  let redirects: string;

  beforeAll(() => {
    redirects = loadFile("public/_redirects");
  });

  it("should not be empty", () => {
    expect(redirects.trim().length).toBeGreaterThan(0);
  });

  it("should redirect /noagenda to the main site", () => {
    expect(redirects).toContain("/noagenda");
    expect(redirects).toContain("https://noagendanomeeting.net");
  });

  it("should use a 301 permanent redirect", () => {
    expect(redirects).toContain("301");
  });

  it("should have valid redirect format (source destination status)", () => {
    const lines = redirects
      .split("\n")
      .filter((l) => l.trim().length > 0);
    lines.forEach((line) => {
      const parts = line.trim().split(/\s+/);
      expect(parts.length).toBe(3);
      expect(parts[0]).toMatch(/^\//);
      expect(parts[1]).toMatch(/^https?:\/\//);
      expect(parseInt(parts[2])).toBeGreaterThanOrEqual(300);
      expect(parseInt(parts[2])).toBeLessThan(400);
    });
  });
});
