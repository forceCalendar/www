import Link from "next/link";

const productLinks = [
  { href: "/core", label: "Core" },
  { href: "/interface", label: "Interface" },
  { href: "/playground", label: "Playground" },
];

const resourceLinks = [
  { href: "https://docs.forcecalendar.org", label: "Documentation", external: true },
  { href: "https://docs.forcecalendar.org/core/api", label: "API Reference", external: true },
  { href: "https://github.com/forcecalendar", label: "GitHub", external: true },
];

const communityLinks = [
  { href: "https://www.npmjs.com/org/forcecalendar", label: "npm", external: true },
  { href: "https://github.com/forcecalendar/core/issues", label: "Issues", external: true },
  { href: "https://github.com/forcecalendar/core/blob/master/LICENSE", label: "MIT License", external: true },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-lg tracking-tight mb-2">
              <span className="font-mono font-normal text-brand-600 dark:text-brand-400">force</span>
              <span className="font-semibold text-slate-900 dark:text-white">Calendar</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calendar infrastructure for strict enterprise environments.
            </p>
          </div>
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Community" links={communityLinks} />
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-400 dark:text-slate-500">
          MIT License
        </div>
      </div>
    </footer>
  );
}
