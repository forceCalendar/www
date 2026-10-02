# forcecalendar.org

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The official website for [forceCalendar](https://forcecalendar.org) — an open-source calendar for standard Salesforce Events, with reusable JavaScript packages.

## Pages

- `/` — product overview
- `/core` — the headless engine (`@forcecalendar/core`)
- `/interface` — the Web Components UI (`@forcecalendar/interface`)
- `/salesforce` — Salesforce installation guide
- `/platforms` — sandboxed platforms the packages run in (Salesforce, ServiceNow, SharePoint, Forge, Chrome MV3, edge runtimes)
- `/playground` — live interactive demo running the real published packages

## Stack

Next.js (App Router) · React 19 · Tailwind CSS · TypeScript. Response headers are defined in `next.config.ts`, including HSTS and `frame-ancestors 'none'`. The current CSP permits inline scripts/styles and eval; it is not a strict-CSP compatibility test for the calendar.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

The site consumes `@forcecalendar/core` and `@forcecalendar/interface` from npm for its live demos, so the playground reflects the published versions resolved by the lockfile. It does not verify a Salesforce package or org deployment.

## Contributing

See the [contributing guide](https://github.com/forceCalendar/.github/blob/main/CONTRIBUTING.md). Content fixes and design improvements are welcome.

## License

[MIT](LICENSE)

## Salesforce content verification

The install guide distinguishes repository source from install-package releases. Legacy package links are withheld while the new installer is validated. Do not claim a package contains current source changes until its version and contents are verified in a clean org. The `salesforce-lightning-*` images are real Salesforce Lightning demo captures from October 2, 2026, using Core 2.5.5 and Interface 1.8.1 with synthetic in-memory sample events, including the event creation form. They do not demonstrate live Apex CRUD or verify the package behind the install link. Original `salesforce-month.png`, `salesforce-week.png`, and `salesforce-day.png` assets are retained as earlier demo captures. Refresh Salesforce images only with real org captures using synthetic data after deployment validation.

Before merging content changes, run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`, then check the home page, Salesforce guide, and live demo at desktop and mobile widths.
