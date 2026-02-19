import Link from "next/link";

export default function Nav({ cta = "playground" }: { cta?: "playground" | "none" }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium text-white">
          <span className="italic">force</span>Calendar
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/core" className="text-neutral-400 hover:text-white transition-colors">
            Core
          </Link>
          <Link href="/interface" className="text-neutral-400 hover:text-white transition-colors">
            Interface
          </Link>
          <a href="https://docs.forcecalendar.org" className="text-neutral-400 hover:text-white transition-colors">
            Docs
          </a>
          <a href="https://github.com/forcecalendar" className="text-neutral-400 hover:text-white transition-colors">
            GitHub
          </a>
        </div>
        {cta === "playground" && (
          <Link
            href="/playground"
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-teal-500 text-black text-sm font-medium hover:bg-teal-400 transition-colors"
          >
            Playground
          </Link>
        )}
      </div>
    </nav>
  );
}
