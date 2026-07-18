import Link from "next/link";
import Image from "next/image";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SectionHeader from "./components/SectionHeader";
import FeatureCard from "./components/FeatureCard";
import PackageCard from "./components/PackageCard";
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

async function getGitHubStars(): Promise<string | null> {
  try {
    const res = await fetch("https://api.github.com/repos/forceCalendar/core", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data: { stargazers_count: number } = await res.json();
    return data.stargazers_count.toLocaleString("en-US");
  } catch {
    return null;
  }
}
const SPARK_WEEKS = 12;

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

// Single-series sparkline: 2px line, no axes, endpoint dot. Strokes are
// contrast-validated per surface (#2563eb on light, #3b82f6 on dark).
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
      className="mx-auto mt-2 text-[#2563eb] dark:text-[#3b82f6]"
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

export default async function Home() {
  const [downloads, stars] = await Promise.all([getTotalDownloads(), getGitHubStars()]);
  const stats = [
    ...(stars ? [{ value: stars, label: "GitHub stars" }] : []),
    { value: "0", label: "Runtime dependencies" },
    downloads
      ? { value: downloads.total, label: "npm downloads", spark: downloads.weekly }
      : { value: String(NPM_PACKAGES.length), label: "Packages on npm" },
    { value: "2.9x", label: "Smaller than FullCalendar" },
    { value: "45+", label: "CSS theming tokens" },
  ];

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="relative pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                Calendar infrastructure for strict enterprise environments.
              </h1>
              <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                A headless scheduling engine and framework-agnostic Web Components.
                Zero dependencies. MIT licensed. Built for Salesforce Locker Service /
                Lightning Web Security and strict CSP.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3">
                <InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" />
              </div>
              <div className="mt-6 flex flex-wrap items-center lg:justify-start justify-center gap-3">
                <a
                  href="https://stackblitz.com/github/forceCalendar/examples/tree/main/vanilla-vite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-brand-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                >
                  Try it in 60 seconds
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </a>
                <a
                  href="https://github.com/forcecalendar"
                  className="inline-flex items-center px-5 py-2.5 ring-1 ring-slate-300 dark:ring-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:ring-slate-400 dark:hover:ring-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                >
                  GitHub
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center lg:justify-start justify-center gap-x-5 gap-y-1 text-sm">
                <Link href="/salesforce" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Install on Salesforce <span aria-hidden>&rarr;</span>
                </Link>
                <a href="https://docs.forcecalendar.org" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Documentation <span aria-hidden>&rarr;</span>
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center lg:justify-start justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                {["Zero dependencies", "MIT licensed", "TypeScript", "Locker / LWS ready", "WCAG keyboard nav"].map(chip => (
                  <span key={chip} className="px-2.5 py-1 rounded-full ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <HeroCalendar />
          </div>
        </div>

        {/* Facts strip */}
        <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30">
          <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200 dark:lg:divide-slate-800">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:px-6">
                <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
                {"spark" in stat && stat.spark && (
                  <Sparkline
                    points={stat.spark}
                    label={`Weekly npm downloads, last ${stat.spark.length} weeks`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plain words */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="In plain words"
            title="What forceCalendar is"
            id="what"
          />
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
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Your application
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Salesforce LWC &middot; React &middot; Vue &middot; Angular &middot; plain HTML
                </p>
              </div>
              <div className="flex items-center gap-3 py-2 pl-8">
                <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" aria-hidden />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  drops in the <code className="font-mono">&lt;forcecal-main&gt;</code> tag
                </span>
              </div>
              <div className="rounded-xl border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50/40 dark:bg-cyan-500/5 p-5">
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
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  asks the engine what to display
                </span>
              </div>
              <div className="rounded-xl border border-violet-200 dark:border-violet-500/30 bg-violet-50/40 dark:bg-violet-500/5 p-5">
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

      {/* The Problem */}
      <section className="py-24 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Why forceCalendar"
            title="The problem with calendar libraries in enterprise"
            id="why"
          />
          <div className="grid md:grid-cols-3 gap-5">
            {problems.map((item, i) => (
              <div
                key={item.title}
                className="relative p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60"
              >
                <div className="text-xs font-mono text-slate-400 dark:text-slate-600 mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <div className="flex gap-2.5 mb-4">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-rose-400 dark:bg-rose-500" aria-hidden />
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.problem}
                  </p>
                </div>
                <div className="flex gap-2.5 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden />
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
      <section className="py-24 px-6 bg-slate-50/70 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Flagship integration"
            title="Started with Salesforce"
            subtitle="Most calendar libraries break inside Locker Service, and that is where forceCalendar started. The same zero-dependency architecture works in any strict enterprise environment."
            id="salesforce"
          />
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50">
            <div className="relative">
              <Image
                src="/salesforce-month.png"
                alt="forceCalendar month view running inside a Salesforce org, showing colorful events across February 2026"
                width={1388}
                height={860}
                className="w-full h-auto"
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
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
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
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
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
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Where it runs"
            title="Enterprise calendar infrastructure"
            subtitle="Salesforce is the flagship integration. The same architecture works anywhere strict security is required."
            id="enterprise"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-xl border border-brand-200 dark:border-brand-500/30 bg-brand-50/50 dark:bg-brand-500/5 transition-all duration-200 hover:shadow-lg hover:shadow-brand-100/60 dark:hover:shadow-slate-950/60">
              <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-brand-500/15 ring-1 ring-brand-200 dark:ring-brand-500/25 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">Salesforce</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Shipping now. LWC + Apex with full Locker Service compliance.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">Any Web App</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Web Components work in React, Vue, Angular, or vanilla JS, with first-party SSR-safe adapters for React and Vue.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">Strict CSP</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">No eval, no inline styles. Works behind the strictest policies.</p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center mb-3">
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
      <section className="py-24 px-6 bg-slate-50/70 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Architecture"
            title="Two packages, one architecture"
            subtitle="Use Core for scheduling logic and Interface for production-ready UI components."
            id="architecture"
          />
          <div className="grid md:grid-cols-3 gap-5">
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
            <div className="relative block p-6 rounded-xl border border-brand-200 dark:border-brand-500/30 bg-brand-50/50 dark:bg-brand-500/5">
              <div className="text-xs font-mono font-medium uppercase tracking-widest mb-3 text-brand-600 dark:text-brand-400">
                Salesforce Integration
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">Lightning Web Component</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Built on top of both packages. Loads as a static resource, connects to Salesforce data through Apex. Locker Service safe.
              </p>
              <a href="#salesforce" className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
                See it running <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Quick start"
            title="Five lines to a working calendar"
            id="code"
          />
          <CodeBlock code={codeExample} filename="app.js" language="JavaScript" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-slate-50/70 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Capabilities" title="What&rsquo;s included" id="features" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* Benchmark Highlights */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Honest numbers"
            title="How it compares"
            subtitle="Independent benchmarks against FullCalendar, an excellent and widely-used library. forceCalendar exists for a different niche: strict enterprise environments where most calendar libraries cannot run."
            id="benchmarks"
          />
          <div className="grid md:grid-cols-2 gap-5">
            {/* Bundle Size */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 ring-1 ring-emerald-200 dark:ring-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white">Bundle Size</h3>
              </div>
              <div className="space-y-4 mb-5">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">forceCalendar <span className="text-xs text-slate-500 dark:text-slate-400">(core + interface)</span></span>
                    <span className="font-mono font-medium text-slate-900 dark:text-white">1.04 MB</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400" style={{ width: "35%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">FullCalendar <span className="text-xs text-slate-500 dark:text-slate-400">(core + 5 plugins + rrule)</span></span>
                    <span className="font-mono font-medium text-slate-900 dark:text-white">3.01 MB</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-slate-300 dark:bg-slate-600" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                2.9x smaller total bundle. Fewer bytes to audit, fewer bytes to ship behind corporate firewalls.
              </p>
            </div>

            {/* Recurrence Performance */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-500/10 ring-1 ring-amber-200 dark:ring-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                  </svg>
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white">Recurrence (RRULE)</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                The dedicated <span className="font-mono text-xs">rrule</span> library is still faster at raw RRULE expansion, but the gap is now roughly 2x on common daily and weekly patterns (it was up to 1,200x before the v2.1&ndash;v2.3 engine work); a five-year daily series expands in about half a millisecond either way.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                The trade-off: forceCalendar&rsquo;s recurrence is built-in with zero extra dependencies and applies timezone/DST handling per occurrence, while FullCalendar requires the separate <span className="font-mono text-xs">rrule</span> library. At real-world calendar volumes the difference is microseconds per render.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              Benchmarks run against published npm packages; sizes are installed (unpacked) package sizes. Full methodology and interactive results available on the dashboard.
            </p>
            <a
              href="https://benchmark.forcecalendar.org"
              className="inline-flex items-center gap-2 px-5 py-2.5 ring-1 ring-slate-300 dark:ring-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:ring-slate-400 dark:hover:ring-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              View full benchmark
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30">
        <div className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Ship a calendar your security team will approve.
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
              One audit, zero dependencies, MIT licensed. Up and running in minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <InstallCommand command="npm install @forcecalendar/core @forcecalendar/interface" />
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white text-sm font-medium rounded-xl shadow-sm shadow-brand-600/25 hover:bg-brand-700 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
              >
                Try the playground
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
