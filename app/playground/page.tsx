"use client";

import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";

export default function PlaygroundPage() {
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);

  // Playground controls
  const [locale, setLocale] = useState('en-US');
  const [timezone, setTimezone] = useState('America/New_York');
  const [weekStartsOn, setWeekStartsOn] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('events');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Initialize demo events
  useEffect(() => {
    const demoEvents = [
      {
        id: 1,
        title: 'Product Launch',
        date: new Date(2024, 2, 15, 14, 0),
        color: 'bg-teal-500',
        duration: 120,
        category: 'launch'
      },
      {
        id: 2,
        title: 'Daily Standup',
        date: new Date(2024, 2, 10, 9, 0),
        color: 'bg-blue-500',
        duration: 15,
        recurring: 'FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR',
        category: 'meeting'
      },
      {
        id: 3,
        title: 'Sprint Review',
        date: new Date(2024, 2, 22, 15, 0),
        color: 'bg-purple-500',
        duration: 60,
        category: 'meeting'
      },
      {
        id: 4,
        title: 'Client Meeting',
        date: new Date(2024, 2, 8, 11, 0),
        color: 'bg-amber-500',
        duration: 90,
        category: 'client'
      },
      {
        id: 5,
        title: 'Code Review',
        date: new Date(2024, 2, 18, 16, 0),
        color: 'bg-emerald-500',
        duration: 45,
        category: 'development'
      },
      {
        id: 6,
        title: 'Team Lunch',
        date: new Date(2024, 2, 20, 12, 0),
        color: 'bg-pink-500',
        duration: 60,
        category: 'social'
      },
      {
        id: 7,
        title: 'All Hands Meeting',
        date: new Date(2024, 2, 28, 14, 0),
        color: 'bg-indigo-500',
        duration: 120,
        category: 'meeting'
      }
    ];
    setEvents(demoEvents);
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  // Feature demonstrations
  const featureDemos = {
    events: {
      title: 'Event Management',
      description: 'Add, edit, and remove calendar events',
      action: () => {
        const newEvent = {
          id: Date.now(),
          title: `Demo Event ${events.length + 1}`,
          date: new Date(2024, 2, Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24)),
          color: ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-cyan-500'][Math.floor(Math.random() * 4)],
          duration: 60,
          category: 'demo'
        };
        setEvents([...events, newEvent]);
      }
    },
    recurring: {
      title: 'Recurring Events',
      description: 'Create events that repeat daily, weekly, or monthly',
      action: () => {
        const recurringEvent = {
          id: Date.now(),
          title: 'Weekly Team Sync',
          date: new Date(2024, 2, 4, 10, 0), // Start from Monday
          color: 'bg-violet-500',
          duration: 30,
          recurring: 'FREQ=WEEKLY;BYDAY=MO',
          category: 'recurring'
        };
        setEvents([...events, recurringEvent]);
      }
    },
    timezones: {
      title: 'Timezone Support',
      description: 'Switch between different timezones',
      action: () => {
        const timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
        const currentIndex = timezones.indexOf(timezone);
        const nextIndex = (currentIndex + 1) % timezones.length;
        setTimezone(timezones[nextIndex]);
      }
    },
    locales: {
      title: 'Internationalization',
      description: 'Support for multiple languages and date formats',
      action: () => {
        const locales = ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN'];
        const currentIndex = locales.indexOf(locale);
        const nextIndex = (currentIndex + 1) % locales.length;
        setLocale(locales[nextIndex]);
      }
    },
    search: {
      title: 'Search & Filter',
      description: 'Find events by keyword, date, or category',
      action: () => {
        const categories = ['meeting', 'development', 'client', 'social'];
        const filtered = events.filter(e => e.category === categories[Math.floor(Math.random() * categories.length)]);
        if (filtered.length > 0) {
          alert(`Found ${filtered.length} events in category: ${filtered[0].category}`);
        }
      }
    },
    export: {
      title: 'Import/Export',
      description: 'Export to ICS, JSON, or integrate with other calendars',
      action: () => {
        const icsData = events.map(e => ({
          title: e.title,
          start: e.date.toISOString(),
          duration: e.duration
        }));
        console.log('Export data:', icsData);
        alert('Calendar data exported to console (ICS format simulation)');
      }
    }
  };

  // Calendar view helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDayOfWeek = firstDay.getDay() - weekStartsOn;
    if (startingDayOfWeek < 0) startingDayOfWeek += 7;

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + weekStartsOn;
    startOfWeek.setDate(diff);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  };

  const formatWeek = (date: Date) => {
    const weekStart = getWeekDays(date)[0];
    const weekEnd = getWeekDays(date)[6];
    return `${weekStart.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setIsAnimated(false);
    setTimeout(() => {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        } else if (view === 'day') {
          newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        }
        return newDate;
      });
      setTimeout(() => setIsAnimated(true), 50);
    }, 50);
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const addEvent = () => {
    if (!selectedDate || !newEventTitle) return;

    const newEvent = {
      id: Date.now(),
      title: newEventTitle,
      date: selectedDate,
      color: 'bg-indigo-500',
      duration: 60,
      category: 'custom'
    };

    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setShowEventModal(false);
    setSelectedDate(null);
  };

  const getHeaderTitle = () => {
    if (view === 'month') return formatMonth(currentDate);
    if (view === 'week') return formatWeek(currentDate);
    if (view === 'day') return formatDay(currentDate);
    return '';
  };

  const getWeekDayNames = () => {
    const baseNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const rotated = [];
    for (let i = 0; i < 7; i++) {
      const index = (weekStartsOn + i) % 7;
      const date = new Date(2024, 0, index);
      rotated.push(date.toLocaleDateString(locale, { weekday: 'short' }));
    }
    return rotated;
  };

  const generateCode = () => {
    return `import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: '${locale}',
  timezone: '${timezone}',
  weekStartsOn: ${weekStartsOn},
  view: '${view}'
});

// Add events
${events.slice(0, 3).map(e => `calendar.addEvent({
  id: '${e.id}',
  title: '${e.title}',
  start: new Date('${e.date.toISOString()}'),
  duration: ${e.duration || 60},
  category: '${e.category}'
});`).join('\n')}

// Navigate calendar
calendar.setView('${view}');
calendar.goToDate(new Date('${currentDate.toISOString()}'));

// Get events for display
const events = calendar.getEventsForMonth(currentDate);
console.log('Total events:', events.length);`;
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = getWeekDayNames();

    return (
      <>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className={`text-center text-xs font-medium py-2 ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-500'
            }`}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = day &&
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth() &&
              day.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={index}
                className={`
                  relative min-h-[80px] p-2 border transition-all cursor-pointer
                  ${theme === 'light'
                    ? 'border-gray-200 hover:bg-gray-50'
                    : 'border-slate-800 hover:bg-slate-800'}
                  ${day ? '' : theme === 'light' ? 'bg-gray-50' : 'bg-slate-950/50'}
                  ${isToday ? 'bg-teal-500/10 border-teal-500/30' : ''}
                  ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}
                style={{ transitionDelay: `${index * 10}ms` }}
                onClick={() => {
                  if (day) {
                    setSelectedDate(day);
                    setShowEventModal(true);
                  }
                }}
              >
                {day && (
                  <>
                    <div className={`text-sm mb-1 ${
                      isToday
                        ? 'text-teal-500 font-bold'
                        : theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-1 py-0.5 rounded ${event.color} bg-opacity-20 text-white truncate`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-slate-500'}`}>
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="overflow-auto max-h-[500px]">
        <div className={`grid grid-cols-8 gap-1 mb-2 sticky top-0 z-10 ${
          theme === 'light' ? 'bg-white' : 'bg-slate-900'
        }`}>
          <div className="text-xs font-medium py-2"></div>
          {weekDays.map((day, i) => (
            <div key={i} className={`text-center text-xs font-medium py-2 ${
              theme === 'light' ? 'text-gray-600' : 'text-slate-500'
            }`}>
              <div>{day.toLocaleDateString(locale, { weekday: 'short' })}</div>
              <div className={`text-lg ${
                day.toDateString() === new Date().toDateString()
                  ? 'text-teal-500 font-bold'
                  : theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        <div>
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
              <div className={`text-xs py-4 pr-2 text-right ${
                theme === 'light' ? 'text-gray-500' : 'text-slate-500'
              }`}>
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              {weekDays.map((day, i) => {
                const dayEvents = getEventsForDate(day);
                const hourEvents = dayEvents.filter(event => event.date.getHours() === hour);

                return (
                  <div
                    key={i}
                    className={`border min-h-[60px] p-1 cursor-pointer transition-colors ${
                      theme === 'light'
                        ? 'border-gray-200 hover:bg-gray-50'
                        : 'border-slate-800 hover:bg-slate-800'
                    }`}
                    onClick={() => {
                      setSelectedDate(new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour));
                      setShowEventModal(true);
                    }}
                  >
                    {hourEvents.map(event => (
                      <div
                        key={event.id}
                        className={`text-xs px-1 py-0.5 rounded ${event.color} bg-opacity-20 text-white truncate mb-1`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayEvents = getEventsForDate(currentDate);

    return (
      <div className="overflow-auto max-h-[500px]">
        <div className="space-y-1">
          {hours.map(hour => {
            const hourEvents = dayEvents.filter(event => event.date.getHours() === hour);

            return (
              <div key={hour} className="grid grid-cols-12 gap-2">
                <div className={`col-span-2 text-xs py-4 pr-2 text-right ${
                  theme === 'light' ? 'text-gray-500' : 'text-slate-500'
                }`}>
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                <div
                  className={`col-span-10 border min-h-[60px] p-2 cursor-pointer transition-colors ${
                    theme === 'light'
                      ? 'border-gray-200 hover:bg-gray-50'
                      : 'border-slate-800 hover:bg-slate-800'
                  }`}
                  onClick={() => {
                    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour));
                    setShowEventModal(true);
                  }}
                >
                  <div className="flex flex-wrap gap-2">
                    {hourEvents.map(event => (
                      <div
                        key={event.id}
                        className={`text-sm px-2 py-1 rounded ${event.color} bg-opacity-20 text-white`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-[#0a0a0a]'}`}>
      <Navigation />

      <section className="relative pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-teal-500 animate-pulse" />
              <span className="text-xs font-mono text-teal-500 uppercase tracking-wider">Interactive Playground</span>
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Try forceCalendar Live
            </h1>

            <p className={`text-lg max-w-3xl ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}>
              Experience the power of forceCalendar with this interactive demo. Click on dates to add events,
              switch views, change locales, and explore all the features.
            </p>
          </div>

          {/* Main Calendar Demo */}
          <div className={`rounded-lg overflow-hidden shadow-2xl mb-8 ${
            theme === 'light' ? 'bg-white border border-gray-200' : 'bg-slate-900 border border-slate-800'
          }`}>
            {/* Calendar Header */}
            <div className={`p-4 border-b ${
              theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className={`text-lg font-semibold flex items-center gap-2 ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                    Live Calendar
                  </h3>
                  <div className="flex items-center gap-2">
                    {['month', 'week', 'day'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setView(v as any)}
                        className={`px-3 py-1 text-xs font-mono uppercase transition-all ${
                          view === v
                            ? 'bg-teal-500 text-black'
                            : theme === 'light'
                              ? 'text-gray-600 hover:text-gray-900'
                              : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className={`p-2 rounded transition-colors ${
                    theme === 'light'
                      ? 'hover:bg-gray-100 text-gray-600'
                      : 'hover:bg-slate-800 text-slate-400'
                  }`}
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateDate('prev')}
                    className={`p-2 rounded transition-colors ${
                      theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-slate-800'
                    }`}
                    aria-label="Previous"
                  >
                    <svg className={`w-4 h-4 ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(2024, 2, 15))}
                    className={`px-3 py-1 text-sm font-mono rounded transition-all ${
                      theme === 'light'
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateDate('next')}
                    className={`p-2 rounded transition-colors ${
                      theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-slate-800'
                    }`}
                    aria-label="Next"
                  >
                    <svg className={`w-4 h-4 ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {getHeaderTitle()}
                </h2>
              </div>
            </div>

            {/* Calendar Body */}
            <div className="p-4">
              {view === 'month' && renderMonthView()}
              {view === 'week' && renderWeekView()}
              {view === 'day' && renderDayView()}
            </div>

            {/* Info Bar */}
            <div className={`p-3 border-t ${
              theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-slate-500'}`}>
                  <span className="font-mono">
                    {events.length} events • {locale} • {timezone}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedDate(new Date());
                    setShowEventModal(true);
                  }}
                  className="px-3 py-1 bg-teal-500 text-black text-xs font-semibold hover:bg-teal-400 transition-colors"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Configuration Panel */}
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-slate-900 border border-slate-800'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-slate-400'
                  }`}>
                    Locale
                  </label>
                  <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value)}
                    className={`w-full px-3 py-2 rounded border ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900'
                        : 'bg-slate-800 border-slate-700 text-white'
                    }`}
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
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-slate-400'
                  }`}>
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className={`w-full px-3 py-2 rounded border ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900'
                        : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  >
                    <option value="America/New_York">New York</option>
                    <option value="America/Los_Angeles">Los Angeles</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                    <option value="Australia/Sydney">Sydney</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'light' ? 'text-gray-700' : 'text-slate-400'
                  }`}>
                    Week Starts On
                  </label>
                  <select
                    value={weekStartsOn}
                    onChange={(e) => setWeekStartsOn(Number(e.target.value))}
                    className={`w-full px-3 py-2 rounded border ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900'
                        : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  >
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="6">Saturday</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Feature Demos */}
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-slate-900 border border-slate-800'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Try Features
              </h3>
              <div className="space-y-3">
                {Object.entries(featureDemos).map(([key, demo]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedFeature(key);
                      demo.action();
                    }}
                    className={`w-full text-left p-3 rounded transition-all ${
                      selectedFeature === key
                        ? 'bg-teal-500 text-black'
                        : theme === 'light'
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{demo.title}</div>
                    <div className={`text-xs mt-1 ${
                      selectedFeature === key
                        ? 'text-black/70'
                        : theme === 'light' ? 'text-gray-500' : 'text-slate-500'
                    }`}>
                      {demo.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Panel */}
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-white border border-gray-200' : 'bg-slate-900 border border-slate-800'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Calendar Stats
              </h3>
              <div className="space-y-3">
                <div className={`p-3 rounded ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-800'}`}>
                  <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {events.length}
                  </div>
                  <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-slate-500'}`}>
                    Total Events
                  </div>
                </div>
                <div className={`p-3 rounded ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-800'}`}>
                  <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {events.filter(e => e.recurring).length}
                  </div>
                  <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-slate-500'}`}>
                    Recurring Events
                  </div>
                </div>
                <div className={`p-3 rounded ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-800'}`}>
                  <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {[...new Set(events.map(e => e.category))].length}
                  </div>
                  <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-slate-500'}`}>
                    Categories
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCode(!showCode)}
                className={`w-full mt-4 px-4 py-2 rounded font-mono text-sm transition-all ${
                  showCode
                    ? 'bg-emerald-500 text-black'
                    : theme === 'light'
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {showCode ? 'Hide' : 'Show'} Code
              </button>
            </div>
          </div>

          {/* Code Preview */}
          {showCode && (
            <div className={`rounded-lg overflow-hidden mb-8 ${
              theme === 'light' ? 'bg-gray-900' : 'bg-slate-950'
            }`}>
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <h3 className="text-sm font-mono text-slate-400">Generated Code</h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateCode());
                    alert('Code copied to clipboard!');
                  }}
                  className="px-3 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                >
                  Copy Code
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-slate-300">
                  {generateCode()}
                </code>
              </pre>
            </div>
          )}

          {/* Integration Examples */}
          <div className={`p-6 rounded-lg ${
            theme === 'light' ? 'bg-white border border-gray-200' : 'bg-slate-900 border border-slate-800'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Ready to integrate?
            </h3>
            <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}>
              Install forceCalendar in your project and start building amazing calendar experiences.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-4 rounded border ${
                theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-800 border-slate-700'
              }`}>
                <h4 className={`font-mono text-sm mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  npm
                </h4>
                <code className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}>
                  npm install @forcecalendar/core
                </code>
              </div>
              <div className={`p-4 rounded border ${
                theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-800 border-slate-700'
              }`}>
                <h4 className={`font-mono text-sm mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  CDN
                </h4>
                <code className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}>
                  unpkg.com/@forcecalendar/core
                </code>
              </div>
              <div className={`p-4 rounded border ${
                theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-800 border-slate-700'
              }`}>
                <h4 className={`font-mono text-sm mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  GitHub
                </h4>
                <code className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-slate-400'}`}>
                  github.com/forcecalendar
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowEventModal(false)}>
          <div className={`p-6 rounded-lg max-w-md w-full mx-4 ${
            theme === 'light' ? 'bg-white' : 'bg-slate-900 border border-slate-800'
          }`} onClick={e => e.stopPropagation()}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Add Event - {selectedDate?.toLocaleDateString(locale)}
            </h3>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event title..."
              className={`w-full px-3 py-2 rounded border mb-4 ${
                theme === 'light'
                  ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  : 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
              }`}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={addEvent}
                className="flex-1 px-4 py-2 bg-teal-500 text-black font-medium hover:bg-teal-400 transition-colors rounded"
              >
                Add Event
              </button>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setNewEventTitle('');
                }}
                className={`flex-1 px-4 py-2 font-medium transition-colors rounded ${
                  theme === 'light'
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
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