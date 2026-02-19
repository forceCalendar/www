"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function InterfacePage() {
  const [activeFramework, setActiveFramework] = useState<"react" | "vue" | "angular" | "lwc">("react");
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("month");
  const [isLoaded, setIsLoaded] = useState(false);
  const calendarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import("@forcecalendar/interface").then(() => setIsLoaded(true)).catch(() => {});
  }, []);

  useEffect(() => {
    if (calendarRef.current && isLoaded) {
      calendarRef.current.setAttribute("view", calendarView);
    }
  }, [calendarView, isLoaded]);

  const codeExamples = {
    react: `import '@forcecalendar/interface';

function App() {
  return (
    <force-calendar
      view="month"
      locale="en-US"
      timezone="America/New_York"
    />
  );
}`,
    vue: `<template>
  <force-calendar
    :view="currentView"
    :date="selectedDate"
    @event-click="handleEvent"
  />
</template>`,
    angular: `<force-calendar
  [view]="calendarView"
  [date]="currentDate"
  (eventClick)="onEventClick($event)">
</force-calendar>`,
    lwc: `<template>
  <force-calendar
    view={view}
    date={currentDate}
    onselect={handleSelect}>
  </force-calendar>
</template>`
  };

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
            <Link href="/playground" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Playground
            </Link>
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
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-4">
            UI Components
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            @forcecalendar/interface
          </h1>
          <p className="text-xl text-neutral-400 mb-8">
            Production-ready Web Components that work with any framework.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <code className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 font-mono">
              npm install @forcecalendar/interface
            </code>
            <Link
              href="/playground"
              className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
            >
              Try Playground →
            </Link>
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="py-12 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
            {/* Preview Header */}
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Live Preview</span>
              <div className="flex gap-2">
                {(["month", "week", "day"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setCalendarView(v)}
                    className={`px-3 py-1 text-xs capitalize transition-colors rounded ${
                      calendarView === v
                        ? "bg-cyan-500 text-black"
                        : "text-neutral-500 hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Real Calendar Component */}
            <div className="p-2" style={{ minHeight: 420 }}>
              {!isLoaded ? (
                <div className="flex items-center justify-center h-96">
                  <div className="inline-block w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                // @ts-expect-error - forcecal-main is a custom element from @forcecalendar/interface
                <forcecal-main
                  ref={calendarRef}
                  view={calendarView}
                  locale="en-US"
                  style={{ display: "block", width: "100%", minHeight: 400 }}
                />
              )}
            </div>

            {/* Component Tag */}
            <div className="px-4 py-3 border-t border-neutral-800 bg-neutral-900/50">
              <code className="text-xs text-neutral-400 font-mono">
                &lt;force-calendar view=&quot;{calendarView}&quot; locale=&quot;en-US&quot; /&gt;
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-8">Components</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "<force-calendar>", desc: "Complete calendar with all views" },
              { name: "<force-month-view>", desc: "Standalone month grid" },
              { name: "<force-week-view>", desc: "Weekly timeline with hours" },
              { name: "<force-day-view>", desc: "Daily agenda view" },
              { name: "<force-event-form>", desc: "Event creation modal" },
              { name: "<force-date-picker>", desc: "Date selection component" },
            ].map((comp) => (
              <div
                key={comp.name}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
              >
                <code className="text-cyan-400 text-sm font-mono">{comp.name}</code>
                <p className="text-sm text-neutral-500 mt-2">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Integration */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-8">Works with any framework</h2>

          {/* Framework Tabs */}
          <div className="flex gap-2 mb-6">
            {(["react", "vue", "angular", "lwc"] as const).map((fw) => (
              <button
                key={fw}
                onClick={() => setActiveFramework(fw)}
                className={`px-4 py-2 text-sm capitalize transition-colors rounded-lg ${
                  activeFramework === fw
                    ? "bg-cyan-500/20 text-cyan-500 border border-cyan-500/30"
                    : "text-neutral-500 hover:text-white border border-neutral-800"
                }`}
              >
                {fw === "lwc" ? "Salesforce" : fw}
              </button>
            ))}
          </div>

          {/* Code Example */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Example</span>
              <span className="text-xs font-mono text-cyan-500">
                {activeFramework === "react" && "App.jsx"}
                {activeFramework === "vue" && "App.vue"}
                {activeFramework === "angular" && "app.component.html"}
                {activeFramework === "lwc" && "calendar.html"}
              </span>
            </div>
            <pre className="p-4 text-sm font-mono text-neutral-300 overflow-x-auto">
              <code>{codeExamples[activeFramework]}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-10">Built for production</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: "Web Standards", desc: "Custom Elements v1" },
              { title: "Shadow DOM", desc: "Style encapsulation" },
              { title: "Accessible", desc: "WCAG 2.1 AA" },
              { title: "Themeable", desc: "CSS custom properties" },
              { title: "Responsive", desc: "Mobile optimized" },
              { title: "Fast", desc: "Virtual scrolling" },
              { title: "i18n Ready", desc: "40+ locales" },
              { title: "Tested", desc: "95% coverage" },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-4">
                <h3 className="text-white font-medium text-sm">{feature.title}</h3>
                <p className="text-xs text-neutral-500 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theming */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">Easy theming</h2>
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-800">
              <span className="text-xs text-neutral-500">CSS Custom Properties</span>
            </div>
            <pre className="p-4 text-sm font-mono text-neutral-300 overflow-x-auto">
{`force-calendar {
  --fc-primary: #3b82f6;
  --fc-background: #0f172a;
  --fc-border: #334155;
  --fc-font-family: 'Inter', system-ui;
  --fc-border-radius: 0.375rem;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Get started</h2>
          <p className="text-neutral-400 mb-8">
            Add a production-ready calendar to your application in minutes.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/playground"
              className="px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-500 transition-colors"
            >
              Try Playground
            </Link>
            <a
              href="https://github.com/forcecalendar/interface"
              className="px-5 py-2.5 border border-neutral-800 text-white text-sm font-medium rounded-lg hover:bg-neutral-900 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-600 text-sm">MIT License</span>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="https://docs.forcecalendar.org" className="hover:text-white transition-colors">Docs</a>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/core" className="hover:text-white transition-colors">Core</Link>
            <Link href="/playground" className="hover:text-white transition-colors">Playground</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
