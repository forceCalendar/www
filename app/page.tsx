import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Button, { Arrow } from "./components/Button";
import CodeBlock from "./components/CodeBlock";
import InstallCommand from "./components/InstallCommand";
import SalesforceScreenshot from "./components/SalesforceScreenshot";

const label = "font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-subtle";
const heading = "font-display text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl";
const link = "inline-flex items-center gap-2 text-sm font-medium text-accent-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const layers = [
  { n: "01", title: "Calendar engine", package: "@forcecalendar/core", status: "Available", text: "Events, recurrence, time zones, search, and conflict detection. Headless JavaScript with no runtime dependencies. Your application chooses where data lives.", href: "/core", cta: "Explore Core" },
  { n: "02", title: "Human interface", package: "@forcecalendar/interface", status: "Available", text: "Month, week, and day views as Web Components. Render the same event data in your product, with React and Vue adapters and CSS theming.", href: "/interface", cta: "Explore the components" },
  { n: "03", title: "Agent access", package: "Agent layer", status: "In development", text: "A new layer for persistent shared calendars and scoped agent tools. The goal: let a person and an agent work against the same schedule, with explicit authority over changes.", href: "#agent-layer", cta: "See the direction" },
];

function Architecture() {
  return (
    <figure className="relative border border-line bg-raised p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-5">
        <span className={label}>Architecture / direction</span>
        <span className="font-mono text-[10px] text-muted">Solid: available · Dashed: planned</span>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-4 text-center">
        <div className="border border-line px-3 py-4"><span className="block text-sm font-semibold">People & applications</span><span className="mt-1 block text-xs text-muted">Web Components · React · Vue</span></div>
        <div className="border border-dashed border-line px-3 py-4"><span className="block text-sm font-semibold">Agents</span><span className="mt-1 block text-xs text-muted">Scoped tools · in development</span></div>
      </div>
      <div className="grid grid-cols-2" aria-hidden><div className="mx-auto h-8 border-l border-line" /><div className="mx-auto h-8 border-l border-dashed border-line" /></div>
      <div className="border border-accent-line bg-accent-soft px-5 py-6">
        <div className="flex items-start justify-between gap-4"><div><span className="font-mono text-xs text-accent-text">@forcecalendar/core</span><h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">One event model.</h3></div><span className="mt-1 h-2 w-2 bg-accent" aria-hidden /></div>
        <p className="mt-3 text-sm leading-relaxed text-muted">Time ranges. Recurrence. Time zones.<br />The scheduling logic behind every view.</p>
      </div>
      <div className="mx-auto h-8 w-px bg-line" aria-hidden />
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="border border-line px-3 py-4"><span className="block text-sm font-semibold">Your data layer</span><span className="mt-1 block text-xs text-muted">Application storage · Salesforce Apex</span></div>
        <div className="border border-dashed border-line px-3 py-4"><span className="block text-sm font-semibold">Connected calendars</span><span className="mt-1 block text-xs text-muted">Provider adapters · planned</span></div>
      </div>
      <figcaption className="mt-5 text-xs leading-relaxed text-subtle">Core and UI are available today. Shared persistence, agent tools, and provider synchronization are separate work in progress.</figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
          <div className="relative mx-auto grid max-w-page gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-24">
            <div>
              <p className={label}>Open-source scheduling infrastructure</p>
              <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[1.06] tracking-[-0.045em] text-fg sm:text-[3.65rem]">One calendar model.<br /><span className="text-muted">Many ways to work.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">Build calendars into your applications. Give people a clear view of time. Bring agents into the same workflow.</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">Start with the available foundation: a headless engine, Web Components, and a Salesforce integration. We’re building the shared calendar and agent layer on top.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button href="/playground" size="lg">Try the calendar <Arrow /></Button><Button href="https://docs.forcecalendar.org" variant="secondary" size="lg">Read the docs</Button></div>
              <a href="#architecture" className={`${link} mt-6`}>Understand the architecture <Arrow /></a>
            </div>
            <Architecture />
          </div>
        </section>

        <div className="border-b border-hairline bg-sunken">
          <div className="mx-auto flex max-w-page flex-wrap gap-x-8 gap-y-3 px-6 py-5 text-xs text-muted"><span>MIT licensed</span><span>Core: no runtime dependencies</span><span>Framework-neutral UI</span><span>Your application owns the data integration</span></div>
        </div>

        <Section width="wide" id="purpose">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
            <p className={label}>Why we’re building this</p>
            <div><h2 className={heading}>Time should be shared context.</h2><p className="mt-6 text-xl leading-relaxed text-muted">A meeting, a work block, or a planned action should mean the same thing to the person looking at it, the application storing it, and the agent helping with it.</p><p className="mt-5 text-base leading-relaxed text-muted">Today, those workflows often have separate calendars and separate rules. forceCalendar starts with reusable scheduling logic and a visible interface. The next step is a shared layer that makes those schedules accessible to agents without hiding what changed or who is allowed to change it.</p><p className="mt-5 text-sm leading-relaxed text-subtle">This is the direction of the project. The current packages are building blocks, not a hosted shared-calendar service.</p></div>
          </div>
        </Section>

        <Section width="wide" divider id="architecture">
          <p className={label}>The building blocks</p>
          <h2 className={`${heading} mt-4 max-w-2xl`}>Separate the logic.<br />Connect the experience.</h2>
          <div className="mt-12 border-t border-line">
            {layers.map(layer => <article key={layer.n} className="grid gap-5 border-b border-line py-8 sm:grid-cols-[3rem_1fr_1.5fr] sm:gap-8"><span className="font-mono text-sm text-subtle">{layer.n}</span><div><span className="font-mono text-[10px] uppercase tracking-wider text-accent-text">{layer.status}</span><h3 className="mt-2 font-display text-xl font-semibold">{layer.title}</h3><p className="mt-2 font-mono text-xs text-subtle">{layer.package}</p></div><div><p className="text-sm leading-relaxed text-muted">{layer.text}</p><a href={layer.href} className={`${link} mt-4`}>{layer.cta} <Arrow /></a></div></article>)}
          </div>
        </Section>

        <Section tone="sunken" id="integrations">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
            <div><p className={label}>In a real application</p><h2 className={`${heading} mt-4`}>At home in Salesforce.</h2><p className="mt-5 text-base leading-relaxed text-muted">One important integration of the same engine and interface. Add a Lightning component to an App, Home, or Record page and connect standard Events through Apex.</p><p className="mt-4 text-sm leading-relaxed text-muted">The guide covers sandbox deployment, controller access, Event permissions, and Lightning Web Security. The current UI supports event creation and navigation; existing-event edit/delete controls are not included in this release.</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/salesforce" className={link}>Salesforce setup <Arrow /></Link><Link href="/platforms" className={link}>Other integrations <Arrow /></Link></div><p className="mt-6 text-xs leading-relaxed text-subtle">Actual Salesforce Lightning capture with synthetic demo events. It illustrates the UI, not live Apex data-access verification.</p></div>
            <SalesforceScreenshot src="/salesforce-lightning-month-clean.png" alt="Pointer-free Salesforce Lightning demo capture with synthetic events in month view" caption="Salesforce Lightning · synthetic demo data" sizes="(max-width: 1024px) 100vw, 640px" />
          </div>
          <div className="mt-12 grid gap-6 border-t border-line pt-7 md:grid-cols-3"><div><h3 className="text-sm font-semibold">Bundled in your org</h3><p className="mt-2 text-sm leading-relaxed text-muted">Core and Interface load from a Salesforce static resource. Event data flows through Apex.</p></div><div><h3 className="text-sm font-semibold">Explicit data access</h3><p className="mt-2 text-sm leading-relaxed text-muted">Sharing and user-mode Apex access apply. Controller access and Event permissions are configured separately.</p></div><div><h3 className="text-sm font-semibold">Lightning Web Security required</h3><p className="mt-2 text-sm leading-relaxed text-muted">Salesforce requires LWS for third-party custom elements. Legacy Lightning Locker is not supported.</p><a className={`${link} mt-3 text-xs`} href="https://developer.salesforce.com/docs/platform/lwc/guide/create-use-custom-elements.html">Salesforce compatibility guidance <Arrow /></a></div></div>
        </Section>

        <Section width="wide" id="agent-layer">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div><p className={label}>Next / in development</p><h2 className={`${heading} mt-4`}>A calendar you and your agent can work from.</h2><p className="mt-6 text-base leading-relaxed text-muted">The shared-calendar layer is being designed for persistent events, scoped agent tools, and a human-readable schedule. You should be able to see an agent’s planned work beside your own and keep control of changes.</p><p className="mt-5 text-sm leading-relaxed text-subtle">Early development. This is not yet a hosted product or a reliable agent wake-up service. Persistence, permissions, and execution guarantees must be validated before use with real commitments.</p></div>
            <div className="border-l-2 border-accent pl-6 sm:pl-8"><p className={label}>Design goals</p><ol className="mt-5 space-y-7">{[{title:"One shared schedule",text:"People and agents work with a common event model instead of disconnected copies."},{title:"Authority before action",text:"Make access explicit: which calendar, which operations, and whose approval a change needs."},{title:"Visible, attributable changes",text:"Show planned work and preserve enough context to understand what happened."}].map((item,i)=><li key={item.title}><span className="font-mono text-[10px] text-accent-text">0{i+1}</span><h3 className="mt-1 text-base font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p></li>)}</ol></div>
          </div>
        </Section>

        <Section width="wide" divider id="connections">
          <p className={label}>Integration roadmap</p><div className="mt-4 grid gap-6 md:grid-cols-2"><h2 className={heading}>Connect the calendars<br />people already use.</h2><p className="text-base leading-relaxed text-muted">Apple, Google, and Microsoft are part of the intended shared-calendar experience. Provider account connections and two-way synchronization are planned; they are not shipping features today.</p></div>
          <div className="mt-10 divide-y divide-hairline border-y border-line">{[{name:"Salesforce Events",status:"Available integration",detail:"LWC + Apex · sandbox setup and access validation required",href:"/salesforce"},{name:"Web applications",status:"Available packages",detail:"Web Components · React and Vue adapters",href:"/interface"},{name:"iCalendar / ICS",status:"Available in Core",detail:"File import and export · not live provider synchronization",href:"/core"},{name:"Shared calendars & agent tools",status:"In development",detail:"Persistence and scoped access · early implementation",href:"#agent-layer"},{name:"Apple · Google · Microsoft",status:"Planned",detail:"Provider adapters and account synchronization",href:null}].map(item=><div key={item.name} className="grid gap-2 py-5 sm:grid-cols-[1.15fr_1.65fr_1fr] sm:gap-6"><h3 className="text-sm font-semibold">{item.href ? <a className="hover:text-accent-text" href={item.href}>{item.name} <Arrow /></a> : item.name}</h3><p className="text-sm text-muted">{item.detail}</p><span className="font-mono text-[10px] uppercase tracking-wider text-subtle sm:text-right">{item.status}</span></div>)}</div>
        </Section>

        <Section tone="sunken" id="start">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16"><div><p className={label}>Start with what ships</p><h2 className={`${heading} mt-4`}>Build your first view.<br />Keep your architecture.</h2><p className="mt-5 text-base leading-relaxed text-muted">Install the packages, mount the component, and supply your events. Add your own data layer. Use the playground to explore views and configuration before integrating.</p><div className="mt-6"><InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" /></div><div className="mt-6 flex flex-wrap gap-5"><Link href="/playground" className={link}>Open playground <Arrow /></Link><a href="https://docs.forcecalendar.org" className={link}>Documentation <Arrow /></a></div></div><CodeBlock filename="calendar.js" code={`import '@forcecalendar/interface';

const calendar = document.createElement('forcecal-main');
calendar.setAttribute('view', 'week');
document.querySelector('#calendar').append(calendar);

// Supply a snapshot from your application’s data layer.
calendar.setEvents(events);

// Your application controls persistence and permissions.`} /></div>
        </Section>

        <Section width="wide" spacing="compact"><div className="flex flex-wrap items-center justify-between gap-6"><div><h2 className="font-display text-2xl font-semibold tracking-tight">Built in the open.</h2><p className="mt-2 text-sm text-muted">Review the source, try the packages, and help shape what comes next.</p></div><Button href="https://github.com/forcecalendar" variant="secondary">Explore the repositories <Arrow /></Button></div></Section>
      </main>
      <Footer />
    </div>
  );
}
