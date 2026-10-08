import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { DATE_MODIFIED, SITE_URL } from "./src/consts.ts";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  // Astro 7 defaults to "jsx", which drops whitespace between inline elements
  // across line breaks (e.g. "says<em>Quick sync</em>with").
  compressHTML: true,
  build: {
    format: "file",
    // The CSP is a per-page <meta> with hashes, so inline <style> is allowed and
    // saves a render-blocking request (it was external only for the old
    // header-based style-src 'self').
    inlineStylesheets: "always",
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
  // Astro's Fonts API self-hosts the heading font, preloads it, and generates a
  // metric-matched serif fallback so the swap doesn't shift the layout.
  fonts: [
    {
      provider: fontProviders.local(),
      name: "DM Serif Display",
      cssVariable: "--font-dm-serif-display",
      fallbacks: ["serif"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/dm-serif-display-400.woff2"],
          },
        ],
      },
    },
  ],
  // No Markdown on this site; Shiki's inline styles would conflict with the CSP.
  markdown: { syntaxHighlight: false },
  // Single-page site, so the page's DATE_MODIFIED is the sitemap's lastmod.
  integrations: [sitemap({ lastmod: new Date(DATE_MODIFIED) })],
  vite: {
    plugins: [tailwindcss()],
  },
});
