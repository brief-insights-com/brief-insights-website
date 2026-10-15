import type { TFunction } from "i18next";
import { absoluteUrl, DEFAULT_LANG, LANGS, pathFor, SITE_URL, type Lang, type PageKey } from "@/routes";

export type HeadPage = PageKey | "notFound";

const OG_LOCALE: Record<Lang, string> = { de: "de_DE", en: "en_GB" };
const IN_LANGUAGE: Record<Lang, string> = { de: "de-DE", en: "en-GB" };
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const PRODUCT_ID = `${SITE_URL}/#briefxtract`;

export interface HeadData {
  lang: Lang;
  title: string;
  description: string;
  canonical: string | null;
  alternates: { hreflang: string; href: string }[];
  image: string;
  imageAlt: string;
  noindex: boolean;
  jsonLd: object | null;
}

/** Facts about the company, all taken from the Impressum. */
function organization(t: TFunction) {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Brief Insights",
    legalName: "Brief Insights UG (haftungsbeschränkt)",
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 1000, height: 1000, caption: "Brief Insights" },
    email: "info@brief-insights.com",
    telephone: "+493016637678",
    vatID: "DE461404955",
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Johanna-Stegen-Straße 24, c/o Alves Avelino",
      postalCode: "12167",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    description: t("seo.organization"),
    knowsAbout: t("seo.knowsAbout", { returnObjects: true }) as string[],
  };
}

function software(t: TFunction, lang: Lang) {
  return {
    "@type": "SoftwareApplication",
    "@id": PRODUCT_ID,
    name: "BriefXtract",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: t("seo.softwareCategory"),
    operatingSystem: "Web",
    inLanguage: IN_LANGUAGE[lang],
    description: t("seo.software"),
    url: absoluteUrl(pathFor("platform", lang)),
    publisher: { "@id": ORG_ID },
    audience: { "@type": "BusinessAudience", audienceType: t("seo.audience") },
  };
}

export function buildHead(page: HeadPage, lang: Lang, t: TFunction): HeadData {
  const title = t(`meta.${page}.title`);
  const description = t(`meta.${page}.description`);
  const image = absoluteUrl(`/og-${lang}.png`);
  const imageAlt = t("seo.imageAlt");

  if (page === "notFound") {
    return { lang, title, description, canonical: null, alternates: [], image, imageAlt, noindex: true, jsonLd: null };
  }

  const canonical = absoluteUrl(pathFor(page, lang));
  const alternates = [
    ...LANGS.map((l) => ({ hreflang: l, href: absoluteUrl(pathFor(page, l)) })),
    { hreflang: "x-default", href: absoluteUrl(pathFor(page, DEFAULT_LANG)) },
  ];

  const webPage: Record<string, unknown> = {
    "@type": page === "about" ? "AboutPage" : "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: IN_LANGUAGE[lang],
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
  };
  if (page === "home" || page === "platform") webPage.about = { "@id": PRODUCT_ID };
  if (page !== "home") {
    webPage.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t("nav.homeCrumb"), item: absoluteUrl(pathFor("home", lang)) },
        { "@type": "ListItem", position: 2, name: t(`meta.${page}.crumb`), item: canonical },
      ],
    };
  }

  const graph: object[] = [
    organization(t),
    { "@type": "WebSite", "@id": SITE_ID, url: `${SITE_URL}/`, name: "Brief Insights", inLanguage: LANGS.map((l) => IN_LANGUAGE[l]), publisher: { "@id": ORG_ID } },
    webPage,
  ];
  if (page === "home" || page === "platform") graph.push(software(t, lang));

  return {
    lang,
    title,
    description,
    canonical,
    alternates,
    image,
    imageAlt,
    noindex: false,
    jsonLd: { "@context": "https://schema.org", "@graph": graph },
  };
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Serialises head data into tags for the prerendered HTML. */
export function renderHeadTags(head: HeadData): string {
  const tags = [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
  ];
  if (head.noindex) tags.push(`<meta name="robots" content="noindex" />`);
  if (head.canonical) tags.push(`<link rel="canonical" href="${head.canonical}" />`);
  for (const alt of head.alternates) tags.push(`<link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`);
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Brief Insights" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[head.lang]}" />`,
    ...LANGS.filter((l) => l !== head.lang).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
    `<meta property="og:image" content="${head.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(head.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${head.image}" />`,
  );
  if (head.canonical) tags.push(`<meta property="og:url" content="${head.canonical}" />`);
  if (head.jsonLd) {
    // Escape "<" so the JSON can never close the script element early.
    tags.push(`<script type="application/ld+json">${JSON.stringify(head.jsonLd).replace(/</g, "\\u003c")}</script>`);
  }
  return tags.join("\n    ");
}
