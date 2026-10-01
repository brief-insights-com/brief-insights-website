import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import i18n from "@/i18n/i18n";
import SiteShell from "@/components/site/SiteShell";
import Home from "@/pages/Home";
import Platform from "@/pages/Platform";
import Security from "@/pages/Security";
import Results from "@/pages/Results";
import About from "@/pages/About";
import Impressum from "@/pages/Impressum";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

const ROUTES = [
  { path: "/", element: <Home /> },
  { path: "/platform", element: <Platform /> },
  { path: "/security", element: <Security /> },
  { path: "/results", element: <Results /> },
  { path: "/about", element: <About /> },
  { path: "/impressum", element: <Impressum /> },
  { path: "/privacy", element: <Privacy /> },
];

// A translation key that failed to resolve renders as its own path, e.g. "home.hero.title".
const RAW_KEY = /\b(meta|nav|actions|cta|mockup|home|platform|security|results|about|demo|footer|cookie|legal|notFound)(\.[a-z][a-zA-Z]*)+\b/;

function renderAt(path: string) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<SiteShell />}>
            {ROUTES.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

beforeAll(() => {
  window.scrollTo = () => {};
});

afterEach(() => cleanup());

describe.each(["en", "de"])("every route in %s", (language) => {
  beforeAll(async () => {
    await i18n.changeLanguage(language);
  });

  it.each(ROUTES.map((route) => route.path))("%s renders one h1 and no untranslated keys", (path) => {
    const { container } = renderAt(path);
    expect(container.querySelectorAll("h1").length).toBeGreaterThanOrEqual(1);
    // next-themes injects an inline script; read the visible copy from a clone without it.
    const copy = container.cloneNode(true) as HTMLElement;
    copy.querySelectorAll("script").forEach((script) => script.remove());
    expect(copy.textContent?.match(RAW_KEY)?.[0] ?? null).toBeNull();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

describe("demo request dialog", () => {
  beforeAll(async () => {
    await i18n.changeLanguage("en");
  });

  it("validates, then confirms a complete request", async () => {
    renderAt("/");

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
