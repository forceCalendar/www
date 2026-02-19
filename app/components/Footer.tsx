import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
