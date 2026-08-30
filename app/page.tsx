import Link from "next/link";
import Image from "next/image";
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
import HeroCalendar from "./components/HeroCalendar";

const problems = [
  {
    title: "Locker Service",
    problem: "Most calendar libraries use JavaScript patterns that Locker Service prohibits: eval, dynamic Function constructors, and prototype manipulation.",
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

const NPM_PACKAGES = ["core", "interface", "react", "vue"];

const SPARK_WEEKS = 12;

// Installed (unpacked) package sizes from the committed benchmark run
// (results/latest.json in the benchmark repo): @forcecalendar/core + interface
// versus @fullcalendar/core + 5 plugins + rrule. Every figure in the benchmark
// section derives from these two numbers so the copy cannot drift from them.
const BENCHMARK_RESULTS_URL =
  "https://github.com/forceCalendar/benchmark/blob/main/results/latest.json";
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

const codeExample = `import { Calendar } from '@forcecalendar/core';
import '@forcecalendar/interface';

const calendar = new Calendar({
  locale: 'en-US',
  timeZone: 'America/New_York'
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
    title: "Accessible by Default",
    description: "Full WAI-ARIA grid semantics and keyboard navigation across month, week, and day views. No extra configuration.",
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
    text: "Shipping now. LWC + Apex with full Locker Service compliance.",
    accent: true,
    path: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    title: "Any Web App",
    text: "Web Components work in React, Vue, Angular, or vanilla JS, with first-party SSR-safe adapters for React and Vue.",
    path: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418",
  },
  {
    title: "Strict CSP",
    text: "No eval, no inline styles. Works behind the strictest policies.",
    path: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    title: "Air-Gapped",
    text: "Zero external requests. Runs fully offline with no CDN dependencies.",
    path: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
  },
];

const salesforceFacts = [
  {
    title: "Native LWC Integration",
    text: "Runs as a Lightning Web Component. Uses real Salesforce data through Apex, not external APIs.",
  },
  {
    title: "Locker Service Safe",
    text: "Zero blocked API calls. No eval, no dynamic Function constructors, no prototype manipulation.",
  },
  {
    title: "All Views Included",
    text: "Month, week, and day views with event creation, color coding, and full navigation.",
  },
];

function Screenshot({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline shadow-elev-2 ring-hi">
      <Image src={src} alt={alt} width={1388} height={860} className="h-auto w-full" priority={priority} />
      {caption && (
        <figcaption className="border-t border-hairline px-4 py-2.5 text-xs font-medium text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default async function Home() {
  const downloads = await getTotalDownloads();
  const stats = [
    { value: "0", label: "Runtime dependencies" },
    downloads
      ? { value: downloads.total, label: "npm downloads", spark: downloads.weekly }
      : { value: String(NPM_PACKAGES.length), label: "Packages on npm" },
    { value: bundleRatio, label: "Smaller than FullCalendar" },
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
                  Zero dependencies &middot; MIT
                </Eyebrow>
              </div>
              <h1 className="mt-6 font-display text-display-lg sm:text-display-xl text-fg animate-fade-up [animation-delay:60ms]">
                Calendar infrastructure for strict enterprise environments.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted animate-fade-up [animation-delay:120ms]">
                A headless scheduling engine and framework-agnostic Web Components.
                Zero dependencies. MIT licensed. Built for Salesforce Locker Service /
                Lightning Web Security and strict CSP.
              </p>
              <div className="mt-8 animate-fade-up [animation-delay:180ms]">
                <InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:240ms]">
                <Button
                  href="https://stackblitz.com/github/forceCalendar/examples/tree/main/vanilla-vite"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Try it in 60 seconds
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Button>
                <Button href="https://github.com/forcecalendar" variant="secondary" size="lg">
                  GitHub
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm animate-fade-up [animation-delay:300ms]">
                <Link href="/salesforce" className="group text-muted transition-colors hover:text-fg">
                  Install on Salesforce <Arrow />
                </Link>
                <a href="https://docs.forcecalendar.org" className="group text-muted transition-colors hover:text-fg">
                  Documentation <Arrow />
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted animate-fade-up [animation-delay:360ms]" aria-label="Highlights">
                {["Zero dependencies", "MIT licensed", "TypeScript", "Locker / LWS ready", "WCAG keyboard nav"].map(chip => (
                  <li key={chip} className="rounded-full bg-raised px-2.5 py-1 ring-1 ring-inset ring-hairline">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="bg-hero-mesh relative rounded-2xl p-3 ring-1 ring-hairline sm:p-5 lg:-mr-6 xl:-mr-16 animate-fade-up [animation-delay:200ms]">
                <HeroCalendar />
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
                A calendar you can put inside your own product
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Month, week, and day views with events, recurring schedules,
                timezones, and search. You install two packages, add one HTML
                tag, and connect your data. It is not a hosted service. The
                code runs entirely inside your application.
              </p>
            </div>
            <div className="py-7">
              <h3 className="mb-2 text-base font-semibold text-fg">
                Built for places where most JavaScript is not allowed
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                Large companies restrict what code on their pages may do. A
                Content Security Policy (CSP) is a browser rule set that, for
                example, forbids generating code at runtime or injecting
                styles. Salesforce goes further with Locker Service, a sandbox
                around every component. Most calendar libraries rely on
                exactly the techniques these rules block, so they break, often
                silently.
              </p>
            </div>
            <div className="pt-7">
              <h3 className="mb-2 text-base font-semibold text-fg">
                Why it exists
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                forceCalendar was written from scratch to work under those
                rules: no blocked techniques, no third-party code to audit, one
                MIT license. If your security team has ever rejected a
                JavaScript library, this is the calendar they will approve.
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
                handles timezones, finds conflicts, and searches. No UI, no
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
          title="The problem with calendar libraries in enterprise"
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
          title="Started with Salesforce"
          subtitle="Most calendar libraries break inside Locker Service, and that is where forceCalendar started. The same zero-dependency architecture works in any strict enterprise environment."
          id="salesforce"
          aside={
            <Link href="/salesforce" className="group inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">
              Install on Salesforce <Arrow />
            </Link>
          }
        />
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Screenshot
              src="/salesforce-month.png"
              alt="forceCalendar month view running inside a Salesforce org, showing colorful events across February 2026"
              caption="Month view inside a Salesforce org"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <Screenshot
              src="/salesforce-week.png"
              alt="forceCalendar week view inside Salesforce showing timed events"
              caption="Week view with timed events"
            />
            <Screenshot
              src="/salesforce-day.png"
              alt="forceCalendar day view inside Salesforce showing detailed event blocks"
              caption="Day view with event details"
            />
          </div>
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-xl bg-hairline ring-1 ring-hairline sm:grid-cols-3">
          {salesforceFacts.map((fact) => (
            <div key={fact.title} className="bg-raised p-5">
              <h3 className="mb-1 text-sm font-semibold text-fg">{fact.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{fact.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Enterprise Platform */}
      <Section width="wide">
        <SectionHeader
          eyebrow="Where it runs"
          title="Enterprise calendar infrastructure"
          subtitle="Salesforce is the flagship integration. The same architecture works anywhere strict security is required."
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

      {/* Architecture */}
      <Section width="wide" tone="sunken">
        <SectionHeader
          eyebrow="Architecture"
          title="Two packages, one architecture"
          subtitle="Use Core for scheduling logic and Interface for production-ready UI components."
          id="architecture"
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Card href="/core" padding="lg">
            <Eyebrow>Core Engine</Eyebrow>
            <h3 className="mt-3 font-mono text-lg font-semibold tracking-tight text-fg">@forcecalendar/core</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Pure JavaScript scheduling engine. No DOM, no dependencies. Headless calendar logic for any runtime.
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
              Built on top of both packages. Loads as a static resource, connects to Salesforce data through Apex. Locker Service safe.
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
              title="Five lines to a working calendar"
              id="code"
              className="mb-6 lg:mb-6"
            />
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
        <SectionHeader eyebrow="Capabilities" title="What&rsquo;s included" id="features" />
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
          subtitle="Independent benchmarks against FullCalendar, an excellent and widely-used library. forceCalendar exists for a different niche: strict enterprise environments where most calendar libraries cannot run."
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
              <h3 className="text-base font-semibold text-fg">Bundle Size</h3>
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
                  <span className="text-fg">FullCalendar <span className="text-xs text-muted">(core + 5 plugins + rrule)</span></span>
                  <span className="font-mono text-sm font-medium tabular text-fg">{formatMB(BUNDLE_BYTES.fullCalendar)}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-sunken ring-1 ring-inset ring-hairline">
                  <div className="h-full rounded-full bg-line" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {bundleRatio} smaller total bundle. Fewer bytes to audit, fewer bytes to ship behind corporate firewalls.
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
              The dedicated <span className="font-mono text-xs">rrule</span> library is still faster at raw RRULE expansion, but the gap is now roughly 2x on common daily and weekly patterns (it was up to 1,200x before the v2.1&ndash;v2.3 engine work); a five-year daily series (1,825 occurrences) expands in about a quarter of a millisecond.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              The trade-off: forceCalendar&rsquo;s recurrence is built-in with zero extra dependencies and applies timezone/DST handling per occurrence, while FullCalendar requires the separate <span className="font-mono text-xs">rrule</span> library. At real-world calendar volumes the difference is microseconds per render.
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
            . Full methodology and interactive results available on the dashboard.
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
              Ship a calendar your security team will approve.
            </h2>
            <p className="mt-4 text-lg text-muted">
              One audit, zero dependencies, MIT licensed. Up and running in minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" />
              <Button href="/playground" size="lg">
                Try the playground
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
