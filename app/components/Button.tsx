import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_1px_2px_rgb(15_20_30/0.2)] hover:bg-accent-hover active:translate-y-px",
  secondary:
    "bg-raised text-fg ring-1 ring-inset ring-line hover:bg-sunken hover:ring-line/80 shadow-elev-1 dark:shadow-none dark:ring-hairline dark:hover:ring-line",
  ghost:
    "text-muted hover:text-fg hover:bg-sunken",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AsAnchor = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = AsAnchor | AsButton;

/**
 * Button system: primary / secondary / ghost in three sizes. Renders a
 * next/link for internal hrefs, an anchor for external ones, and a
 * <button> otherwise.
 */
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children, ...rest } = props;
  const cls = buttonClasses(variant, size, className);

  if (typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as Omit<AsAnchor, keyof Common>;
    const external = /^https?:\/\//.test(href) || href.startsWith("#");
    if (external) {
      return (
        <a href={href} className={cls} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { href: _unused, ...buttonRest } = rest as Omit<AsButton, keyof Common>;
  void _unused;
  return (
    <button type="button" className={cls} {...buttonRest}>
      {children}
    </button>
  );
}

/** Small arrow used after inline text links and CTAs. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-block transition-transform duration-200 group-hover:translate-x-0.5 ${className}`}>
      &rarr;
    </span>
  );
}

/** External-link glyph. */
export function ExternalIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}
