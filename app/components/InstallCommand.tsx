"use client";

import { useState } from "react";

export default function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may fail in some contexts
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copy install command: ${command}`}
      className="group inline-flex items-center gap-3 pl-4 pr-3 py-3 bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl text-sm font-mono text-slate-700 dark:text-slate-300 shadow-sm transition-all hover:ring-slate-300 dark:hover:ring-slate-700 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
    >
      <span className="text-brand-500 dark:text-brand-400 select-none" aria-hidden>
        $
      </span>
      <span className="text-left">{command}</span>
      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
        {copied ? (
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </span>
    </button>
  );
}
