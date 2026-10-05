import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Production pages arrive prerendered (scripts/prerender.mjs) and are hydrated;
// the dev server serves an empty shell and renders from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
