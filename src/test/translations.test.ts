import { describe, expect, it } from "vitest";
import en from "@/i18n/locales/en/translation.json";
import de from "@/i18n/locales/de/translation.json";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/** Every leaf path, with array lengths baked in, so a missing item shows up too. */
function shape(value: Json, path = ""): string[] {
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((item, i) => shape(item, `${path}[${i}]`))];
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, child]) => shape(child, path ? `${path}.${key}` : key));
  return [path];
}

function placeholders(value: Json, path = ""): Record<string, string> {
  if (typeof value === "string") return { [path]: (value.match(/\{\{\s*\w+\s*\}\}/g) ?? []).sort().join(",") };
  if (Array.isArray(value)) return Object.assign({}, ...value.map((item, i) => placeholders(item, `${path}[${i}]`)));
  if (value && typeof value === "object") return Object.assign({}, ...Object.entries(value).map(([k, v]) => placeholders(v, path ? `${path}.${k}` : k)));
  return {};
}

describe("translations", () => {
  it("German has exactly the same keys and list lengths as English", () => {
    expect(shape(de as Json).sort()).toEqual(shape(en as Json).sort());
  });

  it("both languages use the same interpolation placeholders", () => {
    expect(placeholders(de as Json)).toEqual(placeholders(en as Json));
  });

  it("never claims a measured result for the target figures", () => {
    const text = JSON.stringify(en);
    expect(text).not.toMatch(/No data leaves the EU/);
    expect(text).not.toMatch(/Less counselor time spent/);
  });
});
