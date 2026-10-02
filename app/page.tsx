import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Button, { Arrow } from "./components/Button";
import CodeBlock from "./components/CodeBlock";
import InstallCommand from "./components/InstallCommand";
import SalesforceScreenshot from "./components/SalesforceScreenshot";
import LandingCalendar from "./components/LandingCalendar";
import s from "./landing.module.css";

const layers = [
  { number: "01 / LOGIC", title: "A headless engine.", text: "Events, recurrence, time zones, conflict detection, and search. Calendar logic that belongs to your application, with no runtime dependencies.", href: "/core", link: "Explore Core", state: "Available" },
  { number: "02 / EXPERIENCE", title: "A human interface.", text: "A real calendar, wherever you need it. Month, week, and day Web Components, with React and Vue adapters and a theme that fits your product.", href: "/interface", link: "Explore Interface", state: "Available" },
  { number: "03 / COORDINATION", title: "A shared agent layer.", text: "A private prototype for persistent shared calendars and scoped tools. Designed to let people and agents work from the same schedule, with explicit authority over changes.", href: "#agents", link: "See what’s next", state: "In development" },
];

export default function Home() {
  return (
    <div className={s.page}>
      <Nav />
      <main>
        <section className={s.hero} aria-labelledby="landing-title">
          <div className={s.wrap}>
            <div className={s.heroTop}><span className={s.eyebrow}>forceCalendar / open-source infrastructure</span><a className={s.link} href="#system">Meet the system <Arrow /></a></div>
            <div className={s.heroGrid}>
              <h1 id="landing-title" className={s.title}>Time,<span>in common.</span></h1>
              <div className={s.intro}><p>A calendar is more than a view.<br />It’s a place for people, applications, and agents to coordinate what happens next.</p><div className={s.actions}><Button href="/playground" size="lg">Try the calendar <Arrow /></Button><Button href="https://docs.forcecalendar.org" variant="secondary" size="lg">Build with it</Button></div></div>
            </div>
            <div className={s.stage}>
              <div className={s.stageLabel}><span>Real component. Real interaction.</span><span>Browser demo / sample data only</span></div>
              <div className={s.calendar}><LandingCalendar /></div>
            </div>
            <div className={s.heroNote}><span>Available today: scheduling engine, Web Components, and Salesforce integration.</span><span>Shared agent layer in development. Provider sync planned.</span></div>
          </div>
        </section>

        <div className={s.rail}><div className={s.wrap}><div className={s.railInner}><span>JavaScript <em>engine</em></span><span>Web Components <em>UI</em></span><span>React & Vue <em>adapters</em></span><span>Salesforce <em>integration</em></span><span>Agents <em>in development</em></span></div></div></div>

        <section className={s.section} id="system">
          <div className={s.wrap}>
            <div className={s.sectionIntro}><p className={s.eyebrow}>01 / the foundation</p><div><h2 className={s.sectionTitle}>One model of time.<br />Room for every interface.</h2><p className={`${s.lede} mt-6`}>The same event should make sense in your product, in a person’s day, and in an agent’s plan. Start with the engine and interface. Connect the data and permissions your application needs.</p></div></div>
            <div className={s.stack}>{layers.map(layer => <article key={layer.number} className={s.layer}><div className="flex flex-wrap justify-between gap-2"><span className={s.eyebrow}>{layer.number}</span><span className="font-mono text-[9px] uppercase tracking-wider text-accent-text">{layer.state}</span></div><h3>{layer.title}</h3><p>{layer.text}</p><a href={layer.href} className={s.link}>{layer.link} <Arrow /></a></article>)}</div>
          </div>
        </section>

        <section className={`${s.section} ${s.dark}`} id="agents">
          <div className={s.wrap}>
            <div className={s.visionGrid}>
              <div><p className={s.eyebrow}>02 / why this matters</p><h2 className={s.visionTitle}>You see the plan.<br /><span>Your agent works<br />from the same one.</span></h2><p className={`${s.lede} mt-7`}>An agent’s work should have a place in your day, not disappear into a separate queue. We’re building toward a shared schedule you can inspect, change, and understand.</p></div>
              <div><p className={s.eyebrow}>Shared-calendar direction / not a live service</p><div className={s.trace}><div className={s.traceItem}><strong>A person sets the intention.</strong><p>A meeting to prepare for. A task with a window. A block of time that needs protecting.</p></div><div className={s.traceItem}><strong>The calendar holds the context.</strong><p>Time, ownership, and the state of the plan, visible through a common event model.</p></div><div className={s.traceItem}><strong>An agent works within its authority.</strong><p>Scoped tools and explicit change controls, with an understandable record of what happened.</p></div></div><p className={s.note}>The agent layer is a private prototype. Hosted access, live provider connections, and reliable agent execution are not available as a public service. Local tests do not establish those production guarantees.</p></div>
            </div>
          </div>
        </section>

        <section className={s.section} id="integrations">
          <div className={s.wrap}>
            <div className={s.integrationGrid}><div><p className={s.eyebrow}>03 / already at work</p><h2 className={s.sectionTitle}>Your product.<br />Your calendar.</h2><p className={s.lede}>Use forceCalendar in a web application or put it inside Salesforce. The Salesforce distribution connects Lightning pages to standard Events through Apex. It’s one important integration of the same foundation.</p><Link className={s.link} href="/salesforce">Explore the Salesforce integration <Arrow /></Link><p className={s.note}>Actual Lightning capture with synthetic demo events. This image demonstrates the interface, not package installation or live data-access verification.</p></div><SalesforceScreenshot src="/salesforce-lightning-month-clean.png" alt="Genuine pointer-free Salesforce Lightning calendar with synthetic sample events" caption="forceCalendar in Salesforce Lightning" sizes="(max-width: 900px) 100vw, 690px" /></div>
            <p className={s.compatibility}><strong className="text-fg">Salesforce compatibility:</strong> Core and Interface are bundled as a static resource; Apex applies sharing and user-mode access. Lightning Web Security is required. Legacy Lightning Locker is not supported for the third-party custom elements used here. <a className="text-accent-text underline" href="https://developer.salesforce.com/docs/platform/lwc/guide/create-use-custom-elements.html">Salesforce’s platform guidance</a>.</p>
          </div>
        </section>

        <section className={`${s.section} border-y border-hairline bg-sunken`} id="connections">
          <div className={s.wrap}>
            <div className={s.sectionIntro}><p className={s.eyebrow}>04 / connected, deliberately</p><div><h2 className={s.sectionTitle}>Meet people<br />where they schedule.</h2><p className={`${s.lede} mt-6`}>The destination is a calendar you can share with an agent and view in the tools you already use. Here is what exists now, and what we’re still building.</p></div></div>
            <div className={s.connections}>
              {[{name:"Web applications",text:"Web Components, React and Vue adapters. Bring your own data layer.",status:"Available"},{name:"Salesforce",text:"Lightning components and Apex for standard Event records. Validate access and deployment in your org.",status:"Available integration"},{name:"iCalendar / ICS",text:"Core supports file import and export. This is not live account synchronization.",status:"Available"},{name:"Shared agent calendars",text:"Persistent events, scoped tools, and change controls in a private prototype. No public hosted service.",status:"In development"},{name:"Apple · Google · Microsoft",text:"Provider account connections and two-way synchronization are planned. Live integration validation is pending.",status:"Planned"}].map(item=><div key={item.name} className={s.connection}><strong>{item.name}</strong><p>{item.text}</p><span className={s.status}>{item.status}</span></div>)}
            </div>
          </div>
        </section>

        <section className={s.section} id="engineering">
          <div className={s.wrap}>
            <div className={s.evidence}>
              <div><p className={s.eyebrow}>Engineering, in the open</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">Evidence over promises.</h2><p className="mt-4">Read the source, inspect the tests, and compare the workloads that matter to your application.</p></div>
              <div><h3>Security & dependency review</h3><p>Published audit results describe their scope and package versions. An npm advisory scan is not a penetration test or a security guarantee.</p><a className={s.link} href="https://audit.forcecalendar.org">Read the audit <Arrow /></a></div>
              <div><h3>Reproducible benchmarks</h3><p>Inspect the measured versions, workloads, and methodology. Package size, browser transfer size, and runtime performance are different measurements.</p><a className={s.link} href="https://benchmark.forcecalendar.org">Explore benchmarks <Arrow /></a></div>
            </div>
          </div>
        </section>

        <section className={`${s.section} !pt-0`} id="build">
          <div className={s.wrap}><div className={s.build}>
            <div><p className={s.eyebrow}>Start with what ships</p><h2 className={s.sectionTitle}>A few lines.<br />Your own possibilities.</h2><p className={`${s.lede} mb-6`}>Mount the component, supply your events, and keep control of persistence and permissions.</p><InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" /><div className="mt-6 flex flex-wrap gap-5"><Link className={s.link} href="/playground">Open playground <Arrow /></Link><a className={s.link} href="https://docs.forcecalendar.org">Documentation <Arrow /></a></div></div>
            <CodeBlock filename="calendar.js" code={`import '@forcecalendar/interface';

const calendar = document.createElement('forcecal-main');
calendar.setAttribute('view', 'week');
document.querySelector('#calendar').append(calendar);

// Supply events from your application.
calendar.setEvents(events);

// You control storage, access, and integrations.`} />
          </div></div>
        </section>
        <section className={s.end}><div className={`${s.wrap} ${s.endInner}`}><div><p className={s.eyebrow}>Open source / MIT</p><h2 className="mt-3">Make time work together.</h2></div><Button href="https://github.com/forcecalendar" size="lg" variant="secondary">Explore the source <Arrow /></Button></div></section>
      </main>
      <Footer />
    </div>
  );
}
