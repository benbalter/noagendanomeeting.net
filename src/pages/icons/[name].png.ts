import type { APIRoute, GetStaticPaths } from "astro";
import { pngResponse, renderIcon } from "../../icons";

// The sizes public/manifest.webmanifest lists.
const ICONS = {
  "icon-192": { size: 192, maskable: false },
  "icon-512": { size: 512, maskable: false },
  "icon-maskable-512": { size: 512, maskable: true },
};

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(ICONS).map((name) => ({ params: { name } }));

export const GET: APIRoute = async ({ params }) => {
  const { size, maskable } = ICONS[params.name as keyof typeof ICONS];
  return pngResponse(await renderIcon(size, { maskable }));
};
