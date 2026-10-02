import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import PageHeader from "../components/PageHeader";
import CodeBlock from "../components/CodeBlock";
import Button, { ExternalIcon } from "../components/Button";
import Stepper from "../components/Stepper";
import SalesforceScreenshot from "../components/SalesforceScreenshot";

export const metadata: Metadata = {
  title: "Install on Salesforce",
  description:
    "Install and configure forceCalendar for standard Salesforce Events. Sandbox-first setup, access requirements, Lightning App Builder settings, and source deployment steps.",
  alternates: { canonical: "https://forcecalendar.org/salesforce" },
  openGraph: { url: "https://forcecalendar.org/salesforce" },
};

const RELEASES_URL = "https://github.com/forceCalendar/salesforce/releases";

const contents = [
  {
    name: "forceCalendar",
    kind: "LWC",
    text: "Lightning component for standard Event records, connected through Apex. Month, week, and day views with event actions subject to Salesforce access.",
  },
  {
    name: "forceCalendarDemo",
    kind: "LWC",
    text: "Separate demo with generated sample events and no Apex data access. Use it to check rendering; it does not verify access to real Event records.",
  },
  {
    name: "ForceCalendarController",
    kind: "Apex",
    text: "Apex data layer for querying and managing standard Event records. Includes a test class; run org tests and validate your access configuration before rollout.",
  },
  {
    name: "Static Resource",
    kind: "Bundle",
    text: null,
  },
];

const inlineCode = "rounded-sm bg-sunken px-1 py-0.5 font-mono text-xs text-fg ring-1 ring-inset ring-hairline";

function SalesforceGlyph() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M10.05 4.2a4.83 4.83 0 0 1 3.57 1.59 3.86 3.86 0 0 1 5.4.44 3.86 3.86 0 0 1 1.87 6.64 4.34 4.34 0 0 1-3.37 5.13H7.38a5.28 5.28 0 0 1-4.16-2.07A5.28 5.28 0 0 1 5.6 7.2a4.83 4.83 0 0 1 4.45-3z" />
    </svg>
  );
}

const strong = "font-medium text-fg";

export default function SalesforcePage() {
  const installSteps = [
    {
      title: "Review and install in a sandbox",
      children: (
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Download the deployable source archive from a reviewed release and deploy it
            to a sandbox with Salesforce CLI. When installing a verified package, start with
            <strong className={strong}> Install for Admins Only</strong>, then grant access to your pilot users.
          </p>
          <p>
            Released unlocked package 0.3.0.1 is available for sandbox and production installation. It passed a clean install and 32 Apex test methods, with 98% package coverage. Validate it in your own sandbox before production rollout.
          </p>
          <div className="flex flex-wrap gap-3"><Button href="https://test.salesforce.com/packaging/installPackage.apexp?p0=04tg5000000ExTFAA0" target="_blank" rel="noopener noreferrer">Install in a sandbox</Button><Button href="https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg5000000ExTFAA0" variant="secondary" target="_blank" rel="noopener noreferrer">Production / Developer Edition</Button></div>
        </div>
      ),
    },
    {
      title: "Check the demo, then add the real calendar",
      children: (
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <ol className="list-decimal space-y-2 pl-5 marker:text-subtle">
            <li>Go to <strong className={strong}>Setup &rarr; Lightning App Builder</strong></li>
            <li>Create or edit an App, Home, or Record page</li>
            <li>Add <strong className={strong}>ForceCalendar Demo</strong>, save, activate, and open the page to check sample-data rendering</li>
            <li>Add <strong className={strong}>Force Calendar</strong> for real Event records and review the available settings against the configuration notes below</li>
            <li>Save and activate the page for the intended app and users</li>
          </ol>
          <p>
            The demo&rsquo;s sample events are not Salesforce records. Seeing the demo render
            is only the first check; test the production component with Event access next.
          </p>
        </div>
      ),
    },
    {
      title: "Assign access to pilot users",
      children: (
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Use an org-managed permission set or profile to grant access to
            <code className={inlineCode}> ForceCalendarController</code>, the page, and the
            Event records and fields your users need. The source distribution includes the optional
            ForceCalendarAccess permission set for controller access only; it does not grant Event object or field access. ForceCalendarReader adds Access Activities and read access to the five configurable fields. ForceCalendarEditor adds Edit Events and field edit access. No permission set is assigned automatically.
          </p>
          <p>
            Permissions are additive: Reader cannot revoke write access granted elsewhere. Edit Events permits create, update, and delete subject to sharing. These sets do not grant related Account, Contact, or Lead access, Edit Tasks, View All, or Modify All. Access Activities applies beyond this calendar; Salesforce shares Description, WhoId, and WhatId permissions with Task. Subject, StartDateTime, and EndDateTime do not have independent configurable field permissions.
          </p>
        </div>
      ),
    },
    {
      title: "Validate the real workflow in your sandbox",
      children: (
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <p>Use synthetic test events and sign in as a representative non-admin user:</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-subtle">
            <li>Switch month, week, and day views; navigate away and back</li>
            <li>Create a test Event, then reload to confirm the saved result; validate Apex/programmatic update and delete separately</li>
            <li>Check all-day and timed events, including your team&rsquo;s time zones</li>
            <li>Verify Record page relationships, read-only behavior, and expected permission-denied cases</li>
            <li>Test your org&rsquo;s Lightning security settings and typical event volume; the current query returns at most 1,000 records per requested date range</li>
            <li>Run the Apex tests and resolve deployment or validation-rule failures before rollout</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Roll out the version you tested",
      muted: true,
      children: (
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Record the package version or source revision you validated. Deploy that same
            version to production, repeat the page activation and access assignments, and
            check the calendar as an intended user.
          </p>
          <Button href={RELEASES_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
            Review Release Notes
          </Button>
          <p className="text-xs text-subtle">Deploy the exact source revision or package version tested in your sandbox.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <Nav />

      <PageHeader
        eyebrow="Salesforce Integration"
        title="Install forceCalendar on Salesforce"
        lede="Put standard Salesforce Events on your Lightning pages. Start in a sandbox, configure the component and user access, then validate your team’s workflow before production."
        aside={
          <div className="rounded-2xl bg-raised p-6 ring-1 ring-hairline shadow-elev-3 ring-hi lg:ml-auto lg:max-w-md">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">Salesforce distribution</span>
              <span className="text-xs text-muted">Released 0.3.0.1</span>
            </div>
            <div className="mt-5 grid gap-3">
              <Button href={RELEASES_URL} target="_blank" rel="noopener noreferrer" size="lg" className="w-full">
                <SalesforceGlyph />
                Review Salesforce Releases
                <ExternalIcon className="ml-auto h-3.5 w-3.5 opacity-70" />
              </Button>
              <Button href={RELEASES_URL} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary" className="w-full">
                Review Release Notes
                <ExternalIcon className="ml-auto h-3.5 w-3.5 opacity-70" />
              </Button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-subtle">
              Released package 0.3.0.1 includes Core 2.5.6 and Interface 1.9.0. The website demo uses Core 2.5.7. Package and npm releases are versioned separately.
            </p>
          </div>
        }
      />

      <Section width="narrow">
        <SectionHeader
          eyebrow="Before you start"
          title="Check your org and use case"
          subtitle="An admin or developer should own the first sandbox setup."
          id="prerequisites"
        />
        <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted marker:text-subtle">
          <li>A Salesforce sandbox with Lightning Experience, Lightning Web Security enabled, and permission to install a package or deploy Apex and LWC metadata</li>
          <li>A supported Salesforce CLI and authenticated target org for CLI deployment; Node.js and npm are also needed when building from source</li>
          <li>Standard Event records and the required object, field, Apex class, and record access for pilot users</li>
          <li>An App, Home, or Record page that you can edit and activate in Lightning App Builder</li>
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          The integration manages standard Events. The current source bundle supports event creation, editing, deletion, and navigation. Validate these actions against your org’s permissions and rules; recurring-series mutations have additional safeguards. Tasks, custom-object calendars, resource
          booking, and native Salesforce recurring-series editing are not configured by this guide.
          Org validation rules, flows, and required fields can affect event actions.
          Lightning Locker does not support the third-party custom elements used by this integration; Lightning Web Security is required.
        </p>
      </Section>

      {/* Source distribution */}
      <Section width="narrow" divider>
        <SectionHeader
          eyebrow="Source distribution"
          title="How the integration is assembled"
          subtitle="These components are defined in the source repository. Check your installed package against its release and contents."
          id="contents"
        />
        <div className="grid gap-px overflow-hidden rounded-2xl bg-hairline ring-1 ring-hairline sm:grid-cols-2">
          {contents.map((item) => (
            <div key={item.name} className="bg-raised p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-mono text-[13px] font-semibold text-fg">{item.name}</h3>
                <span className="rounded-full bg-sunken px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle ring-1 ring-inset ring-hairline">
                  {item.kind}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {item.text ?? (
                  <>
                    Bundled <code className={inlineCode}>@forcecalendar/core</code> and <code className={inlineCode}>@forcecalendar/interface</code> as
                    a single IIFE static resource. The calendar assets are loaded from your org rather than a runtime CDN.
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Install Steps */}
      <Section width="narrow" tone="sunken">
        <SectionHeader
          eyebrow="Install"
          title="Install in a sandbox first"
          subtitle="Check the installation, configure the real-data component, and validate access as a non-admin user."
          id="install"
        />
        <div className="max-w-3xl">
          <Stepper steps={installSteps} />
        </div>
      </Section>

      <Section width="narrow">
        <SectionHeader
          eyebrow="Lightning App Builder"
          title="Configure the source component"
          subtitle="These are the current source settings. Verify that your installed version exposes the same controls."
          id="configuration"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Default View", value: "month / week / day", text: "Starts in month view unless you choose another view." },
            { title: "Calendar Height", value: "800px by default", text: "Choose a CSS height appropriate for the Lightning page and test at smaller widths." },
            { title: "Read Only", value: "false by default", text: "Disables editing and dragging in the current source bundle. Enforce data access separately with Salesforce permissions." },
          ].map((setting) => (
            <div key={setting.title} className="rounded-xl bg-raised p-5 ring-1 ring-hairline">
              <h3 className="text-sm font-semibold text-fg">{setting.title}</h3>
              <p className="mt-2 font-mono text-xs text-accent-text">{setting.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{setting.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            <strong className={strong}>App and Home pages:</strong> show accessible Events in
            the requested date range. There is no owner-only filter configured by this guide.
          </p>
          <p>
            <strong className={strong}>Record pages:</strong> use the page&rsquo;s record ID to
            filter Events linked through WhoId or WhatId. They do not automatically include
            every Event on related child records. Test event creation on the specific record
            types your team uses; only supported Event relationships can be assigned.
          </p>
          <p>
            <strong className={strong}>Read-only mode:</strong> the current source bundle disables editing and dragging while preserving navigation and selection. The LWC also blocks save callbacks. Test these controls in your installed version. This setting does not revoke permissions elsewhere
            in Salesforce. Use profiles or permission sets to enforce data permissions.
          </p>
        </div>
      </Section>

      {/* For Developers */}
      <Section width="narrow">
        <SectionHeader
          eyebrow="CLI &amp; source"
          title="For developers"
          subtitle="Use an authenticated sandbox alias. Source builds require dependencies in both the repository root and src directory."
          id="developers"
        />

        <div className="space-y-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-semibold text-fg">Or clone and deploy from source</h3>
              <CodeBlock
                code={`git clone https://github.com/forcecalendar/salesforce.git
cd salesforce
npm ci
cd src
npm ci
cd ..
npm run build
cd dist
sf project deploy start --source-dir force-app --target-org your-sandbox-alias
sf apex run test --class-names ForceCalendarControllerTest --target-org your-sandbox-alias --result-format human --wait 10`}
                filename="Terminal"
              />
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The build script bundles <code className={inlineCode}>@forcecalendar/core</code> and <code className={inlineCode}>@forcecalendar/interface</code> from
                npm into a single static resource. The generated <code className={inlineCode}>dist/</code> directory
                contains <code className={inlineCode}>sfdx-project.json</code> and the deployable metadata;
                run the deploy command there. A source checkout and its resolved npm versions may
                differ from previously released Salesforce packages.
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-semibold text-fg">Generated source layout</h3>
              <CodeBlock
                dense
                code={`force-app/
  main/default/
    classes/
      ForceCalendarController.cls       # Apex: CRUD for Event records
      ForceCalendarControllerTest.cls   # Apex test class
    lwc/
      forceCalendar/                    # Production LWC (Apex-connected)
      forceCalendarDemo/                # Standalone demo (no Apex)
    permissionsets/
      ForceCalendarAccess.permissionset-meta.xml # Optional Apex access
    staticresources/
      forcecalendar.js                  # Bundled core + interface (IIFE)`}
                filename="dist/"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section width="narrow" divider>
        <SectionHeader eyebrow="Releases & compatibility" title="Review the version you deploy" subtitle="Keep the LWC, Apex controller, and static resource on the same release." id="releases" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl bg-raised p-6 ring-1 ring-hairline">
            <h3 className="text-base font-semibold">Salesforce distribution</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">Review release notes and the deployable source archive before installation. Released package 0.3.0.1 freezes Core 2.5.6 and Interface 1.9.0. A JavaScript package version is separate from a Salesforce install-package version.</p>
            <a className="mt-4 inline-flex text-sm font-medium text-accent-text hover:underline" href="https://github.com/forceCalendar/salesforce/releases">Salesforce releases ↗</a>
          </div>
          <div className="rounded-xl bg-raised p-6 ring-1 ring-hairline">
            <h3 className="text-base font-semibold">Lightning compatibility</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">Use Lightning Experience with Lightning Web Security enabled. Validate your org’s browser support, page configuration, event volume, and access model in a sandbox. Lightning Locker is not supported.</p>
            <a className="mt-4 inline-flex text-sm font-medium text-accent-text hover:underline" href="https://developer.salesforce.com/docs/platform/lwc/guide/create-use-custom-elements.html">Salesforce custom-element guidance ↗</a>
          </div>
        </div>
      </Section>

      {/* Screenshots */}
      <Section width="narrow" tone="sunken">
        <SectionHeader eyebrow="Salesforce Lightning captures" title="See the calendar in Salesforce" subtitle="Real Lightning captures of the demo with synthetic sample events. These show rendering and the demo interface; they do not verify live Apex event actions, the install package, or your org’s data access." id="screenshots" />
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          <span className="rounded-full bg-raised px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ring-1 ring-inset ring-hairline">Lightning Experience</span>
          <span>Synthetic demo data</span>
          <span>Core 2.5.5 · Interface 1.8.1 · October 2026</span>
        </div>
        <div className="space-y-5">
          <SalesforceScreenshot
            src="/salesforce-lightning-month-clean.png"
            alt="ForceCalendar Demo in Salesforce Lightning showing synthetic sample events in October 2026 month view"
            caption="Month view"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <SalesforceScreenshot
              src="/salesforce-lightning-week-clean.png"
              alt="ForceCalendar Demo in Salesforce Lightning showing timed and all-day synthetic sample events in week view"
              caption="Week view"
              sizes="(max-width: 640px) 100vw, 480px"
            />
            <SalesforceScreenshot
              src="/salesforce-lightning-day-clean.png"
              alt="ForceCalendar Demo in Salesforce Lightning showing synthetic sample events in day view"
              caption="Day view"
              sizes="(max-width: 640px) 100vw, 480px"
            />
          </div>
          <SalesforceScreenshot
            src="/salesforce-lightning-editor-clean.png"
            height={663}
            alt="Salesforce Lightning demo event creation form with a synthetic Project kickoff event, date fields, and Save Event control"
            caption="Event creation · synthetic sample-data workflow"
          />
        </div>
      </Section>

      <Footer />
    </div>
  );
}
