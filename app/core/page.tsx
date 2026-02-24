import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import InstallCommand from "../components/InstallCommand";
import CoreTabs from "./CoreTabs";

export const metadata: Metadata = {
  title: "@forcecalendar/core — Headless Calendar Engine",
  description:
    "Zero-dependency headless calendar engine for enterprise applications. Scheduling, recurrence, timezones, and conflict detection.",
  alternates: { canonical: "https://forcecalendar.org/core" },
};

const metrics = [
  { label: "Dependencies", value: "0" },
  { label: "License", value: "MIT" },
  { label: "Module", value: "ESM" },
  { label: "Bundle", value: "~14KB" },
];

const exports = [
  { name: "Calendar", desc: "Core calendar engine with state, navigation, and event management" },
  { name: "EventStore", desc: "Spatial-indexed event storage with range queries" },
  { name: "TimezoneManager", desc: "IANA timezone conversion and DST handling" },
  { name: "ICSParser", desc: "iCalendar import and export" },
  { name: "SearchEngine", desc: "Full-text search across event data" },
  { name: "StateManager", desc: "Reactive state management with subscribe/unsubscribe" },
];

export default function CorePage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-mono text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-4">
            Core Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
            @forcecalendar/core
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">
            Zero-dependency calendar logic for enterprise applications.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <InstallCommand command="npm install @forcecalendar/core" />
            <a
              href="https://github.com/forcecalendar/core"
              className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
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
            subtitle="Every export from @forcecalendar/core."
            id="api"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exports.map((exp) => (
              <div
                key={exp.name}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
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
  timezone: 'America/New_York'
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
  start: new Date('2024-03-15T10:00:00'),
  end: new Date('2024-03-15T11:00:00')
});`}
                  </pre>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-sm text-slate-500">
                  {item.step}
                </div>
                <div className="flex-grow">
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
          <div className="flex justify-center gap-4">
            <a
              href="https://docs.forcecalendar.org/core"
              className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://docs.forcecalendar.org/core/api"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              API Reference
            </a>
            <a
              href="https://github.com/forcecalendar/core"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
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
