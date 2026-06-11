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
    if (status === "ready" && calendarRef.current && onReady) {
      onReady(calendarRef.current);
    }
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
        <p className="text-slate-500 dark:text-slate-400 mb-3">Failed to load calendar component.</p>
        <button
          onClick={() => {
            setStatus("loading");
            import("@forcecalendar/interface")
              .then(() => setStatus("ready"))
              .catch(() => setStatus("error"));
          }}
          className="text-sm text-brand-600 dark:text-brand-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
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
            <div className="w-20 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="w-6 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="w-16 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="w-8 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-16 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="w-12 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="w-12 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="w-12 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
        {/* Skeleton grid matching the active view to reduce layout shift */}
        <div className={`grid ${view === "day" ? "grid-cols-1" : "grid-cols-7"} gap-px bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden`}>
          {Array.from({ length: view === "month" ? 35 : view === "week" ? 7 : 1 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-2"
              style={{ minHeight: view === "month" ? height / 6 : height }}
            >
              {view === "month" && (
                <>
                  <div className="w-6 h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
                  <div className="space-y-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
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
