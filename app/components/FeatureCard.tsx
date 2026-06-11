interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-950/60 hover:-translate-y-0.5">
      <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-500/10 ring-1 ring-brand-100 dark:ring-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-100 dark:group-hover:bg-brand-500/20">
        {icon}
      </div>
      <h3 className="font-medium text-slate-900 dark:text-white mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
