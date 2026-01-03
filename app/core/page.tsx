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
      <div className="fixed inset-0 opacity-10 pointer-events-none">
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
      <section className="py-24 border-t border-slate-800 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        </div>

        <div className="container-custom relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent w-12" />
              <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider">Why Choose Core</span>
              <div className="h-px bg-gradient-to-l from-transparent via-emerald-500/50 to-transparent w-12" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Enterprise Features
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Built from the ground up for mission-critical applications. Every feature designed with security, performance, and scalability in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Zero Dependencies',
                description: 'No external dependencies means no security vulnerabilities from third-party code.',
                gradient: 'from-emerald-500/20 to-cyan-500/20',
                iconColor: 'text-emerald-400',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                title: 'Salesforce Ready',
                description: 'Fully compatible with Locker Service and Lightning Web Components.',
                gradient: 'from-blue-500/20 to-purple-500/20',
                iconColor: 'text-blue-400',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'High Performance',
                description: 'LRU caching and spatial indexing for handling thousands of events.',
                gradient: 'from-purple-500/20 to-pink-500/20',
                iconColor: 'text-purple-400',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: 'Global Ready',
                description: 'Full i18n support with locale-aware formatting and RTL languages.',
                gradient: 'from-cyan-500/20 to-teal-500/20',
                iconColor: 'text-cyan-400',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'ICS Standard',
                description: 'Import and export standard iCalendar files with full fidelity.',
                gradient: 'from-amber-500/20 to-orange-500/20',
                iconColor: 'text-amber-400',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Extensible',
                description: 'Plugin system for custom functionality and middleware.',
                gradient: 'from-indigo-500/20 to-blue-500/20',
                iconColor: 'text-indigo-400',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="group relative">
                {/* Card Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`} />

                {/* Card Content */}
                <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-slate-700 group-hover:transform group-hover:-translate-y-1">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-xl opacity-50`} />
                    <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5`}>
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                        <div className={feature.iconColor}>
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Feature Badge */}
                  <div className="mt-6 inline-flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${feature.iconColor.replace('text-', 'bg-')} animate-pulse`} />
                    <span className="text-xs font-mono text-slate-500 uppercase">Available Now</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Dependencies', value: '0', suffix: '' },
              { label: 'Bundle Size', value: '14', suffix: 'KB' },
              { label: 'Test Coverage', value: '94', suffix: '%' },
              { label: 'Performance', value: '60', suffix: 'FPS' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-800/50">
                <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                  {stat.value}<span className="text-sm">{stat.suffix}</span>
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
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