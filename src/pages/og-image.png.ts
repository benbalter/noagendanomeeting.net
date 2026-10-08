import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { BRAND, COMMIT_GRAPH_PATHS } from "../brand";
import { SITE_HOST } from "../consts";
import { faviconSvg, pngResponse } from "../icons";

// The social card, rendered at build time from the page's own name, tagline,
// palette, and fonts, so link previews match the site. 1200x630 is the size
// og:image:width/height in BaseLayout advertise.
const WIDTH = 1200;
const HEIGHT = 630;

const require = createRequire(resolve(process.cwd(), "package.json"));
// Satori reads WOFF but not WOFF2, so use Fontsource's WOFF files.
const font = (path: string) => readFile(require.resolve(path));
const dataUri = (svg: string | Buffer) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: object, children?: unknown, extra: object = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

export const GET: APIRoute = async () => {
  const [serif, sans, sansBold, icon] = await Promise.all([
    font("@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff"),
    font("@fontsource/inter/files/inter-latin-400-normal.woff"),
    font("@fontsource/inter/files/inter-latin-600-normal.woff"),
    faviconSvg(),
  ]);
  const graph = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 60" fill="none">${COMMIT_GRAPH_PATHS}</svg>`;
  const accent = (text: string) => el("span", { color: BRAND.lime }, text);

  // The motif sits in its own layer: Satori lays out absolutely positioned
  // children as flex items, so it can't share the text column.
  const content = el(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      // Fill the card rather than setting width/height: Satori adds padding
      // on top of explicit dimensions, which pushes the text off the bottom.
      flexGrow: 1,
      padding: "72px 96px 132px",
    },
    [
      el("img", { width: 80, height: 80 }, undefined, {
        src: dataUri(icon),
        width: 80,
        height: 80,
      }),
      el("div", { display: "flex", flexDirection: "column" }, [
        el(
          "div",
          { display: "flex", fontFamily: "DM Serif Display", fontSize: 92, lineHeight: 1.05 },
          ["No Agenda", accent(","), "\u00a0No Meeting", accent(".")],
        ),
        el(
          "div",
          { display: "flex", marginTop: 20, fontSize: 36, color: "#cbd5e1" },
          "Please don't send meeting invites without an agenda.",
        ),
        el(
          "div",
          { display: "flex", marginTop: 32, fontSize: 30, fontWeight: 600, color: BRAND.lime },
          SITE_HOST,
        ),
      ]),
    ],
  );
  const motif = el(
    "img",
    { position: "absolute", left: 0, top: HEIGHT - 96, width: WIDTH, height: 60, opacity: 0.55 },
    undefined,
    { src: dataUri(graph), width: WIDTH, height: 60 },
  );
  const card = el(
    "div",
    {
      width: WIDTH,
      height: HEIGHT,
      display: "flex",
      position: "relative",
      backgroundImage: `linear-gradient(135deg, #0c1626 0%, ${BRAND.navy} 55%, #1c1d3e 100%)`,
      color: "#fff",
      fontFamily: "Inter",
    },
    [content, motif],
  );

  const svg = await satori(card as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "DM Serif Display", data: serif, weight: 400, style: "normal" },
      { name: "Inter", data: sans, weight: 400, style: "normal" },
      { name: "Inter", data: sansBold, weight: 600, style: "normal" },
    ],
  });
  return pngResponse(await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer());
};
