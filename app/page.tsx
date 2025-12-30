"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Marketing Focus */}
      <section className="section pt-32 pb-20 relative">
        <div className="container-custom">
          <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8">
              <span className="font-extralight">force</span>
              <span className="font-semibold">Calendar</span>
            </h1>

            {/* Tagline */}
            <div className="inline-block px-8 py-3 mb-8" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              <p className="text-sm uppercase tracking-widest text-muted">
                Enterprise Calendar Components
              </p>
            </div>

            {/* Value Proposition */}
            <p className="text-2xl text-accent max-w-3xl mx-auto mb-12 leading-relaxed">
              A complete calendar solution for enterprise applications.
              Pure JavaScript engine. Framework-agnostic components.
              Built for Salesforce and modern platforms.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/core"
                className="btn btn-primary"
              >
                Explore Core Engine
              </Link>
              <Link
                href="/interface"
                className="btn btn-secondary"
              >
                View Components
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="section relative">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Two Products. One Vision.</h2>
            <p className="text-xl text-muted">Completely separated concerns for maximum flexibility.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Core Package */}
            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="card card-hover group">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-medium mb-2">@forcecalendar/core</h3>
                    <p className="text-muted">Pure JavaScript Engine</p>
                  </div>
                  <div className="badge badge-version">v0.3.0</div>
                </div>

                <p className="text-accent mb-6">
                  The calendar logic without any UI. Zero DOM dependencies.
                  Works in any JavaScript environment.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-sm">Timezone support with IANA database</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-sm">Recurring events (RRule)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-sm">ICS import/export</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-sm">Salesforce Locker Service compatible</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href="/core" className="btn btn-primary text-sm">
                    Documentation
                  </Link>
                  <a href="https://www.npmjs.com/package/@forcecalendar/core"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="btn btn-ghost text-sm">
                    npm
                  </a>
                </div>
              </div>
            </div>

            {/* Interface Package */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="card card-hover group">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-medium mb-2">@forcecalendar/interface</h3>
                    <p className="text-muted">Web Components UI</p>
                  </div>
                  <div className="badge badge-version">v0.1.0</div>
                </div>

                <p className="text-accent mb-6">
                  Framework-agnostic Web Components that wrap the core engine.
                  Works with React, Vue, Angular, or vanilla JavaScript.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-sm">Web Components standard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-sm">Month, Week, and Day views</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-sm">Event forms and modals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-sm">Lightning Web Components ready</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href="/interface" className="btn btn-primary text-sm">
                    Documentation
                  </Link>
                  <a href="https://www.npmjs.com/package/@forcecalendar/interface"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="btn btn-ghost text-sm">
                    npm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Built for Enterprise</h2>
            <p className="text-xl text-muted mb-16">
              Designed from the ground up for Salesforce and modern platforms.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded mx-auto mb-4 flex items-center justify-center"
                     style={{ background: 'var(--dark)', border: '1px solid var(--border)' }}>
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Zero Dependencies</h3>
                <p className="text-sm text-muted">
                  Pure JavaScript with no external dependencies. Works everywhere.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded mx-auto mb-4 flex items-center justify-center"
                     style={{ background: 'var(--dark)', border: '1px solid var(--border)' }}>
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Salesforce Ready</h3>
                <p className="text-sm text-muted">
                  Full Locker Service and Lightning Web Components compatibility.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded mx-auto mb-4 flex items-center justify-center"
                     style={{ background: 'var(--dark)', border: '1px solid var(--border)' }}>
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">International</h3>
                <p className="text-sm text-muted">
                  Full timezone support, localization, and RTL ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm">
                <em className="font-light italic" style={{ fontFamily: 'Georgia, serif' }}>force</em>
                <strong className="font-semibold">Calendar</strong>
              </span>
              <span className="text-muted text-xs">MIT LICENSE</span>
            </div>

            <div className="flex items-center space-x-6 text-xs uppercase tracking-wider">
              <a href="https://github.com/forcecalendar" className="text-muted hover:text-primary transition-colors">GitHub</a>
              <a href="https://www.npmjs.com/package/@forcecalendar/core" className="text-muted hover:text-primary transition-colors">npm</a>
              <Link href="/docs" className="text-muted hover:text-primary transition-colors">Documentation</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}