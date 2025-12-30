import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function CorePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="section pt-32">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="badge badge-blue mb-4">Pure JavaScript</div>
            <h1 className="text-5xl md:text-6xl font-display font-light mb-6">
              <span className="font-bold">@forcecalendar/</span>core
            </h1>
            <p className="text-xl text-primary-muted mb-8">
              The calendar engine that powers enterprise applications. Zero DOM dependencies,
              full timezone support, and complete Salesforce compatibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/forcecalendar/core"
                className="btn btn-secondary"
              >
                View on GitHub
              </a>
              <Link href="/docs" className="btn btn-ghost">
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-12">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-xl font-medium mb-3">Calendar Engine</h3>
              <p className="text-primary-muted text-sm">
                Complete calendar logic with month, week, day, and list views.
                Navigation, date selection, and view state management.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-medium mb-3">Event Management</h3>
              <p className="text-primary-muted text-sm">
                Full CRUD operations for events with normalization, validation,
                and efficient querying with spatial indexing.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-medium mb-3">Timezone Support</h3>
              <p className="text-primary-muted text-sm">
                IANA timezone database integration with automatic DST handling
                and conversion between any timezones.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-medium mb-3">Recurring Events</h3>
              <p className="text-primary-muted text-sm">
                RFC 5545 compliant RRule support for complex recurring patterns
                with exception dates and modifications.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-medium mb-3">ICS Import/Export</h3>
              <p className="text-primary-muted text-sm">
                Full iCalendar format support for importing and exporting events
                with all standard properties.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-medium mb-3">Performance Optimized</h3>
              <p className="text-primary-muted text-sm">
                LRU caching, spatial indexing, and adaptive memory management
                for handling thousands of events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-8">Quick Start</h2>
          <div className="code-block">
            <div className="code-header">
              <span className="text-xs text-primary-dim">Installation</span>
            </div>
            <pre className="p-4 text-sm"><code>{`npm install @forcecalendar/core`}</code></pre>
          </div>
          <div className="code-block mt-6">
            <div className="code-header">
              <span className="text-xs text-primary-dim">Usage Example</span>
            </div>
            <pre className="p-4 text-sm overflow-x-auto"><code>{`import { Calendar } from '@forcecalendar/core';
import { TimezoneManager } from '@forcecalendar/core/timezone';
import { RecurrenceEngine } from '@forcecalendar/core/events';

// Initialize calendar
const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York',
  weekStartsOn: 0,
  businessHours: {
    start: '09:00',
    end: '17:00'
  }
});

// Add a recurring event
calendar.addEvent({
  id: 'weekly-standup',
  title: 'Team Standup',
  start: '2024-01-15T09:00:00',
  duration: 30,
  recurring: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20240630',
  category: 'meeting',
  attendees: ['team@company.com']
});

// Query events for a specific week
const weekEvents = calendar.getEventsForWeek(new Date('2024-01-15'));

// Export to ICS
const icsData = calendar.exportToICS();`}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
}