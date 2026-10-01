import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeroBand from "@/components/site/HeroBand";
import PhotoPair from "@/components/site/PhotoPair";
import CtaBanner from "@/components/site/CtaBanner";
import { Caption, RuledItem, Section, SectionHeader } from "@/components/site/Layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import stackBefore from "@/assets/doc-stack.jpg";
import handoverAfter from "@/assets/intake-box-handover-1600.jpg";
import handoverAfterSmall from "@/assets/intake-box-handover-800.jpg";

const CONTACT_EMAIL = "info@brief-insights.com";

export default function About() {
  const { t } = useTranslation();
  usePageMeta("about");

  const facts = t("about.why.facts", { returnObjects: true }) as { label: string; value: string }[];

  return (
    <>
      <HeroBand variant={0} title={t("about.hero.title")} subtitle={t("about.hero.subtitle")} />

      <Section>
        <SectionHeader size="display" title={t("about.why.title")} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
          <div className="max-w-[680px] space-y-6 text-body text-charcoal md:text-subtitle md:leading-[1.6]">
            <p>{t("about.why.p1")}</p>
            <p>{t("about.why.p2")}</p>
            <p>
              {t("about.why.p3Before")}
              <Link to="/security" className="font-medium text-primary underline decoration-1">
                {t("about.why.p3Link")}
              </Link>
              {t("about.why.p3After")}
            </p>
          </div>
          {/* The company's facts as a record: rules, not a card. */}
          <dl className="self-start border-t-2 border-ink">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 border-b border-hairline-soft py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4">
                <dt className="text-body-sm font-medium text-slate sm:w-36 sm:shrink-0">{fact.label}</dt>
                <dd className="text-body font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader title={t("about.photos.title")} lead={t("about.photos.lead")} />
        <PhotoPair
          before={{
            src: stackBefore,
            width: 896,
            height: 640,
            alt: t("about.photos.before.alt"),
            caption: t("about.photos.before.caption"),
          }}
          after={{
            src: handoverAfter,
            srcSet: `${handoverAfterSmall} 800w, ${handoverAfter} 1600w`,
            width: 1600,
            height: 773,
            alt: t("about.photos.after.alt"),
            caption: t("about.photos.after.caption"),
          }}
        />
        <Caption className="mt-6 text-center">{t("about.photos.note")}</Caption>
      </Section>

      <Section id="contact">
        <SectionHeader title={t("about.contact.title")} />
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          <RuledItem className="pt-6">
            <h3 className="text-body-sm font-medium text-slate">{t("about.contact.email.label")}</h3>
            <p className="mt-2 text-h4">
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-words text-primary">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-3 text-body-sm text-slate">{t("about.contact.email.body")}</p>
          </RuledItem>
          <RuledItem className="pt-6">
            <h3 className="text-body-sm font-medium text-slate">{t("about.contact.office.label")}</h3>
            <p className="mt-2 text-h4 text-ink">{t("about.contact.office.value")}</p>
            <address className="mt-3 text-body-sm not-italic text-slate">{t("about.contact.office.address")}</address>
          </RuledItem>
          <RuledItem className="pt-6">
            <h3 className="text-body-sm font-medium text-slate">{t("about.contact.audience.label")}</h3>
            <p className="mt-2 text-h4 text-ink">{t("about.contact.audience.value")}</p>
            <p className="mt-3 text-body-sm text-slate">{t("about.contact.audience.body")}</p>
          </RuledItem>
        </div>
      </Section>

      <CtaBanner secondary={{ to: "/results", label: t("actions.workOutHours") }} />
    </>
  );
}
