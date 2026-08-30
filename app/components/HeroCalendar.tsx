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
    <div className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline shadow-elev-3 ring-hi dark:ring-line/80">
      <div className="flex items-center gap-1.5 border-b border-hairline bg-sunken px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-fg/10" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/10" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/10" aria-hidden />
        <code className="ml-3 font-mono text-[11px] text-subtle">
          &lt;forcecal-main&gt; — live, drag an event
        </code>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          live
        </span>
      </div>
      <CalendarLoader
        view="month"
        height={520}
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
        onReady={handleReady}
      />
    </div>
  );
}
