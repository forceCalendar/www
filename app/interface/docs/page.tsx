import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function InterfaceDocsPage() {
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
              <Link href="/interface" className="hover:text-primary transition-colors">Interface</Link>
              <span>/</span>
              <span className="text-primary">Documentation</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-light mb-6">
              Interface <strong className="font-bold">Documentation</strong>
            </h1>

            <p className="text-xl text-slate-400 mb-12">
              Complete guide to @forcecalendar/interface Web Components. Learn how to integrate
              calendar components into any framework or vanilla JavaScript application.
            </p>

            {/* Getting Started */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Getting Started</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Installation</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm"><code>{`npm install @forcecalendar/interface
# or
yarn add @forcecalendar/interface`}</code></pre>
                </div>
              </div>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Basic Usage</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`<!-- Import the components -->
<script type="module">
  import '@forcecalendar/interface';
</script>

<!-- Use the calendar component -->
<force-calendar
  view="month"
  date="2024-01-15"
  locale="en-US"
  timezone="America/New_York">
</force-calendar>`}</code></pre>
                </div>
              </div>
            </div>

            {/* Web Components Standard */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Web Components Standard</h2>

              <div className="card">
                <p className="text-sm text-slate-400 mb-4">
                  Our components are built using the Web Components standard, which means they work
                  in any modern browser and can be used with any framework or no framework at all.
                </p>

                <h4 className="font-medium mb-3">Key Features:</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• <strong>Shadow DOM:</strong> Encapsulated styling that won't conflict with your app</li>
                  <li>• <strong>Custom Elements:</strong> Use like any HTML element</li>
                  <li>• <strong>HTML Templates:</strong> Efficient DOM manipulation</li>
                  <li>• <strong>ES Modules:</strong> Modern JavaScript module system</li>
                </ul>
              </div>
            </div>

            {/* Attributes and Properties */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Attributes and Properties</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-4">Common Attributes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 pr-4">Attribute</th>
                        <th className="text-left py-3 pr-4">Type</th>
                        <th className="text-left py-3 pr-4">Default</th>
                        <th className="text-left py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 pr-4 font-mono">view</td>
                        <td className="py-3 pr-4 text-slate-400">string</td>
                        <td className="py-3 pr-4 text-slate-400">'month'</td>
                        <td className="py-3 text-slate-400">Calendar view (month, week, day, list)</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 pr-4 font-mono">date</td>
                        <td className="py-3 pr-4 text-slate-400">string</td>
                        <td className="py-3 pr-4 text-slate-400">today</td>
                        <td className="py-3 text-slate-400">Current date (ISO 8601 format)</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 pr-4 font-mono">locale</td>
                        <td className="py-3 pr-4 text-slate-400">string</td>
                        <td className="py-3 pr-4 text-slate-400">'en-US'</td>
                        <td className="py-3 text-slate-400">Locale for date/time formatting</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 pr-4 font-mono">timezone</td>
                        <td className="py-3 pr-4 text-slate-400">string</td>
                        <td className="py-3 pr-4 text-slate-400">'UTC'</td>
                        <td className="py-3 text-slate-400">IANA timezone identifier</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 pr-4 font-mono">week-starts-on</td>
                        <td className="py-3 pr-4 text-slate-400">number</td>
                        <td className="py-3 pr-4 text-slate-400">0</td>
                        <td className="py-3 text-slate-400">Day week starts (0=Sunday)</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 pr-4 font-mono">events</td>
                        <td className="py-3 pr-4 text-slate-400">string</td>
                        <td className="py-3 pr-4 text-slate-400">null</td>
                        <td className="py-3 text-slate-400">JSON string of events array</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-mono">readonly</td>
                        <td className="py-3 pr-4 text-slate-400">boolean</td>
                        <td className="py-3 pr-4 text-slate-400">false</td>
                        <td className="py-3 text-slate-400">Disable event editing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Setting Properties via JavaScript</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`const calendar = document.querySelector('force-calendar');

// Set properties
calendar.events = [
  {
    id: '1',
    title: 'Team Meeting',
    start: '2024-01-15T09:00:00',
    end: '2024-01-15T10:00:00'
  }
];

// Update view
calendar.view = 'week';

// Navigate to date
calendar.date = '2024-02-01';`}</code></pre>
                </div>
              </div>
            </div>

            {/* Events and Methods */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Events and Methods</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">Custom Events</h3>

                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">datechange</h4>
                    <p className="text-sm text-slate-400">
                      Fired when the current date changes.
                    </p>
                    <div className="code-block mt-2">
                      <pre className="p-3 text-xs"><code>{`calendar.addEventListener('datechange', (e) => {
  console.log('New date:', e.detail.date);
});`}</code></pre>
                    </div>
                  </div>

                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">viewchange</h4>
                    <p className="text-sm text-slate-400">
                      Fired when the view type changes.
                    </p>
                    <div className="code-block mt-2">
                      <pre className="p-3 text-xs"><code>{`calendar.addEventListener('viewchange', (e) => {
  console.log('New view:', e.detail.view);
});`}</code></pre>
                    </div>
                  </div>

                  <div className="border-b border-slate-800 pb-4">
                    <h4 className="font-mono text-sm mb-2">eventclick</h4>
                    <p className="text-sm text-slate-400">
                      Fired when an event is clicked.
                    </p>
                    <div className="code-block mt-2">
                      <pre className="p-3 text-xs"><code>{`calendar.addEventListener('eventclick', (e) => {
  console.log('Event clicked:', e.detail.event);
});`}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">eventcreate</h4>
                    <p className="text-sm text-slate-400">
                      Fired when a new event is created.
                    </p>
                    <div className="code-block mt-2">
                      <pre className="p-3 text-xs"><code>{`calendar.addEventListener('eventcreate', (e) => {
  const newEvent = e.detail.event;
  // Save to backend
  saveEvent(newEvent);
});`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Public Methods</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-mono text-sm mb-2">addEvent(event)</h4>
                    <p className="text-sm text-slate-400">
                      Adds a new event to the calendar.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">updateEvent(id, updates)</h4>
                    <p className="text-sm text-slate-400">
                      Updates an existing event.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">deleteEvent(id)</h4>
                    <p className="text-sm text-slate-400">
                      Removes an event from the calendar.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">navigateTo(date)</h4>
                    <p className="text-sm text-slate-400">
                      Navigate to a specific date.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-sm mb-2">refresh()</h4>
                    <p className="text-sm text-slate-400">
                      Refresh the calendar view.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Styling */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Styling and Theming</h2>

              <div className="card mb-6">
                <h3 className="text-lg font-medium mb-3">CSS Custom Properties</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Customize the appearance using CSS custom properties:
                </p>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`force-calendar {
  --calendar-bg: #ffffff;
  --calendar-text: #333333;
  --calendar-border: #e0e0e0;
  --calendar-header-bg: #f5f5f5;
  --calendar-today-bg: #e3f2fd;
  --calendar-selected-bg: #1976d2;
  --calendar-selected-text: #ffffff;
  --calendar-event-bg: #2196f3;
  --calendar-event-text: #ffffff;
  --calendar-weekend-bg: #fafafa;
  --calendar-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --calendar-border-radius: 4px;
  --calendar-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}`}</code></pre>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Dark Theme Example</h3>
                <div className="code-block">
                  <pre className="p-4 text-sm overflow-x-auto"><code>{`force-calendar[theme="dark"] {
  --calendar-bg: #1a1a1a;
  --calendar-text: #ffffff;
  --calendar-border: #333333;
  --calendar-header-bg: #2a2a2a;
  --calendar-today-bg: #333333;
  --calendar-selected-bg: #4a90e2;
  --calendar-event-bg: #3a7bd5;
  --calendar-weekend-bg: #222222;
}`}</code></pre>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Accessibility</h2>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">WCAG 2.1 AA Compliance</h3>
                <p className="text-sm text-slate-400 mb-4">
                  All components are built with accessibility in mind:
                </p>

                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• <strong>Keyboard Navigation:</strong> Full keyboard support with logical tab order</li>
                  <li>• <strong>Screen Readers:</strong> Proper ARIA labels and live regions</li>
                  <li>• <strong>Color Contrast:</strong> AA compliant color combinations</li>
                  <li>• <strong>Focus Indicators:</strong> Clear visual focus states</li>
                  <li>• <strong>Semantic HTML:</strong> Proper heading hierarchy and landmarks</li>
                </ul>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Keyboard Shortcuts:</h4>
                  <ul className="space-y-1 text-sm text-slate-400">
                    <li><kbd>Tab</kbd> - Navigate between elements</li>
                    <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Select date or activate button</li>
                    <li><kbd>Arrow Keys</kbd> - Navigate dates in grid</li>
                    <li><kbd>Page Up</kbd> / <kbd>Page Down</kbd> - Previous/next month</li>
                    <li><kbd>Home</kbd> / <kbd>End</kbd> - First/last day of week</li>
                    <li><kbd>Escape</kbd> - Close modals or cancel operations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Next Steps</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/interface/components" className="card card-hover group">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    Components →
                  </h3>
                  <p className="text-sm text-slate-400">
                    Detailed documentation for each component
                  </p>
                </Link>

                <Link href="/interface/playground" className="card card-hover group">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    Playground →
                  </h3>
                  <p className="text-sm text-slate-400">
                    Interactive component playground
                  </p>
                </Link>

                <a href="https://github.com/forcecalendar/interface"
                   className="card card-hover group"
                   target="_blank"
                   rel="noopener noreferrer">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    GitHub →
                  </h3>
                  <p className="text-sm text-slate-400">
                    View source code and contribute
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