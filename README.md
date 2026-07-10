# forcecalendar.org

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The official website for [forceCalendar](https://forcecalendar.org) — enterprise calendar components for Salesforce and strict-CSP environments.

## Pages

- `/` — product overview
- `/core` — the headless engine (`@forcecalendar/core`)
- `/interface` — the Web Components UI (`@forcecalendar/interface`)
- `/salesforce` — Salesforce installation guide
- `/playground` — live interactive demo running the real published packages

## Stack

Next.js (App Router) · React 19 · Tailwind CSS · TypeScript. Deployed on Vercel with a strict security-header set (HSTS, full CSP, `frame-ancestors 'none'`) — the site holds itself to the same CSP standard the library is built for.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

The site consumes `@forcecalendar/core` and `@forcecalendar/interface` from npm for its live demos, so the playground always reflects the shipped packages.

## Contributing

See the [contributing guide](https://github.com/forceCalendar/.github/blob/main/CONTRIBUTING.md). Content fixes and design improvements are welcome.

## License

[MIT](LICENSE)
