import Image from "next/image";

interface SalesforceScreenshotProps {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  sizes?: string;
}

export default function SalesforceScreenshot({
  src,
  alt,
  caption,
  width = 1173,
  height = 653,
  sizes = "(max-width: 768px) 100vw, 960px",
}: SalesforceScreenshotProps) {
  return (
    <figure className="overflow-hidden rounded-xl bg-raised ring-1 ring-hairline shadow-elev-2 ring-hi">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size screenshot: ${caption} (new tab)`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full" />
        <div className="flex items-center justify-between gap-3 border-t border-hairline px-4 py-3 text-xs font-medium">
          <span className="text-muted">{caption}</span>
          <span className="flex-shrink-0 text-accent-text group-hover:underline" aria-hidden>View full size ↗</span>
        </div>
      </a>
      <figcaption className="sr-only">{caption}. Real Salesforce Lightning demo with synthetic sample data.</figcaption>
    </figure>
  );
}
