import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Button, { Arrow } from "../components/Button";
import InstallCommand from "../components/InstallCommand";
import CodeBlock from "../components/CodeBlock";
import InterfaceStudio from "./InterfaceStudio";
import InterfaceRecipes from "./InterfaceRecipes";
import s from "../core/core.module.css";
import ui from "./interface.module.css";

export const metadata: Metadata = {
  title: "Interface — a calendar that belongs in your app",
  description: "Embed month, week, and day calendars with Web Components. Theme your interface, reconcile event snapshots, and connect React, Vue, or Salesforce to your own data.",
  alternates: { canonical: "https://forcecalendar.org/interface" },
  openGraph: { url: "https://forcecalendar.org/interface" },
};

const contracts = [
  { name: "setEvents(rows)", type: "Data in", text: "Reconcile a complete snapshot. Each record needs an id. Missing records are removed unless removeMissing is false." },
  { name: "calendar-events-set", type: "Load result", text: "Receive the added, updated, removed, and unchanged sets. Snapshot loads do not fire per-event mutation notifications." },
  { name: "calendar-range-change", type: "Visible dates", text: "Receive start, end, view, and date after initial attachment and when the visible window changes. Use it to request your records." },
  { name: "calendar-event-add / -update / -remove", type: "Edits out", text: "Listen for changes from the UI or imperative API. Your application validates and persists them through its authorized data layer." },
];

export default function InterfacePage() {
  return <div className={`${s.page} ${ui.page}`}><Nav /><main>
    <section className={s.hero} aria-labelledby="interface-title"><div className={s.wrap}>
      <div className={s.topline}><span className={s.eyebrow}>The visible layer / @forcecalendar/interface</span><Link className={s.link} href="/playground">Open playground <Arrow /></Link></div>
      <div className={s.heroGrid}><div><p className={s.kicker}>The calendar is part of your product.</p><h1 className={s.title} id="interface-title">Looks like you.<br /><span>Works for them.</span></h1></div><div className={s.heroIntro}><p>Turn your application’s records into a calendar people can use. Web Components, adaptable styling, and month, week, and day views built on the Core engine.</p><div className={s.actions}><Button href="#component-studio" size="lg">Try the interface <Arrow /></Button><Button href="#integration" variant="secondary" size="lg">Start integrating</Button></div><p className={s.package}>Interface 1.9.1 · Web Components · MIT</p></div></div>
      <div id="component-studio" className={ui.studioAnchor}><InterfaceStudio /></div>
      <div className={ui.specimenCaption}><span>Real component. Synthetic customer appointments.</span><span>Switch views, change the accent, or create a local event.</span></div>
    </div></section>
    <div className={ui.featureRail}><div className={s.wrap}><span>Month / Week / Day</span><span>Drag & resize</span><span>Keyboard navigation</span><span>CSS custom properties</span><span>Typed DOM events</span></div></div>
    <section className={s.section} aria-labelledby="experience-title"><div className={s.wrap}>
      <div className={s.sectionHeading}><div><p className={s.eyebrow}>01 / the product experience</p><h2 id="experience-title">Make a calendar<br />feel at home.</h2></div><p>A useful calendar needs more than a grid. Give people the right view, a clear way to create events, and room to work with the schedule.</p></div>
      <div className={ui.experiences}>
        <article><div className={`${ui.motif} ${ui.viewMotif}`} aria-hidden="true"><span>31</span><span>07</span><span>01</span><small>MONTH</small><small>WEEK</small><small>DAY</small></div><h3>One month. Every detail.</h3><p>Scan the month, compare the week, or focus on a day. Overlapping appointments stay visible in the time grid.</p><code>{'view="month" | "week" | "day"'}</code></article>
        <article><div className={`${ui.motif} ${ui.editMotif}`} aria-hidden="true"><div><span>10:00</span>Account review<i /></div><div><span>11:00</span>Updated time<i /></div></div><h3>Move the work forward.</h3><p>Create events with the built-in form. Drag, resize, or select a time range, then handle the resulting events in your app.</p><code>&lt;forcecal-event-form&gt;</code></article>
        <article><div className={`${ui.motif} ${ui.keyMotif}`} aria-hidden="true"><kbd>Tab</kbd><kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd></div><h3>Make room for the keyboard.</h3><p>Grid semantics, roving focus, arrow-key navigation, and screen-reader labels support keyboard interaction. Validate the complete experience in your app.</p><code>ARIA grids + keyboard navigation</code></article>
      </div>
    </div></section>
    <section className={`${s.section} ${s.workbenchSection}`} id="integration" aria-labelledby="integration-title"><div className={s.wrap}>
      <div className={s.sectionHeading}><div><p className={s.eyebrow}>02 / your stack, your choice</p><h2 id="integration-title">A web standard.<br />A familiar way in.</h2></div><p>Use the element directly in the browser, or choose the first-party React and Vue adapters. In server-rendered apps, the adapters register the element on the client.</p></div>
      <InterfaceRecipes />
      <div className={ui.salesforceNote}><span className={s.eyebrow}>Building in Salesforce?</span><p>Start with the Lightning integration, packaged resources, and Apex data access.</p><Link className={s.link} href="/salesforce">Salesforce guide <Arrow /></Link></div>
    </div></section>
    <section className={s.section} aria-labelledby="data-title"><div className={s.wrap}>
      <div className={s.sectionHeading}><div><p className={s.eyebrow}>03 / a clear data contract</p><h2 id="data-title">Your records in.<br />Your events out.</h2></div><p>The component owns the interaction. Your application owns persistence, permissions, and booking rules. Connect them through properties, methods, and DOM events.</p></div>
      <div className={ui.contracts}>{contracts.map(contract => <div key={contract.name}><span>{contract.type}</span><code>{contract.name}</code><p>{contract.text}</p></div>)}</div>
      <div className={ui.integrationNotes}><div><h3>Fetch the right window.</h3><p>getVisibleRange() returns browser-local dates with an inclusive end, regardless of the timezone attribute. Translate that window for your backend’s query semantics.</p></div><div><h3>Set editing deliberately.</h3><p>The readonly attribute or readOnly property disables built-in user edits. Host APIs remain writable; enforce authorization on the server.</p></div><div><h3>Know the edit scope.</h3><p>Dragging or resizing a recurring occurrence updates the whole series. Per-occurrence editing is not available in the current UI.</p></div></div>
    </div></section>
    <section className={`${s.section} ${s.boundarySection}`} aria-labelledby="theme-title"><div className={s.wrap}><div className={s.startGrid}>
      <div><p className={s.eyebrow}>04 / bring your design system</p><h2 id="theme-title">Your colors.<br />Your type.<br />Your calendar.</h2><p className={s.lede}>CSS custom properties put the component’s visual language in your hands. Define them in a stylesheet on the host element so they survive rerenders.</p><div className={ui.swatches} aria-hidden="true"><span /><span /><span /><span /><span /></div><a className={s.link} href="https://docs.forcecalendar.org/docs/interface">Explore the component documentation <Arrow /></a></div>
      <CodeBlock filename="your-calendar.css" code={`forcecal-main {
  --fc-primary-color: #7564d7;
  --fc-primary-hover: #6050b9;
  --fc-primary-light: #eeeafb;
  --fc-background: #ffffff;
  --fc-background-alt: #f7f6fb;
  --fc-text-color: #252235;
  --fc-text-secondary: #686174;
  --fc-border-color: #e5e1ee;
  --fc-font-family: 'Inter', system-ui, sans-serif;
  --fc-border-radius: 6px;
}

/* Or use the built-in Salesforce preset:
   <forcecal-main theme="slds"></forcecal-main> */`} />
    </div></div></section>
    <section className={`${s.section} ${ui.finish}`} aria-labelledby="finish-title"><div className={s.wrap}><div className={ui.finishGrid}><div><p className={s.eyebrow}>From component to capability</p><h2 id="finish-title">Give your product<br />a place for time.</h2><div className={s.actions}><Button href="/playground" size="lg">Open the playground <Arrow /></Button><Button href="https://docs.forcecalendar.org/docs/interface" size="lg" variant="secondary">Read the docs</Button></div></div><div><InstallCommand command="npm install @forcecalendar/interface @forcecalendar/core" /><p className={ui.lifecycle}>Keep the element’s state when temporarily detaching it. Call destroy() when you’re finished with it permanently to release its engine and listeners.</p><a className={s.link} href="https://github.com/forcecalendar/interface">Inspect the source <Arrow /></a></div></div></div></section>
  </main><Footer /></div>;
}
