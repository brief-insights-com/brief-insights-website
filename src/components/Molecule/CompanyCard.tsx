import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CompanyDetail from "../Atoms/CompanyDetail";
import TransparentButton from "../Atoms/TransparentButton";
import OrangeButton from "../Atoms/OrangeButton";
import DemoModal from "../DemoModal";

function CompanyCard() {
  const { t } = useTranslation();
  const [demoOpen, setDemoOpen] = useState(false);

  const companyDetail = [
    {
      label: t("about.stat1Label"),
      value: t("about.stat1Value"),
    },
    {
      label: t("about.stat2Label"),
      value: t("about.stat2Value"),
    },
    {
      label: t("about.stat3Label"),
      value: t("about.stat3Value"),
    },
    {
      label: t("about.stat4Label"),
      value: t("about.stat4Value"),
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bento-card bento-card-frosted rounded-xl p-8 flex flex-col justify-between gap-6"
      >
        <div className="divide-y divide-foreground/10">
          {companyDetail.map((row, key) => (
            <CompanyDetail key={key} label={row.label} value={row.value} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <OrangeButton onRequestDemo={() => setDemoOpen(true)} />
          <TransparentButton />
        </div>
      </motion.div>
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </>
  );
}

export default CompanyCard;
