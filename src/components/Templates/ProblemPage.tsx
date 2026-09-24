import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import bagChaos from "@/assets/Gemini_Generated_bag_chaos.png";
import manualProcess from "@/assets/Gemini_Generated_Manual_Process.png";
import paperworkBurden from "@/assets/Gemini_Generated_Paperwork_Burden.png";

import {
  Clock
} from "lucide-react";

function ProblemPage() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <section id="problem" ref={ref} className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Main parallax image — the emotional peak: exhausted counselor working late */}
        <motion.div
          style={{ scale }}
          className="relative rounded-2xl overflow-hidden border border-border/40 mb-6"
        >
          <motion.img
            style={{ y, height: "480px", objectPosition: "center 40%" }}
            src={bagChaos}
            alt="Client arriving with a bag full of chaotic paper documents"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3"
            >
              {t("problem.label")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight"
            >
              {t("problem.title")}
            </motion.h2>
          </div>
        </motion.div>

        {/* Two-column caption row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left card — manual review image: close-up of magnifying glass on documents */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden border border-border/40"
            style={{ minHeight: "160px" }}
          >
            <img
              src={manualProcess}
              alt="Close-up of manual document review with magnifying glass"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
            <div className="relative z-10 p-6 flex gap-4 items-start">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {t("problem.hoursTitle")}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("problem.hoursDesc")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right card — paperwork burden: stressed counselor with stacks of binders */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-xl overflow-hidden border border-border/40"
            style={{ minHeight: "160px" }}
          >
            <img
              src={paperworkBurden}
              alt="Counselor overwhelmed by stacks of binders and paper files"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
            <div className="relative z-10 p-6">
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {t("problem.debtTitle")}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("problem.debtDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ProblemPage;
