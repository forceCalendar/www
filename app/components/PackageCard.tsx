import Link from "next/link";

interface PackageCardProps {
  href: string;
  label: string;
  name: string;
  description: string;
  accentClass: string;
}

export default function PackageCard({
  href,
  label,
  name,
  description,
  accentClass,
}: PackageCardProps) {
  return (
    <Link
      href={href}
      className="group relative block p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60 hover:-translate-y-0.5"
    >
      <div className={`text-xs font-mono font-medium uppercase tracking-widest mb-3 ${accentClass}`}>
        {label}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">
        {name}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
        {description}
      </p>
      <span className={`inline-flex items-center gap-1 text-sm font-medium ${accentClass}`}>
        Learn more
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
