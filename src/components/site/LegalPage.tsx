import { useTranslation } from "react-i18next";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Section } from "./Layout";

/**
 * Statutory text (Impressum, privacy policy) from eRecht24, rendered as-is. Both language
 * versions are shown; the one matching the visitor's language comes first.
 */
export default function LegalPage({ page, de, en }: { page: "impressum" | "privacy"; de: string; en: string }) {
  const { i18n } = useTranslation();
  usePageMeta(page);
  const versions = [
    { lang: "de", html: de },
    { lang: "en", html: en },
  ];
  if (i18n.language?.startsWith("en")) versions.reverse();

  return (
    <Section>
      {versions.map((version, index) => (
        <div key={version.lang}>
          {index > 0 ? <hr className="my-12 max-w-[72ch] border-hairline md:my-16" /> : null}
          <div lang={version.lang} className="legal-prose" dangerouslySetInnerHTML={{ __html: version.html }} />
        </div>
      ))}
    </Section>
  );
}
