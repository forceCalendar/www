import type { ReactNode } from "react";
import CopyCodeButton from "./CopyCodeButton";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
  /** Slot rendered in the chrome bar in place of the filename (e.g. tabs). */
  toolbar?: ReactNode;
  /** Smaller type for dense samples. */
  dense?: boolean;
  /** Remove the outer shadow when the window sits inside another panel. */
  flat?: boolean;
  className?: string;
}

/**
 * Code window: dark on both themes, subtle traffic lights, hairline chrome,
 * horizontal scroll contained inside the window.
 */
export default function CodeBlock({
  code,
  filename,
  language,
  toolbar,
  dense = false,
  flat = false,
  className = "",
}: CodeBlockProps) {
  const hasChrome = Boolean(filename || toolbar);
  return (
    <div
      className={`rounded-xl overflow-hidden bg-code-bg ring-1 ring-code-border text-code-fg ${flat ? "" : "shadow-window"} ${className}`}
    >
      {hasChrome && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-code-chrome border-b border-code-border">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          </span>
          {toolbar ?? <span className="font-mono text-xs text-code-muted">{filename}</span>}
          <span className="ml-auto flex items-center gap-2">
            {language && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-code-muted/80">
                {language}
              </span>
            )}
            <CopyCodeButton code={code} />
          </span>
        </div>
      )}
      <div className="relative">
        {!hasChrome && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <CopyCodeButton code={code} />
          </div>
        )}
        <pre className={`overflow-x-auto p-5 font-mono leading-relaxed ${dense ? "text-[12.5px]" : "text-[13px] sm:text-sm"}`}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
