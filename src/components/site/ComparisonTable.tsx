import { Caption } from "./Layout";

export interface ComparisonRow {
  label: string;
  before: string;
  after: string;
}

/**
 * Before and after, written in words. Tablet and up: a table. Phones: one stacked block per
 * row instead of a table scrolling sideways.
 */
export default function ComparisonTable({
  columns,
  rows,
  note,
  labelWidth = "w-[30%]",
}: {
  columns: { label: string; before: string; after: string };
  rows: ComparisonRow[];
  note?: string;
  labelWidth?: string;
}) {
  return (
    <div className="mt-12 [font-variant-numeric:tabular-nums]">
      <table className="hidden w-full border-separate border-spacing-0 overflow-hidden rounded-md border border-hairline bg-canvas md:table">
        <thead>
          <tr className="bg-surface-soft">
            <th scope="col" className={`${labelWidth} border-b border-hairline px-5 py-4 text-left text-micro uppercase text-steel`}>
              {columns.label}
            </th>
            <th scope="col" className="border-b border-hairline px-5 py-4 text-center text-micro uppercase text-steel">
              {columns.before}
            </th>
            <th scope="col" className="border-b border-hairline px-5 py-4 text-center text-micro uppercase text-steel">
              {columns.after}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const rule = index < rows.length - 1 ? "border-b border-hairline-soft" : "";
            return (
              <tr key={row.label}>
                <th scope="row" className={`${rule} px-5 py-4 text-left text-body-sm font-medium text-charcoal`}>
                  {row.label}
                </th>
                <td className={`${rule} px-5 py-4 text-center text-body-sm text-steel`}>{row.before}</td>
                <td className={`${rule} px-5 py-4 text-center text-body-sm text-ink`}>{row.after}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <dl className="divide-y divide-hairline-soft rounded-md border border-hairline bg-canvas md:hidden">
        {rows.map((row) => (
          <div key={row.label} className="px-4 py-4">
            <dt className="text-body-sm font-medium text-charcoal">{row.label}</dt>
            <dd className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-body-sm">
              <span className="text-steel">{columns.before}</span>
              <span className="text-steel">{row.before}</span>
              <span className="text-steel">{columns.after}</span>
              <span className="text-ink">{row.after}</span>
            </dd>
          </div>
        ))}
      </dl>

      {note ? <Caption className="mt-4">{note}</Caption> : null}
    </div>
  );
}
