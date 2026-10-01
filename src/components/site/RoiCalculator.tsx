import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormat } from "@/lib/format";
import { calculateRoi, readInput, ROI_DEFAULTS, ROI_LIMITS, type RoiInput } from "@/lib/roi";
import { Card, Caption, RuledItem } from "./Layout";

const FIELDS: (keyof RoiInput)[] = ["counselors", "casesPerWeek", "hourlyCost"];

/** The hours calculator, with the arithmetic written out live underneath the results. */
export default function RoiCalculator() {
  const { t } = useTranslation();
  const { number, euro } = useFormat();
  const [raw, setRaw] = useState<Record<keyof RoiInput, string>>({
    counselors: String(ROI_DEFAULTS.counselors),
    casesPerWeek: String(ROI_DEFAULTS.casesPerWeek),
    hourlyCost: String(ROI_DEFAULTS.hourlyCost),
  });

  const result = useMemo(
    () =>
      calculateRoi({
        counselors: readInput(raw.counselors, "counselors"),
        casesPerWeek: readInput(raw.casesPerWeek, "casesPerWeek"),
        hourlyCost: readInput(raw.hourlyCost, "hourlyCost"),
      }),
    [raw],
  );

  const outputs = [
    { key: "hoursPerWeek", value: t("results.calculator.hoursUnit", { value: number(result.hoursPerWeek, 1) }) },
    { key: "hoursPerYear", value: t("results.calculator.hoursUnit", { value: number(result.hoursPerYear) }) },
    { key: "costPerYear", value: euro(result.costPerYear) },
  ];

  return (
    <Card className="mt-12 md:p-10 [font-variant-numeric:tabular-nums]">
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {FIELDS.map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={`roi-${field}`} className="text-body-sm font-medium text-charcoal">
              {t(`results.calculator.${field}`)}
            </label>
            <input
              id={`roi-${field}`}
              type="number"
              inputMode={field === "hourlyCost" ? "decimal" : "numeric"}
              min={ROI_LIMITS[field].min}
              max={ROI_LIMITS[field].max}
              value={raw[field]}
              onChange={(event) => setRaw((current) => ({ ...current, [field]: event.target.value }))}
              className="h-11 rounded-md border border-hairline-strong bg-canvas px-4 text-body text-ink outline-none focus-visible:shadow-none focus:border-2 focus:border-primary focus:px-[15px]"
            />
          </div>
        ))}
      </div>

      <div aria-live="polite" className="mt-10 grid gap-8 md:grid-cols-3">
        {outputs.map((output) => (
          <RuledItem key={output.key}>
            <p className="text-body-sm font-medium text-slate">{t(`results.calculator.${output.key}`)}</p>
            <p className="mt-2 text-h2 text-ink md:text-h1">{output.value}</p>
          </RuledItem>
        ))}
      </div>

      <p className="mt-8 rounded-md border border-hairline-soft bg-surface-soft px-5 py-4 text-body-sm text-charcoal">
        {t("results.calculator.formula", {
          counselors: number(result.counselors),
          cases: number(result.casesPerWeek),
          week: number(result.hoursPerWeek, 1),
          year: number(result.hoursPerYear),
          rate: euro(result.hourlyCost, Number.isInteger(result.hourlyCost) ? 0 : 2),
          cost: euro(result.costPerYear),
        })}
      </p>
      <Caption className="mt-4">{t("results.calculator.note")}</Caption>
    </Card>
  );
}
