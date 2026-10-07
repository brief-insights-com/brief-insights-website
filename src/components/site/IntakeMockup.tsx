import { useTranslation } from "react-i18next";
import { useFormat } from "@/lib/format";
import StatusChip, { type DocumentStatus } from "./StatusChip";

// Synthetic records only. No client document, name or case number appears in a mockup.
const ROWS: { type: string; creditor: string; fileNo: string; amount: number | null; due: string; status: DocumentStatus }[] = [
  { type: "courtOrder", creditor: "Amtsgericht Musterstadt", fileNo: "34 M 2211/26", amount: 3180, due: "2026-02-27", status: "urgent" },
  { type: "terminationNotice", creditor: "Hausverwaltung Lindenhof", fileNo: "HL-1179", amount: null, due: "2026-03-02", status: "urgent" },
  { type: "collectionLetter", creditor: "Certo Inkasso GmbH", fileNo: "CI-88317", amount: 1042, due: "2026-03-04", status: "check" },
  { type: "telephoneInvoice", creditor: "Nordfunk Telekom AG", fileNo: "NF-2291045", amount: 248.6, due: "2026-03-12", status: "filed" },
  { type: "energyInvoice", creditor: "Stadtwerke Havel", fileNo: "SH-400912", amount: 612.35, due: "2026-03-18", status: "filed" },
];

const grid = "grid grid-cols-[1.45fr_1.5fr_1fr_0.8fr_0.85fr_1fr] items-center";
const head = "text-micro uppercase text-steel";

/** The intake queue that breaks out of the home hero band. */
export default function IntakeMockup() {
  const { t } = useTranslation();
  const { euro, date } = useFormat();
  const amount = (value: number | null) => (value === null ? t("mockup.noAmount") : euro(value, 2));

  return (
    <figure className="w-full max-w-[1000px] overflow-hidden rounded-lg border border-hairline bg-canvas text-left shadow-3 [font-variant-numeric:tabular-nums]">
      <div className="flex items-center gap-4 border-b border-hairline px-4 py-3 md:h-14 md:px-5 md:py-0">
        <span className={`${head} flex-1`}>{t("mockup.intakeQueue")}</span>
        <span className="hidden text-caption text-steel md:inline">{t("mockup.caseLine", { date: date("2026-02-26") })}</span>
        <span className="rounded-sm bg-tint-sky px-2 py-0.5 text-caption font-semibold text-chip-violet-800">
          {t("mockup.documents", { count: ROWS.length })}
        </span>
      </div>

      {/* Tablet and desktop: the queue as a table. */}
      <div className="hidden md:block" role="table" aria-label={t("mockup.intakeQueue")}>
        <div role="row" className={`${grid} border-b border-hairline bg-surface-soft`}>
          {(["document", "creditor", "fileNo", "amount", "due", "status"] as const).map((column, index) => (
            <div key={column} role="columnheader" className={`${head} py-2.5 ${index === 0 ? "pl-5" : ""}`}>
              {t(`mockup.columns.${column}`)}
            </div>
          ))}
        </div>
        {ROWS.map((row, index) => (
          <div key={row.fileNo} role="row" className={`${grid} ${index < ROWS.length - 1 ? "border-b border-hairline-soft" : ""}`}>
            <div role="cell" className="py-3.5 pl-5 text-body-sm font-medium text-charcoal">
              {t(`mockup.types.${row.type}`)}
            </div>
            <div role="cell" className="py-3.5 pr-3 text-body-sm text-slate">{row.creditor}</div>
            <div role="cell" className="py-3.5 text-body-sm text-slate">{row.fileNo}</div>
            <div role="cell" className="py-3.5 text-body-sm text-slate">{amount(row.amount)}</div>
            <div role="cell" className="py-3.5 text-body-sm text-slate">{date(row.due)}</div>
            <div role="cell" className="py-3.5 pr-5">
              <StatusChip status={row.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: the first three documents, stacked. */}
      <ul className="md:hidden">
        {ROWS.filter((_, index) => index !== 1 && index !== 3).map((row) => (
          <li key={row.fileNo} className="border-b border-hairline-soft px-4 py-3.5 last:border-b-0">
            <div className="flex items-center gap-2">
              <span className="flex-1 text-body-sm font-medium text-charcoal">{t(`mockup.types.${row.type}`)}</span>
              <StatusChip status={row.status} />
            </div>
            <p className="mt-1.5 text-caption text-steel">
              {row.creditor} · {row.fileNo} · {amount(row.amount)} · {t("mockup.dueOn", { date: date(row.due) })}
            </p>
          </li>
        ))}
      </ul>

      <figcaption className="border-t border-hairline-soft bg-surface-soft px-4 py-3 text-caption text-steel md:px-5">
        <span className="hidden md:inline">{t("mockup.syntheticLong")}</span>
        <span className="md:hidden">{t("mockup.syntheticShort")}</span>
      </figcaption>
    </figure>
  );
}
