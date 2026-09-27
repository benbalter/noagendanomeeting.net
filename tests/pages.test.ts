import { describe, it, expect } from "vitest";
import { loadDist, loadDocument } from "./setup";

describe("404 page", () => {
  const document = loadDocument("404.html");

  it("should not be indexed", () => {
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex");
  });

  it("should not declare a canonical URL", () => {
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it("should have a main landmark and a single h1", () => {
    expect(document.querySelectorAll("main")).toHaveLength(1);
    expect(document.querySelectorAll("h1")).toHaveLength(1);
  });

  it("should link back to the homepage", () => {
    expect(document.querySelector('main a[href="/"]')).not.toBeNull();
  });
});

describe("robots.txt", () => {
  const robots = loadDist("robots.txt");

  it("should allow crawling and point at the sitemap", () => {
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://noagendanomeeting.net/sitemap-index.xml");
  });

  it("should declare content signals", () => {
    expect(robots).toMatch(/^Content-Signal: search=yes, ai-train=yes, ai-input=yes$/m);
  });
});

describe("sitemap", () => {
  it("should list the homepage but not the 404 page", () => {
    const sitemap = loadDist("sitemap-0.xml");
    expect(sitemap).toContain("<loc>https://noagendanomeeting.net");
    expect(sitemap).not.toContain("404");
  });
});

describe("security.txt", () => {
  const securityTxt = loadDist(".well-known/security.txt");

  it("should have the required Contact and Expires fields", () => {
    expect(securityTxt).toMatch(/^Contact: https:\/\//m);
    const expires = securityTxt.match(/^Expires: (.+)$/m)?.[1];
    expect(new Date(expires ?? "").getTime()).toBeGreaterThan(Date.now());
  });
});

describe("discovery files", () => {
  it("should ship llms.txt and humans.txt", () => {
    expect(loadDist("llms.txt")).toMatch(/^# No Agenda, No Meeting/);
    expect(loadDist("humans.txt")).toContain("Ben Balter");
  });

  it("should ship a web manifest whose icons exist", () => {
    const manifest = JSON.parse(loadDist("manifest.webmanifest"));
    expect(manifest.name).toBe("No Agenda, No Meeting");
    for (const icon of manifest.icons) {
      expect(() => loadDist(icon.src.replace(/^\//, ""))).not.toThrow();
    }
  });
});
