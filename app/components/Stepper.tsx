import type { ReactNode } from "react";

export interface Step {
  title: ReactNode;
  children: ReactNode;
  /** Quiet numeral for optional / final steps. */
  muted?: boolean;
}

/** Numbered vertical steps joined by a hairline rail. */
export default function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={i} className="relative flex gap-5 sm:gap-6">
            <div className="flex flex-col items-center">
              <span
                className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-semibold tabular ring-1 ring-inset ${
                  step.muted
                    ? "bg-sunken text-muted ring-hairline"
                    : "bg-accent-soft text-accent-text ring-accent-line/70"
                }`}
              >
                {i + 1}
              </span>
              {!last && <span aria-hidden className="w-px flex-1 bg-hairline" />}
            </div>
            <div className={`min-w-0 flex-1 ${last ? "" : "pb-10"}`}>
              <h3 className="pt-1 text-base font-semibold text-fg">{step.title}</h3>
              <div className="mt-3">{step.children}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
