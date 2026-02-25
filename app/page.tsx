import Link from "next/link";
import Image from "next/image";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SectionHeader from "./components/SectionHeader";
import FeatureCard from "./components/FeatureCard";
import PackageCard from "./components/PackageCard";
import CodeBlock from "./components/CodeBlock";
import InstallCommand from "./components/InstallCommand";

const problems = [
  {
    title: "Locker Service",
    problem: "Most calendar libraries use blocked JavaScript patterns — eval, dynamic Function constructors, prototype manipulation — that Locker Service prohibits.",
    solution: "forceCalendar uses only Locker-safe patterns. No blocked APIs, no runtime code generation.",
  },
  {
    title: "Strict CSP",
    problem: "Content Security Policy blocks inline styles, eval, and unsafe-inline. Calendar libraries that inject CSS or generate styles at runtime fail silently.",
    solution: "All styling uses CSS custom properties and external stylesheets. No inline style injection.",
  },
  {
    title: "Security Reviews",
    problem: "Enterprise security teams audit every dependency. A library with 50+ transitive dependencies creates weeks of review work and ongoing supply chain risk.",
    solution: "Zero dependencies means zero supply chain risk. One package to audit, one license to approve.",
  },
];

const codeExample = `import { Calendar } from '@forcecalendar/core';
import '@forcecalendar/interface';

const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York'
});

// That's it. <forcecal-main> is ready to use.`;

const features = [
  {
    title: "Recurrence Rules",
    description: "RFC 5545 RRULE support with exceptions, overrides, and timezone-aware expansion for complex enterprise schedules.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
  },
  {
    title: "Timezone Support",
    description: "Full IANA timezone database with automatic daylight-saving transitions and cross-timezone conversion.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "ICS Import / Export",
    description: "iCalendar file support for interoperability with Outlook, Google Calendar, and existing enterprise systems.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Conflict Detection",
    description: "Spatial indexing enables fast overlap detection across large event sets without scanning every event.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Full-Text Search",
    description: "Built-in search engine with fuzzy matching across event titles, descriptions, and custom fields.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "CSS Theming",
    description: "35+ CSS custom properties for complete visual control without touching JavaScript or Shadow DOM internals.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
            Calendar infrastructure for strict enterprise environments.
          </h1>
          <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Headless scheduling engine plus framework-agnostic Web Components.
            Zero dependencies. Built for Salesforce Locker Service and strict CSP.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg50000003qOfAAI"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
              Install on Salesforce
            </a>
            <a
              href="https://github.com/forcecalendar"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://docs.forcecalendar.org"
              className="inline-flex items-center px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </section>


      {/* The Problem */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="The problem with calendar libraries in enterprise"
            id="why"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
              >
                <h3 className="font-medium text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {item.problem}
                </p>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salesforce Showcase */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Started with Salesforce"
            subtitle="Most calendar libraries break inside Locker Service — that's where forceCalendar started. The same zero-dependency architecture works in any strict enterprise environment."
            id="salesforce"
          />
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm">
            <div className="relative">
              <Image
                src="/salesforce-month.png"
                alt="forceCalendar month view running inside a Salesforce org, showing colorful events across February 2026"
                width={1388}
                height={860}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-800">
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-1 text-sm">
                    Native LWC Integration
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Runs as a Lightning Web Component. Uses real Salesforce data through Apex, not external APIs.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-1 text-sm">
                    Locker Service Safe
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Zero blocked API calls. No eval, no dynamic Function constructors, no prototype manipulation.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-1 text-sm">
                    All Views Included
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Month, week, and day views with event creation, color coding, and full navigation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm">
              <Image
                src="/salesforce-week.png"
                alt="forceCalendar week view inside Salesforce showing timed events"
                width={1388}
                height={860}
                className="w-full h-auto"
              />
              <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Week view with timed events</p>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm">
              <Image
                src="/salesforce-day.png"
                alt="forceCalendar day view inside Salesforce showing detailed event blocks"
                width={1388}
                height={860}
                className="w-full h-auto"
              />
              <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Day view with event details</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Platform */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Enterprise calendar infrastructure"
            subtitle="Salesforce is the flagship integration. The same architecture works anywhere strict security is required."
            id="enterprise"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-500/5">
              <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">Salesforce</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Shipping now. LWC + Apex with full Locker Service compliance.</p>
            </div>
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">Any Web App</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Web Components work in React, Vue, Angular, or vanilla JS.</p>
            </div>
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">Strict CSP</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">No eval, no inline styles. Works behind the strictest policies.</p>
            </div>
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">Air-Gapped</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Zero external requests. Runs fully offline with no CDN dependencies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Two packages, one architecture"
            subtitle="Use Core for scheduling logic and Interface for production-ready UI components."
            id="architecture"
          />
          <div className="mb-10 inline-flex items-center px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 font-mono">
            @forcecalendar/core
            <span className="mx-3 text-slate-300 dark:text-slate-600">&rarr;</span>
            @forcecalendar/interface
            <span className="mx-3 text-slate-300 dark:text-slate-600">&rarr;</span>
            Salesforce LWC
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <PackageCard
              href="/core"
              label="Core Engine"
              name="@forcecalendar/core"
              description="Pure JavaScript scheduling engine. No DOM, no dependencies. Headless calendar logic for any runtime."
              accentClass="text-violet-600 dark:text-violet-400"
            />
            <PackageCard
              href="/interface"
              label="UI Components"
              name="@forcecalendar/interface"
              description="Web Components powered by Core. Framework-agnostic, Shadow DOM encapsulated. Works in React, Vue, Angular, or vanilla JS."
              accentClass="text-cyan-600 dark:text-cyan-400"
            />
            <div className="block p-6 rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50/30 dark:bg-brand-500/5">
              <div className="text-xs font-mono uppercase tracking-wider mb-3 text-brand-600 dark:text-brand-400">
                Salesforce Integration
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Lightning Web Component</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Built on top of both packages. Loads as a static resource, connects to Salesforce data through Apex. Locker Service safe.
              </p>
              <a href="#salesforce" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
                See it running &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Five lines to a working calendar"
            id="code"
          />
          <CodeBlock code={codeExample} filename="app.js" language="JavaScript" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="What&rsquo;s included" id="features" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
