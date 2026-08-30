import type { ReactNode } from "react";

interface StatTileProps {
  value: string;
  label: string;
  /** Optional chart or footnote rendered under the label. */
  children?: ReactNode;
}

/** One stat in a stat row: tabular numerals, quiet label. */
export function StatTile({ value, label, children }: StatTileProps) {
  return (
    <div className="bg-raised px-6 py-5 sm:py-6 text-center">
      <div className="font-display text-3xl sm:text-[2rem] font-semibold tracking-[-0.03em] tabular text-fg">
        {value}
      </div>
      <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
        {label}
      </div>
      {children}
    </div>
  );
}

/** Container that lays StatTiles out as a divided strip. */
export function StatRow({ children, columns = 4 }: { children: ReactNode; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    // gap-px over the hairline colour draws dividers correctly however the
    // grid wraps
    <div className={`grid grid-cols-2 ${cols} gap-px bg-hairline rounded-xl ring-1 ring-hairline shadow-elev-1 dark:shadow-none overflow-hidden`}>
      {children}
    </div>
  );
}
