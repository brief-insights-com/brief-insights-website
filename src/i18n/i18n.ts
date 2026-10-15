import i18next, { type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import { DEFAULT_LANG, type Lang } from "@/routes";

const resources = {
  de: { translation: de },
  en: { translation: en },
};

/**
 * One fixed-language instance per locale. The language comes from the URL (German at the root,
 * English under /en/), never from the browser, so every address always renders the same
 * language for visitors, crawlers and the build-time prerenderer alike.
 */
function createI18n(lng: Lang): I18n {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
    initAsync: false,
    showSupportNotice: false,
  });
  return instance;
}

export const i18nByLang: Record<Lang, I18n> = {
  de: createI18n("de"),
  en: createI18n("en"),
};

export default i18nByLang[DEFAULT_LANG];
