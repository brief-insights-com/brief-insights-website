import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors mb-10 inline-block"
        >
          ← {t("notFound.link")}
        </Link>

        <h1 className="text-4xl font-bold mb-4">{t("privacy.title")}</h1>
        <p className="text-muted-foreground mb-12">{t("privacy.placeholder")}</p>

        {/* Paste the e-recht24 generated Datenschutzerklärung content here */}
        <div className="prose prose-invert max-w-none text-foreground/80 space-y-4">
          <p className="text-muted-foreground italic">{t("privacy.comingSoon")}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
