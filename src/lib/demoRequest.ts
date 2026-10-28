export interface DemoRequest {
  name: string;
  email: string;
  org: string;
  message: string;
}

export type DemoField = "name" | "email" | "org";
export type DemoFieldError = "required" | "invalidEmail";
export type DemoErrors = Partial<Record<DemoField, DemoFieldError>>;

export const EMPTY_DEMO_REQUEST: DemoRequest = { name: "", email: "", org: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const API_URL: string | undefined = import.meta.env.VITE_DEMO_API_URL?.replace(/\/+$/, "") || undefined;

/**
 * Where the bot check fetches its proof-of-work challenge: GET <api>/challenge, served by the
 * same Lambda that receives the request. Undefined without an API, where the widget runs in test mode.
 */
export const DEMO_CHALLENGE_URL = API_URL ? `${API_URL}/challenge` : undefined;

/** Sent alongside the form fields; the server rejects requests without a valid `altcha`. */
export interface BotCheckFields {
  /** The solved ALTCHA challenge, as the widget's base64 payload. */
  altcha: string | null;
  /** A field people never see. Anything in it marks the request as automated. */
  website: string;
}

export function validateDemoRequest(values: DemoRequest): DemoErrors {
  const errors: DemoErrors = {};
  if (!values.name.trim()) errors.name = "required";
  if (!values.email.trim()) errors.email = "required";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "invalidEmail";
  if (!values.org.trim()) errors.org = "required";
  return errors;
}

/**
 * Posts the request to VITE_DEMO_API_URL. Without that variable a development build
 * simulates success so the dialog can be exercised locally; a production build fails
 * instead, so a missing secret shows the email fallback rather than a false confirmation.
 */
export async function submitDemoRequest(values: DemoRequest, botCheck: BotCheckFields): Promise<void> {
  const apiUrl = API_URL;

  if (!apiUrl) {
    if (import.meta.env.DEV) {
      console.warn("VITE_DEMO_API_URL is not set. Simulating a successful demo request.");
      await new Promise((resolve) => setTimeout(resolve, 900));
      return;
    }
    throw new Error("VITE_DEMO_API_URL is not configured.");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      org: values.org.trim(),
      message: values.message.trim(),
      altcha: botCheck.altcha,
      website: botCheck.website,
    }),
  });

  if (!response.ok) throw new Error(`Demo request failed with status ${response.status}.`);
}
