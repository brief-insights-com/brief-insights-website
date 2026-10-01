import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { COOKIE_SETTINGS_EVENT, getConsent, loadMetricool, setConsent } from "@/lib/analytics";
import { buttonClass } from "@/components/site/buttonStyles";

/**
 * Analytics consent. Accept and Decline carry equal weight, and the footer's
 * "Cookie settings" link reopens this banner so consent can be withdrawn as easily as given.
 */
const CookieBanner = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    setConsent(value);
    if (value === "accepted") loadMetricool();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="region" aria-label={t("cookie.label")} className="fixed inset-x-0 bottom-0 z-40 p-4 md:p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-lg border border-hairline bg-canvas px-5 py-4 shadow-4 sm:flex-row sm:items-center">
        <p className="flex-1 text-body-sm text-slate">
          {t("cookie.message")}{" "}
          <Link to="/privacy" className="text-primary underline">
            {t("cookie.privacyLink")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose("declined")} className={buttonClass("secondary", "flex-1 sm:flex-none")}>
            {t("cookie.decline")}
          </button>
          <button type="button" onClick={() => choose("accepted")} className={buttonClass("secondary", "flex-1 sm:flex-none")}>
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
