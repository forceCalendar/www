"use client";

import { useState, useEffect } from "react";
import CalendarLoader from "../components/CalendarLoader";
import Tabs from "../components/Tabs";

const views = ["month", "week", "day"] as const;
type View = (typeof views)[number];

export default function InterfacePreview() {
  const [calendarView, setCalendarView] = useState<View>("month");
  const [displayView, setDisplayView] = useState<View>("month");
  const isTransitioning = calendarView !== displayView;

  useEffect(() => {
    if (calendarView !== displayView) {
      const timer = setTimeout(() => setDisplayView(calendarView), 150);
      return () => clearTimeout(timer);
    }
  }, [calendarView, displayView]);

  return (
    <div className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline shadow-elev-3 ring-hi dark:ring-line/80">
      <div className="flex items-center justify-between gap-3 border-b border-hairline bg-sunken px-4 py-2.5">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          Live preview
        </span>
        <Tabs
          variant="segmented"
          size="sm"
          tabs={views}
          active={calendarView}
          onChange={setCalendarView}
          disabled={isTransitioning}
          label="Calendar view"
        />
      </div>
      <div className="relative p-2">
        {isTransitioning && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-raised/80 backdrop-blur-sm">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        )}
        <CalendarLoader
          view={displayView}
          height={420}
          cssVars={{
            "fc-background": "var(--preview-bg, #ffffff)",
            "fc-background-alt": "var(--preview-bg-alt, #f7f8fa)",
            "fc-background-hover": "var(--preview-bg-hover, #eef1f5)",
            "fc-text-color": "var(--preview-text, #0e131d)",
            "fc-text-secondary": "var(--preview-text-secondary, #606b7d)",
            "fc-border-color": "var(--preview-border, #e5e8ed)",
            "fc-primary-color": "var(--preview-primary, #2448e0)",
            "fc-font-family": "var(--font-inter), Inter, system-ui, sans-serif",
          }}
        />
      </div>
      <div className="border-t border-hairline bg-sunken px-4 py-2.5">
        <code className="font-mono text-xs text-muted">
          &lt;forcecal-main view=&quot;{displayView}&quot; locale=&quot;en-US&quot; /&gt;
        </code>
      </div>
    </div>
  );
}
