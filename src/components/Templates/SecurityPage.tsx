import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Landmark,
  Server,
  ShieldCheck,
  Trash2,
  Lock,
} from "lucide-react";
import AnimatedWords from "../Atoms/AnimatedWords";
import Badges from "../Atoms/Badges";
import SecurityCard from "../Molecule/SecurityCard";

function SecurityPage() {
  const { t } = useTranslation();

  const credentials = [
    {
      icon: ShieldCheck,
      title: t("security.gdprTitle"),
      desc: t("security.gdprDesc"),
    },
    {
      icon: Server,
      title: t("security.hostingTitle"),
      desc: t("security.hostingDesc"),
    },
    {
      icon: Trash2,
      title: t("security.retentionTitle"),
      desc: t("security.retentionDesc"),
    },
    {
      icon: Landmark,
      title: t("security.churchTitle"),
      desc: t("security.churchDesc"),
    },
    {
      icon: Lock,
      title: t("security.encryptionTitle"),
      desc: t("security.encryptionDesc"),
    },
    {
      icon: Building2,
      title: t("security.infraTitle"),
      desc: t("security.infraDesc"),
    },
  ];

  const badges = [
    "GDPR / DSGVO",
    "AWS · EU Hosted",
    "KDG",
    "DSG-EKD",
    "Zero Retention",
    t("security.tlsBadge"),
  ];

  return (
    <section id="security" className="bg-section-blue px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
            {t("security.label")}
          </p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground leading-tight mb-4 max-w-2xl">
            <AnimatedWords text={t("security.title")} delay={0.1} />
          </h2>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            {t("security.subtitle")}
          </p>
        </motion.div>

        {/* Trust badge strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {badges.map((badge, indice) => (
            <Badges key={indice} badge={badge} />
          ))}
        </motion.div>

        {/* Credential grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((cred, indice) => (
            <SecurityCard cred={cred} i={indice} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SecurityPage;
