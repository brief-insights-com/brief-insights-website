import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function OrangeButton({ onRequestDemo }: { onRequestDemo: () => void }) {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <button
          onClick={onRequestDemo}
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-5 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-primary/25"
        >
          {t("about.contact")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

export default OrangeButton;
