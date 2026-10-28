import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type CSSProperties } from "react";
import type {} from "altcha/types/react";
import type { WidgetMethods } from "altcha/types";
import { useLang } from "@/hooks/use-locale";
import { DEMO_CHALLENGE_URL } from "@/lib/demoRequest";

export interface BotCheckHandle {
  /** The solved challenge to send with the request, solving it first if the visitor was quicker. */
  getPayload: () => Promise<string | null>;
}

type AltchaElement = HTMLElement & Partial<WidgetMethods>;

// The widget's own colours, mapped onto the design system tokens so it reads as part of the form.
const THEME = {
  "--altcha-border-color": "rgb(var(--bi-hairline-strong))",
  "--altcha-border-radius": "8px",
  "--altcha-color-base": "rgb(var(--bi-canvas))",
  "--altcha-color-base-content": "rgb(var(--bi-charcoal))",
  "--altcha-color-primary": "rgb(var(--bi-primary))",
  "--altcha-color-primary-content": "rgb(var(--bi-on-primary))",
  "--altcha-color-error": "rgb(var(--bi-semantic-error))",
  "--altcha-checkbox-border-color": "rgb(var(--bi-hairline-strong))",
  "--altcha-checkbox-border-radius": "4px",
  "--altcha-max-width": "100%",
} as CSSProperties;

/**
 * "I'm not a robot", without a third party. The browser solves a small proof-of-work
 * puzzle from our own demo API (ALTCHA), starting as soon as the visitor focuses the form,
 * and the API checks the answer before it creates anything. No cookies, nothing tracked.
 * The widget is a web component, so it loads only in the browser, when the dialog opens.
 */
const BotCheck = forwardRef<BotCheckHandle>(function BotCheck(_, ref) {
  const lang = useLang();
  const widget = useRef<AltchaElement>(null);
  const payload = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Literal specifiers on both branches: the bundler can only resolve imports it can read.
    Promise.all([import("altcha"), lang === "de" ? import("altcha/i18n/de") : import("altcha/i18n/en")])
      .then(() => !cancelled && setLoaded(true))
      .catch((error) => console.error("Bot check failed to load:", error));
    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    const element = widget.current;
    if (!loaded || !element) return;
    const onVerified = (event: Event) => {
      payload.current = (event as CustomEvent<{ payload: string }>).detail.payload;
    };
    const onStateChange = (event: Event) => {
      if ((event as CustomEvent<{ state: string }>).detail.state !== "verified") payload.current = null;
    };
    element.addEventListener("verified", onVerified);
    element.addEventListener("statechange", onStateChange);
    return () => {
      element.removeEventListener("verified", onVerified);
      element.removeEventListener("statechange", onStateChange);
    };
  }, [loaded]);

  useImperativeHandle(ref, () => ({
    async getPayload() {
      if (payload.current) return payload.current;
      const result = await widget.current?.verify?.();
      return result?.payload ?? payload.current;
    },
  }));

  if (!loaded) return <div aria-hidden="true" className="h-[58px] rounded-md border border-hairline-strong" />;

  return (
    <altcha-widget
      ref={widget}
      challenge={DEMO_CHALLENGE_URL}
      auto="onfocus"
      type="checkbox"
      language={lang}
      name="altcha"
      // No logo or attribution link, no interaction recording, and a mock challenge in local development.
      configuration={JSON.stringify({
        hideLogo: true,
        hideFooter: true,
        humanInteractionSignature: false,
        test: !DEMO_CHALLENGE_URL,
      })}
      style={THEME}
    />
  );
});

export default BotCheck;
