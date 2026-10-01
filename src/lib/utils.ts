import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The design-system type scale uses custom `text-*` names. Without this, tailwind-merge
// reads them as colours and drops one of `text-body-sm text-slate` as a conflict.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["hero", "display", "h1", "h2", "h3", "h4", "h5", "subtitle", "body", "body-sm", "caption", "micro", "button"] },
      ],
      shadow: [{ shadow: ["1", "2", "3", "4"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
