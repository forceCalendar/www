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
      className="group block p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
    >
      <div className={`text-xs font-mono uppercase tracking-wider mb-3 ${accentClass}`}>
        {label}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
        {description}
      </p>
      <span className={`text-sm ${accentClass} group-hover:underline`}>
        Learn more &rarr;
      </span>
    </Link>
  );
}
