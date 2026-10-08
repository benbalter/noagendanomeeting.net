import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { SITE_URL } from "./src/consts.ts";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  // Astro 7 defaults to "jsx", which drops whitespace between inline elements
  // across line breaks (e.g. "says<em>Quick sync</em>with").
  compressHTML: true,
  build: {
    format: "file",
    inlineStylesheets: "never",
  },
  // Astro emits a per-page CSP <meta> with hashes for its inline scripts.
  // frame-ancestors can't be set via <meta>, so it lives in public/_headers.
  security: {
    csp: {
      directives: [
        "default-src 'none'",
        "img-src 'self' data:",
        "font-src 'self'",
        "manifest-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "base-uri 'self'",
        "form-action 'none'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: {
        // Cloudflare Web Analytics beacon, if enabled on the zone.
        resources: ["'self'", "https://static.cloudflareinsights.com"],
      },
      styleDirective: {
        resources: ["'self'"],
      },
    },
  },
  // No Markdown on this site; Shiki's inline styles would conflict with the CSP.
  markdown: { syntaxHighlight: false },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
