"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    const interval = setInterval(() => {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      let result = "";
      for (let i = 0; i < 3; i++) {
        if (Math.random() > 0.8) {
          result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          result += "404"[i];
        }
      }
      setGlitchText(result);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative text-center px-4">
        {/* Glitch Effect 404 */}
        <div className="relative inline-block mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white relative">
            <span className="absolute inset-0 text-red-500 opacity-70" style={{ transform: 'translateX(-2px)' }}>
              {glitchText}
            </span>
            <span className="absolute inset-0 text-cyan-500 opacity-70" style={{ transform: 'translateX(2px)' }}>
              {glitchText}
            </span>
            <span className="relative">{glitchText}</span>
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        {/* ASCII Art Calendar */}
        <div className="font-mono text-xs text-slate-600 mb-8">
          <pre className="inline-block text-left">
{`┌─────────────────────┐
│  Su Mo Tu We Th Fr  │
│  -- -- -- -- -- -- │
│  ?  ?  ?  ?  ?  ?  │
│  ?  ?  ?  ?  ?  ?  │
│  ?  ?  ?  404 ?  ?  │
│  ?  ?  ?  ?  ?  ?  │
└─────────────────────┘`}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
          >
            Go Home
          </Link>

          <Link
            href="/playground"
            className="px-6 py-3 border border-slate-700 text-white hover:bg-slate-900 hover:border-slate-600 transition-all"
          >
            Try Playground
          </Link>

          <Link
            href="/docs"
            className="px-6 py-3 border border-slate-700 text-white hover:bg-slate-900 hover:border-slate-600 transition-all"
          >
            View Docs
          </Link>
        </div>

        {/* Error Code */}
        <div className="mt-12 p-4 bg-slate-900 border border-slate-800 rounded-lg inline-block">
          <code className="text-xs text-slate-500">
            Error Code: CALENDAR_EVENT_NOT_FOUND
          </code>
        </div>
      </div>
    </div>
  );
}