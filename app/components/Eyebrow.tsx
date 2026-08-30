import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  /** Render as a pill (page headers) instead of bare text (section headers). */
  pill?: boolean;
  className?: string;
}

/** Small mono, uppercase label that sits above a heading. */
export default function Eyebrow({ children, pill = false, className = "" }: EyebrowProps) {
  const text = "font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-text";
  if (pill) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 ring-1 ring-inset ring-accent-line/70 ${text} ${className}`}
      >
        {children}
      </span>
    );
  }
  return <span className={`inline-flex items-center gap-2 ${text} ${className}`}>{children}</span>;
}
