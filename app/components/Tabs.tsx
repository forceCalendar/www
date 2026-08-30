"use client";

interface TabsProps<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  labels?: Partial<Record<T, string>>;
  /** underline = section tabs; segmented = compact toolbar switch. */
  variant?: "underline" | "segmented";
  size?: "sm" | "md";
  label: string;
  /** Disable every tab (used while a preview is re-rendering). */
  disabled?: boolean;
  className?: string;
}

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

/** Accessible tab strip in two styles; the caller owns the state. */
export default function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  labels,
  variant = "underline",
  size = "md",
  label,
  disabled = false,
  className = "",
}: TabsProps<T>) {
  const text = (t: T) => labels?.[t] ?? t;

  if (variant === "segmented") {
    const pad = size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-xs";
    return (
      <div
        role="tablist"
        aria-label={label}
        className={`inline-flex items-center gap-0.5 rounded-md bg-sunken p-0.5 ring-1 ring-inset ring-hairline ${className}`}
      >
        {tabs.map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={on}
              disabled={disabled}
              onClick={() => onChange(t)}
              className={`${pad} rounded-[5px] font-medium capitalize transition-colors ${focus} disabled:cursor-not-allowed disabled:opacity-60 ${
                on
                  ? "bg-raised text-fg shadow-elev-1 ring-1 ring-inset ring-hairline"
                  : "text-muted hover:text-fg"
              }`}
            >
              {text(t)}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div role="tablist" aria-label={label} className={`flex gap-1 border-b border-hairline ${className}`}>
      {tabs.map((t) => {
        const on = t === active;
        return (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={on}
            disabled={disabled}
            onClick={() => onChange(t)}
            className={`relative -mb-px px-3.5 py-2.5 text-sm font-medium capitalize transition-colors rounded-t-md ${focus} ${
              on ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {text(t)}
            <span
              aria-hidden
              className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-colors ${on ? "bg-accent" : "bg-transparent"}`}
            />
          </button>
        );
      })}
    </div>
  );
}
