"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { detectSection, buildUrl, isDevelopment, Section } from "@/lib/utils/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const [currentSection, setCurrentSection] = useState<Section>('main');
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    // Get the current hostname
    const host = window.location.hostname;
    setHostname(host);

    // Detect the current section
    const section = detectSection(host, pathname);
    setCurrentSection(section);
  }, [pathname]);

  const isCore = currentSection === 'core';
  const isInterface = currentSection === 'interface';
  const isHome = currentSection === 'main';

  // Navigation helper - uses absolute URLs for production, relative for dev
  const NavLink = ({ section, path = '', children, className = '' }: {
    section: Section;
    path?: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const href = buildUrl(section, path);
    const isActive = currentSection === section && (
      path === '' || pathname === (isDevelopment() ? href : path)
    );

    // For development, use Next.js Link
    if (isDevelopment()) {
      return (
        <Link
          href={href}
          className={`nav-link ${isActive ? 'nav-link-active' : ''} ${className}`}
        >
          {children}
        </Link>
      );
    }

    // For production (subdomains), use regular anchor tags
    return (
      <a
        href={href}
        className={`nav-link ${isActive ? 'nav-link-active' : ''} ${className}`}
      >
        {children}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo - always links to home */}
        <NavLink section="main" path="">
          <span className="flex items-center space-x-3">
            <span className="text-xl tracking-tight">
              <span className="font-light">force</span>
              <span className="font-semibold">Calendar</span>
            </span>
            {isCore && <span className="badge badge-core text-xs">CORE</span>}
            {isInterface && <span className="badge badge-core text-xs">INTERFACE</span>}
          </span>
        </NavLink>

        {/* Main Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Main sections - always visible */}
          <NavLink section="main" path="">
            Home
          </NavLink>
          <NavLink section="core" path="">
            Core
          </NavLink>
          <NavLink section="interface" path="">
            Interface
          </NavLink>

          {/* Divider when showing context links */}
          {(isCore || isInterface) && (
            <div className="w-px h-5 bg-gray-700" />
          )}

          {/* Context-specific links */}
          {isCore && (
            <>
              <NavLink section="core" path="/docs">
                Docs
              </NavLink>
              <NavLink section="core" path="/api">
                API
              </NavLink>
              <NavLink section="core" path="/examples">
                Examples
              </NavLink>
            </>
          )}

          {isInterface && (
            <>
              <NavLink section="interface" path="/components">
                Components
              </NavLink>
              <NavLink section="interface" path="/docs">
                Docs
              </NavLink>
              <NavLink section="interface" path="/playground">
                Playground
              </NavLink>
            </>
          )}
        </div>

        {/* External Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/forcecalendar"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
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
            className="btn btn-primary text-sm px-4 py-2"
          >
            {isHome ? 'Get Started' : 'npm'}
          </a>
        </div>
      </div>
    </nav>
  );
}