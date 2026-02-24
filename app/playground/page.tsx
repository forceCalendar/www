import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "Playground — Live Calendar Demo",
  description:
    "Interactive playground for forceCalendar. Configure and test real Web Components with live code output.",
  alternates: { canonical: "https://forcecalendar.org/playground" },
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-green-400 uppercase tracking-wider mb-3">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Live
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">
            Playground
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            The real{" "}
            <code className="text-sm font-mono text-cyan-600 dark:text-cyan-400">
              @forcecalendar/interface
            </code>{" "}
            web component running live. Configure options and copy the output.
          </p>
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
