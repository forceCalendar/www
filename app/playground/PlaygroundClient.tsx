"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ForceCalendarElement } from "@forcecalendar/interface";
import CalendarLoader from "../components/CalendarLoader";
import Tabs from "../components/Tabs";
import Button from "../components/Button";

const locales = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "ja-JP", label: "Japanese" },
  { value: "zh-CN", label: "Chinese" },
  { value: "ar-SA", label: "Arabic" },
  { value: "ko-KR", label: "Korean" },
  { value: "pt-BR", label: "Portuguese (BR)" },
];

const timezones = [
  { value: "", label: "Local (browser)" },
  { value: "America/New_York", label: "New York (ET)" },
  { value: "America/Chicago", label: "Chicago (CT)" },
  { value: "America/Denver", label: "Denver (MT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST)" },
];

const views = ["month", "week", "day"] as const;

// Core derives duration from start/end, so events carry real end times.
// Mix of timed, recurring, and all-day events so every view has something
// interesting to show.
const makeSampleEvents = () => {
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
      id: "sample-standup",
      title: "Daily Standup",
      ...at(0, 9, 15, 15),
      recurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
      color: "#2563EB",
    },
    { id: "sample-oneonone", title: "1:1 with Alex", ...at(1, 15, 30, 30), color: "#6B7280" },
    { id: "sample-planning", title: "Sprint Planning", ...at(1, 10, 0, 60), color: "#8B5CF6" },
    { id: "sample-review", title: "Design Review", ...at(2, 14, 0, 45), color: "#F59E0B" },
    { id: "sample-demo", title: "Customer Demo", ...at(3, 11, 0, 45), color: "#10B981" },
    {
      id: "sample-offsite",
      title: "Team Offsite",
      ...at(5, 0, 0, 24 * 60),
      allDay: true,
      color: "#EF4444",
    },
  ];
};

// DOM events forcecal-main dispatches; the log panel subscribes to all of them
const CALENDAR_EVENTS = [
  "calendar-view-change",
  "calendar-navigate",
  "calendar-range-change",
  "calendar-date-select",
  "calendar-event-added",
  "calendar-event-updated",
  "calendar-event-deleted",
  "calendar-events-set",
] as const;

const isoDay = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : d);

// Snapshot and range payloads carry whole Event instances and Dates; reduce
// them to what is worth reading in a one-line log entry.
const summarizeDetail = (name: string, detail: unknown): unknown => {
  if (!detail || typeof detail !== "object") return detail;
  const d = detail as Record<string, unknown>;
  if (name === "calendar-events-set") {
    const count = (v: unknown) => (Array.isArray(v) ? v.length : 0);
    return {
      events: count(d.events),
      added: count(d.added),
      updated: count(d.updated),
      removed: count(d.removed),
      unchanged: count(d.unchanged),
    };
  }
  if (name === "calendar-range-change") {
    return { start: isoDay(d.start), end: isoDay(d.end), view: d.view };
  }
  return detail;
};

interface LogEntry {
  id: number;
  time: string;
  name: string;
  detail: string;
}

const codeTabs = ["html", "react", "vue"] as const;
type CodeTab = (typeof codeTabs)[number];
const codeTabLabels: Record<CodeTab, string> = { html: "HTML", react: "React", vue: "Vue" };

export default function PlaygroundClient() {
  const [view, setView] = useState<(typeof views)[number]>("month");
  const [locale, setLocale] = useState("en-US");
  const [weekStartsOn, setWeekStartsOn] = useState("0");
  const [timezone, setTimezone] = useState("");
  const [height, setHeight] = useState(560);
  const [copied, setCopied] = useState(false);
  const [codeTab, setCodeTab] = useState<CodeTab>("html");
  const [eventList, setEventList] = useState<Record<string, unknown>[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const calRef = useRef<ForceCalendarElement | null>(null);
  const logIdRef = useRef(0);
  const cleanupRef = useRef<(() => void) | null>(null);
  const seededRef = useRef(false);

  const pushLog = useCallback((name: string, detail: unknown) => {
    let summary = "";
    try {
      summary = JSON.stringify(summarizeDetail(name, detail)) ?? "";
    } catch {
      summary = String(detail);
    }
    if (summary.length > 100) summary = summary.slice(0, 100) + "…";
    const entry: LogEntry = {
      id: ++logIdRef.current,
      time: new Date().toLocaleTimeString(undefined, { hour12: false }),
      name,
      detail: summary,
    };
    setLog((prev) => [entry, ...prev].slice(0, 30));
  }, []);

  const syncEvents = useCallback(() => {
    const cal = calRef.current;
    if (cal) setEventList(cal.events as unknown as Record<string, unknown>[]);
  }, []);

  const handleReady = useCallback(
    (el: HTMLElement) => {
      const cal = el as ForceCalendarElement;
      calRef.current = cal;
      cleanupRef.current?.();
      const handlers = CALENDAR_EVENTS.map((name) => {
        const handler = (e: Event) => {
          pushLog(name, (e as CustomEvent).detail);
          // covers calendar-event-* and calendar-events-set
          if (name.startsWith("calendar-event")) syncEvents();
        };
        el.addEventListener(name, handler);
        return { name, handler };
      });
      cleanupRef.current = () => {
        handlers.forEach(({ name, handler }) => el.removeEventListener(name, handler));
      };
      // Seed the demo on first mount so the calendar never starts empty. The
      // `events` property takes a whole snapshot and reconciles it in one go.
      if (!seededRef.current && cal.events.length === 0) {
        seededRef.current = true;
        cal.events = makeSampleEvents();
      }
      syncEvents();
    },
    [pushLog, syncEvents]
  );

  useEffect(() => () => cleanupRef.current?.(), []);

  // Merge the samples into whatever is already loaded: with removeMissing off,
  // setEvents() keeps events absent from the snapshot (e.g. ones you created)
  const addSampleEvents = () => {
    const cal = calRef.current;
    if (!cal) return;
    cal.setEvents(makeSampleEvents(), { removeMissing: false });
    syncEvents();
  };

  // An empty snapshot reconciles everything away in a single render
  const clearEvents = () => {
    const cal = calRef.current;
    if (!cal) return;
    cal.events = [];
    syncEvents();
  };

  const attrLines = [
    `view="${view}"`,
    `locale="${locale}"`,
    `week-starts-on="${weekStartsOn}"`,
    ...(timezone ? [`timezone="${timezone}"`] : []),
  ];

  const codeSamples: Record<CodeTab, { filename: string; code: string }> = {
    html: {
      filename: "index.html",
      code: `<forcecal-main
  ${attrLines.join("\n  ")}
  style="display: block; min-height: ${height}px"
></forcecal-main>

<script type="module">
  import '@forcecalendar/interface';

  const calendar = document.querySelector('forcecal-main');

  // Assign a complete snapshot; the calendar reconciles it and
  // dispatches one calendar-events-set with the change set
  calendar.events = [
    {
      id: 'standup',
      title: 'Daily Standup',
      start: '2026-09-07T09:15:00',
      end: '2026-09-07T09:30:00',
      recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'
    }
  ];

  // Fires after first render and on every navigation or view change
  calendar.addEventListener('calendar-range-change', ({ detail }) => {
    console.log('visible', detail.start, detail.end);
  });
</script>`,
    },
    react: {
      filename: "App.jsx",
      code: `// npm install @forcecalendar/react
import { ForceCalendar } from '@forcecalendar/react';

function App() {
  return (
    <ForceCalendar
      view="${view}"
      locale="${locale}"
      weekStartsOn={${weekStartsOn}}${timezone ? `\n      timezone="${timezone}"` : ""}
      height="${height}px"
      onDateSelect={({ date }) => console.log(date)}
    />
  );
}`,
    },
    vue: {
      filename: "App.vue",
      code: `<!-- npm install @forcecalendar/vue -->
<template>
  <ForceCalendar
    view="${view}"
    locale="${locale}"
    :week-starts-on="${weekStartsOn}"${timezone ? `\n    timezone="${timezone}"` : ""}
    height="${height}px"
    @date-select="d => console.log(d)"
  />
</template>

<script setup>
import { ForceCalendar } from '@forcecalendar/vue';
</script>`,
    },
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSamples[codeTab].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  const selectClass =
    "h-9 w-full appearance-none rounded-md bg-raised px-3 pr-8 text-sm text-fg ring-1 ring-inset ring-line shadow-elev-1 transition-[box-shadow,ring-color] hover:ring-line focus:outline-none focus:ring-2 focus:ring-ring dark:ring-hairline dark:shadow-none dark:hover:ring-line";
  const labelClass = "mb-1.5 block text-xs font-medium text-muted";
  const panelClass = "rounded-xl bg-raised p-5 ring-1 ring-hairline shadow-elev-1 dark:shadow-none ring-hi";
  const panelTitle = "text-sm font-semibold text-fg";
  const emptyClass = "rounded-md border border-dashed border-line px-3 py-5 text-center text-xs text-subtle";
  const selectChevron = (
    <svg className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      {/* Left column: calendar + code output */}
      <div className="min-w-0 space-y-6">
        <div className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline shadow-elev-2 ring-hi dark:ring-line/80">
          {/* Calendar toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-sunken px-4 py-2.5">
            <Tabs
              variant="segmented"
              tabs={views}
              active={view}
              onChange={setView}
              label="Calendar view"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs tabular text-subtle">
                {eventList.length} event{eventList.length === 1 ? "" : "s"}
              </span>
              <Button size="sm" onClick={addSampleEvents}>
                Add sample events
              </Button>
              <Button size="sm" variant="secondary" onClick={clearEvents} disabled={eventList.length === 0}>
                Clear
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
          <CalendarLoader
            view={view}
            locale={locale}
            weekStartsOn={weekStartsOn}
            timezone={timezone || undefined}
            height={height}
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
          <div className="border-t border-hairline bg-sunken px-4 py-2.5 text-xs leading-relaxed text-muted">
            <span className="font-medium text-fg">Fully keyboard accessible:</span>{" "}
            Tab into the grid, move with the arrow keys, PageUp/PageDown to change period, Enter to select. Every view implements the WAI-ARIA grid pattern.
          </div>
        </div>

        {/* Code output */}
        <div className="overflow-hidden rounded-xl bg-code-bg text-code-fg ring-1 ring-code-border shadow-window">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-code-border bg-code-chrome px-3 py-2">
            <div className="flex items-center gap-0.5 rounded-md bg-black/20 p-0.5" role="tablist" aria-label="Code sample framework">
              {codeTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  onClick={() => setCodeTab(tab)}
                  aria-selected={codeTab === tab}
                  className={`h-7 rounded-[5px] px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    codeTab === tab
                      ? "bg-white/10 text-code-fg"
                      : "text-code-muted hover:text-code-fg"
                  }`}
                >
                  {codeTabLabels[tab]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 pr-1">
              <span className="font-mono text-xs text-code-muted">
                {codeSamples[codeTab].filename}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md px-2 py-1 text-xs font-medium text-code-muted transition-colors hover:bg-white/[0.08] hover:text-code-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed">
            {codeSamples[codeTab].code}
          </pre>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Config */}
        <div className={panelClass}>
          <h3 className={`${panelTitle} mb-4`}>Configuration</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="pg-locale" className={labelClass}>
                Locale
              </label>
              <div className="relative">
                <select
                  id="pg-locale"
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  className={selectClass}
                >
                  {locales.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
                {selectChevron}
              </div>
            </div>
            <div>
              <label htmlFor="pg-tz" className={labelClass}>
                Timezone
              </label>
              <div className="relative">
                <select
                  id="pg-tz"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className={selectClass}
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                {selectChevron}
              </div>
            </div>
            <div>
              <label htmlFor="pg-wso" className={labelClass}>
                Week starts on
              </label>
              <div className="relative">
                <select
                  id="pg-wso"
                  value={weekStartsOn}
                  onChange={(e) => setWeekStartsOn(e.target.value)}
                  className={selectClass}
                >
                  <option value="0">Sunday</option>
                  <option value="1">Monday</option>
                  <option value="6">Saturday</option>
                </select>
                {selectChevron}
              </div>
            </div>
            <div>
              <label htmlFor="pg-height" className={`${labelClass} flex items-center justify-between`}>
                <span>Height</span>
                <span className="font-mono tabular text-subtle">{height}px</span>
              </label>
              <input
                id="pg-height"
                type="range"
                min={400}
                max={800}
                step={40}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-accent"
              />
            </div>
          </div>
        </div>

        {/* Events */}
        <div className={panelClass}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className={panelTitle}>Events</h3>
            {eventList.length > 0 && (
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium tabular text-accent-text ring-1 ring-inset ring-accent-line/60">
                {eventList.length}
              </span>
            )}
          </div>
          {eventList.length > 0 ? (
            <ul className="-mx-2 space-y-0.5">
              {eventList.map((e) => (
                <li
                  key={String(e.id)}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-fg transition-colors hover:bg-sunken"
                >
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: String(e.color || "#2448E0") }}
                    aria-hidden
                  />
                  <span className="truncate">{String(e.title || e.id)}</span>
                  {Boolean(e.recurring) && (
                    <span className="ml-auto flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                      repeats
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className={emptyClass}>
              No events yet. Add the samples to see the calendar in action.
            </div>
          )}
        </div>

        {/* Event log */}
        <div className={panelClass}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className={panelTitle}>Event log</h3>
            {log.length > 0 && (
              <button
                type="button"
                onClick={() => setLog([])}
                className="rounded-sm text-xs text-subtle transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Clear
              </button>
            )}
          </div>
          <p className="mb-3 text-xs leading-relaxed text-subtle">
            DOM events dispatched by <code className="font-mono">&lt;forcecal-main&gt;</code>.
            Navigate to see <code className="font-mono">calendar-range-change</code>; load or
            clear events to see one <code className="font-mono">calendar-events-set</code> per snapshot.
          </p>
          {log.length > 0 ? (
            <ul className="max-h-64 space-y-1 overflow-y-auto" aria-live="polite">
              {log.map((entry) => (
                <li key={entry.id} className="rounded-md bg-sunken px-2.5 py-1.5 ring-1 ring-inset ring-hairline">
                  <div className="flex items-baseline justify-between gap-2">
                    <code className="truncate font-mono text-[11px] font-medium text-accent-text">
                      {entry.name}
                    </code>
                    <span className="flex-shrink-0 font-mono text-[10px] tabular text-subtle">
                      {entry.time}
                    </span>
                  </div>
                  {entry.detail && entry.detail !== "{}" && (
                    <div className="mt-0.5 truncate font-mono text-[10px] text-subtle">
                      {entry.detail}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className={emptyClass}>Waiting for activity…</div>
          )}
        </div>
      </div>
    </div>
  );
}
