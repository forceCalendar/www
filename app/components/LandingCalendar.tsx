"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CalendarLoader from "./CalendarLoader";
import { createDemoEvents, demoTime, type DemoEvent } from "./landing-demo";

type View = "month" | "week" | "day";
type CalendarElement = HTMLElement & {
  setEvents: (events: DemoEvent[]) => unknown;
  getVisibleRange: () => {start: Date; end: Date} | null;
  addEvent: (event: DemoEvent) => unknown;
  updateEvent: (id: string, changes: Partial<DemoEvent>) => unknown;
  deleteEvent: (id: string) => unknown;
};

export default function LandingCalendar() {
  const [surface, setSurface] = useState<"calendar" | "model" | "agent">("calendar");
  const [fixture, setFixture] = useState<DemoEvent[]>([]);
  const [view, setView] = useState<View>("week");
  const [element, setElement] = useState<CalendarElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [action, setAction] = useState("23 sample appointments · overlapping sessions · editable events");
  const rangeStart = useRef<Date | null>(null);
  const step = useRef(0);
  const stopped = useRef(false);
  const seed = useCallback((node: HTMLElement) => setElement(node as CalendarElement), []);
  const pause = useCallback(() => { stopped.current = true; setPlaying(false); }, []);

  useEffect(() => {
    if (!element) return;
    let frame = 0;
    let attempts = 0;
    let observer: IntersectionObserver | undefined;
    const initialise = () => {
      const range = element.getVisibleRange();
      if (!range) { if (++attempts < 120) frame = requestAnimationFrame(initialise); return; }
      rangeStart.current = new Date(range.start);
      const events = createDemoEvents(rangeStart.current);
      element.setEvents(events);
      setFixture(events);
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer?.disconnect();
        setPlaying(!stopped.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      }, { threshold: 0.15 });
      observer.observe(element);
    };
    initialise();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (preference.matches) pause(); };
    preference.addEventListener("change", reduce);
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener("change", reduce); };
  }, [element, pause]);

  useEffect(() => {
    if (!playing || !element || !rangeStart.current) return;
    const timer = window.setInterval(() => {
      if (stopped.current || document.hidden) return;
      const start = rangeStart.current!;
      const selector = '[data-event-id="demo-agent-appointment"]';
      const before = element.shadowRoot?.querySelector(selector)?.getBoundingClientRect();
      const index = step.current % 4;
      if (index === 0) {
        element.addEvent({id: "demo-agent-appointment", title: "Northstar kickoff", start: demoTime(start, 1, 9), end: demoTime(start, 1, 10), color: "#ad5277"});
        setAction('01 / CREATE → Northstar kickoff · Monday 09:00');
      } else if (index === 1) {
        element.updateEvent("demo-agent-appointment", {start: demoTime(start, 3, 9), end: demoTime(start, 3, 10)});
        setAction('02 / MOVE → Northstar kickoff · Wednesday 09:00');
      } else if (index === 2) {
        element.updateEvent("demo-agent-appointment", {title: "Northstar kickoff + Q&A", end: demoTime(start, 3, 10, 30)});
        setAction('03 / UPDATE → Northstar kickoff + Q&A · 90 minutes');
      } else {
        element.deleteEvent("demo-agent-appointment");
        setAction('04 / DELETE → Sample appointment removed. Your calendar to explore.');
        setPlaying(false);
      }
      step.current++;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        requestAnimationFrame(() => {
          if (stopped.current) return;
          const block = element.shadowRoot?.querySelector(selector);
          if (!block) return;
          const after = block.getBoundingClientRect();
          block.animate(before ? [
            { transform: `translate(${before.x - after.x}px, ${before.y - after.y}px)`, opacity: 0.7 },
            { transform: "translate(0, 0)", opacity: 1 },
          ] : [{ opacity: 0, transform: "scale(.95)" }, { opacity: 1, transform: "scale(1)" }],
          { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" });
        });
      }
    }, 3200);
    return () => window.clearInterval(timer);
  }, [playing, element]);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 border-b border-hairline bg-raised px-4 py-3" role="group" aria-label="Explore calendar architecture">
        {([{key:"calendar",label:"01 / Calendar UI"},{key:"model",label:"02 / Event model"},{key:"agent",label:"03 / Headless API"}] as const).map(item => <button key={item.key} type="button" aria-pressed={surface === item.key} onClick={() => { pause(); setSurface(item.key); }} className={`rounded-sm px-3 py-2 font-mono text-[10px] tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${surface === item.key ? "bg-fg text-surface" : "text-muted hover:bg-sunken"}`}>{item.label}</button>)}
      </div>
      <div hidden={surface !== "calendar"}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline bg-sunken px-5 py-4">
        <div><p className="text-sm font-semibold">Customer appointments, in context.</p><p className="mt-1 text-xs text-muted">Live Web Component · local sample events</p></div>
        <div className="flex gap-1" role="group" aria-label="Preview calendar view">
          {(["month", "week", "day"] as const).map(value => <button key={value} type="button" aria-pressed={view === value} onClick={() => { pause(); setView(value); }} className={`rounded-sm px-3 py-2 text-xs capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${view === value ? "bg-accent text-accent-fg" : "text-muted hover:bg-raised"}`}>{value}</button>)}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-[#191b2a] px-5 py-4 text-white">
        <div className="min-w-0"><p className="font-mono text-[9px] uppercase tracking-widest text-[#b3a8ff]">Application request → real local calendar API</p><p className="mt-2 text-xs" role="status" aria-live={playing ? "off" : "polite"}>{action}</p><p className="mt-1 text-[10px] text-[#b8bcce]">Scripted local demo. No connected account. Interact with the calendar to stop.</p></div>
        <button type="button" className="shrink-0 rounded border border-[#77718f] px-4 py-2 text-xs focus-visible:outline-2" onClick={() => { if (playing) pause(); else { stopped.current = false; setPlaying(true); } }} aria-pressed={playing}>{playing ? "Pause demo" : "Play demo"}</button>
      </div>
      <div onPointerDownCapture={pause} onKeyDownCapture={pause} onWheelCapture={pause} className="overflow-x-auto bg-raised" role="region" aria-label="Interactive sample calendar; scroll horizontally on small screens" tabIndex={0}>
        <div className="min-w-[620px]">
          <CalendarLoader view={view} height={480} onReady={seed} cssVars={{ "fc-background": "var(--preview-bg)", "fc-background-alt": "var(--preview-bg-alt)", "fc-text-color": "var(--preview-text)", "fc-text-secondary": "var(--preview-text-secondary)", "fc-border-color": "var(--preview-border)", "fc-primary-color": "var(--preview-primary)", "fc-font-family": "Inter, system-ui, sans-serif" }} />
        </div>
      </div>
      </div>
      {surface === "model" && <div className="min-h-[430px] bg-code-bg p-6 text-code-fg sm:p-8"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-widest text-code-muted">Data, before the interface</p><h3 className="mt-3 font-display text-2xl font-medium">The view starts with an event.</h3></div><span className="font-mono text-[10px] text-code-muted">Initial local demo fixture</span></div><pre className="mt-6 overflow-x-auto rounded-sm border border-code-border p-5 font-mono text-xs leading-7"><code>{JSON.stringify(fixture[0] ?? {id:"landing-review",title:"Project review",start:"Loading local fixture…"}, null, 2)}</code></pre><p className="mt-5 max-w-xl text-sm leading-relaxed text-code-muted">Core handles scheduling logic. Your application supplies storage and access rules. This is the initial sample event, not a connected account or live change log.</p></div>}
      {surface === "agent" && <div className="min-h-[430px] bg-code-bg p-6 text-code-fg sm:p-8"><p className="font-mono text-[10px] uppercase tracking-widest text-[#b3a8ff]">Same library / another caller</p><h3 className="mt-3 font-display text-2xl font-medium">Calendar tools for an agent. On your terms.</h3><p className="mt-6 max-w-2xl text-sm leading-relaxed text-code-muted">A person can use the interface. An application or agent can call the headless engine to read, create, update, or delete events. Your application decides access, persistence, and when those calls run.</p><pre className="mt-6 overflow-x-auto border border-code-border p-5 text-xs leading-7"><code>{`// Illustrative application adapter
// Authorize the caller before invoking your calendar.
calendar.addEvent(appointment);
calendar.updateEvent(appointment.id, newTime);
calendar.removeEvent(appointment.id);`}</code></pre><p className="mt-7 text-xs leading-relaxed text-code-muted">forceCalendar is a calendar library. It does not assign work, direct an agent, or run a task queue. A separate scoped-tool adapter is a private prototype; live provider sync is not shipped.</p></div>}

    </div>
  );
}
