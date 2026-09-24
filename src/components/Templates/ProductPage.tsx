import { motion } from "framer-motion";
import {
  ScanText,
  ShieldCheck,
  FileWarning,
  Workflow,
  Zap,
  Plug,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedWords from "../Atoms/AnimatedWords";
import { BentoCard } from "../BentoCard";
import { BentoGrid } from "../BentoGrid";
import ExtractionCard from "../Molecule/ExtractionCard";
import CaseDocumentCard from "../Molecule/CaseDocumentCard";

const PRODUCT_VIDEO_IDS: Record<string, string> = {
  en: "RAIj87wewqQ",
  de: "r6BsRdC8cTg",
};

function ProductPage() {
  const { t, i18n } = useTranslation();

  const videoId =
    PRODUCT_VIDEO_IDS[i18n.language] ?? PRODUCT_VIDEO_IDS.en;

  const extractionRows = [
    { label: t("bentoMock.creditor"), value: "Vodafone GmbH", conf: "99%" },
    { label: t("bentoMock.amount"), value: "€ 847.30", conf: "98%" },
    { label: t("bentoMock.fileNo"), value: "RIV-2024-88412", conf: "97%" },
    { label: t("bentoMock.dueDate"), value: "15 Jan 2025", conf: "96%" },
  ];

  return (
    <section id="product" className="bg-section-blue px-6 py-24">
      <div className="max-w-6xl mx-auto mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4"
        >
          {t("features.label")}
        </motion.p>
        <h2 className="font-serif italic text-5xl md:text-6xl text-foreground leading-tight">
          <AnimatedWords
            text={t("features.title1")}
            className="block"
            delay={0.1}
          />
          <AnimatedWords
            text={t("features.title2")}
            className="block text-foreground/50"
            delay={0.3}
          />
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-12 aspect-video rounded-xl overflow-hidden border border-border/50 shadow-lg"
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={t("features.videoTitle", "BriefXtract Platform")}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>

      <BentoGrid>
        <BentoCard
          title={t("features.extraction")}
          description={t("features.extractionDesc")}
          icon={ScanText}
          colSpan={2}
          className="bento-card-frosted"
        >
          <div className="h-32 rounded-lg bg-surface-3/50 border border-border/50 p-4 font-mono text-xs text-muted-foreground space-y-2 overflow-hidden">
            {extractionRows.map((row, i) => (
              <ExtractionCard row={row} i={i} />
            ))}
          </div>
        </BentoCard>

        <BentoCard
          title={t("features.gdpr")}
          description={t("features.gdprDesc")}
          icon={ShieldCheck}
          className="bento-card-frosted"
        />

        <BentoCard
          title={t("features.urgency")}
          description={t("features.urgencyDesc")}
          icon={FileWarning}
          className="bento-card-frosted"
        />

        <BentoCard
          title={t("features.caseEngine")}
          description={t("features.caseEngineDesc")}
          icon={Workflow}
          colSpan={2}
          className="bento-card-frosted"
        >
        <CaseDocumentCard />
        
        </BentoCard>

        <BentoCard
          title={t("features.faster")}
          description={t("features.fasterDesc")}
          icon={Zap}
          className="bento-card-frosted"
        />

        <BentoCard
          title={t("features.vivendi")}
          description={t("features.vivendiDesc")}
          icon={Plug}
          className="bento-card-frosted"
        />
      </BentoGrid>
    </section>
  );
}

export default ProductPage;
