"use client";

import { useEffect, useState } from "react";
import CodeBlock from "../components/CodeBlock";
import s from "./core.module.css";

const examples = {
  recurrence: {
    label: "Expand a series", filename: "recurrence.js", title: "One rule. Six appointments.",
    description: "A Monday / Wednesday / Friday series, expanded into its first six occurrences. This example uses UTC.",
    code: `import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({ timeZone: 'UTC' });
calendar.addEvent({
  id: 'review', title: 'Customer review',
  start: '2026-10-05T09:00:00Z',
  end: '2026-10-05T09:30:00Z',
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=6',
});

const next = calendar.takeOccurrences('review', 6, {
  after: new Date('2026-10-05T00:00:00Z'),
});
console.log(next.map(event => event.start.toISOString()));
calendar.destroy();`,
  },
  conflicts: {
    label: "Check an overlap", filename: "conflicts.js", title: "See where time collides.",
    description: "A 09:30 appointment overlaps an existing 09:00–10:00 booking. The engine reports the overlap; your app decides what happens next.",
    code: `import { Calendar, ConflictDetector } from '@forcecalendar/core';

const calendar = new Calendar({ timeZone: 'UTC' });
calendar.addEvent({
  id: 'existing', title: 'Account review',
  start: '2026-10-05T09:00:00Z', end: '2026-10-05T10:00:00Z',
});
const candidate = calendar.addEvent({
  id: 'candidate', title: 'Onboarding',
  start: '2026-10-05T09:30:00Z', end: '2026-10-05T10:30:00Z',
});
const detector = new ConflictDetector(calendar.eventStore);
console.log(detector.checkConflicts(candidate));
calendar.destroy();`,
  },
  snapshot: {
    label: "Reconcile records", filename: "snapshot.js", title: "New data. Only the changes.",
    description: "Load a second snapshot with one existing record and one new record. The unchanged appointment retains its instance.",
    code: `import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({ timeZone: 'UTC' });
const review = {
  id: 'review', title: 'Account review',
  start: '2026-10-05T09:00:00Z', end: '2026-10-05T10:00:00Z',
};
calendar.addEvent(review);

const changes = calendar.setEvents([
  review,
  { ...review, id: 'onboarding', title: 'Onboarding' },
], { reconcile: true });
console.log(changes);
calendar.destroy();`,
  },
};

type Example = keyof typeof examples;
type Result = { key: string; value: string }[];

export default function CoreWorkbench() {
  const [active, setActive] = useState<Example>("recurrence");
  const [result, setResult] = useState<{ example: Example; rows: Result; error?: boolean } | null>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function calculate() {
      try {
        const { Calendar, ConflictDetector } = await import("@forcecalendar/core");
        if (cancelled) return;
        const calendar = new Calendar({ timeZone: "UTC" });
        let rows: Result;
        try {
          if (active === "recurrence") {
            calendar.addEvent({ id: "review", title: "Customer review", start: "2026-10-05T09:00:00Z", end: "2026-10-05T09:30:00Z", recurrenceRule: "FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=6" });
            rows = calendar.takeOccurrences("review", 6, { after: new Date("2026-10-05T00:00:00Z") }).map((event, index) => ({ key: `0${index + 1}`, value: event.start.toISOString().replace("T", " · ").replace(":00.000Z", " UTC") }));
          } else if (active === "conflicts") {
            calendar.addEvent({ id: "existing", title: "Account review", start: "2026-10-05T09:00:00Z", end: "2026-10-05T10:00:00Z" });
            const candidate = calendar.addEvent({ id: "candidate", title: "Onboarding", start: "2026-10-05T09:30:00Z", end: "2026-10-05T10:30:00Z" });
            const summary = new ConflictDetector(calendar.eventStore).checkConflicts(candidate);
            rows = [{ key: "hasConflicts", value: String(summary.hasConflicts) }, { key: "totalConflicts", value: String(summary.totalConflicts) }, ...summary.conflicts.map(conflict => ({ key: conflict.type, value: `${conflict.overlapMinutes} minute overlap` }))];
          } else {
            const review = { id: "review", title: "Account review", start: "2026-10-05T09:00:00Z", end: "2026-10-05T10:00:00Z" };
            const original = calendar.addEvent(review);
            const changes = calendar.setEvents([review, { ...review, id: "onboarding", title: "Onboarding" }], { reconcile: true });
            rows = ["added", "updated", "removed", "unchanged"].map(key => ({ key, value: String(changes[key as "added" | "updated" | "removed" | "unchanged"].length) }));
            rows.push({ key: "same instance", value: String(changes.unchanged[0] === original) });
          }
        } finally { calendar.destroy(); }
        if (!cancelled) setResult({ example: active, rows });
      } catch {
        if (!cancelled) setResult({ example: active, rows: [{ key: "Load error", value: "Use Run again to retry." }], error: true });
      }
    }
    void calculate();
    return () => { cancelled = true; };
  }, [active, run]);

  const example = examples[active];
  const ready = result?.example === active;
  return <div className={s.workbench}>
    <div className={s.workbenchBar}><div className={s.exampleButtons} aria-label="Engine examples">{(Object.keys(examples) as Example[]).map(key => <button type="button" key={key} aria-pressed={key === active} onClick={() => setActive(key)}>{examples[key].label}</button>)}</div><span>Core 2.5.7 / live execution</span></div>
    <div className={s.workbenchGrid}><div className={s.workbenchInput}><CodeBlock flat dense filename={example.filename} code={example.code} /></div><div className={s.workbenchOutput}><span className={s.eyebrow}>Result / synthetic dataset</span><h3>{example.title}</h3><p>{example.description}</p><div className={s.result} aria-live="polite" aria-busy={!ready}>{ready ? result.rows.map(row => <div key={row.key}><span>{row.key}</span><strong>{row.value}</strong></div>) : <p>Loading the engine…</p>}</div><button className={s.runButton} type="button" onClick={() => { setResult(null); setRun(value => value + 1); }}>Run again <span aria-hidden="true">↻</span></button><span className={s.runStatus}>{ready ? result.error ? "Could not run" : "Executed in this browser" : "Waiting for results"}</span></div></div>
  </div>;
}
