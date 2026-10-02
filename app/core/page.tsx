import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Button, { Arrow } from "../components/Button";
import InstallCommand from "../components/InstallCommand";
import CodeBlock from "../components/CodeBlock";
import CoreWorkbench from "./CoreWorkbench";
import s from "./core.module.css";

export const metadata: Metadata = {
  title: "Core — the headless calendar engine",
  description: "Give your application calendar logic: events, recurrence, timezones, conflict detection, search, and ICS. A headless JavaScript engine with no runtime dependencies.",
  alternates: { canonical: "https://forcecalendar.org/core" },
  openGraph: { url: "https://forcecalendar.org/core" },
};

const modules = [
  { n: "01", title: "Events with structure.", text: "Keep appointments, metadata, and calendar state together. Query a date window or reconcile a complete snapshot without recreating unchanged events.", exports: "Calendar · Event · EventStore · StateManager" },
  { n: "02", title: "One series. Many dates.", text: "Expand RRULE recurrence, apply exceptions, and ask for the next occurrence. Lazy iterators let you take a bounded slice of a series.", exports: "RecurrenceEngine · RecurrenceEngineV2 · RRuleParser" },
  { n: "03", title: "Time has a context.", text: "Work with IANA timezones, offsets, and daylight-saving transitions. Keep the event’s timezone explicit as it moves through your application.", exports: "TimezoneManager · DateUtils" },
  { n: "04", title: "Find the collision.", text: "Inspect time, attendee, resource, and location overlaps. Your application decides whether a conflict is a warning or a blocked booking.", exports: "ConflictDetector" },
  { n: "05", title: "Find the appointment.", text: "Search event content and filter the results. Worker-backed search is available for browser applications that need to move indexing off the main thread.", exports: "EventSearch · SearchWorkerManager · InvertedIndex" },
  { n: "06", title: "Let calendars travel.", text: "Import and export iCalendar files through the ICS utilities. Use file exchange in your integration; live provider sync requires a separate connection.", exports: "ICSParser · ICSHandler · EnhancedCalendar" },
];

export default function CorePage() {
  return <div className={s.page}><Nav /><main>
    <section className={s.hero} aria-labelledby="core-title"><div className={s.wrap}>
      <div className={s.topline}><span className={s.eyebrow}>The logic layer / @forcecalendar/core</span><a className={s.link} href="https://github.com/forcecalendar/core">Source on GitHub <Arrow /></a></div>
      <div className={s.heroGrid}><div><p className={s.kicker}>Behind every good calendar.</p><h1 className={s.title} id="core-title">Make time<br /><span>make sense.</span></h1></div><div className={s.heroIntro}><p>Recurrence. Timezones. Overlapping appointments. Put the calendar logic your enterprise app needs in one headless JavaScript engine.</p><div className={s.actions}><Button href="#workbench" size="lg">Explore the engine <Arrow /></Button><Button href="https://docs.forcecalendar.org/docs/core" variant="secondary" size="lg">Read the docs</Button></div><p className={s.package}>Core 2.5.7 · Open source · MIT</p></div></div>
      <div className={s.engineMap} aria-label="Core sits between your application's records and its calendar consumers"><div className={s.mapEnd}><span className={s.eyebrow}>Your inputs</span><strong>Records with dates</strong><p>CRM appointments<br />Events · resources · metadata</p></div><span className={s.mapArrow} aria-hidden="true">→</span><div className={s.mapCore}><span className={s.mapSymbol} aria-hidden="true">fc<span>_</span></span><div><span className={s.eyebrow}>@forcecalendar/core</span><strong>A calendar engine</strong><p>Normalize / index / expand / query</p></div></div><span className={s.mapArrow} aria-hidden="true">→</span><div className={s.mapEnd}><span className={s.eyebrow}>Your consumers</span><strong>Use the result anywhere</strong><p>Your UI · server code<br />Salesforce adapter · agent caller</p></div></div>
      <div className={s.facts}><div><strong>0</strong><span>runtime dependencies</span></div><div><strong>Headless</strong><span>no UI required</span></div><div><strong>.d.ts</strong><span>TypeScript declarations</span></div><div><strong>MIT</strong><span>your product, your code</span></div></div>
    </div></section>
    <section className={`${s.section} ${s.workbenchSection}`} id="workbench" aria-labelledby="workbench-title"><div className={s.wrap}><div className={s.sectionHeading}><div><p className={s.eyebrow}>01 / inspect the engine</p><h2 id="workbench-title">Less hand waving.<br />More return values.</h2></div><p>Choose an operation. These examples run the installed Core package in your browser with synthetic events. The output is calculated live.</p></div><CoreWorkbench /></div></section>
    <section className={s.section} id="modules" aria-labelledby="modules-title"><div className={s.wrap}><div className={s.sectionHeading}><div><p className={s.eyebrow}>02 / the building blocks</p><h2 id="modules-title">The hard parts,<br />in one place.</h2></div><p>Use the Calendar API to bring it together, or work directly with the exported modules. Your application keeps control of the data and the decisions.</p></div><div className={s.modules}>{modules.map(module => <article key={module.n}><span className={s.moduleNumber}>{module.n}</span><h3>{module.title}</h3><p>{module.text}</p><code>{module.exports}</code></article>)}</div><a className={s.referenceLink} href="https://docs.forcecalendar.org/docs/api">Explore the API reference <Arrow /></a></div></section>
    <section className={`${s.section} ${s.boundarySection}`} aria-labelledby="architecture-title"><div className={s.wrap}><div className={s.boundaryGrid}><div><p className={s.eyebrow}>03 / a deliberate boundary</p><h2 id="architecture-title">Your application<br />stays in charge.</h2><p className={s.lede}>The engine understands calendars. Your system understands your business.</p><Link className={s.link} href="/platforms">Find your integration path <Arrow /></Link></div><div className={s.responsibilities}><div><span>Core handles</span><p>Event models, date windows, recurrence expansion, overlap detection, search, and ICS files.</p></div><div><span>Your app handles</span><p>Identity, authorization, persistence, server validation, and the rules that make a booking valid.</p></div><div><span>Optional callers</span><p>Your application code or an agent can invoke the engine through your adapter. Access and execution belong to your application.</p></div></div></div></div></section>
    <section className={s.section} id="quickstart" aria-labelledby="start-title"><div className={s.wrap}><div className={s.startGrid}><div><p className={s.eyebrow}>04 / a useful first event</p><h2 id="start-title">Start with<br />your next appointment.</h2><p className={s.lede}>Install the package, add a record, and query the dates you need. Add Interface when you’re ready to put a calendar on screen.</p><InstallCommand command="npm install @forcecalendar/core" /><div className={s.actions}><Link className={s.link} href="/interface">Meet the UI layer <Arrow /></Link><a className={s.link} href="https://docs.forcecalendar.org/docs/core">Core documentation <Arrow /></a></div></div><CodeBlock filename="appointments.js" code={`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({ timeZone: 'UTC' });

calendar.addEvent({
  id: 'customer-review',
  title: 'Northstar · account review',
  start: '2026-10-05T09:00:00Z',
  end: '2026-10-05T09:45:00Z',
});

const appointments = calendar.getEventsInRange(
  new Date('2026-10-05T00:00:00Z'),
  new Date('2026-10-05T23:59:59.999Z'),
);

console.log(appointments);
calendar.destroy(); // Release when finished.`} /></div><div className={s.evidence}><p>Choose with evidence. Review the workloads and scope behind published measurements.</p><a className={s.link} href="https://benchmark.forcecalendar.org">Benchmarks <Arrow /></a><a className={s.link} href="https://audit.forcecalendar.org">Security review <Arrow /></a></div></div></section>
  </main><Footer /></div>;
}
