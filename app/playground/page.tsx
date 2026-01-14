"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  color: string;
  duration: number;
  category: string;
}

export default function PlaygroundPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [locale, setLocale] = useState("en-US");
  const [weekStartsOn, setWeekStartsOn] = useState(0);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    setEvents([
      { id: 1, title: "Product Launch", date: new Date(year, month, 15, 14), color: "teal", duration: 120, category: "launch" },
      { id: 2, title: "Team Standup", date: new Date(year, month, 10, 9), color: "blue", duration: 15, category: "meeting" },
      { id: 3, title: "Sprint Review", date: new Date(year, month, 22, 15), color: "violet", duration: 60, category: "meeting" },
      { id: 4, title: "Client Meeting", date: new Date(year, month, 8, 11), color: "amber", duration: 90, category: "client" },
      { id: 5, title: "Code Review", date: new Date(year, month, 18, 16), color: "emerald", duration: 45, category: "dev" },
    ]);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let startDay = firstDay.getDay() - weekStartsOn;
    if (startDay < 0) startDay += 7;
    const days: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return days;
  };

  const getWeekDays = () => {
    const base = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return [...base.slice(weekStartsOn), ...base.slice(0, weekStartsOn)];
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
    date.toLocaleDateString(locale, { month: "long", year: "numeric" });

  const navigate = (dir: number) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      if (view === "month") next.setMonth(next.getMonth() + dir);
      else if (view === "week") next.setDate(next.getDate() + dir * 7);
      else next.setDate(next.getDate() + dir);
      return next;
    });
  };

  const addEvent = () => {
    if (!selectedDate || !newEventTitle) return;
    setEvents([
      ...events,
      {
        id: Date.now(),
        title: newEventTitle,
        date: selectedDate,
        color: "violet",
        duration: 60,
        category: "custom",
      },
    ]);
    setNewEventTitle("");
    setShowEventModal(false);
  };

  const getEventColor = (color: string) => {
    const colors: Record<string, string> = {
      teal: "bg-teal-500/20 text-teal-400",
      blue: "bg-blue-500/20 text-blue-400",
      violet: "bg-violet-500/20 text-violet-400",
      amber: "bg-amber-500/20 text-amber-400",
      emerald: "bg-emerald-500/20 text-emerald-400",
    };
    return colors[color] || colors.violet;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = getWeekDays();
  const today = new Date();

  return (
    <div className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-medium text-white">
            <span className="font-serif italic">force</span><span className="font-medium">Calendar</span>
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
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-4">
            Interactive Demo
          </div>
          <h1 className="text-4xl font-semibold text-white mb-4">Playground</h1>
          <p className="text-lg text-neutral-400">
            Try forceCalendar live. Click dates to add events, switch views, and explore.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <span className="text-lg font-medium text-white">{formatMonth(currentDate)}</span>
              </div>
              <div className="flex gap-2">
                {(["month", "week", "day"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 py-1.5 text-xs font-medium capitalize rounded transition-colors ${
                      view === v ? "bg-teal-500 text-black" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Body */}
            <div className="p-4">
              {view === "month" && (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, i) => {
                      const dayEvents = getEventsForDate(day);
                      const isToday =
                        day &&
                        day.getDate() === today.getDate() &&
                        day.getMonth() === today.getMonth() &&
                        day.getFullYear() === today.getFullYear();

                      return (
                        <div
                          key={i}
                          onClick={() => {
                            if (day) {
                              setSelectedDate(day);
                              setShowEventModal(true);
                            }
                          }}
                          className={`min-h-[80px] p-2 border border-neutral-800 cursor-pointer transition-colors
                            ${day ? "hover:bg-neutral-900" : "opacity-30"}
                            ${isToday ? "bg-teal-500/10 border-teal-500/30" : ""}
                          `}
                        >
                          {day && (
                            <>
                              <div className={`text-sm mb-1 ${isToday ? "text-teal-400 font-bold" : "text-neutral-300"}`}>
                                {day.getDate()}
                              </div>
                              <div className="space-y-1">
                                {dayEvents.slice(0, 2).map((event) => (
                                  <div
                                    key={event.id}
                                    className={`text-xs px-1.5 py-0.5 rounded truncate ${getEventColor(event.color)}`}
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
                </>
              )}

              {view === "week" && (
                <div className="text-center py-20 text-neutral-500">
                  Week view coming soon. Switch to month view.
                </div>
              )}

              {view === "day" && (
                <div className="text-center py-20 text-neutral-500">
                  Day view coming soon. Switch to month view.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-mono">
                {events.length} events • {locale}
              </span>
              <button
                onClick={() => {
                  setSelectedDate(new Date());
                  setShowEventModal(true);
                }}
                className="px-3 py-1.5 bg-teal-500 text-black text-xs font-medium rounded hover:bg-teal-400 transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
              <h3 className="text-white font-medium mb-4">Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-500 mb-2">Locale</label>
                  <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="ja-JP">Japanese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-500 mb-2">Week Starts</label>
                  <select
                    value={weekStartsOn}
                    onChange={(e) => setWeekStartsOn(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded text-white text-sm"
                  >
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                    <option value={6}>Saturday</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
              <h3 className="text-white font-medium mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-500 text-sm">Total Events</span>
                  <span className="text-white font-medium">{events.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 text-sm">Categories</span>
                  <span className="text-white font-medium">
                    {[...new Set(events.map((e) => e.category))].length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 text-sm">View</span>
                  <span className="text-white font-medium capitalize">{view}</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
              <h3 className="text-white font-medium mb-4">Code</h3>
              <button
                onClick={() => setShowCode(!showCode)}
                className={`w-full px-4 py-2 text-sm font-medium rounded transition-colors ${
                  showCode ? "bg-teal-500 text-black" : "bg-neutral-800 text-white hover:bg-neutral-700"
                }`}
              >
                {showCode ? "Hide" : "Show"} Code
              </button>
            </div>
          </div>

          {/* Code Preview */}
          {showCode && (
            <div className="mt-4 bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-neutral-800">
                <span className="text-xs text-neutral-500">Generated Code</span>
              </div>
              <pre className="p-4 text-sm font-mono text-neutral-300 overflow-x-auto">
{`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: '${locale}',
  weekStartsOn: ${weekStartsOn},
  view: '${view}'
});

calendar.addEvent({
  title: 'Team Meeting',
  start: new Date(),
  duration: 60
});`}
              </pre>
            </div>
          )}

          {/* Install */}
          <div className="mt-8 bg-neutral-950 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-white font-medium mb-4">Ready to integrate?</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-neutral-900 rounded-lg">
                <div className="text-sm font-mono text-neutral-400 mb-1">npm</div>
                <code className="text-xs text-white">npm i @forcecalendar/core</code>
              </div>
              <div className="text-center p-4 bg-neutral-900 rounded-lg">
                <div className="text-sm font-mono text-neutral-400 mb-1">CDN</div>
                <code className="text-xs text-white">unpkg.com/@forcecalendar</code>
              </div>
              <div className="text-center p-4 bg-neutral-900 rounded-lg">
                <div className="text-sm font-mono text-neutral-400 mb-1">GitHub</div>
                <code className="text-xs text-white">github.com/forcecalendar</code>
              </div>
            </div>
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
            <Link href="/interface" className="hover:text-white transition-colors">Interface</Link>
          </div>
        </div>
      </footer>

      {/* Event Modal */}
      {showEventModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowEventModal(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium text-white mb-4">
              Add Event - {selectedDate?.toLocaleDateString(locale)}
            </h3>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event title..."
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={addEvent}
                className="flex-1 px-4 py-2 bg-teal-500 text-black font-medium rounded hover:bg-teal-400 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setNewEventTitle("");
                }}
                className="flex-1 px-4 py-2 bg-neutral-800 text-white font-medium rounded hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
