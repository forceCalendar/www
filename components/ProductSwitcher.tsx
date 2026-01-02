"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductSwitcher() {
  const pathname = usePathname();

  // Determine active product based on path
  const isCore = pathname.startsWith('/core');
  const isInterface = pathname.startsWith('/interface');
  const isMain = !isCore && !isInterface;

  return (
    <div className="inline-flex items-center bg-slate-900 border border-slate-800 p-1">
      <Link
        href="/"
        className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
          isMain
            ? 'bg-slate-800 text-white'
            : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        Main
      </Link>
      <Link
        href="/core"
        className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
          isCore
            ? 'bg-emerald-500/20 text-emerald-500'
            : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        Core
      </Link>
      <Link
        href="/interface"
        className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
          isInterface
            ? 'bg-blue-500/20 text-blue-500'
            : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        Interface
      </Link>
    </div>
  );
}