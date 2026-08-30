import type { ReactNode } from "react";

type Width = "page" | "wide" | "narrow" | "prose";
type Tone = "default" | "sunken";

interface SectionProps {
  children: ReactNode;
  id?: string;
  /** Container width: page = 72rem, wide = 64rem, narrow = 56rem, prose = 44rem. */
  width?: Width;
  /** Sunken sections get the recessed surface plus hairline top/bottom borders. */
  tone?: Tone;
  /** Draw a hairline above the section (default sections only). */
  divider?: boolean;
  /** Vertical rhythm: default 96–112 px on desktop, compact for short strips. */
  spacing?: "default" | "compact" | "none";
  className?: string;
}

const widths: Record<Width, string> = {
  page: "max-w-page",
  wide: "max-w-5xl",
  narrow: "max-w-4xl",
  prose: "max-w-prose",
};

const spacings = {
  default: "py-20 lg:py-24",
  compact: "py-10 lg:py-14",
  none: "",
};

/** Page section with consistent horizontal padding, container width and rhythm. */
export default function Section({
  children,
  id,
  width = "page",
  tone = "default",
  divider = false,
  spacing = "default",
  className = "",
}: SectionProps) {
  const toneCls =
    tone === "sunken"
      ? "bg-sunken border-y border-hairline"
      : divider
        ? "border-t border-hairline"
        : "";
  return (
    <section id={id} className={`${toneCls} ${spacings[spacing]} ${className}`.trim()}>
      <div className={`${widths[width]} mx-auto px-6`}>{children}</div>
    </section>
  );
}
