"use client";

import { useNpmVersion } from "@/hooks/useNpmVersion";

interface VersionBadgeProps {
  packageName: string;
  color?: "emerald" | "blue";
  showNewBadge?: boolean;
  newReleaseDays?: number;
}

/**
 * Displays the current version of an npm package with an optional "new release" indicator
 */
export default function VersionBadge({
  packageName,
  color = "emerald",
  showNewBadge = true,
  newReleaseDays = 7,
}: VersionBadgeProps) {
  const { version, isLoading, error, isNewRelease } = useNpmVersion(
    packageName,
    newReleaseDays
  );

  const colorClasses = {
    emerald: {
      badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      glow: "bg-emerald-500",
    },
    blue: {
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      glow: "bg-blue-500",
    },
  };

  if (isLoading) {
    return (
      <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
        <span className="w-12 h-4 bg-slate-800 animate-pulse rounded" />
      </span>
    );
  }

  if (error || !version) {
    return (
      <span className="text-xs font-mono text-slate-400" title="Version unavailable">
        v--
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-xs font-mono text-slate-400">v{version}</span>
      {showNewBadge && isNewRelease && (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border rounded-full ${colorClasses[color].badge}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${colorClasses[color].glow} animate-pulse`}
          />
          New
        </span>
      )}
    </span>
  );
}
