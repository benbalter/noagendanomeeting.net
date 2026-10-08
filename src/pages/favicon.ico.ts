import type { APIRoute } from "astro";
import { pngResponse, renderFaviconIco } from "../icons";

export const GET: APIRoute = async () =>
  pngResponse(await renderFaviconIco(), "image/vnd.microsoft.icon");
