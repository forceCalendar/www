interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export default function CodeBlock({ code, filename, language }: CodeBlockProps) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-950">
      {filename && (
        <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">{filename}</span>
          {language && (
            <span className="text-xs font-mono text-slate-600">{language}</span>
          )}
        </div>
      )}
      <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
