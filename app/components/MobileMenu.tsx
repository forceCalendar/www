"use client";

import { useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/core", label: "Core" },
  { href: "/interface", label: "Interface" },
  { href: "/salesforce", label: "Salesforce" },
  { href: "/playground", label: "Playground" },
  { href: "https://docs.forcecalendar.org", label: "Docs", external: true },
  { href: "https://github.com/forcecalendar", label: "GitHub", external: true },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 md:hidden animate-slide-in">
        <div className="flex items-center justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-4 space-y-1">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block px-3 py-2.5 rounded-md text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block px-3 py-2.5 rounded-md text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
}
