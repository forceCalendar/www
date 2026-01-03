"use client";

import { useState } from "react";

interface CodeSnippetProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeSnippet({
  code,
  language = 'javascript',
  filename,
  showLineNumbers = false
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className="relative group">
      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
        {filename && (
          <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <span className="text-xs font-mono text-slate-500">{filename}</span>
            <span className="text-xs text-emerald-500">{language}</span>
          </div>
        )}

        <div className="relative">
          <pre className="p-4 overflow-x-auto text-sm">
            <code className="text-slate-300">
              {showLineNumbers ? (
                <div className="flex">
                  <div className="select-none pr-4 text-slate-600">
                    {lines.map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    {code}
                  </div>
                </div>
              ) : (
                code
              )}
            </code>
          </pre>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`
              absolute top-2 right-2 px-3 py-1.5 rounded text-xs font-mono
              transition-all duration-200
              ${copied
                ? 'bg-emerald-500 text-black'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white opacity-0 group-hover:opacity-100'
              }
            `}
            aria-label="Copy code"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}