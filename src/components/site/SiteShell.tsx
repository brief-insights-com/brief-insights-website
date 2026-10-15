import { useEffect, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { DemoDialogProvider } from "./DemoDialog";
import CookieBanner from "@/components/CookieBanner";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Header, main and footer around every route. */
export default function SiteShell({ children }: { children?: ReactNode }) {
  const { t } = useTranslation();
  return (
    <DemoDialogProvider>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-canvas px-4 py-3 text-body-sm font-medium text-ink shadow-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("nav.skip")}
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children ?? <Outlet />}
      </main>
      <SiteFooter />
      <CookieBanner />
    </DemoDialogProvider>
  );
}
