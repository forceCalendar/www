"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import LiveCalendarDemo from "@/components/LiveCalendarDemo";
import CodeSnippet from "@/components/CodeSnippet";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState<'core' | 'interface' | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-darker">
      {/* Premium Gradient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="gradient-mesh absolute inset-0" />
      </div>

      {/* Premium Grid Pattern */}
      <div className="fixed inset-0 grid-premium opacity-10 pointer-events-none" />

      {/* Noise Overlay */}
      <div className="fixed inset-0 noise-overlay pointer-events-none opacity-30" />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Clear Value Proposition */}
      <section className="relative pt-32 pb-24">
        <div className="container-custom">
          <div className={`max-w-6xl mx-auto ${isLoaded ? 'animate-appear' : 'opacity-0'}`}>

            {/* Simple Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="glass-premium px-6 py-2 rounded-full inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono-custom text-slate-400">
                  Open Source • Zero Dependencies • MIT License
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tighter mb-8 text-center">
              <em className="font-light italic" style={{ fontFamily: 'Georgia, serif', background: 'linear-gradient(135deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>force</em>
              <strong className="font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">Calendar</strong>
            </h1>

            {/* Clear Value Proposition */}
            <p className="text-xl md:text-2xl text-slate-300 text-center max-w-4xl mx-auto mb-6">
              Calendar infrastructure for enterprise platforms.
            </p>
            <p className="text-base md:text-lg text-slate-500 text-center max-w-3xl mx-auto mb-12">
              Pure JavaScript. Zero dependencies. Built to work inside
              Salesforce Locker Service and strict enterprise security policies.
            </p>

            {/* Architecture Diagram with 3D Cards */}
            <div className="relative max-w-5xl mx-auto mb-16 perspective-2000">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {/* Core Box - Premium Glass Card */}
                <div
                  className={`relative group cursor-pointer transition-all duration-700 transform-3d hover-lift ${
                    activeProduct === 'core' ? 'scale-105 rotate-y--12' : ''
                  }`}
                  onMouseEnter={() => setActiveProduct('core')}
                  onMouseLeave={() => setActiveProduct(null)}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-violet via-cyan to-violet opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 rounded-2xl" />

                  <div className="relative glass-heavy rounded-xl p-8 shadow-premium overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet/10 via-transparent to-cyan/5 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet to-indigo flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <span className="text-xs font-mono-custom uppercase tracking-[0.2em]" style={{ color: 'var(--violet)' }}>Core Engine</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-gradient-premium">
                        @forcecalendar/core
                      </h3>

                      <p className="text-muted text-sm mb-6 leading-relaxed">
                        Pure JavaScript calendar logic. Zero dependencies.
                        Full control for custom implementations.
                      </p>

                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-xs text-secondary">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-violet/20 to-indigo/20 flex items-center justify-center">
                            <span className="w-2 h-2 bg-violet rounded-full" />
                          </span>
                          No DOM dependencies
                        </li>
                        <li className="flex items-center gap-3 text-xs text-secondary">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-violet/20 to-indigo/20 flex items-center justify-center">
                            <span className="w-2 h-2 bg-violet rounded-full" />
                          </span>
                          Timezone & RRULE support
                        </li>
                        <li className="flex items-center gap-3 text-xs text-secondary">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-violet/20 to-indigo/20 flex items-center justify-center">
                            <span className="w-2 h-2 bg-violet rounded-full" />
                          </span>
                          Salesforce compatible
                        </li>
                        <li className="flex items-center gap-3 text-xs text-secondary">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-violet/20 to-indigo/20 flex items-center justify-center">
                            <span className="w-2 h-2 bg-violet rounded-full" />
                          </span>
                          MIT Licensed
                        </li>
                      </ul>

                      <Link
                        href="/core"
                        className="btn-premium inline-flex items-center gap-2 text-sm"
                      >
                        EXPLORE CORE
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Interface Box - Premium Glass Card */}
                <div
                  className={`relative group cursor-pointer transition-all duration-700 transform-3d hover-lift ${
                    activeProduct === 'interface' ? 'scale-105 rotate-y-12' : ''
                  }`}
                  onMouseEnter={() => setActiveProduct('interface')}
                  onMouseLeave={() => setActiveProduct(null)}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan via-indigo to-cyan opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 rounded-2xl" />

                  <div className="relative glass-heavy rounded-xl p-8 shadow-premium overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-indigo/5 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-indigo flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        </div>
                        <span className="text-xs font-mono-custom uppercase tracking-[0.2em]" style={{ color: 'var(--cyan)' }}>UI Components</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-gradient-premium">
                        @forcecalendar/interface
                      </h3>

                      <p className="text-muted text-sm mb-6 leading-relaxed">
                        Web Components wrapping Core. Ready-to-use UI
                        for any framework or vanilla JS.
                      </p>

                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3 text-xs text-secondary">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan/20 to-indigo/20 flex items-center justify-center">
                            <span className="w-2 h-2 bg-cyan rounded-full" />
                          </span>
                          Framework agnostic
                        </li>
                        <li className="flex items-center gap-3 text-xs text-secondary">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan/20 to-indigo/20 flex items-center justify-center">
                            <span className="w-2 h-2 bg-cyan rounded-full" />
                          </span>
                          Shadow DOM encapsulation
                        </li>
                        <li className="flex items-center gap-3 text-xs text-secondary">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan/20 to-indigo/20 flex items-center justify-center">
                            <span className="w-2 h-2 bg-cyan rounded-full" />
                          </span>
                          Production ready
                        </li>
                        <li className="flex items-center gap-3 text-xs text-secondary">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan/20 to-indigo/20 flex items-center justify-center">
                            <span className="w-2 h-2 bg-cyan rounded-full" />
                          </span>
                          MIT Licensed
                        </li>
                      </ul>

                      <Link
                        href="/interface"
                        className="btn-premium inline-flex items-center gap-2 text-sm"
                      >
                        VIEW COMPONENTS
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium CTA Section */}
            <div className="text-center animate-appear-delay">
              <p className="text-xs uppercase tracking-[0.2em] text-muted mb-8 font-mono-custom">
                Quick Start • 100% Open Source
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="group relative overflow-hidden rounded-lg shadow-glow-premium">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet via-cyan to-violet bg-[length:200%_100%] animate-gradient-shift" />
                  <div className="relative glass-premium px-10 py-4 hover:scale-105 transition-transform duration-300">
                    <span className="font-mono-custom text-sm font-semibold text-white">npm install @forcecalendar/core</span>
                  </div>
                </button>

                <a
                  href="https://github.com/forcecalendar"
                  className="group relative glass-premium px-10 py-4 rounded-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 shadow-premium"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-mono-custom text-sm uppercase tracking-wider">View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="py-24 border-t border-slate-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Background</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Why This Exists
              </h2>
            </div>

            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                There are excellent calendar libraries out there. <span className="text-white">FullCalendar</span> is
                battle-tested and widely used. It works great for most projects.
              </p>

              <p>
                <span className="text-white">But enterprise platforms have different rules.</span> Salesforce&apos;s
                Locker Service blocks many common JavaScript patterns. Strict Content Security Policies
                reject inline styles and dynamic code. External dependencies trigger lengthy security reviews.
              </p>

              <p>
                Most calendar libraries were not designed for these constraints. They work fine in
                regular web apps, but break inside enterprise security sandboxes.
              </p>

              <p className="text-white text-xl">
                forceCalendar is different. It was built from scratch to work within these constraints.
                Zero dependencies. No DOM required in the core. No patterns that trigger security violations.
              </p>
            </div>

            {/* Architecture Explanation */}
            <div className="mt-16 p-8 bg-slate-900/50 border border-slate-800 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">The Architecture</h3>
              <div className="space-y-4 text-slate-400">
                <p>
                  The project is split into two packages on purpose.
                </p>
                <p>
                  <span className="text-emerald-400 font-mono">@forcecalendar/core</span> is pure calendar logic.
                  No UI, no DOM, no browser APIs. Just JavaScript that handles dates, events, timezones,
                  and recurrence rules. This can run anywhere. In a browser, in Node.js, inside Salesforce
                  Lightning Web Components, anywhere JavaScript runs.
                </p>
                <p>
                  <span className="text-blue-400 font-mono">@forcecalendar/interface</span> is a complete UI
                  built on top of Core using Web Components. Drop it into any framework and it works.
                  This is for teams who want a ready-made calendar without building UI from scratch.
                </p>
                <p>
                  This split makes it possible to build calendar experiences for different platforms.
                  Salesforce teams can use Core directly in LWC. Teams building for Microsoft Teams or
                  React Native can build their own UI on Core. Or just use Interface and ship faster.
                </p>
              </div>
            </div>

            {/* Simple Positioning */}
            <div className="mt-12 text-center">
              <p className="text-slate-500">
                This is not a replacement for FullCalendar or similar libraries.
                <br />
                It is an alternative for teams who need something that works inside enterprise security boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-24 border-t border-slate-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-teal-500 uppercase tracking-wider">Interactive Demo</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Click any date to add events, navigate between months, and see the smooth 60fps performance.
            </p>
          </div>

          <LiveCalendarDemo />

          {/* Quick Start Code */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">Get Started in Seconds</h3>
            <CodeSnippet
              code={`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York'
});

// Add your first event
calendar.addEvent({
  title: 'My First Event',
  start: new Date(),
  duration: 60
});`}
              filename="quick-start.js"
            />
            <div className="text-center mt-6">
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 text-teal-500 hover:text-teal-400 font-semibold transition-colors"
              >
                Try it in the Playground
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-24 border-t border-slate-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What&apos;s Included
              </h2>
              <p className="text-slate-400">
                Everything you need for production calendar functionality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Full Timezone Support</h3>
                    <p className="text-sm text-slate-400">IANA timezone database with DST handling. Convert between any timezones.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">RFC 5545 Recurrence</h3>
                    <p className="text-sm text-slate-400">Full RRULE support including complex patterns, exceptions, and EXDATE.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">ICS Import/Export</h3>
                    <p className="text-sm text-slate-400">Standards-compliant iCalendar file handling for interoperability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Conflict Detection</h3>
                    <p className="text-sm text-slate-400">Automatic overlap detection with customizable resolution strategies.</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Spatial Indexing</h3>
                    <p className="text-sm text-slate-400">O(1) event lookups with date-based indexing. Handles 10,000+ events.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">LRU Caching</h3>
                    <p className="text-sm text-slate-400">Smart caching for timezone calculations and recurrence expansion.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">i18n Ready</h3>
                    <p className="text-sm text-slate-400">Locale-aware date formatting with RTL support.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">TypeScript Types</h3>
                    <p className="text-sm text-slate-400">Full type definitions for excellent developer experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-24 border-t border-slate-800">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Integration
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Different teams need different levels of control.
              forceCalendar provides the right abstraction for your use case.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Core Usage */}
            <div className="bg-slate-900 border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm text-emerald-500">
                    USE CORE WHEN YOU NEED
                  </h3>
                  <span className="text-xs text-slate-600 font-mono">LOGIC ONLY</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">→</span>
                    <div>
                      <p className="text-white font-medium">Custom UI Implementation</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Building your own calendar UI with specific design requirements
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">→</span>
                    <div>
                      <p className="text-white font-medium">Existing Design System</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Integrating calendar logic into your company's design system
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">→</span>
                    <div>
                      <p className="text-white font-medium">Server-Side Processing</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Running calendar operations in Node.js or serverless functions
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 p-4 bg-slate-950 border border-slate-800 font-mono text-sm">
                  <div className="text-slate-500 mb-2"># Installation</div>
                  <div className="text-emerald-400">npm install @forcecalendar/core</div>
                </div>
              </div>
            </div>

            {/* Interface Usage */}
            <div className="bg-slate-900 border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm text-blue-500">
                    USE INTERFACE WHEN YOU NEED
                  </h3>
                  <span className="text-xs text-slate-600 font-mono">COMPLETE UI</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <div>
                      <p className="text-white font-medium">Rapid Deployment</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Production-ready calendar with minimal configuration
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <div>
                      <p className="text-white font-medium">Framework Compatibility</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Works with React, Vue, Angular, or vanilla JavaScript
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <div>
                      <p className="text-white font-medium">Standard UI Components</p>
                      <p className="text-sm text-slate-400 mt-1">
                        Pre-built views, forms, and modals with customization options
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 p-4 bg-slate-950 border border-slate-800 font-mono text-sm">
                  <div className="text-slate-500 mb-2"># Installation</div>
                  <div className="text-blue-400">npm install @forcecalendar/interface</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative glass-premium py-16" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-violet/5 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom relative">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <span className="text-xl">
                <em className="font-light italic" style={{ fontFamily: 'Georgia, serif', background: 'linear-gradient(135deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>force</em>
                <strong className="font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">Calendar</strong>
              </span>
              <span className="glass-premium px-3 py-1 rounded-full text-xs font-mono-custom uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}>
                MIT LICENSE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/forcecalendar"
                className="px-4 py-2 rounded-lg glass-premium hover:scale-105 transition-all duration-300 text-sm font-mono-custom inline-flex items-center gap-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/org/forcecalendar"
                className="px-4 py-2 rounded-lg glass-premium hover:scale-105 transition-all duration-300 text-sm font-mono-custom"
                style={{ color: 'var(--text-secondary)' }}
              >
                npm
              </a>
              <Link
                href="/core/docs"
                className="px-4 py-2 rounded-lg glass-premium hover:scale-105 transition-all duration-300 text-sm font-mono-custom"
                style={{ color: 'var(--text-secondary)' }}
              >
                Documentation
              </Link>
            </div>
          </div>

          {/* Premium Divider with Gradient */}
          <div className="relative h-px mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
          </div>

          {/* Australian Reference - Premium Style */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 glass-premium px-6 py-3 rounded-full">
              <span className="text-xs font-mono-custom uppercase tracking-wider text-gradient-premium">
                Engineered in Sydney
              </span>
              <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--cyan)' }} />
              <span className="text-xs font-mono-custom uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                AEDT UTC+11
              </span>
            </div>
          </div>

          {/* Premium Glow Effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-violet/10 via-cyan/5 to-transparent rounded-full blur-3xl pointer-events-none opacity-30" />
        </div>
      </footer>

    </div>
  );
}