import { createContext, useContext } from "react";

/** `trigger` is where focus returns on close; Safari does not focus a button on click. */
export const DemoDialogContext = createContext<{ open: (trigger?: HTMLElement | null) => void } | null>(null);

/** Opens the demo request dialog from any "Request a demo" button. */
export function useDemoDialog() {
  const context = useContext(DemoDialogContext);
  if (!context) throw new Error("useDemoDialog must be used inside <DemoDialogProvider>.");
  return context;
}
