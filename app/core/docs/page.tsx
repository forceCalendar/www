import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function CoreDocsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <Navigation />

      {/* Documentation Content */}
      <section className="section pt-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/core" className="hover:text-primary transition-colors">Core</Link>
              <span>/</span>
              <span className="text-primary">Documentation</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-light mb-6">
              Core <strong className="font-bold">Documentation</strong>
            </h1>

            <p className="text-xl text-primary-muted mb-12">
              Complete guide to the @forcecalendar/core JavaScript engine. Learn how to integrate
              the calendar logic into your application.
            </p>

            {/* Getting Started */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Getting Started</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Installation</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm"><code>{`npm install @forcecalendar/core
# or
yarn add @forcecalendar/core`}</code></pre>
                </div>
              </div>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Basic Usage</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`import { Calendar } from '@forcecalendar/core';

// Create a new calendar instance
const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York',
  weekStartsOn: 0 // Sunday
});

// Add an event
calendar.addEvent({
  id: 'event-1',
  title: 'Team Meeting',
  start: '2024-01-15T09:00:00',
  end: '2024-01-15T10:00:00',
  location: 'Conference Room A'
});

// Get events for a specific date
const events = calendar.getEventsForDate(new Date('2024-01-15'));`}</code></pre>
                </div>
              </div>
            </div>

            {/* Core Concepts */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Core Concepts</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-medium mb-3">Calendar Instance</h3>
                  <p className="text-sm text-primary-muted">
                    The main calendar object that manages state, events, and views. Supports
                    multiple locales and timezones.
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium mb-3">Event Management</h3>
                  <p className="text-sm text-primary-muted">
                    Full CRUD operations for events with validation, normalization, and
                    efficient querying using spatial indexing.
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium mb-3">View Engines</h3>
                  <p className="text-sm text-primary-muted">
                    Month, week, day, and list view calculations with proper timezone handling
                    and date navigation.
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-lg font-medium mb-3">Timezone Support</h3>
                  <p className="text-sm text-primary-muted">
                    IANA timezone database integration with automatic DST handling and
                    conversion between timezones.
                  </p>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Configuration Options</h2>

              <div className="card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-border">
                        <th className="text-left py-3 pr-4">Option</th>
                        <th className="text-left py-3 pr-4">Type</th>
                        <th className="text-left py-3 pr-4">Default</th>
                        <th className="text-left py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-surface-border">
                        <td className="py-3 pr-4 font-mono">locale</td>
                        <td className="py-3 pr-4 text-primary-muted">string</td>
                        <td className="py-3 pr-4 text-primary-muted">'en-US'</td>
                        <td className="py-3 text-primary-muted">Locale for date formatting</td>
                      </tr>
                      <tr className="border-b border-surface-border">
                        <td className="py-3 pr-4 font-mono">timezone</td>
                        <td className="py-3 pr-4 text-primary-muted">string</td>
                        <td className="py-3 pr-4 text-primary-muted">'UTC'</td>
                        <td className="py-3 text-primary-muted">IANA timezone identifier</td>
                      </tr>
                      <tr className="border-b border-surface-border">
                        <td className="py-3 pr-4 font-mono">weekStartsOn</td>
                        <td className="py-3 pr-4 text-primary-muted">number</td>
                        <td className="py-3 pr-4 text-primary-muted">0</td>
                        <td className="py-3 text-primary-muted">Day week starts (0=Sunday)</td>
                      </tr>
                      <tr className="border-b border-surface-border">
                        <td className="py-3 pr-4 font-mono">businessHours</td>
                        <td className="py-3 pr-4 text-primary-muted">object</td>
                        <td className="py-3 pr-4 text-primary-muted">null</td>
                        <td className="py-3 text-primary-muted">Business hours configuration</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-mono">maxEventsPerDay</td>
                        <td className="py-3 pr-4 text-primary-muted">number</td>
                        <td className="py-3 pr-4 text-primary-muted">100</td>
                        <td className="py-3 text-primary-muted">Maximum events to display per day</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Next Steps</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/core/api" className="card card-hover group">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    API Reference →
                  </h3>
                  <p className="text-sm text-primary-muted">
                    Complete API documentation for all classes and methods
                  </p>
                </Link>

                <Link href="/core/examples" className="card card-hover group">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    Examples →
                  </h3>
                  <p className="text-sm text-primary-muted">
                    Real-world usage examples and integration patterns
                  </p>
                </Link>

                <a href="https://github.com/forcecalendar/core"
                   className="card card-hover group"
                   target="_blank"
                   rel="noopener noreferrer">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    GitHub →
                  </h3>
                  <p className="text-sm text-primary-muted">
                    View source code and contribute to the project
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}