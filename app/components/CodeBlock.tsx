interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export default function CodeBlock({ code, filename, language }: CodeBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-slate-950 ring-1 ring-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50">
      {filename && (
        <div className="px-4 py-3 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/60">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </span>
          <span className="text-xs font-mono text-slate-400">{filename}</span>
          {language && (
            <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-slate-600">
              {language}
            </span>
          )}
        </div>
      )}
      <pre className="p-5 text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
