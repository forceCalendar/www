import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  eyebrow?: string;
  id?: string;
  align?: "left" | "center";
  /** Trailing slot rendered beside the heading on wide screens (links, tabs). */
  aside?: ReactNode;
  className?: string;
}

/** Eyebrow + heading + lede; the one section header used across the site. */
export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  id,
  align = "left",
  aside,
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={`mb-10 lg:mb-14 ${centered ? "text-center" : "sm:flex sm:items-end sm:justify-between sm:gap-8"} ${className}`}
    >
      <div className={centered ? "" : "min-w-0"}>
        {eyebrow && (
          <div className="mb-3">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2
          id={id}
          className="font-display text-display-md sm:text-[2.25rem] sm:leading-[1.12] sm:tracking-[-0.026em] font-semibold text-fg scroll-mt-28"
        >
          {id ? (
            <a href={`#${id}`} className="decoration-line hover:underline underline-offset-8">
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        {subtitle && (
          <p className={`mt-4 text-[15px] sm:text-base text-muted leading-relaxed ${centered ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {aside && !centered && <div className="mt-6 sm:mt-0 flex-shrink-0">{aside}</div>}
    </div>
  );
}
