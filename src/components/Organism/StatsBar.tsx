import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function StatsBar() {
  const { t } = useTranslation();

  const stats = [
    { value: "90%", label: t("stats.timeSaved") },
    { value: "~15 min", label: t("stats.downFrom") },
    { value: "4,000+", label: t("stats.counselors") },
  ];

  return (
    <section className="bg-section-orange px-6 pb-16">
      <a href="#ROISection">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto grid grid-cols-3 gap-px bg-foreground/10 rounded-xl overflow-hidden border border-foreground/10"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-background/80 px-8 py-7 flex flex-col gap-1"
            >
              <span className="text-3xl font-bold text-primary tracking-tight">
                {s.value}
              </span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </a>
    </section>
  );
}

export default StatsBar;
