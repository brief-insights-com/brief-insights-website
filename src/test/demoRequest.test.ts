import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EMPTY_DEMO_REQUEST, validateDemoRequest } from "@/lib/demoRequest";

describe("validateDemoRequest", () => {
  it("requires name, email and organisation, and leaves the message optional", () => {
    expect(validateDemoRequest(EMPTY_DEMO_REQUEST)).toEqual({ name: "required", email: "required", org: "required" });
  });

  it("treats whitespace as empty", () => {
    expect(validateDemoRequest({ name: "  ", email: " ", org: "\t", message: "" })).toEqual({
      name: "required",
      email: "required",
      org: "required",
    });
  });

  it("rejects a malformed email address", () => {
    const errors = validateDemoRequest({ name: "A", email: "name@centre", org: "B", message: "" });
    expect(errors).toEqual({ email: "invalidEmail" });
  });

  it("passes a complete request", () => {
    expect(validateDemoRequest({ name: "A B", email: "a@centre.de", org: "Centre", message: "" })).toEqual({});
  });
});

describe("submitDemoRequest", () => {
  // The API address is read when the module loads, so each test imports a fresh copy.
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("sends the bot check and honeypot with the request, and fetches challenges from the same API", async () => {
    vi.stubEnv("VITE_DEMO_API_URL", "https://api.example.com/demo/");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const { DEMO_CHALLENGE_URL, submitDemoRequest } = await import("@/lib/demoRequest");

    expect(DEMO_CHALLENGE_URL).toBe("https://api.example.com/demo/challenge");
    await submitDemoRequest({ name: " Ada ", email: "ada@example.org", org: "Caritas", message: "" }, { altcha: "c29sdmVk", website: "" });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.example.com/demo");
    expect(JSON.parse(init.body)).toEqual({ name: "Ada", email: "ada@example.org", org: "Caritas", message: "", altcha: "c29sdmVk", website: "" });
  });

  it("reports a refused request as a failure, so the email fallback shows", async () => {
    vi.stubEnv("VITE_DEMO_API_URL", "https://api.example.com/demo");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    const { submitDemoRequest } = await import("@/lib/demoRequest");
    await expect(submitDemoRequest({ name: "A", email: "a@b.de", org: "C", message: "" }, { altcha: null, website: "" })).rejects.toThrow("403");
  });
});
