import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const token = (name: string) => `rgb(var(--bi-${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", "-apple-system", "system-ui", '"Segoe UI"', "Helvetica", "sans-serif"],
      },
      // Brief Insights type scale (design system: Display, Headings, Text, Utility).
      fontSize: {
        hero: ["80px", { lineHeight: "1.05", letterSpacing: "-2px", fontWeight: "600" }],
        display: ["56px", { lineHeight: "1.1", letterSpacing: "-1px", fontWeight: "600" }],
        h1: ["48px", { lineHeight: "1.15", letterSpacing: "-0.5px", fontWeight: "600" }],
        h2: ["36px", { lineHeight: "1.2", letterSpacing: "-0.5px", fontWeight: "600" }],
        h3: ["28px", { lineHeight: "1.25", letterSpacing: "-0.25px", fontWeight: "600" }],
        h4: ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        h5: ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        subtitle: ["18px", { lineHeight: "1.5" }],
        body: ["16px", { lineHeight: "1.55" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        caption: ["13px", { lineHeight: "1.4" }],
        micro: ["11px", { lineHeight: "1.4", letterSpacing: "1px", fontWeight: "600" }],
        button: ["14px", { lineHeight: "1.3", fontWeight: "500" }],
      },
      colors: {
        // Design-system names.
        canvas: token("canvas"),
        surface: { DEFAULT: token("surface"), soft: token("surface-soft") },
        hairline: { DEFAULT: token("hairline"), soft: token("hairline-soft"), strong: token("hairline-strong") },
        ink: { DEFAULT: token("ink"), deep: token("ink-deep") },
        charcoal: token("charcoal"),
        slate: token("slate"),
        steel: token("steel"),
        stone: token("stone"),
        disabled: token("muted"),
        "on-dark": { DEFAULT: token("on-dark"), muted: token("on-dark-muted") },
        "brand-navy": { DEFAULT: token("brand-navy"), deep: token("brand-navy-deep"), mid: token("brand-navy-mid") },
        tint: {
          peach: token("card-tint-peach"),
          amber: token("card-tint-amber"),
          "amber-bold": token("card-tint-amber-bold"),
          sky: token("card-tint-sky"),
          teal: token("card-tint-teal"),
          violet: token("card-tint-violet"),
          rose: token("card-tint-rose"),
          cream: token("card-tint-cream"),
          gray: token("card-tint-gray"),
        },
        chip: {
          sky: token("brand-sky"),
          teal: token("brand-teal"),
          violet: token("brand-violet"),
          "violet-800": token("brand-violet-800"),
          rose: token("brand-rose"),
          "rose-deep": token("brand-rose-deep"),
          amber: token("brand-amber"),
          green: token("brand-green"),
          brown: token("brand-brown"),
        },
        success: token("semantic-success"),
        warning: token("semantic-warning"),
        error: token("semantic-error"),

        // Names the shadcn/ui primitives expect, pointed at the same tokens.
        primary: {
          DEFAULT: token("primary"),
          pressed: token("primary-pressed"),
          deep: token("primary-deep"),
          foreground: token("on-primary"),
        },
        accent: { DEFAULT: token("accent"), deep: token("accent-deep"), foreground: token("on-accent") },
        background: token("canvas"),
        foreground: token("ink"),
        border: token("hairline"),
        input: token("hairline-strong"),
        ring: token("primary"),
        card: { DEFAULT: token("canvas"), foreground: token("ink") },
        popover: { DEFAULT: token("canvas"), foreground: token("ink") },
        secondary: { DEFAULT: token("surface"), foreground: token("ink") },
        muted: { DEFAULT: token("surface"), foreground: token("slate") },
        destructive: { DEFAULT: token("semantic-error"), foreground: token("on-primary") },
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        1: "var(--bi-shadow-1)",
        2: "var(--bi-shadow-2)",
        3: "var(--bi-shadow-3)",
        4: "var(--bi-shadow-4)",
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.18s ease-out",
        "accordion-up": "accordion-up 0.18s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
