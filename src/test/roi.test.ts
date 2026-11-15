import { describe, expect, it } from "vitest";
import { calculateRoi, readInput, ROI_DEFAULTS } from "@/lib/roi";

describe("calculateRoi", () => {
  it("reproduces the worked example on the Results page", () => {
    const result = calculateRoi(ROI_DEFAULTS);
    expect(result.hoursPerWeek).toBe(187.5);
    expect(result.hoursPerYear).toBe(9000);
    expect(result.costPerYear).toBe(315000);
  });

  it("keeps week, year and cost consistent with each other", () => {
    const result = calculateRoi({ counselors: 3, casesPerWeek: 7, prepHours: 2, hourlyCost: 42.5 });
    expect(result.hoursPerYear).toBe(result.hoursPerWeek * 48);
    expect(result.costPerYear).toBe(result.hoursPerYear * 42.5);
  });

  it("saves today's preparation time minus the 15-minute target", () => {
    expect(calculateRoi({ ...ROI_DEFAULTS, prepHours: 4 }).hoursSavedPerCase).toBe(3.75);
    const result = calculateRoi({ ...ROI_DEFAULTS, prepHours: 2 });
    expect(result.hoursSavedPerCase).toBe(1.75);
    expect(result.hoursPerWeek).toBe(10 * 5 * 1.75);
  });
});

describe("readInput", () => {
  it("falls back to the default while a field is empty or invalid", () => {
    expect(readInput("", "counselors")).toBe(10);
    expect(readInput("abc", "casesPerWeek")).toBe(5);
    expect(readInput("0", "hourlyCost")).toBe(35);
    expect(readInput("-4", "counselors")).toBe(10);
  });

  it("accepts a German decimal comma", () => {
    expect(readInput("37,5", "hourlyCost")).toBe(37.5);
  });

  it("clamps to the field's limits", () => {
    expect(readInput("100000", "counselors")).toBe(500);
    expect(readInput("0.2", "casesPerWeek")).toBe(1);
    expect(readInput("12", "prepHours")).toBe(8);
    expect(readInput("0,5", "prepHours")).toBe(1);
  });
});
