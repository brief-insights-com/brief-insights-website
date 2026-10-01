import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => JSON.parse(readFileSync(resolve(__dirname, "../..", file), "utf8"));

/**
 * npm on Windows and macOS drops other platforms' optional binaries from package-lock.json
 * (npm/cli#4828), which breaks `npm ci` on the Linux deploy runner. The Linux Rollup binary is
 * therefore declared as a root optional dependency, which npm never prunes, pinned to the exact
 * Rollup version Vite uses. These checks fail when an upgrade lets the two drift apart.
 */
describe("Linux build dependencies", () => {
  const pkg = read("package.json");
  const lock = read("package-lock.json");
  const rollupVersion: string = lock.packages["node_modules/rollup"].version;
  const linuxBinary = lock.packages["node_modules/@rollup/rollup-linux-x64-gnu"];

  it("pins the Linux Rollup binary to the Rollup version in the lockfile", () => {
    expect(pkg.optionalDependencies?.["@rollup/rollup-linux-x64-gnu"]).toBe(rollupVersion);
  });

  it("keeps the Linux Rollup binary in the lockfile as an optional dependency", () => {
    expect(linuxBinary?.version).toBe(rollupVersion);
    expect(linuxBinary?.optional).toBe(true);
  });

  it("does not list a platform-specific binary as a required dependency", () => {
    const required = { ...pkg.dependencies, ...pkg.devDependencies };
    expect(Object.keys(required).filter((name) => name.startsWith("@rollup/rollup-"))).toEqual([]);
  });
});
