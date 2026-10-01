import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/** Sets the document title and meta description from `meta.<page>` in the translations. */
export function usePageMeta(page: string) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t(`meta.${page}.title`);
    const description = i18n.exists(`meta.${page}.description`) ? t(`meta.${page}.description`) : null;
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.content = description;
    }
  }, [page, t, i18n, i18n.language]);
}
