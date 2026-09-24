import React from "react";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

function TransparentButton() {
  const { t } = useTranslation();

  return (
    <a
      href={`mailto:${t("about.contactEmail")}`}
      className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground/60 border border-foreground/20 px-5 py-2 rounded-lg hover:text-foreground hover:border-foreground/40 transition-colors"
    >
      <Mail className="h-4 w-4" />
      {t("about.contactEmail")}
    </a>
  );
}

export default TransparentButton;
