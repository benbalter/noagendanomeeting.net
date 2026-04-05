import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loadDocument(): Document {
  const html = readFileSync(resolve(__dirname, "../index.html"), "utf-8");
  const dom = new JSDOM(html);
  return dom.window.document;
}

export function loadRawHTML(): string {
  return readFileSync(resolve(__dirname, "../index.html"), "utf-8");
}

export function loadFile(relativePath: string): string {
  return readFileSync(resolve(__dirname, "..", relativePath), "utf-8");
}
