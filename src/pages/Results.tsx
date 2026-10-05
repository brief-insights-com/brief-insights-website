import { useTranslation } from "react-i18next";
import HeroBand from "@/components/site/HeroBand";
import ComparisonTable, { type ComparisonRow } from "@/components/site/ComparisonTable";
import RoiCalculator from "@/components/site/RoiCalculator";
import CtaBanner from "@/components/site/CtaBanner";
import { RuledItem, Section, SectionHeader } from "@/components/site/Layout";
import { usePageMeta } from "@/hooks/use-page-meta";

type Item = { title: string; body: string };

export default function Results() {
  const { t } = useTranslation();
  usePageMeta("results");

  const rows = t("results.compare.rows", { returnObjects: true }) as ComparisonRow[];
  const capacity = t("results.capacity.items", { returnObjects: true }) as Item[];

  return (
    <>
      <HeroBand variant={3} title={t("results.hero.title")} subtitle={t("results.hero.subtitle")} />

      <Section>
        <SectionHeader size="display" title={t("results.compare.title")} lead={t("results.compare.lead")} />
        <ComparisonTable
          columns={t("results.compare.columns", { returnObjects: true }) as { label: string; before: string; after: string }}
          rows={rows}
          note={t("results.compare.note")}
          labelWidth="w-[36%]"
        />
      </Section>

      <Section tone="surface">
        <SectionHeader title={t("results.calculator.title")} lead={t("results.calculator.lead")} />
        <RoiCalculator />
      </Section>

      <Section>
        <SectionHeader title={t("results.capacity.title")} lead={t("results.capacity.lead")} />
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {capacity.map((item) => (
            <RuledItem key={item.title} className="pt-6">
              <h3 className="text-h4 text-ink">{item.title}</h3>
              <p className="mt-3 text-body-sm text-slate">{item.body}</p>
            </RuledItem>
          ))}
        </div>
      </Section>

      <CtaBanner variant="results" secondary={{ page: "platform", label: t("actions.seePlatform") }} />
    </>
  );
}
