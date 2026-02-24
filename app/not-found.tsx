import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-slate-200 dark:text-slate-700 mb-4">
            404
          </h1>
          <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-3">
            Page not found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              Go home
            </Link>
            <Link
              href="/playground"
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              Try Playground
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
