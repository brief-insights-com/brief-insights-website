import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AnimatedWords from "../Atoms/AnimatedWords";
import OrangeButton from "../Atoms/OrangeButton";
import DemoModal from "../DemoModal";

function ROISection() {
  const { t } = useTranslation();
  const [counselors, setCounselors] = useState(10);
  const [clientsPerWeek, setClientsPerWeek] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(20);
  const [demoOpen, setDemoOpen] = useState(false);

  const HOURS_SAVED_PER_CASE = 3.75; // 4h manual − 0.25h with BriefXtract
  const WEEKS_PER_YEAR = 48;

  const hoursSavedPerWeek = Math.round(
    counselors * clientsPerWeek * HOURS_SAVED_PER_CASE,
  );
  const hoursSavedPerYear = hoursSavedPerWeek * WEEKS_PER_YEAR;
  const eurosSaved = hoursSavedPerYear * hourlyRate;

  const fmt = (n: number) => n.toLocaleString("de-DE");
  const fmtEur = (n: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  const sliders = [
    {
      label: t("roi.calc_counselors"),
      value: counselors,
      min: 1,
      max: 50,
      step: 1,
      display: String(counselors),
      onChange: (v: number) => setCounselors(v),
      minLabel: "1",
      maxLabel: "50",
    },
    {
      label: t("roi.calc_clients"),
      value: clientsPerWeek,
      min: 1,
      max: 20,
      step: 1,
      display: String(clientsPerWeek),
      onChange: (v: number) => setClientsPerWeek(v),
      minLabel: "1",
      maxLabel: "20",
    },
    {
      label: t("roi.calc_hourly"),
      value: hourlyRate,
      min: 15,
      max: 50,
      step: 1,
      display: `€${hourlyRate}`,
      onChange: (v: number) => setHourlyRate(v),
      minLabel: "€15",
      maxLabel: "€50",
    },
  ];

  const outputs = [
    {
      label: t("roi.calc_hours_week"),
      value: fmt(hoursSavedPerWeek),
      unit: "h",
      highlight: false,
    },
    {
      label: t("roi.calc_hours_year"),
      value: fmt(hoursSavedPerYear),
      unit: "h / yr",
      highlight: false,
    },
    {
      label: t("roi.calc_savings"),
      value: fmtEur(eurosSaved),
      unit: "",
      highlight: true,
    },
  ];

  return (
    <section id="ROISection" className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
            {t("roi.label")}
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground leading-tight mb-4">
            <AnimatedWords text={t("roi.title")} delay={0.1} />
          </h2>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            {t("roi.subtitle")}
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bento-card bento-card-frosted rounded-2xl p-8 mb-5"
        >
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left — sliders */}
            <div className="flex flex-col gap-8">
              {sliders.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">
                      {s.label}
                    </label>
                    <span className="text-lg font-bold text-primary tabular-nums">
                      {s.display}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    onChange={(e) => s.onChange(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground/50 mt-1.5">
                    <span>{s.minLabel}</span>
                    <span>{s.maxLabel}</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground/50 leading-relaxed">
                {t("roi.calc_assumption")}
              </p>
            </div>

            {/* Right — output metrics */}
            <div className="flex flex-col gap-4">
              {outputs.map((o) => (
                <div
                  key={o.label}
                  className={`rounded-xl p-5 border ${
                    o.highlight
                      ? "bg-primary/10 border-primary/20"
                      : "bg-surface-1/60 border-foreground/10"
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1.5">
                    {o.label}
                  </p>
                  <p
                    className={`text-4xl font-bold tabular-nums ${o.highlight ? "text-primary" : "text-foreground"}`}
                  >
                    {o.value}
                  </p>
                  {o.unit && (
                    <p className="text-xs text-muted-foreground/50 mt-1">
                      {o.unit}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Disclaimer + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 bento-card bento-card-frosted rounded-xl"
        >
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-lg">
            {t("roi.disclaimer")}
          </p>
          <OrangeButton onRequestDemo={() => setDemoOpen(true)} />
        </motion.div>
      </div>
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </section>
  );
}

export default ROISection;
