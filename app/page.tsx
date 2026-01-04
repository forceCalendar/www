"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import LiveCalendarDemo from "@/components/LiveCalendarDemo";
import PerformanceBenchmark from "@/components/PerformanceBenchmark";
import CodeSnippet from "@/components/CodeSnippet";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState<'core' | 'interface' | null>(null);
  const [showBenchmark, setShowBenchmark] = useState(false);

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

      {/* Hero Section - Premium Design */}
      <section className="relative pt-32 pb-24">
        <div className="container-custom">
          <div className={`max-w-6xl mx-auto ${isLoaded ? 'animate-appear' : 'opacity-0'}`}>

            {/* Premium Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="glass-premium px-6 py-2 rounded-full inline-flex items-center gap-3">
                <div className="w-1 h-1 animate-pulse rounded-full" style={{ backgroundColor: 'var(--violet)' }} />
                <span className="text-xs uppercase tracking-[0.2em] text-gradient-premium font-mono-custom whitespace-nowrap">
                  Open Source • Enterprise Infrastructure
                </span>
                <div className="w-1 h-1 animate-pulse rounded-full" style={{ backgroundColor: 'var(--cyan)' }} />
              </div>
            </div>

            {/* Main Title with Premium Typography */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tighter mb-6 text-center">
              <em className="font-display text-gradient-premium">force</em>
              <strong className="font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">Calendar</strong>
            </h1>

            {/* Tagline with Shimmer Effect */}
            <p className="text-xl md:text-2xl text-secondary text-center max-w-3xl mx-auto mb-12">
              Production-grade calendar infrastructure for enterprise platforms.
              <span className="block mt-2 text-gradient-premium font-medium">
                100% Open Source. Choose your integration level.
              </span>
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
              Experience the power of forceCalendar right here. Click any date to add events,
              navigate between months, and see the smooth 60fps performance.
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

      {/* Performance Showcase */}
      <section className="py-24 border-t border-slate-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider">Performance First</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Scale
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Handle thousands of events without breaking a sweat. Our advanced caching and indexing
              ensures lightning-fast performance at any scale.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <PerformanceBenchmark />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 p-6 text-center">
              <div className="text-3xl font-bold text-teal-500 mb-2">10,000+</div>
              <div className="text-sm text-slate-400">Events handled smoothly</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">60 FPS</div>
              <div className="text-sm text-slate-400">Consistent frame rate</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">&lt;15ms</div>
              <div className="text-sm text-slate-400">Average render time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-24 border-t border-slate-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold">100% Open Source</h2>
            </div>
            <p className="text-xl text-slate-400 mb-12">
              MIT Licensed. Community-driven. Enterprise-grade.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="text-3xl font-bold text-teal-500 mb-2">Transparent</div>
                <p className="text-sm text-slate-400">
                  Every line of code is open for inspection. No hidden dependencies, no vendor lock-in.
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-500 mb-2">Auditable</div>
                <p className="text-sm text-slate-400">
                  Security teams can review the entire codebase. Perfect for enterprise compliance.
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-500 mb-2">Extensible</div>
                <p className="text-sm text-slate-400">
                  Fork it. Customize it. Contribute back. The community drives innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features - Premium Cards */}
      <section className="py-24 border-t border-subtle relative">
        <div className="container-custom">
          <div className="mb-16 animate-appear">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-premium">
              Enterprise Infrastructure
            </h2>
            <p className="text-muted max-w-2xl">
              Built for scale, security, and integration with enterprise platforms.
              Every feature designed for production environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                title: 'Zero Dependencies',
                description: 'Pure JavaScript with no external dependencies. Secure by default.',
                gradient: 'from-violet to-indigo',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                number: '02',
                title: 'Salesforce Ready',
                description: 'Locker Service compatible. Lightning Web Components optimized.',
                gradient: 'from-cyan to-blue-500',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                number: '03',
                title: 'Performance First',
                description: 'LRU caching, spatial indexing. Handles thousands of events.',
                gradient: 'from-emerald to-teal-500',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              },
              {
                number: '04',
                title: 'Enterprise Features',
                description: 'Timezones, recurring events, ICS support, conflict detection.',
                gradient: 'from-rose to-orange-500',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="relative group card-premium rounded-xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative p-8">
                  <div className="absolute top-4 right-4 text-xs font-mono-custom text-dim">
                    {feature.number}
                  </div>

                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-glow-premium`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 group-hover:text-gradient-premium transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Premium Stats Bar */}
          <div className="mt-16 glass-premium rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gradient-premium mb-2">10,000+</div>
                <div className="text-sm text-muted uppercase tracking-wider">Events Handled</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient-premium mb-2">60 FPS</div>
                <div className="text-sm text-muted uppercase tracking-wider">Consistent Performance</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient-premium mb-2">&lt;15ms</div>
                <div className="text-sm text-muted uppercase tracking-wider">Render Time</div>
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

      {/* Future Roadmap */}
      <section className="py-24 border-t border-slate-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Platform Expansion
              </h2>
              <p className="text-slate-400">
                More enterprise integrations coming soon. Built on the same proven Core engine.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 border-dashed p-6 opacity-50">
                <div className="text-amber-500 mb-3 text-2xl">⚡</div>
                <h3 className="font-mono text-sm mb-2 text-slate-400">@forcecalendar/salesforce</h3>
                <p className="text-xs text-slate-500">Optimized for Lightning Experience</p>
                <p className="text-xs text-amber-500 mt-4">COMING SOON</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 border-dashed p-6 opacity-50">
                <div className="text-purple-500 mb-3 text-2xl">◈</div>
                <h3 className="font-mono text-sm mb-2 text-slate-400">@forcecalendar/teams</h3>
                <p className="text-xs text-slate-500">Microsoft Teams integration</p>
                <p className="text-xs text-purple-500 mt-4">PLANNED</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 border-dashed p-6 opacity-50">
                <div className="text-cyan-500 mb-3 text-2xl">◉</div>
                <h3 className="font-mono text-sm mb-2 text-slate-400">@forcecalendar/mobile</h3>
                <p className="text-xs text-slate-500">React Native components</p>
                <p className="text-xs text-cyan-500 mt-4">PLANNED</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <span className="font-bold text-lg">forceCalendar</span>
              <span className="text-xs text-slate-600 font-mono">MIT LICENSE</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="https://github.com/forcecalendar" className="text-slate-400 hover:text-white transition-colors text-sm">
                GitHub
              </a>
              <a href="https://www.npmjs.com/org/forcecalendar" className="text-slate-400 hover:text-white transition-colors text-sm">
                npm
              </a>
              <Link href="/core/docs" className="text-slate-400 hover:text-white transition-colors text-sm">
                Documentation
              </Link>
            </div>
          </div>

          {/* Australian Reference - Minimal */}
          <div className="mt-8 pt-8 border-t border-slate-900">
            <div className="flex items-center justify-center gap-3 text-xs text-slate-600 font-mono">
              <span>Engineered in Sydney</span>
              <span className="text-slate-700">•</span>
              <span>AEDT UTC+11</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}