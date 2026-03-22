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
      <div className="flex items-center justify-center" style={{ minHeight: height }}>
        <div className="inline-block w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
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
