"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import LiveCalendarDemo from "@/components/LiveCalendarDemo";

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<"core" | "interface" | null>(null);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-center text-white">
            <span className="font-serif italic font-normal">force</span>Calendar
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 text-center mt-6 max-w-2xl mx-auto">
            Calendar infrastructure built for enterprise security.
          </p>

          <div className="flex justify-center mt-10">
            <code className="px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 font-mono">
              npm install @forcecalendar/core
            </code>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Core */}
            <Link
              href="/core"
              className={`group p-8 rounded-2xl border transition-all duration-300 ${
                activeProduct === "core"
                  ? "bg-neutral-900 border-neutral-700"
                  : "bg-neutral-950 border-neutral-900 hover:bg-neutral-900 hover:border-neutral-800"
              }`}
              onMouseEnter={() => setActiveProduct("core")}
              onMouseLeave={() => setActiveProduct(null)}
            >
              <div className="text-xs font-mono text-violet-500 uppercase tracking-wider mb-4">
                Core Engine
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                @forcecalendar/core
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Pure JavaScript calendar logic. No DOM, no dependencies.
                Runs anywhere JavaScript runs.
              </p>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li>Timezone & RRULE support</li>
                <li>ICS import/export</li>
                <li>Salesforce Locker compatible</li>
              </ul>
              <div className="mt-6 text-sm text-violet-500 group-hover:text-violet-400 transition-colors">
                Learn more →
              </div>
            </Link>

            {/* Interface */}
            <Link
              href="/interface"
              className={`group p-8 rounded-2xl border transition-all duration-300 ${
                activeProduct === "interface"
                  ? "bg-neutral-900 border-neutral-700"
                  : "bg-neutral-950 border-neutral-900 hover:bg-neutral-900 hover:border-neutral-800"
              }`}
              onMouseEnter={() => setActiveProduct("interface")}
              onMouseLeave={() => setActiveProduct(null)}
            >
              <div className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-4">
                UI Components
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                @forcecalendar/interface
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Web Components built on Core. Drop into any framework
                or use with vanilla JavaScript.
              </p>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li>Framework agnostic</li>
                <li>Shadow DOM encapsulation</li>
                <li>Production ready</li>
              </ul>
              <div className="mt-6 text-sm text-cyan-500 group-hover:text-cyan-400 transition-colors">
                Learn more →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white mb-8">
            Built for constraints
          </h2>
          <div className="space-y-6 text-neutral-400 leading-relaxed">
            <p>
              Salesforce Locker Service blocks common JavaScript patterns.
              Strict CSP policies reject inline styles and dynamic code.
              External dependencies trigger security reviews.
            </p>
            <p className="text-white">
              forceCalendar was designed from scratch for these environments.
              Zero dependencies. No DOM in the core. No security violations.
            </p>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="py-20 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white mb-4">
              See it work
            </h2>
            <p className="text-neutral-400">
              Click any date. Navigate months. 60fps rendering.
            </p>
          </div>
          <LiveCalendarDemo />
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white mb-12">
            What's included
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-medium mb-2">Timezone Support</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Full IANA timezone database with DST handling. Convert between any timezones.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Recurrence Rules</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                RFC 5545 RRULE support including complex patterns, exceptions, and EXDATE.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">ICS Import/Export</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Standards-compliant iCalendar file handling for interoperability.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Spatial Indexing</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                O(1) event lookups with date-based indexing. Handles 10,000+ events.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Conflict Detection</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Automatic overlap detection with customizable resolution strategies.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">TypeScript</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Full type definitions for excellent developer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-lg text-white">
              <span className="font-serif italic font-normal">force</span>Calendar
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <a
                href="https://github.com/forcecalendar"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/org/forcecalendar"
                className="hover:text-white transition-colors"
              >
                npm
              </a>
              <Link
                href="/playground"
                className="hover:text-white transition-colors"
              >
                Playground
              </Link>
              <span className="text-neutral-700">MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
