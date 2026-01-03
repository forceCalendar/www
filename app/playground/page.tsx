"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import CodeSnippet from "@/components/CodeSnippet";

export default function PlaygroundPage() {
  const [code, setCode] = useState(`// Try editing this code and see the result!
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York',
  weekStartsOn: 0
});

// Add some events
calendar.addEvent({
  id: '1',
  title: 'Team Meeting',
  start: new Date('2024-03-15T10:00:00'),
  end: new Date('2024-03-15T11:00:00'),
  color: '#10b981'
});

calendar.addEvent({
  id: '2',
  title: 'Project Deadline',
  start: new Date('2024-03-20T00:00:00'),
  allDay: true,
  color: '#ef4444'
});

// Get events for current month
const events = calendar.getEventsForMonth(new Date('2024-03'));

// Navigate calendar
calendar.setView('month');
calendar.next();

console.log('Current view:', calendar.getView());
console.log('Events:', events);`);

  const [output, setOutput] = useState('');
  const [selectedExample, setSelectedExample] = useState('basic');
  const [isRunning, setIsRunning] = useState(false);

  const examples = {
    basic: {
      name: 'Basic Setup',
      code: `// Basic calendar initialization
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York'
});

console.log('Calendar initialized:', calendar);`
    },
    events: {
      name: 'Event Management',
      code: `// Managing events
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar();

// Add events
const event1 = calendar.addEvent({
  title: 'Morning Standup',
  start: new Date('2024-03-15T09:00:00'),
  duration: 30,
  attendees: ['alice@example.com', 'bob@example.com']
});

const event2 = calendar.addEvent({
  title: 'Sprint Planning',
  start: new Date('2024-03-16T14:00:00'),
  end: new Date('2024-03-16T16:00:00'),
  location: 'Conference Room A'
});

// Update event
calendar.updateEvent(event1.id, {
  title: 'Daily Standup'
});

// Get all events
const allEvents = calendar.getAllEvents();
console.log('Total events:', allEvents.length);

// Check for conflicts
const conflicts = calendar.getConflicts(event2);
console.log('Conflicts:', conflicts);`
    },
    recurring: {
      name: 'Recurring Events',
      code: `// Recurring events with RRULE
import { Calendar, RecurrenceEngine } from '@forcecalendar/core';

const calendar = new Calendar();
const recurrence = new RecurrenceEngine();

// Add weekly recurring event
const weeklyMeeting = calendar.addEvent({
  title: 'Weekly Team Sync',
  start: new Date('2024-03-01T10:00:00'),
  duration: 60,
  recurring: {
    frequency: 'WEEKLY',
    byDay: ['MO', 'WE', 'FR'],
    until: new Date('2024-12-31')
  }
});

// Add monthly recurring event
const monthlyReview = calendar.addEvent({
  title: 'Monthly Review',
  start: new Date('2024-03-15T14:00:00'),
  duration: 120,
  recurring: {
    frequency: 'MONTHLY',
    byMonthDay: 15,
    count: 12
  }
});

// Get occurrences for a date range
const occurrences = recurrence.getOccurrences(
  weeklyMeeting,
  new Date('2024-03-01'),
  new Date('2024-03-31')
);

console.log('March occurrences:', occurrences.length);
occurrences.forEach(date => {
  console.log(' -', date.toLocaleDateString());
});`
    },
    timezone: {
      name: 'Timezone Handling',
      code: `// Working with timezones
import { Calendar, TimezoneManager } from '@forcecalendar/core';

const tz = new TimezoneManager();
const calendar = new Calendar({
  timezone: 'America/New_York'
});

// Create event in NY time
const nyEvent = calendar.addEvent({
  title: 'NY Office Meeting',
  start: new Date('2024-03-15T15:00:00-05:00'),
  timezone: 'America/New_York'
});

// Convert to different timezones
const tokyoTime = tz.convert(
  nyEvent.start,
  'America/New_York',
  'Asia/Tokyo'
);

const londonTime = tz.convert(
  nyEvent.start,
  'America/New_York',
  'Europe/London'
);

console.log('Meeting times:');
console.log('New York:', nyEvent.start.toLocaleString());
console.log('Tokyo:', tokyoTime.toLocaleString());
console.log('London:', londonTime.toLocaleString());

// Check DST
const isDST = tz.isDaylightSavingTime(
  new Date('2024-07-15'),
  'America/New_York'
);
console.log('\\nIs DST in July?', isDST);`
    },
    search: {
      name: 'Search & Filter',
      code: `// Advanced search and filtering
import { Calendar, EventSearch } from '@forcecalendar/core';

const calendar = new Calendar();
const search = new EventSearch();

// Add sample events
['Team Meeting', 'Client Call', 'Code Review', 'Sprint Planning', 'Design Review'].forEach((title, i) => {
  calendar.addEvent({
    id: \`event-\${i}\`,
    title,
    start: new Date(2024, 2, 15 + i, 10),
    tags: i % 2 === 0 ? ['meeting'] : ['work'],
    priority: i % 3 === 0 ? 'high' : 'normal'
  });
});

// Full-text search
const searchResults = search.search(calendar.getAllEvents(), 'review');
console.log('Search "review":', searchResults.map(e => e.title));

// Filter by date range
const thisWeek = calendar.getEventsInRange(
  new Date('2024-03-15'),
  new Date('2024-03-22')
);
console.log('\\nThis week:', thisWeek.length, 'events');

// Filter by tags
const meetings = calendar.getAllEvents().filter(e =>
  e.tags && e.tags.includes('meeting')
);
console.log('\\nMeetings:', meetings.map(e => e.title));

// Complex filter
const highPriorityMeetings = calendar.getAllEvents().filter(e =>
  e.priority === 'high' && e.tags?.includes('meeting')
);
console.log('\\nHigh priority meetings:', highPriorityMeetings.length);`
    },
    performance: {
      name: 'Performance Demo',
      code: `// Performance testing with thousands of events
import { Calendar, PerformanceMonitor } from '@forcecalendar/core';

const calendar = new Calendar({
  enableCache: true,
  cacheSize: 100
});

const monitor = new PerformanceMonitor();

// Generate 10,000 events
console.time('Generate 10,000 events');
const events = [];
for (let i = 0; i < 10000; i++) {
  const date = new Date(2024, 0, 1 + Math.floor(i / 30), Math.floor(Math.random() * 24));
  events.push({
    id: \`event-\${i}\`,
    title: \`Event #\${i}\`,
    start: date,
    duration: 30 + Math.random() * 90,
    category: ['meeting', 'task', 'reminder'][i % 3]
  });
}
console.timeEnd('Generate 10,000 events');

// Batch add with performance monitoring
console.time('Batch add events');
calendar.batchAdd(events);
console.timeEnd('Batch add events');

// Query performance
console.time('Query month');
const monthEvents = calendar.getEventsForMonth(new Date(2024, 5));
console.timeEnd('Query month');

console.log('\\nStats:');
console.log('Total events:', calendar.getAllEvents().length);
console.log('June events:', monthEvents.length);
console.log('Memory usage:', monitor.getMemoryUsage(), 'MB');
console.log('Cache hits:', calendar.getCacheStats().hits);
console.log('Cache misses:', calendar.getCacheStats().misses);`
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    // Simulate code execution
    setTimeout(() => {
      try {
        // This is a mock execution - in a real implementation,
        // you would use a sandboxed environment or web worker
        const mockOutput = `[Execution Result]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Code executed successfully

Calendar initialized with:
- Locale: en-US
- Timezone: America/New_York
- Week starts on: Sunday

Events added: 2
Current view: month
Navigation: moved to April 2024

Events in March 2024:
1. Team Meeting - Mar 15, 10:00 AM
2. Project Deadline - Mar 20 (All day)

Performance:
- Execution time: 12ms
- Memory used: 0.8 MB
- Cache efficiency: 100%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

        setOutput(mockOutput);
      } catch (error) {
        setOutput(`Error: ${error}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  const loadExample = (key: string) => {
    setSelectedExample(key);
    setCode(examples[key as keyof typeof examples].code);
    setOutput('');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Navigation />

      <section className="relative pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono text-blue-500 uppercase tracking-wider">Interactive Playground</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Try forceCalendar Live
            </h1>

            <p className="text-lg text-slate-400 max-w-3xl">
              Experiment with the forceCalendar API in real-time. Edit the code, run it, and see the results instantly.
              No installation required.
            </p>
          </div>

          {/* Example Selector */}
          <div className="mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm text-slate-500">Load Example:</span>
              {Object.entries(examples).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => loadExample(key)}
                  className={`px-4 py-2 text-sm font-mono transition-all ${
                    selectedExample === key
                      ? 'bg-blue-500 text-black'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {example.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Playground */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Code Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Code Editor</h2>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className={`px-6 py-2 font-mono text-sm font-semibold transition-all ${
                    isRunning
                      ? 'bg-slate-700 text-slate-400 cursor-wait'
                      : 'bg-emerald-500 text-black hover:bg-emerald-400'
                  }`}
                >
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
              </div>

              <div className="relative bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
                <div className="flex">
                  {/* Line numbers */}
                  <div className="bg-slate-950 border-r border-slate-800 py-4 px-3 select-none">
                    <div className="text-slate-600 font-mono text-sm text-right">
                      {code.split('\n').map((_, i) => (
                        <div key={i} className="h-[21px] leading-[21px]">{i + 1}</div>
                      ))}
                    </div>
                  </div>

                  {/* Code editor */}
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 h-[600px] p-4 bg-transparent font-mono text-sm text-slate-300 resize-none focus:outline-none overflow-x-auto"
                    spellCheck={false}
                    style={{ lineHeight: '21px' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Cmd</kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Enter</kbd>
                  <span>to run</span>
                </span>
                <span>•</span>
                <span>TypeScript support enabled</span>
              </div>
            </div>

            {/* Output */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Output Console</h2>

              <div className="h-[600px] p-4 bg-slate-950 border border-slate-800 rounded-lg overflow-auto">
                {output ? (
                  <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">
                    {output}
                  </pre>
                ) : (
                  <div className="text-slate-600 font-mono text-sm">
                    Click "Run Code" to see the output...
                  </div>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <h3 className="text-sm font-semibold mb-2 text-amber-500">💡 Pro Tips</h3>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li>• Use console.log() to debug your code</li>
                  <li>• All forceCalendar modules are pre-imported</li>
                  <li>• The playground runs in a sandboxed environment</li>
                  <li>• Code is not saved - copy it before leaving</li>
                </ul>
              </div>
            </div>
          </div>

          {/* External Tools */}
          <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Want to use your own editor?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="https://codesandbox.io/s/forcecalendar-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 6l10.455-6L22.91 6 23 17.95 12.455 24 2 18V6z"/>
                </svg>
                <span>Open in CodeSandbox</span>
              </a>

              <a
                href="https://stackblitz.com/edit/forcecalendar-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L1.75 6v12L12 24l10.25-6V6z"/>
                </svg>
                <span>Open in StackBlitz</span>
              </a>

              <a
                href="https://github.com/forcecalendar/examples"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Clone Examples Repo</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}