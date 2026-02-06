import Link from "next/link";

const featureList = [
  {
    title: "Security-First by Design",
    desc: "Zero dependencies and CSP-safe patterns reduce review and deployment risk.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    color: "emerald",
  },
  {
    title: "Performance at Scale",
    desc: "Spatial indexing keeps scheduling and lookups fast with large event volumes.",
    icon: "M13 3L4 14h7l-2 7 9-11h-7l2-7z",
    color: "amber",
  },
  {
    title: "Timezone Accuracy",
    desc: "Full IANA timezone support with daylight-saving transitions handled correctly.",
    icon: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z",
    color: "teal",
  },
  {
    title: "Recurrence Rules",
    desc: "Standards-aligned recurrence and exceptions for complex enterprise schedules.",
    icon: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z",
    color: "violet",
  },
  {
    title: "ICS Import / Export",
    desc: "iCalendar file support for interoperability with existing calendar systems.",
    icon: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7v4h-2v-4h-2l3-3 3 3h-2z",
    color: "blue",
  },
  {
    title: "TypeScript Included",
    desc: "Typed APIs improve integration confidence and reduce runtime surprises.",
    icon: "M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.086.567.297.733.611.775-.507.775-.507 1.316-.852-.185-.282-.282-.394-.41-.534-.347-.391-.814-.604-1.564-.581l-.391.053c-.373.095-.722.298-.989.571-.811.829-.591 2.275.3 2.872.876.591 2.157.718 2.32 1.274.159.604-.377.799-.852.726-.399-.065-.621-.278-.854-.603l-1.369.788c.154.314.362.463.565.662.985.964 3.453.917 3.896-.649.015-.061.129-.484.036-1.13l.002.002zM9.064 15.418l.001-5.677 1.582-.001v-1.316H5.113v1.316h1.581l-.001 5.677h2.371z",
    color: "blue",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-medium text-white">
            <span className="italic">force</span>Calendar
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#why" className="text-neutral-400 hover:text-white transition-colors">
              Why
            </a>
            <a href="#products" className="text-neutral-400 hover:text-white transition-colors">
              Products
            </a>
            <a href="#features" className="text-neutral-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="https://docs.forcecalendar.org" className="text-neutral-400 hover:text-white transition-colors">
              Docs
            </a>
            <a href="https://github.com/forcecalendar" className="text-neutral-400 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
          <Link
            href="/playground"
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-teal-500 text-black text-sm font-medium hover:bg-teal-400 transition-colors"
          >
            Start with Playground
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
            Build secure enterprise calendars without fighting CSP or Locker.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            Headless core plus framework-agnostic UI components for Salesforce and other strict enterprise environments.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/playground"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-black font-medium rounded-lg hover:bg-teal-400 transition-colors w-full sm:w-auto"
            >
              Open Playground
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="https://docs.forcecalendar.org"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-700 text-white font-medium rounded-lg hover:border-neutral-500 transition-colors w-full sm:w-auto"
            >
              Read Docs
            </a>
          </div>
          <div className="mt-6">
            <code className="inline-block px-5 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 font-mono">
              npm install @forcecalendar/core @forcecalendar/interface
            </code>
          </div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "MIT Licensed",
            "Zero Dependencies",
            "TypeScript Included",
            "Salesforce Locker Compatible",
          ].map((item) => (
            <div
              key={item}
              className="text-sm text-neutral-300 bg-neutral-950 border border-neutral-900 rounded-lg px-4 py-3 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="why" className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-10">Built for strict environments</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                problem: "Locker Restrictions",
                solution: "No blocked JavaScript patterns that break in Salesforce environments.",
              },
              {
                problem: "Strict CSP",
                solution: "CSP-safe component patterns without inline-style violations.",
              },
              {
                problem: "Security Reviews",
                solution: "Zero dependency footprint to simplify legal and security approvals.",
              },
            ].map((item) => (
              <div key={item.problem} className="p-5 rounded-xl bg-neutral-950 border border-neutral-900">
                <p className="text-sm text-neutral-500 mb-2">{item.problem}</p>
                <p className="text-white leading-relaxed">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-3">Two packages, one architecture</h2>
          <p className="text-neutral-400 mb-8">Use Core for scheduling logic and Interface for production-ready UI components.</p>
          <div className="mb-8 inline-flex items-center px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-900 text-sm text-neutral-300 font-mono">
            @forcecalendar/core <span className="mx-2 text-neutral-600">-&gt;</span> @forcecalendar/interface <span className="mx-2 text-neutral-600">-&gt;</span> Your App
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/core"
              className="group p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 hover:-translate-y-0.5 transition-all"
            >
              <div className="text-xs font-mono text-violet-500 uppercase tracking-wider mb-3">Core Engine</div>
              <h3 className="text-xl font-semibold text-white mb-2">@forcecalendar/core</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                Pure JavaScript scheduling engine with no DOM and no dependencies.
              </p>
              <p className="text-sm text-neutral-300 mb-4">Use when you need headless calendar logic in secure runtimes.</p>
              <span className="text-sm text-violet-500 group-hover:text-violet-400 transition-colors">Learn more -&gt;</span>
            </Link>

            <Link
              href="/interface"
              className="group p-6 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 hover:-translate-y-0.5 transition-all"
            >
              <div className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-3">UI Components</div>
              <h3 className="text-xl font-semibold text-white mb-2">@forcecalendar/interface</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                Web Components powered by Core and compatible with any framework.
              </p>
              <p className="text-sm text-neutral-300 mb-4">Use when you need calendar UI shipped quickly without framework lock-in.</p>
              <span className="text-sm text-cyan-500 group-hover:text-cyan-400 transition-colors">Learn more -&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto text-center rounded-2xl border border-neutral-900 bg-gradient-to-b from-neutral-950 to-black p-10">
          <h2 className="text-2xl font-semibold text-white mb-4">See forceCalendar in action</h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Test real components, create events, and evaluate behavior before integrating into your app.
          </p>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-black font-medium rounded-lg hover:bg-teal-400 transition-colors"
          >
            Open Playground
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section id="features" className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-10">What&apos;s included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureList.map((feature) => {
              const colorClasses: Record<string, string> = {
                teal: "text-teal-400 bg-teal-500/10",
                violet: "text-violet-400 bg-violet-500/10",
                blue: "text-blue-400 bg-blue-500/10",
                amber: "text-amber-400 bg-amber-500/10",
                emerald: "text-emerald-400 bg-emerald-500/10",
              };

              return (
                <div
                  key={feature.title}
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all duration-200 hover:bg-neutral-900/50"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses[feature.color]}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-neutral-500">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-600 text-sm">MIT License</span>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="https://docs.forcecalendar.org" className="hover:text-white transition-colors">
              Docs
            </a>
            <a href="https://github.com/forcecalendar" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://www.npmjs.com/org/forcecalendar" className="hover:text-white transition-colors">
              npm
            </a>
            <Link href="/playground" className="hover:text-white transition-colors">
              Playground
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
