import { useTranslation } from "react-i18next";
import HeroBand from "@/components/site/HeroBand";
import SourcePageMockup from "@/components/site/SourcePageMockup";
import ComparisonTable, { type ComparisonRow } from "@/components/site/ComparisonTable";
import CtaBanner from "@/components/site/CtaBanner";
import { Card, Container, RuledItem, Section, SectionHeader } from "@/components/site/Layout";
import { usePageMeta } from "@/hooks/use-page-meta";

type Item = { title: string; body: string };

export default function Platform() {
  const { t } = useTranslation();
  usePageMeta("platform");

  const steps = t("platform.steps.items", { returnObjects: true }) as Item[];
  const capabilities = t("platform.capabilities.items", { returnObjects: true }) as Item[];
  const rows = t("platform.compare.rows", { returnObjects: true }) as ComparisonRow[];

  return (
    <>
      <HeroBand variant={1} title={t("platform.hero.title")} subtitle={t("platform.hero.subtitle")} />

      <Section>
        <SectionHeader size="display" title={t("platform.steps.title")} lead={t("platform.steps.lead")} />
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <RuledItem as="li" key={step.title}>
              <h3 className="text-h5 text-ink">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-2 text-body-sm text-slate">{step.body}</p>
            </RuledItem>
          ))}
        </ol>
      </Section>

      {/* One highlight banner per page, on the sky card tint. */}
      <section className="bg-canvas pb-16 md:pb-24">
        <Container>
          <div className="flex flex-col gap-8 rounded-lg bg-tint-sky p-6 md:p-12 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex-1">
              <h2 className="max-w-[460px] text-h3 text-charcoal md:text-h2">{t("platform.highlight.title")}</h2>
              <p className="mt-4 max-w-[460px] text-body text-charcoal">{t("platform.highlight.body")}</p>
            </div>
            <SourcePageMockup />
          </div>
        </Container>
      </section>

      <Section tone="surface">
        <SectionHeader title={t("platform.capabilities.title")} lead={t("platform.capabilities.lead")} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <Card key={item.title}>
              <h3 className="text-h4 text-ink">{item.title}</h3>
              <p className="mt-3 text-body-sm text-slate">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title={t("platform.compare.title")} lead={t("platform.compare.lead")} />
        <ComparisonTable
          columns={t("platform.compare.columns", { returnObjects: true }) as { label: string; before: string; after: string }}
          rows={rows}
          note={t("platform.compare.note")}
        />
      </Section>

      <CtaBanner secondary={{ to: "/security", label: t("actions.readSecurity") }} />
    </>
  );
}
