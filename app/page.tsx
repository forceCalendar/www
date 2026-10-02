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
  { number: "03 / INTEGRATION", title: "Your application.", text: "Connect your data, permissions, and callers. Use the headless library from application code or expose calendar operations to an agent through your own adapter.", href: "#architecture", link: "Explore the architecture", state: "Your architecture" },
];

export default function Home() {
  return (
    <div className={s.page}>
      <Nav />
      <main>
        <section className={s.hero} aria-labelledby="landing-title">
          <div className={s.wrap}>
            <div className={s.heroTop}><span className={s.eyebrow}>forceCalendar / open-source calendar library</span><a className={s.link} href="#system">Meet the system <Arrow /></a></div>
            <div className={s.heroGrid}>
              <h1 id="landing-title" className={s.title}>Time,<span>in common.</span></h1>
              <div className={s.intro}><p>Calendar infrastructure for your application.<br />A headless engine, a beautiful interface, and adapters that fit the way you build.</p><div className={s.actions}><Button href="/playground" size="lg">Try the calendar <Arrow /></Button><Button href="https://docs.forcecalendar.org" variant="secondary" size="lg">Build with it</Button></div></div>
            </div>
            <div className={s.stage}>
              <div className={s.stageLabel}><span>Real component. Real interaction.</span><span>Browser demo / sample data only</span></div>
              <div className={s.calendar}><LandingCalendar /></div>
            </div>
            <div className={s.heroNote}><span>Available today: scheduling engine, Web Components, and Salesforce integration.</span><span>Your data. Your permissions. Your application.</span></div>
          </div>
        </section>

        <div className={s.rail}><div className={s.wrap}><div className={s.railInner}><span>JavaScript <em>engine</em></span><span>Web Components <em>UI</em></span><span>React & Vue <em>adapters</em></span><span>Salesforce <em>integration</em></span><span>Headless <em>API</em></span></div></div></div>

        <section className={s.section} id="system">
          <div className={s.wrap}>
            <div className={s.sectionIntro}><p className={s.eyebrow}>01 / the foundation</p><div><h2 className={s.sectionTitle}>One model of time.<br />Room for every interface.</h2><p className={`${s.lede} mt-6`}>Start with a calendar engine. Add an interface where people need one. Let application code, integrations, or agents call the same underlying library. You own the surrounding system.</p></div></div>
            <div className={s.stack}>{layers.map(layer => <article key={layer.number} className={s.layer}><div className="flex flex-wrap justify-between gap-2"><span className={s.eyebrow}>{layer.number}</span><span className="font-mono text-[9px] uppercase tracking-wider text-accent-text">{layer.state}</span></div><h3>{layer.title}</h3><p>{layer.text}</p><a href={layer.href} className={s.link}>{layer.link} <Arrow /></a></article>)}</div>
          </div>
        </section>

        <section className={`${s.section} ${s.dark}`} id="architecture">
          <div className={s.wrap}>
            <div className={s.visionGrid}>
              <div><p className={s.eyebrow}>02 / built to be embedded</p><h2 className={s.visionTitle}>The calendar layer.<br /><span>The rest<br />is yours.</span></h2><p className={`${s.lede} mt-7`}>Give your product calendar capabilities without handing over its architecture. Use the UI, call the engine headlessly, or do both.</p></div>
              <div><p className={s.eyebrow}>Library → interface → your application</p><div className={s.trace}><div className={s.traceItem}><strong>The engine understands calendars.</strong><p>Events, recurrence, date ranges, and conflict detection through a reusable JavaScript API.</p></div><div className={s.traceItem}><strong>The interface makes them tangible.</strong><p>Views, event blocks, and editing interactions, with your application supplying the data.</p></div><div className={s.traceItem}><strong>Your application decides what happens.</strong><p>Storage, users, permissions, integrations, and agent decisions stay in your system. An agent is simply another caller of calendar tools.</p></div></div><p className={s.note}>forceCalendar provides calendar infrastructure. It does not manage projects, assign tasks, or orchestrate agents. A separate tool adapter is a private prototype and is not available as a public service.</p></div>
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
            <div className={s.sectionIntro}><p className={s.eyebrow}>04 / connected, deliberately</p><div><h2 className={s.sectionTitle}>Meet people<br />where they schedule.</h2><p className={`${s.lede} mt-6`}>Choose the surfaces and integrations your application needs. The library is available today; external account connections need their own adapters and validation.</p></div></div>
            <div className={s.connections}>
              {[{name:"Web applications",text:"Web Components, React and Vue adapters. Bring your own data layer.",status:"Available"},{name:"Salesforce",text:"Lightning components and Apex for standard Event records. Validate access and deployment in your org.",status:"Available integration"},{name:"iCalendar / ICS",text:"Core supports file import and export. This is not live account synchronization.",status:"Available"},{name:"Agent tool adapters",text:"A private prototype for exposing calendar operations to agents. Your application owns storage, identity, and authorization.",status:"In development"},{name:"Apple · Google · Microsoft",text:"Provider account connections and two-way synchronization are planned. Live integration validation is pending.",status:"Planned"}].map(item=><div key={item.name} className={s.connection}><strong>{item.name}</strong><p>{item.text}</p><span className={s.status}>{item.status}</span></div>)}
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
        <section className={s.end}><div className={`${s.wrap} ${s.endInner}`}><div><p className={s.eyebrow}>Open source / MIT</p><h2 className="mt-3">Build something worth making time for.</h2></div><Button href="https://github.com/forcecalendar" size="lg" variant="secondary">Explore the source <Arrow /></Button></div></section>
      </main>
      <Footer />
    </div>
  );
}
