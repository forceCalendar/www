import Link from "next/link";
import Image from "next/image";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CodeBlock from "./components/CodeBlock";
import InstallCommand from "./components/InstallCommand";

const codeExample = `import { Calendar } from '@forcecalendar/core';
import '@forcecalendar/interface';

const calendar = new Calendar({
  locale: 'en-US',
  timezone: 'America/New_York'
});

// That's it. <forcecal-main> is ready to use.`;

const constraints = [
  {
    constraint: "Salesforce Locker Service",
    typical:
      "Relies on eval, dynamic Function constructors, or prototype manipulation. Locker blocks these, so the component fails to load.",
    forcecal: "Locker-safe patterns only. No blocked APIs, no runtime code generation.",
  },
  {
    constraint: "Strict Content Security Policy",
    typical:
      "Injects inline styles or generates CSS at runtime. Under a strict CSP this fails, usually silently.",
    forcecal: "External stylesheets and CSS custom properties. Nothing injected.",
  },
  {
    constraint: "Security & supply-chain review",
    typical:
      "Ships 50+ transitive dependencies. Every one is an audit item and an ongoing supply-chain risk.",
    forcecal: "Zero dependencies. One package to audit, one license to approve.",
  },
];

const packages = [
  {
    name: "@forcecalendar/core",
    href: "/core",
    role: "Headless engine",
    desc: "Events, recurrence (RFC 5545), timezones, conflicts, search. No DOM, no dependencies. Usable on its own in any runtime.",
  },
  {
    name: "@forcecalendar/interface",
    href: "/interface",
    role: "Web Components",
    desc: "Month, week, and day views as standard custom elements. Shadow DOM encapsulated, themed with CSS variables. Works in React, Vue, Angular, or plain HTML.",
  },
  {
    name: "forceCalendar for Salesforce",
    href: "/salesforce",
    role: "LWC package",
    desc: "Unlocked package: Lightning Web Components, Apex controller, and both libraries bundled as a static resource. One-click install.",
  },
];

const capabilities = [
  {
    term: "Recurrence rules",
    desc: "RFC 5545 RRULE support with exceptions, overrides, and timezone-aware expansion for complex enterprise schedules.",
  },
  {
    term: "Timezone handling",
    desc: "Full IANA timezone database with automatic daylight-saving transitions and cross-timezone conversion.",
  },
  {
    term: "ICS import / export",
    desc: "iCalendar file support for interoperability with Outlook, Google Calendar, and existing enterprise systems.",
  },
  {
    term: "Conflict detection",
    desc: "Spatial indexing for fast overlap detection across large event sets, including attendee and resource conflicts.",
  },
  {
    term: "Full-text search",
    desc: "Built-in search engine with fuzzy matching across event titles, descriptions, and custom fields.",
  },
  {
    term: "CSS theming",
    desc: "35+ CSS custom properties for complete visual control without touching JavaScript or Shadow DOM internals.",
  },
];

interface CoreInfo {
  version: string;
  downloads: string;
}

async function getCoreInfo(): Promise<CoreInfo> {
  // Live version and total downloads since first publish (2025-12-27),
  // refreshed daily; static fallbacks keep the build independent of npm
  const fallback: CoreInfo = { version: "2.1.x", downloads: "9,000+" };
  try {
    const today = new Date().toISOString().slice(0, 10);
    const [metaRes, dlRes] = await Promise.all([
      fetch("https://registry.npmjs.org/@forcecalendar/core/latest", {
        next: { revalidate: 86400 },
      }),
      fetch(
        `https://api.npmjs.org/downloads/range/2025-12-01:${today}/@forcecalendar/core`,
        { next: { revalidate: 86400 } }
      ),
    ]);
    if (!metaRes.ok || !dlRes.ok) return fallback;
    const meta: { version?: string } = await metaRes.json();
    const dl: { downloads: { downloads: number }[] } = await dlRes.json();
    const total = dl.downloads.reduce((sum, d) => sum + d.downloads, 0);
    return {
      version: meta.version ? `v${meta.version}` : fallback.version,
      downloads: total > 0 ? total.toLocaleString("en-US") : fallback.downloads,
    };
  } catch {
    return fallback;
  }
}

export default async function Home() {
  const core = await getCoreInfo();
  const specs = [
    { label: "Latest release", value: core.version },
    { label: "npm downloads", value: core.downloads },
    { label: "Runtime dependencies", value: "0" },
    { label: "Bundle (core + interface)", value: "1.04 MB" },
    { label: "License", value: "MIT" },
  ];

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                Calendar infrastructure for strict enterprise environments.
              </h1>
              <p className="mt-5 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                A headless scheduling engine and framework-agnostic Web
                Components. Zero dependencies. Built for Salesforce Locker
                Service and strict CSP: the places where other calendar
                libraries break.
              </p>
              <div className="mt-8">
                <InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                <a
                  href="https://docs.forcecalendar.org"
                  className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4"
                >
                  Documentation
                </a>
                <Link
                  href="/salesforce"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Install on Salesforce
                </Link>
                <a
                  href="https://github.com/forcecalendar"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <Link
                  href="/playground"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Playground
                </Link>
              </div>
            </div>
            <div>
              <CodeBlock code={codeExample} filename="app.js" language="JavaScript" />
              <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                The complete setup. No plugins, no build configuration, no API keys.
              </p>
            </div>
          </div>
        </div>

        {/* Spec strip */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-slate-200 dark:divide-slate-800 [&>div]:px-5 [&>div]:py-4 [&>div:first-child]:pl-0">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs text-slate-400 dark:text-slate-500">{spec.label}</dt>
                  <dd className="mt-0.5 font-mono text-sm font-medium text-slate-900 dark:text-white">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Plain words + diagram */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 id="what" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white scroll-mt-24 mb-12">
            What forceCalendar is
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Explainer */}
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                  A calendar you can put inside your own product
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Month, week, and day views with events, recurring schedules,
                  timezones, and search. You install two packages, add one HTML
                  tag, and connect your data. It is not a hosted service. The
                  code runs entirely inside your application.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                  Built for places where most JavaScript is not allowed
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Large companies restrict what code on their pages may do. A
                  Content Security Policy (CSP) is a browser rule set that, for
                  example, forbids generating code at runtime or injecting
                  styles. Salesforce goes further with Locker Service, a sandbox
                  around every component. Most calendar libraries rely on
                  exactly the techniques these rules block, so they break, often
                  silently.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                  Why it exists
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  forceCalendar was written from scratch to work under those
                  rules: no blocked techniques, no third-party code to audit, one
                  MIT license. If your security team has ever rejected a
                  JavaScript library, this is the calendar they will approve.
                </p>
              </div>
            </div>

            {/* Layer diagram */}
            <div aria-label="Architecture diagram: your application uses @forcecalendar/interface, which is powered by @forcecalendar/core">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Your application
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Salesforce LWC &middot; React &middot; Vue &middot; Angular &middot; plain HTML
                </p>
              </div>
              <div className="flex items-center gap-3 py-2 pl-8">
                <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" aria-hidden />
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  drops in the <code className="font-mono">&lt;forcecal-main&gt;</code> tag
                </span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
                <div className="text-xs font-mono font-medium uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1.5">
                  @forcecalendar/interface
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  The visible calendar: month, week, and day views as standard
                  Web Components, themed with CSS variables.
                </p>
              </div>
              <div className="flex items-center gap-3 py-2 pl-8">
                <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" aria-hidden />
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  asks the engine what to display
                </span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
                <div className="text-xs font-mono font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-1.5">
                  @forcecalendar/core
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  The engine: stores events, expands recurring schedules,
                  handles timezones, finds conflicts, and searches. No UI, no
                  dependencies; usable on its own.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constraints comparison */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 id="why" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white scroll-mt-24 mb-3">
            Where calendar libraries fail enterprise review
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl">
            Three constraints come up in every enterprise deployment. How a
            typical calendar library handles them, and how forceCalendar does.
          </p>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-left">
                    <th className="py-3 px-5 font-medium text-slate-500 w-[22%]">Constraint</th>
                    <th className="py-3 px-5 font-medium text-slate-500 w-[39%]">Typical calendar library</th>
                    <th className="py-3 px-5 font-medium text-slate-500 w-[39%]">forceCalendar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {constraints.map((row) => (
                    <tr key={row.constraint} className="align-top">
                      <td className="py-4 px-5 font-medium text-slate-900 dark:text-white">
                        {row.constraint}
                      </td>
                      <td className="py-4 px-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                        {row.typical}
                      </td>
                      <td className="py-4 px-5 text-slate-700 dark:text-slate-300 leading-relaxed">
                        {row.forcecal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Salesforce, in production */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 id="salesforce" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white scroll-mt-24 mb-3">
            Running inside Salesforce
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl">
            The flagship integration: a Lightning Web Component reading real
            org data through Apex, fully Locker Service compliant. Month, week,
            and day views included.
          </p>
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm">
            <Image
              src="/salesforce-month.png"
              alt="forceCalendar month view running inside a Salesforce org, showing colorful events across February 2026"
              width={1388}
              height={860}
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm">
              <Image
                src="/salesforce-week.png"
                alt="forceCalendar week view inside Salesforce showing timed events"
                width={1388}
                height={860}
                className="w-full h-auto"
              />
              <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Week view</p>
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
              <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Day view</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/salesforce" className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium">
              Install the unlocked package
            </Link>
            . Sandbox first, then production. No code required.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 id="architecture" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white scroll-mt-24 mb-12">
            The packages
          </h2>
          <div className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
            {packages.map((pkg) => (
              <Link
                key={pkg.name}
                href={pkg.href}
                className="group grid sm:grid-cols-[280px,1fr,auto] gap-2 sm:gap-8 items-baseline py-5 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors px-2 -mx-2"
              >
                <div>
                  <div className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                    {pkg.name}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{pkg.role}</div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {pkg.desc}
                </p>
                <span className="hidden sm:block text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" aria-hidden>
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 id="features" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white scroll-mt-24 mb-12">
            Capabilities
          </h2>
          <dl className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
            {capabilities.map((cap) => (
              <div key={cap.term} className="grid grid-cols-[10rem,1fr] gap-4">
                <dt className="text-sm font-medium text-slate-900 dark:text-white">
                  {cap.term}
                </dt>
                <dd className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cap.desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="py-20 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 id="benchmarks" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white scroll-mt-24 mb-3">
            Measured against FullCalendar
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl">
            Independent benchmarks against an excellent, widely-used library.
            forceCalendar exists for a different niche: environments where most
            calendar libraries cannot run. Both results published, including the
            one we lose.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <h3 className="font-medium text-slate-900 dark:text-white mb-5">Bundle size</h3>
              <div className="space-y-4 mb-5">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">forceCalendar <span className="text-xs text-slate-400 dark:text-slate-500">(core + interface)</span></span>
                    <span className="font-mono font-medium text-slate-900 dark:text-white">1.04 MB</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-brand-600 dark:bg-brand-400" style={{ width: "35%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">FullCalendar <span className="text-xs text-slate-400 dark:text-slate-500">(core + 5 plugins + rrule)</span></span>
                    <span className="font-mono font-medium text-slate-900 dark:text-white">3.01 MB</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-slate-300 dark:bg-slate-600" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                2.9x smaller total bundle. Fewer bytes to audit, fewer bytes to
                ship behind corporate firewalls.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <h3 className="font-medium text-slate-900 dark:text-white mb-5">Recurrence expansion (RRULE)</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                The dedicated <span className="font-mono text-xs">rrule</span> library
                is significantly faster than forceCalendar&rsquo;s built-in
                RecurrenceEngine at expanding recurrence rules: 17x to 1000x
                depending on pattern complexity.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                The trade-off: forceCalendar&rsquo;s recurrence is built in with
                zero extra dependencies. For calendars with moderate recurrence
                it is fast enough; for heavy RRULE workloads, a dedicated
                library wins.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
            Run weekly against published npm packages.{" "}
            <a
              href="https://benchmark.forcecalendar.org"
              className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium"
            >
              Full methodology and interactive results
            </a>
            .
          </p>
        </div>
      </section>

      {/* Get started */}
      <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Get started
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Two packages, one tag.{" "}
                <a
                  href="https://docs.forcecalendar.org"
                  className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4"
                >
                  Read the documentation
                </a>{" "}
                or try the{" "}
                <Link
                  href="/playground"
                  className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4"
                >
                  playground
                </Link>
                .
              </p>
            </div>
            <InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
