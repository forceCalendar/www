import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "Playground - Live Calendar Demo",
  description:
    "Interactive playground for forceCalendar. Configure and test real Web Components with live code output.",
  alternates: { canonical: "https://forcecalendar.org/playground" },
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="relative pt-24 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-emerald-200 dark:ring-emerald-500/25 text-xs font-mono font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-6">
              <span className="relative flex w-2 h-2" aria-hidden>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
              </span>
              Live
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white mb-3">
              Playground
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              The real{" "}
              <code className="text-sm font-mono text-cyan-600 dark:text-cyan-400">
                @forcecalendar/interface
              </code>{" "}
              web component running live. Load sample events, switch views,
              watch the DOM events fire, and copy ready-to-paste code for
              HTML, React, or Vue.
            </p>
          </div>
        </div>
      </section>

      {/* Playground */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <PlaygroundClient />
        </div>
      </section>

      <Footer />
    </div>
  );
}
