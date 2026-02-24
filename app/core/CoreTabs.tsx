"use client";

import { useState } from "react";
import CodeBlock from "../components/CodeBlock";
import CoreDemo from "../components/CoreDemo";

const tabs = ["calendar", "events", "timezone"] as const;
type Tab = (typeof tabs)[number];

const descriptions: Record<Tab, { title: string; text: string; bullets: string[] }> = {
  calendar: {
    title: "Calendar Engine",
    text: "Complete control over calendar state, navigation, and rendering logic without DOM dependencies.",
    bullets: [
      "Month, week, day, and list views",
      "Navigation API with goToDate, next, previous",
      "Event-driven state with subscribe/unsubscribe",
    ],
  },
  events: {
    title: "Event Management",
    text: "Spatial indexing, recurring events, and conflict detection for enterprise-scale event volumes.",
    bullets: [
      "Efficient range queries with spatial indexing",
      "RFC 5545 RRULE with exceptions and overrides",
      "Automatic conflict detection across events",
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
  timezone: 'America/New_York',
  weekStartsOn: 0
});

calendar.setView('month');
calendar.goToDate(new Date('2024-03-15'));

calendar.on('viewChange', (view) => {
  console.log('View:', view);
});`,
  },
  events: {
    filename: "events.ts",
    code: `import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar();

calendar.addEvent({
  id: 'meeting-1',
  title: 'Weekly Standup',
  start: '2024-01-15T09:00:00',
  duration: 30,
  recurring: 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
});

const events = calendar.getEvents();
console.log(events.length, 'events loaded');`,
  },
  timezone: {
    filename: "timezone.ts",
    code: `import { TimezoneManager } from '@forcecalendar/core';

const tz = new TimezoneManager();

const nyTime = new Date('2024-03-15T15:00:00-05:00');
const tokyoTime = tz.convert(
  nyTime,
  'America/New_York',
  'Asia/Tokyo'
);

const info = tz.getTimezoneInfo('Europe/London');
console.log(info.offset, info.isDST);`,
  },
};

export default function CoreTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("calendar");
  const desc = descriptions[activeTab];
  const example = codeExamples[activeTab];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm capitalize transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
              activeTab === tab
                ? "text-violet-600 dark:text-violet-400 border-violet-600 dark:border-violet-400"
                : "text-slate-500 border-transparent hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Description */}
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
            {desc.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">
            {desc.text}
          </p>
          <ul className="space-y-3 text-sm mb-8">
            {desc.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="text-violet-500 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-slate-600 dark:text-slate-300">{bullet}</span>
              </li>
            ))}
          </ul>
          <CoreDemo demo={activeTab} />
        </div>

        {/* Code */}
        <CodeBlock code={example.code} filename={example.filename} language="TypeScript" />
      </div>
    </div>
  );
}
