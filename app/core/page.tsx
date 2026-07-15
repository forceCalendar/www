import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import InstallCommand from "../components/InstallCommand";
import CoreTabs from "./CoreTabs";

export const metadata: Metadata = {
  title: "@forcecalendar/core - Headless Calendar Engine",
  description:
    "Zero-dependency headless calendar engine for enterprise applications. Scheduling, recurrence, timezones, and conflict detection.",
  alternates: { canonical: "https://forcecalendar.org/core" },
  openGraph: { url: "https://forcecalendar.org/core" },
};

const metrics = [
  { label: "Dependencies", value: "0" },
  { label: "License", value: "MIT" },
  { label: "TypeScript", value: ".d.ts" },
  { label: "Min + gzip", value: "~35KB" },
];

const exports = [
  { name: "Calendar", desc: "Core calendar engine with state, navigation, timezone conversion, and event management" },
  { name: "Event", desc: "Event model with validation, normalization, and timezone-aware accessors" },
  { name: "EventStore", desc: "Indexed event storage with range queries and conflict detection" },
  { name: "StateManager", desc: "Reactive state management with subscribe/unsubscribe and history" },
  { name: "DateUtils", desc: "Date math, formatting, and week/month grid helpers" },
  { name: "EventSearch", desc: "Full-text search across event titles, descriptions, and fields" },
  { name: "ICSParser", desc: "RFC 5545 iCalendar import and export" },
  { name: "RecurrenceEngine", desc: "RRULE expansion with exceptions, overrides, and hard occurrence caps" },
  { name: "EnhancedCalendar", desc: "Calendar extended with worker-backed search and RecurrenceEngineV2" },
  { name: "ICSHandler", desc: "High-level ICS import/export API over ICSParser, including URL fetch" },
  { name: "RecurrenceEngineV2", desc: "Extended recurrence engine with modified instances and complex DST handling" },
  { name: "RRuleParser", desc: "Standalone RFC 5545 RRULE string parser" },
  { name: "SearchWorkerManager", desc: "Offloads search indexing and queries to a Web Worker" },
  { name: "InvertedIndex", desc: "Term-to-event index powering fast full-text lookups" },
  { name: "TimezoneManager", desc: "IANA timezone conversions, DST detection, and offset math" },
  { name: "ConflictDetector", desc: "Time, attendee, and resource overlap detection across event sets" },
];

export default function CorePage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="relative pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 ring-1 ring-violet-200 dark:ring-violet-500/25 text-xs font-mono font-medium uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-6">
              Core Engine
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
              @forcecalendar/core
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
              Zero-dependency calendar logic for enterprise applications. Runs anywhere JavaScript runs: browser, Node, serverless, and edge.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <InstallCommand command="npm install @forcecalendar/core" />
              <a
                href="https://github.com/forcecalendar/core"
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                View on GitHub <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 px-6 border-y border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {metrics.map((stat) => (
              <div key={stat.label} className="text-center bg-white dark:bg-slate-900/60 ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl p-5">
                <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Tour */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Module tour" id="modules" />
          <CoreTabs />
        </div>
      </section>

      {/* API Surface */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="API surface"
            subtitle="Every class exported from @forcecalendar/core."
            id="api"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exports.map((exp) => (
              <div
                key={exp.name}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-violet-300 dark:hover:border-violet-500/40 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60"
              >
                <code className="text-sm font-mono text-violet-600 dark:text-violet-400">
                  {exp.name}
                </code>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Full API documentation at{" "}
            <a
              href="https://docs.forcecalendar.org/core/api"
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              docs.forcecalendar.org/core/api
            </a>
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="Quick start" id="quickstart" />
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Install",
                content: (
                  <code className="block px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 font-mono">
                    npm install @forcecalendar/core
                  </code>
                ),
              },
              {
                step: "2",
                title: "Initialize",
                content: (
                  <pre className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 font-mono overflow-x-auto">
{`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timeZone: 'America/New_York'
});`}
                  </pre>
                ),
              },
              {
                step: "3",
                title: "Add events",
                content: (
                  <pre className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 font-mono overflow-x-auto">
{`calendar.addEvent({
  title: 'Team Meeting',
  start: new Date('2026-03-16T10:00:00'),
  end: new Date('2026-03-16T11:00:00')
});`}
                  </pre>
                ),
              },
            ].map((item, i, arr) => (
              <div key={item.step} className="relative flex gap-4">
                {i < arr.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-[-2rem] w-px bg-slate-200 dark:bg-slate-800" aria-hidden />
                )}
                <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center text-sm font-medium text-violet-600 dark:text-violet-400">
                  {item.step}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-slate-900 dark:text-white font-medium mb-2">
                    {item.title}
                  </h3>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-6">
            Start building
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://docs.forcecalendar.org/core"
              className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg shadow-sm shadow-violet-600/25 hover:bg-violet-700 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Documentation
            </a>
            <a
              href="https://docs.forcecalendar.org/core/api"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              API Reference
            </a>
            <a
              href="https://github.com/forcecalendar/core"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
