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
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Technical Grid Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Scan Line Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"
          style={{
            animation: 'scan 8s linear infinite'
          }} />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Enterprise Infrastructure Focus */}
      <section className="relative pt-32 pb-24">
        <div className="container-custom">
          <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

            {/* Enterprise Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent w-24" />
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-mono whitespace-nowrap">
                  Open Source • Enterprise Infrastructure
                </span>
                <div className="h-px bg-gradient-to-l from-transparent via-teal-500/50 to-transparent w-24" />
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tighter mb-6 text-center">
              <em className="font-light italic text-white" style={{ fontFamily: 'Georgia, serif' }}>force</em>
              <strong className="font-bold text-white">Calendar</strong>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-slate-400 text-center max-w-3xl mx-auto mb-12 font-light">
              Production-grade calendar infrastructure for enterprise platforms.
              <span className="block mt-2 bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent font-medium">
                100% Open Source. Choose your integration level.
              </span>
            </p>

            {/* Architecture Diagram */}
            <div className="relative max-w-5xl mx-auto mb-16">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Core Box */}
                <div
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    activeProduct === 'core' ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setActiveProduct('core')}
                  onMouseLeave={() => setActiveProduct(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-slate-900 border border-slate-800 p-8 clip-path-polygon"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
                    }}>
                    <div className="absolute top-0 right-0 w-5 h-5 bg-teal-500/20 border-l border-b border-slate-700"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                      }} />

                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-teal-500 animate-pulse" />
                      <span className="text-xs font-mono text-teal-500 uppercase tracking-wider">Core Engine</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white">
                      @forcecalendar/core
                    </h3>

                    <p className="text-slate-400 text-sm mb-6">
                      Pure JavaScript calendar logic. Zero dependencies.
                      Full control for custom implementations.
                    </p>

                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-teal-500">▪</span> No DOM dependencies
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-teal-500">▪</span> Timezone & RRULE support
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-teal-500">▪</span> Salesforce compatible
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-teal-500">▪</span> MIT Licensed
                      </li>
                    </ul>

                    <Link
                      href="/core"
                      className="inline-flex items-center gap-2 text-sm font-mono text-teal-500 hover:text-teal-400 transition-colors"
                    >
                      EXPLORE CORE <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>

                {/* Interface Box */}
                <div
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    activeProduct === 'interface' ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setActiveProduct('interface')}
                  onMouseLeave={() => setActiveProduct(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-slate-900 border border-slate-800 p-8 clip-path-polygon"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
                    }}>
                    <div className="absolute top-0 right-0 w-5 h-5 bg-indigo-500/20 border-l border-b border-slate-700"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                      }} />

                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-indigo-500 animate-pulse" />
                      <span className="text-xs font-mono text-indigo-500 uppercase tracking-wider">UI Components</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white">
                      @forcecalendar/interface
                    </h3>

                    <p className="text-slate-400 text-sm mb-6">
                      Web Components wrapping Core. Ready-to-use UI
                      for any framework or vanilla JS.
                    </p>

                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-indigo-500">▪</span> Framework agnostic
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-indigo-500">▪</span> Shadow DOM encapsulation
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-indigo-500">▪</span> Production ready
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-indigo-500">▪</span> MIT Licensed
                      </li>
                    </ul>

                    <Link
                      href="/interface"
                      className="inline-flex items-center gap-2 text-sm font-mono text-indigo-500 hover:text-indigo-400 transition-colors"
                    >
                      VIEW COMPONENTS <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-6 font-mono">
                QUICK START • 100% OPEN SOURCE
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="group relative px-8 py-4 bg-teal-500 text-black font-mono text-sm font-semibold overflow-hidden transition-all duration-300 hover:bg-teal-400">
                  <span className="relative z-10">npm install @forcecalendar/core</span>
                </button>
                <a
                  href="https://github.com/forcecalendar"
                  className="px-8 py-4 border border-slate-700 text-white font-mono text-sm hover:bg-slate-900 hover:border-slate-600 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  VIEW ON GITHUB
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

      {/* Enterprise Features Grid */}
      <section className="py-24 border-t border-slate-800">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise Infrastructure
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Built for scale, security, and integration with enterprise platforms.
              Every feature designed for production environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800">
            {[
              {
                number: '01',
                title: 'Zero Dependencies',
                description: 'Pure JavaScript with no external dependencies. Secure by default.',
                icon: '◈'
              },
              {
                number: '02',
                title: 'Salesforce Ready',
                description: 'Locker Service compatible. Lightning Web Components optimized.',
                icon: '⚡'
              },
              {
                number: '03',
                title: 'Performance First',
                description: 'LRU caching, spatial indexing. Handles thousands of events.',
                icon: '◉'
              },
              {
                number: '04',
                title: 'Enterprise Features',
                description: 'Timezones, recurring events, ICS support, conflict detection.',
                icon: '◆'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-950 p-8 relative group hover:bg-slate-900 transition-colors duration-300">
                <div className="absolute top-4 right-4 text-xs font-mono text-slate-700">
                  {feature.number}
                </div>
                <div className="text-2xl mb-4 text-teal-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
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