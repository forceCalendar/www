"use client";

import { useEffect, useState, useRef } from "react";

interface CalendarLoaderProps {
  view?: string;
  locale?: string;
  weekStartsOn?: string;
  timezone?: string;
  height?: number;
  cssVars?: Record<string, string>;
  onReady?: (element: HTMLElement) => void;
}

// @forcecalendar/interface hard-codes a white toolbar background and white
// secondary buttons inside its shadow root, which no outer stylesheet can
// reach. The root is open, so a small site style is appended after the
// component's own sheet to keep those surfaces on the theme tokens.
const SITE_THEME_CSS = `
  .fc-header { background: var(--fc-background); }
  .fc-btn-secondary { background: var(--fc-background); }
`;

function applySiteTheme(el: HTMLElement) {
  const root = el.shadowRoot;
  if (!root || root.querySelector("style[data-site-theme]")) return;
  const style = document.createElement("style");
  style.dataset.siteTheme = "";
  style.textContent = SITE_THEME_CSS;
  root.appendChild(style);
}

export default function CalendarLoader({
  view = "month",
  locale = "en-US",
  weekStartsOn = "0",
  timezone,
  height = 500,
  cssVars = {},
  onReady,
}: CalendarLoaderProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const calendarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import("@forcecalendar/interface")
      .then(() => {
        setStatus("ready");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    if (status !== "ready" || !calendarRef.current) return;
    applySiteTheme(calendarRef.current);
    onReady?.(calendarRef.current);
  }, [status, onReady]);

  const style: React.CSSProperties = {
    display: "block",
    width: "100%",
    minHeight: height,
    ...Object.fromEntries(
      Object.entries(cssVars).map(([k, v]) => [`--${k}`, v])
    ),
  };

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-8" style={{ minHeight: 160 }}>
        <p className="mb-3 text-muted">Failed to load calendar component.</p>
        <button
          onClick={() => {
            setStatus("loading");
            import("@forcecalendar/interface")
              .then(() => setStatus("ready"))
              .catch(() => setStatus("error"));
          }}
          className="rounded-sm text-sm font-medium text-accent-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="p-4" style={{ minHeight: height }}>
        {/* Skeleton header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-20 h-7 bg-hairline rounded animate-pulse" />
            <div className="w-6 h-7 bg-hairline rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-7 bg-hairline rounded animate-pulse" />
            <div className="w-16 h-7 bg-hairline rounded animate-pulse" />
            <div className="w-8 h-7 bg-hairline rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-16 h-7 bg-hairline rounded animate-pulse" />
            <div className="w-12 h-7 bg-hairline rounded animate-pulse" />
            <div className="w-12 h-7 bg-hairline rounded animate-pulse" />
            <div className="w-12 h-7 bg-hairline rounded animate-pulse" />
          </div>
        </div>
        {/* Skeleton grid matching the active view to reduce layout shift */}
        <div className={`grid ${view === "day" ? "grid-cols-1" : "grid-cols-7"} gap-px bg-hairline border border-hairline rounded-lg overflow-hidden`}>
          {Array.from({ length: view === "month" ? 35 : view === "week" ? 7 : 1 }).map((_, i) => (
            <div
              key={i}
              className="bg-raised p-2"
              style={{ minHeight: view === "month" ? height / 6 : height }}
            >
              {view === "month" && (
                <>
                  <div className="w-6 h-5 bg-hairline rounded animate-pulse mb-2" />
                  <div className="space-y-1">
                    <div className="h-4 bg-hairline rounded animate-pulse" />
                    <div className="h-4 bg-hairline rounded animate-pulse" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    // @ts-expect-error - forcecal-main is a custom element from @forcecalendar/interface
    <forcecal-main
      ref={calendarRef}
      view={view}
      locale={locale}
      week-starts-on={weekStartsOn}
      {...(timezone ? { timezone } : {})}
      style={style}
    />
  );
}
