import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL("/sitemap-index.xml", site);
  // Content Signals (contentsignals.org): search, AI training, and AI answers
  // are all welcome, matching ben.balter.com and open-and-async.com.
  const body = `User-agent: *
Content-Signal: search=yes, ai-train=yes, ai-input=yes
Allow: /

Sitemap: ${sitemapUrl.href}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
