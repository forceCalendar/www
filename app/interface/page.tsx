"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function InterfacePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFramework, setActiveFramework] = useState<'react' | 'vue' | 'angular' | 'lwc'>('react');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Technical Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container-custom">
          <div className={`max-w-5xl transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Product Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono text-blue-500 uppercase tracking-wider">Web Components UI</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
              <span className="bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">
                @forcecalendar/interface
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 max-w-3xl">
              Production-ready Web Components that work with any framework.
              Drop-in calendar UI powered by the forceCalendar core engine.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button className="group relative px-6 py-3 bg-blue-500 text-black font-mono text-sm font-medium overflow-hidden transition-all duration-300">
                <span className="relative z-10">npm i @forcecalendar/interface</span>
              </button>
              <a
                href="https://github.com/forcecalendar/interface"
                className="px-6 py-3 border border-slate-700 text-white font-mono text-sm hover:bg-slate-900 hover:border-slate-600 transition-all duration-300"
              >
                View on GitHub
              </a>
              <Link
                href="/interface/playground"
                className="px-6 py-3 border border-blue-500/30 text-blue-500 font-mono text-sm hover:bg-blue-500/10 transition-all duration-300"
              >
                Try Playground
              </Link>
              <div className="flex items-center gap-3 ml-auto text-xs font-mono text-slate-600">
                <span>v0.1.0</span>
                <span>•</span>
                <span>MIT License</span>
                <span>•</span>
                <span>28KB gzipped</span>
              </div>
            </div>

            {/* Component Preview */}
            <div className="bg-slate-950 border border-slate-800 p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-xs font-mono text-slate-600">LIVE PREVIEW</span>
              </div>

              {/* Simulated Calendar Component */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">March 2024</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs border border-slate-700 hover:bg-slate-900">Month</button>
                    <button className="px-3 py-1 text-xs border border-slate-700 hover:bg-slate-900">Week</button>
                    <button className="px-3 py-1 text-xs border border-slate-700 hover:bg-slate-900">Day</button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-px bg-slate-800 p-px">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-slate-900 p-3 text-center text-xs text-slate-500 font-mono">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => (
                    <div key={i} className="bg-slate-950 p-3 h-20 border border-slate-900 hover:bg-slate-900/50 transition-colors cursor-pointer">
                      <span className="text-xs text-slate-600">{(i % 31) + 1}</span>
                      {i === 14 && (
                        <div className="mt-1 px-1 py-0.5 bg-blue-500/20 text-blue-500 text-xs truncate">
                          Team Meeting
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-3 bg-slate-900 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500">&lt;</span>
                <span className="text-blue-400">force-calendar</span>
                <span className="text-emerald-400"> view</span>
                <span className="text-slate-300">=</span>
                <span className="text-amber-500">"month"</span>
                <span className="text-emerald-400"> locale</span>
                <span className="text-slate-300">=</span>
                <span className="text-amber-500">"en-US"</span>
                <span className="text-slate-500"> /&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Available Components</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: '<force-calendar>',
                description: 'Complete calendar with navigation, views, and event management',
                features: ['Multiple views', 'Event CRUD', 'Keyboard nav', 'Touch support']
              },
              {
                name: '<force-month-view>',
                description: 'Standalone month grid view with event rendering',
                features: ['Grid layout', 'Event dots', 'Day selection', 'Overflow handling']
              },
              {
                name: '<force-week-view>',
                description: 'Weekly timeline with hourly slots',
                features: ['Time grid', 'All-day section', 'Event stacking', 'Current time']
              },
              {
                name: '<force-day-view>',
                description: 'Daily agenda with detailed time slots',
                features: ['24-hour view', 'Event details', 'Conflict display', 'Business hours']
              },
              {
                name: '<force-event-form>',
                description: 'Event creation and editing modal',
                features: ['Validation', 'Recurrence UI', 'Attachments', 'Attendees']
              },
              {
                name: '<force-date-picker>',
                description: 'Accessible date selection component',
                features: ['Keyboard nav', 'Range selection', 'Disabled dates', 'Custom format']
              }
            ].map((component, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-6 hover:border-blue-500/50 transition-all duration-300">
                <h3 className="font-mono text-blue-400 mb-3">{component.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{component.description}</p>
                <ul className="space-y-1">
                  {component.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="text-blue-500/50">•</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Integration */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Works With Any Framework</h2>

          {/* Framework Tabs */}
          <div className="flex items-center gap-2 mb-8">
            {[
              { id: 'react', name: 'React', icon: '⚛️' },
              { id: 'vue', name: 'Vue', icon: '💚' },
              { id: 'angular', name: 'Angular', icon: '🔴' },
              { id: 'lwc', name: 'Salesforce', icon: '⚡' }
            ].map((fw) => (
              <button
                key={fw.id}
                onClick={() => setActiveFramework(fw.id as any)}
                className={`px-4 py-2 font-mono text-sm transition-all duration-300 border ${
                  activeFramework === fw.id
                    ? 'bg-blue-500/10 border-blue-500 text-blue-500'
                    : 'border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                }`}
              >
                <span className="mr-2">{fw.icon}</span>
                {fw.name}
              </button>
            ))}
          </div>

          {/* Code Examples */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Installation</h3>
              <div className="bg-slate-950 border border-slate-800 p-4 font-mono text-sm">
                <span className="text-slate-500">$</span> npm install @forcecalendar/interface
              </div>

              <h3 className="text-lg font-semibold mb-4 mt-8">Import</h3>
              <div className="bg-slate-950 border border-slate-800 p-4 font-mono text-sm overflow-x-auto">
                <code className="text-slate-300">
                  {activeFramework === 'react' && `import '@forcecalendar/interface';

// Components auto-register as custom elements`}
                  {activeFramework === 'vue' && `import '@forcecalendar/interface';

// Use in templates directly`}
                  {activeFramework === 'angular' && `import '@forcecalendar/interface';

// Add CUSTOM_ELEMENTS_SCHEMA to module`}
                  {activeFramework === 'lwc' && `// In staticresources
import FORCE_CALENDAR from '@salesforce/resourceUrl/forceCalendar';
loadScript(this, FORCE_CALENDAR);`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Usage</h3>
              <div className="bg-slate-950 border border-slate-800 overflow-hidden">
                <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">EXAMPLE</span>
                  <span className="text-xs font-mono text-blue-500">
                    {activeFramework === 'react' && 'App.jsx'}
                    {activeFramework === 'vue' && 'App.vue'}
                    {activeFramework === 'angular' && 'app.component.html'}
                    {activeFramework === 'lwc' && 'calendar.html'}
                  </span>
                </div>
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                  <code className="text-slate-300">
                    {activeFramework === 'react' && `function CalendarApp() {
  const calendarRef = useRef();

  useEffect(() => {
    const calendar = calendarRef.current;
    calendar.addEventListener('eventClick', handleEvent);
  }, []);

  return (
    <force-calendar
      ref={calendarRef}
      view="month"
      timezone="America/New_York"
      locale="en-US"
    />
  );
}`}
                    {activeFramework === 'vue' && `<template>
  <force-calendar
    :view="currentView"
    :date="selectedDate"
    @event-click="handleEventClick"
    @date-change="handleDateChange"
  />
</template>

<script setup>
const currentView = ref('month');
const selectedDate = ref(new Date());
</script>`}
                    {activeFramework === 'angular' && `<force-calendar
  [view]="calendarView"
  [date]="currentDate"
  (eventClick)="onEventClick($event)"
  (dateChange)="onDateChange($event)">
</force-calendar>

<!-- Component needs CUSTOM_ELEMENTS_SCHEMA -->`}
                    {activeFramework === 'lwc' && `<template>
  <force-calendar
    view={view}
    date={currentDate}
    locale={userLocale}
    onselect={handleSelect}>
  </force-calendar>
</template>

<!-- Works with Locker Service -->`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Built for Production</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800 p-px">
            {[
              { icon: '🎯', title: 'Web Standards', desc: 'Custom Elements v1' },
              { icon: '🔐', title: 'Shadow DOM', desc: 'Style encapsulation' },
              { icon: '♿', title: 'Accessible', desc: 'WCAG 2.1 AA compliant' },
              { icon: '🎨', title: 'Themeable', desc: 'CSS custom properties' },
              { icon: '📱', title: 'Responsive', desc: 'Mobile optimized' },
              { icon: '⚡', title: 'Fast', desc: 'Virtual scrolling' },
              { icon: '🌐', title: 'i18n Ready', desc: '40+ locales' },
              { icon: '🧪', title: 'Tested', desc: '95% coverage' }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-950 p-6 text-center group hover:bg-slate-900/50 transition-colors">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Easy Customization</h2>

            <div className="bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">CSS VARIABLES</span>
                <span className="text-xs font-mono text-blue-500">styles.css</span>
              </div>
              <pre className="p-6 text-sm font-mono overflow-x-auto">
                <code className="text-slate-300">{`force-calendar {
  /* Colors */
  --fc-primary: #3b82f6;
  --fc-background: #0f172a;
  --fc-surface: #1e293b;
  --fc-border: #334155;

  /* Typography */
  --fc-font-family: 'Inter', system-ui;
  --fc-font-size: 14px;

  /* Spacing */
  --fc-spacing: 1rem;
  --fc-radius: 0.375rem;

  /* Calendar specific */
  --fc-cell-height: 100px;
  --fc-header-height: 48px;
  --fc-event-padding: 0.25rem;
}`}</code>
              </pre>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-3">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold mb-1">Theme Presets</h3>
                <p className="text-sm text-slate-400">Light, dark, and high contrast themes included</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-3">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-semibold mb-1">Custom Renderers</h3>
                <p className="text-sm text-slate-400">Override any component's render method</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-3">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold mb-1">Tree Shakeable</h3>
                <p className="text-sm text-slate-400">Import only the components you need</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-slate-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 mb-8">
              Add a production-ready calendar to your application in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/interface/docs"
                className="px-6 py-3 bg-blue-500 text-black font-mono text-sm font-medium hover:bg-blue-400 transition-colors"
              >
                Read Documentation
              </Link>
              <Link
                href="/interface/playground"
                className="px-6 py-3 border border-slate-700 text-white font-mono text-sm hover:bg-slate-900 hover:border-slate-600 transition-all duration-300"
              >
                Try Playground
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}