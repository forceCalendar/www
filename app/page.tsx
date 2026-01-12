"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import CodeSnippet from "@/components/CodeSnippet";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero - Direct */}
      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              forceCalendar
            </h1>

            <p className="text-xl text-slate-300 mb-4">
              A calendar library that works inside Salesforce.
            </p>

            <p className="text-slate-500 mb-8">
              Zero dependencies. No DOM required. Built for enterprise security sandboxes
              where other calendar libraries break.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <code className="bg-slate-900 border border-slate-800 px-4 py-2 text-sm text-slate-300 rounded">
                npm install @forcecalendar/core
              </code>
              <a
                href="https://github.com/forcecalendar"
                className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">The Problem</h2>

          <div className="space-y-4 text-slate-400">
            <p>
              Salesforce Locker Service blocks many JavaScript patterns. Strict CSP policies
              reject inline styles. Security reviews flag external dependencies.
            </p>
            <p>
              Most calendar libraries were not built for this. They work in normal web apps
              but break inside enterprise security sandboxes.
            </p>
          </div>
        </div>
      </section>

      {/* What This Is */}
      <section className="py-16 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">What This Is</h2>

          <div className="space-y-4 text-slate-400">
            <p>
              <span className="text-white">@forcecalendar/core</span> is calendar logic without UI.
              Dates, events, timezones, recurrence rules. Runs anywhere JavaScript runs.
            </p>
            <p>
              <span className="text-white">@forcecalendar/interface</span> is a complete calendar UI
              built on Core using Web Components. Drop it into any framework.
            </p>
            <p className="text-slate-500">
              Use Core if you need to build custom UI. Use Interface if you want something ready-made.
            </p>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Usage</h2>

          <CodeSnippet
            code={`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  timezone: 'America/New_York'
});

// Add an event
calendar.addEvent({
  title: 'Meeting',
  start: new Date('2025-01-15T09:00:00'),
  end: new Date('2025-01-15T10:00:00')
});

// Add a recurring event
calendar.addEvent({
  title: 'Weekly Standup',
  start: new Date('2025-01-13T10:00:00'),
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
});

// Query events for a date range
const events = calendar.getEvents({
  start: new Date('2025-01-01'),
  end: new Date('2025-01-31')
});`}
            filename="example.js"
          />

          <div className="mt-8">
            <Link
              href="/playground"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              Try it in the playground →
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities - Simple List */}
      <section className="py-16 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Capabilities</h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-2 text-slate-400 text-sm">
            <p>• IANA timezone database with DST</p>
            <p>• RFC 5545 recurrence rules (RRULE)</p>
            <p>• ICS import/export</p>
            <p>• Conflict detection</p>
            <p>• Event search</p>
            <p>• Locale-aware formatting</p>
            <p>• TypeScript types included</p>
            <p>• Works in Node.js</p>
          </div>
        </div>
      </section>

      {/* Salesforce Specific */}
      <section className="py-16 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Salesforce</h2>

          <div className="space-y-4 text-slate-400">
            <p>
              Core runs inside Lightning Web Components without modification.
              No Locker Service violations. No CSP issues.
            </p>
          </div>

          <CodeSnippet
            code={`// In your LWC
import { LightningElement } from 'lwc';
import { Calendar } from 'c/forceCalendarCore';

export default class MyCalendar extends LightningElement {
  calendar = new Calendar({ timezone: 'UTC' });

  connectedCallback() {
    this.calendar.addEvent({
      title: 'Salesforce Event',
      start: new Date()
    });
  }
}`}
            filename="myCalendar.js"
          />
        </div>
      </section>

      {/* Links */}
      <section className="py-16 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Resources</h2>

          <div className="space-y-3">
            <Link href="/core/docs" className="block text-slate-400 hover:text-white transition-colors">
              Core Documentation →
            </Link>
            <Link href="/core/api" className="block text-slate-400 hover:text-white transition-colors">
              API Reference →
            </Link>
            <Link href="/interface" className="block text-slate-400 hover:text-white transition-colors">
              Interface Components →
            </Link>
            <a
              href="https://github.com/forcecalendar/core"
              className="block text-slate-400 hover:text-white transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
            <span>MIT License</span>
            <span>Open Source</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
