import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import CodeBlock from "../components/CodeBlock";
import InstallCommand from "../components/InstallCommand";

export const metadata: Metadata = {
  title: "Install on Salesforce",
  description:
    "Install forceCalendar in your Salesforce org. One-click unlocked package with LWC components, Apex controller, and full Locker Service compliance.",
  alternates: { canonical: "https://forcecalendar.org/salesforce" },
};

const SANDBOX_INSTALL_URL =
  "https://test.salesforce.com/packaging/installPackage.apexp?p0=04tg50000003qOfAAI";
const PRODUCTION_INSTALL_URL =
  "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg50000003qOfAAI";

export default function SalesforcePage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="relative pt-24 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 ring-1 ring-brand-200 dark:ring-brand-500/25 text-xs font-mono font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-6">
              Salesforce Integration
            </div>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
              Install forceCalendar on Salesforce
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
              One-click install via unlocked package. Includes LWC components, Apex
              controller, and the bundled static resource. No code required.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="What the package includes"
            id="contents"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-2">forceCalendar</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Production-ready LWC component that connects to Salesforce Events through Apex.
                Supports month, week, and day views with create, update, and delete.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-2">forceCalendarDemo</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Standalone demo component with sample events. No Apex required.
                Use this to verify the install worked before wiring up real data.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-2">ForceCalendarController</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Apex controller for querying and managing Salesforce Event records.
                Includes test class with coverage.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-2">Static Resource</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Bundled <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">@forcecalendar/core</code> and <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">@forcecalendar/interface</code> as
                a single IIFE file. Zero external dependencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Install Steps */}
      <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Install in a sandbox first"
            subtitle="Always test in a sandbox before deploying to production. This is an unlocked package, so you can inspect and modify every component after install."
            id="install"
          />

          {/* Step 1 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm font-semibold flex items-center justify-center">
                1
              </span>
              <h3 className="font-medium text-slate-900 dark:text-white">
                Install to your sandbox
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 ml-10 leading-relaxed">
              Click the button below to open the Salesforce package installer in your sandbox org.
              Log in with your sandbox credentials. Select &ldquo;Install for Admins Only&rdquo; or
              &ldquo;Install for All Users&rdquo; depending on who should access the calendar.
            </p>
            <div className="ml-10">
              <a
                href={SANDBOX_INSTALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00A1E0] text-white text-sm font-medium rounded-lg shadow-sm shadow-[#00A1E0]/25 hover:bg-[#0082B4] hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A1E0] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10.05 4.2a4.83 4.83 0 0 1 3.57 1.59 3.86 3.86 0 0 1 5.4.44 3.86 3.86 0 0 1 1.87 6.64 4.34 4.34 0 0 1-3.37 5.13H7.38a5.28 5.28 0 0 1-4.16-2.07A5.28 5.28 0 0 1 5.6 7.2a4.83 4.83 0 0 1 4.45-3z" /></svg>
                Install on Sandbox
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm font-semibold flex items-center justify-center">
                2
              </span>
              <h3 className="font-medium text-slate-900 dark:text-white">
                Add the calendar to a Lightning page
              </h3>
            </div>
            <div className="ml-10 space-y-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <p>After install, the components are available in Lightning App Builder:</p>
              <ol className="list-decimal list-inside space-y-2 pl-1">
                <li>Go to <strong className="text-slate-700 dark:text-slate-300">Setup &rarr; Lightning App Builder</strong></li>
                <li>Create a new App Page or edit an existing one</li>
                <li>Search for <strong className="text-slate-700 dark:text-slate-300">&ldquo;ForceCalendar&rdquo;</strong> in the component panel</li>
                <li>Drag <strong className="text-slate-700 dark:text-slate-300">ForceCalendar Demo</strong> onto the page to verify it works</li>
                <li>Save, activate, and open the page</li>
              </ol>
              <p>
                The demo component loads sample events automatically. You should see a working calendar with month, week, and day views immediately.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm font-semibold flex items-center justify-center">
                3
              </span>
              <h3 className="font-medium text-slate-900 dark:text-white">
                Test thoroughly before production
              </h3>
            </div>
            <div className="ml-10 space-y-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <p>Before deploying to production, verify in your sandbox:</p>
              <ul className="list-disc list-inside space-y-2 pl-1">
                <li>All three views (month, week, day) render correctly</li>
                <li>Event creation, editing, and deletion work with your data</li>
                <li>Calendar displays correctly for all user profiles that need access</li>
                <li>Performance is acceptable with your typical event volume</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-semibold flex items-center justify-center">
                4
              </span>
              <h3 className="font-medium text-slate-900 dark:text-white">
                Deploy to production
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 ml-10 leading-relaxed">
              Once you&rsquo;ve verified everything works in your sandbox, install the same package in production.
            </p>
            <div className="ml-10">
              <a
                href={PRODUCTION_INSTALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
              >
                Install on Production
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* For Developers */}
      <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="For developers"
            subtitle="If you prefer CLI deployment or want to customize the source code."
            id="developers"
          />

          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-3 text-sm">
                Install via Salesforce CLI
              </h3>
              <InstallCommand command="sf package install --package 04tg50000003qOfAAI --target-org your-sandbox-alias --wait 10" />
            </div>

            <div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-3 text-sm">
                Or clone and deploy from source
              </h3>
              <CodeBlock
                code={`git clone https://github.com/forceCalendar/salesforce.git
cd salesforce
npm install
npm run build
cd dist
sf project deploy start --target-org your-sandbox-alias`}
                filename="Terminal"
              />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                The build script bundles <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">@forcecalendar/core</code> and <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">@forcecalendar/interface</code> from
                npm into a single static resource. You can modify the LWC components, Apex controller,
                or build configuration before deploying.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-3 text-sm">
                What the package installs
              </h3>
              <CodeBlock
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
      </section>

      {/* Screenshots */}
      <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="What it looks like"
            id="screenshots"
          />
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
              <Image
                src="/salesforce-month.png"
                alt="forceCalendar month view inside Salesforce"
                width={1388}
                height={860}
                className="w-full h-auto"
              />
              <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Month view with color-coded events</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
                <Image
                  src="/salesforce-week.png"
                  alt="forceCalendar week view inside Salesforce"
                  width={1388}
                  height={860}
                  className="w-full h-auto"
                />
                <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Week view</p>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60">
                <Image
                  src="/salesforce-day.png"
                  alt="forceCalendar day view inside Salesforce"
                  width={1388}
                  height={860}
                  className="w-full h-auto"
                />
                <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Day view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
