"use client";

import { useState } from "react";
import CalendarLoader from "../components/CalendarLoader";

const views = ["month", "week", "day"] as const;

export default function InterfacePreview() {
  const [calendarView, setCalendarView] = useState<string>("month");

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-500">Live Preview</span>
        <div className="flex gap-2">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setCalendarView(v)}
              className={`px-3 py-1 text-xs capitalize transition-colors rounded ${
                calendarView === v
                  ? "bg-cyan-600 text-white"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="p-2">
        <CalendarLoader
          view={calendarView}
          height={420}
          cssVars={{
            "fc-background": "var(--preview-bg, #ffffff)",
            "fc-text-color": "var(--preview-text, #0f172a)",
            "fc-border-color": "var(--preview-border, #e2e8f0)",
            "fc-primary-color": "var(--preview-primary, #0891b2)",
          }}
        />
      </div>
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <code className="text-xs text-slate-500 font-mono">
          &lt;forcecal-main view=&quot;{calendarView}&quot; locale=&quot;en-US&quot; /&gt;
        </code>
      </div>
    </div>
  );
}
