"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function CorePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'calendar' | 'events' | 'timezone'>('calendar');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Technical Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container-custom">
          <div className={`max-w-5xl transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Product Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider">Pure JavaScript Engine</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
              <span className="bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                @forcecalendar/core
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 max-w-3xl">
              Zero-dependency calendar logic for enterprise applications.
              Build custom UIs with complete control over every aspect.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button className="group relative px-6 py-3 bg-emerald-500 text-black font-mono text-sm font-medium overflow-hidden transition-all duration-300">
                <span className="relative z-10">npm i @forcecalendar/core</span>
              </button>
              <a
                href="https://github.com/forcecalendar/core"
                className="px-6 py-3 border border-slate-700 text-white font-mono text-sm hover:bg-slate-900 hover:border-slate-600 transition-all duration-300"
              >
                View on GitHub
              </a>
              <div className="flex items-center gap-3 ml-auto text-xs font-mono text-slate-600">
                <span>v0.3.0</span>
                <span>•</span>
                <span>MIT License</span>
                <span>•</span>
                <span>14KB gzipped</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800 p-px">
              {[
                { label: 'Dependencies', value: '0', color: 'text-emerald-500' },
                { label: 'Test Coverage', value: '94%', color: 'text-green-500' },
                { label: 'Performance', value: '60fps', color: 'text-blue-500' },
                { label: 'Bundle Size', value: '14KB', color: 'text-amber-500' }
              ].map((metric, i) => (
                <div key={i} className="bg-slate-950 p-6 text-center">
                  <div className={`text-2xl font-bold font-mono mb-1 ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Core Architecture</h2>

          {/* Module Tabs */}
          <div className="flex items-center gap-1 mb-8 border-b border-slate-800">
            {['calendar', 'events', 'timezone'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 font-mono text-sm capitalize transition-all duration-300 border-b-2 ${
                  activeTab === tab
                    ? 'text-emerald-500 border-emerald-500'
                    : 'text-slate-500 border-transparent hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {activeTab === 'calendar' && 'Calendar Engine'}
                {activeTab === 'events' && 'Event Management'}
                {activeTab === 'timezone' && 'Timezone Support'}
              </h3>

              {activeTab === 'calendar' && (
                <div>
                  <p className="text-slate-400 mb-6">
                    The main Calendar class provides complete control over calendar state,
                    navigation, and rendering logic without any DOM dependencies.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">View Management</p>
                        <p className="text-sm text-slate-500">Month, week, day, and list views with custom view support</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">Navigation API</p>
                        <p className="text-sm text-slate-500">Previous, next, today, and goToDate methods</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">State Management</p>
                        <p className="text-sm text-slate-500">Immutable state with history for undo/redo</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'events' && (
                <div>
                  <p className="text-slate-400 mb-6">
                    Powerful event system with spatial indexing, recurring events,
                    and conflict detection for enterprise-scale applications.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">EventStore</p>
                        <p className="text-sm text-slate-500">O(1) lookups with spatial indexing by date</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">Recurring Events</p>
                        <p className="text-sm text-slate-500">RFC 5545 RRULE support with exceptions</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">Conflict Detection</p>
                        <p className="text-sm text-slate-500">Automatic overlap detection and resolution</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'timezone' && (
                <div>
                  <p className="text-slate-400 mb-6">
                    Full IANA timezone database support with automatic DST handling
                    and conversion between any timezones.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">IANA Database</p>
                        <p className="text-sm text-slate-500">Complete timezone data with historical rules</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">DST Handling</p>
                        <p className="text-sm text-slate-500">Automatic daylight saving time adjustments</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <div>
                        <p className="text-white font-medium">Conversion API</p>
                        <p className="text-sm text-slate-500">Convert between any timezone pairs</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Code Example */}
            <div className="bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">EXAMPLE</span>
                <span className="text-xs font-mono text-emerald-500">{activeTab}.js</span>
              </div>
              <pre className="p-6 text-sm font-mono overflow-x-auto">
                <code className="text-slate-300">
                  {activeTab === 'calendar' && `import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York',
  weekStartsOn: 0,
  businessHours: {
    start: '09:00',
    end: '17:00'
  }
});

// Navigate calendar
calendar.setView('month');
calendar.next();
calendar.goToDate(new Date('2024-03-15'));

// Listen to changes
calendar.on('viewChange', (view) => {
  console.log('View changed to:', view);
});`}

                  {activeTab === 'events' && `import { EventStore, RecurrenceEngine } from '@forcecalendar/core';

const store = new EventStore();
const recurrence = new RecurrenceEngine();

// Add recurring event
const event = {
  id: 'meeting-1',
  title: 'Weekly Standup',
  start: '2024-01-15T09:00:00',
  duration: 30,
  recurring: 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
};

store.add(event);

// Query events for date range
const events = store.getEventsInRange(
  new Date('2024-01-15'),
  new Date('2024-01-31')
);

// Check for conflicts
const conflicts = store.detectConflicts(event);`}

                  {activeTab === 'timezone' && `import { TimezoneManager } from '@forcecalendar/core';

const tz = new TimezoneManager();

// Convert time between zones
const nyTime = new Date('2024-03-15T15:00:00-05:00');
const tokyoTime = tz.convert(
  nyTime,
  'America/New_York',
  'Asia/Tokyo'
);

// Get timezone info
const info = tz.getTimezoneInfo('Europe/London');
console.log(info.offset); // Current UTC offset
console.log(info.isDST);  // DST active?

// Format with timezone
const formatted = tz.format(nyTime, {
  timezone: 'America/New_York',
  format: 'full'
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Enterprise Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🔒',
                title: 'Zero Dependencies',
                description: 'No external dependencies means no security vulnerabilities from third-party code.'
              },
              {
                icon: '⚡',
                title: 'Salesforce Compatible',
                description: 'Fully compatible with Locker Service and Lightning Web Components.'
              },
              {
                icon: '🚀',
                title: 'High Performance',
                description: 'LRU caching and spatial indexing for handling thousands of events.'
              },
              {
                icon: '🌍',
                title: 'International',
                description: 'Full i18n support with locale-aware formatting and RTL languages.'
              },
              {
                icon: '📅',
                title: 'ICS Support',
                description: 'Import and export standard iCalendar files with full fidelity.'
              },
              {
                icon: '🔄',
                title: 'Plugin System',
                description: 'Extend functionality with custom plugins and middleware.'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 hover:bg-slate-900/80 transition-colors">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Quick Start</h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-emerald-500">
                  01
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-3">Install the package</h3>
                  <div className="bg-slate-950 border border-slate-800 p-4 font-mono text-sm">
                    <span className="text-slate-500">$</span> npm install @forcecalendar/core
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-emerald-500">
                  02
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-3">Import and initialize</h3>
                  <div className="bg-slate-950 border border-slate-800 p-4 font-mono text-sm overflow-x-auto">
                    <code className="text-slate-300">
{`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York'
});`}
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-emerald-500">
                  03
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-3">Start building</h3>
                  <div className="bg-slate-950 border border-slate-800 p-4 font-mono text-sm overflow-x-auto">
                    <code className="text-slate-300">
{`// Add events
calendar.addEvent({
  title: 'Team Meeting',
  start: new Date('2024-03-15T10:00:00'),
  end: new Date('2024-03-15T11:00:00')
});

// Query events
const events = calendar.getEventsForMonth(new Date());`}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/core/docs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-mono text-sm font-medium hover:bg-emerald-400 transition-colors"
              >
                Read Full Documentation <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}