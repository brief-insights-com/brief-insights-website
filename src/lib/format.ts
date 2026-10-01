import { useMemo } from "react";
import { useTranslation } from "react-i18next";

/** Locale-aware number, currency and date formatting for the current language. */
export function useFormat() {
  const { i18n } = useTranslation();
  const locale = i18n.language?.startsWith("de") ? "de-DE" : "en-GB";

  return useMemo(() => {
    const number = (value: number, maximumFractionDigits = 0) =>
      new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value);
    const euro = (value: number, fractionDigits = 0) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }).format(value);
    const date = (iso: string) =>
      new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
    return { locale, number, euro, date };
  }, [locale]);
}
