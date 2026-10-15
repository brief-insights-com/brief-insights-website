import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/site/Layout";
import { buttonClass } from "@/components/site/buttonStyles";
import { usePageMeta } from "@/hooks/use-page-meta";
import { usePath } from "@/hooks/use-locale";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const path = usePath();
  usePageMeta("notFound");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Section className="py-24 md:py-32" containerClassName="flex flex-col items-center text-center">
      <h1 className="text-h2 text-ink md:text-h1">{t("notFound.title")}</h1>
      <p className="mt-4 max-w-[520px] text-body text-slate">{t("notFound.message")}</p>
      <Link to={path("home")} className={buttonClass("primary", "mt-8")}>
        {t("notFound.link")}
      </Link>
    </Section>
  );
};

export default NotFound;
