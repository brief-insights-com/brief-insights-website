import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { buildHead, type HeadPage } from "@/seo/head";
import { useLang } from "./use-locale";

function setMeta(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
}

/**
 * Keeps the head in step during client-side navigation. The prerendered HTML already carries
 * the full head for each page; this covers moves between pages without a reload.
 */
export function usePageMeta(page: HeadPage) {
  const { t } = useTranslation();
  const lang = useLang();

  useEffect(() => {
    const head = buildHead(page, lang, t);
    document.title = head.title;
    document.documentElement.lang = lang;
    setMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement("meta"), { name: "description" }),
      (el) => el.setAttribute("content", head.description),
    );
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (head.canonical) {
      setMeta(
        'link[rel="canonical"]',
        () => Object.assign(document.createElement("link"), { rel: "canonical" }),
        (el) => el.setAttribute("href", head.canonical as string),
      );
    } else {
      canonical?.remove();
    }
  }, [page, lang, t]);
}
