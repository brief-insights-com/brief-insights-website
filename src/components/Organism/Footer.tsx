import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AnimatedWords from "../Atoms/AnimatedWords";
import logoImg from "@/assets/Brief_Insights_name_color.png";


function Footer () {
  const { t } = useTranslation();

  const productLinks = [
    { href: "#problem", label: t("footer.link_problem") },
    { href: "#product", label: t("footer.link_product") },
    { href: "#security", label: t("footer.link_security") },
    { href: "#before-after", label: t("footer.link_results") },
  ];

  const companyLinks = [
    { href: "#about", label: t("footer.link_about") },
    {
      href: `mailto:${t("about.contactEmail")}`,
      label: t("footer.link_contact"),
    },
    { href: "/privacy", label: t("footer.link_privacy") },
    { href: "/impressum", label: t("footer.link_terms") },
    { href: "#", label: t("footer.link_terms") },
  ];

  const complianceBadges = [
    t("footer.gdpr"),
    t("footer.zeroData"),
    "AWS · EU Hosted",
    "KDG · DSG-EKD",
  ];

  return (
    <footer className="bg-section-orange px-6 pt-20 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 pb-16 border-b border-foreground/10"
        >
          <h2 className="font-serif italic text-6xl md:text-8xl text-foreground leading-none mb-6">
            <AnimatedWords text={t("footer.cta")} delay={0} />
          </h2>
          <a
            href="mailto:info@brief-insights.com"
            className="text-lg text-foreground/60 hover:text-primary transition-colors underline underline-offset-4 decoration-foreground/20 hover:decoration-primary/60"
          >
            info@brief-insights.com
          </a>
        </motion.div>

        {/* Navigation grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 items-start"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="overflow-hidden max-w-[160px] mb-4">
              <img
                src={logoImg}
                alt="BriefInsights"
                className="w-full h-auto object-contain dark:brightness-[1.15]"
                style={{ transform: "scale(1.35)", transformOrigin: "center" }}
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
              {t("footer.productTitle")}
            </p>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
              {t("footer.companyTitle")}
            </p>
            <ul className="space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-4">
              Compliance
            </p>
            <div className="space-y-2.5">
              {complianceBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCheck className="h-3.5 w-3.5 text-status-online shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/40">
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.location")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;