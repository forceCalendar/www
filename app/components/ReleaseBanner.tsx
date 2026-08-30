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
          next: { revalidate: 300, tags: ["npm-releases"] },
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
  const hasNew = releases.some(r => r.isNew);
  // A permanent version strip is noise; show the banner only around releases
  if (releases.length === 0 || !hasNew) return null;

  return (
    <div className="w-full border-b border-hairline bg-sunken">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-1.5 text-xs">
        {hasNew && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-text ring-1 ring-inset ring-accent-line/70">
            New release
          </span>
        )}
        {releases.map(r => (
          <a
            key={r.label}
            href={r.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-muted transition-colors hover:text-fg"
          >
            {r.label}{" "}
            <span className={r.isNew ? "font-semibold text-accent-text" : ""}>
              v{r.version}
            </span>
            {r.isNew && <span aria-hidden> ↗</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
