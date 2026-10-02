"use client";

import { useEffect, useRef, useState } from "react";
import type { ForceCalendarElement } from "@forcecalendar/interface";
import s from "./interface.module.css";

type StudioElement = ForceCalendarElement;
const tones = [{ id: "iris", label: "Iris", color: "#7564d7" }, { id: "forest", label: "Forest", color: "#27816c" }, { id: "slate", label: "Slate", color: "#4f6e91" }] as const;
const appointments = [
  ["northstar", "Northstar · account review", 5, 9, 0, 60, "#7564d7"],
  ["meridian", "Meridian · onboarding", 5, 11, 0, 90, "#27816c"],
  ["discovery", "Acme · discovery call", 6, 9, 30, 60, "#7564d7"],
  ["followup", "Northstar · follow-up", 6, 10, 0, 60, "#ae733c"],
  ["workshop", "Customer workshop", 7, 9, 0, 120, "#27816c"],
  ["review", "Meridian · project review", 8, 10, 0, 60, "#7564d7"],
  ["handoff", "Implementation handoff", 9, 9, 30, 90, "#27816c"],
  ["planning", "Next-week planning", 9, 12, 0, 45, "#ae733c"],
] as const;
function sampleEvents() {
  return appointments.map(([id, title, day, hour, minute, duration, color]) => {
    const start = new Date(2026, 9, day, hour, minute);
    return { id, title, start: start.toISOString(), end: new Date(start.getTime() + duration * 60000).toISOString(), color };
  });
}

export default function InterfaceStudio() {
  const hostRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<StudioElement | null>(null);
  const [tone, setTone] = useState<(typeof tones)[number]["id"]>("iris");
  const [readOnly, setReadOnly] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("Loading synthetic appointments…");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let element: StudioElement | null = null;
    async function mount() {
      try {
        await import("@forcecalendar/interface");
        if (cancelled || !hostRef.current) return;
        element = document.createElement("forcecal-main") as StudioElement;
        element.setAttribute("view", "week");
        element.setAttribute("date", "2026-10-05T12:00:00");
        element.setAttribute("height", "510px");
        element.setAttribute("week-starts-on", "1");
        element.setAttribute("locale", "en-US");
        element.addEventListener("calendar-event-added", () => setMessage("calendar-event-added · new event created locally"));
        element.addEventListener("calendar-event-updated", () => setMessage("calendar-event-updated · local event changed"));
        element.addEventListener("calendar-view-change", () => setMessage("calendar-view-change · visible view changed"));
        element.addEventListener("calendar-navigate", () => setMessage("calendar-navigate · displayed date changed"));
        element.addEventListener("calendar-date-select", () => setMessage("calendar-date-select · date selected"));
        hostRef.current.appendChild(element);
        element.setEvents(sampleEvents());
        calendarRef.current = element;
        setStatus("ready");
        setMessage("8 synthetic appointments loaded · changes stay in this demo");
      } catch {
        if (!cancelled) { setStatus("error"); setMessage("The calendar could not load. Try again."); }
      }
    }
    void mount();
    return () => {
      cancelled = true;
      if (element) { element.remove(); element.destroy(); }
      calendarRef.current = null;
    };
  }, [retry]);

  function reset() {
    const calendar = calendarRef.current;
    if (!calendar) return;
    calendar.setEvents(sampleEvents());
    calendar.setDate(new Date(2026, 9, 5, 12));
    setMessage("Demo reset · 8 synthetic appointments restored");
  }

  return <div className={s.studio} data-tone={tone}>
    <div className={s.studioTop}><div><span className={s.appMark}>a</span><strong>Acme CRM</strong><span className={s.studioPath}>/ Customer calendar</span></div><span className={s.liveBadge}>Interactive component</span></div>
    <div className={s.studioControls}><div className={s.toneGroup} aria-label="Calendar accent"><span>Make it yours</span>{tones.map(item => <button type="button" key={item.id} aria-pressed={tone === item.id} onClick={() => setTone(item.id)}><i style={{ background: item.color }} aria-hidden="true" />{item.label}</button>)}</div><div className={s.behaviorControls}><label><input type="checkbox" checked={readOnly} disabled={status !== "ready"} onChange={event => { const value = event.target.checked; setReadOnly(value); if (calendarRef.current) calendarRef.current.readOnly = value; setMessage(value ? "Read-only enabled · navigation and selection remain available" : "Editing enabled · create, drag, and resize local events"); }} />Read-only</label><button type="button" onClick={reset} disabled={status !== "ready"}>Reset demo <span aria-hidden="true">↻</span></button></div></div>
    <div className={s.calendarScroller} tabIndex={0} role="region" aria-label="Interactive sample calendar; scroll horizontally on small screens"><div className={s.calendarMount} ref={hostRef} />{status !== "ready" && <div className={s.loadState}><p>{status === "loading" ? "Loading your calendar…" : "The calendar couldn’t load."}</p>{status === "error" && <button type="button" onClick={() => { setStatus("loading"); setReadOnly(false); setRetry(value => value + 1); }}>Try again</button>}</div>}</div>
    <div className={s.studioFooter}><span className={s.statusDot} aria-hidden="true" /><span role="status">{message}</span><span>Interface 1.9.1</span></div>
  </div>;
}
