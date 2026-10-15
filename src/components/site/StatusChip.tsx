import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export type DocumentStatus = "urgent" | "check" | "filed";

const STYLES: Record<DocumentStatus, { dot: string; chip: string }> = {
  urgent: { dot: "bg-chip-rose-deep", chip: "bg-tint-rose text-chip-rose-deep" },
  check: { dot: "bg-accent-deep", chip: "bg-tint-peach text-accent-deep" },
  filed: { dot: "bg-chip-green", chip: "bg-tint-teal text-chip-green" },
};

/** A coloured dot plus a labelled chip. The word carries the status; the colour only repeats it. */
export default function StatusChip({ status, className }: { status: DocumentStatus; className?: string }) {
  const { t } = useTranslation();
  const style = STYLES[status];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", style.dot)} />
      <span className={cn("rounded-sm px-2 py-0.5 text-caption font-semibold", style.chip)}>{t(`mockup.status.${status}`)}</span>
    </span>
  );
}

export function TagBadge({ tone, children }: { tone: "sky" | "teal" | "peach" | "rose" | "violet" | "gray"; children: React.ReactNode }) {
  const tones = {
    sky: "bg-tint-sky text-chip-violet-800",
    teal: "bg-tint-teal text-chip-green",
    peach: "bg-tint-peach text-accent-deep",
    rose: "bg-tint-rose text-chip-rose-deep",
    violet: "bg-tint-violet text-chip-violet-800",
    gray: "bg-tint-gray text-charcoal",
  };
  return <span className={cn("inline-block rounded-sm px-2 py-0.5 text-caption font-semibold", tones[tone])}>{children}</span>;
}
