// Prerenders every page in both languages to static HTML after `vite build`.
//
// GitHub Pages serves /plattform from plattform.html and /en/ from en/index.html with HTTP 200,
// so each page ships with its full text, its own head (title, description, canonical, hreflang,
// Open Graph, JSON-LD) and the app bundle, which then hydrates it. Crawlers that don't run
// JavaScript — most AI search crawlers and every link-preview bot — read the real content.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const template = await readFile(join(dist, "index.html"), "utf8");
for (const marker of ['<html lang="de">', "<!--app-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) throw new Error(`index.html is missing the prerender marker ${marker}`);
}

const { render, PATHS, LANGS, PAGE_KEYS, LEGACY_REDIRECTS, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

/** /plattform -> dist/plattform.html, /en/ -> dist/en/index.html */
function fileFor(url) {
  return url.endsWith("/") ? join(dist, url, "index.html") : join(dist, `${url}.html`);
}

async function write(file, contents) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents, "utf8");
}

function renderPage(url) {
  const { html, head, lang } = render(url);
  return template
    .replace('<html lang="de">', `<html lang="${lang}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
}

const written = [];

for (const page of PAGE_KEYS) {
  for (const lang of LANGS) {
    const url = PATHS[page][lang];
    await write(fileFor(url), renderPage(url));
    written.push(url);
  }
}

// Unknown addresses: GitHub Pages serves 404.html with HTTP 404, now a real page rather than a
// script that bounces visitors through the home page.
await write(join(dist, "404.html"), renderPage("/__not-found__"));

// Old addresses that may be bookmarked or indexed forward to their new home.
for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
  const target = `${SITE_URL}${to}`;
  await write(
    fileFor(from),
    `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Weitergeleitet …</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${target}" />
    <meta http-equiv="refresh" content="0; url=${to}" />
    <script>location.replace(${JSON.stringify(to)} + location.search + location.hash);</script>
  </head>
  <body><p><a href="${to}">${target}</a></p></body>
</html>
`,
  );
}

// Sitemap with each page's language pair, so search engines connect the two versions.
const urls = PAGE_KEYS.flatMap((page) =>
  LANGS.map((lang) => {
    const alternates = [
      ...LANGS.map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${SITE_URL}${PATHS[page][alt]}" />`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${PATHS[page].de}" />`,
    ];
    return `  <url>\n    <loc>${SITE_URL}${PATHS[page][lang]}</loc>\n${alternates.join("\n")}\n  </url>`;
  }),
);
await write(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`,
);

await rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${written.length} pages, 404.html, ${Object.keys(LEGACY_REDIRECTS).length} redirect(s) and sitemap.xml:`);
for (const url of written) console.log(`  ${url}`);
