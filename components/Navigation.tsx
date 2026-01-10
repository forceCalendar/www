"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProductSwitcher from "./ProductSwitcher";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine active section
  const isCore = pathname.startsWith('/core');
  const isInterface = pathname.startsWith('/interface');
  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-50 glass-premium" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet/5 to-transparent pointer-events-none" />
      <div className="container-custom flex items-center justify-between h-16 relative">
        {/* Logo with Premium Typography */}
        <Link
          href="/"
          className="flex items-center space-x-3 group"
        >
          <span className="text-xl tracking-tight">
            <em className="font-light italic" style={{ fontFamily: 'Georgia, serif', background: 'linear-gradient(135deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>force</em>
            <strong className="font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">Calendar</strong>
          </span>
          {isCore && (
            <span className="glass-premium px-3 py-1 rounded-full text-xs font-mono-custom uppercase tracking-wider"
              style={{
                color: 'var(--violet)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
              }}>
              Core
            </span>
          )}
          {isInterface && (
            <span className="glass-premium px-3 py-1 rounded-full text-xs font-mono-custom uppercase tracking-wider"
              style={{
                color: 'var(--cyan)',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)'
              }}>
              Interface
            </span>
          )}
        </Link>

        {/* Center - Product Switcher */}
        <div className="hidden md:flex items-center">
          <ProductSwitcher />
        </div>

        {/* Right Side - Context Links & Actions */}
        <div className="flex items-center gap-8">
          {/* Context-specific links with Premium Styling */}
          {isCore && (
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-1 glass-premium px-1 py-1 rounded-lg">
                <Link
                  href="/core/docs"
                  className={`px-3 py-1.5 rounded-md text-sm font-mono-custom transition-all duration-300 ${
                    pathname === '/core/docs'
                      ? 'bg-violet/20 text-white'
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ color: pathname === '/core/docs' ? undefined : 'var(--text-secondary)' }}
                >
                  Docs
                </Link>
                <Link
                  href="/core/api"
                  className={`px-3 py-1.5 rounded-md text-sm font-mono-custom transition-all duration-300 ${
                    pathname === '/core/api'
                      ? 'bg-violet/20 text-white'
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ color: pathname === '/core/api' ? undefined : 'var(--text-secondary)' }}
                >
                  API
                </Link>
                <Link
                  href="/core/examples"
                  className={`px-3 py-1.5 rounded-md text-sm font-mono-custom transition-all duration-300 ${
                    pathname === '/core/examples'
                      ? 'bg-violet/20 text-white'
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ color: pathname === '/core/examples' ? undefined : 'var(--text-secondary)' }}
                >
                  Examples
                </Link>
              </div>
            </div>
          )}

          {isInterface && (
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-1 glass-premium px-1 py-1 rounded-lg">
                <Link
                  href="/interface/components"
                  className={`px-3 py-1.5 rounded-md text-sm font-mono-custom transition-all duration-300 ${
                    pathname === '/interface/components'
                      ? 'bg-cyan/20 text-white'
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ color: pathname === '/interface/components' ? undefined : 'var(--text-secondary)' }}
                >
                  Components
                </Link>
                <Link
                  href="/interface/docs"
                  className={`px-3 py-1.5 rounded-md text-sm font-mono-custom transition-all duration-300 ${
                    pathname === '/interface/docs'
                      ? 'bg-cyan/20 text-white'
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ color: pathname === '/interface/docs' ? undefined : 'var(--text-secondary)' }}
                >
                  Docs
                </Link>
                <Link
                  href="/interface/playground"
                  className={`px-3 py-1.5 rounded-md text-sm font-mono-custom transition-all duration-300 ${
                    pathname === '/interface/playground'
                      ? 'bg-cyan/20 text-white'
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ color: pathname === '/interface/playground' ? undefined : 'var(--text-secondary)' }}
                >
                  Playground
                </Link>
              </div>
            </div>
          )}

          {/* External Links with Premium Design - Separated visually */}
          <div className="flex items-center space-x-3">
            {/* Playground Link */}
            <Link
              href="/playground"
              className="hidden md:block px-4 py-2 rounded-lg text-sm font-mono-custom transition-all duration-300 hover:bg-white/5"
              style={{ color: 'var(--text-secondary)' }}
            >
              Playground
            </Link>

            {/* GitHub - Context-aware Premium Glass Button */}
            <a
              href={
                isCore ? "https://github.com/forcecalendar/core" :
                isInterface ? "https://github.com/forcecalendar/interface" :
                "https://github.com/forcecalendar"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="glass-premium px-3 py-2 rounded-lg hover:scale-105 transition-all duration-300 group inline-flex items-center gap-2"
              aria-label="GitHub"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {/* Show context indicator */}
              <span className="hidden lg:inline text-xs font-mono-custom" style={{ color: 'var(--text-muted)' }}>
                {isCore ? "core" : isInterface ? "interface" : "org"}
              </span>
            </a>

            {/* NPM - Premium Gradient Button */}
            <a
              href={isInterface ? "https://www.npmjs.com/package/@forcecalendar/interface" : "https://www.npmjs.com/package/@forcecalendar/core"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet via-cyan to-violet bg-[length:200%_100%] animate-gradient-shift opacity-80" />
              <div className="relative px-4 py-1.5 glass-premium">
                <span className="text-xs font-mono-custom font-semibold uppercase tracking-wider text-white">npm</span>
              </div>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Premium Design */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-premium" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="px-4 py-4 space-y-3">
            <ProductSwitcher />

            <div className="pt-3 border-t border-slate-800">
              <Link
                href="/playground"
                className="block py-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Playground
              </Link>

              {isCore && (
                <>
                  <Link
                    href="/core/docs"
                    className="block py-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                  <Link
                    href="/core/api"
                    className="block py-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    API Reference
                  </Link>
                </>
              )}

              {isInterface && (
                <>
                  <Link
                    href="/interface/components"
                    className="block py-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Components
                  </Link>
                  <Link
                    href="/interface/docs"
                    className="block py-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}