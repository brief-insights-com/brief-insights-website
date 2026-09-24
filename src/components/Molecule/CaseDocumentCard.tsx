import React from "react";
import { useTranslation } from "react-i18next";

function caseDocumentCard() {
  const { t } = useTranslation();

  const caseDocuments = [
    { label: t("bentoMock.doc1"), linked: true },
    { label: t("bentoMock.doc2"), linked: true },
    { label: t("bentoMock.doc3"), linked: false },
  ];
  return (
    <div className="h-20 rounded-lg bg-surface-3/50 border border-border/50 flex items-center px-4 gap-3 flex-wrap">
      {caseDocuments.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-2 border border-border/50 text-xs text-muted-foreground"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${item.linked ? "bg-status-online" : "bg-primary"}`}
          />
          {item.label}
        </div>
      ))}
      <div className="text-xs text-muted-foreground/50 ml-auto">
        {t("bentoMock.masterCase")}
      </div>
    </div>
  );
}

export default caseDocumentCard;
