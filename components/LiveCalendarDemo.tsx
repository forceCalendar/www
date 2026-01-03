"use client";

import { useState, useEffect, useRef } from "react";

export default function LiveCalendarDemo() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Initialize with some demo events
    const demoEvents = [
      {
        id: 1,
        title: 'Product Launch',
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        color: 'bg-teal-500'
      },
      {
        id: 2,
        title: 'Team Standup',
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
        color: 'bg-blue-500',
        recurring: 'daily'
      },
      {
        id: 3,
        title: 'Sprint Review',
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
        color: 'bg-purple-500'
      },
      {
        id: 4,
        title: 'Client Meeting',
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
        color: 'bg-amber-500'
      },
      {
        id: 5,
        title: 'Code Review',
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
        color: 'bg-emerald-500'
      }
    ];
    setEvents(demoEvents);
    setTimeout(() => setIsAnimated(true), 100);
  }, [currentDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setIsAnimated(false);
    setTimeout(() => {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        if (direction === 'prev') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
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
      id: events.length + 1,
      title: newEventTitle,
      date: selectedDate,
      color: 'bg-indigo-500'
    };

    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setShowEventModal(false);
    setSelectedDate(null);
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Calendar Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              Live Calendar Demo
            </h3>
            <div className="flex items-center gap-2">
              {['month', 'week', 'day'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v as any)}
                  className={`px-3 py-1 text-xs font-mono uppercase transition-all ${
                    view === v
                      ? 'bg-teal-500 text-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-slate-800 rounded transition-colors"
                aria-label="Previous month"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm font-mono text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-all"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-slate-800 rounded transition-colors"
                aria-label="Next month"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <h2 className="text-xl font-semibold text-white">
              {formatMonth(currentDate)}
            </h2>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs text-slate-500 font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
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
                    relative min-h-[80px] p-2 border border-slate-800 transition-all cursor-pointer
                    ${day ? 'hover:bg-slate-800 hover:border-slate-700' : 'bg-slate-950/50'}
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
                      <div className={`text-sm mb-1 ${isToday ? 'text-teal-500 font-bold' : 'text-slate-300'}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event, i) => (
                          <div
                            key={event.id}
                            className={`text-xs px-1 py-0.5 rounded ${event.color} bg-opacity-20 text-white truncate`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-slate-500">
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
        </div>

        {/* Features Bar */}
        <div className="bg-slate-950 p-3 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                Drag & Drop
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Recurring Events
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                Timezone Support
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

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowEventModal(false)}>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">
              Add Event - {selectedDate?.toLocaleDateString()}
            </h3>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event title..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 mb-4"
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
                className="flex-1 px-4 py-2 bg-slate-800 text-white hover:bg-slate-700 transition-colors rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Stats */}
      <div className="absolute -top-3 -right-3 bg-teal-500 text-black text-xs font-bold px-2 py-1 rounded">
        LIVE
      </div>
    </div>
  );
}