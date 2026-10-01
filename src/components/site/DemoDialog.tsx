import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CircleAlert, CircleCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  EMPTY_DEMO_REQUEST,
  submitDemoRequest,
  validateDemoRequest,
  type DemoErrors,
  type DemoField,
  type DemoRequest,
} from "@/lib/demoRequest";
import { buttonClass } from "./buttonStyles";
import { DemoDialogContext, useDemoDialog } from "./demoDialogContext";

type Phase = "form" | "sending" | "failed" | "sent";

const CONTACT_EMAIL = "info@brief-insights.com";

const fieldBase =
  "w-full rounded-md border bg-canvas text-body text-ink outline-none transition-colors duration-150 disabled:bg-surface-soft disabled:text-steel focus-visible:shadow-none";

function errorKey(field: DemoField, error: NonNullable<DemoErrors[DemoField]>) {
  if (field === "email" && error === "invalidEmail") return "demo.errors.emailInvalid";
  return `demo.errors.${field}Required`;
}

function DemoForm({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation();
  const [values, setValues] = useState<DemoRequest>(EMPTY_DEMO_REQUEST);
  const [phase, setPhase] = useState<Phase>("form");
  const [showErrors, setShowErrors] = useState(false);

  const errors = useMemo(() => (showErrors ? validateDemoRequest(values) : {}), [showErrors, values]);
  const sending = phase === "sending";

  const update = (field: keyof DemoRequest) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateDemoRequest(values);
    if (Object.keys(found).length > 0) {
      setShowErrors(true);
      const first = (["name", "email", "org"] as DemoField[]).find((field) => found[field]);
      if (first) document.getElementById(`demo-${first}`)?.focus();
      return;
    }
    setPhase("sending");
    try {
      await submitDemoRequest(values);
      setPhase("sent");
    } catch (error) {
      console.error("Demo request failed:", error);
      setPhase("failed");
    }
  };

  if (phase === "sent") {
    return (
      <div role="status">
        <CircleCheck className="h-7 w-7 text-success" strokeWidth={1.8} aria-hidden="true" />
        <DialogPrimitive.Title className="mt-4 pr-10 text-h3 text-ink">{t("demo.successTitle")}</DialogPrimitive.Title>
        <DialogPrimitive.Description className="mt-2 text-body text-slate">{t("demo.successBody")}</DialogPrimitive.Description>
        {/* The submit button this replaces is gone, so focus moves here rather than dropping out of the dialog. */}
        <button type="button" autoFocus onClick={onDone} className={buttonClass("secondary", "mt-8")}>
          {t("demo.close")}
        </button>
      </div>
    );
  }

  const textField = (field: DemoField, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const error = errors[field];
    const id = `demo-${field}`;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-body-sm font-medium text-charcoal">
          {label}
        </label>
        <input
          id={id}
          name={field}
          value={values[field]}
          onChange={update(field)}
          disabled={sending}
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            fieldBase,
            "h-11 px-4",
            error ? "border-2 border-error px-[15px]" : "border-hairline-strong",
            "focus:border-2 focus:border-primary focus:px-[15px]",
          )}
          {...props}
        />
        {error ? (
          <p id={`${id}-error`} className="text-caption text-error">
            {t(errorKey(field, error))}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <DialogPrimitive.Title className="pr-10 text-h3 text-ink">{t("demo.title")}</DialogPrimitive.Title>
      <DialogPrimitive.Description className="mt-2 text-body-sm text-slate">{t("demo.description")}</DialogPrimitive.Description>

      {phase === "failed" ? (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-md bg-tint-rose px-4 py-3.5 text-chip-rose-deep">
          <CircleAlert className="mt-0.5 h-[18px] w-[18px] shrink-0" strokeWidth={1.6} aria-hidden="true" />
          <p className="text-body-sm">
            <span className="font-semibold">{t("demo.failedTitle")}</span> {t("demo.failedBefore")}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
              {CONTACT_EMAIL}
            </a>
            {t("demo.failedAfter")}
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
        {textField("name", t("demo.name"), { type: "text", autoComplete: "name" })}
        {textField("email", t("demo.email"), {
          type: "email",
          inputMode: "email",
          autoComplete: "email",
          spellCheck: false,
          placeholder: t("demo.emailPlaceholder"),
        })}
        {textField("org", t("demo.org"), { type: "text", autoComplete: "organization" })}

        <div className="flex flex-col gap-2">
          <label htmlFor="demo-message" className="text-body-sm font-medium text-charcoal">
            {t("demo.message")} <span className="font-normal text-steel">{t("demo.optional")}</span>
          </label>
          <p id="demo-message-hint" className="-mt-1 text-caption text-steel">
            {t("demo.messageHint")}
          </p>
          <textarea
            id="demo-message"
            name="message"
            rows={3}
            value={values.message}
            onChange={update("message")}
            disabled={sending}
            aria-describedby="demo-message-hint"
            className={cn(
              fieldBase,
              "min-h-24 resize-y border-hairline-strong px-4 py-3",
              "focus:border-2 focus:border-primary focus:px-[15px] focus:py-[11px]",
            )}
          />
        </div>

        <p className="text-caption text-steel">
          {t("demo.privacyBefore")}
          <Link to="/privacy" onClick={onDone} className="text-primary underline">
            {t("demo.privacyLink")}
          </Link>
          {t("demo.privacyAfter")}
        </p>

        <button
          type="submit"
          disabled={sending}
          aria-busy={sending || undefined}
          className={buttonClass("primary", sending && "disabled:bg-primary-pressed disabled:text-primary-foreground cursor-progress")}
        >
          {sending ? t("demo.sending") : t("demo.submit")}
        </button>
      </form>
    </>
  );
}

export function DemoDialogProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  // A fresh form every time the dialog opens.
  const [formKey, setFormKey] = useState(0);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const openDialog = useCallback((trigger?: HTMLElement | null) => {
    returnFocusTo.current = trigger ?? (document.activeElement as HTMLElement | null);
    setFormKey((key) => key + 1);
    setOpen(true);
  }, []);
  const contextValue = useMemo(() => ({ open: openDialog }), [openDialog]);

  return (
    <DemoDialogContext.Provider value={contextValue}>
      {children}
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand-navy-deep/65 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
              <DialogPrimitive.Content
                onOpenAutoFocus={(event) => {
                  event.preventDefault();
                  document.getElementById("demo-name")?.focus();
                }}
                onCloseAutoFocus={(event) => {
                  const target = returnFocusTo.current;
                  if (target?.isConnected) {
                    event.preventDefault();
                    target.focus();
                  }
                }}
                className="relative w-full max-w-[520px] rounded-lg bg-canvas p-6 shadow-4 duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:p-10"
              >
                <DialogPrimitive.Close
                  className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-md text-slate active:bg-surface sm:right-4 sm:top-4"
                  aria-label={t("demo.close")}
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                </DialogPrimitive.Close>
                <DemoForm key={formKey} onDone={() => setOpen(false)} />
              </DialogPrimitive.Content>
            </div>
          </div>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </DemoDialogContext.Provider>
  );
}

/** A "Request a demo" button that opens the dialog. */
export function DemoButton({
  label,
  variant = "primary",
  className,
}: {
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const { t } = useTranslation();
  const { open } = useDemoDialog();
  return (
    <button type="button" onClick={(event) => open(event.currentTarget)} className={buttonClass(variant, className)}>
      {label ?? t("actions.requestDemo")}
    </button>
  );
}
