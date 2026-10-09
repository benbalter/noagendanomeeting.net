import type { APIRoute } from "astro";
import { REPO_URL } from "../../consts";

// RFC 9116. Expires rolls forward on every build, so it never goes stale.
const EXPIRES_IN_MS = 180 * 24 * 60 * 60 * 1000;

export const GET: APIRoute = ({ site }) => {
  const expires = new Date(Date.now() + EXPIRES_IN_MS).toISOString();
  const canonical = new URL("/.well-known/security.txt", site);
  const body = `Contact: ${REPO_URL}/security/advisories/new
Expires: ${expires}
Preferred-Languages: en
Canonical: ${canonical.href}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
