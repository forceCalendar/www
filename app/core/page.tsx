"use client";

import { useState } from "react";
import Link from "next/link";

export default function CorePage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "events" | "timezone">("calendar");

  const codeExamples = {
    calendar: `import { Calendar } from '@forcecalendar/core';

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
    events: `import { EventStore } from '@forcecalendar/core';

const store = new EventStore();

store.add({
  id: 'meeting-1',
  title: 'Weekly Standup',
  start: '2024-01-15T09:00:00',
  duration: 30,
  recurring: 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
});

const events = store.getEventsInRange(
  new Date('2024-01-15'),
  new Date('2024-01-31')
);`,
    timezone: `import { TimezoneManager } from '@forcecalendar/core';

const tz = new TimezoneManager();

const nyTime = new Date('2024-03-15T15:00:00-05:00');
const tokyoTime = tz.convert(
  nyTime,
  'America/New_York',
  'Asia/Tokyo'
);

const info = tz.getTimezoneInfo('Europe/London');
console.log(info.offset, info.isDST);`
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-medium text-white">
            <span className="italic">force</span>Calendar
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="https://docs.forcecalendar.org"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Docs
            </a>
            <Link href="/playground" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Playground
            </Link>
            <a
              href="https://github.com/forcecalendar"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-mono text-violet-500 uppercase tracking-wider mb-4">
            Core Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            @forcecalendar/core
          </h1>
          <p className="text-xl text-neutral-400 mb-8">
            Zero-dependency calendar logic for enterprise applications.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <code className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 font-mono">
              npm install @forcecalendar/core
            </code>
            <a
              href="https://github.com/forcecalendar/core"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Dependencies", value: "0" },
              { label: "Test Coverage", value: "94%" },
              { label: "Performance", value: "60fps" },
              { label: "Bundle Size", value: "14KB" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-8">Architecture</h2>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 border-b border-neutral-800">
            {(["calendar", "events", "timezone"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? "text-violet-500 border-violet-500"
                    : "text-neutral-500 border-transparent hover:text-neutral-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              {activeTab === "calendar" && (
                <>
                  <h3 className="text-lg font-medium text-white mb-3">Calendar Engine</h3>
                  <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
                    Complete control over calendar state, navigation, and rendering logic without DOM dependencies.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">Month, week, day, and list views</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">Navigation API with goToDate</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">Immutable state with undo/redo</span>
                    </li>
                  </ul>
                </>
              )}
              {activeTab === "events" && (
                <>
                  <h3 className="text-lg font-medium text-white mb-3">Event Management</h3>
                  <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
                    Spatial indexing, recurring events, and conflict detection for enterprise-scale applications.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">O(1) lookups with spatial indexing</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">RFC 5545 RRULE with exceptions</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">Automatic conflict detection</span>
                    </li>
                  </ul>
                </>
              )}
              {activeTab === "timezone" && (
                <>
                  <h3 className="text-lg font-medium text-white mb-3">Timezone Support</h3>
                  <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
                    Full IANA timezone database with automatic DST handling and conversion.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">Complete IANA database</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">Automatic DST adjustments</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-violet-500">•</span>
                      <span className="text-neutral-300">Convert between any timezone pair</span>
                    </li>
                  </ul>
                </>
              )}
            </div>

            {/* Code */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Example</span>
                <span className="text-xs font-mono text-violet-500">{activeTab}.js</span>
              </div>
              <pre className="p-4 text-sm font-mono text-neutral-300 overflow-x-auto">
                <code>{codeExamples[activeTab]}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-10">Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {[
              { title: "Zero Dependencies", desc: "No third-party code. No supply chain risk." },
              { title: "Salesforce Ready", desc: "Compatible with Locker Service and LWC." },
              { title: "High Performance", desc: "LRU caching and spatial indexing." },
              { title: "Global Ready", desc: "Full i18n with RTL support." },
              { title: "ICS Standard", desc: "Import and export iCalendar files." },
              { title: "Extensible", desc: "Plugin system for custom functionality." },
            ].map((feature) => (
              <div key={feature.title}>
                <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-10">Quick Start</h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sm text-neutral-500">
                1
              </div>
              <div className="flex-grow">
                <h3 className="text-white font-medium mb-2">Install</h3>
                <code className="block px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-300 font-mono">
                  npm install @forcecalendar/core
                </code>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sm text-neutral-500">
                2
              </div>
              <div className="flex-grow">
                <h3 className="text-white font-medium mb-2">Initialize</h3>
                <pre className="px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-300 font-mono overflow-x-auto">
{`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York'
});`}
                </pre>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sm text-neutral-500">
                3
              </div>
              <div className="flex-grow">
                <h3 className="text-white font-medium mb-2">Build</h3>
                <pre className="px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-300 font-mono overflow-x-auto">
{`calendar.addEvent({
  title: 'Team Meeting',
  start: new Date('2024-03-15T10:00:00'),
  end: new Date('2024-03-15T11:00:00')
});`}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <a
              href="https://docs.forcecalendar.org/core"
              className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-500 transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://docs.forcecalendar.org/core/api"
              className="px-5 py-2.5 border border-neutral-800 text-white text-sm font-medium rounded-lg hover:bg-neutral-900 transition-colors"
            >
              API Reference
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-600 text-sm">MIT License</span>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="https://docs.forcecalendar.org" className="hover:text-white transition-colors">Docs</a>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/interface" className="hover:text-white transition-colors">Interface</Link>
            <Link href="/playground" className="hover:text-white transition-colors">Playground</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
