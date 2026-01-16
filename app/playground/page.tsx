"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function PlaygroundPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<HTMLElement>(null);

  // Configuration state
  const [locale, setLocale] = useState("en-US");
  const [weekStartsOn, setWeekStartsOn] = useState("0");
  const [view, setView] = useState("month");

  // Load the web components
  useEffect(() => {
    const loadComponents = async () => {
      try {
        // Dynamically import the interface package to register web components
        await import("@forcecalendar/interface");
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to load forceCalendar components:", err);
        setError("Failed to load calendar components. Please refresh the page.");
      }
    };
    loadComponents();
  }, []);

  // Update calendar when config changes
  useEffect(() => {
    if (calendarRef.current && isLoaded) {
      const calendar = calendarRef.current as HTMLElement & {
        setView?: (v: string) => void;
        setLocale?: (l: string) => void;
        setWeekStartsOn?: (d: number) => void;
      };

      // Try to call methods if they exist
      if (calendar.setView) calendar.setView(view);
      if (calendar.setLocale) calendar.setLocale(locale);
      if (calendar.setWeekStartsOn) calendar.setWeekStartsOn(parseInt(weekStartsOn));
    }
  }, [view, locale, weekStartsOn, isLoaded]);

  return (
    <div className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-medium text-white">
            <span className="italic">force</span>Calendar
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="https://docs.forcecalendar.org"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/forcecalendar"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-teal-500 uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            Live Demo
          </div>
          <h1 className="text-3xl font-semibold text-white mb-2">Playground</h1>
          <p className="text-neutral-400">
            This is the real <code className="text-teal-400">@forcecalendar/interface</code> web component running live.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,300px] gap-6">
            {/* Calendar Container */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
              {error ? (
                <div className="p-8 text-center">
                  <div className="text-red-400 mb-4">{error}</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>
              ) : !isLoaded ? (
                <div className="p-8 text-center">
                  <div className="inline-block w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <div className="text-neutral-400">Loading calendar components...</div>
                </div>
              ) : (
                <div className="calendar-container">
                  {/* @ts-expect-error - forcecal-main is a custom element from @forcecalendar/interface */}
                  <forcecal-main
                    ref={calendarRef}
                    view={view}
                    locale={locale}
                    week-starts-on={weekStartsOn}
                  />
                </div>
              )}
            </div>

            {/* Configuration Panel */}
            <div className="space-y-4">
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                <h3 className="text-white font-medium mb-4">Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">View</label>
                    <select
                      value={view}
                      onChange={(e) => setView(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:border-teal-500 focus:outline-none"
                    >
                      <option value="month">Month</option>
                      <option value="week">Week</option>
                      <option value="day">Day</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Locale</label>
                    <select
                      value={locale}
                      onChange={(e) => setLocale(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:border-teal-500 focus:outline-none"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es-ES">Spanish</option>
                      <option value="fr-FR">French</option>
                      <option value="de-DE">German</option>
                      <option value="ja-JP">Japanese</option>
                      <option value="zh-CN">Chinese</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Week Starts On</label>
                    <select
                      value={weekStartsOn}
                      onChange={(e) => setWeekStartsOn(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:border-teal-500 focus:outline-none"
                    >
                      <option value="0">Sunday</option>
                      <option value="1">Monday</option>
                      <option value="6">Saturday</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                <h3 className="text-white font-medium mb-4">Usage</h3>
                <pre className="text-xs font-mono text-neutral-400 overflow-x-auto">
{`<script type="module">
  import '@forcecalendar/interface';
</script>

<forcecal-main
  view="${view}"
  locale="${locale}"
  week-starts-on="${weekStartsOn}"
/>`}
                </pre>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                <h3 className="text-white font-medium mb-4">Install</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">npm</div>
                    <code className="block text-xs text-teal-400 font-mono">
                      npm i @forcecalendar/interface
                    </code>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">With core engine</div>
                    <code className="block text-xs text-teal-400 font-mono">
                      npm i @forcecalendar/core
                    </code>
                  </div>
                </div>
              </div>

              <a
                href="https://docs.forcecalendar.org"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-teal-500 text-black font-medium rounded-lg hover:bg-teal-400 transition-colors"
              >
                Read Documentation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-600 text-sm">MIT License</span>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="https://docs.forcecalendar.org" className="hover:text-white transition-colors">Docs</a>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="https://github.com/forcecalendar" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Styles for the web component */}
      <style jsx global>{`
        .calendar-container {
          min-height: 500px;
        }

        forcecal-main {
          display: block;
          width: 100%;
          min-height: 500px;
          --fc-bg-primary: #0a0a0a;
          --fc-bg-secondary: #171717;
          --fc-border-color: #262626;
          --fc-text-primary: #ffffff;
          --fc-text-secondary: #a3a3a3;
          --fc-accent-color: #14b8a6;
        }
      `}</style>
    </div>
  );
}
