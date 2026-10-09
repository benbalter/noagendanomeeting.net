import { describe, it, expect } from "vitest";
import { BRAND } from "../src/brand";
import { loadFile } from "./setup";

// src/brand.ts copies the palette for build-time images, which can't read
// CSS custom properties. Keep the copy honest.
describe("Brand palette", () => {
  const css = loadFile("src/styles.css").toLowerCase();

  it.each(Object.entries(BRAND))("should match styles.css for %s", (_name, hex) => {
    expect(css).toContain(hex.toLowerCase());
  });

  it("should draw the favicon only in brand colors (plus white)", () => {
    const svg = loadFile("public/favicon.svg").toLowerCase();
    const allowed = new Set([...Object.values(BRAND).map((h) => h.toLowerCase()), "#fff"]);
    for (const hex of svg.match(/#[0-9a-f]{3,6}\b/g) ?? []) {
      expect(allowed).toContain(hex);
    }
  });
});
