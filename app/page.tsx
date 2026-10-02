import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Button, { Arrow } from "./components/Button";
import CodeBlock from "./components/CodeBlock";
import InstallCommand from "./components/InstallCommand";
import SalesforceScreenshot from "./components/SalesforceScreenshot";
import LandingCalendar from "./components/LandingCalendar";
import s from "./landing.module.css";

export default function Home() {
  return (
    <div className={s.page}>
      <Nav />
      <main>
        <section className={s.hero} aria-labelledby="landing-title">
          <div className={s.wrap}>
            <div className={s.heroTop}><span className={s.eyebrow}>forceCalendar / embedded calendar infrastructure</span><Link className={s.link} href="/salesforce">Explore Salesforce <Arrow /></Link></div>
            <div className={s.heroGrid}>
              <div><p className={s.heroKicker}>Your records have dates.<br />Give them a place to happen.</p><h1 id="landing-title" className={s.title}>Put time<br /><span>in your system.</span></h1></div>
              <div className={s.intro}><p>A calendar library for the CRM and enterprise applications you build. Bring events to life inside your product, with a headless engine, adaptable UI, and a real Salesforce integration.</p><div className={s.actions}><Button href="/playground" size="lg">Try the playground <Arrow /></Button><Button href="https://docs.forcecalendar.org" variant="secondary" size="lg">Build with it</Button></div><p className={s.versionNote}>Core 2.5.7 / Interface 1.9.0 / MIT</p></div>
            </div>
            <div className={s.stage} id="calendar-demo">
              <div className={s.stageLabel}><span>Inside your application</span><span>Interactive specimen 01 / customer appointments</span></div>
              <div className={s.appChrome}><div><span className={s.appMark}>a</span><strong>Acme CRM</strong><span className={s.appDivider}>/</span><span>Customer calendar</span></div><span className={s.sampleBadge}>Synthetic demo workspace</span></div>
              <div className={s.calendar}><LandingCalendar /></div>
              <div className={s.stageFooter}><span><i className={s.purpleDot} />Client meetings</span><span><i className={s.greenDot} />Implementation</span><span><i className={s.goldDot} />Reviews & appointments</span><span>Real component. Local data. Yours to explore.</span></div>
            </div>
            <div className={s.heroNote}><span>Built for the application around the calendar.</span><span>Data, permissions, persistence, and business rules stay in your architecture.</span></div>
          </div>
        </section>

        <div className={s.rail}><div className={s.wrap}><div className={s.railInner}><span>Salesforce <em>Lightning + Apex</em></span><span>Web Components <em>UI</em></span><span>React & Vue <em>adapters</em></span><span>JavaScript <em>headless engine</em></span><span>ICS <em>import / export</em></span></div></div></div>

        <section className={s.playgroundCallout}><div className={s.wrap}><div><p className={s.eyebrow}>Go beyond the specimen</p><h2>Make it behave like your application.</h2><p>Switch scenarios. Change the view. Create, move, and edit sample events. Inspect the configuration behind the calendar.</p></div><Button href="/playground" size="lg">Open the interactive playground <Arrow /></Button></div></section>

        <section className={s.section} id="salesforce">
          <div className={s.wrap}>
            <div className={s.salesforceHeading}><div><p className={s.eyebrow}>01 / the enterprise starting point</p><h2 className={s.sectionTitle}>At home<br /><span className={s.blueText}>in Salesforce.</span></h2></div><div><p className={s.lede}>A calendar should belong inside the system your team already uses. Connect Lightning pages to standard Salesforce Events, with Apex enforcing access at the data boundary.</p><Link className={s.link} href="/salesforce">Install & configure Salesforce <Arrow /></Link><p className={s.versionNote}>Released installer 0.3.0.1 · sandbox validation first</p></div></div>
            <div className={s.salesforceFrame}><div className={s.captureLabel}><span>Actual Salesforce Lightning capture</span><span>Synthetic sample records</span></div><SalesforceScreenshot src="/salesforce-lightning-week-clean.png" alt="Genuine Salesforce Lightning weekly calendar with synthetic appointments" caption="forceCalendar inside Salesforce Lightning. Genuine capture; sample data only." sizes="(max-width: 1200px) 100vw, 1180px" /></div>
            <div className={s.securityStrip}><div><span>01</span><h3>Lightning Web Security</h3><p>Packaged static resources and Web Components. LWS is required; legacy Lightning Locker is not supported.</p></div><div><span>02</span><h3>Access enforced in Apex</h3><p>Sharing and user-mode access apply to records and fields. The interface is not an authorization boundary.</p></div><div><span>03</span><h3>Your org, deliberately configured</h3><p>Assign controller access, configure Event permissions, and validate your org’s rules before rollout.</p></div></div>
            <p className={s.compatibility}>The screenshot demonstrates the interface, not package installation or live data-access verification. <a href="https://developer.salesforce.com/docs/platform/lwc/guide/create-use-custom-elements.html">Read Salesforce’s official custom-element compatibility guidance <Arrow /></a></p>
          </div>
        </section>

        <section className={`${s.section} ${s.dark}`} id="system">
          <div className={s.wrap}>
            <div className={s.sectionIntro}><p className={s.eyebrow}>02 / designed to fit</p><div><h2 className={s.sectionTitle}>A calendar layer.<br />Not another place to work.</h2><p className={`${s.lede} mt-6`}>Embed scheduling where the context already lives: customers, appointments, classrooms, and internal tools. Your application decides what an event means.</p></div></div>
            <div className={s.blueprint}>
              <div className={s.blueprintTop}><span>Your application</span><span>Records · identity · permissions · storage</span></div>
              <div className={s.blueprintBody}><div><span className={s.eyebrow}>Interface</span><h3>Make time visible.</h3><p>Month, week, and day views. Event editing. Web Components, React, and Vue.</p><Link className={s.link} href="/interface">Explore Interface <Arrow /></Link></div><div className={s.blueprintJoin} aria-hidden="true">↕</div><div><span className={s.eyebrow}>Core</span><h3>Make time useful.</h3><p>Events, recurrence, conflict detection, search, and ICS. A headless engine with no runtime dependencies.</p><Link className={s.link} href="/core">Explore Core <Arrow /></Link></div></div>
              <div className={s.blueprintBottom}><span>Application code</span><span>Salesforce adapter</span><span>Custom integration</span><span>Optional agent caller</span></div>
            </div>
          </div>
        </section>

        <section className={s.section} id="possibilities">
          <div className={s.wrap}>
            <div className={s.sectionIntro}><p className={s.eyebrow}>03 / your domain, on the calendar</p><div><h2 className={s.sectionTitle}>One library.<br />A different day everywhere.</h2><p className={`${s.lede} mt-6`}>These are application patterns you can build with the library. Salesforce has a ready integration; other systems need your data adapter and domain rules.</p></div></div>
            <div className={s.useCases}>{[{n:"01",title:"Customer relationships",text:"Discovery calls, account reviews, and onboarding appointments beside the customer record.",events:["Northstar · discovery", "Meridian · account review", "Acme · onboarding"],tone:"purple"},{n:"02",title:"Education & appointments",text:"Office hours, admissions interviews, and workshops inside your own student or client portal.",events:["Admissions interview", "Faculty office hours", "Research workshop"],tone:"green"},{n:"03",title:"Teams & shared resources",text:"Display room, equipment, or staff schedules. Your app supplies resource policies and booking validation.",events:["Studio A · consultation", "Lab 2 · orientation", "Team room · review"],tone:"gold"}].map(item=><article className={s.useCase} key={item.n}><p className={s.eyebrow}>{item.n} / example application</p><div className={`${s.miniSchedule} ${s[item.tone]}`} aria-hidden="true">{item.events.map((event,i)=><div key={event} style={{marginLeft:`${i*12}%`,width:`${88-i*8}%`}}><span>{['09:00','10:30','13:00'][i]}</span>{event}</div>)}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
        </section>

        <section className={`${s.section} ${s.developerSection}`} id="build">
          <div className={s.wrap}><div className={s.build}>
            <div><p className={s.eyebrow}>04 / from package to product</p><h2 className={s.sectionTitle}>Bring the records.<br />We’ll bring the calendar.</h2><p className={`${s.lede} mb-6`}>Mount the component and supply your events. Keep persistence, access checks, and business logic in your application.</p><InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" /><div className="mt-6 flex flex-wrap gap-5"><Link className={s.link} href="/playground">Open playground <Arrow /></Link><a className={s.link} href="https://docs.forcecalendar.org">Read documentation <Arrow /></a></div></div>
            <CodeBlock filename="your-application.js" code={`import '@forcecalendar/interface';

const calendar = document.createElement('forcecal-main');
calendar.setAttribute('view', 'week');
document.querySelector('#customer-calendar').append(calendar);

// Load records through your authorized data layer.
calendar.setEvents(customerAppointments);

// Real operations. Your application owns persistence.
calendar.addEvent(appointment);
calendar.updateEvent(appointment.id, newTime);`} />
          </div><div className={s.headlessAside}><span className={s.eyebrow}>Also works without a screen</span><div><h3>Headless by design. Agent-accessible by choice.</h3><p>Application code or an agent can call the calendar engine through your adapter. Your application decides access and when calls run. A separate scoped-tool adapter is a private prototype, not a public hosted service. forceCalendar does not assign tasks or orchestrate agents.</p></div></div></div>
        </section>

        <section className={s.section} id="engineering"><div className={s.wrap}><div className={s.evidence}><div><p className={s.eyebrow}>Engineering, in the open</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">Inspect the foundation.</h2><p>Open source under MIT. Review the actual versions, tests, and measured workloads before choosing it for your system.</p></div><div><h3>Security & dependency review</h3><p>Published results identify their scope. An npm advisory scan is not a penetration test or a security guarantee.</p><a className={s.link} href="https://audit.forcecalendar.org">Read the audit <Arrow /></a></div><div><h3>Reproducible benchmarks</h3><p>Compare the workloads that matter to your application. Package size and runtime performance are different measurements.</p><a className={s.link} href="https://benchmark.forcecalendar.org">Explore benchmarks <Arrow /></a></div></div><p className={s.compatibility}>Available: JavaScript engine, UI components, Salesforce integration, and ICS file handling. Apple, Google, and Microsoft live account connections and two-way synchronization are not shipped. ICS import/export is not live account synchronization.</p></div></section>
        <section className={s.end}><div className={`${s.wrap} ${s.endInner}`}><div><p className={s.eyebrow}>Inside your system. On your terms.</p><h2 className="mt-3">Make room for a better calendar.</h2></div><Button href="/salesforce" size="lg">Start with Salesforce <Arrow /></Button></div></section>
      </main>
      <Footer />
    </div>
  );
}
