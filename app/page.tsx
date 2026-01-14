"use client";

import { useState } from "react";
import Link from "next/link";

// ============================================================================
// CALENDAR DEMO COMPONENT
// ============================================================================

function CalendarDemo() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = [
    { id: 1, title: "Product Launch", date: new Date(2024, 2, 15), color: "#14b8a6" },
    { id: 2, title: "Team Standup", date: new Date(2024, 2, 10), color: "#3b82f6" },
    { id: 3, title: "Sprint Review", date: new Date(2024, 2, 22), color: "#8b5cf6" },
    { id: 4, title: "Client Meeting", date: new Date(2024, 2, 8), color: "#f59e0b" },
    { id: 5, title: "Code Review", date: new Date(2024, 2, 18), color: "#10b981" },
  ];

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
        e.date.getMonth() === date.getMonth()
    );
  };

  const formatMonth = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const navigate = (dir: number) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  };

  const days = getDaysInMonth(currentDate);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg font-medium text-white">{formatMonth(currentDate)}</span>
          <button
            onClick={() => navigate(1)}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
            const isSelected = selectedDate && day &&
              selectedDate.getDate() === day.getDate() &&
              selectedDate.getMonth() === day.getMonth();

            return (
              <div
                key={i}
                onClick={() => day && setSelectedDate(day)}
                className={`
                  min-h-[80px] p-2 border-b border-r border-neutral-800 cursor-pointer
                  transition-colors
                  ${day ? "hover:bg-neutral-900" : "bg-neutral-950/50"}
                  ${isSelected ? "bg-neutral-800" : ""}
                  ${i % 7 === 6 ? "border-r-0" : ""}
                `}
              >
                {day && (
                  <>
                    <div className="text-sm text-neutral-300 mb-1">{day.getDate()}</div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="text-xs px-1.5 py-0.5 rounded truncate"
                          style={{ backgroundColor: `${event.color}20`, color: event.color }}
                        >
                          {event.title}
                        </div>
                      ))}
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
          <h2 className="text-2xl font-semibold text-white mb-10">What's included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {[
              { title: "Timezone Support", desc: "Full IANA database with DST handling." },
              { title: "Recurrence Rules", desc: "RFC 5545 RRULE with exceptions." },
              { title: "ICS Import/Export", desc: "Standards-compliant iCalendar files." },
              { title: "Spatial Indexing", desc: "O(1) lookups. 10,000+ events." },
              { title: "Conflict Detection", desc: "Automatic overlap detection." },
              { title: "TypeScript", desc: "Full type definitions included." },
            ].map((feature) => (
              <div key={feature.title}>
                <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral-500">{feature.desc}</p>
              </div>
            ))}
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
