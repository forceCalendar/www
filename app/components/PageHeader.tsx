import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede: ReactNode;
  /** Install command, buttons, links: rendered in a row under the lede. */
  actions?: ReactNode;
  /** Optional panel rendered to the right on wide screens. */
  aside?: ReactNode;
  width?: "page" | "narrow";
  /** Tighter bottom padding when a full-width element follows immediately. */
  compact?: boolean;
}

/** Inner-page header: eyebrow + display title + lede + actions over the grid. */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
  aside,
  width = "narrow",
  compact = false,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-hairline">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className={`relative ${width === "page" ? "max-w-page" : "max-w-4xl"} mx-auto px-6 pt-16 sm:pt-20 lg:pt-24 ${compact ? "pb-10" : "pb-14 lg:pb-16"}`}>
        <div className={aside ? "grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-end" : ""}>
          <div className="min-w-0">
            {eyebrow && (
              <div className="mb-5 animate-fade-up">
                <Eyebrow pill>{eyebrow}</Eyebrow>
              </div>
            )}
            <h1 className="font-display text-display-lg sm:text-display-xl text-fg animate-fade-up [animation-delay:60ms]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed animate-fade-up [animation-delay:120ms]">
              {lede}
            </p>
            {actions && (
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 animate-fade-up [animation-delay:180ms]">
                {actions}
              </div>
            )}
          </div>
          {aside && <div className="min-w-0">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
