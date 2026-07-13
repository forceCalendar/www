import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";

export const metadata: Metadata = {
  title: "Platforms - Runs Where Others Can't",
  description:
    "forceCalendar runs inside sandboxed enterprise platforms: Salesforce, ServiceNow, SharePoint, Atlassian Forge, Chrome MV3 extensions, and edge runtimes like Cloudflare Workers.",
  alternates: { canonical: "https://forcecalendar.org/platforms" },
  openGraph: { url: "https://forcecalendar.org/platforms" },
};

const EXAMPLES_URL = "https://github.com/forcecalendar/examples";

const platforms = [
  {
    name: "Salesforce Lightning",
    constraint: "Locker Service / LWS: no eval, no dynamic code, no prototype manipulation",
    detail:
      "The founding use case. A first-class packaged distribution: LWC component, Apex controller over the Event sObject, one-command deploy.",
    href: "/salesforce",
    linkLabel: "Install guide",
    firstClass: true,
  },
  {
    name: "Cloudflare Workers",
    constraint: "Edge runtime: eval and code generation banned outright",
    detail:
      "The headless core as a server-side scheduling engine at the edge — RRULE expansion, conflict detection, and ICS export with zero dependencies to cold-start.",
    href: `${EXAMPLES_URL}/tree/main/cloudflare-worker-scheduling`,
    linkLabel: "Runnable example",
  },
  {
    name: "Chrome Extensions (MV3)",
    constraint: "Manifest V3 CSP: no remote code, no eval, everything bundled",
    detail:
      "The Web Component in an extension popup with no build step at all — an import map plus vendored packages is enough.",
    href: `${EXAMPLES_URL}/tree/main/chrome-extension-mv3`,
    linkLabel: "Runnable example",
  },
  {
    name: "SharePoint / Teams (SPFx)",
    constraint: "Security-reviewed, size-audited bundles",
    detail:
      "A calendar web part for Microsoft 365 pages and Teams tabs. Zero transitive dependencies means nothing extra for your review board to audit.",
    href: `${EXAMPLES_URL}/tree/main/sharepoint-spfx-webpart`,
    linkLabel: "Starter",
  },
  {
    name: "ServiceNow Service Portal",
    constraint: "Sandboxed widget scripting",
    detail:
      "A Service Portal widget over ServiceNow table data — scheduling and dispatch calendars without fighting the platform sandbox.",
    href: `${EXAMPLES_URL}/tree/main/servicenow-portal-widget`,
    linkLabel: "Starter",
  },
  {
    name: "Atlassian Forge (Jira)",
    constraint: "Custom UI in a strictly CSP'd iframe, Marketplace dependency scrutiny",
    detail:
      "A sprint calendar as a Forge Custom UI project page, with the packages vendored into static assets.",
    href: `${EXAMPLES_URL}/tree/main/atlassian-forge-app`,
    linkLabel: "Starter",
  },
];

export default function PlatformsPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="relative pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
              Runs where others can&rsquo;t.
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
              forceCalendar was built for the most restrictive runtime in enterprise
              software — Salesforce Lightning Locker Service. The same engineering
              (zero dependencies, no eval, no dynamic code, no inline-style injection)
              makes it run inside every sandboxed platform below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Platforms"
            subtitle="Each links to an installable distribution or a runnable starter."
            id="platforms"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-slate-900 dark:text-white">{p.name}</h3>
                  {p.firstClass && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 ring-1 ring-brand-200 dark:ring-brand-500/25">
                      First-class
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">{p.constraint}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{p.detail}</p>
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
                  {p.linkLabel} <span aria-hidden>&rarr;</span>
                </span>
              </a>
            ))}
          </div>

          <p className="mt-10 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            These starters are intentionally minimal. When one attracts real-world
            traction, it graduates into a first-class packaged distribution with its
            own repo and release pipeline — exactly like Salesforce did. Open issues
            on the{" "}
            <a
              href={EXAMPLES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-brand-400 hover:underline"
            >
              examples repo
            </a>{" "}
            to vote with your use case.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
