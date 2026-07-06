"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import CalendarLoader from "../components/CalendarLoader";

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
  "calendar-date-select",
  "calendar-event-add",
  "calendar-event-update",
  "calendar-event-remove",
] as const;

interface LogEntry {
  id: number;
  time: string;
  name: string;
  detail: string;
}

type CodeTab = "html" | "react" | "vue";

interface CalendarElement extends HTMLElement {
  addEvent?: (e: Record<string, unknown>) => unknown;
  removeEvent?: (id: string) => unknown;
  deleteEvent?: (id: string) => unknown;
  getEvents?: () => Record<string, unknown>[];
}

export default function PlaygroundClient() {
  const [view, setView] = useState("month");
  const [locale, setLocale] = useState("en-US");
  const [weekStartsOn, setWeekStartsOn] = useState("0");
  const [timezone, setTimezone] = useState("");
  const [height, setHeight] = useState(560);
  const [copied, setCopied] = useState(false);
  const [codeTab, setCodeTab] = useState<CodeTab>("html");
  const [eventList, setEventList] = useState<Record<string, unknown>[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const calRef = useRef<CalendarElement | null>(null);
  const logIdRef = useRef(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const pushLog = useCallback((name: string, detail: unknown) => {
    let summary = "";
    try {
      summary = JSON.stringify(detail) ?? "";
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
    if (cal?.getEvents) setEventList(cal.getEvents());
  }, []);

  const handleReady = useCallback(
    (el: HTMLElement) => {
      calRef.current = el as CalendarElement;
      cleanupRef.current?.();
      const handlers = CALENDAR_EVENTS.map((name) => {
        const handler = (e: Event) => {
          pushLog(name, (e as CustomEvent).detail);
          if (name.startsWith("calendar-event")) syncEvents();
        };
        el.addEventListener(name, handler);
        return { name, handler };
      });
      cleanupRef.current = () => {
        handlers.forEach(({ name, handler }) => el.removeEventListener(name, handler));
      };
      syncEvents();
    },
    [pushLog, syncEvents]
  );

  useEffect(() => () => cleanupRef.current?.(), []);

  const addSampleEvents = () => {
    const cal = calRef.current;
    if (!cal?.addEvent) return;
    for (const event of makeSampleEvents()) {
      cal.addEvent(event);
    }
    syncEvents();
  };

  const clearEvents = () => {
    const cal = calRef.current;
    if (!cal) return;
    const remove = cal.removeEvent ?? cal.deleteEvent;
    if (!remove || !cal.getEvents) return;
    for (const e of cal.getEvents()) {
      remove.call(cal, String(e.id));
    }
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
      code: `<script type="module">
  import '@forcecalendar/interface';
</script>

<forcecal-main
  ${attrLines.join("\n  ")}
  style="display: block; min-height: ${height}px"
></forcecal-main>`,
    },
    react: {
      filename: "App.jsx",
      code: `import '@forcecalendar/interface';

function App() {
  return (
    <forcecal-main
      ${attrLines.join("\n      ")}
      style={{ display: 'block', minHeight: ${height} }}
    />
  );
}`,
    },
    vue: {
      filename: "App.vue",
      code: `<template>
  <forcecal-main
    ${attrLines.join("\n    ")}
    style="display: block; min-height: ${height}px"
    @calendar-date-select="onSelect"
  />
</template>

<script setup>
import '@forcecalendar/interface';

function onSelect(e) {
  console.log('Selected:', e.detail.date);
}
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
    "w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";

  return (
    <div className="grid lg:grid-cols-[1fr,340px] gap-6 items-start">
      {/* Left column: calendar + code output */}
      <div className="space-y-6 min-w-0">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50">
          {/* Calendar toolbar */}
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/40">
            <div className="flex items-center gap-1" role="group" aria-label="Calendar view">
              {views.map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`px-3 py-1.5 text-xs font-medium capitalize rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    view === v
                      ? "bg-brand-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                {eventList.length} event{eventList.length === 1 ? "" : "s"}
              </span>
              <button
                onClick={addSampleEvents}
                className="px-3 py-1.5 bg-brand-600 text-white text-xs font-medium rounded-md hover:bg-brand-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
              >
                Add sample events
              </button>
              <button
                onClick={clearEvents}
                disabled={eventList.length === 0}
                className="px-3 py-1.5 text-xs font-medium rounded-md ring-1 ring-slate-200 dark:ring-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Clear
              </button>
            </div>
          </div>
          <CalendarLoader
            view={view}
            locale={locale}
            weekStartsOn={weekStartsOn}
            timezone={timezone || undefined}
            height={height}
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

        {/* Code output */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1" role="group" aria-label="Code sample framework">
              {(Object.keys(codeSamples) as CodeTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCodeTab(tab)}
                  aria-pressed={codeTab === tab}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    codeTab === tab
                      ? "bg-slate-800 text-white"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab === "html" ? "HTML" : tab === "react" ? "React" : "Vue"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-600">
                {codeSamples[codeTab].filename}
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-slate-500 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
            {codeSamples[codeTab].code}
          </pre>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Config */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Configuration</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="pg-locale" className="block text-xs text-slate-500 mb-1.5">
                Locale
              </label>
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
            </div>
            <div>
              <label htmlFor="pg-tz" className="block text-xs text-slate-500 mb-1.5">
                Timezone
              </label>
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
            </div>
            <div>
              <label htmlFor="pg-wso" className="block text-xs text-slate-500 mb-1.5">
                Week starts on
              </label>
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
            </div>
            <div>
              <label htmlFor="pg-height" className="block text-xs text-slate-500 mb-1.5">
                Height ({height}px)
              </label>
              <input
                id="pg-height"
                type="range"
                min={400}
                max={800}
                step={40}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">Events</h3>
            {eventList.length > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium tabular-nums">
                {eventList.length}
              </span>
            )}
          </div>
          {eventList.length > 0 ? (
            <ul className="space-y-1">
              {eventList.map((e) => (
                <li
                  key={String(e.id)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ backgroundColor: String(e.color || "#2563EB") }}
                    aria-hidden
                  />
                  <span className="truncate">{String(e.title || e.id)}</span>
                  {Boolean(e.recurring) && (
                    <span className="ml-auto flex-shrink-0 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      repeats
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-md px-3 py-5 text-center">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                No events yet. Add the samples to see the calendar in action.
              </p>
            </div>
          )}
        </div>

        {/* Event log */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">Event log</h3>
            {log.length > 0 && (
              <button
                onClick={() => setLog([])}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
            DOM events dispatched by <code className="font-mono">&lt;forcecal-main&gt;</code>.
            Click around the calendar to see them fire.
          </p>
          {log.length > 0 ? (
            <ul className="space-y-1 max-h-64 overflow-y-auto" aria-live="polite">
              {log.map((entry) => (
                <li key={entry.id} className="px-2 py-1.5 rounded-md bg-slate-50 dark:bg-slate-900/60">
                  <div className="flex items-baseline justify-between gap-2">
                    <code className="text-[11px] font-mono text-brand-600 dark:text-brand-400 truncate">
                      {entry.name}
                    </code>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 tabular-nums flex-shrink-0">
                      {entry.time}
                    </span>
                  </div>
                  {entry.detail && entry.detail !== "{}" && (
                    <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {entry.detail}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-md px-3 py-4 text-center">
              <p className="text-xs text-slate-400 dark:text-slate-500">Waiting for activity…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
