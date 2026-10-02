import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Section from "./components/Section";
import SectionHeader from "./components/SectionHeader";
import Eyebrow from "./components/Eyebrow";
import Button, { Arrow, ExternalIcon } from "./components/Button";
import Card, { IconWell } from "./components/Card";
import { StatRow, StatTile } from "./components/StatTile";
import CodeBlock from "./components/CodeBlock";
import InstallCommand from "./components/InstallCommand";
import SalesforceScreenshot from "./components/SalesforceScreenshot";

const problems = [
  {
    title: "Salesforce data",
    problem: "A useful calendar needs to work with your team's records and access rules.",
    solution: "The LWC connects to standard Salesforce Event records through Apex. Start with a sandbox and test as the users who will use it.",
  },
  {
    title: "Platform fit",
    problem: "Your org's Lightning security settings and browser policies shape how embedded components run.",
    solution: "The integration bundles the calendar as a Salesforce static resource. Validate rendering and event actions under your org's settings.",
  },
  {
    title: "Reviewable source",
    problem: "Security review includes application code, build tooling, dependencies, and the way you deploy.",
    solution: "Core has no runtime dependencies; Interface uses Core as its peer dependency. Both are MIT licensed and available for review.",
  },
];

const NPM_PACKAGES = ["core", "interface", "react", "vue"];

const SPARK_WEEKS = 12;

// Installed (unpacked) package sizes from the committed benchmark run
// (results/latest.json in the benchmark repo): @forcecalendar/core + interface
// versus @fullcalendar/core + 4 plugins + rrule. Every figure in the benchmark
// section derives from these two numbers so the copy cannot drift from them.
const BENCHMARK_RESULTS_URL =
  "https://github.com/forceCalendar/benchmark/blob/e2977db34a65974478114cc54248980457b343f0/results/latest.json";
const BUNDLE_BYTES = { forceCalendar: 1_226_109, fullCalendar: 3_098_735 };
const bundleRatio = `${(BUNDLE_BYTES.fullCalendar / BUNDLE_BYTES.forceCalendar).toFixed(1)}x`;
const bundleShare = `${Math.round((BUNDLE_BYTES.forceCalendar / BUNDLE_BYTES.fullCalendar) * 100)}%`;
const formatMB = (bytes: number) => `${(bytes / 1_000_000).toFixed(2)} MB`;

// Downloads across all @forcecalendar packages since first publish
// (2025-12-27); refreshed hourly. Returns the total plus a weekly series
// for the sparkline, or null when the API is unreachable so the caller
// can swap in a stat that cannot go stale.
async function getTotalDownloads(): Promise<{ total: string; weekly: number[] } | null> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const byDate = new Map<string, number>();
    await Promise.all(
      NPM_PACKAGES.map(async (pkg) => {
        const res = await fetch(
          `https://api.npmjs.org/downloads/range/2025-12-01:${today}/@forcecalendar/${pkg}`,
          { next: { revalidate: 3600 } }
        );
        if (!res.ok) return;
        const data: { downloads: { downloads: number; day: string }[] } = await res.json();
        for (const d of data.downloads) {
          byDate.set(d.day, (byDate.get(d.day) ?? 0) + d.downloads);
        }
      })
    );
    const days = [...byDate.keys()].sort();
    const total = days.reduce((sum, d) => sum + (byDate.get(d) ?? 0), 0);
    if (total === 0) return null;
    // Whole 7-day buckets ending at the most recent reported day
    const weekly: number[] = [];
    for (let end = days.length; end - 7 >= 0 && weekly.length < SPARK_WEEKS; end -= 7) {
      weekly.unshift(days.slice(end - 7, end).reduce((s, d) => s + (byDate.get(d) ?? 0), 0));
    }
    return { total: total.toLocaleString("en-US"), weekly };
  } catch {
    return null;
  }
}

// Single-series sparkline: 2px line, no axes, endpoint dot. Stroke uses the
// accent text token, which is contrast-validated on both surfaces.
function Sparkline({ points, label }: { points: number[]; label: string }) {
  if (points.length < 2) return null;
  const w = 96;
  const h = 24;
  const pad = 3;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const coords = points.map((v, i) => [
    pad + (i * (w - pad * 2)) / (points.length - 1),
    pad + (h - pad * 2) * (1 - (v - min) / span),
  ]);
  const [lastX, lastY] = coords[coords.length - 1];
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      role="img"
      aria-label={label}
      className="mx-auto mt-2 text-accent-text"
    >
      <polyline
        points={coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX.toFixed(1)} cy={lastY.toFixed(1)} r="2.5" fill="currentColor" />
    </svg>
  );
}

const codeExample = `import '@forcecalendar/interface';

const calendar = document.createElement('forcecal-main');
calendar.setAttribute('view', 'month');
document.querySelector('#calendar').appendChild(calendar);

// In your HTML: <div id="calendar"></div>
// Load your data with calendar.setEvents(events).`;

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
    description: "IANA timezone support through the runtime’s Intl API, including daylight-saving transitions.",
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
    title: "Keyboard Navigation",
    description: "Calendar views include keyboard navigation and ARIA semantics. Validate accessibility in your application and with your users.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Server-Side & Edge",
    description: "The DOM-free engine runs in Node, serverless functions, and edge runtimes like Cloudflare Workers that ban eval.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "CSS Theming",
    description: "45+ CSS custom properties for complete visual control without touching JavaScript or Shadow DOM internals.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
  },
];

const platformTiles = [
  {
    title: "Salesforce",
    text: "LWC + Apex for standard Event records. Follow the sandbox installation and configuration guide.",
    accent: true,
    path: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    title: "Any Web App",
    text: "Web Components work in React, Vue, Angular, or vanilla JS, with first-party SSR-safe adapters for React and Vue.",
    path: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418",
  },
  {
    title: "Reviewable code",
    text: "MIT-licensed source with no eval-based code generation. Validate the UI against your application’s CSP.",
    path: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    title: "Self-hosted assets",
    text: "Bundle the calendar with your application. Your integration controls where event data is stored and loaded.",
    path: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
  },
];

const salesforceSetupSteps = [
  {
    title: "1. Review the sandbox install",
    text: "Check the package and target org, or deploy the source revision you want to validate.",
    href: "/salesforce#install",
  },
  {
    title: "2. Configure your Lightning page",
    text: "Add the component in App Builder and choose the view, height, and intended users.",
    href: "/salesforce#configuration",
  },
  {
    title: "3. Validate access and event actions",
    text: "Test standard Events as a pilot user before rolling out the version you reviewed.",
    href: "/salesforce#prerequisites",
  },
];

export default async function Home() {
  const downloads = await getTotalDownloads();
  const stats = [
    { value: "0", label: "Core runtime dependencies" },
    downloads
      ? { value: downloads.total, label: "npm downloads", spark: downloads.weekly }
      : { value: String(NPM_PACKAGES.length), label: "Packages on npm" },
    { value: "3", label: "Calendar views" },
    { value: "45+", label: "CSS theming tokens" },
  ];

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="relative mx-auto max-w-page px-6 pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="animate-fade-up">
                <Eyebrow pill>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  Open-source calendar &middot; MIT
                </Eyebrow>
              </div>
              <h1 className="mt-6 font-display text-display-lg sm:text-display-xl text-fg animate-fade-up [animation-delay:60ms]">
                Calendar infrastructure for your applications.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted animate-fade-up [animation-delay:120ms]">
                A headless scheduling engine and framework-neutral Web Components.
                Bring month, week, and day views to your application, with a ready-to-integrate
                LWC and Apex distribution for Salesforce.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:240ms]">
                <Button href="/salesforce" size="lg">
                  Set up Salesforce
                  <Arrow />
                </Button>
                <Button href="/playground" variant="secondary" size="lg">
                  Try the live calendar
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm animate-fade-up [animation-delay:300ms]">
                <Link href="/interface" className="group text-muted transition-colors hover:text-fg">
                  Explore the components <Arrow />
                </Link>
                <a href="https://docs.forcecalendar.org" className="group text-muted transition-colors hover:text-fg">
                  Documentation <Arrow />
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted animate-fade-up [animation-delay:360ms]" aria-label="Highlights">
                {["Framework-neutral", "MIT licensed", "Salesforce integration", "Month / week / day"].map(chip => (
                  <li key={chip} className="rounded-full bg-raised px-2.5 py-1 ring-1 ring-inset ring-hairline">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="bg-hero-mesh relative rounded-2xl p-3 ring-1 ring-hairline sm:p-5 lg:-mr-6 xl:-mr-16 animate-fade-up [animation-delay:200ms]">
                <SalesforceScreenshot
                  src="/salesforce-lightning-month-clean.png"
                  alt="ForceCalendar running in Salesforce Lightning, displaying synthetic sample events in month view"
                  caption="Inside Salesforce Lightning · sample-data demo"
                  sizes="(max-width: 1024px) 100vw, 740px"
                />
              </div>
            </div>
          </div>

          {/* Facts strip */}
          <div className="mt-14 lg:mt-16">
            <StatRow>
              {stats.map((stat) => (
                <StatTile key={stat.label} value={stat.value} label={stat.label}>
                  {"spark" in stat && stat.spark && (
                    <Sparkline
                      points={stat.spark}
                      label={`Weekly npm downloads, last ${stat.spark.length} weeks`}
                    />
                  )}
                </StatTile>
              ))}
            </StatRow>
          </div>
        </div>
      </section>

      {/* Plain words */}
      <Section width="wide" divider>
        <SectionHeader
          eyebrow="In plain words"
          title="What forceCalendar is"
          id="what"
        />
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Explainer */}
          <div className="divide-y divide-hairline">
            <div className="pb-7">
              <h3 className="mb-2 text-base font-semibold text-fg">
                A calendar for your Lightning pages
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Add the Force Calendar component to an App, Home, or Record page.
                The Salesforce integration reads and manages standard Event records
                through Apex. Start with the sample-data demo, then configure access
                and test your own event workflow in a sandbox.
              </p>
            </div>
            <div className="py-7">
              <h3 className="mb-2 text-base font-semibold text-fg">
                A clear starting point for your team
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Choose a default view and calendar height in Lightning App Builder.
                Check the settings against your installed version and use Salesforce
                permissions to control data access. Custom objects, resource booking, and native
                Salesforce recurring-series editing need additional integration.
              </p>
            </div>
            <div className="pt-7">
              <h3 className="mb-2 text-base font-semibold text-fg">
                Packages for developers, too
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                The same calendar is available as a headless JavaScript engine and
                Web Components for your own application. Core has no runtime
                dependencies; Interface uses Core as a peer dependency. Your team
                can inspect the MIT-licensed source and review it for your environment.
              </p>
            </div>
          </div>

          {/* Layer diagram */}
          <div
            className="rounded-2xl bg-sunken p-4 ring-1 ring-hairline sm:p-5"
            aria-label="Architecture diagram: your application uses @forcecalendar/interface, which is powered by @forcecalendar/core"
          >
            <Card tone="default" padding="sm" interactive={false} className="sm:p-5">
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
                Your application
              </div>
              <p className="text-sm text-fg">
                Salesforce LWC &middot; React &middot; Vue &middot; Angular &middot; plain HTML
              </p>
            </Card>
            <div className="flex items-center gap-3 py-1.5 pl-8">
              <div className="h-8 w-px bg-line" aria-hidden />
              <span className="text-xs text-muted">
                drops in the <code className="font-mono text-accent-text">&lt;forcecal-main&gt;</code> tag
              </span>
            </div>
            <Card tone="accent" padding="sm" interactive={false} className="sm:p-5">
              <div className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-text">
                @forcecalendar/interface
              </div>
              <p className="text-sm text-fg">
                The visible calendar: month, week, and day views as standard
                Web Components, themed with CSS variables.
              </p>
            </Card>
            <div className="flex items-center gap-3 py-1.5 pl-8">
              <div className="h-8 w-px bg-line" aria-hidden />
              <span className="text-xs text-muted">
                asks the engine what to display
              </span>
            </div>
            <div className="rounded-xl bg-code-bg p-4 text-code-fg ring-1 ring-code-border sm:p-5">
              <div className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-300">
                @forcecalendar/core
              </div>
              <p className="text-sm text-code-fg/90">
                The engine: stores events, expands recurring schedules,
                handles timezones, finds conflicts, and searches. No UI, no runtime
                dependencies; usable on its own.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* The Problem */}
      <Section width="wide" divider>
        <SectionHeader
          eyebrow="Why forceCalendar"
          title="Built for application teams"
          id="why"
        />
        <div className="grid gap-px overflow-hidden rounded-2xl bg-hairline ring-1 ring-hairline md:grid-cols-3">
          {problems.map((item, i) => (
            <div key={item.title} className="bg-raised p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs tabular text-subtle">0{i + 1}</span>
                <h3 className="text-base font-semibold text-fg">{item.title}</h3>
              </div>
              <div className="mb-4 flex gap-2.5">
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" aria-hidden />
                <p className="text-sm leading-relaxed text-muted">
                  {item.problem}
                </p>
              </div>
              <div className="flex gap-2.5 border-t border-hairline pt-4">
                <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
                <p className="text-sm leading-relaxed text-fg">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Salesforce Showcase */}
      <Section width="wide" tone="sunken">
        <SectionHeader
          eyebrow="Flagship integration"
          title="See the Salesforce demo"
          subtitle="Real Salesforce Lightning captures of the demo with synthetic sample events. These show the interface, not live Event records or verification of the install package."
          id="salesforce"
          aside={
            <Link href="/salesforce" className="group inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
              Install on Salesforce <Arrow />
            </Link>
          }
        />
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          <span className="rounded-full bg-raised px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ring-1 ring-inset ring-hairline">Lightning Experience</span>
          <span>Synthetic demo data</span>
          <span>Captured October 2026</span>
        </div>
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SalesforceScreenshot
              src="/salesforce-lightning-month-clean.png"
              alt="ForceCalendar Demo in Salesforce Lightning showing synthetic sample events in October 2026 month view"
              caption="Month view"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <SalesforceScreenshot
              src="/salesforce-lightning-week-clean.png"
              alt="ForceCalendar Demo in Salesforce Lightning showing timed and all-day synthetic sample events in week view"
              caption="Week view"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
            <SalesforceScreenshot
              src="/salesforce-lightning-day-clean.png"
              alt="ForceCalendar Demo in Salesforce Lightning showing synthetic sample events in day view"
              caption="Day view"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
          </div>
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-xl bg-hairline ring-1 ring-hairline sm:grid-cols-3">
          {salesforceSetupSteps.map((step) => (
            <Link key={step.title} href={step.href} className="group bg-raised p-5 transition-colors hover:bg-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
              <h3 className="mb-1 text-sm font-semibold text-fg group-hover:text-accent-text">{step.title} <span aria-hidden>&rarr;</span></h3>
              <p className="text-sm leading-relaxed text-muted">{step.text}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Enterprise Platform */}
      <Section width="wide">
        <SectionHeader
          eyebrow="Where it runs"
          title="Enterprise calendar infrastructure"
          subtitle="Start with the Salesforce integration, or use the underlying packages in your own application. Other platform examples are starting points to validate."
          id="enterprise"
          aside={
            <Link href="/platforms" className="group inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
              All platforms <Arrow />
            </Link>
          }
        />
        <div className="grid gap-px overflow-hidden rounded-2xl bg-hairline ring-1 ring-hairline sm:grid-cols-2 lg:grid-cols-4">
          {platformTiles.map((tile) => (
            <div key={tile.title} className={`p-6 ${tile.accent ? "bg-accent-soft" : "bg-raised"}`}>
              <IconWell tone={tile.accent ? "solid" : "neutral"}>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tile.path} />
                </svg>
              </IconWell>
              <h3 className="mt-4 text-sm font-semibold text-fg">{tile.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{tile.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section width="wide" divider>
        <SectionHeader eyebrow="Salesforce security" title="How the Lightning integration fits" subtitle="A bundled calendar UI, a native data-access layer, and an explicit platform requirement." id="lightning-security" />
        <div className="grid gap-6 md:grid-cols-3">
          <div><h3 className="text-base font-semibold">Bundled in your org</h3><p className="mt-3 text-sm leading-relaxed text-muted">The LWC loads Core and Interface from a Salesforce static resource. The calendar UI does not depend on a runtime CDN, and event data flows through your Apex controller.</p></div>
          <div><h3 className="text-base font-semibold">Salesforce access controls</h3><p className="mt-3 text-sm leading-relaxed text-muted">Apex applies sharing and user-mode data access. Assign controller access and Event permissions deliberately; a read-only display setting does not replace your org’s security model.</p></div>
          <div><h3 className="text-base font-semibold">Lightning Web Security required</h3><p className="mt-3 text-sm leading-relaxed text-muted">The UI uses third-party custom elements. Salesforce supports these with Lightning Web Security enabled, not legacy Lightning Locker. This is an LWS integration, not a claim of legacy Locker compatibility.</p><a href="https://developer.salesforce.com/docs/platform/lwc/guide/create-use-custom-elements.html" className="mt-3 inline-block text-sm font-medium text-accent-text hover:underline">Salesforce compatibility guidance ↗</a></div>
        </div>
      </Section>

      {/* Architecture */}
      <Section width="wide" tone="sunken">
        <SectionHeader
          eyebrow="Architecture"
          title="Two packages, one architecture"
          subtitle="For developers building beyond the Salesforce integration: use Core for scheduling logic and Interface for the calendar UI."
          id="architecture"
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Card href="/core" padding="lg">
            <Eyebrow>Core Engine</Eyebrow>
            <h3 className="mt-3 font-mono text-lg font-semibold tracking-tight text-fg">@forcecalendar/core</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Pure JavaScript scheduling engine. No DOM or runtime dependencies. Headless calendar logic for JavaScript applications.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-text">
              Learn more <Arrow />
            </span>
          </Card>
          <Card href="/interface" padding="lg">
            <Eyebrow>UI Components</Eyebrow>
            <h3 className="mt-3 font-mono text-lg font-semibold tracking-tight text-fg">@forcecalendar/interface</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Web Components powered by Core. Framework-agnostic, Shadow DOM encapsulated. Works in React, Vue, Angular, or vanilla JS.
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-text">
              Learn more <Arrow />
            </span>
          </Card>
        </div>
        <div className="mt-5 flex flex-col gap-4 rounded-xl bg-accent-soft p-6 ring-1 ring-accent-line/60 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <Eyebrow>Salesforce Integration</Eyebrow>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">Lightning Web Component</h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
              Built on top of both packages. Loads as a static resource and connects to standard Salesforce Event records through Apex.
            </p>
          </div>
          <a href="#salesforce" className="group inline-flex flex-shrink-0 items-center gap-1 text-sm font-medium text-accent-text hover:underline">
            See it running <Arrow />
          </a>
        </div>
      </Section>

      {/* Code Example */}
      <Section width="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Quick start"
              title="Add the calendar to your web app"
              id="code"
              className="mb-6 lg:mb-6"
            />
            <div className="mb-5">
              <InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" />
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <Link href="/playground" className="group inline-flex items-center gap-1 font-medium text-accent-text hover:underline">
                Open the playground <Arrow />
              </Link>
              <a href="https://docs.forcecalendar.org" className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-fg">
                Documentation <Arrow />
              </a>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <CodeBlock code={codeExample} filename="app.js" language="JavaScript" />
          </div>
        </div>
      </Section>

      {/* Feature Grid */}
      <Section width="wide" tone="sunken">
        <SectionHeader eyebrow="Developer packages" title="Engine and interface capabilities" subtitle="These are package capabilities. The Salesforce integration exposes standard Event workflows; additional features need integration work." id="features" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Card
              key={feature.title}
              interactive
              className={[0, 5, 6, 7].includes(i) ? "sm:col-span-2" : ""}
            >
              <IconWell>{feature.icon}</IconWell>
              <h3 className="mt-4 text-sm font-semibold text-fg">{feature.title}</h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Benchmark Highlights */}
      <Section width="wide">
        <SectionHeader
          eyebrow="Honest numbers"
          title="How it compares"
          subtitle="Project-maintained benchmarks compare selected published packages and workloads. Review the versions and methodology before applying the results to your app."
          id="benchmarks"
        />
        <div className="grid gap-px overflow-hidden rounded-2xl bg-hairline ring-1 ring-hairline md:grid-cols-2">
          {/* Bundle Size */}
          <div className="bg-raised p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <IconWell>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </IconWell>
              <h3 className="text-base font-semibold text-fg">Installed package size</h3>
            </div>
            <div className="mb-6 space-y-5">
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-fg">forceCalendar <span className="text-xs text-muted">(core + interface)</span></span>
                  <span className="font-mono text-sm font-medium tabular text-fg">{formatMB(BUNDLE_BYTES.forceCalendar)}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-sunken ring-1 ring-inset ring-hairline">
                  <div className="h-full rounded-full bg-accent" style={{ width: bundleShare }} />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-fg">FullCalendar <span className="text-xs text-muted">(core + 4 plugins + rrule)</span></span>
                  <span className="font-mono text-sm font-medium tabular text-fg">{formatMB(BUNDLE_BYTES.fullCalendar)}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-sunken ring-1 ring-inset ring-hairline">
                  <div className="h-full rounded-full bg-line" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              The selected forceCalendar packages occupy {bundleShare} of the installed space in this run ({bundleRatio} difference). This is not browser download or production bundle size.
            </p>
          </div>

          {/* Recurrence Performance */}
          <div className="bg-raised p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <IconWell>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
              </IconWell>
              <h3 className="text-base font-semibold text-fg">Recurrence (RRULE)</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              The benchmark includes daily and weekly recurrence workloads. Results depend on the package versions, event patterns, and runtime; use the dashboard to inspect the measured cases.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              forceCalendar Core includes recurrence processing without an additional runtime package. The Salesforce adapter does not currently expose this as native Salesforce recurring-series management.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Benchmarks run against published npm packages; sizes are installed (unpacked) package sizes taken from the committed{" "}
            <a
              href={BENCHMARK_RESULTS_URL}
              className="font-medium text-accent-text hover:underline"
            >
              results file
            </a>
            . This run is from July 12, 2026, using Core 2.3.0 and Interface 1.1.0,
            compared with FullCalendar 6.1.21 and rrule 2.8.1. These are historical
            results, not measurements of the current releases. Full methodology is on the dashboard.
          </p>
          <Button href="https://benchmark.forcecalendar.org" variant="secondary" className="flex-shrink-0">
            View full benchmark
            <ExternalIcon />
          </Button>
        </div>
      </Section>

      {/* Final CTA */}
      <Section width="wide" spacing="none" className="pb-20 lg:pb-24">
        <div className="bg-hero-mesh relative overflow-hidden rounded-3xl px-6 py-16 text-center ring-1 ring-hairline sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-display-md sm:text-display-lg text-fg">
              Bring a clear calendar to your application.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Explore the components, or use the Salesforce guide to configure your Lightning pages.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <Button href="/salesforce" size="lg">
                Set up Salesforce
                <span aria-hidden>&rarr;</span>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
