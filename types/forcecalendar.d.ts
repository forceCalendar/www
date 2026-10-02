// Package API declarations are provided by the installed Core and Interface releases.
// Keep only the legacy JSX fallback here; do not shadow package exports.
declare namespace JSX {
  interface IntrinsicElements {
    "forcecal-main": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        view?: string;
        date?: string;
        locale?: string;
        timezone?: string;
        "week-starts-on"?: string;
        height?: string;
        theme?: string;
      },
      HTMLElement
    >;
    "forcecal-event-form": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "event-id"?: string;
        mode?: string;
      },
      HTMLElement
    >;
  }
}
