import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AnimatedWords from "../Atoms/AnimatedWords";
import { Clock, CheckCheck, MoveRight } from "lucide-react";

function BeforeAfter() {
  const { t } = useTranslation();

  const beforeItems = [
    t("beforeAfter.before1"),
    t("beforeAfter.before2"),
    t("beforeAfter.before3"),
    t("beforeAfter.before4"),
    t("beforeAfter.before5"),
  ];

  const afterItems = [
    t("beforeAfter.after1"),
    t("beforeAfter.after2"),
    t("beforeAfter.after3"),
    t("beforeAfter.after4"),
    t("beforeAfter.after5"),
  ];

  return (
    <section id="before-after" className="bg-section-blue px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
            {t("beforeAfter.label")}
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground leading-tight">
            <AnimatedWords text={t("beforeAfter.title")} delay={0.1} />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bento-card bento-card-frosted rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="h-2 w-2 rounded-full bg-destructive" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("beforeAfter.beforeLabel")}
              </span>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <Clock className="h-4 w-4 shrink-0 mt-0.5 text-destructive/60" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center pt-14"
          >
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-background/60 border border-foreground/10">
              <MoveRight className="h-4 w-4 text-foreground" />
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bento-card bento-card-frosted rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="h-2 w-2 rounded-full bg-status-online animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("beforeAfter.afterLabel")}
              </span>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <CheckCheck className="h-4 w-4 shrink-0 mt-0.5 text-status-online" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Animated time bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 bento-card bento-card-frosted rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-mono">
              {t("beforeAfter.timePerCase")}
            </span>
            <span className="text-xs font-semibold text-status-online">
              {t("beforeAfter.reduction")}
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{t("beforeAfter.manualAvg")}</span>
                <span>{t("beforeAfter.manualMin")}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  className="h-full rounded-full bg-destructive/50"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{t("beforeAfter.withBriefXtract")}</span>
                <span>{t("beforeAfter.fifteenMin")}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "10%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                  className="h-full rounded-full bg-status-online"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default BeforeAfter;
