const PACKAGES = [
  { pkg: "@forcecalendar/core", label: "core", releases: "https://github.com/forcecalendar/core/releases" },
  { pkg: "@forcecalendar/interface", label: "interface", releases: "https://github.com/forcecalendar/interface/releases" },
];

const NEW_WINDOW_DAYS = 14;

interface ReleaseInfo {
  label: string;
  version: string;
  releases: string;
  isNew: boolean;
}

async function getLatestReleases(): Promise<ReleaseInfo[]> {
  const results = await Promise.all(
    PACKAGES.map(async ({ pkg, label, releases }) => {
      try {
        const res = await fetch(`https://registry.npmjs.org/${pkg}`, {
          next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const data: { "dist-tags": { latest: string }; time: Record<string, string> } =
          await res.json();
        const version = data["dist-tags"].latest;
        const publishedAt = new Date(data.time[version]);
        const ageDays = (Date.now() - publishedAt.getTime()) / 86400000;
        return { label, version, releases, isNew: ageDays <= NEW_WINDOW_DAYS };
      } catch {
        return null;
      }
    })
  );
  return results.filter((r): r is ReleaseInfo => r !== null);
}

export default async function ReleaseBanner() {
  const releases = await getLatestReleases();
  if (releases.length === 0) return null;
  const hasNew = releases.some(r => r.isNew);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center justify-center gap-x-4 gap-y-1 flex-wrap text-xs">
        {hasNew && (
          <span className="font-mono font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 ring-1 ring-brand-200 dark:ring-brand-500/25">
            New release
          </span>
        )}
        {releases.map(r => (
          <a
            key={r.label}
            href={r.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {r.label}{" "}
            <span className={r.isNew ? "font-semibold text-brand-600 dark:text-brand-400" : ""}>
              v{r.version}
            </span>
            {r.isNew && <span aria-hidden> ↗</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
