/* eslint-disable react-refresh/only-export-components -- build-time server entry, never hot-reloaded */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./AppRoutes";
import { i18nByLang } from "./i18n/i18n";
import { buildHead, renderHeadTags } from "./seo/head";
import { langFromPath, pageFromPath } from "./routes";

export { LANGS, LEGACY_REDIRECTS, PAGE_KEYS, PATHS, SITE_URL } from "./routes";

/** Renders one address to HTML for the build-time prerender (scripts/prerender.mjs). */
export function render(url: string) {
  const lang = langFromPath(url);
  const page = pageFromPath(url);
  const html = renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
  const head = renderHeadTags(buildHead(page ?? "notFound", lang, i18nByLang[lang].t));
  return { html, head, lang };
}
