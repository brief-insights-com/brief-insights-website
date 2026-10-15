import { describe, expect, it } from "vitest";
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
