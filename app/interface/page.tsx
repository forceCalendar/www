import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import PageHeader from "../components/PageHeader";
import InstallCommand from "../components/InstallCommand";
import CodeBlock from "../components/CodeBlock";
import Button, { Arrow } from "../components/Button";
import Card from "../components/Card";
import InterfacePreview from "./InterfacePreview";
import FrameworkTabs from "./FrameworkTabs";

export const metadata: Metadata = {
  title: "@forcecalendar/interface - Web Components Calendar UI",
  description:
    "Production-ready Web Components for calendar UI. Framework-agnostic, themeable with CSS custom properties, built on @forcecalendar/core.",
  alternates: { canonical: "https://forcecalendar.org/interface" },
  openGraph: { url: "https://forcecalendar.org/interface" },
};

const components = [
  {
    name: "<forcecal-main>",
    desc: "Complete calendar with month, week, and day views. Load data through the events property or setEvents(). The primary component for most use cases.",
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
  { name: "theme", type: "string", default: "none", desc: 'Named preset, e.g. "slds" for Salesforce Lightning styling' },
];

const events = [
  { name: "calendar-date-select", detail: "{ date }", desc: "Fired when a date cell is selected" },
  { name: "calendar-view-change", detail: "{ view }", desc: "Fired when the view changes" },
  { name: "calendar-navigate", detail: "{ action, date }", desc: "Fired on next/previous/today/goto navigation" },
  { name: "calendar-event-add", detail: "{ event }", desc: "Fired when an event is added (also -update, -remove)" },
  { name: "calendar-events-set", detail: "{ events, added, updated, removed, unchanged }", desc: "Fired once per events / setEvents() snapshot with the reconciled change set" },
  { name: "calendar-range-change", detail: "{ start, end, view, date }", desc: "Fired after first render and whenever the visible date window changes; getVisibleRange() reads it on demand" },
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

const th = "px-4 py-2.5 text-left font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle";
const td = "px-4 py-3 align-top";

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-hairline bg-sunken">
              {head.map((h) => (
                <th key={h} scope="col" className={th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {rows.map((cells, i) => (
              <tr key={i} className="transition-colors hover:bg-sunken/70">
                {cells.map((cell, j) => (
                  <td key={j} className={td}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function InterfacePage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <PageHeader
        eyebrow="UI Components"
        title={
          <>
            <span className="font-normal text-muted">@forcecalendar/</span>interface
          </>
        }
        lede="Production-ready Web Components that work with any framework."
        actions={
          <>
            <InstallCommand command="npm install @forcecalendar/interface" />
            <Link
              href="/playground"
              className="group inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline"
            >
              Try Playground <Arrow />
            </Link>
          </>
        }
      />

      {/* Live Preview */}
      <Section width="narrow" spacing="compact" className="bg-hero-mesh border-b border-hairline">
        <InterfacePreview />
      </Section>

      {/* Components Catalog */}
      <Section width="narrow">
        <SectionHeader
          eyebrow="Catalog"
          title="Components"
          subtitle="Accessible by default: every view implements the WAI-ARIA grid pattern with full keyboard navigation, roving focus, and screen-reader labels."
          id="components"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {components.map((comp) => (
            <Card key={comp.name} interactive>
              <code className="font-mono text-[13px] font-semibold text-accent-text">{comp.name}</code>
              <p className="mt-2 text-sm leading-relaxed text-muted">{comp.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Framework Integration */}
      <Section width="narrow" tone="sunken">
        <SectionHeader
          eyebrow="Integration"
          title="Works with any framework"
          subtitle="Use the Web Component directly, or install the first-party SSR-safe @forcecalendar/react and @forcecalendar/vue adapters."
          id="frameworks"
        />
        <FrameworkTabs />
      </Section>

      {/* Theming */}
      <Section width="narrow">
        <SectionHeader
          eyebrow="Theming"
          title="Theming"
          subtitle="Complete visual control through CSS custom properties."
          id="theming"
        />
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-fg">
              Available tokens <span className="font-mono text-xs font-normal text-subtle">({cssTokens.length})</span>
            </h3>
            <div className="max-h-96 overflow-y-auto rounded-xl bg-sunken p-3 ring-1 ring-hairline">
              <ul className="flex flex-wrap gap-1.5">
                {cssTokens.map((token) => (
                  <li key={token}>
                    <code className="inline-block rounded-md bg-raised px-2 py-1 font-mono text-xs text-muted ring-1 ring-inset ring-hairline">
                      {token}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="min-w-0">
            <CodeBlock code={themingExample} filename="styles.css" language="CSS" />
          </div>
        </div>
      </Section>

      {/* Attributes & Events */}
      <Section width="narrow" tone="sunken">
        <SectionHeader eyebrow="Reference" title="Attributes &amp; events" id="api" />

        <h3 className="mb-3 text-sm font-semibold text-fg">Attributes</h3>
        <Table
          caption="Attributes of forcecal-main"
          head={["Attribute", "Type", "Default", "Description"]}
          rows={attributes.map((attr) => [
            <code key="n" className="font-mono text-xs font-semibold text-accent-text">{attr.name}</code>,
            <span key="t" className="text-muted">{attr.type}</span>,
            <code key="d" className="font-mono text-xs text-subtle">{attr.default}</code>,
            <span key="s" className="text-muted">{attr.desc}</span>,
          ])}
        />

        <h3 className="mb-3 mt-10 text-sm font-semibold text-fg">Events</h3>
        <Table
          caption="Events dispatched by forcecal-main"
          head={["Event", "Detail", "Description"]}
          rows={events.map((evt) => [
            <code key="n" className="font-mono text-xs font-semibold text-accent-text">{evt.name}</code>,
            <code key="d" className="font-mono text-xs text-subtle">{evt.detail}</code>,
            <span key="s" className="text-muted">{evt.desc}</span>,
          ])}
        />
      </Section>

      {/* CTA */}
      <Section width="narrow" spacing="none" className="py-20 lg:py-24">
        <div className="bg-hero-mesh flex flex-col items-start gap-6 rounded-3xl p-8 ring-1 ring-hairline sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <h2 className="font-display text-display-sm text-fg">Ready to build?</h2>
          <div className="flex flex-wrap gap-3">
            <Button href="/playground">Playground</Button>
            <Button href="https://docs.forcecalendar.org/docs/interface" variant="secondary">
              Documentation
            </Button>
            <Button href="https://github.com/forcecalendar/interface" variant="secondary">
              GitHub
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
