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
  "--fc-background",
  "--fc-background-alt",
  "--fc-background-hover",
  "--fc-text-color",
  "--fc-text-secondary",
  "--fc-text-light",
  "--fc-border-color",
  "--fc-border-radius",
  "--fc-font-family",
  "--fc-font-size",
  "--fc-header-bg",
  "--fc-header-color",
  "--fc-today-bg",
  "--fc-today-color",
  "--fc-selected-bg",
  "--fc-selected-color",
  "--fc-event-bg",
  "--fc-event-color",
  "--fc-event-border",
  "--fc-danger-color",
  "--fc-success-color",
  "--fc-warning-color",
  "--fc-shadow",
  "--fc-shadow-lg",
  "--fc-transition-speed",
  "--fc-z-index-dropdown",
  "--fc-z-index-modal",
  "--fc-cell-height",
  "--fc-cell-min-width",
  "--fc-header-height",
  "--fc-sidebar-width",
  "--fc-scrollbar-width",
  "--fc-scrollbar-color",
  "--fc-scrollbar-track",
];

const attributes = [
  { name: "view", type: "string", default: '"month"', desc: "Calendar view: month, week, day" },
  { name: "locale", type: "string", default: '"en-US"', desc: "BCP 47 locale tag" },
  { name: "timezone", type: "string", default: "local", desc: "IANA timezone identifier" },
  { name: "week-starts-on", type: "string", default: '"0"', desc: "0 = Sunday, 1 = Monday, 6 = Saturday" },
  { name: "theme", type: "string", default: '"light"', desc: "Built-in theme: light or dark" },
];

const events = [
  { name: "event-click", detail: "{ event }", desc: "Fired when an event is clicked" },
  { name: "date-select", detail: "{ date, view }", desc: "Fired when a date cell is selected" },
  { name: "view-change", detail: "{ view }", desc: "Fired when the view changes" },
  { name: "navigate", detail: "{ date, direction }", desc: "Fired on calendar navigation" },
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
  --fc-today-bg: #eff6ff;
  --fc-today-color: #2563eb;
  --fc-event-bg: #dbeafe;
  --fc-event-color: #1e40af;
}`;

export default function InterfacePage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-4">
            UI Components
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
            @forcecalendar/interface
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">
            Production-ready Web Components that work with any framework.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <InstallCommand command="npm install @forcecalendar/interface" />
            <Link
              href="/playground"
              className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Try Playground &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
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
                className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
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
              <div className="grid grid-cols-1 gap-1 max-h-96 overflow-y-auto pr-2">
                {cssTokens.map((token) => (
                  <code
                    key={token}
                    className="text-xs font-mono text-slate-500 dark:text-slate-400 py-0.5"
                  >
                    {token}
                  </code>
                ))}
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
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-2 pr-4 font-medium text-slate-500">Attribute</th>
                  <th className="text-left py-2 pr-4 font-medium text-slate-500">Type</th>
                  <th className="text-left py-2 pr-4 font-medium text-slate-500">Default</th>
                  <th className="text-left py-2 font-medium text-slate-500">Description</th>
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr) => (
                  <tr key={attr.name} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-2.5 pr-4">
                      <code className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{attr.name}</code>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-500">{attr.type}</td>
                    <td className="py-2.5 pr-4">
                      <code className="text-xs font-mono text-slate-400">{attr.default}</code>
                    </td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">{attr.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Events</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-2 pr-4 font-medium text-slate-500">Event</th>
                  <th className="text-left py-2 pr-4 font-medium text-slate-500">Detail</th>
                  <th className="text-left py-2 font-medium text-slate-500">Description</th>
                </tr>
              </thead>
              <tbody>
                {events.map((evt) => (
                  <tr key={evt.name} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="py-2.5 pr-4">
                      <code className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{evt.name}</code>
                    </td>
                    <td className="py-2.5 pr-4">
                      <code className="text-xs font-mono text-slate-400">{evt.detail}</code>
                    </td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">{evt.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-4">
            <Link
              href="/playground"
              className="px-5 py-2.5 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Playground
            </Link>
            <a
              href="https://docs.forcecalendar.org/interface"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://github.com/forcecalendar/interface"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
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
