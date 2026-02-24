"use client";

import { useEffect, useState } from "react";

interface CoreDemoProps {
  demo: "calendar" | "events" | "timezone";
}

export default function CoreDemo({ demo }: CoreDemoProps) {
  const [output, setOutput] = useState<string>("Loading...");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function runDemo() {
      try {
        const core = await import("@forcecalendar/core");

        if (cancelled) return;

        if (demo === "calendar") {
          const calendar = new core.Calendar({
            locale: "en-US",
            timezone: "America/New_York",
            weekStartsOn: 0,
          });
          calendar.setView("month");
          const events = calendar.getEvents();
          setOutput(
            `Calendar initialized\n` +
            `Locale: en-US\n` +
            `Timezone: America/New_York\n` +
            `Events loaded: ${events?.length ?? 0}`
          );
        } else if (demo === "events") {
          const calendar = new core.Calendar();
          calendar.addEvent({
            id: "demo-1",
            title: "Weekly Standup",
            start: new Date().toISOString(),
            duration: 30,
          });
          calendar.addEvent({
            id: "demo-2",
            title: "Sprint Planning",
            start: new Date(Date.now() + 86400000).toISOString(),
            duration: 60,
          });
          const events = calendar.getEvents();
          setOutput(
            `EventStore: ${events?.length ?? 0} events\n` +
            (events ?? [])
              .map(
                (e: Record<string, unknown>) =>
                  `  → ${e.title} (${e.duration}min)`
              )
              .join("\n")
          );
        } else if (demo === "timezone") {
          const now = new Date();
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          });
          const nyTime = formatter.format(now);
          const tokyoFormatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Tokyo",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          });
          const tokyoTime = tokyoFormatter.format(now);
          setOutput(
            `Timezone conversion demo\n` +
            `New York:  ${nyTime}\n` +
            `Tokyo:     ${tokyoTime}\n` +
            `UTC offset calculated via Intl API`
          );
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setOutput("Failed to load @forcecalendar/core");
        }
      }
    }

    runDemo();
    return () => {
      cancelled = true;
    };
  }, [demo]);

  return (
    <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-500">Live Output</span>
        <span className={`text-xs ${error ? "text-red-400" : "text-green-400"}`}>
          {error ? "error" : "running"}
        </span>
      </div>
      <pre className="p-4 text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
}
