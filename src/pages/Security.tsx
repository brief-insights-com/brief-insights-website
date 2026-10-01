import { useTranslation } from "react-i18next";
import HeroBand from "@/components/site/HeroBand";
import FaqList from "@/components/site/FaqList";
import CtaBanner from "@/components/site/CtaBanner";
import { TagBadge } from "@/components/site/StatusChip";
import { Card, RuledItem, Section, SectionHeader } from "@/components/site/Layout";
import { usePageMeta } from "@/hooks/use-page-meta";

type Item = { title: string; body: string };
type Commitment = Item & { tag: string };

// Each commitment keeps the same tint everywhere, so the colour stays a stable label.
const TAG_TONES = ["sky", "teal", "peach", "rose", "violet", "gray"] as const;

export default function Security() {
  const { t } = useTranslation();
  usePageMeta("security");

  const lifecycle = t("security.lifecycle.items", { returnObjects: true }) as Item[];
  const commitments = t("security.commitments.items", { returnObjects: true }) as Commitment[];
  const faq = t("security.faq.items", { returnObjects: true }) as { q: string; a: string }[];

  return (
    <>
      <HeroBand variant={2} title={t("security.hero.title")} subtitle={t("security.hero.subtitle")} />

      <Section>
        <SectionHeader size="display" title={t("security.lifecycle.title")} lead={t("security.lifecycle.lead")} />
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {lifecycle.map((stage, index) => (
            <RuledItem as="li" key={stage.title}>
              <h3 className="text-h5 text-ink">
                {index + 1}. {stage.title}
              </h3>
              <p className="mt-2 text-body-sm text-slate">{stage.body}</p>
            </RuledItem>
          ))}
        </ol>
      </Section>

      <Section tone="surface">
        <SectionHeader title={t("security.commitments.title")} lead={t("security.commitments.lead")} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {commitments.map((item, index) => (
            <Card key={item.title}>
              <TagBadge tone={TAG_TONES[index]}>{item.tag}</TagBadge>
              <h3 className="mt-4 text-h4 text-ink">{item.title}</h3>
              <p className="mt-3 text-body-sm text-slate">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title={t("security.faq.title")} />
        <FaqList items={faq} />
      </Section>

      <CtaBanner variant="security" secondary={{ to: "/platform", label: t("actions.seePlatform") }} />
    </>
  );
}
