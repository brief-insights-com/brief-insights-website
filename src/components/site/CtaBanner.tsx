import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "./Layout";
import { DemoButton } from "./DemoDialog";
import { buttonClass } from "./buttonStyles";
import { usePath } from "@/hooks/use-locale";
import type { PageKey } from "@/routes";

/** The closing call to action: one per page, above the footer. */
export default function CtaBanner({
  variant = "default",
  secondary,
}: {
  variant?: "default" | "security" | "results";
  secondary: { page: PageKey; label: string };
}) {
  const { t } = useTranslation();
  const path = usePath();
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <Container>
        <div className="rounded-lg bg-surface px-6 py-10 text-center md:p-16">
          <h2 className="text-h3 text-ink md:text-h2">{t(`cta.${variant}.title`)}</h2>
          <p className="mx-auto mt-3 max-w-[560px] text-body text-slate md:mt-4 md:text-subtitle">{t(`cta.${variant}.body`)}</p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:mt-8">
            <DemoButton />
            <Link to={path(secondary.page)} className={buttonClass("secondary")}>
              {secondary.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
