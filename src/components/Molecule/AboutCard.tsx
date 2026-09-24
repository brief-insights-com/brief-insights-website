import React from "react";
import { motion } from "framer-motion";
import digitalSolution from "@/assets/Gemini_Generated_Digital_Solution.png";
import { useTranslation } from "react-i18next";

function AboutCard() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bento-card bento-card-frosted rounded-xl overflow-hidden flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={digitalSolution}
          alt="Counselor smiling, efficiently using BriefXtract on a tablet"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>
      <div className="p-8 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("about.mission")}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("about.team")}
        </p>
      </div>
    </motion.div>
  );
}

export default AboutCard;
