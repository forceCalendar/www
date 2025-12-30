"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function InterfacePlaygroundPage() {
  const [view, setView] = useState('month');
  const [locale, setLocale] = useState('en-US');
  const [timezone, setTimezone] = useState('America/New_York');
  const [weekStartsOn, setWeekStartsOn] = useState('0');
  const [theme, setTheme] = useState('dark');
  const [codeView, setCodeView] = useState(false);

  // Sample events data
  const sampleEvents = [
    {
      id: '1',
      title: 'Team Standup',
      start: '2024-01-15T09:00:00',
      end: '2024-01-15T09:30:00',
      category: 'meeting',
      color: '#2196f3'
    },
    {
      id: '2',
      title: 'Product Review',
      start: '2024-01-15T14:00:00',
      end: '2024-01-15T15:00:00',
      category: 'meeting',
      color: '#4caf50'
    },
    {
      id: '3',
      title: 'Client Call',
      start: '2024-01-16T11:00:00',
      end: '2024-01-16T12:00:00',
      category: 'call',
      color: '#ff9800'
    },
    {
      id: '4',
      title: 'Sprint Planning',
      start: '2024-01-17T10:00:00',
      end: '2024-01-17T12:00:00',
      category: 'meeting',
      color: '#9c27b0'
    },
    {
      id: '5',
      title: 'All Day Event',
      start: '2024-01-18',
      allDay: true,
      category: 'event',
      color: '#f44336'
    }
  ];

  const generateCode = () => {
    return `<force-calendar
  view="${view}"
  date="2024-01-15"
  locale="${locale}"
  timezone="${timezone}"
  week-starts-on="${weekStartsOn}"
  theme="${theme}"
  events='${JSON.stringify(sampleEvents, null, 2)}'>
</force-calendar>`;
  };

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
    'UTC'
  ];

  const locales = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'fr-FR', label: 'French' },
    { value: 'de-DE', label: 'German' },
    { value: 'it-IT', label: 'Italian' },
    { value: 'ja-JP', label: 'Japanese' },
    { value: 'zh-CN', label: 'Chinese (Simplified)' },
    { value: 'ko-KR', label: 'Korean' },
    { value: 'ar-SA', label: 'Arabic' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <Navigation />

      {/* Playground Content */}
      <section className="section pt-32">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/interface" className="hover:text-primary transition-colors">Interface</Link>
              <span>/</span>
              <span className="text-primary">Playground</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-light mb-6">
              Component <strong className="font-bold">Playground</strong>
            </h1>

            <p className="text-xl text-primary-muted mb-12">
              Interact with @forcecalendar/interface components and see the code in real-time.
            </p>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Controls Panel */}
              <div className="lg:col-span-1">
                <div className="card sticky top-24">
                  <h3 className="text-lg font-medium mb-6">Configuration</h3>

                  {/* View Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">View Type</label>
                    <select
                      value={view}
                      onChange={(e) => setView(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-surface-border bg-surface text-primary"
                    >
                      <option value="month">Month View</option>
                      <option value="week">Week View</option>
                      <option value="day">Day View</option>
                      <option value="list">List View</option>
                    </select>
                  </div>

                  {/* Locale Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Locale</label>
                    <select
                      value={locale}
                      onChange={(e) => setLocale(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-surface-border bg-surface text-primary"
                    >
                      {locales.map(loc => (
                        <option key={loc.value} value={loc.value}>{loc.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Timezone Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-surface-border bg-surface text-primary"
                    >
                      {timezones.map(tz => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>

                  {/* Week Starts On */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Week Starts On</label>
                    <select
                      value={weekStartsOn}
                      onChange={(e) => setWeekStartsOn(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-surface-border bg-surface text-primary"
                    >
                      <option value="0">Sunday</option>
                      <option value="1">Monday</option>
                      <option value="2">Tuesday</option>
                      <option value="3">Wednesday</option>
                      <option value="4">Thursday</option>
                      <option value="5">Friday</option>
                      <option value="6">Saturday</option>
                    </select>
                  </div>

                  {/* Theme Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex-1 py-2 px-3 rounded border transition-all ${
                          theme === 'light'
                            ? 'bg-white text-black border-gray-400'
                            : 'bg-surface border-surface-border text-primary-muted hover:bg-surface-hover'
                        }`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`flex-1 py-2 px-3 rounded border transition-all ${
                          theme === 'dark'
                            ? 'bg-surface-hover text-primary border-accent'
                            : 'bg-surface border-surface-border text-primary-muted hover:bg-surface-hover'
                        }`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>

                  {/* View Code Toggle */}
                  <button
                    onClick={() => setCodeView(!codeView)}
                    className="w-full btn btn-secondary text-sm"
                  >
                    {codeView ? 'Hide' : 'View'} Code
                  </button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Live Preview</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary-muted">Simulated Component</span>
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    </div>
                  </div>

                  {/* Component Preview */}
                  {!codeView ? (
                    <div className="border border-surface-border rounded p-8" style={{
                      background: theme === 'light' ? '#ffffff' : 'var(--surface)',
                      minHeight: '500px'
                    }}>
                      {/* Simulated Calendar Component */}
                      <div className="text-center">
                        <div className="mb-6">
                          <p className="text-sm text-primary-muted mb-2">
                            Component Preview ({view} view)
                          </p>
                          <p className="text-xs text-primary-muted">
                            Locale: {locale} | Timezone: {timezone}
                          </p>
                        </div>

                        {/* Simulated calendar grid for month view */}
                        {view === 'month' && (
                          <div className="max-w-2xl mx-auto">
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                <div key={i} className="text-xs font-medium py-2" style={{
                                  color: theme === 'light' ? '#666' : 'var(--text-muted)'
                                }}>
                                  {weekStartsOn === '1' && i === 0 ? 'Mon' :
                                   weekStartsOn === '1' && i === 6 ? 'Sun' :
                                   weekStartsOn === '1' ? ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i-1] :
                                   day}
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {Array.from({ length: 35 }, (_, i) => (
                                <div
                                  key={i}
                                  className="aspect-square border rounded p-1 text-xs flex flex-col"
                                  style={{
                                    borderColor: theme === 'light' ? '#e0e0e0' : 'var(--border)',
                                    background: theme === 'light' ? '#fff' : 'var(--code-bg)'
                                  }}
                                >
                                  <span style={{ color: theme === 'light' ? '#333' : 'var(--text-primary)' }}>
                                    {i < 31 ? i + 1 : ''}
                                  </span>
                                  {i === 14 && (
                                    <div className="mt-auto">
                                      <div className="w-full h-1 bg-blue-500 rounded mb-0.5"></div>
                                      <div className="w-full h-1 bg-green-500 rounded"></div>
                                    </div>
                                  )}
                                  {i === 15 && (
                                    <div className="mt-auto">
                                      <div className="w-full h-1 bg-orange-500 rounded"></div>
                                    </div>
                                  )}
                                  {i === 16 && (
                                    <div className="mt-auto">
                                      <div className="w-full h-1 bg-purple-500 rounded"></div>
                                    </div>
                                  )}
                                  {i === 17 && (
                                    <div className="mt-auto">
                                      <div className="w-full h-1 bg-red-500 rounded"></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Simulated week view */}
                        {view === 'week' && (
                          <div className="max-w-3xl mx-auto">
                            <div className="grid grid-cols-8 gap-1 text-xs">
                              <div className="font-medium py-2"></div>
                              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                <div key={i} className="font-medium py-2" style={{
                                  color: theme === 'light' ? '#666' : 'var(--text-muted)'
                                }}>
                                  {day} {15 + i}
                                </div>
                              ))}
                            </div>
                            {['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'].map((time) => (
                              <div key={time} className="grid grid-cols-8 gap-1 h-12">
                                <div className="text-xs py-1" style={{
                                  color: theme === 'light' ? '#999' : 'var(--text-dim)'
                                }}>
                                  {time}
                                </div>
                                {Array.from({ length: 7 }, (_, i) => (
                                  <div
                                    key={i}
                                    className="border-t"
                                    style={{
                                      borderColor: theme === 'light' ? '#f0f0f0' : 'var(--border)'
                                    }}
                                  >
                                    {time === '9:00' && i === 1 && (
                                      <div className="bg-blue-500 text-white text-xs p-1 rounded">Standup</div>
                                    )}
                                    {time === '2:00' && i === 1 && (
                                      <div className="bg-green-500 text-white text-xs p-1 rounded">Review</div>
                                    )}
                                    {time === '11:00' && i === 2 && (
                                      <div className="bg-orange-500 text-white text-xs p-1 rounded">Call</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Simulated day view */}
                        {view === 'day' && (
                          <div className="max-w-md mx-auto">
                            <div className="text-sm font-medium mb-4" style={{
                              color: theme === 'light' ? '#333' : 'var(--text-primary)'
                            }}>
                              Monday, January 15, 2024
                            </div>
                            {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'].map((time) => (
                              <div
                                key={time}
                                className="flex gap-4 py-3 border-t"
                                style={{
                                  borderColor: theme === 'light' ? '#f0f0f0' : 'var(--border)'
                                }}
                              >
                                <div className="text-xs w-20" style={{
                                  color: theme === 'light' ? '#999' : 'var(--text-dim)'
                                }}>
                                  {time}
                                </div>
                                <div className="flex-1">
                                  {time === '9:00 AM' && (
                                    <div className="bg-blue-500 text-white text-sm p-2 rounded">Team Standup</div>
                                  )}
                                  {time === '2:00 PM' && (
                                    <div className="bg-green-500 text-white text-sm p-2 rounded">Product Review</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Simulated list view */}
                        {view === 'list' && (
                          <div className="max-w-2xl mx-auto text-left">
                            {sampleEvents.map((event) => (
                              <div
                                key={event.id}
                                className="flex items-center gap-4 p-3 border-b"
                                style={{
                                  borderColor: theme === 'light' ? '#f0f0f0' : 'var(--border)'
                                }}
                              >
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: event.color }}
                                ></div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm" style={{
                                    color: theme === 'light' ? '#333' : 'var(--text-primary)'
                                  }}>
                                    {event.title}
                                  </div>
                                  <div className="text-xs" style={{
                                    color: theme === 'light' ? '#666' : 'var(--text-muted)'
                                  }}>
                                    {new Date(event.start).toLocaleString(locale, {
                                      timeZone: timezone,
                                      dateStyle: 'medium',
                                      timeStyle: 'short'
                                    })}
                                  </div>
                                </div>
                                <div className="text-xs px-2 py-1 rounded" style={{
                                  background: theme === 'light' ? '#f5f5f5' : 'var(--surface)',
                                  color: theme === 'light' ? '#666' : 'var(--text-muted)'
                                }}>
                                  {event.category}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-8 text-center">
                        <p className="text-xs text-primary-muted">
                          Note: This is a simulated preview. Install @forcecalendar/interface to use the actual component.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="code-block">
                        <div className="code-header flex justify-between items-center">
                          <span className="text-xs text-primary-dim">HTML</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(generateCode())}
                            className="text-xs text-primary-muted hover:text-primary transition-colors"
                          >
                            Copy Code
                          </button>
                        </div>
                        <pre className="p-4 text-sm overflow-x-auto"><code>{generateCode()}</code></pre>
                      </div>

                      <div className="mt-4 p-4 bg-surface-hover rounded">
                        <h4 className="text-sm font-medium mb-2">Installation</h4>
                        <div className="code-block">
                          <pre className="p-3 text-xs"><code>{`npm install @forcecalendar/interface`}</code></pre>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-surface-hover rounded">
                        <h4 className="text-sm font-medium mb-2">JavaScript Integration</h4>
                        <div className="code-block">
                          <pre className="p-3 text-xs overflow-x-auto"><code>{`import '@forcecalendar/interface';

const calendar = document.querySelector('force-calendar');

// Listen for events
calendar.addEventListener('eventclick', (e) => {
  console.log('Event clicked:', e.detail.event);
});

// Add new event
calendar.addEvent({
  title: 'New Event',
  start: new Date().toISOString(),
  duration: 60
});`}</code></pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Features Info */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="card text-center">
                    <div className="text-2xl mb-2">🎨</div>
                    <h4 className="font-medium mb-1">Customizable</h4>
                    <p className="text-xs text-primary-muted">
                      Full control over styling with CSS variables
                    </p>
                  </div>
                  <div className="card text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <h4 className="font-medium mb-1">Performant</h4>
                    <p className="text-xs text-primary-muted">
                      Optimized rendering with virtual scrolling
                    </p>
                  </div>
                  <div className="card text-center">
                    <div className="text-2xl mb-2">🔧</div>
                    <h4 className="font-medium mb-1">Framework Agnostic</h4>
                    <p className="text-xs text-primary-muted">
                      Works with any framework or vanilla JS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}