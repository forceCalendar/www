import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "Playground - Live Calendar Demo",
  description:
    "Interactive playground for forceCalendar. Configure and test real Web Components with live code output.",
  alternates: { canonical: "https://forcecalendar.org/playground" },
  openGraph: { url: "https://forcecalendar.org/playground" },
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <PageHeader
        width="page"
        compact
        eyebrow={
          <>
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </>
        }
        title="Playground"
        lede={
          <>
            The real{" "}
            <code className="font-mono text-[0.9em] text-accent-text">@forcecalendar/interface</code>{" "}
            web component running live. Load sample events, switch views,
            watch the DOM events fire, and copy ready-to-paste code for
            HTML, React, or Vue. Prefer a real editor?{" "}
            <a
              href="https://stackblitz.com/github/forceCalendar/examples/tree/main/vanilla-vite"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-text hover:underline"
            >
              Open the starter in StackBlitz
            </a>
            .
          </>
        }
      />

      {/* Playground */}
      <section className="bg-sunken px-6 py-10 lg:py-12">
        <div className="mx-auto max-w-page">
          <PlaygroundClient />
        </div>
      </section>

      <Footer />
    </div>
  );
}
