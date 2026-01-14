import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-medium text-white mb-4">Page Not Found</h2>
        <p className="text-neutral-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2.5 bg-teal-500 text-black text-sm font-medium rounded-lg hover:bg-teal-400 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/playground"
            className="px-5 py-2.5 border border-neutral-800 text-white text-sm font-medium rounded-lg hover:bg-neutral-900 transition-colors"
          >
            Try Playground
          </Link>
          <a
            href="https://docs.forcecalendar.org"
            className="px-5 py-2.5 border border-neutral-800 text-white text-sm font-medium rounded-lg hover:bg-neutral-900 transition-colors"
          >
            View Docs
          </a>
        </div>
      </div>
    </div>
  );
}
