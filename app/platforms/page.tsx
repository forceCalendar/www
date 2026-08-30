import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import PageHeader from "../components/PageHeader";
import Card, { IconWell } from "../components/Card";
import { Arrow } from "../components/Button";

export const metadata: Metadata = {
  title: "Platforms - Runs Where Others Can't",
  description:
    "forceCalendar runs inside sandboxed enterprise platforms: Salesforce, ServiceNow, SharePoint, Atlassian Forge, Chrome MV3 extensions, and edge runtimes like Cloudflare Workers.",
  alternates: { canonical: "https://forcecalendar.org/platforms" },
  openGraph: { url: "https://forcecalendar.org/platforms" },
};

const EXAMPLES_URL = "https://github.com/forcecalendar/examples";

const icons = {
  shield: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  puzzle: "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z",
  grid: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
  wrench: "M11.42 15.17l-5.877 5.877a2.652 2.652 0 01-3.75-3.75L8.11 11.42M11.42 15.17l3.75-3.75m-3.75 3.75l-3.31-3.31m3.31 3.31L15.17 11.42M15.17 11.42a6 6 0 007.38-5.84 6.003 6.003 0 00-.19-1.5l-3.25 3.25-2.84-.72-.72-2.84 3.25-3.25a6 6 0 00-7.34 7.34",
  kanban: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z",
} as const;

const platforms = [
  {
    name: "Salesforce Lightning",
    constraint: "Locker Service / LWS: no eval, no dynamic code, no prototype manipulation",
    detail:
      "The founding use case. A first-class packaged distribution: LWC component, Apex controller over the Event sObject, one-command deploy.",
    href: "/salesforce",
    linkLabel: "Install guide",
    firstClass: true,
    icon: icons.shield,
  },
  {
    name: "Cloudflare Workers",
    constraint: "Edge runtime: eval and code generation banned outright",
    detail:
      "The headless core as a server-side scheduling engine at the edge: RRULE expansion, conflict detection, and ICS export with zero dependencies to cold-start.",
    href: `${EXAMPLES_URL}/tree/main/cloudflare-worker-scheduling`,
    linkLabel: "Runnable example",
    icon: icons.bolt,
  },
  {
    name: "Chrome Extensions (MV3)",
    constraint: "Manifest V3 CSP: no remote code, no eval, everything bundled",
    detail:
      "The Web Component in an extension popup with no build step at all: an import map plus vendored packages is enough.",
    href: `${EXAMPLES_URL}/tree/main/chrome-extension-mv3`,
    linkLabel: "Runnable example",
    icon: icons.puzzle,
  },
  {
    name: "SharePoint / Teams (SPFx)",
    constraint: "Security-reviewed, size-audited bundles",
    detail:
      "A calendar web part for Microsoft 365 pages and Teams tabs. Zero transitive dependencies means nothing extra for your review board to audit.",
    href: `${EXAMPLES_URL}/tree/main/sharepoint-spfx-webpart`,
    linkLabel: "Starter",
    icon: icons.grid,
  },
  {
    name: "ServiceNow Service Portal",
    constraint: "Sandboxed widget scripting",
    detail:
      "A Service Portal widget over ServiceNow table data: scheduling and dispatch calendars without fighting the platform sandbox.",
    href: `${EXAMPLES_URL}/tree/main/servicenow-portal-widget`,
    linkLabel: "Starter",
    icon: icons.wrench,
  },
  {
    name: "Atlassian Forge (Jira)",
    constraint: "Custom UI in a strictly CSP'd iframe, Marketplace dependency scrutiny",
    detail:
      "A sprint calendar as a Forge Custom UI project page, with the packages vendored into static assets.",
    href: `${EXAMPLES_URL}/tree/main/atlassian-forge-app`,
    linkLabel: "Starter",
    icon: icons.kanban,
  },
];

export default function PlatformsPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <PageHeader
        eyebrow="Platforms"
        title={<>Runs where others can&rsquo;t.</>}
        lede="forceCalendar was built for the most restrictive runtime in enterprise software: Salesforce Lightning Locker Service. The same engineering (zero dependencies, no eval, no dynamic code, no inline-style injection) makes it run inside every sandboxed platform below."
      />

      <Section width="narrow">
        <SectionHeader
          eyebrow="Distributions &amp; starters"
          title="Platforms"
          subtitle="Each links to an installable distribution or a runnable starter."
          id="platforms"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => {
            const external = p.href.startsWith("http");
            return (
              <Card
                key={p.name}
                href={p.href}
                external={external}
                tone={p.firstClass ? "accent" : "default"}
                className="flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <IconWell tone={p.firstClass ? "solid" : "soft"}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} />
                    </svg>
                  </IconWell>
                  {p.firstClass && (
                    <span className="rounded-full bg-raised px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-text ring-1 ring-inset ring-accent-line/70">
                      First-class
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-base font-semibold text-fg">{p.name}</h3>
                <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-subtle">{p.constraint}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.detail}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent-text">
                  {p.linkLabel} <Arrow />
                </span>
              </Card>
            );
          })}
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
          These starters are intentionally minimal. When one attracts real-world
          traction, it graduates into a first-class packaged distribution with its
          own repo and release pipeline, exactly like Salesforce did. Open issues
          on the{" "}
          <a
            href={EXAMPLES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-text hover:underline"
          >
            examples repo
          </a>{" "}
          to vote with your use case.
        </p>
      </Section>

      <Footer />
    </div>
  );
}
