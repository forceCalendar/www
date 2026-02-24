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

const sampleEvents = [
  { id: "sample-1", title: "Team Standup", start: new Date().toISOString(), duration: 30 },
  { id: "sample-2", title: "Sprint Planning", start: new Date(Date.now() + 86400000).toISOString(), duration: 60 },
  { id: "sample-3", title: "Design Review", start: new Date(Date.now() + 172800000).toISOString(), duration: 45 },
];

export default function PlaygroundClient() {
  const [view, setView] = useState("month");
  const [locale, setLocale] = useState("en-US");
  const [weekStartsOn, setWeekStartsOn] = useState("0");
  const [timezone, setTimezone] = useState("");
  const [height, setHeight] = useState(500);
  const [copied, setCopied] = useState(false);
  const [eventList, setEventList] = useState<Record<string, unknown>[]>([]);
  const calRef = useRef<HTMLElement | null>(null);

  const htmlOutput = `<script type="module">
  import '@forcecalendar/interface';
</script>

<forcecal-main
  view="${view}"
  locale="${locale}"
  week-starts-on="${weekStartsOn}"${timezone ? `\n  timezone="${timezone}"` : ""}
  style="min-height: ${height}px"
/>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard may be unavailable */ }
  };

  const handleReady = useCallback((el: HTMLElement) => {
    calRef.current = el;
  }, []);

  const addSampleEvents = () => {
    if (!calRef.current) return;
    const cal = calRef.current as HTMLElement & {
      addEvent?: (e: Record<string, unknown>) => void;
      getEvents?: () => Record<string, unknown>[];
    };
    for (const event of sampleEvents) {
      if (cal.addEvent) cal.addEvent(event);
    }
    if (cal.getEvents) {
      setEventList(cal.getEvents());
    } else {
      setEventList(sampleEvents);
    }
  };

  useEffect(() => {
    if (!calRef.current) return;
    const cal = calRef.current as HTMLElement & {
      getEvents?: () => Record<string, unknown>[];
    };
    if (cal.getEvents) {
      setEventList(cal.getEvents());
    }
  }, [view, locale]);

  const selectClass =
    "w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";

  return (
    <div className="grid lg:grid-cols-[1fr,320px] gap-6">
      {/* Calendar */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50">
        <CalendarLoader
          view={view}
          locale={locale}
          weekStartsOn={weekStartsOn}
          timezone={timezone || undefined}
          height={height}
          onReady={handleReady}
        />
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Config */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">View</label>
              <select value={view} onChange={(e) => setView(e.target.value)} className={selectClass}>
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Locale</label>
              <select value={locale} onChange={(e) => setLocale(e.target.value)} className={selectClass}>
                {locales.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Week starts on</label>
              <select value={weekStartsOn} onChange={(e) => setWeekStartsOn(e.target.value)} className={selectClass}>
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="6">Saturday</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className={selectClass}>
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Height ({height}px)</label>
              <input
                type="range"
                min={300}
                max={800}
                step={50}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Events</h3>
          <button
            onClick={addSampleEvents}
            className="w-full px-3 py-2 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors mb-3"
          >
            Add Sample Events
          </button>
          {eventList.length > 0 && (
            <ul className="space-y-1.5">
              {eventList.map((e, i) => (
                <li key={i} className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                  {String(e.title || e.id || `Event ${i + 1}`)}
                </li>
              ))}
            </ul>
          )}
          {eventList.length === 0 && (
            <p className="text-xs text-slate-400">No events loaded.</p>
          )}
        </div>

        {/* Code Output */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">HTML Output</span>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
            {htmlOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}
