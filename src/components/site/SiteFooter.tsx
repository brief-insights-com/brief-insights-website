import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/Brief_Insights_name_color.png";
import { openCookieSettings } from "@/lib/analytics";
import { Container } from "./Layout";

type FooterLink = { key: string; to?: string; href?: string; action?: () => void };

const COLUMNS: { key: string; links: FooterLink[] }[] = [
  {
    key: "product",
    links: [
      { key: "platform", to: "/platform" },
      { key: "extraction", to: "/platform" },
      { key: "caseEngine", to: "/platform" },
      { key: "urgency", to: "/platform" },
    ],
  },
  {
    key: "security",
    links: [
      { key: "overview", to: "/security" },
      { key: "residency", to: "/security" },
      { key: "retention", to: "/security" },
      { key: "dpa", to: "/security" },
    ],
  },
  {
    key: "resources",
    links: [
      { key: "results", to: "/results" },
      { key: "calculator", to: "/results" },
      { key: "questions", to: "/security" },
    ],
  },
  {
    key: "solutions",
    links: [
      { key: "debt", to: "/about" },
      { key: "social", to: "/about" },
      { key: "nonProfit", to: "/about" },
    ],
  },
  {
    key: "company",
    links: [
      { key: "about", to: "/about" },
      { key: "contact", to: "/about" },
      { key: "email", href: "mailto:info@brief-insights.com" },
    ],
  },
  {
    key: "legal",
    links: [
      { key: "impressum", to: "/impressum" },
      { key: "privacy", to: "/privacy" },
      { key: "cookies", action: openCookieSettings },
    ],
  },
];

const linkClass = "block py-1 text-body-sm text-steel hover:text-ink md:py-1";

function FooterItem({ link }: { link: FooterLink }) {
  const { t } = useTranslation();
  const label = link.key === "email" ? "info@brief-insights.com" : t(`footer.links.${link.key}`);
  if (link.to) {
    return (
      <Link to={link.to} className={linkClass}>
        {label}
      </Link>
    );
  }
  if (link.href) {
    return (
      <a href={link.href} className={linkClass}>
        {label}
      </a>
    );
  }
  return (
    <button type="button" onClick={link.action} className={`${linkClass} text-left`}>
      {label}
    </button>
  );
}

export default function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-canvas py-12 md:py-16">
      <Container>
        {/* The lockup's blue "Brief" drops to 1.5:1 on a dark ground, so dark mode shows the wordmark as type. */}
        <img src={logo} alt={t("footer.logoAlt")} width={128} height={128} className="h-32 w-32 object-contain dark:hidden" />
        <p className="hidden text-h4 text-ink dark:block">Brief Insights</p>

        {/* Tablet and desktop: columns. */}
        <div className="mt-8 hidden gap-6 md:grid md:grid-cols-3 md:gap-y-10 lg:grid-cols-6">
          {COLUMNS.map((column) => (
            <div key={column.key}>
              <h2 className="mb-3 text-body-sm font-medium text-ink">{t(`footer.columns.${column.key}`)}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.key}>
                    <FooterItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile: an accordion. Legal stays open because Impressum and privacy must be one tap away. */}
        <div className="mt-6 border-t border-hairline-soft md:hidden">
          {COLUMNS.map((column) => (
            <details key={column.key} open={column.key === "legal"} className="group border-b border-hairline-soft">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-body-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                {t(`footer.columns.${column.key}`)}
                <ChevronDown className="h-4 w-4 text-steel transition-transform duration-150 group-open:rotate-180" strokeWidth={1.6} aria-hidden="true" />
              </summary>
              <ul className="pb-3">
                {column.links.map((link) => (
                  <li key={link.key} className="[&>*]:py-2.5">
                    <FooterItem link={link} />
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-hairline-soft pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-steel">{t("footer.copyright", { year })}</p>
          <p className="text-caption text-steel">{t("footer.assurance")}</p>
        </div>
      </Container>
    </footer>
  );
}
