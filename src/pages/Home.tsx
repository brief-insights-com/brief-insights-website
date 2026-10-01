import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, FileText, Share2, TriangleAlert, type LucideIcon } from "lucide-react";
import HeroBand from "@/components/site/HeroBand";
import IntakeMockup from "@/components/site/IntakeMockup";
import PhotoPair from "@/components/site/PhotoPair";
import CtaBanner from "@/components/site/CtaBanner";
import { DemoButton } from "@/components/site/DemoDialog";
import { Caption, Container, RuledItem, Section, SectionHeader } from "@/components/site/Layout";
import { buttonClass } from "@/components/site/buttonStyles";
import { usePageMeta } from "@/hooks/use-page-meta";
import { cn } from "@/lib/utils";
import deskBefore from "@/assets/doc-worker.jpg";
import tabletAfter from "@/assets/counselor-tablet-review-1600.jpg";
import tabletAfterSmall from "@/assets/counselor-tablet-review-800.jpg";

type Item = { title: string; body: string };

const FEATURE_ICONS: LucideIcon[] = [FileText, TriangleAlert, Share2];
// One hue per figure; the bar is a second reading of the number, never extra information.
const STAT_BARS = [
  { width: "90%", tone: "bg-primary" },
  { width: "94%", tone: "bg-chip-teal" },
  { width: "100%", tone: "bg-chip-violet" },
];

export default function Home() {
  const { t } = useTranslation();
  usePageMeta("home");

  const stats = t("home.stats.items", { returnObjects: true }) as { value: string; label: string }[];
  const features = t("home.features.items", { returnObjects: true }) as Item[];
  const assurances = t("home.security.items", { returnObjects: true }) as Item[];

  return (
    <>
      <HeroBand
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        actions={
          <>
            <DemoButton />
            <Link to="/platform" className={buttonClass("secondaryOnDark")}>
              {t("actions.seePlatform")}
            </Link>
          </>
        }
        breakout={<IntakeMockup />}
      />

      {/* The stat row picks up where the mockup breaks out of the hero. */}
      <section className="bg-surface pb-16 pt-[168px] md:pb-24 md:pt-[296px]">
        <Container>
          <h2 className="text-center text-h3 text-ink md:text-h2">{t("home.stats.title")}</h2>
          <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10 [font-variant-numeric:tabular-nums]">
            {stats.map((stat, index) => (
              <div key={stat.value}>
                <p className="text-h1 text-ink lg:text-display">{stat.value}</p>
                <p className="mt-2 text-body-sm text-slate md:mt-3">{stat.label}</p>
                <div aria-hidden="true" className="mt-3 h-2 overflow-hidden rounded-full bg-hairline md:mt-4">
                  <div className={cn("h-2 rounded-full", STAT_BARS[index].tone)} style={{ width: STAT_BARS[index].width }} />
                </div>
              </div>
            ))}
          </div>
          <Caption className="mt-8 md:text-center">{t("home.stats.note")}</Caption>
        </Container>
      </section>

      <Section>
        <SectionHeader size="display" title={t("home.features.title")} lead={t("home.features.lead")} />
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = FEATURE_ICONS[index];
            return (
              <RuledItem key={feature.title} className="pt-6">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-4 text-h4 text-ink">{feature.title}</h3>
                <p className="mt-3 text-body-sm text-slate">{feature.body}</p>
              </RuledItem>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link to="/platform" className={buttonClass("link")}>
            {t("actions.seeWholePlatform")}
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader title={t("home.photos.title")} lead={t("home.photos.lead")} />
        <PhotoPair
          before={{
            src: deskBefore,
            width: 1216,
            height: 768,
            alt: t("home.photos.before.alt"),
            caption: t("home.photos.before.caption"),
          }}
          after={{
            src: tabletAfter,
            srcSet: `${tabletAfterSmall} 800w, ${tabletAfter} 1600w`,
            width: 1600,
            height: 773,
            alt: t("home.photos.after.alt"),
            caption: t("home.photos.after.caption"),
          }}
        />
      </Section>

      <Section>
        <SectionHeader title={t("home.security.title")} />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item) => (
            <RuledItem key={item.title}>
              <h3 className="text-h5 text-ink">{item.title}</h3>
              <p className="mt-2 text-body-sm text-slate">{item.body}</p>
            </RuledItem>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/security" className={buttonClass("link")}>
            {t("actions.readSecurity")}
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <CtaBanner secondary={{ to: "/results", label: t("actions.workOutHours") }} />
    </>
  );
}
