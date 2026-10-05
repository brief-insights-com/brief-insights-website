import { useEffect, useState, type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteShell from "@/components/site/SiteShell";
import Home from "@/pages/Home";
import Platform from "@/pages/Platform";
import Security from "@/pages/Security";
import Results from "@/pages/Results";
import About from "@/pages/About";
import Impressum from "@/pages/Impressum";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import { i18nByLang } from "@/i18n/i18n";
import { LANGS, PAGE_KEYS, PATHS, type Lang, type PageKey } from "@/routes";
import { getConsent, loadMetricool } from "@/lib/analytics";

const PAGES: Record<PageKey, () => JSX.Element> = {
  home: Home,
  platform: Platform,
  security: Security,
  results: Results,
  about: About,
  impressum: Impressum,
  privacy: Privacy,
};

function AnalyticsLoader() {
  useEffect(() => {
    if (getConsent() === "accepted") loadMetricool();
  }, []);
  return null;
}

/**
 * Providers shared by the browser app and the build-time prerenderer. Both must render the same
 * tree: React's useId (and the Radix ids built on it) depend on each component's position.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AnalyticsLoader />
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function LanguageLayout({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <I18nextProvider i18n={i18nByLang[lang]}>
      <SiteShell />
    </I18nextProvider>
  );
}

/** German at the root, English under /en/; unknown addresses fall through to the 404 page. */
export function AppRoutes() {
  return (
    <Routes>
      {LANGS.map((lang) => (
        <Route key={lang} element={<LanguageLayout lang={lang} />}>
          {PAGE_KEYS.map((page) => {
            const Page = PAGES[page];
            return <Route key={page} path={PATHS[page][lang]} element={<Page />} />;
          })}
          <Route path={lang === "en" ? "/en/*" : "*"} element={<NotFound />} />
        </Route>
      ))}
    </Routes>
  );
}
