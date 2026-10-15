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
export async function submitDemoRequest(values: DemoRequest): Promise<void> {
  const apiUrl = import.meta.env.VITE_DEMO_API_URL;

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
    }),
  });

  if (!response.ok) throw new Error(`Demo request failed with status ${response.status}.`);
}
