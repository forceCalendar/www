interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  id?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  id,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-3 text-xs font-mono font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">
          {eyebrow}
        </div>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white scroll-mt-24"
      >
        {id ? (
          <a
            href={`#${id}`}
            className="hover:underline decoration-slate-300 dark:decoration-slate-700 underline-offset-8"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-slate-500 dark:text-slate-400 leading-relaxed ${
            centered ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
