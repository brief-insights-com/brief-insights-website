/** The 15-minute product target for preparing one case. */
export const TARGET_PREP_HOURS = 0.25;
export const WORKING_WEEKS_PER_YEAR = 48;

export interface RoiInput {
  counselors: number;
  casesPerWeek: number;
  /** Today's manual preparation time per case, in hours. */
  prepHours: number;
  hourlyCost: number;
}

export interface RoiResult extends RoiInput {
  hoursSavedPerCase: number;
  hoursPerWeek: number;
  hoursPerYear: number;
  costPerYear: number;
}

export const ROI_DEFAULTS: RoiInput = { counselors: 10, casesPerWeek: 5, prepHours: 4, hourlyCost: 35 };

export const ROI_LIMITS: Record<keyof RoiInput, { min: number; max: number }> = {
  counselors: { min: 1, max: 500 },
  casesPerWeek: { min: 1, max: 100 },
  // The site quotes 1 to 8 hours of manual preparation per case.
  prepHours: { min: 1, max: 8 },
  hourlyCost: { min: 1, max: 500 },
};

/** Turns raw field text into a usable number, falling back while a field is empty or invalid. */
export function readInput(raw: string, key: keyof RoiInput): number {
  const value = Number(raw.replace(",", "."));
  if (raw.trim() === "" || !Number.isFinite(value) || value <= 0) return ROI_DEFAULTS[key];
  const { min, max } = ROI_LIMITS[key];
  return Math.min(Math.max(value, min), max);
}

export function calculateRoi(input: RoiInput): RoiResult {
  const hoursSavedPerCase = input.prepHours - TARGET_PREP_HOURS;
  const hoursPerWeek = input.counselors * input.casesPerWeek * hoursSavedPerCase;
  const hoursPerYear = hoursPerWeek * WORKING_WEEKS_PER_YEAR;
  return { ...input, hoursSavedPerCase, hoursPerWeek, hoursPerYear, costPerYear: hoursPerYear * input.hourlyCost };
}
