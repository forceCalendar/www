import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import PageHeader from "../components/PageHeader";
import CodeBlock from "../components/CodeBlock";
import InstallCommand from "../components/InstallCommand";
import Button, { ExternalIcon } from "../components/Button";
import Stepper from "../components/Stepper";

export const metadata: Metadata = {
  title: "Install on Salesforce",
  description:
    "Install forceCalendar in your Salesforce org. One-click unlocked package with LWC components, Apex controller, and full Locker Service compliance.",
  alternates: { canonical: "https://forcecalendar.org/salesforce" },
  openGraph: { url: "https://forcecalendar.org/salesforce" },
};

const PACKAGE_ID = "04tg50000003qOfAAI";
const SANDBOX_INSTALL_URL = `https://test.salesforce.com/packaging/installPackage.apexp?p0=${PACKAGE_ID}`;
const PRODUCTION_INSTALL_URL = `https://login.salesforce.com/packaging/installPackage.apexp?p0=${PACKAGE_ID}`;

const contents = [
  {
    name: "forceCalendar",
    kind: "LWC",
    text: "Production-ready LWC component that connects to Salesforce Events through Apex. Supports month, week, and day views with create, update, and delete.",
  },
  {
    name: "forceCalendarDemo",
    kind: "LWC",
    text: "Standalone demo component with sample events. No Apex required. Use this to verify the install worked before wiring up real data.",
  },
  {
    name: "ForceCalendarController",
    kind: "Apex",
    text: "Apex controller for querying and managing Salesforce Event records. Includes test class with coverage.",
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
      title: "Install to your sandbox",
      children: (
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Click the button below to open the Salesforce package installer in your sandbox org.
            Log in with your sandbox credentials. Select &ldquo;Install for Admins Only&rdquo; or
            &ldquo;Install for All Users&rdquo; depending on who should access the calendar.
          </p>
          <Button href={SANDBOX_INSTALL_URL} target="_blank" rel="noopener noreferrer">
            <SalesforceGlyph />
            Install on Sandbox
          </Button>
        </div>
      ),
    },
    {
      title: "Add the calendar to a Lightning page",
      children: (
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <p>After install, the components are available in Lightning App Builder:</p>
          <ol className="list-decimal space-y-2 pl-5 marker:text-subtle">
            <li>Go to <strong className={strong}>Setup &rarr; Lightning App Builder</strong></li>
            <li>Create a new App Page or edit an existing one</li>
            <li>Search for <strong className={strong}>&ldquo;ForceCalendar&rdquo;</strong> in the component panel</li>
            <li>Drag <strong className={strong}>ForceCalendar Demo</strong> onto the page to verify it works</li>
            <li>Save, activate, and open the page</li>
          </ol>
          <p>
            The demo component loads sample events automatically. You should see a working calendar with month, week, and day views immediately.
          </p>
        </div>
      ),
    },
    {
      title: "Test thoroughly before production",
      children: (
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <p>Before deploying to production, verify in your sandbox:</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-subtle">
            <li>All three views (month, week, day) render correctly</li>
            <li>Event creation, editing, and deletion work with your data</li>
            <li>Calendar displays correctly for all user profiles that need access</li>
            <li>Performance is acceptable with your typical event volume</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Deploy to production",
      muted: true,
      children: (
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Once you&rsquo;ve verified everything works in your sandbox, install the same package in production.
          </p>
          <Button href={PRODUCTION_INSTALL_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
            Install on Production
          </Button>
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
        lede="One-click install via unlocked package. Includes LWC components, Apex controller, and the bundled static resource. No code required."
        aside={
          <div className="rounded-2xl bg-raised p-6 ring-1 ring-hairline shadow-elev-3 ring-hi lg:ml-auto lg:max-w-md">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">Unlocked package</span>
              <code className="font-mono text-xs text-muted">{PACKAGE_ID}</code>
            </div>
            <div className="mt-5 grid gap-3">
              <Button href={SANDBOX_INSTALL_URL} target="_blank" rel="noopener noreferrer" size="lg" className="w-full">
                <SalesforceGlyph />
                Install on Sandbox
                <ExternalIcon className="ml-auto h-3.5 w-3.5 opacity-70" />
              </Button>
              <Button href={PRODUCTION_INSTALL_URL} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary" className="w-full">
                Install on Production
                <ExternalIcon className="ml-auto h-3.5 w-3.5 opacity-70" />
              </Button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-subtle">
              Always test in a sandbox before deploying to production.
            </p>
          </div>
        }
      />

      {/* What You Get */}
      <Section width="narrow">
        <SectionHeader eyebrow="Contents" title="What the package includes" id="contents" />
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
                    a single IIFE file. Zero external dependencies.
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
          subtitle="Always test in a sandbox before deploying to production. This is an unlocked package, so you can inspect and modify every component after install."
          id="install"
        />
        <div className="max-w-3xl">
          <Stepper steps={installSteps} />
        </div>
      </Section>

      {/* For Developers */}
      <Section width="narrow">
        <SectionHeader
          eyebrow="CLI &amp; source"
          title="For developers"
          subtitle="If you prefer CLI deployment or want to customize the source code."
          id="developers"
        />

        <div className="space-y-10">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-fg">Install via Salesforce CLI</h3>
            <InstallCommand command={`sf package install --package ${PACKAGE_ID} --target-org your-sandbox-alias --wait 10`} />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-semibold text-fg">Or clone and deploy from source</h3>
              <CodeBlock
                code={`git clone https://github.com/forcecalendar/salesforce.git
cd salesforce
npm install
npm run build
cd dist
sf project deploy start --target-org your-sandbox-alias`}
                filename="Terminal"
              />
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The build script bundles <code className={inlineCode}>@forcecalendar/core</code> and <code className={inlineCode}>@forcecalendar/interface</code> from
                npm into a single static resource. You can modify the LWC components, Apex controller,
                or build configuration before deploying.
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-semibold text-fg">What the package installs</h3>
              <CodeBlock
                dense
                code={`force-app/
  main/default/
    classes/
      ForceCalendarController.cls       # Apex: CRUD for Event records
      ForceCalendarControllerTest.cls   # Test class with coverage
    lwc/
      forceCalendar/                    # Production LWC (Apex-connected)
      forceCalendarDemo/                # Standalone demo (no Apex)
    staticresources/
      forcecalendar.js                  # Bundled core + interface (IIFE)`}
                filename="Package contents"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Screenshots */}
      <Section width="narrow" tone="sunken">
        <SectionHeader eyebrow="In the org" title="What it looks like" id="screenshots" />
        <div className="space-y-5">
          <figure className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline shadow-elev-2">
            <Image
              src="/salesforce-month.png"
              alt="forceCalendar month view inside Salesforce"
              width={1388}
              height={860}
              className="h-auto w-full"
            />
            <figcaption className="border-t border-hairline px-4 py-2.5 text-xs font-medium text-muted">Month view with color-coded events</figcaption>
          </figure>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline shadow-elev-2">
              <Image
                src="/salesforce-week.png"
                alt="forceCalendar week view inside Salesforce"
                width={1388}
                height={860}
                className="h-auto w-full"
              />
              <figcaption className="border-t border-hairline px-4 py-2.5 text-xs font-medium text-muted">Week view</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline shadow-elev-2">
              <Image
                src="/salesforce-day.png"
                alt="forceCalendar day view inside Salesforce"
                width={1388}
                height={860}
                className="h-auto w-full"
              />
              <figcaption className="border-t border-hairline px-4 py-2.5 text-xs font-medium text-muted">Day view</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
