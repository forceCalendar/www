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
      {/* Subtle gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent" />
      </div>

      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className={`${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>

            {/* Logo Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8">
              <em
                className="font-light italic not-italic"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                force
              </em>
              <strong className="font-bold text-white">Calendar</strong>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-2xl">
              A calendar library that works inside Salesforce.
            </p>

            <p className="text-slate-500 mb-10 max-w-2xl leading-relaxed">
              Zero dependencies. No DOM required. Built for enterprise security sandboxes
              where other calendar libraries break.
            </p>

            {/* Install + Links */}
            <div className="flex flex-wrap items-center gap-4">
              <code className="bg-slate-900/80 border border-slate-800 px-5 py-3 text-sm text-slate-300 rounded-lg font-mono">
                npm install @forcecalendar/core
              </code>
              <a
                href="https://github.com/forcecalendar"
                className="text-slate-500 hover:text-white text-sm flex items-center gap-2 transition-colors px-4 py-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <Link
                href="/playground"
                className="text-slate-500 hover:text-white text-sm transition-colors px-4 py-3"
              >
                Playground →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono text-slate-600 uppercase tracking-wider mb-4">The Problem</h2>

            <div className="space-y-4 text-lg text-slate-400 leading-relaxed">
              <p>
                Salesforce Locker Service blocks many JavaScript patterns. Strict CSP policies
                reject inline styles. Security reviews flag external dependencies.
              </p>
              <p>
                Most calendar libraries weren't built for this. They work in normal web apps
                but break inside enterprise security sandboxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Is */}
      <section className="py-20 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-mono text-slate-600 uppercase tracking-wider mb-8">Two Packages</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Core */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                <span className="font-mono text-sm text-violet-400">@forcecalendar/core</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Calendar logic without UI. Dates, events, timezones, recurrence rules.
                Runs anywhere JavaScript runs.
              </p>
            </div>

            {/* Interface */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="font-mono text-sm text-cyan-400">@forcecalendar/interface</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Complete calendar UI built on Core using Web Components.
                Drop it into any framework.
              </p>
            </div>
          </div>

          <p className="text-slate-600 text-sm mt-6">
            Use Core for custom UI. Use Interface for something ready-made.
          </p>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-mono text-slate-600 uppercase tracking-wider mb-8">Usage</h2>

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
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-mono text-slate-600 uppercase tracking-wider mb-8">Capabilities</h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>IANA timezone database with DST</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>RFC 5545 recurrence rules</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>ICS import/export</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>Conflict detection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>Event search</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>Locale-aware formatting</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>TypeScript types included</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>Works in Node.js</span>
            </div>
          </div>
        </div>
      </section>

      {/* Salesforce */}
      <section className="py-20 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-mono text-slate-600 uppercase tracking-wider mb-4">Salesforce</h2>

          <p className="text-slate-400 mb-8 max-w-2xl">
            Core runs inside Lightning Web Components without modification.
            No Locker Service violations. No CSP issues.
          </p>

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

      {/* Resources */}
      <section className="py-20 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-mono text-slate-600 uppercase tracking-wider mb-8">Resources</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/core/docs"
              className="group p-5 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors"
            >
              <span className="text-white group-hover:text-violet-400 transition-colors">Core Documentation</span>
              <span className="text-slate-600 ml-2">→</span>
            </Link>
            <Link
              href="/core/api"
              className="group p-5 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors"
            >
              <span className="text-white group-hover:text-violet-400 transition-colors">API Reference</span>
              <span className="text-slate-600 ml-2">→</span>
            </Link>
            <Link
              href="/interface"
              className="group p-5 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors"
            >
              <span className="text-white group-hover:text-cyan-400 transition-colors">Interface Components</span>
              <span className="text-slate-600 ml-2">→</span>
            </Link>
            <a
              href="https://github.com/forcecalendar/core"
              className="group p-5 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors"
            >
              <span className="text-white group-hover:text-slate-300 transition-colors">GitHub</span>
              <span className="text-slate-600 ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="text-xl">
              <em
                className="font-light italic"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                force
              </em>
              <strong className="font-bold text-white">Calendar</strong>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <span>MIT License</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
