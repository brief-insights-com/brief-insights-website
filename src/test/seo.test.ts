import { describe, expect, it } from "vitest";
import { i18nByLang } from "@/i18n/i18n";
import { buildHead, renderHeadTags } from "@/seo/head";
import { langFromPath, LANGS, LEGACY_REDIRECTS, PAGE_KEYS, pageFromPath, PATHS, SITE_URL } from "@/routes";

const PAGES = PAGE_KEYS.flatMap((page) => LANGS.map((lang) => ({ page, lang })));

describe("routes", () => {
  it.each(PAGES)("$page in $lang round-trips through its URL", ({ page, lang }) => {
    expect(pageFromPath(PATHS[page][lang])).toBe(page);
    expect(langFromPath(PATHS[page][lang])).toBe(lang);
  });

  it("serves German at the root and English under /en/", () => {
    expect(PATHS.home).toEqual({ de: "/", en: "/en/" });
    for (const page of PAGE_KEYS) {
      expect(PATHS[page].de.startsWith("/en")).toBe(false);
      expect(PATHS[page].en.startsWith("/en/")).toBe(true);
    }
  });

  it("gives every address exactly one page", () => {
    const all = PAGES.map(({ page, lang }) => PATHS[page][lang]);
    expect(new Set(all).size).toBe(all.length);
  });

  it("forwards legacy addresses to pages that exist", () => {
    for (const target of Object.values(LEGACY_REDIRECTS)) expect(pageFromPath(target)).not.toBeNull();
  });
});

describe("page head", () => {
  it.each(PAGES)("$page in $lang has a self-canonical and reciprocal hreflang", ({ page, lang }) => {
    const head = buildHead(page, lang, i18nByLang[lang].t);
    expect(head.canonical).toBe(`${SITE_URL}${PATHS[page][lang]}`);
    expect(head.alternates).toEqual([
      { hreflang: "de", href: `${SITE_URL}${PATHS[page].de}` },
      { hreflang: "en", href: `${SITE_URL}${PATHS[page].en}` },
      { hreflang: "x-default", href: `${SITE_URL}${PATHS[page].de}` },
    ]);
    expect(head.noindex).toBe(false);
  });

  it.each(PAGES)("$page in $lang has a title and description within search-result limits", ({ page, lang }) => {
    const head = buildHead(page, lang, i18nByLang[lang].t);
    expect(head.title.length).toBeGreaterThan(20);
    expect(head.title.length).toBeLessThanOrEqual(70);
    expect(head.description.length).toBeGreaterThanOrEqual(110);
    expect(head.description.length).toBeLessThanOrEqual(170);
  });

  it("gives every page a distinct title and description", () => {
    const heads = PAGES.map(({ page, lang }) => buildHead(page, lang, i18nByLang[lang].t));
    expect(new Set(heads.map((h) => h.title)).size).toBe(heads.length);
    expect(new Set(heads.map((h) => h.description)).size).toBe(heads.length);
  });

  it.each(PAGES)("$page in $lang emits valid JSON-LD describing the company", ({ page, lang }) => {
    const tags = renderHeadTags(buildHead(page, lang, i18nByLang[lang].t));
    const json = tags.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    expect(json).toBeTruthy();
    const data = JSON.parse(json as string);
    const types = data["@graph"].map((node: { "@type": string }) => node["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    const org = data["@graph"].find((node: { "@type": string }) => node["@type"] === "Organization");
    expect(org.legalName).toBe("Brief Insights UG (haftungsbeschränkt)");
    expect(org.address.postalCode).toBe("12167");
    if (page === "home" || page === "platform") expect(types).toContain("SoftwareApplication");
    if (page !== "home") {
      const webPage = data["@graph"].find((node: { breadcrumb?: unknown }) => node.breadcrumb);
      expect(webPage.breadcrumb.itemListElement).toHaveLength(2);
    }
  });

  it("marks the 404 page noindex, without a canonical", () => {
    const head = buildHead("notFound", "de", i18nByLang.de.t);
    expect(head.noindex).toBe(true);
    expect(head.canonical).toBeNull();
    expect(renderHeadTags(head)).toContain('<meta name="robots" content="noindex" />');
  });
});
