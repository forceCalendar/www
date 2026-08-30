import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import PageHeader from "../components/PageHeader";
import InstallCommand from "../components/InstallCommand";
import Button, { Arrow } from "../components/Button";
import { StatRow, StatTile } from "../components/StatTile";
import Stepper from "../components/Stepper";
import CodeBlock from "../components/CodeBlock";
import CoreTabs from "./CoreTabs";

export const metadata: Metadata = {
  title: "@forcecalendar/core - Headless Calendar Engine",
  description:
    "Zero-dependency headless calendar engine for enterprise applications. Scheduling, recurrence, timezones, and conflict detection.",
  alternates: { canonical: "https://forcecalendar.org/core" },
  openGraph: { url: "https://forcecalendar.org/core" },
};

const metrics = [
  { label: "Dependencies", value: "0" },
  { label: "License", value: "MIT" },
  { label: "TypeScript", value: ".d.ts" },
  { label: "Min + gzip", value: "~35KB" },
];

const exports = [
  { name: "Calendar", desc: "Core calendar engine with state, navigation, timezone conversion, and event management" },
  { name: "Event", desc: "Event model with validation, normalization, and timezone-aware accessors" },
  { name: "EventStore", desc: "Indexed event storage with range queries and conflict detection" },
  { name: "StateManager", desc: "Reactive state management with subscribe/unsubscribe and history" },
  { name: "DateUtils", desc: "Date math, formatting, and week/month grid helpers" },
  { name: "EventSearch", desc: "Full-text search across event titles, descriptions, and fields" },
  { name: "ICSParser", desc: "RFC 5545 iCalendar import and export" },
  { name: "RecurrenceEngine", desc: "RRULE expansion with exceptions, overrides, and hard occurrence caps" },
  { name: "EnhancedCalendar", desc: "Calendar extended with worker-backed search and RecurrenceEngineV2" },
  { name: "ICSHandler", desc: "High-level ICS import/export API over ICSParser, including URL fetch" },
  { name: "RecurrenceEngineV2", desc: "Extended recurrence engine with modified instances and complex DST handling" },
  { name: "RRuleParser", desc: "Standalone RFC 5545 RRULE string parser" },
  { name: "SearchWorkerManager", desc: "Offloads search indexing and queries to a Web Worker" },
  { name: "InvertedIndex", desc: "Term-to-event index powering fast full-text lookups" },
  { name: "TimezoneManager", desc: "IANA timezone conversions, DST detection, and offset math" },
  { name: "ConflictDetector", desc: "Time, attendee, and resource overlap detection across event sets" },
];

const quickStart = [
  {
    title: "Install",
    children: <InstallCommand command="npm install @forcecalendar/core" />,
  },
  {
    title: "Initialize",
    children: (
      <CodeBlock
        flat
        dense
        code={`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  locale: 'en-US',
  timeZone: 'America/New_York'
});`}
      />
    ),
  },
  {
    title: "Add events",
    children: (
      <CodeBlock
        flat
        dense
        code={`calendar.addEvent({
  title: 'Team Meeting',
  start: new Date('2026-03-16T10:00:00'),
  end: new Date('2026-03-16T11:00:00')
});`}
      />
    ),
  },
];

export default function CorePage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <PageHeader
        eyebrow="Core Engine"
        title={
          <>
            <span className="font-normal text-muted">@forcecalendar/</span>core
          </>
        }
        lede="Zero-dependency calendar logic for enterprise applications. Runs anywhere JavaScript runs: browser, Node, serverless, and edge."
        actions={
          <>
            <InstallCommand command="npm install @forcecalendar/core" />
            <a
              href="https://github.com/forcecalendar/core"
              className="group inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              View on GitHub <Arrow />
            </a>
          </>
        }
      />

      {/* Metrics */}
      <Section width="narrow" spacing="compact">
        <StatRow>
          {metrics.map((stat) => (
            <StatTile key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </StatRow>
      </Section>

      {/* Module Tour */}
      <Section width="narrow" spacing="default" className="pt-6 lg:pt-10">
        <SectionHeader eyebrow="Explore" title="Module tour" id="modules" />
        <CoreTabs />
      </Section>

      {/* API Surface */}
      <Section width="narrow" tone="sunken">
        <SectionHeader
          eyebrow="Reference"
          title="API surface"
          subtitle="Every class exported from @forcecalendar/core."
          id="api"
          aside={
            <a
              href="https://docs.forcecalendar.org/docs/api"
              className="group inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline"
            >
              Full API documentation <Arrow />
            </a>
          }
        />
        <dl className="grid gap-px overflow-hidden rounded-2xl bg-hairline ring-1 ring-hairline sm:grid-cols-2 lg:grid-cols-3">
          {exports.map((exp) => (
            <div key={exp.name} className="bg-raised p-5 transition-colors hover:bg-accent-soft/60">
              <dt>
                <code className="font-mono text-[13px] font-semibold text-accent-text">{exp.name}</code>
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{exp.desc}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">
          Full API documentation at{" "}
          <a
            href="https://docs.forcecalendar.org/docs/api"
            className="font-medium text-accent-text hover:underline"
          >
            docs.forcecalendar.org/docs/api
          </a>
        </p>
      </Section>

      {/* Quick Start */}
      <Section width="narrow">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Get started" title="Quick start" id="quickstart" className="mb-0 lg:mb-0" />
          </div>
          <div className="min-w-0 lg:col-span-8">
            <Stepper steps={quickStart} />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section width="narrow" spacing="none" className="pb-20 lg:pb-24">
        <div className="bg-hero-mesh flex flex-col items-start gap-6 rounded-3xl p-8 ring-1 ring-hairline sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <h2 className="font-display text-display-sm text-fg">Start building</h2>
          <div className="flex flex-wrap gap-3">
            <Button href="https://docs.forcecalendar.org/docs/core">Documentation</Button>
            <Button href="https://docs.forcecalendar.org/docs/api" variant="secondary">
              API Reference
            </Button>
            <Button href="https://github.com/forcecalendar/core" variant="secondary">
              GitHub
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
