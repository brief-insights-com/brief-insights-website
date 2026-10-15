import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "demo" | "secondary" | "secondaryOnDark" | "link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-button transition-colors duration-150 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  // One per viewport: the dominant action.
  primary:
    "min-h-11 bg-primary px-5 py-3 text-primary-foreground active:bg-primary-pressed disabled:bg-hairline disabled:text-disabled",
  // The demo request is the dominant action site-wide: logo orange, dark text, never white.
  demo: "min-h-11 bg-accent px-5 py-3 text-accent-foreground active:brightness-95 disabled:bg-hairline disabled:text-disabled",
  secondary: "min-h-11 border border-hairline-strong px-5 py-3 text-ink active:bg-surface",
  secondaryOnDark: "min-h-11 border border-on-dark-muted px-5 py-3 text-on-dark active:bg-on-dark/10",
  link: "min-h-11 gap-1.5 rounded-sm px-0 text-body-sm font-medium text-primary hover:text-primary-pressed",
};

/** Class names for the design system's Button variants, for <a>, <Link> and <button> alike. */
export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}
