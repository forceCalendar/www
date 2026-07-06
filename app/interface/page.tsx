import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import InstallCommand from "../components/InstallCommand";
import CodeBlock from "../components/CodeBlock";
import InterfacePreview from "./InterfacePreview";
import FrameworkTabs from "./FrameworkTabs";

export const metadata: Metadata = {
  title: "@forcecalendar/interface — Web Components Calendar UI",
  description:
    "Production-ready Web Components for calendar UI. Framework-agnostic, themeable with CSS custom properties, built on @forcecalendar/core.",
  alternates: { canonical: "https://forcecalendar.org/interface" },
};

const components = [
  {
    name: "<forcecal-main>",
    desc: "Complete calendar with month, week, and day views. The primary component for most use cases.",
  },
  {
    name: "<forcecal-event-form>",
    desc: "Event creation and editing form with validation. Dispatches custom events on submit.",
  },
];

const cssTokens = [
  "--fc-primary-color",
  "--fc-primary-hover",
  "--fc-primary-light",
  "--fc-accent-color",
  "--fc-background",
  "--fc-background-alt",
  "--fc-background-hover",
  "--fc-background-active",
  "--fc-text-color",
  "--fc-text-secondary",
  "--fc-text-light",
  "--fc-border-color",
  "--fc-border-color-hover",
  "--fc-border-width",
  "--fc-border-radius",
  "--fc-border-radius-sm",
  "--fc-border-radius-lg",
  "--fc-border-radius-full",
  "--fc-font-family",
  "--fc-font-size-base",
  "--fc-font-size-xs",
  "--fc-font-size-sm",
  "--fc-font-size-lg",
  "--fc-font-size-xl",
  "--fc-font-weight-normal",
  "--fc-font-weight-medium",
  "--fc-font-weight-semibold",
  "--fc-font-weight-bold",
  "--fc-line-height",
  "--fc-spacing-xs",
  "--fc-spacing-sm",
  "--fc-spacing-md",
  "--fc-spacing-lg",
  "--fc-spacing-xl",
  "--fc-danger-color",
  "--fc-success-color",
  "--fc-shadow",
  "--fc-shadow-sm",
  "--fc-shadow-md",
  "--fc-shadow-lg",
  "--fc-transition",
  "--fc-transition-fast",
  "--fc-transition-slow",
  "--fc-z-dropdown",
  "--fc-z-modal",
  "--fc-z-tooltip",
];

const attributes = [
  { name: "view", type: "string", default: '"month"', desc: "Calendar view: month, week, day" },
  { name: "date", type: "string", default: "today", desc: "Initial date the calendar displays" },
  { name: "locale", type: "string", default: '"en-US"', desc: "BCP 47 locale tag" },
  { name: "timezone", type: "string", default: "local", desc: "IANA timezone identifier" },
  { name: "week-starts-on", type: "string", default: '"0"', desc: "0 = Sunday, 1 = Monday, 6 = Saturday" },
  { name: "height", type: "string", default: '"800px"', desc: "Calendar height (any CSS length)" },
];

const events = [
  { name: "calendar-date-select", detail: "{ date }", desc: "Fired when a date cell is selected" },
  { name: "calendar-view-change", detail: "{ view }", desc: "Fired when the view changes" },
  { name: "calendar-navigate", detail: "{ action, date }", desc: "Fired on next/previous/today/goto navigation" },
  { name: "calendar-event-add", detail: "{ event }", desc: "Fired when an event is added (also -update, -remove)" },
];

const themingExample = `forcecal-main {
  --fc-primary-color: #2563eb;
  --fc-background: #ffffff;
  --fc-background-alt: #f8fafc;
  --fc-border-color: #e2e8f0;
  --fc-text-color: #0f172a;
  --fc-text-secondary: #64748b;
  --fc-font-family: 'Inter', system-ui;
  --fc-border-radius: 0.375rem;
  --fc-background-hover: #f1f5f9;
  --fc-accent-color: #1e40af;
}`;

export default function InterfacePage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="relative pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 ring-1 ring-cyan-200 dark:ring-cyan-500/25 text-xs font-mono font-medium uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-6">
              UI Components
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
              @forcecalendar/interface
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
              Production-ready Web Components that work with any framework.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <InstallCommand command="npm install @forcecalendar/interface" />
              <Link
                href="/playground"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Try Playground <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="py-12 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <InterfacePreview />
        </div>
      </section>

      {/* Components Catalog */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Components" id="components" />
          <div className="grid sm:grid-cols-2 gap-4">
            {components.map((comp) => (
              <div
                key={comp.name}
                className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-cyan-300 dark:hover:border-cyan-500/40 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60"
              >
                <code className="text-cyan-600 dark:text-cyan-400 text-sm font-mono">
                  {comp.name}
                </code>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Integration */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Works with any framework"
            subtitle="Web Components are framework-agnostic by design."
            id="frameworks"
          />
          <FrameworkTabs />
        </div>
      </section>

      {/* Theming */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Theming"
            subtitle="Complete visual control through CSS custom properties."
            id="theming"
          />
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                Available tokens ({cssTokens.length})
              </h3>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="flex flex-wrap gap-1.5">
                  {cssTokens.map((token) => (
                    <code
                      key={token}
                      className="text-xs font-mono text-slate-500 dark:text-slate-400 px-2 py-1 bg-white dark:bg-slate-800 rounded"
                    >
                      {token}
                    </code>
                  ))}
                </div>
              </div>
            </div>
            <CodeBlock code={themingExample} filename="styles.css" language="CSS" />
          </div>
        </div>
      </section>

      {/* Attributes & Events */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Attributes &amp; events" id="api" />

          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Attributes</h3>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left py-2.5 px-4 font-medium text-slate-500">Attribute</th>
                    <th className="text-left py-2.5 px-4 font-medium text-slate-500">Type</th>
                    <th className="text-left py-2.5 px-4 font-medium text-slate-500">Default</th>
                    <th className="text-left py-2.5 px-4 font-medium text-slate-500">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr) => (
                    <tr key={attr.name} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                      <td className="py-2.5 px-4">
                        <code className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{attr.name}</code>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">{attr.type}</td>
                      <td className="py-2.5 px-4">
                        <code className="text-xs font-mono text-slate-400">{attr.default}</code>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">{attr.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Events</h3>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left py-2.5 px-4 font-medium text-slate-500">Event</th>
                    <th className="text-left py-2.5 px-4 font-medium text-slate-500">Detail</th>
                    <th className="text-left py-2.5 px-4 font-medium text-slate-500">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((evt) => (
                    <tr key={evt.name} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                      <td className="py-2.5 px-4">
                        <code className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{evt.name}</code>
                      </td>
                      <td className="py-2.5 px-4">
                        <code className="text-xs font-mono text-slate-400">{evt.detail}</code>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">{evt.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-6">
            Ready to build?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/playground"
              className="px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg shadow-sm shadow-cyan-600/25 hover:bg-cyan-700 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Playground
            </Link>
            <a
              href="https://docs.forcecalendar.org/interface"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Documentation
            </a>
            <a
              href="https://github.com/forcecalendar/interface"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
