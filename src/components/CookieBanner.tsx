import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { getConsent, setConsent, loadMetricool } from "@/lib/analytics";

const CookieBanner = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    loadMetricool();
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent("declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bento-card bento-card-frosted rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-foreground/10 shadow-2xl">
            <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
              {t("cookie.message")}{" "}
              <a
                href="/privacy"
                className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {t("cookie.privacyLink")}
              </a>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDecline}
                className="text-sm text-muted-foreground border border-foreground/20 px-4 py-1.5 rounded-lg hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                {t("cookie.decline")}
              </button>
              <button
                onClick={handleAccept}
                className="text-sm font-medium text-primary-foreground bg-primary px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                {t("cookie.accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
