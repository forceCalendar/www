"use client";

import { useState, useEffect } from "react";
import CalendarLoader from "../components/CalendarLoader";

const views = ["month", "week", "day"] as const;

export default function InterfacePreview() {
  const [calendarView, setCalendarView] = useState<string>("month");
  const [displayView, setDisplayView] = useState<string>("month");
  const isTransitioning = calendarView !== displayView;

  useEffect(() => {
    if (calendarView !== displayView) {
      const timer = setTimeout(() => setDisplayView(calendarView), 150);
      return () => clearTimeout(timer);
    }
  }, [calendarView, displayView]);

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-500">Live Preview</span>
        <div className="flex gap-2">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setCalendarView(v)}
              disabled={isTransitioning}
              className={`px-3 py-1 text-xs capitalize transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                calendarView === v
                  ? "bg-cyan-600 text-white"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="p-2 relative">
        {isTransitioning && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <CalendarLoader
          view={displayView}
          height={420}
          cssVars={{
            "fc-background": "var(--preview-bg, #ffffff)",
            "fc-background-alt": "var(--preview-bg-alt, #f8fafc)",
            "fc-background-hover": "var(--preview-bg-hover, #f1f5f9)",
            "fc-text-color": "var(--preview-text, #0f172a)",
            "fc-text-secondary": "var(--preview-text-secondary, #64748b)",
            "fc-border-color": "var(--preview-border, #e2e8f0)",
            "fc-primary-color": "#0891b2",
          }}
        />
      </div>
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <code className="text-xs text-slate-500 font-mono">
          &lt;forcecal-main view=&quot;{displayView}&quot; locale=&quot;en-US&quot; /&gt;
        </code>
      </div>
    </div>
  );
}
