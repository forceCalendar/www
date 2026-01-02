"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductSwitcher from "./ProductSwitcher";

export default function Navigation() {
  const pathname = usePathname();

  // Determine active section
  const isCore = pathname.startsWith('/core');
  const isInterface = pathname.startsWith('/interface');
  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 group"
        >
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-500 transition-colors">
            forceCalendar
          </span>
          {isCore && (
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-mono uppercase">
              Core
            </span>
          )}
          {isInterface && (
            <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-500 text-xs font-mono uppercase">
              Interface
            </span>
          )}
        </Link>

        {/* Center - Product Switcher */}
        <div className="hidden md:flex items-center">
          <ProductSwitcher />
        </div>

        {/* Right Side - Context Links & Actions */}
        <div className="flex items-center space-x-6">
          {/* Context-specific links */}
          {isCore && (
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/core/docs"
                className={`text-sm font-mono ${
                  pathname === '/core/docs' ? 'text-emerald-500' : 'text-slate-400 hover:text-white'
                } transition-colors`}
              >
                Docs
              </Link>
              <Link
                href="/core/api"
                className={`text-sm font-mono ${
                  pathname === '/core/api' ? 'text-emerald-500' : 'text-slate-400 hover:text-white'
                } transition-colors`}
              >
                API
              </Link>
              <Link
                href="/core/examples"
                className={`text-sm font-mono ${
                  pathname === '/core/examples' ? 'text-emerald-500' : 'text-slate-400 hover:text-white'
                } transition-colors`}
              >
                Examples
              </Link>
            </div>
          )}

          {isInterface && (
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/interface/components"
                className={`text-sm font-mono ${
                  pathname === '/interface/components' ? 'text-blue-500' : 'text-slate-400 hover:text-white'
                } transition-colors`}
              >
                Components
              </Link>
              <Link
                href="/interface/docs"
                className={`text-sm font-mono ${
                  pathname === '/interface/docs' ? 'text-blue-500' : 'text-slate-400 hover:text-white'
                } transition-colors`}
              >
                Docs
              </Link>
              <Link
                href="/interface/playground"
                className={`text-sm font-mono ${
                  pathname === '/interface/playground' ? 'text-blue-500' : 'text-slate-400 hover:text-white'
                } transition-colors`}
              >
                Playground
              </Link>
            </div>
          )}

          {/* External Links */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/forcecalendar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href={isInterface ? "https://www.npmjs.com/package/@forcecalendar/interface" : "https://www.npmjs.com/package/@forcecalendar/core"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-500 text-black text-xs font-mono font-semibold uppercase hover:bg-emerald-400 transition-colors"
            >
              npm
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Product Switcher */}
      <div className="md:hidden border-t border-slate-800 px-4 py-2">
        <ProductSwitcher />
      </div>
    </nav>
  );
}