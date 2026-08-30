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
            timeZone: "America/New_York",
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
          const standupStart = Date.now();
          const planningStart = Date.now() + 86400000;
          // Core derives duration from start/end; it has no duration input field
          calendar.addEvent({
            id: "demo-1",
            title: "Weekly Standup",
            start: new Date(standupStart).toISOString(),
            end: new Date(standupStart + 30 * 60000).toISOString(),
          });
          calendar.addEvent({
            id: "demo-2",
            title: "Sprint Planning",
            start: new Date(planningStart).toISOString(),
            end: new Date(planningStart + 60 * 60000).toISOString(),
          });
          const events = calendar.getEvents();
          setOutput(
            `EventStore: ${events?.length ?? 0} events\n` +
            (events ?? [])
              .map((e) => `  → ${e.title} (${e.durationMinutes}min)`)
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
    <div className="overflow-hidden rounded-xl bg-code-bg ring-1 ring-code-border">
      <div className="flex items-center justify-between border-b border-code-border bg-code-chrome px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-code-muted">Live output</span>
        <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] ${error ? "text-rose-400" : "text-emerald-400"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${error ? "bg-rose-400" : "bg-emerald-400"}`} aria-hidden />
          {error ? "error" : "running"}
        </span>
      </div>
      <pre className="whitespace-pre-wrap p-4 font-mono text-[13px] leading-relaxed text-code-fg">
        {output}
      </pre>
    </div>
  );
}
