import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

export function loadDist(relativePath: string): string {
  return readFileSync(resolve(dist, relativePath), "utf-8");
}

export function loadRawHTML(page = "index.html"): string {
  return loadDist(page);
}

export function loadDocument(page = "index.html"): Document {
  return new JSDOM(loadRawHTML(page)).window.document;
}

export function listDistHTML(): string[] {
  return readdirSync(dist, { recursive: true, encoding: "utf-8" }).filter((f) =>
    f.endsWith(".html"),
  );
}

export function loadFile(relativePath: string): string {
  return readFileSync(resolve(root, relativePath), "utf-8");
}
