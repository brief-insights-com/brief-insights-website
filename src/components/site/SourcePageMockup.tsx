import { useTranslation } from "react-i18next";
import { useFormat } from "@/lib/format";

/** A synthetic extraction record, each field pointing at the line it was read from. */
export default function SourcePageMockup() {
  const { t } = useTranslation();
  const { euro, date } = useFormat();

  const fields = [
    { label: "creditor", value: "Certo Inkasso GmbH", line: 4 },
    { label: "fileNumber", value: "CI-88317", line: 9 },
    { label: "amount", value: euro(1042, 2), line: 17 },
    { label: "dueDate", value: date("2026-03-04"), line: null },
  ];

  return (
    <figure className="w-full overflow-hidden rounded-lg bg-canvas shadow-2 [font-variant-numeric:tabular-nums] lg:w-[520px] lg:shrink-0">
      <div className="flex items-center gap-3 border-b border-hairline-soft px-5 py-3">
        <span className="flex-1 text-micro uppercase text-steel">{t("mockup.sourcePage")}</span>
        <span className="text-caption text-steel">{t("mockup.pageOf", { page: 2, total: 4 })}</span>
      </div>
      <dl className="divide-y divide-hairline-soft px-5">
        {fields.map((field) => (
          <div key={field.label} className="flex items-center gap-3 py-3.5">
            <dt className="w-28 shrink-0 text-caption font-semibold text-steel">{t(`mockup.fields.${field.label}`)}</dt>
            <dd className="flex-1 text-body-sm text-charcoal">{field.value}</dd>
            <dd>
              {field.line === null ? (
                <span className="rounded-sm bg-tint-peach px-2 py-0.5 text-caption font-semibold text-accent-deep">{t("mockup.needsCheck")}</span>
              ) : (
                <span className="rounded-sm bg-tint-violet px-2 py-0.5 text-caption font-semibold text-chip-violet-800">
                  {t("mockup.line", { n: field.line })}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <figcaption className="border-t border-hairline-soft bg-surface-soft px-5 py-3 text-caption text-steel">{t("mockup.syntheticRecord")}</figcaption>
    </figure>
  );
}
