// @vitest-environment node
import { describe, it, expect } from "vitest";
import sharp from "sharp";
import { pngResponse, renderFaviconIco, renderIcon } from "../src/icons";
import { BRAND } from "../src/brand";
import { loadDistBuffer } from "./setup";

describe("Generated icons", () => {
  it("should render square PNGs at the requested size", async () => {
    const meta = await sharp(await renderIcon(180)).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual(["png", 180, 180]);
  });

  it("should give maskable icons a full-bleed navy background", async () => {
    const { data } = await sharp(await renderIcon(64, { maskable: true }))
      .raw()
      .toBuffer({ resolveWithObject: true });
    const corner = `#${[...data.subarray(0, 3)].map((b) => b.toString(16).padStart(2, "0")).join("")}`;
    expect(corner).toBe(BRAND.navy);
  });

  it("should pack 16, 32, and 48 px images into favicon.ico", async () => {
    const ico = await renderFaviconIco();
    expect(ico.readUInt16LE(2)).toBe(1); // type 1 = icon
    expect(ico.readUInt16LE(4)).toBe(3); // image count
  });
});

describe("pngResponse", () => {
  it("should default to image/png and accept another type", async () => {
    expect(pngResponse(Buffer.from([1])).headers.get("Content-Type")).toBe("image/png");
    const ico = pngResponse(Buffer.from([1, 2]), "image/vnd.microsoft.icon");
    expect(ico.headers.get("Content-Type")).toBe("image/vnd.microsoft.icon");
    expect(new Uint8Array(await ico.arrayBuffer())).toEqual(new Uint8Array([1, 2]));
  });
});

describe("Built images", () => {
  it.each([
    ["og-image.png", 1200, 630],
    ["apple-touch-icon.png", 180, 180],
    ["icons/icon-192.png", 192, 192],
    ["icons/icon-512.png", 512, 512],
    ["icons/icon-maskable-512.png", 512, 512],
  ])("should build %s at %ix%i", async (path, width, height) => {
    const meta = await sharp(loadDistBuffer(path)).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual(["png", width, height]);
  });
});
