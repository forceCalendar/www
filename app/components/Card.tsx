import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "default" | "accent" | "sunken";

interface CardProps {
  children: ReactNode;
  tone?: Tone;
  /** Lift on hover; on by default for linked cards. */
  interactive?: boolean;
  /** Renders the card as a link (next/link for internal, <a> for external). */
  href?: string;
  external?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
  className?: string;
  ariaLabel?: string;
}

const tones: Record<Tone, string> = {
  default: "bg-raised ring-1 ring-hairline shadow-elev-1 dark:shadow-none ring-hi",
  accent: "bg-accent-soft ring-1 ring-accent-line/60",
  sunken: "bg-sunken ring-1 ring-hairline",
};

const paddings = { none: "", sm: "p-4", md: "p-5 sm:p-6", lg: "p-6 sm:p-8" };

/** Raised panel with the site's hairline + soft elevation, optional hover lift. */
export default function Card({
  children,
  tone = "default",
  interactive,
  href,
  external,
  padding = "md",
  className = "",
  ariaLabel,
}: CardProps) {
  const lift = interactive ?? Boolean(href);
  const cls = [
    "group relative rounded-xl",
    tones[tone],
    paddings[padding],
    lift
      ? "transition-[transform,box-shadow,ring-color] duration-200 hover:-translate-y-0.5 hover:shadow-elev-2 hover:ring-line dark:hover:ring-line"
      : "",
    href
      ? "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <div className={cls} aria-label={ariaLabel}>
      {children}
    </div>
  );
}

const wellTones = {
  soft: "bg-accent-soft text-accent-text ring-accent-line/60",
  solid: "bg-accent text-accent-fg ring-accent",
  neutral: "bg-sunken text-muted ring-hairline",
};

/** Square icon well used at the top of feature cards. */
export function IconWell({
  children,
  tone = "soft",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof wellTones;
  className?: string;
}) {
  return (
    <div className={`flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-inset ${wellTones[tone]} ${className}`}>
      {children}
    </div>
  );
}
