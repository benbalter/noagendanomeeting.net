// Open & Async palette for build-time images (social card, app icons), which
// can't read the CSS custom properties in styles.css. tests/brand.test.ts
// checks these stay in sync with the @theme tokens there.
export const BRAND = {
  navy: "#102038",
  navyLight: "#1b2a47",
  lime: "#d0d820",
  pink: "#f070a8",
  deepPink: "#be185d",
};

// Commit-graph motif from the book's marketing site, shared by the book CTA
// and the social card so the two can't drift apart.
export const COMMIT_GRAPH_PATHS = `
  <path d="M0 30 H 1200" stroke="${BRAND.lime}" stroke-width="2.5"/>
  <path d="M340 30 C 420 30, 440 12, 520 12 S 680 30, 760 30" stroke="${BRAND.pink}" stroke-width="2"/>
  <path d="M620 30 C 700 30, 720 48, 800 48 S 940 36, 1000 30" stroke="${BRAND.lime}" stroke-width="2"/>
  <circle cx="240" cy="30" r="6" fill="${BRAND.lime}"/>
  <circle cx="520" cy="12" r="5" fill="${BRAND.pink}"/>
  <circle cx="800" cy="48" r="5" fill="${BRAND.lime}"/>
  <circle cx="1000" cy="30" r="8" fill="none" stroke="${BRAND.lime}" stroke-width="2.5"/>
`;
