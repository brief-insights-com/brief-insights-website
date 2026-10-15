/** Manual preparation (4 h) minus the 15-minute product target. */
export const HOURS_SAVED_PER_CASE = 3.75;
export const WORKING_WEEKS_PER_YEAR = 48;

export interface RoiInput {
  counselors: number;
  casesPerWeek: number;
  hourlyCost: number;
}

export interface RoiResult extends RoiInput {
  hoursPerWeek: number;
  hoursPerYear: number;
  costPerYear: number;
}

export const ROI_DEFAULTS: RoiInput = { counselors: 10, casesPerWeek: 5, hourlyCost: 35 };

export const ROI_LIMITS: Record<keyof RoiInput, { min: number; max: number }> = {
  counselors: { min: 1, max: 500 },
  casesPerWeek: { min: 1, max: 100 },
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
  const hoursPerWeek = input.counselors * input.casesPerWeek * HOURS_SAVED_PER_CASE;
  const hoursPerYear = hoursPerWeek * WORKING_WEEKS_PER_YEAR;
  return { ...input, hoursPerWeek, hoursPerYear, costPerYear: hoursPerYear * input.hourlyCost };
}
