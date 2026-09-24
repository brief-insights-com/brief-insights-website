import React from "react";
import { motion } from "framer-motion";
import AnimatedWords from "@/components/Atoms/AnimatedWords";
import { useTranslation } from "react-i18next";
import AboutCard from "../Molecule/AboutCard";
import CompanyCard from "../Molecule/CompanyCard";

function AboutPage() {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-section-orange px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
            {t("about.label")}
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground leading-tight">
            <AnimatedWords text={t("about.title")} delay={0.1} />
          </h2>
        </motion.div>

        {/* Mission + contact row */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Left — Digital Solution image + mission text */}
          <AboutCard />

          {/* Right — Company facts + contact */}
          <CompanyCard />
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
