import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://forcecalendar.org'),
  title: {
    default: "forceCalendar - Enterprise Calendar Infrastructure",
    template: "%s | forceCalendar"
  },
  description: "Production-grade calendar infrastructure for enterprise platforms. Zero dependencies. Choose your integration level with pure JavaScript logic or ready-to-use Web Components. Built for Salesforce and modern enterprise applications.",
  keywords: ["calendar", "salesforce", "enterprise", "javascript", "web components", "lwc", "timezone", "ics", "recurring events", "calendar infrastructure", "open source", "MIT license"],
  authors: [{ name: "forceCalendar Team" }],
  creator: "forceCalendar",
  publisher: "forceCalendar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "forceCalendar - Enterprise Calendar Infrastructure",
    description: "Production-grade calendar infrastructure. Zero dependencies. Choose your integration level.",
    url: "https://forcecalendar.org",
    siteName: "forceCalendar",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'forceCalendar - Enterprise Calendar Infrastructure'
      }
    ],
    locale: 'en_US',
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "forceCalendar - Enterprise Calendar Infrastructure",
    description: "Production-grade calendar infrastructure. Zero dependencies. Choose your integration level.",
    images: ['/og-image.png'],
    creator: '@forcecalendar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://forcecalendar.org',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'forceCalendar',
    applicationCategory: 'DeveloperApplication',
    description: 'Production-grade calendar infrastructure for enterprise platforms',
    operatingSystem: 'Web Browser, Node.js',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'forceCalendar',
      url: 'https://forcecalendar.org',
    },
    softwareVersion: '0.4.0',
    license: 'https://opensource.org/licenses/MIT',
    programmingLanguage: 'JavaScript',
    keywords: 'calendar, enterprise, salesforce, web components, javascript',
    url: 'https://forcecalendar.org',
    sameAs: [
      'https://github.com/forcecalendar',
      'https://www.npmjs.com/org/forcecalendar',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${libreBaskerville.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
