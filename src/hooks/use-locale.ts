import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { pathFor, type Lang, type PageKey } from "@/routes";

/** The language of the page being rendered, as set by its URL. */
export function useLang(): Lang {
  const { i18n } = useTranslation();
  return i18n.language === "en" ? "en" : "de";
}

/** Builds the address of a page in the current language. */
export function usePath() {
  const lang = useLang();
  return useCallback((page: PageKey) => pathFor(page, lang), [lang]);
}
