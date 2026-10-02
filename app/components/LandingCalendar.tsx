"use client";

import { useCallback, useState } from "react";
import CalendarLoader from "./CalendarLoader";

type View = "month" | "week" | "day";
type CalendarElement = HTMLElement & { setEvents?: (events: Record<string, unknown>[]) => unknown };

export default function LandingCalendar() {
  const [surface, setSurface] = useState<"calendar" | "model" | "agent">("calendar");
  const [fixture, setFixture] = useState<Record<string, unknown>[]>([]);
  const [view, setView] = useState<View>("week");
  const seed = useCallback((element: HTMLElement) => {
    const start = new Date();
    start.setHours(9, 0, 0, 0);
    const at = (days: number, hours: number) => {
      const date = new Date(start);
      date.setDate(date.getDate() + days);
      date.setHours(hours);
      return date.toISOString();
    };
    const events = [
      { id: "landing-review", title: "Project review", start: at(0, 10), end: at(0, 11), color: "#6657ce" },
      { id: "landing-focus", title: "Focus time", start: at(1, 9), end: at(1, 11), color: "#237a68" },
      { id: "landing-planning", title: "Plan next week", start: at(2, 14), end: at(2, 15), color: "#bd762b" },
      { id: "landing-research", title: "Research review", start: at(-1, 13), end: at(-1, 14), color: "#446da8" },
    ];
    (element as CalendarElement).setEvents?.(events);
    setFixture(events);
  }, []);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 border-b border-hairline bg-raised px-4 py-3" role="group" aria-label="Explore calendar architecture">
        {([{key:"calendar",label:"01 / Calendar UI"},{key:"model",label:"02 / Event model"},{key:"agent",label:"03 / Agent boundary"}] as const).map(item => <button key={item.key} type="button" aria-pressed={surface === item.key} onClick={() => setSurface(item.key)} className={`rounded-sm px-3 py-2 font-mono text-[10px] tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${surface === item.key ? "bg-fg text-surface" : "text-muted hover:bg-sunken"}`}>{item.label}</button>)}
      </div>
      <div hidden={surface !== "calendar"}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline bg-sunken px-5 py-4">
        <div><p className="text-sm font-semibold">Your calendar, in your application.</p><p className="mt-1 text-xs text-muted">Live Web Component · local sample events</p></div>
        <div className="flex gap-1" role="group" aria-label="Preview calendar view">
          {(["month", "week", "day"] as const).map(value => <button key={value} type="button" aria-pressed={view === value} onClick={() => setView(value)} className={`rounded-sm px-3 py-2 text-xs capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${view === value ? "bg-accent text-accent-fg" : "text-muted hover:bg-raised"}`}>{value}</button>)}
        </div>
      </div>
      <div className="overflow-x-auto bg-raised" role="region" aria-label="Interactive sample calendar; scroll horizontally on small screens" tabIndex={0}>
        <div className="min-w-[620px]">
          <CalendarLoader view={view} height={410} onReady={seed} cssVars={{ "fc-background": "var(--preview-bg)", "fc-background-alt": "var(--preview-bg-alt)", "fc-text-color": "var(--preview-text)", "fc-text-secondary": "var(--preview-text-secondary)", "fc-border-color": "var(--preview-border)", "fc-primary-color": "var(--preview-primary)", "fc-font-family": "Inter, system-ui, sans-serif" }} />
        </div>
      </div>
      </div>
      {surface === "model" && <div className="min-h-[430px] bg-code-bg p-6 text-code-fg sm:p-8"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-widest text-code-muted">Data, before the interface</p><h3 className="mt-3 font-display text-2xl font-medium">The view starts with an event.</h3></div><span className="font-mono text-[10px] text-code-muted">Initial local demo fixture</span></div><pre className="mt-6 overflow-x-auto rounded-sm border border-code-border p-5 font-mono text-xs leading-7"><code>{JSON.stringify(fixture[0] ?? {id:"landing-review",title:"Project review",start:"Loading local fixture…"}, null, 2)}</code></pre><p className="mt-5 max-w-xl text-sm leading-relaxed text-code-muted">Core handles scheduling logic. Your application supplies storage and access rules. This is the initial sample event, not a connected account or live change log.</p></div>}
      {surface === "agent" && <div className="min-h-[430px] bg-code-bg p-6 text-code-fg sm:p-8"><p className="font-mono text-[10px] uppercase tracking-widest text-[#b3a8ff]">Architecture concept / private prototype</p><h3 className="mt-3 font-display text-2xl font-medium">A tool call is an access boundary.</h3><div className="mt-7 grid gap-6 sm:grid-cols-3">{[{n:"01",title:"Identify",text:"Which principal is acting, and on whose calendar?"},{n:"02",title:"Scope",text:"Which operations are permitted? Keep reads and changes distinct."},{n:"03",title:"Record",text:"Make the resulting revision attributable and visible."}].map(item=><div key={item.n} className="border-t border-code-border pt-4"><span className="font-mono text-[10px] text-[#b3a8ff]">{item.n}</span><h4 className="mt-3 text-sm font-semibold">{item.title}</h4><p className="mt-3 text-sm leading-relaxed text-code-muted">{item.text}</p></div>)}</div><p className="mt-7 border-t border-code-border pt-5 text-xs leading-relaxed text-code-muted">Illustrative design explanation. No agent is executing here. Live provider sync, hosted agent access, and production execution guarantees are not shipped.</p></div>}
    </div>
  );
}
