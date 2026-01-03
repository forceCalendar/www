import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function CoreApiPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <Navigation />

      {/* API Reference Content */}
      <section className="section pt-32">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/core" className="hover:text-primary transition-colors">Core</Link>
              <span>/</span>
              <span className="text-primary">API Reference</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-light mb-6">
              API <strong className="font-bold">Reference</strong>
            </h1>

            <p className="text-xl text-slate-400 mb-12">
              Complete API documentation for @forcecalendar/core classes, methods, and utilities.
            </p>

            {/* Table of Contents */}
            <div className="card mb-12">
              <h2 className="text-lg font-medium mb-4">Quick Navigation</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="#calendar" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  • Calendar Class
                </a>
                <a href="#event-manager" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  • EventManager
                </a>
                <a href="#timezone-manager" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  • TimezoneManager
                </a>
                <a href="#recurrence-engine" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  • RecurrenceEngine
                </a>
                <a href="#view-engines" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  • View Engines
                </a>
                <a href="#utilities" className="text-sm text-slate-400 hover:text-primary transition-colors">
                  • Utilities
                </a>
              </div>
            </div>

            {/* Calendar Class */}
            <div id="calendar" className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Calendar Class</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Constructor</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`new Calendar(options?: CalendarOptions)`}</code></pre>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-400 mb-2">Creates a new Calendar instance.</p>
                  <p className="text-sm text-slate-400">
                    <strong>Parameters:</strong> options - Configuration object (optional)
                  </p>
                </div>
              </div>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Methods</h3>

                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">addEvent(event: Event): string</h4>
                    <p className="text-sm text-slate-400 mb-2">
                      Adds a new event to the calendar.
                    </p>
                    <div className="code-block">
                      <pre className="p-3 text-xs"><code>{`calendar.addEvent({
  title: 'Meeting',
  start: '2024-01-15T09:00:00',
  end: '2024-01-15T10:00:00'
});`}</code></pre>
                    </div>
                  </div>

                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">updateEvent(id: string, updates: Partial&lt;Event&gt;): void</h4>
                    <p className="text-sm text-slate-400 mb-2">
                      Updates an existing event.
                    </p>
                    <div className="code-block">
                      <pre className="p-3 text-xs"><code>{`calendar.updateEvent('event-1', {
  title: 'Updated Meeting',
  location: 'Room B'
});`}</code></pre>
                    </div>
                  </div>

                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">deleteEvent(id: string): void</h4>
                    <p className="text-sm text-slate-400 mb-2">
                      Removes an event from the calendar.
                    </p>
                    <div className="code-block">
                      <pre className="p-3 text-xs"><code>{`calendar.deleteEvent('event-1');`}</code></pre>
                    </div>
                  </div>

                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">getEvent(id: string): Event | null</h4>
                    <p className="text-sm text-slate-400 mb-2">
                      Retrieves a single event by ID.
                    </p>
                    <div className="code-block">
                      <pre className="p-3 text-xs"><code>{`const event = calendar.getEvent('event-1');`}</code></pre>
                    </div>
                  </div>

                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">getEventsForDate(date: Date): Event[]</h4>
                    <p className="text-sm text-slate-400 mb-2">
                      Returns all events for a specific date.
                    </p>
                    <div className="code-block">
                      <pre className="p-3 text-xs"><code>{`const events = calendar.getEventsForDate(new Date('2024-01-15'));`}</code></pre>
                    </div>
                  </div>

                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">getEventsForRange(start: Date, end: Date): Event[]</h4>
                    <p className="text-sm text-slate-400 mb-2">
                      Returns all events within a date range.
                    </p>
                    <div className="code-block">
                      <pre className="p-3 text-xs"><code>{`const events = calendar.getEventsForRange(
  new Date('2024-01-01'),
  new Date('2024-01-31')
);`}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">exportToICS(): string</h4>
                    <p className="text-sm text-slate-400 mb-2">
                      Exports all calendar events to iCalendar format.
                    </p>
                    <div className="code-block">
                      <pre className="p-3 text-xs"><code>{`const icsData = calendar.exportToICS();
// Save to file or send to server`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Manager */}
            <div id="event-manager" className="mb-16">
              <h2 className="text-2xl font-medium mb-6">EventManager</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Event Interface</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`interface Event {
  id?: string;
  title: string;
  start: string | Date;
  end?: string | Date;
  allDay?: boolean;
  location?: string;
  description?: string;
  category?: string;
  recurring?: string; // RRule string
  color?: string;
  attendees?: string[];
  reminders?: Reminder[];
  metadata?: Record<string, any>;
}`}</code></pre>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Event Validation</h3>
                <p className="text-sm text-slate-400 mb-3">
                  The EventManager automatically validates and normalizes events:
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Generates unique IDs if not provided</li>
                  <li>• Validates date formats and converts to ISO 8601</li>
                  <li>• Ensures end time is after start time</li>
                  <li>• Validates RRule syntax for recurring events</li>
                  <li>• Normalizes timezone information</li>
                </ul>
              </div>
            </div>

            {/* Timezone Manager */}
            <div id="timezone-manager" className="mb-16">
              <h2 className="text-2xl font-medium mb-6">TimezoneManager</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Static Methods</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-mono text-sm mb-2">convertTimezone(date: Date, from: string, to: string): Date</h4>
                    <p className="text-sm text-slate-400">
                      Converts a date between timezones.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">getTimezoneOffset(timezone: string, date?: Date): number</h4>
                    <p className="text-sm text-slate-400">
                      Returns the offset in minutes for a timezone.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">getSupportedTimezones(): string[]</h4>
                    <p className="text-sm text-slate-400">
                      Returns all IANA timezone identifiers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Example Usage</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`import { TimezoneManager } from '@forcecalendar/core/timezone';

// Convert event time to user's timezone
const userTime = TimezoneManager.convertTimezone(
  eventDate,
  'America/New_York',
  'Europe/London'
);

// Get current offset
const offset = TimezoneManager.getTimezoneOffset('America/Los_Angeles');`}</code></pre>
                </div>
              </div>
            </div>

            {/* Recurrence Engine */}
            <div id="recurrence-engine" className="mb-16">
              <h2 className="text-2xl font-medium mb-6">RecurrenceEngine</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">RRule Support</h3>
                <p className="text-sm text-slate-400 mb-3">
                  Full RFC 5545 compliant recurrence rule support:
                </p>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`// Daily recurrence
'FREQ=DAILY;COUNT=10'

// Weekly on specific days
'FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20240630'

// Monthly on the 15th
'FREQ=MONTHLY;BYMONTHDAY=15'

// Yearly on specific date
'FREQ=YEARLY;BYMONTH=1;BYMONTHDAY=1'

// Complex pattern
'FREQ=MONTHLY;BYDAY=2MO;INTERVAL=2'`}</code></pre>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Methods</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-mono text-sm mb-2">parseRRule(rrule: string): RRule</h4>
                    <p className="text-sm text-slate-400">
                      Parses an RRule string into an object.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">generateOccurrences(event: Event, range: DateRange): Date[]</h4>
                    <p className="text-sm text-slate-400">
                      Generates all occurrences of a recurring event within a range.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">validateRRule(rrule: string): boolean</h4>
                    <p className="text-sm text-slate-400">
                      Validates an RRule string syntax.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* View Engines */}
            <div id="view-engines" className="mb-16">
              <h2 className="text-2xl font-medium mb-6">View Engines</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-medium mb-3">MonthView</h3>
                  <div className="code-block">
                    <pre className="p-3 text-xs overflow-x-auto"><code>{`const monthView = calendar.getMonthView(2024, 0);
// Returns: {
//   weeks: Week[],
//   month: number,
//   year: number,
//   startDate: Date,
//   endDate: Date
// }`}</code></pre>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium mb-3">WeekView</h3>
                  <div className="code-block">
                    <pre className="p-3 text-xs overflow-x-auto"><code>{`const weekView = calendar.getWeekView(date);
// Returns: {
//   days: Day[],
//   weekNumber: number,
//   startDate: Date,
//   endDate: Date
// }`}</code></pre>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium mb-3">DayView</h3>
                  <div className="code-block">
                    <pre className="p-3 text-xs overflow-x-auto"><code>{`const dayView = calendar.getDayView(date);
// Returns: {
//   date: Date,
//   hours: Hour[],
//   allDayEvents: Event[],
//   timedEvents: Event[]
// }`}</code></pre>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium mb-3">ListView</h3>
                  <div className="code-block">
                    <pre className="p-3 text-xs overflow-x-auto"><code>{`const listView = calendar.getListView(start, end);
// Returns: {
//   events: Event[],
//   groupedByDate: Map<string, Event[]>
// }`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Utilities */}
            <div id="utilities" className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Utilities</h2>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Date Utilities</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-mono text-sm mb-2">formatDate(date: Date, format: string, locale?: string): string</h4>
                    <p className="text-sm text-slate-400">
                      Formats a date according to the specified format string.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">parseDate(dateString: string): Date</h4>
                    <p className="text-sm text-slate-400">
                      Parses various date string formats into Date objects.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">addDays(date: Date, days: number): Date</h4>
                    <p className="text-sm text-slate-400">
                      Adds or subtracts days from a date.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">startOfWeek(date: Date, weekStartsOn?: number): Date</h4>
                    <p className="text-sm text-slate-400">
                      Returns the start of the week for a given date.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">isSameDay(date1: Date, date2: Date): boolean</h4>
                    <p className="text-sm text-slate-400">
                      Checks if two dates are on the same day.
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