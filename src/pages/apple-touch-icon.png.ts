import type { APIRoute } from "astro";
import { pngResponse, renderIcon } from "../icons";

export const GET: APIRoute = async () => pngResponse(await renderIcon(180));
