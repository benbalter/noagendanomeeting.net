import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { BRAND } from "./brand";

// public/favicon.svg is the one source for every icon; the PNG and ICO
// variants are rendered from it at build time so they can't drift. Paths are
// from the project root: Astro bundles endpoints elsewhere, so import.meta.url
// wouldn't point at src/.
export const faviconSvg = () => readFile(resolve(process.cwd(), "public/favicon.svg"));

export async function renderIcon(size: number, { maskable = false } = {}): Promise<Buffer> {
  const svg = await faviconSvg();
  if (!maskable) return sharp(svg, { density: 512 }).resize(size, size).png().toBuffer();
  // Maskable icons get cropped to a circle or squircle, so keep the artwork
  // inside the central 80% safe zone on a full-bleed navy background.
  const inner = Math.round(size * 0.6);
  const art = await sharp(svg, { density: 512 }).resize(inner, inner).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BRAND.navy } })
    .composite([{ input: art, gravity: "center" }])
    .png()
    .toBuffer();
}

export async function renderFaviconIco(): Promise<Buffer> {
  return pngToIco([await renderIcon(16), await renderIcon(32), await renderIcon(48)]);
}

export function pngResponse(body: Buffer, type = "image/png"): Response {
  return new Response(new Uint8Array(body), { headers: { "Content-Type": type } });
}
