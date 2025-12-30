import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function InterfacePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="section pt-32">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="badge badge-purple mb-4">Web Components</div>
            <h1 className="text-5xl md:text-6xl font-display font-light mb-6">
              <span className="font-bold">@forcecalendar/</span>interface
            </h1>
            <p className="text-xl text-primary-muted mb-8">
              Production-ready Web Components that work with any framework.
              Built on the forceCalendar core engine for maximum flexibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/showcase" className="btn btn-primary">
                View Live Demo
              </Link>
              <a
                href="https://github.com/forcecalendar/interface"
                className="btn btn-secondary"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-12">Available Components</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card card-hover">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-xl font-medium mb-3">&lt;force-calendar&gt;</h3>
              <p className="text-primary-muted text-sm">
                Main calendar component with full functionality. Includes navigation,
                view switching, and event management.
              </p>
            </div>
            <div className="card card-hover">
              <div className="text-2xl mb-3">📆</div>
              <h3 className="text-xl font-medium mb-3">&lt;month-view&gt;</h3>
              <p className="text-primary-muted text-sm">
                Month view component with event display, day selection,
                and responsive grid layout.
              </p>
            </div>
            <div className="card card-hover">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="text-xl font-medium mb-3">&lt;week-view&gt;</h3>
              <p className="text-primary-muted text-sm">
                Week view with hourly grid, all-day events section,
                and time-based event positioning.
              </p>
            </div>
            <div className="card card-hover">
              <div className="text-2xl mb-3">📋</div>
              <h3 className="text-xl font-medium mb-3">&lt;day-view&gt;</h3>
              <p className="text-primary-muted text-sm">
                Day view with detailed hourly breakdown, current time indicator,
                and event stacking.
              </p>
            </div>
            <div className="card card-hover">
              <div className="text-2xl mb-3">✏️</div>
              <h3 className="text-xl font-medium mb-3">&lt;event-form&gt;</h3>
              <p className="text-primary-muted text-sm">
                Event creation and editing form with validation,
                recurring event configuration, and reminders.
              </p>
            </div>
            <div className="card card-hover">
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="text-xl font-medium mb-3">&lt;event-search&gt;</h3>
              <p className="text-primary-muted text-sm">
                Search component with filtering, sorting, and
                advanced query capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Integration */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-12">Works Everywhere</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <span className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center mr-3 text-sm">⚛️</span>
                React
              </h3>
              <div className="code-block">
                <pre className="p-4 text-sm overflow-x-auto"><code>{`import '@forcecalendar/interface';

function App() {
  return (
    <force-calendar
      view="month"
      date="2024-01-15"
      locale="en-US"
    />
  );
}`}</code></pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <span className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center mr-3 text-sm">🟢</span>
                Vue
              </h3>
              <div className="code-block">
                <pre className="p-4 text-sm overflow-x-auto"><code>{`<template>
  <force-calendar
    view="month"
    :date="currentDate"
    locale="en-US"
  />
</template>

<script setup>
import '@forcecalendar/interface';
const currentDate = ref('2024-01-15');
</script>`}</code></pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <span className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center mr-3 text-sm">🅰️</span>
                Angular
              </h3>
              <div className="code-block">
                <pre className="p-4 text-sm overflow-x-auto"><code>{`import '@forcecalendar/interface';

@Component({
  template: \`
    <force-calendar
      view="month"
      [date]="currentDate"
      locale="en-US">
    </force-calendar>
  \`
})
export class CalendarComponent {
  currentDate = '2024-01-15';
}`}</code></pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <span className="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center mr-3 text-sm">⚡</span>
                Salesforce LWC
              </h3>
              <div className="code-block">
                <pre className="p-4 text-sm overflow-x-auto"><code>{`<template>
  <force-calendar
    view={view}
    date={currentDate}
    locale="en-US"
    onselect={handleSelect}>
  </force-calendar>
</template>`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-12">Built for Production</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-medium mb-2">Fully Customizable</h3>
              <p className="text-sm text-primary-muted">
                CSS custom properties for complete styling control
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">♿</div>
              <h3 className="font-medium mb-2">Accessible</h3>
              <p className="text-sm text-primary-muted">
                WCAG 2.1 AA compliant with ARIA labels
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-medium mb-2">Responsive</h3>
              <p className="text-sm text-primary-muted">
                Mobile-first design that works on all devices
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-medium mb-2">International</h3>
              <p className="text-sm text-primary-muted">
                RTL support and full localization
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}