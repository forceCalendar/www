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
      type="button"
      onClick={handleCopy}
      aria-label={`Copy install command: ${command}`}
      className="group inline-flex max-w-full items-center gap-3 rounded-lg bg-raised py-2.5 pl-4 pr-2.5 text-left font-mono text-[13px] text-fg ring-1 ring-inset ring-line shadow-elev-1 transition-[box-shadow,ring-color] hover:shadow-elev-2 hover:ring-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:ring-hairline dark:shadow-none dark:hover:ring-line"
    >
      <span className="select-none text-accent-text" aria-hidden>
        $
      </span>
      <span className="min-w-0 break-all sm:break-normal">{command}</span>
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-sunken text-subtle ring-1 ring-inset ring-hairline transition-colors group-hover:text-fg">
        {copied ? (
          <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </span>
    </button>
  );
}
