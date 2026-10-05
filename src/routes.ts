export const SITE_URL = "https://brief-insights.com";

export type Lang = "de" | "en";
export const LANGS: Lang[] = ["de", "en"];
export const DEFAULT_LANG: Lang = "de";

export type PageKey = "home" | "platform" | "security" | "results" | "about" | "impressum" | "privacy";

/**
 * Every page's address in both languages. German owns the root; English lives under /en/.
 * German paths use German words because the address itself is a search signal.
 */
export const PATHS: Record<PageKey, Record<Lang, string>> = {
  home: { de: "/", en: "/en/" },
  platform: { de: "/plattform", en: "/en/platform" },
  security: { de: "/sicherheit", en: "/en/security" },
  results: { de: "/ergebnisse", en: "/en/results" },
  about: { de: "/ueber-uns", en: "/en/about" },
  impressum: { de: "/impressum", en: "/en/impressum" },
  privacy: { de: "/datenschutz", en: "/en/privacy" },
};

export const PAGE_KEYS = Object.keys(PATHS) as PageKey[];

/** Addresses that existed before the redesign and now forward to their German page. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/privacy": PATHS.privacy.de,
};

export function pathFor(page: PageKey, lang: Lang): string {
  return PATHS[page][lang];
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

function normalise(pathname: string): string {
  if (pathname === "/en") return "/en/";
  return pathname.length > 1 && pathname.endsWith("/") && pathname !== "/en/" ? pathname.slice(0, -1) : pathname;
}

export function pageFromPath(pathname: string): PageKey | null {
  const path = normalise(pathname);
  for (const page of PAGE_KEYS) {
    if (LANGS.some((lang) => PATHS[page][lang] === path)) return page;
  }
  return null;
}
