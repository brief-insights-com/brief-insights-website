import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Layout";
import { DemoButton } from "./DemoDialog";
import { useDemoDialog } from "./demoDialogContext";
import { buttonClass } from "./buttonStyles";

const NAV = [
  { to: "/platform", key: "nav.platform" },
  { to: "/security", key: "nav.security" },
  { to: "/results", key: "nav.results" },
  { to: "/about", key: "nav.about" },
] as const;

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
] as const;

function LanguageSwitch({ className }: { className?: string }) {
  const { t, i18n } = useTranslation();
  const current = i18n.language?.startsWith("de") ? "de" : "en";
  return (
    <div role="group" aria-label={t("nav.language")} className={cn("flex items-center", className)}>
      {LANGUAGES.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          {index > 0 ? <span aria-hidden="true" className="mx-1 h-3.5 w-px bg-hairline" /> : null}
          <button
            type="button"
            lang={lang.code}
            aria-label={lang.name}
            aria-pressed={current === lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={cn(
              "flex h-11 min-w-9 items-center justify-center rounded-sm px-1 text-body-sm",
              current === lang.code ? "font-medium text-ink" : "text-steel",
            )}
          >
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  );
}

function ThemeToggle({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t("nav.themeToLight") : t("nav.themeToDark")}
      className={cn("flex h-11 w-11 items-center justify-center rounded-md text-slate active:bg-surface", className)}
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.6} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={1.6} />}
    </button>
  );
}

function Wordmark() {
  const { t } = useTranslation();
  // The supplied logo is a stacked lockup and is illegible at nav height,
  // so the bar carries the wordmark as type until a horizontal lockup exists.
  return (
    <Link to="/" aria-label={t("nav.home")} className="rounded-sm py-2 text-h5 tracking-[-0.2px] text-ink lg:text-h4">
      Brief Insights
    </Link>
  );
}

function MobileMenu() {
  const { t } = useTranslation();
  const { open: openDemo } = useDemoDialog();
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        className="flex h-11 w-11 items-center justify-center rounded-md text-ink active:bg-surface"
        aria-label={t("nav.openMenu")}
      >
        <Menu className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand-navy-deep/65 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(340px,88vw)] flex-col bg-canvas shadow-4 duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="flex h-16 items-center justify-between border-b border-hairline pl-6 pr-2">
            <DialogPrimitive.Title className="text-h5 text-ink">{t("nav.menu")}</DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="flex h-11 w-11 items-center justify-center rounded-md text-ink active:bg-surface"
              aria-label={t("nav.closeMenu")}
            >
              <X className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>
          <DialogPrimitive.Description className="sr-only">{t("nav.main")}</DialogPrimitive.Description>
          <nav aria-label={t("nav.main")} className="flex flex-col px-6 py-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "border-b border-hairline-soft py-4 text-h5",
                    isActive ? "text-ink underline decoration-2 underline-offset-[6px]" : "text-slate",
                  )
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4 border-t border-hairline px-6 py-6">
            <div className="flex items-center justify-between">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
            <button
              type="button"
              className={buttonClass("primary", "w-full")}
              onClick={() => {
                setOpen(false);
                openDemo();
              }}
            >
              {t("actions.requestDemo")}
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default function SiteHeader() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <Container className="flex h-14 items-center gap-2 pr-2 md:pr-4 lg:h-16 lg:gap-10 lg:pr-8">
        <Wordmark />

        <nav aria-label={t("nav.main")} className="hidden flex-1 items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex h-16 items-center border-b-2 pt-0.5 text-body-sm font-medium",
                  isActive ? "border-ink text-ink" : "border-transparent text-slate",
                )
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-3">
          <LanguageSwitch className="hidden lg:flex" />
          <ThemeToggle className="hidden lg:flex" />
          <DemoButton className="ml-1 hidden lg:inline-flex" />
          <DemoButton label={t("actions.demoShort")} className="px-4 lg:hidden" />
          <span className="lg:hidden">
            <MobileMenu />
          </span>
        </div>
      </Container>
    </header>
  );
}
