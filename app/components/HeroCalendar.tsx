"use client";

import { useCallback, useRef } from "react";
import CalendarLoader from "./CalendarLoader";

interface CalendarElement extends HTMLElement {
  addEvent?: (e: Record<string, unknown>) => unknown;
  getEvents?: () => Record<string, unknown>[];
}

const sampleEvents = () => {
  const at = (dayOffset: number, hour: number, minute: number, durationMin: number) => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, minute, 0, 0);
    return {
      start: d.toISOString(),
      end: new Date(d.getTime() + durationMin * 60000).toISOString(),
    };
  };
  return [
    {
      id: "hero-standup",
      title: "Daily Standup",
      ...at(0, 9, 15, 15),
      recurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
      color: "#2563EB",
    },
    { id: "hero-planning", title: "Sprint Planning", ...at(1, 10, 0, 60), color: "#8B5CF6" },
    { id: "hero-review", title: "Design Review", ...at(2, 14, 0, 45), color: "#F59E0B" },
    { id: "hero-demo", title: "Customer Demo", ...at(3, 11, 0, 45), color: "#10B981" },
    { id: "hero-offsite", title: "Team Offsite", ...at(5, 0, 0, 24 * 60), allDay: true, color: "#EF4444" },
  ];
};

/** The live component, seeded, in a browser-chrome frame — the hero demo. */
export default function HeroCalendar() {
  const seeded = useRef(false);

  const handleReady = useCallback((el: HTMLElement) => {
    const cal = el as CalendarElement;
    if (seeded.current || !cal.addEvent || (cal.getEvents && cal.getEvents().length > 0)) return;
    seeded.current = true;
    for (const event of sampleEvents()) {
      cal.addEvent(event);
    }
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl shadow-slate-200/60 dark:shadow-slate-950/60 overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <code className="ml-3 text-[11px] font-mono text-slate-400 dark:text-slate-500">
          &lt;forcecal-main&gt; — live, drag an event
        </code>
      </div>
      <CalendarLoader
        view="month"
        height={420}
        cssVars={{
          "fc-background": "var(--preview-bg, #ffffff)",
          "fc-background-alt": "var(--preview-bg-alt, #f8fafc)",
          "fc-background-hover": "var(--preview-bg-hover, #f1f5f9)",
          "fc-text-color": "var(--preview-text, #0f172a)",
          "fc-text-secondary": "var(--preview-text-secondary, #64748b)",
          "fc-border-color": "var(--preview-border, #e2e8f0)",
          "fc-primary-color": "var(--preview-primary, #2563eb)",
        }}
        onReady={handleReady}
      />
    </div>
  );
}
