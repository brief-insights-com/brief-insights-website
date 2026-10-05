import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { AppProviders, AppRoutes } from "@/AppRoutes";
import App from "@/App";
import { render as renderToHtml } from "@/entry-server";
import { LANGS, PAGE_KEYS, PATHS } from "@/routes";

// A translation key that failed to resolve renders as its own path, e.g. "home.hero.title".
const RAW_KEY = /\b(meta|seo|nav|actions|cta|mockup|home|platform|security|results|about|demo|footer|cookie|legal|notFound)(\.[a-z][a-zA-Z]*)+\b/;

const ALL_URLS = PAGE_KEYS.flatMap((page) => LANGS.map((lang) => ({ page, lang, url: PATHS[page][lang] })));

function renderAt(url: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[url]}>
        <AppRoutes />
      </MemoryRouter>
    </AppProviders>,
  );
}

function visibleText(container: HTMLElement) {
  // next-themes injects an inline script; read the visible copy from a clone without it.
  const copy = container.cloneNode(true) as HTMLElement;
  copy.querySelectorAll("script").forEach((script) => script.remove());
  return copy.textContent ?? "";
}

beforeAll(() => {
  window.scrollTo = () => {};
});

afterEach(() => cleanup());

describe("every page in both languages", () => {
  it.each(ALL_URLS)("$url renders in $lang with one h1 and no untranslated keys", ({ url, lang }) => {
    const { container } = renderAt(url);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(visibleText(container).match(RAW_KEY)?.[0] ?? null).toBeNull();
    expect(document.documentElement.lang).toBe(lang);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("links each page to its counterpart in the other language", () => {
    renderAt(PATHS.platform.de);
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", PATHS.platform.en);
    cleanup();
    renderAt(PATHS.platform.en);
    expect(screen.getByRole("link", { name: "Deutsch" })).toHaveAttribute("href", PATHS.platform.de);
  });

  it("keeps internal links in the page's language", () => {
    const { container } = renderAt(PATHS.home.en);
    const internal = [...container.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href") ?? "");
    const german = internal.filter((href) => !href.startsWith("/en") && href !== PATHS.home.de);
    // The only German link on an English page is the language switch.
    expect(german).toEqual([]);
  });
});

describe("prerendered HTML", () => {
  it.each(ALL_URLS)("$url carries its full text for crawlers", ({ url }) => {
    const { html, head } = renderToHtml(url);
    expect(html).toMatch(/<h1[^>]*>/);
    expect(html.replace(/<[^>]+>/g, " ").split(/\s+/).length).toBeGreaterThan(150);
    expect(head).toContain(`<link rel="canonical" href="https://brief-insights.com${url}" />`);
  });

  it.each(["/", "/plattform", "/en/results", "/sicherheit", "/en/about", "/datenschutz"])(
    "%s hydrates without a mismatch",
    async (url) => {
      const { html } = renderToHtml(url);
      window.history.pushState({}, "", url);
      document.body.innerHTML = `<div id="root">${html}</div>`;
      const errors = vi.spyOn(console, "error").mockImplementation(() => {});
      const root = await act(async () => hydrateRoot(document.getElementById("root") as HTMLElement, <App />));
      const hydrationErrors = errors.mock.calls.filter((call) => /hydrat|did not match|server/i.test(String(call[0])));
      errors.mockRestore();
      act(() => root.unmount());
      expect(hydrationErrors).toEqual([]);
    },
  );
});

describe("demo request dialog", () => {
  it("validates, then confirms a complete request", async () => {
    renderAt(PATHS.home.en);

    fireEvent.click(screen.getAllByRole("button", { name: "Request a demo" })[0]);
    const dialog = await screen.findByRole("dialog", { name: "Request a demo" });
    const submit = () => fireEvent.click(within(dialog).getByRole("button", { name: "Request a demo" }));

    submit();
    expect(within(dialog).getByText("Enter your full name.")).toBeInTheDocument();
    expect(within(dialog).getByText("Enter your work email.")).toBeInTheDocument();
    expect(within(dialog).getByText("Enter the name of your organisation.")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Full name")).toHaveFocus();

    fireEvent.change(within(dialog).getByLabelText("Full name"), { target: { value: "Alex Example" } });
    fireEvent.change(within(dialog).getByLabelText("Work email"), { target: { value: "alex@centre" } });
    submit();
    expect(within(dialog).getByText("Enter an email address in the format name@your-centre.de.")).toBeInTheDocument();

    fireEvent.change(within(dialog).getByLabelText("Work email"), { target: { value: "alex@centre.de" } });
    fireEvent.change(within(dialog).getByLabelText("Organisation"), { target: { value: "Beratungsstelle Musterstadt" } });
    submit();

    await waitFor(() => expect(within(dialog).getByText("Request received.")).toBeInTheDocument(), { timeout: 3000 });
  });
});
