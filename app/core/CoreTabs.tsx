"use client";

import { useState } from "react";
import CodeBlock from "../components/CodeBlock";
import CoreDemo from "../components/CoreDemo";
import Tabs from "../components/Tabs";

const tabs = ["calendar", "events", "timezone"] as const;
type Tab = (typeof tabs)[number];

const descriptions: Record<Tab, { title: string; text: string; bullets: string[] }> = {
  calendar: {
    title: "Calendar Engine",
    text: "Complete control over calendar state, navigation, and rendering logic without DOM dependencies.",
    bullets: [
      "Month, week, and day view data, plus a list format for custom UIs",
      "Navigation API with goToDate, next, previous",
      "Event-driven state with subscribe/unsubscribe",
      "setEvents(events, { reconcile: true }) applies only the diff from a snapshot and reports added, updated, and removed",
    ],
  },
  events: {
    title: "Event Management",
    text: "Spatial indexing, recurring events, and conflict detection for enterprise-scale event volumes.",
    bullets: [
      "Efficient range queries with spatial indexing",
      "RFC 5545 RRULE with exceptions and overrides",
      "Automatic conflict detection across events",
      "Month, week, and day views expand recurring series into occurrences with stable ids",
      "Lazy occurrence iterator: iterateOccurrences, getNextOccurrence, takeOccurrences",
    ],
  },
  timezone: {
    title: "Timezone Support",
    text: "Full IANA timezone handling with automatic DST transitions and cross-timezone conversion.",
    bullets: [
      "Complete IANA timezone database",
      "Automatic daylight-saving adjustments",
      "Convert between any timezone pair",
    ],
  },
};

const codeExamples: Record<Tab, { code: string; filename: string }> = {
  calendar: {
    filename: "calendar.ts",
    code: `import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timeZone: 'America/New_York',
  weekStartsOn: 0
});

calendar.setView('month');
calendar.goToDate(new Date('2026-03-16'));

calendar.on('viewChange', ({ view, date }) => {
  console.log('View:', view, date);
});`,
  },
  events: {
    filename: "events.ts",
    code: `import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar();

calendar.addEvent({
  id: 'meeting-1',
  title: 'Weekly Standup',
  start: '2026-01-15T09:00:00',
  end: '2026-01-15T09:30:00',
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
});

const events = calendar.getEvents();
console.log(events.length, 'events loaded');

const next = calendar.getNextOccurrence('meeting-1', new Date());
console.log('Next standup:', next?.start);`,
  },
  timezone: {
    filename: "timezone.ts",
    code: `import { TimezoneManager } from '@forcecalendar/core';

const tz = TimezoneManager.getInstance();

const nyTime = new Date('2026-03-16T15:00:00-05:00');
const tokyoTime = tz.convertTimezone(
  nyTime,
  'America/New_York',
  'Asia/Tokyo'
);

const offset = tz.getTimezoneOffset(new Date(), 'Europe/London');
const inDST = tz.isDST(new Date(), 'Europe/London');
console.log(offset, inDST);`,
  },
};

export default function CoreTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("calendar");
  const desc = descriptions[activeTab];
  const example = codeExamples[activeTab];

  return (
    <div>
      <Tabs
        tabs={tabs}
        active={activeTab}
        onChange={setActiveTab}
        label="Core modules"
        className="mb-8"
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-fg">{desc.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{desc.text}</p>
          <ul className="mt-5 mb-7 space-y-2.5 text-sm">
            {desc.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-0.5 flex-shrink-0 text-accent-text">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-fg/90">{bullet}</span>
              </li>
            ))}
          </ul>
          <CoreDemo demo={activeTab} />
        </div>

        {/* Code */}
        <div className="min-w-0">
          <CodeBlock code={example.code} filename={example.filename} language="TypeScript" />
        </div>
      </div>
    </div>
  );
}
