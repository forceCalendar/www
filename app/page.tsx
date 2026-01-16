"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// ============================================================================
// CALENDAR DEMO COMPONENT
// ============================================================================

function CalendarDemo() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate events relative to current month
  const getEventsForCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return [
      { id: 1, title: "Product Launch", date: new Date(year, month, 15), color: "teal" },
      { id: 2, title: "Team Standup", date: new Date(year, month, 10), color: "blue" },
      { id: 3, title: "Sprint Review", date: new Date(year, month, 22), color: "violet" },
      { id: 4, title: "Client Meeting", date: new Date(year, month, 8), color: "amber" },
      { id: 5, title: "Code Review", date: new Date(year, month, 18), color: "emerald" },
    ];
  };

  const [events] = useState(getEventsForCurrentMonth);

  const getEventColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      teal: { bg: "rgba(20, 184, 166, 0.2)", text: "#14b8a6" },
      blue: { bg: "rgba(59, 130, 246, 0.2)", text: "#3b82f6" },
      violet: { bg: "rgba(139, 92, 246, 0.2)", text: "#8b5cf6" },
      amber: { bg: "rgba(245, 158, 11, 0.2)", text: "#f59e0b" },
      emerald: { bg: "rgba(16, 185, 129, 0.2)", text: "#10b981" },
    };
    return colors[color] || colors.violet;
  };

  const today = new Date();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return events.filter(
      (e) =>
        e.date.getDate() === date.getDate() &&
        e.date.getMonth() === date.getMonth() &&
        e.date.getFullYear() === date.getFullYear()
    );
  };

  const formatMonth = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const navigate = useCallback((dir: number) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-all duration-200 hover:scale-105"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-white">{formatMonth(currentDate)}</span>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-2 py-1 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
            >
              Today
            </button>
          </div>
          <button
            onClick={() => navigate(1)}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-all duration-200 hover:scale-105"
            aria-label="Next month"
          >
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
          <span className="text-xs text-neutral-500">Use arrow keys to navigate months</span>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 border-b border-neutral-800">
          {weekdays.map((day) => (
            <div key={day} className="py-3 text-center text-xs font-medium text-neutral-500">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const dayEvents = getEventsForDate(day);
            const isTodayDate = isToday(day);
            const isSelected = selectedDate && day &&
              selectedDate.getDate() === day.getDate() &&
              selectedDate.getMonth() === day.getMonth();

            return (
              <div
                key={i}
                onClick={() => day && setSelectedDate(day)}
                className={`
                  min-h-[80px] p-2 border-b border-r border-neutral-800 cursor-pointer
                  transition-all duration-200
                  ${day ? "hover:bg-neutral-900 hover:border-neutral-600" : "bg-neutral-950/50"}
                  ${isSelected ? "bg-neutral-800 ring-1 ring-violet-500/50" : ""}
                  ${isTodayDate ? "bg-teal-500/10 border-teal-500/30" : ""}
                  ${i % 7 === 6 ? "border-r-0" : ""}
                `}
              >
                {day && (
                  <>
                    <div className={`text-sm mb-1 ${isTodayDate ? "text-teal-400 font-bold" : "text-neutral-300"}`}>
                      {day.getDate()}
                      {isTodayDate && <span className="ml-1 text-xs font-normal">(today)</span>}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => {
                        const colors = getEventColorClasses(event.color);
                        return (
                          <div
                            key={event.id}
                            className="text-xs px-1.5 py-0.5 rounded truncate transition-transform hover:scale-[1.02]"
                            style={{ backgroundColor: colors.bg, color: colors.text }}
                          >
                            {event.title}
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-neutral-600">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function Home() {
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
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white">
            <span className="italic">force</span>Calendar
          </h1>
          <p className="mt-6 text-xl text-neutral-400 max-w-xl mx-auto">
            Calendar infrastructure for enterprise security.
          </p>
          <div className="mt-10">
            <code className="inline-block px-5 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 font-mono">
              npm install @forcecalendar/core
            </code>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/core"
              className="group p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-colors"
            >
              <div className="text-xs font-mono text-violet-500 uppercase tracking-wider mb-3">
                Core Engine
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">@forcecalendar/core</h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                Pure JavaScript. No DOM, no dependencies. Runs anywhere.
              </p>
              <span className="text-sm text-violet-500 group-hover:text-violet-400 transition-colors">
                Learn more →
              </span>
            </Link>

            <Link
              href="/interface"
              className="group p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-colors"
            >
              <div className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-3">
                UI Components
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">@forcecalendar/interface</h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                Web Components built on Core. Works with any framework.
              </p>
              <span className="text-sm text-cyan-500 group-hover:text-cyan-400 transition-colors">
                Learn more →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">Built for constraints</h2>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Salesforce Locker Service blocks common JavaScript patterns. Strict CSP rejects
            inline styles. External dependencies trigger security reviews.
          </p>
          <p className="text-white leading-relaxed">
            forceCalendar was designed for these environments. Zero dependencies.
            No DOM in the core. No security violations.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-white mb-3">See it work</h2>
            <p className="text-neutral-500">Click any date to select. Navigate between months.</p>
          </div>
          <CalendarDemo />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-10">What&apos;s included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Timezone Support", desc: "Full IANA database with DST handling.", icon: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z", color: "teal" },
              { title: "Recurrence Rules", desc: "RFC 5545 RRULE with exceptions.", icon: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z", color: "violet" },
              { title: "ICS Import/Export", desc: "Standards-compliant iCalendar files.", icon: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7v4h-2v-4h-2l3-3 3 3h-2z", color: "blue" },
              { title: "Spatial Indexing", desc: "O(1) lookups. 10,000+ events.", icon: "M13 3L4 14h7l-2 7 9-11h-7l2-7z", color: "amber" },
              { title: "Conflict Detection", desc: "Automatic overlap detection.", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", color: "emerald" },
              { title: "TypeScript", desc: "Full type definitions included.", icon: "M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.086.567.297.733.611.775-.507.775-.507 1.316-.852-.185-.282-.282-.394-.41-.534-.347-.391-.814-.604-1.564-.581l-.391.053c-.373.095-.722.298-.989.571-.811.829-.591 2.275.3 2.872.876.591 2.157.718 2.32 1.274.159.604-.377.799-.852.726-.399-.065-.621-.278-.854-.603l-1.369.788c.154.314.362.463.565.662.985.964 3.453.917 3.896-.649.015-.061.129-.484.036-1.13l.002.002zM9.064 15.418l.001-5.677 1.582-.001v-1.316H5.113v1.316h1.581l-.001 5.677h2.371z", color: "blue" },
            ].map((feature) => {
              const colorClasses: Record<string, string> = {
                teal: "text-teal-400 bg-teal-500/10",
                violet: "text-violet-400 bg-violet-500/10",
                blue: "text-blue-400 bg-blue-500/10",
                amber: "text-amber-400 bg-amber-500/10",
                emerald: "text-emerald-400 bg-emerald-500/10",
              };
              return (
                <div
                  key={feature.title}
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all duration-200 hover:bg-neutral-900/50"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses[feature.color]}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-neutral-500">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-600 text-sm">MIT License</span>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="https://docs.forcecalendar.org" className="hover:text-white transition-colors">
              Docs
            </a>
            <a href="https://github.com/forcecalendar" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://www.npmjs.com/org/forcecalendar" className="hover:text-white transition-colors">
              npm
            </a>
            <Link href="/playground" className="hover:text-white transition-colors">
              Playground
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
