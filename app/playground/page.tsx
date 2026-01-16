"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  color: string;
  duration: number;
  category: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "info";
}

// Generate initial events based on current date
const getInitialEvents = (): CalendarEvent[] => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return [
    { id: 1, title: "Product Launch", date: new Date(year, month, 15, 14), color: "teal", duration: 120, category: "launch" },
    { id: 2, title: "Team Standup", date: new Date(year, month, 10, 9), color: "blue", duration: 15, category: "meeting" },
    { id: 3, title: "Sprint Review", date: new Date(year, month, 22, 15), color: "violet", duration: 60, category: "meeting" },
    { id: 4, title: "Client Meeting", date: new Date(year, month, 8, 11), color: "amber", duration: 90, category: "client" },
    { id: 5, title: "Code Review", date: new Date(year, month, 18, 16), color: "emerald", duration: 45, category: "dev" },
  ];
};

export default function PlaygroundPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(getInitialEvents);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [locale, setLocale] = useState("en-US");
  const [weekStartsOn, setWeekStartsOn] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast notification helper
  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Escape key handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showEventModal) {
        setShowEventModal(false);
        setNewEventTitle("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showEventModal]);

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
      next.setMonth(next.getMonth() + dir);
      return next;
    });
  };

  const addEvent = () => {
    if (!selectedDate || !newEventTitle.trim()) return;
    const newEvent = {
      id: Date.now(),
      title: newEventTitle.trim(),
      date: selectedDate,
      color: "violet",
      duration: 60,
      category: "custom",
    };
    setEvents([...events, newEvent]);
    setNewEventTitle("");
    setShowEventModal(false);
    showToast(`Event "${newEvent.title}" added successfully`);
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
              <div className="flex gap-2 items-center">
                <button
                  className="px-3 py-1.5 text-xs font-medium capitalize rounded transition-colors bg-teal-500 text-black"
                >
                  month
                </button>
                <span className="text-xs text-neutral-600">Week/Day views coming soon</span>
              </div>
            </div>

            {/* Calendar Body */}
            <div className="p-4">
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
                      className={`min-h-[80px] p-2 border border-neutral-800 cursor-pointer transition-all duration-200
                        ${day ? "hover:bg-neutral-900 hover:border-neutral-600" : "opacity-30"}
                        ${isToday ? "bg-teal-500/10 border-teal-500/30" : ""}
                      `}
                    >
                      {day && (
                        <>
                          <div className={`text-sm mb-1 ${isToday ? "text-teal-400 font-bold" : "text-neutral-300"}`}>
                            {day.getDate()}
                            {isToday && <span className="ml-1 text-xs font-normal">(today)</span>}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.length === 0 && (
                              <div className="text-xs text-neutral-700 italic">Click to add</div>
                            )}
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs px-1.5 py-0.5 rounded truncate transition-transform hover:scale-[1.02] ${getEventColor(event.color)}`}
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
                  <span className="text-neutral-500 text-sm">This Month</span>
                  <span className="text-white font-medium">
                    {events.filter((e) => e.date.getMonth() === currentDate.getMonth()).length} events
                  </span>
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
              <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Generated Code</span>
                <span className="text-xs text-teal-500 font-mono">JavaScript</span>
              </div>
              <pre className="p-4 text-sm font-mono overflow-x-auto">
                <code>
                  <span className="text-violet-400">import</span>
                  <span className="text-neutral-300">{" { "}</span>
                  <span className="text-teal-400">Calendar</span>
                  <span className="text-neutral-300">{" } "}</span>
                  <span className="text-violet-400">from</span>
                  <span className="text-amber-400">{" '@forcecalendar/core'"}</span>
                  <span className="text-neutral-300">;</span>
                  {"\n\n"}
                  <span className="text-violet-400">const</span>
                  <span className="text-neutral-300"> calendar </span>
                  <span className="text-violet-400">=</span>
                  <span className="text-violet-400"> new</span>
                  <span className="text-teal-400"> Calendar</span>
                  <span className="text-neutral-300">{"({"}</span>
                  {"\n"}
                  <span className="text-neutral-300">{"  "}</span>
                  <span className="text-blue-400">locale</span>
                  <span className="text-neutral-300">: </span>
                  <span className="text-amber-400">{`'${locale}'`}</span>
                  <span className="text-neutral-300">,</span>
                  {"\n"}
                  <span className="text-neutral-300">{"  "}</span>
                  <span className="text-blue-400">weekStartsOn</span>
                  <span className="text-neutral-300">: </span>
                  <span className="text-emerald-400">{weekStartsOn}</span>
                  <span className="text-neutral-300">,</span>
                  {"\n"}
                  <span className="text-neutral-300">{"  "}</span>
                  <span className="text-blue-400">view</span>
                  <span className="text-neutral-300">: </span>
                  <span className="text-amber-400">{`'month'`}</span>
                  {"\n"}
                  <span className="text-neutral-300">{"});"}</span>
                  {"\n\n"}
                  <span className="text-neutral-500">{"// Add events dynamically"}</span>
                  {"\n"}
                  <span className="text-neutral-300">calendar.</span>
                  <span className="text-teal-400">addEvent</span>
                  <span className="text-neutral-300">{"({"}</span>
                  {"\n"}
                  <span className="text-neutral-300">{"  "}</span>
                  <span className="text-blue-400">title</span>
                  <span className="text-neutral-300">: </span>
                  <span className="text-amber-400">{`'Team Meeting'`}</span>
                  <span className="text-neutral-300">,</span>
                  {"\n"}
                  <span className="text-neutral-300">{"  "}</span>
                  <span className="text-blue-400">start</span>
                  <span className="text-neutral-300">: </span>
                  <span className="text-violet-400">new</span>
                  <span className="text-teal-400"> Date</span>
                  <span className="text-neutral-300">(),</span>
                  {"\n"}
                  <span className="text-neutral-300">{"  "}</span>
                  <span className="text-blue-400">duration</span>
                  <span className="text-neutral-300">: </span>
                  <span className="text-emerald-400">60</span>
                  {"\n"}
                  <span className="text-neutral-300">{"});"}</span>
                </code>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">
                Add Event - {selectedDate?.toLocaleDateString(locale)}
              </h3>
              <span className="text-xs text-neutral-600">Press ESC to close</span>
            </div>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newEventTitle.trim()) {
                  addEvent();
                }
              }}
              placeholder="Event title..."
              className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 mb-4 focus:border-teal-500 focus:outline-none transition-colors"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={addEvent}
                disabled={!newEventTitle.trim()}
                className="flex-1 px-4 py-2 bg-teal-500 text-black font-medium rounded hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg animate-fade-in flex items-center gap-2 ${
              toast.type === "success"
                ? "bg-teal-500/20 border border-teal-500/30 text-teal-400"
                : "bg-blue-500/20 border border-blue-500/30 text-blue-400"
            }`}
          >
            {toast.type === "success" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
