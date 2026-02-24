interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <h2
        id={id}
        className="text-2xl font-semibold text-slate-900 dark:text-white"
      >
        {id ? (
          <a href={`#${id}`} className="hover:underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4">
            {title}
          </a>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}
